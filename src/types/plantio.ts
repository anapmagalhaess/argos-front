/**
 * Estágios do plantio (CHECK no Oracle e validação no Java).
 */
export type EstagioPlantio =
    | 'PREPARO'
    | 'PLANTIO'
    | 'CRESCIMENTO'
    | 'FLORACAO'
    | 'COLHEITA';

/**
 * Entidade Plantio retornada pela API Java (br.com.fiap.argos.entities.Plantio).
 * Correspondente à tabela tb_plantio no Oracle.
 */
export interface Plantio {
    id: number;
    propriedadeId: number;
    culturaId: number;
    areaHa: number;
    /** Data do plantio no formato ISO AAAA-MM-DD */
    dataPlantio: string;
    /** Data prevista da colheita no formato ISO AAAA-MM-DD */
    dataColheitaPrevista: string;
    estagio: EstagioPlantio;
}

/**
 * DTO de entrada para cadastro de plantio (br.com.fiap.argos.dto.PlantioDTO).
 */
export interface PlantioDTO {
    culturaId: number;
    areaHa: number;
    /** Data do plantio no formato ISO AAAA-MM-DD */
    dataPlantio: string;
    /** Data prevista da colheita no formato ISO AAAA-MM-DD */
    dataColheitaPrevista: string;
    estagio: EstagioPlantio;
}
