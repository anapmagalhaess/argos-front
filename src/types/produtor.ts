/**
 * Produtor devolvido por GET /produtores/{id}.
 * Usamos apenas os campos necessários para a página Hoje (pegar o município).
 *
 */
export interface Produtor {
  id: number
  municipio: {
    id: number
  }
}
