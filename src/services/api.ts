import type {
    CampoComErro,
    ErroDaApi,
    PlantioEntrada,
    Plantio,
    Produtor,
    ProdutorEntrada,
    PropriedadeEntrada,
    Propriedade,
} from '../types/api'
import type { Alerta } from '../types/alerta'

/**
 * Cliente da API Java do Argos. O endereço vem da variável VITE_API_URL (no Vite, só variáveis que
 * começam com VITE_ chegam ao navegador). Sem a variável, usa a API publicada no Render; para
 * testar com a API rodando na própria máquina, use VITE_API_URL=http://localhost:8080.
 */
const BASE = String(import.meta.env.VITE_API_URL ?? 'https://argos-api-java.onrender.com').replace(/\/+$/, '')

/** A API manda cada campo inválido como "campo: mensagem"; a tela precisa dos dois separados. */
function separarCampos(textos: string[]): CampoComErro[] {
    return textos.map((texto) => {
        const i = texto.indexOf(': ')
        return i === -1 ? { campo: '', mensagem: texto } : { campo: texto.slice(0, i), mensagem: texto.slice(i + 2) }
    })
}

/** Erro de uma chamada à API: guarda o status HTTP e, no 400 de validação, os campos com problema. */
export class ApiError extends Error {
    status: number
    campos: CampoComErro[]

    constructor(status: number, mensagem: string, campos: CampoComErro[] = []) {
        super(mensagem)
        this.name = 'ApiError'
        this.status = status
        this.campos = campos
    }
}

interface Opcoes {
    metodo?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    corpo?: unknown
    sinal?: AbortSignal
}

/** Faz a chamada, lê o JSON e transforma qualquer erro numa ApiError com mensagem pronta para a tela. */
async function pedir<T>(rota: string, { metodo = 'GET', corpo, sinal }: Opcoes = {}): Promise<T> {
    let resposta: Response
    try {
        resposta = await fetch(BASE + rota, {
            method: metodo,
            headers: corpo === undefined ? undefined : { 'Content-Type': 'application/json' },
            body: corpo === undefined ? undefined : JSON.stringify(corpo),
            signal: sinal,
        })
    } catch (erro) {
        // Chamada cancelada de propósito (a pessoa saiu da tela): quem chamou trata.
        if (erro instanceof DOMException && erro.name === 'AbortError') throw erro
        throw new ApiError(0, 'Não deu para falar com o servidor. Veja se há internet e tente de novo.')
    }

    if (resposta.status === 204) return undefined as T

    const texto = await resposta.text()
    let json: unknown = null
    try {
        json = texto ? JSON.parse(texto) : null
    } catch {
        // Resposta que não é JSON (uma página de erro do servidor, por exemplo): vale a mensagem genérica.
    }

    if (!resposta.ok) {
        const erro = json as Partial<ErroDaApi> | null
        throw new ApiError(
            resposta.status,
            erro?.mensagem ?? 'Algo deu errado do nosso lado. Tente de novo em instantes.',
            separarCampos(erro?.campos ?? []).filter((c) => c.campo !== ''),
        )
    }
    return json as T
}

// Operações genéricas compartilhadas pelos serviços de domínio.
export const buscar = <T>(rota: string, sinal?: AbortSignal) => pedir<T>(rota, { sinal })
export const enviar = <T, D>(rota: string, dados: D, sinal?: AbortSignal) =>
    pedir<T>(rota, { metodo: 'POST', corpo: dados, sinal })
export const atualizar = <T, D>(rota: string, dados: D, sinal?: AbortSignal) =>
    pedir<T>(rota, { metodo: 'PUT', corpo: dados, sinal })
export const remover = (rota: string, sinal?: AbortSignal) =>
    pedir<void>(rota, { metodo: 'DELETE', sinal })

// ---- Cadastro: produtor, propriedade e plantio (1:N em cadeia) ----

export const listarProdutores = (sinal?: AbortSignal) => pedir<Produtor[]>('/produtores', { sinal })

export const buscarProdutor = (id: number, sinal?: AbortSignal) => pedir<Produtor>(`/produtores/${id}`, { sinal })

export const listarPropriedadesDoProdutor = (produtorId: number, sinal?: AbortSignal) =>
    pedir<Propriedade[]>(`/produtores/${produtorId}/propriedades`, { sinal })

export const buscarPropriedade = (propriedadeId: number, sinal?: AbortSignal) =>
    pedir<Propriedade>(`/propriedades/${propriedadeId}`, { sinal })

export const cadastrarProdutor = (dados: ProdutorEntrada) =>
    pedir<Produtor>('/produtores', { metodo: 'POST', corpo: dados })

export const atualizarProdutor = (id: number, dados: ProdutorEntrada) =>
    pedir<Produtor>(`/produtores/${id}`, { metodo: 'PUT', corpo: dados })

export const cadastrarPropriedade = (produtorId: number, dados: PropriedadeEntrada) =>
    pedir<Propriedade>(`/produtores/${produtorId}/propriedades`, { metodo: 'POST', corpo: dados })

export const atualizarPropriedade = (id: number, dados: PropriedadeEntrada) =>
    pedir<Propriedade>(`/propriedades/${id}`, { metodo: 'PUT', corpo: dados })

export const cadastrarPlantio = (propriedadeId: number, dados: PlantioEntrada) =>
    pedir<Plantio>(`/propriedades/${propriedadeId}/plantios`, { metodo: 'POST', corpo: dados })

export const atualizarPlantio = (plantioId: number, dados: PlantioEntrada) =>
    pedir<Plantio>(`/plantios/${plantioId}`, { metodo: 'PUT', corpo: dados })

export const deletarPlantio = (plantioId: number) =>
    pedir<void>(`/plantios/${plantioId}`, { metodo: 'DELETE' })

export const listarPlantios = (propriedadeId: number, sinal?: AbortSignal) =>
    pedir<Plantio[]>(`/propriedades/${propriedadeId}/plantios`, { sinal })

export const listarAlertasDoMunicipio = (municipioId: number, sinal?: AbortSignal) =>
    pedir<Alerta[]>(`/municipios/${municipioId}/alertas`, { sinal })
