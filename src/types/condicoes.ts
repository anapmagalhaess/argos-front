/** As vistas da lavoura, depois que o mapa chega perto: cada uma mostra um tipo de informação. */
export type Camada = 'cultura' | 'clima' | 'ar' | 'umidade' | 'solo'

/** Tempo de hoje no lugar da lavoura. */
export interface ClimaDaLavoura {
    temperaturaAgora: number
    minima: number
    maxima: number
    /** Chance de chover hoje, de 0 a 100. */
    chanceDeChuva: number
    /** Chuva esperada hoje, em milímetros. */
    chuvaMm: number
    /** Água no solo, perto da superfície (de 3 a 9 cm), em m³ de água por m³ de solo. */
    umidadeDoSolo: number | null
}

/** Qualidade do ar agora. */
export interface ArDaLavoura {
    /** Índice de qualidade do ar (padrão dos EUA): quanto maior, pior. */
    indice: number
    /** Partículas finas e grossas no ar, em microgramas por metro cúbico. */
    pm25: number
    pm10: number
}

/** O que a tela precisa saber sobre a lavoura aberta. O ar pode faltar sem derrubar o resto. */
export interface CondicoesDaLavoura {
    clima: ClimaDaLavoura
    ar: ArDaLavoura | null
}

/** Propriedades do solo na camada de cima (0 a 5 cm). */
export interface SoloDaLavoura {
    ph: number
    /** Carbono orgânico, em gramas por quilo de solo. */
    carbonoOrganico: number
    /** Nitrogênio, em gramas por quilo de solo. */
    nitrogenio: number
    /** Capacidade de troca de cátions (quanto o solo segura de nutrientes), em cmol por quilo. */
    ctc: number
    /** Argila, em porcentagem. */
    argila: number
}

/** Leitura simples de um número: uma palavra, um nível (1 é o melhor, 3 o pior) e a cor do filtro. */
export interface Avaliacao {
    rotulo: string
    nivel: 1 | 2 | 3
    cor: string
}

/**
 * Cores das curvas de nível que cobrem o terreno nas camadas de umidade e de solo: o tom dos pontos
 * baixos, o tom dos pontos altos e a cor da linha entre uma faixa de altitude e a seguinte.
 */
export interface PaletaDeCurvas {
    escuro: string
    claro: string
    linha: string
}

/** Respostas da Open-Meteo, só com os campos que o Argos pede. */
export interface RespostaDoClima {
    current: { temperature_2m: number }
    hourly: { time: string[]; soil_moisture_3_to_9cm: (number | null)[] }
    daily: {
        temperature_2m_max: number[]
        temperature_2m_min: number[]
        precipitation_probability_max: (number | null)[]
        precipitation_sum: (number | null)[]
    }
}

/** Ontem, hoje e os próximos cinco dias no município selecionado. */
export interface ClimaMunicipalSeteDias {
    temperaturaAgora: number
    dias: {
        data: string
        codigoTempo: number
        minima: number
        maxima: number
        chanceDeChuva: number
        chuvaMm: number
    }[]
}

export interface RespostaClimaMunicipalSeteDias {
    current: { temperature_2m: number }
    daily: {
        time: string[]
        weather_code: number[]
        temperature_2m_max: number[]
        temperature_2m_min: number[]
        precipitation_probability_max: (number | null)[]
        precipitation_sum: number[]
    }
}

export interface RespostaDoAr {
    current: { us_aqi: number | null; pm2_5: number | null; pm10: number | null }
}
