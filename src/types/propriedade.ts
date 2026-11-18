/**
 * Opções válidas para fonte de água (CHECK no Oracle e validação no Java).
 */
export type FonteAgua = 'CHUVA' | 'POCO' | 'RIO' | 'ACUDE' | 'CISTERNA' | 'REDE';

/**
 * Opções válidas para tipo de irrigação (CHECK no Oracle e validação no Java).
 */
export type Irrigacao = 'NAO' | 'GOTEJAMENTO' | 'ASPERSAO' | 'OUTRA';

/**
 * Entidade Propriedade retornada pela API Java (br.com.fiap.argos.entities.Propriedade).
 * Correspondente à tabela tb_propriedade no Oracle.
 */
export interface Propriedade {
    id: number;
    produtorId: number;
    municipioId: number;
    nome: string;
    areaHa: number;
    fonteAgua?: FonteAgua | string;
    irrigacao?: Irrigacao | string;
}

/**
 * DTO de entrada para criação e atualização de propriedade (br.com.fiap.argos.dto.PropriedadeDTO).
 */
export interface PropriedadeDTO {
    nome: string;
    municipioId: number;
    areaHa: number;
    fonteAgua?: FonteAgua | string;
    irrigacao?: Irrigacao | string;
}
