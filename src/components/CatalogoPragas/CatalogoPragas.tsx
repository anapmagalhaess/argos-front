import { useState } from 'react'
import { CULTURAS } from '../../data/culturas'
import { GRUPOS_DE_PRAGAS, pragasDaCultura } from '../../data/pragas'
import CartaoPraga from '../CartaoPraga/CartaoPraga'
import IconeCultura from '../IconeCultura/IconeCultura'

interface CatalogoPragasProps {
    /** Mostra só as pragas desta lavoura, sem a pergunta da lavoura (página do guia). */
    lavouraFixa?: string
    /** O catálogo está sobre fundo escuro: os botões e os textos ficam claros. */
    escuro?: boolean
}

/**
 * Catálogo de pragas em duas perguntas simples: qual é a lavoura e que bicho a pessoa viu.
 * Cada resposta é um botão grande; a grade mostra só as pragas que combinam com as duas.
 * A cada troca, os cartões entram de novo, um depois do outro.
 */
export default function CatalogoPragas({ lavouraFixa, escuro = false }: CatalogoPragasProps) {
    const [filtro, setFiltro] = useState<string | null>(null)
    const [grupo, setGrupo] = useState<string | null>(null)
    const lavoura = lavouraFixa ?? filtro
    const daLavoura = pragasDaCultura(lavoura)
    const pragas = grupo ? daLavoura.filter((praga) => praga.grupo === grupo) : daLavoura
    // Só aparecem os grupos que têm alguma praga na lavoura escolhida.
    const grupos = GRUPOS_DE_PRAGAS.filter((umGrupo) => daLavoura.some((praga) => praga.grupo === umGrupo.slug))

    const fraco = escuro ? 'text-[#E6DAC6]/75' : 'text-[#17110D]/75'
    const pergunta = `font-condensed text-lg font-semibold tracking-[0.14em] uppercase ${escuro ? 'text-[#7DBE8C]' : 'text-[#2E5A43]'}`
    const botao = (ativo: boolean) =>
        `flex min-h-12 cursor-pointer items-center gap-2 rounded-full border-2 px-5 text-lg font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#7DBE8C] ${
            ativo
                ? 'border-[#7DBE8C] bg-[#7DBE8C] text-[#17110D]'
                : escuro
                  ? 'border-[#E6DAC6]/35 text-[#E6DAC6] hover:border-[#E6DAC6]'
                  : 'border-[#2E5A43]/30 text-[#2E5A43] hover:border-[#2E5A43]'
        }`

    const escolherLavoura = (slug: string | null) => {
        setFiltro(slug)
        // O grupo escolhido pode não existir na lavoura nova: a segunda pergunta volta para "Todos".
        setGrupo(null)
    }

    return (
        <div>
            {!lavouraFixa && (
                <>
                    <p className={pergunta}>1. Qual é a lavoura?</p>
                    <div role="group" aria-label="Qual é a lavoura?" className="mt-3 flex flex-wrap gap-2.5">
                        <button
                            type="button"
                            aria-pressed={filtro === null}
                            onClick={() => escolherLavoura(null)}
                            className={botao(filtro === null)}
                        >
                            Todas
                        </button>
                        {CULTURAS.map((cultura) => (
                            <button
                                key={cultura.slug}
                                type="button"
                                aria-pressed={filtro === cultura.slug}
                                onClick={() => escolherLavoura(cultura.slug)}
                                className={botao(filtro === cultura.slug)}
                            >
                                <IconeCultura slug={cultura.slug} className="size-5" />
                                {cultura.nome}
                            </button>
                        ))}
                    </div>
                </>
            )}

            <p className={`${pergunta} ${lavouraFixa ? 'mt-6' : 'mt-7'}`}>{lavouraFixa ? '' : '2. '}Que bicho você viu?</p>
            <div role="group" aria-label="Que bicho você viu?" className="mt-3 flex flex-wrap gap-2.5">
                <button type="button" aria-pressed={grupo === null} onClick={() => setGrupo(null)} className={botao(grupo === null)}>
                    Não sei
                </button>
                {grupos.map((umGrupo) => (
                    <button
                        key={umGrupo.slug}
                        type="button"
                        aria-pressed={grupo === umGrupo.slug}
                        onClick={() => setGrupo(umGrupo.slug)}
                        className={botao(grupo === umGrupo.slug)}
                    >
                        {umGrupo.nome}
                    </button>
                ))}
            </div>

            <p aria-live="polite" className={`mt-6 text-base ${fraco}`}>
                {pragas.length} {pragas.length === 1 ? 'praga encontrada' : 'pragas encontradas'}. Toque em "O estrago"
                para ver o que cada uma deixa na planta.
            </p>

            {/* A chave muda com as respostas: a lista é montada de novo e a animação de entrada roda outra vez. */}
            <ul key={`${lavoura}-${grupo}`} className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pragas.map((praga, ordem) => (
                    <li key={praga.slug} style={{ animationDelay: `${Math.min(ordem, 8) * 70}ms` }} className="entrada">
                        <CartaoPraga praga={praga} />
                    </li>
                ))}
            </ul>

            <p className={`mt-6 max-w-3xl text-base ${fraco}`}>
                Este catálogo ajuda a reconhecer a praga. Para confirmar e escolher o controle, procure um agrônomo ou a
                assistência técnica da sua região. Fotos: catálogo do projeto Orbit Agro; onde não há foto, o desenho
                mostra o formato e as marcas do bicho.
            </p>
        </div>
    )
}
