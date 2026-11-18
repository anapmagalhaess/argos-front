/**
 * Estágios do plantio possíveis no banco.
 * Cada valor corresponde ao enum Java.
 */
export type EstagioPlantio =
  | 'PREPARO'
  | 'PLANTIO'
  | 'CRESCIMENTO'
  | 'FLORACAO'
  | 'COLHEITA'

/**
 * Um plantio devolvido por GET /propriedades/{id}/plantios.
 */
export interface Plantio {
  id: number
  culturaId: number
  areaHa: number
  /** Data do plantio no formato AAAA-MM-DD. */
  dataPlantio: string
  /** Data prevista para a colheita no formato AAAA-MM-DD. */
  dataColheitaPrevista: string
  estagio: EstagioPlantio
}
