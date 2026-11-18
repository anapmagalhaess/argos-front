import { ApiError, listarProdutores, listarPropriedadesDoProdutor } from './api'
import { rotuloDoMunicipio, municipioPorId } from '../data/referencias'
import type { DadosDaConta } from './sessao'

/** Só os números do telefone: "(87) 99000-0001" vira "87990000001". */
export const limparTelefone = (texto: string) => texto.replace(/\D/g, '')

/** Formata o DDD e o número enquanto a pessoa digita, limitando a 11 dígitos. */
export function formatarTelefone(texto: string): string {
    const digitos = limparTelefone(texto).slice(0, 11)
    if (digitos.length === 0) return ''
    if (digitos.length === 1) return `(${digitos}`
    if (digitos.length === 2) return `(${digitos})`

    const ddd = digitos.slice(0, 2)
    const numero = digitos.slice(2)
    const separador = digitos.length > 10 ? 5 : 4

    if (numero.length <= separador) return `(${ddd}) ${numero}`
    return `(${ddd}) ${numero.slice(0, separador)}-${numero.slice(separador)}`
}

/** O telefone do banco tem DDD e 8 ou 9 dígitos: 10 ou 11 números no total. */
export const telefoneValido = (texto: string) => /^\d{10,11}$/.test(limparTelefone(texto))

/**
 * Entrar: acha o produtor pelo telefone. O banco não guarda senha, então isto IDENTIFICA a pessoa
 * mas não a autentica: quem souber o telefone cadastrado consegue entrar como ela.
 *
 * A API ainda não tem uma rota de busca por telefone. Por isso a lista de produtores é buscada e
 * filtrada aqui, e só o produtor achado fica guardado. Quando existir `GET /produtores/telefone/{t}`,
 * é só trocar esta chamada.
 */
export async function identificarPorTelefone(telefone: string, sinal?: AbortSignal): Promise<DadosDaConta> {
    const digitos = limparTelefone(telefone)
    const produtores = await listarProdutores(sinal)
    const achado = produtores.find((produtor) => produtor.telefone === digitos)
    if (!achado) {
        throw new ApiError(404, 'Não achamos esse telefone. Confira os números ou faça o cadastro.')
    }
    // A conta guarda a primeira roça do produtor (a tela "Hoje" usa essa)
    const roca = (await listarPropriedadesDoProdutor(achado.id, sinal))[0]
    return {
        produtorId: achado.id,
        produtorNome: achado.nome,
        municipioId: achado.municipioId,
        municipioNome: municipioPorId(achado.municipioId)?.nome ?? rotuloDoMunicipio(achado.municipioId),
        propriedadeId: roca?.id ?? null,
        propriedadeNome: roca?.nome ?? null,
    }
}
