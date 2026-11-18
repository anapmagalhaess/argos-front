/**
 * Valores fechados dos formulários. São os mesmos do CHECK do banco e da validação do Java
 * ("valor" é o que vai para a API; "rotulo" é o que a pessoa lê).
 */
export interface Opcao {
    valor: string
    rotulo: string
}

export const CANAIS: Opcao[] = [
    { valor: 'AUDIO', rotulo: 'Áudio' },
    { valor: 'WHATSAPP', rotulo: 'WhatsApp' },
    { valor: 'SMS', rotulo: 'Mensagem (SMS)' },
    { valor: 'APP', rotulo: 'Aplicativo' },
]

export const LEITURA: Opcao[] = [
    { valor: 'OUVIR', rotulo: 'Ouvir' },
    { valor: 'LER', rotulo: 'Ler' },
    { valor: 'AMBOS', rotulo: 'Os dois' },
]

export const SIM_NAO: Opcao[] = [
    { valor: 'S', rotulo: 'Sim' },
    { valor: 'N', rotulo: 'Não' },
]

export const FONTES_DE_AGUA: Opcao[] = [
    { valor: 'CHUVA', rotulo: 'Chuva' },
    { valor: 'POCO', rotulo: 'Poço' },
    { valor: 'RIO', rotulo: 'Rio' },
    { valor: 'ACUDE', rotulo: 'Açude' },
    { valor: 'CISTERNA', rotulo: 'Cisterna' },
    { valor: 'REDE', rotulo: 'Rede de água' },
]

export const IRRIGACOES: Opcao[] = [
    { valor: 'NAO', rotulo: 'Não irriga' },
    { valor: 'GOTEJAMENTO', rotulo: 'Gotejamento' },
    { valor: 'ASPERSAO', rotulo: 'Aspersão' },
    { valor: 'OUTRA', rotulo: 'Outro jeito' },
]

export const ESTAGIOS: Opcao[] = [
    { valor: 'PREPARO', rotulo: 'Preparando a terra' },
    { valor: 'PLANTIO', rotulo: 'Plantando' },
    { valor: 'CRESCIMENTO', rotulo: 'Crescendo' },
    { valor: 'FLORACAO', rotulo: 'Florescendo' },
    { valor: 'COLHEITA', rotulo: 'Colhendo' },
]

export const INTENSIDADES: Opcao[] = [
    { valor: '1', rotulo: 'Pouco' },
    { valor: '2', rotulo: 'Médio' },
    { valor: '3', rotulo: 'Muito' },
]

/** Acha o rótulo de um valor (ou devolve o próprio valor, se não achar). */
export function rotuloDe(opcoes: Opcao[], valor: string | null | undefined) {
    return opcoes.find((opcao) => opcao.valor === valor)?.rotulo ?? valor ?? ''
}
