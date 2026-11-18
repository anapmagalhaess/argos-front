/**
 * Modelo de erro retornado pela API REST Java do Argos.
 * Mapeia a classe br.com.fiap.argos.handler.Erro do Spring Boot.
 */
export interface ErroApi {
    /** Código de status HTTP (ex: 400, 404, 405, 409, 500) */
    status: number;
    /** Mensagem descritiva do erro */
    mensagem: string;
    /** Lista de mensagens ou campos inválidos (especialmente em erros 400 de Bean Validation) */
    campos?: string[];
    /** Campos opcionais caso o payload siga o formato RFC 7807 expandido */
    timestamp?: string;
    erro?: string;
    caminho?: string;
}
