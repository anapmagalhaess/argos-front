import { useState } from "react";
import { Link, useLocation } from "react-router";
import EstadoCarregando from "../EstadoCarregando/EstadoCarregando";
import { useConta } from "../../contexto/conta";

/*
    AcessoNavbar: o canto direito da barra de navegação. Sem conta: "Entrar" e o botão "Começar"
    (o cadastro). Com conta: o nome da pessoa (leva à conta), "Sair" e o botão "Hoje".
    Tem duas versões: a do desktop (uma linha) e a do menu mobile (blocos empilhados).
*/

interface AcessoNavbarProps {
    variante: "desktop" | "movel";
    /* Fecha o menu mobile quando a pessoa toca num link */
    aoNavegar?: () => void;
}

const CTA =
    "inline-flex min-h-12 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-6 font-titulo text-[15px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] hover:brightness-110 focus-visible:scale-[1.035] active:scale-[.98] motion-reduce:transition-none";
const SECUNDARIO =
    "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[14px] border-2 border-linha px-6 font-titulo text-[15px] font-semibold uppercase tracking-[0.04em] text-bege transition-colors duration-150 hover:border-bege focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia";

export default function AcessoNavbar({ variante, aoNavegar }: AcessoNavbarProps) {
    const { conta, sair } = useConta();
    const [saindo, setSaindo] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname.replace(/\/$/, "") || "/";
    const contaAtiva = currentPath === "/conta";
    const hojeAtivo = currentPath === "/hoje";
    const primeiroNome = conta?.produtorNome.split(" ")[0];

    const iniciarSaida = () => {
        if (saindo) return;
        setSaindo(true);
        window.setTimeout(() => {
            sair();
            aoNavegar?.();
            setSaindo(false);
        }, 650);
    };

    if (variante === "desktop") {
        return (
            <>
            {saindo && <EstadoCarregando titulo="Saindo da sua conta…" descricao="Encerrando a sua entrada neste aparelho." telaInteira />}
            <div className="flex max-[1090px]:hidden items-center gap-3">
                {conta ? (
                    <>
                        <Link
                            to="/conta"
                            aria-label={`Minha conta, ${primeiroNome}`}
                            aria-current={contaAtiva ? "page" : undefined}
                            className={`relative flex items-center gap-2.5 rounded-[10px] px-2 py-1.5 text-base font-medium text-bege transition-colors duration-150 after:absolute after:right-2 after:bottom-0 after:left-2 after:h-0.5 after:rounded-full after:bg-salvia after:transition-transform hover:text-salvia focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia ${contaAtiva ? "after:scale-x-100" : "after:scale-x-0"}`}
                        >
                            <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-mata font-titulo text-sm font-bold text-bege">
                                {primeiroNome?.charAt(0).toUpperCase()}
                            </span>
                            Olá, {primeiroNome}
                        </Link>
                        <button type="button" onClick={iniciarSaida} disabled={saindo} className="cursor-pointer rounded-[10px] px-2 py-1.5 text-base font-medium text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia disabled:opacity-60">
                            Sair
                        </button>
                        <Link to="/hoje" aria-current={hojeAtivo ? "page" : undefined} className={`${CTA} ${hojeAtivo ? "shadow-[0_0_0_3px_rgba(125,190,140,.18),0_0_24px_rgba(125,190,140,.24)] ring-1 ring-salvia/70" : ""}`}>Hoje</Link>
                    </>
                ) : (
                    <>
                        <Link to="/entrar" className="rounded-[10px] px-2 py-1.5 text-base font-medium text-bege transition-colors duration-150 hover:text-salvia focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia">
                            Entrar
                        </Link>
                        <Link to="/triagem" className={CTA}>Começar</Link>
                    </>
                )}
            </div>
            </>
        );
    }

    return (
        <>
        {saindo && <EstadoCarregando titulo="Saindo da sua conta…" descricao="Encerrando a sua entrada neste aparelho." telaInteira />}
        <div className="flex flex-col gap-2.5">
            {conta ? (
                <>
                    <Link to="/conta" onClick={aoNavegar} aria-current={contaAtiva ? "page" : undefined} className={`${SECUNDARIO} w-full ${contaAtiva ? "border-salvia bg-linha/50 text-bege shadow-[0_0_0_3px_rgba(125,190,140,.08)]" : ""}`}>Minha conta ({primeiroNome})</Link>
                    <button type="button" onClick={iniciarSaida} disabled={saindo} className={`${SECUNDARIO} w-full disabled:opacity-60`}>Sair</button>
                    <Link to="/hoje" onClick={aoNavegar} aria-current={hojeAtivo ? "page" : undefined} className={`${CTA} w-full ${hojeAtivo ? "shadow-[0_0_0_3px_rgba(125,190,140,.18),0_0_24px_rgba(125,190,140,.24)] ring-1 ring-salvia/70" : ""}`}>Hoje</Link>
                </>
            ) : (
                <>
                    <Link to="/entrar" onClick={aoNavegar} className={`${SECUNDARIO} w-full`}>Entrar</Link>
                    <Link to="/triagem" onClick={aoNavegar} className={`${CTA} w-full`}>Começar</Link>
                </>
            )}
        </div>
        </>
    );
}
