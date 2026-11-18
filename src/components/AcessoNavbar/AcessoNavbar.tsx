import { useEffect, useId, useRef, useState } from "react";
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
                        <MenuPerfil
                            nome={primeiroNome ?? ""}
                            contaAtiva={contaAtiva}
                            aoSair={iniciarSaida}
                            saindo={saindo}
                            variante="desktop"
                        />
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
                    <MenuPerfil
                        nome={primeiroNome ?? ""}
                        contaAtiva={contaAtiva}
                        aoSair={iniciarSaida}
                        aoNavegar={aoNavegar}
                        saindo={saindo}
                        variante="movel"
                    />
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

function MenuPerfil({
    nome,
    contaAtiva,
    aoSair,
    aoNavegar,
    saindo,
    variante,
}: {
    nome: string;
    contaAtiva: boolean;
    aoSair: () => void;
    aoNavegar?: () => void;
    saindo: boolean;
    variante: "desktop" | "movel";
}) {
    const [aberto, setAberto] = useState(false);
    const menuId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const botaoRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!aberto) return;

        const fecharFora = (evento: PointerEvent) => {
            if (!containerRef.current?.contains(evento.target as Node)) setAberto(false);
        };
        const fecharComEsc = (evento: KeyboardEvent) => {
            if (evento.key === "Escape") {
                setAberto(false);
                botaoRef.current?.focus();
            }
        };

        document.addEventListener("pointerdown", fecharFora);
        document.addEventListener("keydown", fecharComEsc);
        return () => {
            document.removeEventListener("pointerdown", fecharFora);
            document.removeEventListener("keydown", fecharComEsc);
        };
    }, [aberto]);

    const moverParaConta = () => {
        setAberto(false);
        aoNavegar?.();
    };

    return (
        <div ref={containerRef} className={variante === "desktop" ? "relative" : "relative w-full"}>
            <button
                ref={botaoRef}
                type="button"
                aria-label={`Abrir menu da conta de ${nome}`}
                aria-expanded={aberto}
                aria-controls={menuId}
                onClick={() => setAberto((atual) => !atual)}
                className={variante === "desktop"
                    ? "relative flex items-center gap-2.5 rounded-[10px] px-2 py-1.5 text-base font-medium text-bege transition-colors hover:text-salvia focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia"
                    : `${SECUNDARIO} w-full justify-between ${contaAtiva ? "border-salvia bg-linha/50 shadow-[0_0_0_3px_rgba(125,190,140,.08)]" : ""}`}
            >
                <span className="flex items-center gap-2.5">
                    {variante === "desktop" && (
                        <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-mata font-titulo text-sm font-bold text-bege">
                            {nome.charAt(0).toUpperCase()}
                        </span>
                    )}
                    Olá, {nome}
                </span>
                <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-4 shrink-0 transition-transform ${aberto ? "rotate-180" : ""}`} fill="none">
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {aberto && (
                <nav
                    id={menuId}
                    aria-label="Opções da conta"
                    className={variante === "desktop"
                        ? "absolute right-0 top-full z-[60] mt-2 flex min-w-48 flex-col gap-1 rounded-2xl border border-linha bg-card p-2 shadow-[0_18px_45px_rgba(0,0,0,.45)]"
                        : "relative z-20 mt-2 flex flex-col gap-1 rounded-2xl border border-linha bg-fundo/80 p-2 shadow-inner"}
                >
                    <Link
                        to="/conta"
                        aria-current={contaAtiva ? "page" : undefined}
                        onClick={moverParaConta}
                        className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia ${contaAtiva ? "bg-salvia/10 text-salvia" : "text-bege hover:bg-linha/50 hover:text-salvia"}`}
                    >
                        Minha conta
                    </Link>
                    <button
                        type="button"
                        onClick={() => { setAberto(false); aoSair(); }}
                        disabled={saindo}
                        className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-texto-2 transition-colors hover:bg-linha/50 hover:text-bege focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia disabled:opacity-60"
                    >
                        Sair
                    </button>
                </nav>
            )}
        </div>
    );
}
