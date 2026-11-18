import type {
    AlertaApi,
    CampoComErro,
    CulturaApi,
    ErroDaApi,
    Municipio,
    Ocorrencia,
    OcorrenciaEntrada,
    PlantioEntrada,
    Plantio,
    PragaApi,
    Produtor,
    ProdutorEntrada,
    Propriedade,
    PropriedadeEntrada,
} from '../types/api'

/**
 * Cliente da API Java do Argos. O endereço vem da variável VITE_API_URL (no Vite, só variáveis que
 * começam com VITE_ chegam ao navegador). Sem a variável, usa a API rodando na própria máquina.
 */
const BASE = String(import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/+$/, '')

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
            erro?.campos ?? [],
        )
    }
    return json as T
}

// ---- Tabelas de apoio (só leitura) ----

export const listarMunicipios = (sinal?: AbortSignal) => pedir<Municipio[]>('/municipios', { sinal })

export const listarCulturas = (sinal?: AbortSignal) => pedir<CulturaApi[]>('/culturas', { sinal })

export const listarPragas = (sinal?: AbortSignal) => pedir<PragaApi[]>('/pragas', { sinal })

/** Os avisos do município que ainda valem hoje, do mais grave para o mais leve. */
export const listarAlertas = (municipioId: number, sinal?: AbortSignal) =>
    pedir<AlertaApi[]>(`/municipios/${municipioId}/alertas`, { sinal })

// ---- Cadastro: produtor, propriedade e plantio (1:N em cadeia) ----

export const listarProdutores = (sinal?: AbortSignal) => pedir<Produtor[]>('/produtores', { sinal })

export const buscarProdutor = (id: number, sinal?: AbortSignal) => pedir<Produtor>(`/produtores/${id}`, { sinal })

export const listarPropriedadesDoProdutor = (produtorId: number, sinal?: AbortSignal) =>
    pedir<Propriedade[]>(`/produtores/${produtorId}/propriedades`, { sinal })

export const cadastrarProdutor = (dados: ProdutorEntrada) =>
    pedir<Produtor>('/produtores', { metodo: 'POST', corpo: dados })

export const cadastrarPropriedade = (produtorId: number, dados: PropriedadeEntrada) =>
    pedir<Propriedade>(`/produtores/${produtorId}/propriedades`, { metodo: 'POST', corpo: dados })

export const cadastrarPlantio = (propriedadeId: number, dados: PlantioEntrada) =>
    pedir<Plantio>(`/propriedades/${propriedadeId}/plantios`, { metodo: 'POST', corpo: dados })

export const listarPlantios = (propriedadeId: number, sinal?: AbortSignal) =>
    pedir<Plantio[]>(`/propriedades/${propriedadeId}/plantios`, { sinal })

// ---- Relato de praga ----

export const listarOcorrencias = (plantioId: number, sinal?: AbortSignal) =>
    pedir<Ocorrencia[]>(`/plantios/${plantioId}/ocorrencias`, { sinal })

export const cadastrarOcorrencia = (plantioId: number, dados: OcorrenciaEntrada) =>
    pedir<Ocorrencia>(`/plantios/${plantioId}/ocorrencias`, { metodo: 'POST', corpo: dados })
