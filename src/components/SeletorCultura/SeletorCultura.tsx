import { FONTE_DA_PRODUCAO, descreverProducao } from '../../data/culturas'
import type { Cultura } from '../../types/cultura'
import Seletor from '../Seletor/Seletor'

interface SeletorCulturaProps {
    culturas: Cultura[]
    selecionada: string
    onSelecionar: (slug: string) => void
    /** Abre a lavoura: a câmera voa até o município dela. */
    onAbrir: (slug: string) => void
}

/**
 * Seletor da lavoura em destaque no mapa do Brasil: as setas passam de uma para a outra, o meio
 * mostra o lugar e a produção, e o botão abre a lavoura ali mesmo.
 */
export default function SeletorCultura({ culturas, selecionada, onSelecionar, onAbrir }: SeletorCulturaProps) {
    const indice = Math.max(
        culturas.findIndex((cultura) => cultura.slug === selecionada),
        0,
    )
    const cultura = culturas[indice]
    const passar = (passo: number) => {
        const proxima = culturas[(indice + passo + culturas.length) % culturas.length]
        onSelecionar(proxima.slug)
    }

    return (
        <Seletor
            indice={indice}
            total={culturas.length}
            titulo={cultura.nome}
            rotuloAnterior="Lavoura anterior"
            rotuloProximo="Próxima lavoura"
            onPassar={passar}
            aEsquerda
        >
            <p className="mt-1 text-xs font-semibold tracking-[0.22em] uppercase opacity-85">
                {cultura.municipio}, {cultura.uf}
            </p>
            <p className="mt-1 text-lg opacity-90">
                {descreverProducao(cultura.toneladas)} em {FONTE_DA_PRODUCAO.ano}. Fonte: IBGE.
            </p>
            <button
                type="button"
                onClick={() => onAbrir(cultura.slug)}
                className="mt-3 flex min-h-12 cursor-pointer items-center rounded-full bg-[#7DBE8C] px-7 text-lg font-bold text-[#17110D] transition-opacity hover:opacity-90 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#E6DAC6]"
            >
                Ver a lavoura
            </button>
        </Seletor>
    )
}
