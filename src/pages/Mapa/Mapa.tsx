import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import CartaoCultura from '../../components/CartaoCultura/CartaoCultura'
import CartaoDoPonto from '../../components/CartaoDoPonto/CartaoDoPonto'
import CatalogoPragas from '../../components/CatalogoPragas/CatalogoPragas'
import NavegacaoDasPartes from '../../components/NavegacaoDasPartes/NavegacaoDasPartes'
import Nuvens from '../../components/Nuvens/Nuvens'
import PainelLavoura from '../../components/PainelLavoura/PainelLavoura'
import Revelar from '../../components/Revelar/Revelar'
import SeletorCultura from '../../components/SeletorCultura/SeletorCultura'
import { CULTURAS, FONTE_DA_PRODUCAO } from '../../data/culturas'
import { SOLOS } from '../../data/solos'
import { useCondicoes } from '../../hooks/useCondicoes'
import { useRolagemDireta } from '../../hooks/useRolagemDireta'
import type { Camada } from '../../types/condicoes'
import { CAMADAS, descreverCamada } from '../../utils/descreverCamada'

// O mapa (e a biblioteca de mapas) chega num arquivo à parte: o texto da página aparece antes.
const MapaArgos = lazy(() => import('../../components/MapaArgos/MapaArgos'))

/** As partes da página, na ordem em que aparecem, para o menu fixo da lateral. */
const PARTES = [
    { id: 'mapa', nome: 'Mapa' },
    { id: 'lavouras', nome: 'Lavouras' },
    { id: 'pragas', nome: 'Pragas' },
]

/** Uma girada do mouse leva direto do mapa para as lavouras, e de volta. */
const PARADAS = ['mapa', 'lavouras']

const PILULA =
    'pointer-events-auto inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-[#E6DAC6]/60 px-7 text-lg font-semibold transition-colors hover:bg-[#E6DAC6] hover:text-[#17110D] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#7DBE8C]'

/** Três linhas finas de cima a baixo dividem a tela em colunas, como numa página de revista. */
function LinhasGuia() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
            <div className="linha-guia absolute inset-y-0 left-[16.66%] w-px bg-[#E6DAC6]/15" />
            <div className="linha-guia absolute inset-y-0 left-[54%] w-px bg-[#E6DAC6]/15 [animation-delay:150ms]" />
            <div className="linha-guia absolute inset-y-0 left-[91.66%] w-px bg-[#E6DAC6]/15 [animation-delay:300ms]" />
        </div>
    )
}

/**
 * Página do mapa (/mapa): o Brasil em imagem de satélite com as seis lavouras, a lista de
 * lavouras e o catálogo de pragas.
 */
export default function Mapa() {
    // A lavoura em destaque no mapa. Os marcadores e o seletor mudam o mesmo estado.
    const [selecionada, setSelecionada] = useState(CULTURAS[0].slug)
    // A lavoura aberta: a câmera voa até ela e aparecem as camadas. Tudo aqui nesta página.
    const [aberta, setAberta] = useState<string | null>(null)
    const [camada, setCamada] = useState<Camada>('cultura')
    // Sem internet as imagens não carregam: a página continua funcionando e avisa.
    const [semImagem, setSemImagem] = useState(false)

    // O mapa só é montado quando a seção dele está na tela: a descida do planeta até o Brasil
    // acontece na frente de quem está olhando.
    const secaoDoMapaRef = useRef<HTMLElement>(null)
    const [mapaPerto, setMapaPerto] = useState(false)
    useEffect(() => {
        const secao = secaoDoMapaRef.current
        if (!secao) return
        const observador = new IntersectionObserver(
            ([entrada]) => {
                if (!entrada.isIntersecting) return
                setMapaPerto(true)
                observador.disconnect()
            },
            { rootMargin: '0px 0px -25% 0px' },
        )
        observador.observe(secao)
        return () => observador.disconnect()
    }, [])

    useRolagemDireta(PARADAS)

    const culturaAberta = CULTURAS.find((cultura) => cultura.slug === aberta) ?? null
    const estado = useCondicoes(culturaAberta)
    const condicoes = estado.situacao === 'pronto' ? estado.condicoes : null
    const descricao = descreverCamada(
        camada,
        culturaAberta,
        condicoes,
        culturaAberta ? SOLOS[culturaAberta.slug] : undefined,
    )

    const abrir = useCallback((slug: string) => {
        setSelecionada(slug)
        setCamada('cultura')
        setAberta(slug)
    }, [])
    const voltar = useCallback(() => setAberta(null), [])
    const avisarSemImagem = useCallback(() => setSemImagem(true), [])
    const avisarComImagem = useCallback(() => setSemImagem(false), [])

    // O teclado: as setas para os lados trocam de lavoura (ou de camada, com a lavoura aberta),
    // Enter abre a lavoura em destaque e Esc volta ao mapa do Brasil.
    useEffect(() => {
        const aoTeclar = (evento: KeyboardEvent) => {
            // Só vale com o mapa na tela.
            const secao = secaoDoMapaRef.current
            if (!secao) return
            const caixa = secao.getBoundingClientRect()
            if (caixa.bottom < window.innerHeight * 0.5 || caixa.top > window.innerHeight * 0.5) return

            if (evento.key === 'Escape' && aberta) {
                voltar()
                return
            }
            const passo = evento.key === 'ArrowRight' ? 1 : evento.key === 'ArrowLeft' ? -1 : 0
            if (passo !== 0) {
                evento.preventDefault()
                if (aberta) {
                    const indice = CAMADAS.indexOf(camada)
                    setCamada(CAMADAS[(indice + passo + CAMADAS.length) % CAMADAS.length])
                } else {
                    const indice = CULTURAS.findIndex((cultura) => cultura.slug === selecionada)
                    setSelecionada(CULTURAS[(indice + passo + CULTURAS.length) % CULTURAS.length].slug)
                }
                return
            }
            // Num botão ou num link, o Enter já tem o serviço dele: apertar o que está em foco.
            const emBotao = evento.target instanceof HTMLButtonElement || evento.target instanceof HTMLAnchorElement
            if (evento.key === 'Enter' && !aberta && !emBotao) abrir(selecionada)
        }
        window.addEventListener('keydown', aoTeclar)
        return () => window.removeEventListener('keydown', aoTeclar)
    }, [aberta, camada, selecionada, abrir, voltar])

    return (
        <main className="bg-[#17110D] font-sans text-[#17110D]">
            <NavegacaoDasPartes partes={PARTES} />

            <div className="bg-[#E6DAC6]">
            {/* O mapa: o Brasil em imagem de satélite, com as seis lavouras. */}
            <section
                id="mapa"
                ref={secaoDoMapaRef}
                aria-label="Mapa das lavouras"
                className="relative h-svh min-h-[50rem] overflow-hidden bg-[#17110D] text-[#E6DAC6]"
            >
                {mapaPerto && (
                    <Suspense fallback={null}>
                        <MapaArgos
                            culturas={CULTURAS}
                            selecionada={selecionada}
                            aberta={culturaAberta}
                            camada={camada}
                            filtro={culturaAberta ? descricao.filtro : null}
                            curvas={culturaAberta ? descricao.curvas : null}
                            zona={culturaAberta ? descricao.zona : null}
                            cartao={
                                culturaAberta && descricao.cartao.length > 0 ? (
                                    <CartaoDoPonto itens={descricao.cartao} />
                                ) : undefined
                            }
                            onSelecionar={setSelecionada}
                            onAbrir={abrir}
                            onCamada={setCamada}
                            onFalhou={avisarSemImagem}
                            onCarregou={avisarComImagem}
                        />
                    </Suspense>
                )}

                <Nuvens
                    visivel={culturaAberta !== null && camada === 'clima'}
                    chanceDeChuva={condicoes?.clima.chanceDeChuva ?? 0}
                />

                {/* Escurece o alto e a base da imagem, para os textos ficarem legíveis. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-linear-to-b from-[#17110D]/80 to-transparent"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-linear-to-t from-[#17110D]/95 via-[#17110D]/60 to-transparent"
                />
                <LinhasGuia />

                <Link
                    to="/"
                    className={`absolute top-8 right-6 z-20 md:top-12 md:right-16 ${PILULA}`}
                >
                    <span aria-hidden="true">←</span> Início
                </Link>

                {culturaAberta ? (
                    // Lavoura aberta: o nome dela, o lugar e a volta ao mapa.
                    <div
                        key={culturaAberta.slug}
                        className="pointer-events-none absolute top-8 left-6 z-20 md:top-12 md:left-12"
                    >
                        <h2 className="titulo-em-linhas font-display text-5xl leading-none font-bold uppercase sm:text-6xl">
                            <span className="block overflow-hidden pb-1">
                                <span className="block">{culturaAberta.nome}</span>
                            </span>
                        </h2>
                        <p
                            style={{ animationDelay: '250ms' }}
                            className="entrada mt-2 font-condensed text-xl font-semibold tracking-[0.12em] uppercase"
                        >
                            {culturaAberta.municipio}, {culturaAberta.uf}
                        </p>
                        <button
                            type="button"
                            onClick={voltar}
                            style={{ animationDelay: '400ms' }}
                            className={`entrada mt-5 ${PILULA}`}
                        >
                            <span aria-hidden="true">←</span> Voltar ao mapa
                        </button>
                    </div>
                ) : (
                    // Brasil inteiro: o que é este mapa e como usar.
                    <Revelar className="pointer-events-none absolute top-8 left-6 z-20 max-w-xs md:top-12 md:left-12 md:max-w-sm">
                        <p className="font-condensed text-lg font-semibold tracking-[0.16em] text-[#D9A650] uppercase">
                            01 · O mapa
                        </p>
                        <h2 className="mt-1 font-display text-4xl leading-[1.02] font-bold uppercase sm:text-5xl">
                            Escolha a lavoura
                        </h2>
                        <p className="mt-3 text-lg leading-snug">
                            Clique num ponto do mapa ou use as setas. Arraste o mapa para olhar em volta. Depois
                            veja o clima, o ar, a umidade e o solo do lugar.
                        </p>
                    </Revelar>
                )}

                {semImagem && !culturaAberta && (
                    <p className="absolute inset-x-8 top-1/2 text-center text-lg" role="status">
                        Sem internet para carregar o mapa. Escolha a lavoura pelas setas, aqui embaixo.
                    </p>
                )}

                {/* A base da tela: com a lavoura aberta, o painel dela no meio; no mapa do Brasil, o seletor
                    de lavouras, que em telas largas fica na coluna da esquerda, embaixo do título. */}
                {culturaAberta ? (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-9 md:pb-11 [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
                        <PainelLavoura
                            cultura={culturaAberta}
                            camada={camada}
                            descricao={descricao}
                            situacao={estado.situacao}
                            mensagemDeErro={estado.situacao === 'erro' ? estado.mensagem : ''}
                            semImagem={semImagem}
                            onCamada={setCamada}
                        />
                    </div>
                ) : (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-9 md:inset-x-auto md:left-12 md:w-[24rem] md:px-0 md:pb-12 [&_button]:pointer-events-auto">
                        <SeletorCultura
                            culturas={CULTURAS}
                            selecionada={selecionada}
                            onSelecionar={setSelecionada}
                            onAbrir={abrir}
                        />
                    </div>
                )}
            </section>

            {/* As mesmas seis lavouras em lista: mais fácil de tocar no celular e de ler com leitor de tela. */}
            <section id="lavouras" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
                <Revelar>
                    <p className="titulo-de-parte font-condensed text-lg font-semibold tracking-[0.16em] text-[#2E5A43] uppercase">
                        02 · Lavouras
                    </p>
                    <h2 className="mt-2 font-display text-4xl leading-[1.02] font-bold text-[#17110D] uppercase sm:text-6xl">
                        Seis lavouras,
                        <br />
                        seis lugares do Brasil
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl">
                        Cada ponto do mapa é a cidade que mais colhe aquela lavoura no país. Escolha uma para abrir o guia.
                    </p>
                </Revelar>
                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {CULTURAS.map((cultura, ordem) => (
                        <li key={cultura.slug}>
                            <Revelar atraso={(ordem % 3) * 90}>
                                <CartaoCultura cultura={cultura} />
                            </Revelar>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-base text-[#17110D]/75">
                    Fonte:{' '}
                    <a
                        href={FONTE_DA_PRODUCAO.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-[#2E5A43] underline underline-offset-4"
                    >
                        {FONTE_DA_PRODUCAO.nome}, {FONTE_DA_PRODUCAO.ano}
                    </a>
                    .
                </p>
            </section>

            {/* O catálogo de pragas: como é cada bicho, o estrago que deixa e onde procurar. */}
            <section id="pragas" className="bg-[#17110D] text-[#E6DAC6]">
                <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
                    <Revelar>
                        <p className="titulo-de-parte font-condensed text-lg font-semibold tracking-[0.16em] text-[#D9A650] uppercase">
                            03 · Catálogo de pragas
                        </p>
                        <h2 className="mt-2 font-display text-4xl leading-[1.02] font-bold uppercase sm:text-6xl">
                            Que bicho
                            <br />é esse?
                        </h2>
                        <p className="mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl">
                            Veja como é cada praga, o estrago que ela deixa na planta e em que parte procurar. Escolha a
                            lavoura para ver só as pragas dela.
                        </p>
                    </Revelar>
                    <div className="mt-9">
                        <CatalogoPragas escuro />
                    </div>
                </div>
            </section>
            </div>
        </main>
    )
}
