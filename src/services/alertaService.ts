import type { Alerta } from '../types/alerta'
import { buscar } from './api'

/**
 * Busca os alertas vigentes de um município.
 * GET /municipios/{id}/alertas -> Alerta[]
 */
export function buscarAlertasDoMunicipio(
  municipioId: number,
  sinal: AbortSignal,
): Promise<Alerta[]> {
  return buscar<Alerta[]>(`/municipios/${municipioId}/alertas`, sinal)
}
