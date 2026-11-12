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
                <Link to="/" className="rounded-[10px] px-3.5 py-2.5 text-bege">Início</Link>
                <Link to="/sobre" className="rounded-[10px] px-3.5 py-2.5 text-texto-2 hover:text-bege">Sobre</Link>
                <Link to="/solucao" className="rounded-[10px] px-3.5 py-2.5 text-texto-2 hover:text-bege">Solução</Link>
                <Link to="/integrantes" className="rounded-[10px] px-3.5 py-2.5 text-texto-2 hover:text-bege">Integrantes</Link>
                <Link to="/faq" className="rounded-[10px] px-3.5 py-2.5 text-texto-2 hover:text-bege">FAQ</Link>
                <Link to="/contato" className="rounded-[10px] px-3.5 py-2.5 text-texto-2 hover:text-bege">Contato</Link>
            </nav>

            <Link to="/triagem" className="inline-flex min-h-12 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-6 font-titulo text-[15px] font-semibold uppercase tracking-[0.04em] text-fundo">Começar</Link>
        </header>
    );
}

