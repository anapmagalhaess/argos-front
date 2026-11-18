import type { ErroApi } from '../types/erroApi'

/**
 * URL base da API Java do Argos, configurada via variável de ambiente.
 */
const BASE_URL = import.meta.env.VITE_API_URL as string | undefined

/**
 * Erro amigável gerado quando a API responde com um corpo de erro padrão.
 * Separa o objeto original para quem quiser inspecionar os campos.
 */
export class ErroDeApi extends Error {
  corpo: ErroApi
  constructor(corpo: ErroApi) {
    super(corpo.mensagem)
    this.name = 'ErroDeApi'
    this.corpo = corpo
  }
}

/**
 * Faz um GET na API Java e devolve o JSON tipado.
 *
 * - Monta a URL a partir de `VITE_API_URL` + `caminho`.
 * - Lança `ErroDeApi` quando a resposta NÃO é 2xx e o corpo segue o formato padrão.
 * - Lança `Error` genérico em outros casos (rede fora, corpo inesperado).
 * - Aceita `AbortSignal` para cancelar a requisição (cleanup do useEffect).
 */
export async function buscar<T>(caminho: string, sinal: AbortSignal): Promise<T> {
  if (!BASE_URL) {
    throw new Error('A variável VITE_API_URL não foi configurada.')
  }

  const url = `${BASE_URL}${caminho}`
  const resposta = await fetch(url, { signal: sinal })

  if (!resposta.ok) {
    // Tenta ler o corpo de erro padrão da API Java
    try {
      const corpo = (await resposta.json()) as ErroApi
      if (corpo.mensagem) {
        throw new ErroDeApi(corpo)
      }
    } catch (erro) {
      // Se já é um ErroDeApi, re-lança
      if (erro instanceof ErroDeApi) throw erro
      // Senão, corpo não segue o padrão
    }
    throw new Error(`O servidor respondeu com o erro ${resposta.status}.`)
  }

  return (await resposta.json()) as T
}
