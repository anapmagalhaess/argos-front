/**
 * Chaves centralizadas para armazenamento seguro no localStorage do navegador.
 * Compartilhadas entre a Triagem, a página Hoje e os serviços.
 */
export const CHAVES_STORAGE = {
    /** Código ID do produtor cadastrado */
    produtorId: 'argos_produtor_id',
    /** Código ID da propriedade selecionada/cadastrada */
    propriedadeId: 'argos_propriedade_id',
    /** Código IBGE do município do produtor */
    municipioId: 'argos_municipio_id',
} as const;
