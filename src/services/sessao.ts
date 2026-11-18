import { hojeEmTexto } from '../utils/datas'

/**
 * Quem está usando o Argos neste aparelho. O banco não guarda senha, então a "conta" é só a
 * identificação do produtor (pelo telefone) mais o que a tela precisa: município e roça.
 *
 * Reconhecimento por aparelho: com `lembrar` ligado, a conta fica no localStorage e o aparelho
 * reconhece a pessoa sozinho da próxima vez. Com `lembrar` desligado, fica no sessionStorage e some
 * ao fechar a aba (para aparelho emprestado). Nada disso é enviado a servidor nenhum: vive só neste
 * navegador. Se o navegador bloquear o armazenamento, o Argos funciona igual, só não lembra.
 */
export interface Sessao {
    produtorId: number
    produtorNome: string
    municipioId: number
    municipioNome: string
    propriedadeId: number | null
    propriedadeNome: string | null
    /** Lembrar deste aparelho (localStorage) ou valer só até fechar a aba (sessionStorage) */
    lembrar: boolean
    /** Dia em que a pessoa entrou, AAAA-MM-DD */
    entrouEm: string
}

/** O que a identificação devolve; `lembrar` e `entrouEm` entram na hora de guardar. */
export type DadosDaConta = Omit<Sessao, 'lembrar' | 'entrouEm'>

/** A identidade deste aparelho: um código sorteado na primeira visita e o dia em que isso aconteceu. */
export interface Aparelho {
    id: string
    desde: string
}

export const CHAVE_SESSAO = 'argos:sessao'
const CHAVE_APARELHO = 'argos:aparelho'

function ler(armazenamento: Storage): Sessao | null {
    const texto = armazenamento.getItem(CHAVE_SESSAO)
    if (!texto) return null
    const dados = JSON.parse(texto) as Partial<Sessao>
    if (typeof dados.produtorId !== 'number' || typeof dados.produtorNome !== 'string') return null
    return {
        produtorId: dados.produtorId,
        produtorNome: dados.produtorNome,
        municipioId: dados.municipioId ?? 0,
        municipioNome: dados.municipioNome ?? '',
        propriedadeId: dados.propriedadeId ?? null,
        propriedadeNome: dados.propriedadeNome ?? null,
        // Sessões guardadas antes de existir o "lembrar" valem como "lembrando"
        lembrar: dados.lembrar ?? true,
        entrouEm: dados.entrouEm ?? '',
    }
}

/** A conta guardada neste aparelho (ou nesta aba), se houver. */
export function lerSessao(): Sessao | null {
    try {
        return ler(window.localStorage) ?? ler(window.sessionStorage)
    } catch {
        return null
    }
}

export function salvarSessao(sessao: Sessao) {
    try {
        const [destino, outro] = sessao.lembrar
            ? [window.localStorage, window.sessionStorage]
            : [window.sessionStorage, window.localStorage]
        destino.setItem(CHAVE_SESSAO, JSON.stringify(sessao))
        outro.removeItem(CHAVE_SESSAO)
    } catch {
        // Sem armazenamento: segue sem lembrar.
    }
}

/** Sair: apaga a conta, mas o aparelho continua com a identidade dele. */
export function limparSessao() {
    try {
        window.localStorage.removeItem(CHAVE_SESSAO)
        window.sessionStorage.removeItem(CHAVE_SESSAO)
    } catch {
        // Sem armazenamento: não há o que limpar.
    }
}

function criarId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
    // Em endereço http que não é localhost o navegador não oferece randomUUID: sorteia os bytes à mão
    const bytes = new Uint8Array(16)
    crypto.getRandomValues(bytes)
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

/** A identidade deste aparelho. É criada na primeira chamada e guardada para as próximas. */
export function lerAparelho(): Aparelho {
    try {
        const texto = window.localStorage.getItem(CHAVE_APARELHO)
        if (texto) {
            const guardado = JSON.parse(texto) as Partial<Aparelho>
            if (guardado.id) return { id: guardado.id, desde: guardado.desde ?? hojeEmTexto() }
        }
    } catch {
        // Cai no aparelho novo, logo abaixo.
    }
    const novo: Aparelho = { id: criarId(), desde: hojeEmTexto() }
    try {
        window.localStorage.setItem(CHAVE_APARELHO, JSON.stringify(novo))
    } catch {
        // Sem armazenamento: este código vale só nesta visita.
    }
    return novo
}

/** Esquecer o aparelho: apaga a conta e a identidade dele. */
export function esquecerAparelhoSalvo() {
    limparSessao()
    try {
        window.localStorage.removeItem(CHAVE_APARELHO)
    } catch {
        // Sem armazenamento: não há o que esquecer.
    }
}
