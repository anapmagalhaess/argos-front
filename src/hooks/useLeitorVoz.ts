import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Interface com os controles e estados do leitor de voz por síntese de fala (Text-to-Speech).
 */
export interface ControlesVoz {
    /** Indica se a API de síntese de voz é suportada pelo navegador atual */
    suportado: boolean;
    /** Indica se o navegador está falando no momento */
    estaFalando: boolean;
    /** Velocidade atual da fala (0.65 = calma/pausada, 1.0 = normal, 1.5 = rápida) */
    velocidade: number;
    /** Altera a velocidade de reprodução imediatamente */
    setVelocidade: (v: number) => void;
    /** Lê um texto em voz alta com configurações otimizadas para clareza em PT-BR */
    falar: (texto: string, aoTerminar?: () => void) => void;
    /** Interrompe imediatamente qualquer leitura em andamento */
    parar: () => void;
    /** Pausa a leitura atual */
    pausar: () => void;
    /** Retoma a leitura pausada */
    retomar: () => void;
    /** Texto que está sendo lido atualmente */
    textoAtual: string;
}

/**
 * Hook customizado para encapsular a Web Speech API (SpeechSynthesis).
 */
export function useLeitorVoz(): ControlesVoz {
    const [suportado, setSuportado] = useState(false);
    const [estaFalando, setEstaFalando] = useState(false);
    const [velocidade, setVelocidadeEstado] = useState<number>(1.0);
    const [textoAtual, setTextoAtual] = useState<string>("");

    // Ref para garantir que qualquer chamada de fala acesse a velocidade mais recente
    // sem depender de ciclos de re-render ou closures antigas de eventos
    const velocidadeRef = useRef<number>(1.0);
    const textoAtualRef = useRef<string>("");
    const aoTerminarRef = useRef<(() => void) | undefined>(undefined);
    
    // Referência para armazenar as vozes do sistema
    const vozPtBrRef = useRef<SpeechSynthesisVoice | null>(null);

    // Inicialização e detecção do suporte
    useEffect(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            setSuportado(true);

            const carregarVozes = () => {
                const todasVozes = window.speechSynthesis.getVoices();
                // Procura a melhor voz em Português do Brasil
                const vozPt = todasVozes.find(
                    (v) => v.lang.toLowerCase() === "pt-br" || v.lang.toLowerCase().startsWith("pt")
                );
                vozPtBrRef.current = vozPt || null;
            };

            carregarVozes();

            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = carregarVozes;
            }

            const intervalo = setInterval(() => {
                if (window.speechSynthesis) {
                    setEstaFalando(window.speechSynthesis.speaking);
                }
            }, 200);

            return () => {
                clearInterval(intervalo);
                if (window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                }
            };
        } else {
            setSuportado(false);
        }
    }, []);

    /**
     * Interrompe qualquer som em reprodução
     */
    const parar = useCallback(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setEstaFalando(false);
            setTextoAtual("");
            textoAtualRef.current = "";
        }
    }, []);

    /**
     * Pausa a reprodução
     */
    const pausar = useCallback(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.pause();
            setEstaFalando(false);
        }
    }, []);

    /**
     * Retoma a reprodução pausada
     */
    const retomar = useCallback(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.resume();
            setEstaFalando(true);
        }
    }, []);

    /**
     * Realiza a leitura falada do texto fornecido
     */
    const falar = useCallback(
        (texto: string, aoTerminar?: () => void) => {
            if (typeof window === "undefined" || !("speechSynthesis" in window)) {
                return;
            }

            const textoLimpo = texto
                .replace(/\s+/g, " ")
                .replace(/[•·—_~*#]/g, " ")
                .trim();

            if (!textoLimpo) return;

            // Cancela leituras anteriores
            window.speechSynthesis.cancel();

            aoTerminarRef.current = aoTerminar;
            textoAtualRef.current = textoLimpo;

            const utterance = new SpeechSynthesisUtterance(textoLimpo);
            utterance.lang = "pt-BR";
            // Aplica diretamente o valor da ref para garantir precisão imediata
            utterance.rate = velocidadeRef.current;
            utterance.pitch = 1.0;

            if (vozPtBrRef.current) {
                utterance.voice = vozPtBrRef.current;
            }

            utterance.onstart = () => {
                setEstaFalando(true);
                setTextoAtual(textoLimpo);
            };

            utterance.onend = () => {
                setEstaFalando(false);
                setTextoAtual("");
                textoAtualRef.current = "";
                if (aoTerminarRef.current) {
                    aoTerminarRef.current();
                    aoTerminarRef.current = undefined;
                }
            };

            utterance.onerror = (e) => {
                if (e.error !== "canceled" && e.error !== "interrupted") {
                    console.warn("Aviso na síntese de voz:", e.error);
                }
                setEstaFalando(false);
                setTextoAtual("");
                textoAtualRef.current = "";
            };

            window.speechSynthesis.speak(utterance);
        },
        []
    );

    /**
     * Altera a velocidade e, se houver um texto sendo lido, reinicia imediatamente
     * a leitura na nova velocidade para que o usuário sinta a diferença instantaneamente.
     */
    const setVelocidade = useCallback(
        (novaVelocidade: number) => {
            velocidadeRef.current = novaVelocidade;
            setVelocidadeEstado(novaVelocidade);

            // Se estiver falando um texto no momento, reinicia na nova velocidade
            if (typeof window !== "undefined" && window.speechSynthesis && window.speechSynthesis.speaking) {
                const textoEmAndamento = textoAtualRef.current;
                const callbackEmAndamento = aoTerminarRef.current;
                if (textoEmAndamento) {
                    falar(textoEmAndamento, callbackEmAndamento);
                }
            }
        },
        [falar]
    );

    return {
        suportado,
        estaFalando,
        velocidade,
        setVelocidade,
        falar,
        parar,
        pausar,
        retomar,
        textoAtual,
    };
}
