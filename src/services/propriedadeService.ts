import type { Propriedade, PropriedadeDTO } from '../types/propriedade';
import type { Plantio, PlantioDTO } from '../types/plantio';
import { buscar, enviar, atualizar, remover } from './api';

/**
 * Serviço de integração com os endpoints de Propriedade da API Java.
 * Controller: br.com.fiap.argos.controller.PropriedadeController (/propriedades)
 */

/**
 * GET /propriedades -> Lista todas as propriedades cadastradas no Oracle.
 */
export function listarPropriedades(sinal?: AbortSignal): Promise<Propriedade[]> {
    return buscar<Propriedade[]>('/propriedades', sinal);
}

/**
 * GET /propriedades/{id} -> Busca uma propriedade específica pelo ID.
 */
export function buscarPropriedadePorId(id: number, sinal?: AbortSignal): Promise<Propriedade> {
    return buscar<Propriedade>(`/propriedades/${id}`, sinal);
}

/**
 * PUT /propriedades/{id} -> Atualiza os dados de uma propriedade rural.
 */
export function atualizarPropriedade(
    id: number,
    dados: PropriedadeDTO,
    sinal?: AbortSignal
): Promise<Propriedade> {
    return atualizar<Propriedade, PropriedadeDTO>(`/propriedades/${id}`, dados, sinal);
}

/**
 * DELETE /propriedades/{id} -> Remove uma propriedade (se não houver plantios associados).
 */
export function deletarPropriedade(id: number, sinal?: AbortSignal): Promise<void> {
    return remover(`/propriedades/${id}`, sinal);
}

/**
 * GET /propriedades/{id}/plantios -> Rota aninhada do 1:N que lista todos os plantios da propriedade.
 * Usada diretamente pela tela "Hoje" para listar as plantações ativas do produtor.
 */
export function listarPlantiosDaPropriedade(
    propriedadeId: number,
    sinal?: AbortSignal
): Promise<Plantio[]> {
    return buscar<Plantio[]>(`/propriedades/${propriedadeId}/plantios`, sinal);
}

/**
 * POST /propriedades/{id}/plantios -> Cadastra um novo plantio para a propriedade {id}.
 * Valida a regra de negócio RN01: área dos plantios não pode ultrapassar a área total da roça (409).
 */
export function cadastrarPlantioNaPropriedade(
    propriedadeId: number,
    dados: PlantioDTO,
    sinal?: AbortSignal
): Promise<Plantio> {
    return enviar<Plantio, PlantioDTO>(`/propriedades/${propriedadeId}/plantios`, dados, sinal);
}
