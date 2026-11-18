/**
 * Opções de canais de comunicação preferidos pelo produtor (CHECK no Oracle e validação no Java).
 */
export type CanalPreferido = 'APP' | 'AUDIO' | 'SMS' | 'WHATSAPP';

/**
 * Opções de preferência de leitura do produtor.
 */
export type PreferenciaLeitura = 'OUVIR' | 'LER' | 'AMBOS';

/**
 * Entidade Produtor retornada pela API Java (br.com.fiap.argos.entities.Produtor).
 * Correspondente à tabela tb_produtor no Oracle.
 */
export interface Produtor {
    id: number;
    nome: string;
    telefone: string;
    municipioId: number;
    canalPreferido: CanalPreferido;
    preferenciaLeitura: PreferenciaLeitura;
    anosExperiencia: number;
    recebeAter: boolean;
    consentimento: boolean;
}

/**
 * DTO de entrada para cadastro e atualização de produtor (br.com.fiap.argos.dto.ProdutorDTO).
 */
export interface ProdutorDTO {
    nome: string;
    telefone: string;
    municipioId: number;
    canalPreferido: CanalPreferido;
    preferenciaLeitura: PreferenciaLeitura;
    anosExperiencia?: number;
    recebeAter: boolean;
    consentimento: boolean;
}
