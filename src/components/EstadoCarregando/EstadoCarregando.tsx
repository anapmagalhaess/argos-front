import { createPortal } from "react-dom";

interface EstadoCarregandoProps {
    titulo?: string;
    descricao?: string;
    telaInteira?: boolean;
}

/** Cartão de espera compartilhado por ações que podem levar alguns instantes. */
export default function EstadoCarregando({
    titulo = "Estamos acordando o sistema…",
    descricao = "A primeira chamada ao servidor pode levar até cerca de 1 minuto.",
    telaInteira = false,
}: EstadoCarregandoProps) {
    const cartao = (
        <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={telaInteira ? "fixed inset-0 z-[100] grid place-items-center bg-fundo/75 px-5 py-8 backdrop-blur-sm" : "w-full"}
        >
            <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-3xl border border-linha bg-card px-7 py-8 text-center shadow-[0_24px_80px_rgba(0,0,0,.45)] sm:px-10">
                <div className="flex items-center gap-3 py-2" aria-hidden="true">
                    <span className="size-3.5 animate-bounce rounded-full bg-salvia motion-reduce:animate-none [animation-delay:0ms]" />
                    <span className="size-3.5 animate-bounce rounded-full bg-ambar motion-reduce:animate-none [animation-delay:150ms]" />
                    <span className="size-3.5 animate-bounce rounded-full bg-nivel-4 motion-reduce:animate-none [animation-delay:300ms]" />
                </div>
                <p className="font-titulo text-xl font-semibold text-bege">{titulo}</p>
                <p className="text-sm leading-relaxed text-texto-2">{descricao}</p>
            </div>
        </div>
    );

    return telaInteira ? createPortal(cartao, document.body) : cartao;
}
