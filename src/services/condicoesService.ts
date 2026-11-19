import type { ArDaLavoura, ClimaDaLavoura, ClimaMunicipalSeteDias, RespostaClimaMunicipalSeteDias, RespostaDoAr, RespostaDoClima } from '../types/condicoes'

/** Open-Meteo: previsão do tempo e qualidade do ar, gratuitas e sem chave. */
const API_DO_CLIMA = 'https://api.open-meteo.com/v1/forecast'
const API_DO_AR = 'https://air-quality-api.open-meteo.com/v1/air-quality'

/** Faz o pedido com fetch e devolve o JSON já com o tipo certo. Resposta com erro vira exceção. */
async function buscarJson<T>(endereco: string, sinal: AbortSignal): Promise<T> {
    const resposta = await fetch(endereco, { signal: sinal })
    if (!resposta.ok) throw new Error(`O serviço respondeu com o erro ${resposta.status}.`)
    return (await resposta.json()) as T
}

/** Tempo de hoje e água no solo, no ponto da lavoura. */
export async function buscarClima(latitude: number, longitude: number, sinal: AbortSignal): Promise<ClimaDaLavoura> {
    const parametros = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: 'temperature_2m',
        hourly: 'soil_moisture_3_to_9cm',
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum',
        forecast_days: '1',
        timezone: 'auto',
    })
    const dados = await buscarJson<RespostaDoClima>(`${API_DO_CLIMA}?${parametros}`, sinal)
    // A umidade vem hora a hora: vale a última hora que já tem valor.
    const umidades = dados.hourly.soil_moisture_3_to_9cm.filter((valor): valor is number => valor !== null)
    const horaAtual = Math.min(new Date().getHours(), umidades.length - 1)
    return {
        temperaturaAgora: dados.current.temperature_2m,
        minima: dados.daily.temperature_2m_min[0],
        maxima: dados.daily.temperature_2m_max[0],
        chanceDeChuva: dados.daily.precipitation_probability_max[0] ?? 0,
        chuvaMm: dados.daily.precipitation_sum[0] ?? 0,
        umidadeDoSolo: umidades.length ? umidades[Math.max(horaAtual, 0)] : null,
    }
}

/** Clima de ontem e previsão de hoje mais os próximos cinco dias no município selecionado. */
export async function buscarClimaMunicipalSeteDias(
    latitude: number,
    longitude: number,
    sinal: AbortSignal,
): Promise<ClimaMunicipalSeteDias> {
    const parametros = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: 'temperature_2m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum',
        past_days: '1',
        forecast_days: '6',
        timezone: 'auto',
    })
    const dados = await buscarJson<RespostaClimaMunicipalSeteDias>(`${API_DO_CLIMA}?${parametros}`, sinal)
    return {
        temperaturaAgora: dados.current.temperature_2m,
        dias: dados.daily.time.map((data, i) => ({
            data,
            codigoTempo: dados.daily.weather_code[i],
            minima: dados.daily.temperature_2m_min[i],
            maxima: dados.daily.temperature_2m_max[i],
            chanceDeChuva: dados.daily.precipitation_probability_max[i] ?? 0,
            chuvaMm: dados.daily.precipitation_sum[i] ?? 0,
        })),
    }
}

/** Qualidade do ar agora, no ponto da lavoura. Devolve `null` se o lugar não tiver medição. */
export async function buscarAr(latitude: number, longitude: number, sinal: AbortSignal): Promise<ArDaLavoura | null> {
    const parametros = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: 'us_aqi,pm2_5,pm10',
        timezone: 'auto',
    })
    const { current } = await buscarJson<RespostaDoAr>(`${API_DO_AR}?${parametros}`, sinal)
    if (current.us_aqi === null) return null
    return { indice: current.us_aqi, pm25: current.pm2_5 ?? 0, pm10: current.pm10 ?? 0 }
}
