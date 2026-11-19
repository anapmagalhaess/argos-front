import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import LogoArgos from '../LogoArgos/LogoArgos'

/** O vídeo da abertura: colheita de soja no Brasil, vista de drone. Uso livre, pela licença do Pexels. */
const VIDEO = {
    arquivo: '/videos/colheita-de-soja.mp4',
    capa: '/videos/colheita-de-soja.jpg',
    autor: 'Melquizedeque Almeida',
    pagina: 'https://www.pexels.com/video/aerial-view-of-soybean-harvest-in-brazil-32089142/',
}

/** As páginas do site, para o menu da abertura: as mesmas da barra de navegação, mais o mapa e o guia. */
const PAGINAS = [
    { nome: 'Mapa', para: '/mapa' },
    { nome: 'Sobre', para: '/sobre' },
    { nome: 'Solução', para: '/solucao' },
    { nome: 'Guia', para: '/guia/soja' },
    { nome: 'Integrantes', para: '/integrantes' },
    { nome: 'FAQ', para: '/faq' },
    { nome: 'Contato', para: '/contato' },
]

/** O título, uma linha por vez: em telas largas, cada linha começa mais à direita que a de cima. */
const TITULO = ['Aviso', 'antes do', 'problema']

const PILULA =
    'inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-[#E6DAC6]/60 px-7 text-lg font-semibold transition-colors hover:bg-[#E6DAC6] hover:text-[#17110D] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#7DBE8C]'
const FOCO = 'focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#7DBE8C]'

interface AberturaProps {
    /** O `id` da parte que vem logo abaixo: é para onde o convite de rolar leva. */
    proximaParte: string
}

/**
 * Abertura da página inicial, em tela cheia: o vídeo da colheita ao fundo, o título grande em
 * degraus e o menu das páginas do site. Ela fica presa no alto da tela (sticky): ao rolar, o
 * resto da página sobe por cima dela, e os textos se afastam (regra `.afasta-ao-rolar`, no CSS).
 */
export default function Abertura({ proximaParte }: AberturaProps) {
    // Quem pediu menos movimento no aparelho vê a foto da colheita no lugar do vídeo.
    const [semMovimento] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const [menuAberto, setMenuAberto] = useState(false)

    return (
        <section
            id="inicio"
            className="sticky top-0 h-svh min-h-[44rem] overflow-hidden bg-[#17110D] font-sans text-[#E6DAC6]"
        >
            {semMovimento ? (
                <img src={VIDEO.capa} alt="" className="absolute inset-0 size-full object-cover" />
            ) : (
                // O vídeo é só enfeite: sem som, em repetição, e escondido dos leitores de tela.
                <video
                    aria-hidden="true"
                    src={VIDEO.arquivo}
                    poster={VIDEO.capa}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 size-full object-cover"
                />
            )}

            {/* Escurece o vídeo por igual e mais à esquerda e embaixo, para os textos ficarem legíveis. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#17110D]/45" />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-linear-to-r from-[#17110D]/60 to-transparent"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-[#17110D]/85 to-transparent"
            />

            {/* Três linhas finas de cima a baixo dividem a tela em colunas, como numa página de revista. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
                <div className="linha-guia absolute inset-y-0 left-[16.66%] w-px bg-[#E6DAC6]/15" />
                <div className="linha-guia absolute inset-y-0 left-[54%] w-px bg-[#E6DAC6]/15 [animation-delay:150ms]" />
                <div className="linha-guia absolute inset-y-0 left-[91.66%] w-px bg-[#E6DAC6]/15 [animation-delay:300ms]" />
            </div>

            <div className="afasta-ao-rolar absolute inset-0">
                {/* O alto da tela: a marca à esquerda e o lema na terceira coluna. */}
                <div className="absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-8 md:px-12 md:pt-12">
                    {/* O logotipo do Argos, o mesmo da barra de navegação e do rodapé. */}
                    <LogoArgos className="entrada text-[28px] text-bege" />
                </div>

                {/* Em telas maiores o menu fica na lateral; até 1090px, abre pelo botão hambúrguer. */}
                <nav
                    aria-label="Páginas do site"
                    className="absolute inset-x-auto top-1/2 left-0 hidden -translate-y-1/2 flex-col gap-3 min-[1091px]:flex"
                >
                    {PAGINAS.map((pagina, ordem) => (
                        <Link
                            key={pagina.para}
                            to={pagina.para}
                            style={{ animationDelay: `${500 + ordem * 90}ms` }}
                            className={`entrada group flex min-h-11 items-center gap-5 text-lg font-semibold ${FOCO}`}
                        >
                            <span
                                aria-hidden="true"
                                className="ml-6 h-px w-8 bg-current opacity-70 transition-[width,margin,opacity] duration-300 group-hover:ml-0 group-hover:w-14 group-hover:opacity-100"
                            />
                            {pagina.nome}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    aria-label={menuAberto ? 'Fechar menu de páginas' : 'Abrir menu de páginas'}
                    aria-expanded={menuAberto}
                    aria-controls="menu-inicio-mobile"
                    onClick={() => setMenuAberto((aberto) => !aberto)}
                    className={`absolute top-7 right-6 z-30 flex size-12 items-center justify-center rounded-full border border-[#E6DAC6]/70 bg-[#17110D]/55 text-[#E6DAC6] backdrop-blur transition-colors hover:bg-[#E6DAC6] hover:text-[#17110D] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#7DBE8C] md:top-11 md:right-12 min-[1091px]:hidden ${FOCO}`}
                >
                    <span className="sr-only">{menuAberto ? 'Fechar menu' : 'Abrir menu'}</span>
                    <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
                        <span className={`h-0.5 w-full bg-current transition-transform ${menuAberto ? 'translate-y-2 rotate-45' : ''}`} />
                        <span className={`h-0.5 w-full bg-current transition-opacity ${menuAberto ? 'opacity-0' : ''}`} />
                        <span className={`h-0.5 w-full bg-current transition-transform ${menuAberto ? '-translate-y-2 -rotate-45' : ''}`} />
                    </span>
                </button>
                <nav
                    id="menu-inicio-mobile"
                    aria-label="Páginas do site"
                    className={`absolute top-24 right-6 z-20 flex w-[min(20rem,calc(100%-3rem))] flex-col gap-1 rounded-2xl border border-[#E6DAC6]/25 bg-[#17110D]/95 p-3 shadow-2xl backdrop-blur transition-all md:top-28 md:right-12 min-[1091px]:hidden ${menuAberto ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0 pointer-events-none'}`}
                >
                    {PAGINAS.map((pagina) => (
                        <Link key={pagina.para} to={pagina.para} onClick={() => setMenuAberto(false)} className={`flex min-h-12 items-center rounded-xl px-4 font-semibold hover:bg-[#E6DAC6]/10 ${FOCO}`}>
                            {pagina.nome}
                        </Link>
                    ))}
                </nav>

                {/* O título grande, em degraus, sobre o vídeo. */}
                <div className="absolute inset-x-6 top-[30%] md:inset-x-auto md:top-[23%] md:left-[19%]">
                    <h1
                        aria-label="Aviso antes do problema"
                        className="titulo-em-linhas font-display text-[min(3.4rem,calc((100vw-3rem)/6.2))] leading-[0.95] font-bold uppercase md:text-[clamp(4rem,8.6vw,10.5rem)]"
                    >
                        {TITULO.map((linha, ordem) => (
                            <span
                                key={linha}
                                aria-hidden="true"
                                style={{ '--degrau': `${ordem * 7.5}vw` } as CSSProperties}
                                className="block overflow-hidden pb-[0.08em] md:ml-(--degrau)"
                            >
                                <span style={{ animationDelay: `${250 + ordem * 130}ms` }} className="block">
                                    {linha}
                                </span>
                            </span>
                        ))}
                    </h1>
                </div>

                {/* A base da tela: a frase e os botões, o crédito do vídeo e o convite para rolar. */}
                <div className="absolute inset-x-6 bottom-10 md:inset-x-auto md:right-[10%] md:bottom-12 md:left-[58%]">
                    <p style={{ animationDelay: '750ms' }} className="entrada max-w-sm text-lg leading-snug md:text-xl">
                        Chuva, seca e praga, do jeito mais simples de entender.
                    </p>
                    <div style={{ animationDelay: '900ms' }} className="entrada mt-5 flex flex-wrap gap-3">
                        <Link to="/triagem" className={PILULA}>
                            Começar
                        </Link>
                        <Link to="/mapa" className={PILULA}>
                            Ver o mapa
                        </Link>
                    </div>
                </div>
                <p className="absolute bottom-3 left-6 text-xs opacity-70 md:bottom-5 md:left-12">
                    Vídeo:{' '}
                    <a href={VIDEO.pagina} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                        {VIDEO.autor}, Pexels
                    </a>
                </p>
                <a
                    href={`#${proximaParte}`}
                    aria-label="Rolar para o resto da página"
                    className={`absolute right-[3.2%] bottom-12 hidden h-9 w-5.5 justify-center rounded-full border border-[#E6DAC6]/70 pt-1.5 md:flex ${FOCO}`}
                >
                    <span aria-hidden="true" className="rodinha h-2 w-0.5 rounded-full bg-[#E6DAC6]" />
                </a>
            </div>
        </section>
    )
}
