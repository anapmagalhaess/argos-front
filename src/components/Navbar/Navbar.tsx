import { Link } from "react-router";
import LogoArgos from "../LogoArgos/LogoArgos";

/*
 * Navbar principal do Argos.
 */
export default function Navbar(){
    return (
        <header className="relative mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-7 py-6">
            <LogoArgos className="text-[28px] text-bege" />

            <nav aria-label="Principal" className="flex flex-wrap gap-0.5 text-base font-medium">
                <Link to="/" className="relative rounded-[10px] px-3.5 py-2.5 text-bege transition-transform duration-150 hover:scale-[1.04] focus-visible:scale-[1.04] after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">Início</Link>
                <Link to="/sobre" className="relative rounded-[10px] px-3.5 py-2.5 text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:text-bege after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">Sobre</Link>
                <Link to="/solucao" className="relative rounded-[10px] px-3.5 py-2.5 text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:text-bege after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">Solução</Link>
                <Link to="/integrantes" className="relative rounded-[10px] px-3.5 py-2.5 text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:text-bege after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">Integrantes</Link>
                <Link to="/faq" className="relative rounded-[10px] px-3.5 py-2.5 text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:text-bege after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">FAQ</Link>
                <Link to="/contato" className="relative rounded-[10px] px-3.5 py-2.5 text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:text-bege after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">Contato</Link>
            </nav>

            <Link to="/triagem" className="inline-flex min-h-12 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-6 font-titulo text-[15px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] hover:brightness-110 focus-visible:scale-[1.035] active:scale-[.98] motion-reduce:transition-none">Começar</Link>
        </header>
    );
}

