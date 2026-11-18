import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ApiError, buscarProdutor } from '../services/api'
import {
    CHAVE_SESSAO,
    esquecerAparelhoSalvo,
    lerAparelho,
    lerSessao,
    limparSessao,
    salvarSessao,
} from '../services/sessao'
import type { DadosDaConta } from '../services/sessao'
import { hojeEmTexto } from '../utils/datas'
import { ContaContext } from './conta'

/**
 * Guarda quem está usando o Argos e avisa todas as telas quando isso muda. Ao abrir o site, a conta
 * já vem do que este aparelho guardou (é o "reconhecimento por aparelho"), e logo depois ela é
 * conferida na API: se o produtor não existe mais, a conta sai. Sem internet, a conta fica como está.
 */
export default function ContaProvider({ children }: { children: ReactNode }) {
    const [conta, setConta] = useState(lerSessao)
    const [aparelho, setAparelho] = useState(lerAparelho)
    const produtorId = conta?.produtorId ?? null

    // Confere se o produtor ainda existe. Só o 404 derruba a conta; erro de rede não.
    useEffect(() => {
        if (produtorId === null) return
        const controle = new AbortController()
        buscarProdutor(produtorId, controle.signal).catch((erro: unknown) => {
            if (controle.signal.aborted) return
            if (erro instanceof ApiError && erro.status === 404) {
                limparSessao()
                setConta(null)
            }
        })
        return () => controle.abort()
    }, [produtorId])

    // Entrou ou saiu em outra aba: esta aba acompanha
    useEffect(() => {
        const aoMudar = (evento: StorageEvent) => {
            if (evento.key === null || evento.key === CHAVE_SESSAO) setConta(lerSessao())
        }
        window.addEventListener('storage', aoMudar)
        return () => window.removeEventListener('storage', aoMudar)
    }, [])

    const entrar = useCallback((dados: DadosDaConta, lembrar: boolean) => {
        const sessao = { ...dados, lembrar, entrouEm: hojeEmTexto() }
        salvarSessao(sessao)
        setConta(sessao)
        setAparelho(lerAparelho())
    }, [])

    const sair = useCallback(() => {
        limparSessao()
        setConta(null)
    }, [])

    const esquecerAparelho = useCallback(() => {
        esquecerAparelhoSalvo()
        setConta(null)
        setAparelho(lerAparelho())
    }, [])

    const valor = useMemo(
        () => ({ conta, aparelho, entrar, sair, esquecerAparelho }),
        [conta, aparelho, entrar, sair, esquecerAparelho],
    )
    return <ContaContext.Provider value={valor}>{children}</ContaContext.Provider>
}
