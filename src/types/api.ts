// Tipos do contrato JSON da API Java (item 8.4 do documento-guia). Os nomes dos campos são os
// mesmos dos DTOs do Java. Datas no formato AAAA-MM-DD.

export interface CampoComErro {
    campo: string
    mensagem: string
}

/** O JSON de erro padrão, devolvido pela API em todo erro (400, 404, 405, 409, 500). */
export interface ErroDaApi {
    timestamp: string
    status: number
    erro: string
    mensagem: string
    caminho: string
    campos: CampoComErro[]
}

export interface MunicipioResumo {
    id: number
    nome: string
    uf: string
}

export interface Municipio extends MunicipioResumo {
    regiao: string
    latitude: number | null
    longitude: number | null
}

/** Cultura da tabela tb_cultura (não confundir com `Cultura`, a lavoura do mapa). */
export interface CulturaApi {
    id: number
    nome: string
    cicloDias: number | null
    tempIdealMin: number | null
    tempIdealMax: number | null
    aguaCicloMm: number | null
}

export interface PragaApi {
    id: number
    nome: string
    nomeCientifico: string | null
    sintomas: string
    manejo: string
    fonte: string
    urlImagem: string | null
}

export interface AlertaApi {
    id: number
    tipo: string
    /** 1 (tudo certo) a 4 (grande perigo) */
    severidade: number
    titulo: string
    mensagem: string
    fonte: string
    dataInicio: string
    dataFim: string
}

export interface ProdutorEntrada {
    nome: string
    telefone: string
    municipioId: number
    canalPreferido: string
    preferenciaLeitura: string
    nivelUsoCelular?: number
    anosExperiencia?: number
    recebeAter: boolean
    assistido?: boolean
    consentimento: boolean
}

export interface Produtor {
    id: number
    nome: string
    telefone: string
    municipio: MunicipioResumo
    canalPreferido: string
    preferenciaLeitura: string
    nivelUsoCelular: number | null
    anosExperiencia: number | null
    recebeAter: boolean
    assistido: boolean
    consentimento: boolean
    dataConsentimento: string
    dataCadastro: string
}

export interface PropriedadeEntrada {
    nome: string
    municipioId: number
    areaHa: number
    fonteAgua?: string
    irrigacao?: string
    /** "S" ou "N" */
    areaAlagavel?: string
}

export interface Propriedade {
    id: number
    produtorId: number
    municipio: MunicipioResumo
    nome: string
    areaHa: number
    fonteAgua: string | null
    irrigacao: string | null
    areaAlagavel: string | null
}

export interface PlantioEntrada {
    culturaId: number
    areaHa: number
    dataPlantio: string
    dataColheitaPrevista: string
    estagio: string
}

export interface Plantio {
    id: number
    propriedadeId: number
    culturaId: number
    culturaNome: string
    areaHa: number
    dataPlantio: string
    dataColheitaPrevista: string
    estagio: string
}

export interface OcorrenciaEntrada {
    /** Fica de fora quando o produtor não sabe qual praga é */
    pragaId?: number
    dataOcorrencia?: string
    intensidade: number
    observacao?: string
}

export interface Ocorrencia {
    id: number
    plantioId: number
    pragaId: number | null
    pragaNome: string | null
    dataOcorrencia: string
    intensidade: number
    observacao: string | null
    confirmada: boolean
}
