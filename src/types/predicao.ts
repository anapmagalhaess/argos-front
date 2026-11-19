/*
    Tipos da API de IA publicada (repositório argos-ml-api).
    Contrato: Documento-Guia, item 8.5.
*/

/**
 * O clima de uma safra num município: a mesma linha que os modelos usaram no treino.
 * Os nomes precisam ser IGUAIS aos de pacote["colunas"] salvos no .joblib; a API confere
 * campo por campo e devolve 400 se faltar algum.
 */
export interface EntradaPredicao {
    /** Chuva somada no ano, em mm. */
    chuva_total_mm: number
    /** Média da temperatura média, em °C. */
    temp_media: number
    /** Média das temperaturas máximas, em °C. */
    temp_max_media: number
    /** Dias com máxima acima de 35 °C. */
    dias_acima_35: number
    /** Maior sequência de dias seguidos quase sem chuva (menos de 1 mm). */
    maior_seq_seca: number
    /** Índice do El Niño (ONI, da NOAA): acima de 0,5 é El Niño. */
    oni: number
    /** 1 se o município é do Sul, 0 se é do Nordeste. */
    regiao_sul: 0 | 1
    /** Média de rendimento (kg/ha) dos 5 anos anteriores. */
    media_5a: number
}

/** Respostas de risco que a API de IA devolve. */
export type NivelRisco = 'BAIXO' | 'MEDIO' | 'ALTO'

/** POST /api/v1/risco-quebra -> 200 */
export interface RespostaRiscoQuebra {
    risco: NivelRisco
    /** Chance de quebra de safra, de 0 a 1 (0,78 = 78%). */
    probabilidade: number
    /** Nome do modelo que respondeu, ex.: "logreg_v1". */
    modelo: string
}

/** POST /api/v1/produtividade -> 200 */
export interface RespostaProdutividade {
    /** Quanto o modelo prevê colher, em kg por hectare. */
    kg_ha_previsto: number
    modelo: string
}

/** GET /api/v1/saude -> 200 */
export interface RespostaSaudeMl {
    status: string
}

/** Erro da API de IA (400 quando falta campo): { "erro": "Falta o campo chuva_total_mm" } */
export interface ErroApiMl {
    erro: string
}
