/**
 * Tipos de alerta cadastrados no Oracle (tb_alerta.tp_alerta).
 */
export type TipoAlerta =
    | 'CHUVA_FORTE'
    | 'SECA'
    | 'CALOR'
    | 'GEADA'
    | 'ENCHENTE'
    | 'PRAGA'
    | 'VENTO';

/**
 * Nível de severidade do alerta:
 * 1: Tudo certo (#2E7D32)
 * 2: Atenção (#F9D648)
 * 3: Perigo (#E8711A)
 * 4: Grande perigo (#C62828)
 */
export type Severidade = 1 | 2 | 3 | 4;

/**
 * Entidade Alerta (tb_alerta no Oracle).
 * Exibido na tela Hoje para avisar o produtor com linguagem simples, fonte e prazo.
 */
export interface Alerta {
    id: number;
    municipioId?: number;
    tipo: TipoAlerta;
    severidade: Severidade;
    titulo: string;
    mensagem: string;
    fonte: string;
    dataInicio: string;
    dataFim: string;
}
