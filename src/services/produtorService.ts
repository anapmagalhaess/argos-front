import type { Produtor } from '../types/produtor'
import { buscar } from './api'

/**
 * Busca os dados de um produtor pelo id.
 * GET /produtores/{id} -> Produtor
 *
 * Usado pela página Hoje quando o municipioId não foi salvo pela Triagem:
 * a resposta traz municipio.id.
 */
export function buscarProdutor(
  produtorId: number,
  sinal: AbortSignal,
): Promise<Produtor> {
  return buscar<Produtor>(`/produtores/${produtorId}`, sinal)
}
