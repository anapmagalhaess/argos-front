import type { Plantio, PlantioDTO } from '../types/plantio';
import { buscar, atualizar, remover } from './api';
import {
    listarPlantiosDaPropriedade,
    cadastrarPlantioNaPropriedade,
} from './propriedadeService';

/**
 * Serviço de integração com os endpoints de Plantio da API Java.
 * Controller: br.com.fiap.argos.controller.PlantioController (/plantios)
 */

/**
 * GET /plantios -> Lista todos os plantios do banco.
 */
export function listarPlantios(sinal?: AbortSignal): Promise<Plantio[]> {
    return buscar<Plantio[]>('/plantios', sinal);
}

/**
 * GET /plantios/{id} -> Busca um plantio específico pelo ID.
 */
export function buscarPlantioPorId(id: number, sinal?: AbortSignal): Promise<Plantio> {
    return buscar<Plantio>(`/plantios/${id}`, sinal);
}

/**
 * PUT /plantios/{id} -> Atualiza os dados de um plantio existente.
 */
export function atualizarPlantio(
    id: number,
    dados: PlantioDTO,
    sinal?: AbortSignal
): Promise<Plantio> {
    return atualizar<Plantio, PlantioDTO>(`/plantios/${id}`, dados, sinal);
}

/**
 * DELETE /plantios/{id} -> Remove um plantio pelo ID.
 */
export function deletarPlantio(id: number, sinal?: AbortSignal): Promise<void> {
    return remover(`/plantios/${id}`, sinal);
}

/**
 * Atalhos reutilizáveis da rota aninhada /propriedades/{id}/plantios
 */
export { listarPlantiosDaPropriedade, cadastrarPlantioNaPropriedade };
export const buscarPlantiosDaPropriedade = listarPlantiosDaPropriedade;
