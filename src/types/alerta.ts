/*
    Tipos do alerta, iguais ao AlertaResponseDto da API Java e à tabela tb_alerta do banco.
    Rota: GET /municipios/{cd}/alertas -> AlertaResponse[] (só os avisos que ainda valem hoje).
*/

/** Os 7 tipos aceitos pelo CHECK de tb_alerta.tp_alerta (Documento-Guia, item 8.2). */
export type TipoAlerta = 'CHUVA_FORTE' | 'SECA' | 'CALOR' | 'GEADA' | 'ENCHENTE' | 'PRAGA' | 'VENTO'

/** Nível do aviso, de 1 (tudo certo) a 4 (grande perigo). Vem de tb_alerta.nv_severidade. */
export type SeveridadeAlerta = 1 | 2 | 3 | 4

/** Um alerta como a API devolve. Datas no formato AAAA-MM-DD. */
export interface AlertaResponse {
    id: number
    tipo: TipoAlerta
    severidade: SeveridadeAlerta
    titulo: string
    /** Texto curto, em linguagem simples, para o produtor. */
    mensagem: string
    /** Fonte oficial (INMET, Defesa Civil, Embrapa). Regra RN04: todo alerta tem fonte. */
    fonte: string
    dataInicio: string
    dataFim: string
}

/** Nome curto usado pela camada de serviços da tela Hoje. */
export type Alerta = AlertaResponse;

/** Nome de cada tipo para mostrar na tela: a tela nunca mostra "CHUVA_FORTE". */
export const ROTULO_TIPO_ALERTA: Record<TipoAlerta, string> = {
    CHUVA_FORTE: 'Chuva forte',
    SECA: 'Seca',
    CALOR: 'Calor',
    GEADA: 'Geada',
    ENCHENTE: 'Enchente',
    PRAGA: 'Praga',
    VENTO: 'Vento forte',
}
