import type { Plantio } from '../types/plantio'
import { buscar } from './api'

/**
 * Busca os plantios de uma propriedade.
 * GET /propriedades/{id}/plantios -> Plantio[]
 */
export function buscarPlantiosDaPropriedade(
  propriedadeId: number,
  sinal: AbortSignal,
): Promise<Plantio[]> {
  return buscar<Plantio[]>(`/propriedades/${propriedadeId}/plantios`, sinal)
}
