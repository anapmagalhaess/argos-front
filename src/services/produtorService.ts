import type { Produtor, ProdutorDTO } from '../types/produtor';
import type { Propriedade, PropriedadeDTO } from '../types/propriedade';
import { buscar, enviar, atualizar, remover } from './api';

/**
 * Serviço de integração com os endpoints de Produtor da API Java.
 * Controller: br.com.fiap.argos.controller.ProdutorController (/produtores)
 */

/**
 * GET /produtores -> Lista todos os produtores cadastrados no Oracle.
 */
export function listarProdutores(sinal?: AbortSignal): Promise<Produtor[]> {
    return buscar<Produtor[]>('/produtores', sinal);
}

/**
 * GET /produtores/{id} -> Busca um produtor específico pelo ID.
 */
export function buscarProdutorPorId(id: number, sinal?: AbortSignal): Promise<Produtor> {
    return buscar<Produtor>(`/produtores/${id}`, sinal);
}

/**
 * POST /produtores -> Cadastra um novo produtor com validação Bean Validation.
 * Retorna 201 Created com o produtor persistido e ID gerado via sequence sq_tb_produtor.
 */
export function cadastrarProdutor(dados: ProdutorDTO, sinal?: AbortSignal): Promise<Produtor> {
    return enviar<Produtor, ProdutorDTO>('/produtores', dados, sinal);
}

/**
 * PUT /produtores/{id} -> Atualiza os dados de um produtor.
 */
export function atualizarProdutor(id: number, dados: ProdutorDTO, sinal?: AbortSignal): Promise<Produtor> {
    return atualizar<Produtor, ProdutorDTO>(`/produtores/${id}`, dados, sinal);
}

/**
 * DELETE /produtores/{id} -> Remove um produtor (se não tiver propriedades filhas).
 */
export function deletarProdutor(id: number, sinal?: AbortSignal): Promise<void> {
    return remover(`/produtores/${id}`, sinal);
}

/**
 * GET /produtores/{id}/propriedades -> Rota aninhada do 1:N que lista as propriedades do produtor.
 */
export function listarPropriedadesDoProdutor(produtorId: number, sinal?: AbortSignal): Promise<Propriedade[]> {
    return buscar<Propriedade[]>(`/produtores/${produtorId}/propriedades`, sinal);
}

/**
 * POST /produtores/{id}/propriedades -> Cadastra uma propriedade rural diretamente para o produtor {id}.
 */
export function cadastrarPropriedadeDoProdutor(
    produtorId: number,
    dados: PropriedadeDTO,
    sinal?: AbortSignal
): Promise<Propriedade> {
    return enviar<Propriedade, PropriedadeDTO>(`/produtores/${produtorId}/propriedades`, dados, sinal);
}
