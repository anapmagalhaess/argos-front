import { useState } from 'react'
import { CULTURAS } from '../../data/culturas'
import type { Praga } from '../../types/praga'
import IconeCultura from '../IconeCultura/IconeCultura'
import IlustracaoPraga from '../IlustracaoPraga/IlustracaoPraga'

interface CartaoPragaProps {
    praga: Praga
}

/** As duas vistas do cartão: o bicho ou o estrago que ele deixa na planta. */
type Vista = 'bicho' | 'estrago'
const VISTAS: Vista[] = ['bicho', 'estrago']

const ROTULO = 'font-condensed text-sm font-semibold tracking-[0.14em] text-[#2E5A43] uppercase'

/**
 * Cartão de uma praga do catálogo. Dois botões em cima da foto trocam a vista: "O bicho" mostra
 * como ele é; "O estrago" mostra o que ele deixa na planta e onde procurar. A foto e o texto
 * mudam juntos. Sem foto, entra o desenho do bicho.
 */
export default function CartaoPraga({ praga }: CartaoPragaProps) {
    const [vista, setVista] = useState<Vista>('bicho')
    const lavouras = CULTURAS.filter((cultura) => praga.culturas.includes(cultura.slug))
    const fotos: Record<Vista, string | undefined> = { bicho: praga.foto, estrago: praga.fotoDoEstrago }

    const botao = (qual: Vista) =>
        `min-h-11 flex-1 cursor-pointer rounded-full px-4 text-base font-bold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#7DBE8C] ${
            vista === qual ? 'bg-[#7DBE8C] text-[#17110D]' : 'text-[#E6DAC6] hover:bg-white/15'
        }`

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-[#E6DAC6] text-[#17110D] shadow-[0_10px_30px_rgb(0_0_0/0.18)] transition-transform duration-500 hover:-translate-y-1.5">
            <div
                // Sem foto, o fundo puxa um pouco da cor do próprio bicho.
                style={{ backgroundColor: `color-mix(in srgb, ${praga.cores.corpo} 22%, #E6DAC6)` }}
                className="relative h-60 overflow-hidden"
            >
                {/* As duas fotos ficam uma em cima da outra: a da vista escolhida aparece, a outra some. */}
                {VISTAS.map((qual) =>
                    fotos[qual] ? (
                        <img
                            key={qual}
                            src={fotos[qual]}
                            alt={qual === 'bicho' ? `Foto de ${praga.nome}` : `Foto do estrago de ${praga.nome} na planta`}
                            loading="lazy"
                            aria-hidden={vista !== qual}
                            className={`absolute inset-0 size-full object-cover transition-[opacity,scale] duration-700 group-hover:scale-105 ${
                                vista === qual ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ) : (
                        <div
                            key={qual}
                            aria-hidden={vista !== qual}
                            className={`absolute inset-0 flex items-center justify-center pb-10 transition-opacity duration-700 ${
                                vista === qual ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <IlustracaoPraga praga={praga} className="h-32 drop-shadow-[0_8px_8px_rgb(0_0_0/0.22)]" />
                        </div>
                    ),
                )}

                <p className="absolute top-3 left-3 rounded-full bg-[#17110D] px-3 py-1 font-condensed text-sm font-semibold tracking-[0.14em] text-[#E6DAC6] uppercase">
                    {praga.tipo}
                </p>
                <p className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold">
                    {praga.tamanho}
                </p>

                {/* Os dois botões que trocam a vista. */}
                <div
                    role="group"
                    aria-label={`O que ver de ${praga.nome}`}
                    className="absolute inset-x-3 bottom-3 flex gap-1 rounded-full bg-[#17110D]/85 p-1 backdrop-blur-sm"
                >
                    <button
                        type="button"
                        aria-pressed={vista === 'bicho'}
                        onClick={() => setVista('bicho')}
                        className={botao('bicho')}
                    >
                        O bicho
                    </button>
                    <button
                        type="button"
                        aria-pressed={vista === 'estrago'}
                        onClick={() => setVista('estrago')}
                        className={botao('estrago')}
                    >
                        O estrago
                    </button>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl leading-tight font-bold">{praga.nome}</h3>
                <p className="mt-0.5 text-base text-[#17110D]/70 italic">{praga.nomeCientifico}</p>

                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Lavouras em que aparece">
                    {lavouras.map((cultura) => (
                        <li
                            key={cultura.slug}
                            className="flex items-center gap-1.5 rounded-full border border-[#2E5A43]/25 py-1 pr-3 pl-2 text-sm font-semibold text-[#2E5A43]"
                        >
                            <IconeCultura slug={cultura.slug} className="size-4" />
                            {cultura.nome}
                        </li>
                    ))}
                </ul>

                {/* O texto acompanha a vista. A chave muda com ela: o bloco entra de novo, com a animação. */}
                <div key={vista} aria-live="polite" className="entrada mt-4">
                    {vista === 'bicho' ? (
                        <>
                            <p className={ROTULO}>Como é</p>
                            <p className="mt-1 text-lg leading-snug">{praga.aparencia}</p>
                            <p className="mt-2 text-base text-[#17110D]/75">Tamanho parecido com {praga.comparacao}.</p>
                        </>
                    ) : (
                        <>
                            <p className={ROTULO}>O estrago na planta</p>
                            <p className="mt-1 text-lg leading-snug">{praga.sinais}</p>
                            <p className={`mt-3 ${ROTULO}`}>Onde procurar</p>
                            <p className="mt-1 text-lg leading-snug">{praga.ondeProcurar}</p>
                        </>
                    )}
                </div>
            </div>
        </article>
    )
}
