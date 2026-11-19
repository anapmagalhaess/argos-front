import IconeFA from "../IconeFA/IconeFA";

/** Rosa dos ventos com os quatro pontos cardeais. É só enfeite, em telas largas. */
export default function Bussola({ className = '' }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none grid size-20 grid-cols-3 grid-rows-3 place-items-center font-sans text-[11px] font-semibold tracking-widest text-[#E6DAC6]/80 ${className}`}
        >
            <span className="col-start-2">N</span>
            <span className="col-start-1 row-start-2">O</span>
            <IconeFA nome="compass" className="col-start-2 row-start-2 size-8" />
            <span className="col-start-3 row-start-2">L</span>
            <span className="col-start-2 row-start-3">S</span>
        </div>
    )
}
