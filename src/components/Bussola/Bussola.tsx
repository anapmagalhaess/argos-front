/** Rosa dos ventos com os quatro pontos cardeais. É só enfeite, em telas largas. */
export default function Bussola({ className = '' }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none grid size-20 grid-cols-3 grid-rows-3 place-items-center font-sans text-[11px] font-semibold tracking-widest text-[#E6DAC6]/80 ${className}`}
        >
            <span className="col-start-2">N</span>
            <span className="col-start-1 row-start-2">O</span>
            <svg viewBox="0 0 24 24" className="col-start-2 row-start-2 size-8" fill="currentColor">
                <path d="M12 1 14.2 12 12 23 9.8 12Z" opacity="0.9" />
                <path d="M1 12 12 10.6 23 12 12 13.4Z" opacity="0.4" />
            </svg>
            <span className="col-start-3 row-start-2">L</span>
            <span className="col-start-2 row-start-3">S</span>
        </div>
    )
}
