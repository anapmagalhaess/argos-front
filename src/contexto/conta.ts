import { createContext, useContext } from 'react'
import type { Aparelho, DadosDaConta, Sessao } from '../services/sessao'

/** O que qualquer tela pode saber e fazer sobre quem está usando o Argos. */
export interface ContaContexto {
    /** A conta deste aparelho, ou null se ninguém entrou */
    conta: Sessao | null
    /** A identidade deste aparelho (código e dia da primeira visita) */
    aparelho: Aparelho
    /** Guarda a conta. Com `lembrar`, o aparelho reconhece a pessoa nas próximas visitas. */
    entrar: (dados: DadosDaConta, lembrar: boolean) => void
    /** Sai da conta; o aparelho continua com a identidade dele */
    sair: () => void
    /** Sai e apaga também a identidade deste aparelho */
    esquecerAparelho: () => void
}

export const ContaContext = createContext<ContaContexto | null>(null)

export function useConta() {
    const contexto = useContext(ContaContext)
    if (!contexto) throw new Error('useConta precisa estar dentro do ContaProvider')
    return contexto
}
