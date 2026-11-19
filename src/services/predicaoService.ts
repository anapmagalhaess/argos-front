import type {
    EntradaPredicao,
    ErroApiMl,
    RespostaProdutividade,
    RespostaRiscoQuebra,
    RespostaSaudeMl,
} from '../types/predicao'

/**
 * Endereço da API de IA publicada.
 */
const API_ML: string = import.meta.env.VITE_ML_API_URL || 'https://argos-ia-api.onrender.com'

/** Faz o pedido com fetch e devolve o JSON já com o tipo certo. Resposta com erro vira exceção. */
async function pedirJson<T>(caminho: string, sinal: AbortSignal, corpo?: EntradaPredicao): Promise<T> {
    const resposta = await fetch(`${API_ML}${caminho}`, {
        // Com corpo é POST (as previsões); sem corpo é GET (a rota de saúde).
        method: corpo ? 'POST' : 'GET',
        headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
        body: corpo ? JSON.stringify(corpo) : undefined,
        signal: sinal,
    })

    if (!resposta.ok) {
        // A Flask explica o problema no campo "erro" (ex.: "Falta o campo oni").
        // Se a resposta não for JSON, fica a mensagem com o número do erro.
        let mensagem = `A API de previsão respondeu com o erro ${resposta.status}.`
        try {
            const erro = (await resposta.json()) as ErroApiMl
            if (erro.erro) mensagem = erro.erro
        } catch {
            // resposta sem JSON: mantém a mensagem acima
        }
        throw new Error(mensagem)
    }

    return (await resposta.json()) as T
}

/** GET /api/v1/saude: confere se a Flask está no ar. */
export function verificarApiMl(sinal: AbortSignal): Promise<RespostaSaudeMl> {
    return pedirJson<RespostaSaudeMl>('/api/v1/saude', sinal)
}

/** POST /api/v1/risco-quebra: chance de a safra quebrar (Regressão Logística). */
export function preverRiscoQuebra(entrada: EntradaPredicao, sinal: AbortSignal): Promise<RespostaRiscoQuebra> {
    return pedirJson<RespostaRiscoQuebra>('/api/v1/risco-quebra', sinal, entrada)
}

/** POST /api/v1/produtividade: quantos kg por hectare o modelo prevê (Regressão Linear). */
export function preverProdutividade(entrada: EntradaPredicao, sinal: AbortSignal): Promise<RespostaProdutividade> {
    return pedirJson<RespostaProdutividade>('/api/v1/produtividade', sinal, entrada)
}
