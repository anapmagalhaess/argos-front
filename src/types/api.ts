// Tipos do contrato JSON da API Java do Argos (produtor, propriedade e plantio). Os nomes dos campos
// são os mesmos das entidades e dos DTOs do Java. Datas no formato AAAA-MM-DD.

export interface CampoComErro {
    campo: string
    mensagem: string
}

/** O JSON de erro padrão da API (400, 404, 405, 409, 500). Em `campos`, cada texto vem como "campo: mensagem". */
export interface ErroDaApi {
    status: number
    mensagem: string
    campos: string[]
}

export interface ProdutorEntrada {
    nome: string
    telefone: string
    municipioId: number
    canalPreferido: string
    preferenciaLeitura: string
    anosExperiencia?: number
    recebeAter: boolean
    consentimento: boolean
}

export interface Produtor {
    id: number
    nome: string
    telefone: string
    municipioId: number
    canalPreferido: string
    preferenciaLeitura: string
    anosExperiencia: number
    recebeAter: boolean
    consentimento: boolean
}

export interface PropriedadeEntrada {
    nome: string
    municipioId: number
    areaHa: number
    fonteAgua?: string
    irrigacao?: string
}

export interface Propriedade {
    id: number
    produtorId: number
    municipioId: number
    nome: string
    areaHa: number
    fonteAgua: string | null
    irrigacao: string | null
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
    areaHa: number
    dataPlantio: string
    dataColheitaPrevista: string
    estagio: string
}
