/**
 * Tipos de alerta possíveis no banco (tb_tipo_alerta).
 * Cada valor corresponde ao enum Java.
 */
export type TipoAlerta =
  | 'CHUVA_FORTE'
  | 'SECA'
  | 'CALOR'
  | 'GEADA'
  | 'ENCHENTE'
  | 'PRAGA'
  | 'VENTO'

/** Severidade do alerta, de 1 (menor) a 4 (maior). */
export type Severidade = 1 | 2 | 3 | 4

/** Um alerta devolvido por GET /municipios/{id}/alertas. */
export interface Alerta {
  id: number
  tipo: TipoAlerta
  severidade: Severidade
  titulo: string
  mensagem: string
  fonte: string
  /** Data de início no formato AAAA-MM-DD. */
  dataInicio: string
  /** Data de fim no formato AAAA-MM-DD. */
  dataFim: string
}
