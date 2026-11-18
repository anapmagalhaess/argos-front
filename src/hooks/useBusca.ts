import { useEffect, useState } from 'react'
import { ApiError } from '../services/api'

interface Resultado<T> {
    chave: string
    dados?: T
    erro?: ApiError
}

/**
 * Faz uma chamada à API quando a tela abre (ou quando `chave` muda) e devolve o estado dela:
 * carregando, erro ou dados. `demorando` acende depois de 4 segundos: a API gratuita do Render
 * dorme sem uso e leva alguns segundos para acordar, e a tela pode avisar a pessoa.
 * Passe `buscar = null` para não buscar nada (enquanto falta uma informação, por exemplo).
 * Se a pessoa sair da tela ou a chave mudar no meio, a chamada antiga é cancelada.
 */
export function useBusca<T>(chave: string, buscar: ((sinal: AbortSignal) => Promise<T>) | null) {
    const [tentativa, setTentativa] = useState(0)
    const [resultado, setResultado] = useState<Resultado<T> | null>(null)
    const [demorou, setDemorou] = useState<string | null>(null)
    const chaveAtual = `${chave}#${tentativa}`

    useEffect(() => {
        if (!buscar) return
        const controle = new AbortController()
        const espera = window.setTimeout(() => setDemorou(chaveAtual), 4000)
        buscar(controle.signal)
            .then((dados) => setResultado({ chave: chaveAtual, dados }))
            .catch((erro: unknown) => {
                if (controle.signal.aborted) return
                setResultado({
                    chave: chaveAtual,
                    erro: erro instanceof ApiError ? erro : new ApiError(0, 'Algo deu errado. Tente de novo.'),
                })
            })
            .finally(() => window.clearTimeout(espera))
        return () => {
            controle.abort()
            window.clearTimeout(espera)
        }
        // A função `buscar` é nova a cada desenho da tela: quem manda no "quando buscar" é a chave.
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [chaveAtual])

    // O resultado só vale se for da chamada atual (senão é o da tela anterior)
    const pronto = resultado !== null && resultado.chave === chaveAtual
    return {
        dados: pronto ? resultado.dados : undefined,
        erro: pronto ? resultado.erro : undefined,
        carregando: buscar !== null && !pronto,
        demorando: demorou === chaveAtual && !pronto,
        tentarDeNovo: () => setTentativa((n) => n + 1),
    }
}
