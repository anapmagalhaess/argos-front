/** Corpo de erro padrão devolvido pela API Java do Argos (status 400, 404, 405, 409, 500). */
export interface ErroApi {
  timestamp: string
  status: number
  erro: string
  mensagem: string
  caminho: string
  campos: CampoInvalido[]
}

/** Detalhe de validação quando o erro é 400 (campo que falhou + motivo). */
export interface CampoInvalido {
  campo: string
  mensagem: string
}
