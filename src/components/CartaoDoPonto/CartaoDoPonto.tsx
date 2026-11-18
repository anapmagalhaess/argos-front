interface CartaoDoPontoProps {
    /** Cada item é um rótulo pequeno em cima e um valor grande embaixo. */
    itens: { rotulo: string; valor: string }[]
}

/**
 * Cartão que fica logo acima do marcador da lavoura, com um ou dois números grandes
 * (a mínima e a máxima do dia, por exemplo) e uma ponta virada para o lugar.
 */
export default function CartaoDoPonto({ itens }: CartaoDoPontoProps) {
    return (
        <div className="mb-3 flex flex-col items-center">
            <dl className="flex divide-x divide-[#E6DAC6]/20 bg-[#1F1814]/95 text-[#E6DAC6] shadow-xl">
                {itens.map((item) => (
                    <div key={item.rotulo} className="px-4 py-3 text-center sm:px-5">
                        <dt className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase opacity-80">
                            {item.rotulo}
                        </dt>
                        <dd className="mt-1 font-display text-3xl leading-none font-semibold whitespace-nowrap sm:text-4xl">
                            {item.valor}
                        </dd>
                    </div>
                ))}
            </dl>
            <span aria-hidden="true" className="-mt-1.5 size-3 rotate-45 bg-[#1F1814]/95" />
        </div>
    )
}
