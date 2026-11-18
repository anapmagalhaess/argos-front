/*
    Tabelas de apoio do banco (tb_municipio e tb_cultura). A API publicada não tem rotas para elas:
    só expõe produtores, propriedades e plantios, e recebe os ids (municipioId, culturaId). Por isso
    a lista fica aqui, igual ao script argos_banco.sql. Se o script mudar, muda aqui também.
*/

export interface MunicipioRef {
    id: number
    nome: string
    uf: string
    regiao: string
}

export interface CulturaRef {
    id: number
    nome: string
    cicloDias: number
}

export const MUNICIPIOS: MunicipioRef[] = [
    { id: 2611101, nome: 'Petrolina', uf: 'PE', regiao: 'NORDESTE' },
    { id: 2918407, nome: 'Juazeiro', uf: 'BA', regiao: 'NORDESTE' },
    { id: 2408003, nome: 'Mossoró', uf: 'RN', regiao: 'NORDESTE' },
    { id: 2208007, nome: 'Picos', uf: 'PI', regiao: 'NORDESTE' },
    { id: 4302105, nome: 'Bento Gonçalves', uf: 'RS', regiao: 'SUL' },
    { id: 4314100, nome: 'Passo Fundo', uf: 'RS', regiao: 'SUL' },
    { id: 4204202, nome: 'Chapecó', uf: 'SC', regiao: 'SUL' },
    { id: 4104808, nome: 'Cascavel', uf: 'PR', regiao: 'SUL' },
]

// Os ids seguem a ordem das sequences do banco: MILHO é 1, FEIJAO 2, e assim por diante
export const CULTURAS: CulturaRef[] = [
    { id: 1, nome: 'Milho', cicloDias: 125 },
    { id: 2, nome: 'Feijão', cicloDias: 90 },
    { id: 3, nome: 'Mandioca', cicloDias: 365 },
    { id: 4, nome: 'Soja', cicloDias: 120 },
    { id: 5, nome: 'Trigo', cicloDias: 120 },
    { id: 6, nome: 'Sorgo', cicloDias: 110 },
]

export const municipioPorId = (id: number) => MUNICIPIOS.find((m) => m.id === id)

export const culturaPorId = (id: number) => CULTURAS.find((c) => c.id === id)

/** "Petrolina (PE)"; se o código não está na lista, cai num texto neutro. */
export const rotuloDoMunicipio = (id: number) => {
    const m = municipioPorId(id)
    return m ? `${m.nome} (${m.uf})` : 'Município não listado'
}
