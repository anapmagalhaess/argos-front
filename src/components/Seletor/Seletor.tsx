import type { ReactNode } from 'react'

interface SeletorProps {
    /** Posição atual, começando em 0, e quantas opções existem. */
    indice: number
    total: number
    titulo: string
    /** O que as setas dizem para quem usa leitor de tela: "Lavoura anterior", "Próxima camada"... */
    rotuloAnterior: string
    rotuloProximo: string
    onPassar: (passo: number) => void
    /** Em telas largas, alinha tudo à esquerda (o seletor de lavouras fica numa coluna lateral). */
    aEsquerda?: boolean
    children?: ReactNode
}

const SETA =
    'flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#7DBE8C]'

/**
 * Seletor com setas: mostra "2/4", o título da opção atual e, embaixo, o que vier dentro dele.
 * É usado para escolher a lavoura no mapa do Brasil e a camada na lavoura aberta.
 */
export default function Seletor({
    indice,
    total,
    titulo,
    rotuloAnterior,
    rotuloProximo,
    onPassar,
    aEsquerda = false,
    children,
}: SeletorProps) {
    const alinhamento = aEsquerda ? 'items-center text-center md:items-start md:text-left' : 'items-center text-center'
    return (
        <div className={`flex flex-col text-[#E6DAC6] ${alinhamento}`}>
            <div className="flex items-center gap-1">
                <button type="button" onClick={() => onPassar(-1)} aria-label={rotuloAnterior} className={SETA}>
                    <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-[#E6DAC6] pb-0.5 text-xl leading-none text-[#17110D]">
                        ‹
                    </span>
                </button>
                <p className="font-display leading-none" aria-live="polite">
                    <span className="text-5xl font-semibold">{indice + 1}</span>
                    <span className="text-3xl opacity-60">/{total}</span>
                </p>
                <button type="button" onClick={() => onPassar(1)} aria-label={rotuloProximo} className={SETA}>
                    <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-[#E6DAC6] pb-0.5 text-xl leading-none text-[#17110D]">
                        ›
                    </span>
                </button>
            </div>
            {/* A chave muda com o título: o bloco é montado de novo e a animação de entrada roda outra vez. */}
            <div key={titulo} className={`entrada flex flex-col ${alinhamento}`}>
                <p className="font-display text-4xl leading-tight font-semibold sm:text-5xl">{titulo}</p>
                {children}
            </div>
        </div>
    )
}
