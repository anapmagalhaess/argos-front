import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import LogoArgos from "../LogoArgos/LogoArgos";

// botao mobile
const navLinks = [
    { label: "Início", to: "/", delay: "delay-[60ms]" },
    { label: "Sobre", to: "/sobre", delay: "delay-[105ms]" },
    { label: "Solução", to: "/solucao", delay: "delay-[150ms]" },
    { label: "Integrantes", to: "/integrantes", delay: "delay-[195ms]" },
    { label: "FAQ", to: "/faq", delay: "delay-[240ms]" },
    { label: "Contato", to: "/contato", delay: "delay-[285ms]" },
];

// botao mobile <= 850px | navbar desktop => 851px

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [prevPathname, setPrevPathname] = useState(location.pathname);

    // fecha o menu ao entrar em nova rota
    if (prevPathname !== location.pathname) {
        setPrevPathname(location.pathname);
        setIsOpen(false);
    }

    // fecha o menu caso a janela seja redimensionada para acima de 850px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 850) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // fecha o menu ao pressionar a tecla `Esc`
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // trava a rolagem da página quando o menu mobile está aberto com overflow
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    // o botão de hamburger só deve alterar estado em telas <= 850px
    const toggleMenu = () => {
        if (window.innerWidth > 850) return;
        setIsOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className="relative z-50 mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-7 py-6">
            <LogoArgos className="text-[28px] text-bege" />

            {/* navegação desktop (normal acima de 850px, oculta em 850px) */}
            <nav aria-label="Principal" className="flex max-[851px]:hidden flex-wrap gap-0.5 text-base font-medium">
                <Link to="/" className="relative rounded-[10px] px-3.5 py-2.5 text-bege transition-transform duration-150 hover:scale-[1.04] focus-visible:scale-[1.04] after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">Início</Link>
                <Link to="/sobre" className="relative rounded-[10px] px-3.5 py-2.5 text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:text-bege after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">Sobre</Link>
                <Link to="/solucao" className="relative rounded-[10px] px-3.5 py-2.5 text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:text-bege after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">Solução</Link>
                <Link to="/integrantes" className="relative rounded-[10px] px-3.5 py-2.5 text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:text-bege after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">Integrantes</Link>
                <Link to="/faq" className="relative rounded-[10px] px-3.5 py-2.5 text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:text-bege after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">FAQ</Link>
                <Link to="/contato" className="relative rounded-[10px] px-3.5 py-2.5 text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:text-bege after:absolute after:right-3.5 after:bottom-1.5 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-salvia after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100">Contato</Link>
            </nav>

            {/* botão cta desktop (normal acima de 850px, oculto em 850px) */}
            <Link to="/triagem" className="inline-flex max-[851px]:hidden min-h-12 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-6 font-titulo text-[15px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] hover:brightness-110 focus-visible:scale-[1.035] active:scale-[.98] motion-reduce:transition-none">Começar</Link>

            {/* botão Hamburger (oculto no desktop, visível apenas de 850px para baixo) */}
            <button
                type="button"
                aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-expanded={isOpen}
                aria-controls="argos-menu-mobile"
                onClick={toggleMenu}
                className="hidden max-[851px]:inline-flex relative h-12 w-12 items-center justify-center rounded-[14px] border border-linha bg-card/90 text-bege shadow-md transition-all duration-200 hover:border-salvia hover:text-salvia focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia active:scale-95"
            >
                <div className="relative flex h-5 w-6 flex-col justify-between" aria-hidden="true">
                    <span
                        className={`block h-[2.5px] w-full rounded-full bg-current transition-all duration-300 ease-in-out motion-reduce:transition-none ${
                            isOpen ? "translate-y-[8.75px] rotate-45" : "translate-y-0 rotate-0"
                        }`}
                    />
                    <span
                        className={`block h-[2.5px] w-full rounded-full bg-current transition-all duration-300 ease-in-out motion-reduce:transition-none ${
                            isOpen ? "opacity-0 -translate-x-2 scale-x-0" : "opacity-100 translate-x-0 scale-x-100"
                        }`}
                    />
                    <span
                        className={`block h-[2.5px] w-full rounded-full bg-current transition-all duration-300 ease-in-out motion-reduce:transition-none ${
                            isOpen ? "-translate-y-[8.75px] -rotate-45" : "translate-y-0 rotate-0"
                        }`}
                    />
                </div>
            </button>

            {/* background escurecido ao abrir o menu mobile */}
            <div
                aria-hidden="true"
                onClick={closeMenu}
                className={`hidden max-[851px]:block fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-all duration-300 motion-reduce:transition-none ${
                    isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
                }`}
            />

            {/* painel do menu mob animado  */}
            <div
                id="argos-menu-mobile"
                role="region"
                aria-label="Navegação móvel"
                className={`hidden max-[851px]:block absolute top-full left-4 right-4 z-50 mt-2 max-h-[calc(100vh-100px)] overflow-y-auto rounded-[24px] border border-linha bg-[#1F1814]/98 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-all duration-300 ease-out motion-reduce:transition-none sm:left-7 sm:right-7 ${
                    isOpen
                        ? "opacity-100 visible pointer-events-auto translate-y-0 scale-100"
                        : "opacity-0 invisible pointer-events-none -translate-y-4 scale-[0.97]"
                }`}
            >
                <nav aria-label="Links móveis" className="flex flex-col gap-1.5">
                    {navLinks.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={closeMenu}
                                className={`group flex items-center gap-3 rounded-[14px] px-4 py-3.5 font-titulo text-base font-medium transition-all duration-300 ease-out motion-reduce:transition-none ${
                                    isOpen ? `opacity-100 translate-x-0 ${item.delay}` : "opacity-0 -translate-x-4 delay-0"
                                } ${
                                    isActive
                                        ? "border border-salvia/30 bg-linha/50 text-bege"
                                        : "text-texto-2 hover:bg-linha/35 hover:text-bege hover:translate-x-1"
                                }`}
                            >
                                <span
                                    className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                                        isActive
                                            ? "bg-salvia shadow-[0_0_8px_rgba(125,190,140,0.6)]"
                                            : "bg-linha group-hover:bg-salvia/70"
                                    }`}
                                    aria-hidden="true"
                                />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div
                    className={`mt-4 border-t border-linha/70 pt-4 transition-all duration-300 ease-out motion-reduce:transition-none ${
                        isOpen ? "opacity-100 translate-y-0 delay-[330ms]" : "opacity-0 translate-y-3 delay-0"
                    }`}
                >
                    <Link
                        to="/triagem"
                        onClick={closeMenu}
                        className="flex min-h-12 w-full items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-6 font-titulo text-[15px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.02] hover:brightness-110 active:scale-[.98]"
                    >Começar
                    </Link>
                </div>
            </div>
        </header>
    );
}
