import { ApiError, listarProdutores, listarPropriedadesDoProdutor } from './api'
import type { DadosDaConta } from './sessao'

/** Só os números do telefone: "(87) 99000-0001" vira "87990000001". */
export const limparTelefone = (texto: string) => texto.replace(/\D/g, '')

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
    // A conta guarda a primeira roça do produtor (as telas "Hoje" e "Ocorrências" usam essa)
    const roca = (await listarPropriedadesDoProdutor(achado.id, sinal))[0]
    return {
        produtorId: achado.id,
        produtorNome: achado.nome,
        municipioId: achado.municipio.id,
        municipioNome: achado.municipio.nome,
        propriedadeId: roca?.id ?? null,
        propriedadeNome: roca?.nome ?? null,
    }
}
