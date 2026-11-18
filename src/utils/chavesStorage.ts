/**
 * Chaves do localStorage usadas pela Triagem e pela página Hoje.
 *
 * Manter centralizado aqui garante que ambas as páginas leiam e
 * gravem com as mesmas chaves.
 */
export const CHAVES_STORAGE = {
  /** Código (id) do produtor vindo do cadastro. */
  produtorId: 'argos_produtor_id',
  /** Código (id) da propriedade do produtor. */
  propriedadeId: 'argos_propriedade_id',
  /** Código (id) do município do produtor (atalho para evitar GET extra). */
  municipioId: 'argos_municipio_id',
} as const
