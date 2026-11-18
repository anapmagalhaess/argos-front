/** Cantoneira de um canto da moldura: dois traços e um arco pequeno. */
function Cantoneira({ className }: { className: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className={`absolute size-10 ${className}`}>
            <path d="M0 14h8a6 6 0 0 0 6-6V0" />
            <path d="M0 20h10a10 10 0 0 0 10-10V0" opacity="0.5" />
        </svg>
    )
}

/**
 * Moldura fina em volta da tela, com uma cantoneira em cada canto. É só enfeite: não recebe toque
 * nem é lida por leitor de tela.
 */
export default function Moldura() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-3 text-[#E6DAC6]/45 md:inset-5">
            <div className="absolute inset-x-10 top-0 border-t border-current" />
            <div className="absolute inset-x-10 bottom-0 border-b border-current" />
            <div className="absolute inset-y-10 left-0 border-l border-current" />
            <div className="absolute inset-y-10 right-0 border-r border-current" />
            <Cantoneira className="top-0 left-0 rotate-180" />
            <Cantoneira className="top-0 right-0 -rotate-90" />
            <Cantoneira className="bottom-0 left-0 rotate-90" />
            <Cantoneira className="right-0 bottom-0" />
        </div>
    )
}
