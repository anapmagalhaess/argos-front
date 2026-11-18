import type { Alerta } from '../types/alerta';
import { buscar, ErroDeApi } from './api';

/**
 * Busca a lista de alertas meteorológicos e fitossanitários do município do produtor.
 * Endpoint do Contrato: GET /municipios/{cd}/alertas
 *
 * Se o município não possuir alertas cadastrados ou a rota retornar 404 (sem alertas),
 * devolve uma lista vazia para que a interface exiba o estado amigável:
 * "Não há alertas no seu município agora."
 */
export async function buscarAlertasDoMunicipio(
    municipioId: number,
    sinal?: AbortSignal
): Promise<Alerta[]> {
    try {
        const alertas = await buscar<Alerta[]>(`/municipios/${municipioId}/alertas`, sinal);
        return alertas || [];
    } catch (erro) {
        // Se a API retornar 404 (município sem alertas ou rota de apoio em deploy fase 2),
        // trata como ausência de alertas sem derrubar a aplicação
        if (erro instanceof ErroDeApi && erro.corpo.status === 404) {
            return [];
        }
        throw erro;
    }
}
