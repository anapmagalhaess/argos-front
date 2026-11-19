import { useState, useEffect, useRef, useCallback } from "react";
import { useLeitorVoz } from "../../hooks/useLeitorVoz";
import IconeFA from "../IconeFA/IconeFA";

interface Posicao {
    x: number;
    y: number;
}


const CLASSES_DESTAQUE = [
    "outline-2",
    "outline-4",
    "outline-dashed",
    "outline-salvia",
    "outline-ambar",
    "outline-offset-2",
    "outline-offset-4",
    "transition-all",
];

const CLASSES_HOVER = [
    "outline-2",
    "outline-dashed",
    "outline-ambar",
    "outline-offset-2",
    "transition-all",
];

const CLASSES_LEITURA = [
    "outline-4",
    "outline-salvia",
    "outline-offset-4",
    "transition-all",
];

/**
 * Componente LeitorDeTela (Acessibilidade com Síntese de Voz / Text-to-Speech)
 *
 * LÓGICA E PADRÕES:
 * - Botão flutuante livremente arrastável (Mouse & Touch), iniciando no canto superior direito.
 * - Menu acessível com contraste alto, botões grandes e leitura dinâmica de trechos específicos.
 */
export default function LeitorDeTela() {
    const {
        suportado,
        estaFalando,
        velocidade,
        setVelocidade,
        falar,
        parar,
        textoAtual,
    } = useLeitorVoz();

    // Estado do menu (aberto ou fechado)
    const [menuAberto, setMenuAberto] = useState(false);
    
    // Estado do modo dinâmico "Toque para Ouvir"
    const [modoApontarAtivo, setModoApontarAtivo] = useState(false);

    // Texto selecionado pelo usuário na tela
    const [textoSelecionado, setTextoSelecionado] = useState("");

    // Posição dinâmica calculada do botão flutuante
    const [posicao, setPosicao] = useState<Posicao>({ x: 0, y: 0 });
    const [posicionado, setPosicionado] = useState(false);

    // Controle de arrasto (drag & drop)
    const arrastandoRef = useRef(false);
    const houveMovimentoRef = useRef(false);
    const inicioArrastoRef = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });

    // Referência do elemento sob foco ou em leitura
    const elementoDestacadoRef = useRef<HTMLElement | null>(null);

    // Referências dos containers
    const containerRef = useRef<HTMLDivElement | null>(null);
    const botaoRef = useRef<HTMLButtonElement | null>(null);

    /**
     * Define a posição inicial no canto superior direito e ajusta ao redimensionar a tela.
     */
    useEffect(() => {
        const calcularPosicaoInicial = () => {
            const larguraTela = window.innerWidth;
            const alturaTela = window.innerHeight;
            const larguraBotao = 64;
            const margemDireita = 16;
            
            const novoX = Math.max(12, larguraTela - larguraBotao - margemDireita);
            // No celular o topo é do menu da página: o botão começa na lateral, no meio da altura,
            // onde não cobre links nem botões. Em telas largas fica no canto superior direito.
            const novoY = larguraTela <= 850 ? Math.round(alturaTela * 0.55) : Math.min(alturaTela - 90, 100);

            setPosicao((posAtual) => {
                if (posicionado) {
                    return {
                        x: Math.min(Math.max(8, posAtual.x), larguraTela - larguraBotao - 8),
                        y: Math.min(Math.max(8, posAtual.y), alturaTela - 80),
                    };
                }
                return { x: novoX, y: novoY };
            });
            setPosicionado(true);
        };

        calcularPosicaoInicial();
        window.addEventListener("resize", calcularPosicaoInicial);
        return () => window.removeEventListener("resize", calcularPosicaoInicial);
    }, [posicionado]);

    /* ─── LÓGICA DE ARRASTO (MOUSE & TOUCH) ─── */

    const iniciarArrasto = (clientX: number, clientY: number) => {
        arrastandoRef.current = true;
        houveMovimentoRef.current = false;
        inicioArrastoRef.current = {
            mouseX: clientX,
            mouseY: clientY,
            posX: posicao.x,
            posY: posicao.y,
        };
    };

    const moverArrasto = useCallback((clientX: number, clientY: number) => {
        if (!arrastandoRef.current) return;

        const deltaX = clientX - inicioArrastoRef.current.mouseX;
        const deltaY = clientY - inicioArrastoRef.current.mouseY;

        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            houveMovimentoRef.current = true;
        }

        const larguraBotao = botaoRef.current?.offsetWidth || 64;
        const alturaBotao = botaoRef.current?.offsetHeight || 60;
        const margem = 8;

        const novoX = Math.min(
            Math.max(margem, inicioArrastoRef.current.posX + deltaX),
            window.innerWidth - larguraBotao - margem
        );
        const novoY = Math.min(
            Math.max(margem, inicioArrastoRef.current.posY + deltaY),
            window.innerHeight - alturaBotao - margem
        );

        setPosicao({ x: novoX, y: novoY });
    }, []);

    const finalizarArrasto = useCallback(() => {
        arrastandoRef.current = false;
    }, []);

    useEffect(() => {
        const lidarMouseMove = (e: MouseEvent) => moverArrasto(e.clientX, e.clientY);
        const lidarMouseUp = () => finalizarArrasto();

        const lidarTouchMove = (e: TouchEvent) => {
            if (arrastandoRef.current && e.touches.length > 0) {
                e.preventDefault();
                moverArrasto(e.touches[0].clientX, e.touches[0].clientY);
            }
        };
        const lidarTouchEnd = () => finalizarArrasto();

        window.addEventListener("mousemove", lidarMouseMove);
        window.addEventListener("mouseup", lidarMouseUp);
        window.addEventListener("touchmove", lidarTouchMove, { passive: false });
        window.addEventListener("touchend", lidarTouchEnd);

        return () => {
            window.removeEventListener("mousemove", lidarMouseMove);
            window.removeEventListener("mouseup", lidarMouseUp);
            window.removeEventListener("touchmove", lidarTouchMove);
            window.removeEventListener("touchend", lidarTouchEnd);
        };
    }, [moverArrasto, finalizarArrasto]);

    /**
     * Remove classes de destaque aplicadas a elementos da página.
     */
    const limparDestaqueVisual = useCallback(() => {
        if (elementoDestacadoRef.current) {
            elementoDestacadoRef.current.classList.remove(...CLASSES_DESTAQUE);
            elementoDestacadoRef.current = null;
        }
    }, []);

    /**
     * Aplica classes do Tailwind no elemento sob foco ou em leitura.
     */
    const aplicarDestaqueVisual = useCallback((elemento: HTMLElement, emLeitura = false) => {
        limparDestaqueVisual();
        elementoDestacadoRef.current = elemento;

        if (emLeitura) {
            elemento.classList.add(...CLASSES_LEITURA);
        } else {
            elemento.classList.add(...CLASSES_HOVER);
        }
    }, [limparDestaqueVisual]);

    /**
     * Monitora seleção de texto feita pelo usuário com mouse ou toque longo.
     */
    useEffect(() => {
        const lidarComSelecao = () => {
            const selecao = window.getSelection();
            if (selecao && selecao.toString().trim()) {
                setTextoSelecionado(selecao.toString().trim());
            } else {
                setTextoSelecionado("");
            }
        };

        document.addEventListener("selectionchange", lidarComSelecao);
        return () => document.removeEventListener("selectionchange", lidarComSelecao);
    }, []);

    /**
     * Gerencia os eventos do modo "Toque para Ouvir" (Hover e Clique na página).
     */
    useEffect(() => {
        if (!modoApontarAtivo) {
            limparDestaqueVisual();
            return;
        }

        const lidarComMouseOver = (e: MouseEvent) => {
            const alvo = e.target as HTMLElement | null;
            if (!alvo) return;
            if (containerRef.current && containerRef.current.contains(alvo)) return;

            const texto = alvo.innerText || alvo.textContent || "";
            if (!texto.trim()) return;

            aplicarDestaqueVisual(alvo, false);
        };

        const lidarComClique = (e: MouseEvent) => {
            const alvo = e.target as HTMLElement | null;
            if (!alvo) return;
            if (containerRef.current && containerRef.current.contains(alvo)) return;

            const texto = alvo.innerText || alvo.textContent || "";
            if (!texto.trim()) return;

            e.preventDefault();
            e.stopPropagation();

            aplicarDestaqueVisual(alvo, true);

            falar(texto, () => {
                limparDestaqueVisual();
            });
        };

        document.addEventListener("mouseover", lidarComMouseOver, true);
        document.addEventListener("click", lidarComClique, true);

        return () => {
            document.removeEventListener("mouseover", lidarComMouseOver, true);
            document.removeEventListener("click", lidarComClique, true);
            limparDestaqueVisual();
        };
    }, [modoApontarAtivo, falar, aplicarDestaqueVisual, limparDestaqueVisual]);

    useEffect(() => {
        if (!estaFalando && !modoApontarAtivo) {
            limparDestaqueVisual();
        }
    }, [estaFalando, modoApontarAtivo, limparDestaqueVisual]);

    useEffect(() => {
        const lidarComEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (estaFalando) parar();
                setMenuAberto(false);
            }
        };
        window.addEventListener("keydown", lidarComEsc);
        return () => window.removeEventListener("keydown", lidarComEsc);
    }, [estaFalando, parar]);

    if (!suportado || !posicionado) {
        return null;
    }

    const estaNaDireita = posicao.x > window.innerWidth / 2;

    return (
        <aside
            ref={containerRef}
            aria-label="Controles de Acessibilidade e Leitor de Voz"
            className="fixed z-[9999] select-none font-corpo"
            style={{
                left: `${posicao.x}px`,
                top: `${posicao.y}px`,
            }}
        >
            {/* BOTÃO FLUTUANTE ARRASTÁVEL*/}
            <button
                ref={botaoRef}
                type="button"
                onMouseDown={(e) => {
                    if (e.button === 0) iniciarArrasto(e.clientX, e.clientY);
                }}
                onTouchStart={(e) => {
                    if (e.touches.length > 0) iniciarArrasto(e.touches[0].clientX, e.touches[0].clientY);
                }}
                onClick={() => {
                    if (!houveMovimentoRef.current) {
                        setMenuAberto((prev) => !prev);
                    }
                }}
                aria-expanded={menuAberto}
                aria-controls="menu-acessibilidade-voz"
                title="Segure e arraste para posicionar • Toque para abrir leitor de voz"
                className={`group relative flex items-center gap-2 rounded-2xl border-2 border-salvia bg-card/95 py-2.5 px-3.5 shadow-xl backdrop-blur-md transition-all duration-150 cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia ${
                    arrastandoRef.current ? "scale-105 shadow-2xl ring-2 ring-salvia" : "hover:scale-105"
                }`}
            >
                {/* Ícone de grip para indicar que é arrastável */}
                <div
                    aria-hidden="true"
                    className="flex flex-col gap-0.5 text-salvia/70 group-hover:text-salvia"
                    title="Arraste aqui"
                >
                    <div className="flex gap-0.5">
                        <span className="h-1 w-1 rounded-full bg-current" />
                        <span className="h-1 w-1 rounded-full bg-current" />
                    </div>
                    <div className="flex gap-0.5">
                        <span className="h-1 w-1 rounded-full bg-current" />
                        <span className="h-1 w-1 rounded-full bg-current" />
                    </div>
                    <div className="flex gap-0.5">
                        <span className="h-1 w-1 rounded-full bg-current" />
                        <span className="h-1 w-1 rounded-full bg-current" />
                    </div>
                </div>

                {/* Ícone de Alto-Falante */}
                <div className="relative flex items-center justify-center">
                    <IconeFA nome="volume-high" className={`h-6 w-6 transition-colors duration-150 ${estaFalando ? "text-salvia" : "text-bege"}`} />

                    {/* Ponto indicador ativo caso o modo apontar esteja ligado */}
                    {modoApontarAtivo && (
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-salvia" />
                    )}
                </div>

                {/* Rótulo textual */}
                <span className="font-titulo text-xs font-bold uppercase tracking-wider text-bege max-[420px]:hidden">
                    {estaFalando ? "Lendo..." : "Ouvir"}
                </span>
            </button>

            {/* PAINEL / MENU EXPANSÍVEL */}
            {menuAberto && (
                <div
                    id="menu-acessibilidade-voz"
                    role="region"
                    aria-label="Painel de Leitura de Texto por Voz"
                    className={`absolute top-full mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-3xl border-2 border-salvia/80 bg-card/98 p-5 shadow-2xl backdrop-blur-xl ${
                        estaNaDireita ? "right-0" : "left-0"
                    }`}
                >
                    {/* Cabeçalho do menu */}
                    <div className="flex items-center justify-between border-b border-linha/80 pb-3">
                        <div className="flex items-center gap-2">
                            <IconeFA nome="volume-high" className="h-5 w-5 text-salvia" />
                            <h2 className="font-titulo text-base font-bold text-bege">
                                Ouvir a Página
                            </h2>
                        </div>

                        {/* Botão de Fechar */}
                        <button
                            type="button"
                            onClick={() => setMenuAberto(false)}
                            aria-label="Fechar painel de voz"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-linha bg-fundo/70 text-texto-2 hover:border-salvia hover:text-bege focus-visible:outline-2 focus-visible:outline-salvia"
                        >
                            <IconeFA nome="xmark" className="h-4 w-4" />
                        </button>
                    </div>

                    <p className="mt-2.5 text-xs text-texto-2">
                        Toque no botão abaixo e depois selecione qualquer texto da tela para ouvir.
                    </p>

                    {/* MODO APONTAR E OUVIR  */}
                    <div className="mt-3.5">
                        <button
                            type="button"
                            onClick={() => {
                                const novoEstado = !modoApontarAtivo;
                                setModoApontarAtivo(novoEstado);
                                if (!novoEstado) {
                                    parar();
                                } else {
                                    falar("Modo de toque ativado. Toque em qualquer texto da tela para ouvir.");
                                }
                            }}
                            aria-pressed={modoApontarAtivo}
                            className={`flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-2xl px-4 py-3 font-titulo text-sm font-bold uppercase tracking-wide transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia ${
                                modoApontarAtivo
                                    ? "border-2 border-salvia bg-salvia text-fundo shadow-lg"
                                    : "border-2 border-salvia/60 bg-mata text-white hover:brightness-110"
                            }`}
                        >
                            <IconeFA nome="arrow-pointer" className="h-5 w-5 shrink-0" />
                            <span>
                                {modoApontarAtivo ? "✓ Toque Ativo (Ouvindo)" : "Ativar Toque para Ouvir"}
                            </span>
                        </button>

                        {modoApontarAtivo && (
                            <div className="mt-2 flex items-center gap-2 rounded-xl border border-salvia/30 bg-salvia/10 p-2.5 text-xs text-salvia">
                                <span className="h-2 w-2 rounded-full bg-salvia" />
                                <span>Agora toque no texto, aviso ou plantio que deseja escutar.</span>
                            </div>
                        )}
                    </div>

                    {/* ── LER TEXTO SELECIONADO ── */}
                    {textoSelecionado && (
                        <div className="mt-2.5">
                            <button
                                type="button"
                                onClick={() => falar(textoSelecionado)}
                                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-ambar bg-ambar/15 px-3 py-2 font-titulo text-xs font-semibold text-bege transition-all hover:bg-ambar/25 focus-visible:outline-2 focus-visible:outline-ambar"
                            >
                                <IconeFA nome="align-left" className="h-4 w-4 text-ambar" />
                                <span>Ler trecho grifado</span>
                            </button>
                        </div>
                    )}

                    {/* ── PARAR LEITURA ── */}
                    {estaFalando && (
                        <div className="mt-2.5">
                            <button
                                type="button"
                                onClick={parar}
                                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border-2 border-nivel-4 bg-nivel-4 px-4 py-2 font-titulo text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-2 focus-visible:outline-nivel-4"
                            >
                                <IconeFA nome="stop" className="h-3.5 w-3.5" />
                                <span>Parar Leitura</span>
                            </button>
                        </div>
                    )}

                    {/* ── VELOCIDADE DA VOZ ── */}
                    <div className="mt-4 border-t border-linha/80 pt-3">
                        <label className="block font-titulo text-[11px] font-semibold uppercase tracking-wider text-texto-2">
                            Velocidade da voz
                        </label>
                        <div className="mt-1.5 grid grid-cols-3 gap-1.5" role="group" aria-label="Velocidade da voz">
                            {[
                                { valor: 0.65, rotulo: "Calma" },
                                { valor: 1.0, rotulo: "Normal" },
                                { valor: 1.6, rotulo: "Rápida" },
                            ].map((item) => (
                                <button
                                    key={item.valor}
                                    type="button"
                                    onClick={() => {
                                        setVelocidade(item.valor);
                                        if (!estaFalando) {
                                            falar(`Velocidade ${item.rotulo.toLowerCase()}`);
                                        }
                                    }}
                                    className={`flex min-h-[38px] items-center justify-center rounded-xl font-titulo text-xs font-bold transition-all ${
                                        velocidade === item.valor
                                            ? "border-2 border-salvia bg-salvia/20 text-salvia"
                                            : "border border-linha bg-fundo/70 text-texto-2 hover:border-salvia/50 hover:text-bege"
                                    }`}
                                >
                                    {item.rotulo}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── INDICADOR DE LENDO AGORA ── */}
                    {estaFalando && textoAtual && (
                        <div className="mt-3 rounded-xl border border-linha bg-fundo/90 p-2.5">
                            <span className="block text-[10px] font-semibold uppercase tracking-wider text-salvia">
                                Lendo agora:
                            </span>
                            <p className="mt-0.5 line-clamp-2 text-xs text-bege italic">
                                "{textoAtual}"
                            </p>
                        </div>
                    )}

                    {/* Dica de arrastar no rodapé do menu */}
                    <div className="mt-3 border-t border-linha/60 pt-2 text-center text-[11px] text-texto-2/70">
                        💡 Você pode segurar e arrastar este botão para qualquer lugar da tela.
                    </div>
                </div>
            )}
        </aside>
    );
}
