import { Link } from 'react-router'
import { descreverProducao } from '../../data/culturas'
import type { Cultura } from '../../types/cultura'
import IconeCultura from '../IconeCultura/IconeCultura'

interface CartaoCulturaProps {
    cultura: Cultura
}

/** Cartão de uma lavoura: ícone, nome, o município que mais produz e quanto produz. Leva ao guia. */
export default function CartaoCultura({ cultura }: CartaoCulturaProps) {
    return (
        <Link
            to={`/guia/${cultura.slug}`}
            className="flex min-h-24 items-center gap-4 rounded-2xl border-2 border-[#2E5A43]/15 bg-white p-4 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#2E5A43] hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2E5A43]"
        >
            <span
                style={{ backgroundColor: cultura.cor }}
                className="flex size-14 shrink-0 items-center justify-center rounded-full text-[#17110D]"
            >
                <IconeCultura slug={cultura.slug} className="size-8" />
            </span>
            <span className="min-w-0">
                <span className="block font-display text-2xl font-bold text-[#17110D]">{cultura.nome}</span>
                <span className="block text-lg text-[#17110D]/80">
                    {cultura.municipio}, {cultura.uf}
                </span>
                <span className="block text-base text-[#17110D]/70">{descreverProducao(cultura.toneladas)}</span>
            </span>
        </Link>
    )
}
