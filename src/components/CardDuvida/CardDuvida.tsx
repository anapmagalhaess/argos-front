import { useState, useId } from "react";

/*
    CardDuvida : Card que expande para as duvidas frequentes da pagina FAQ.
*/

export interface CardDuvidaProps {
    pergunta: string;
    resposta: string;
    categoria: string;
    numero?: string;
    destaque?: boolean;
}

export default function CardDuvida({
    pergunta,
    resposta,
    categoria,
    numero,
    destaque = false,
}: CardDuvidaProps) {
    const [aberto, setAberto] = useState(false);
    const contentId = useId();

    return (
        <article
            data-reveal
            className={`group rounded-2xl border transition-all duration-200 ${
                aberto
                    ? "border-salvia/80 bg-card shadow-[0_12px_32px_rgba(0,0,0,.35)]"
                    : "border-linha bg-card/70 hover:border-linha/90 hover:bg-card"
            } ${destaque ? "ring-1 ring-salvia/30" : ""}`}
        >
            <h3>
                <button
                    type="button"
                    onClick={() => setAberto((prev) => !prev)}
                    aria-expanded={aberto}
                    aria-controls={contentId}
                    className="flex w-full min-h-[58px] cursor-pointer items-start justify-between gap-4 p-5 text-left focus-visible:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia sm:p-6"
                >
                    <div className="flex min-w-0 flex-1 items-start gap-3.5">
                        {numero && (
                            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linha/60 font-titulo text-xs font-bold text-salvia">
                                {numero}
                            </span>
                        )}
                        <div className="min-w-0 flex-1">
                            <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-wider text-salvia/90">
                                {categoria}
                            </span>
                            <span className="block font-titulo text-lg font-bold text-bege sm:text-xl">
                                {pergunta}
                            </span>
                        </div>
                    </div>

                    <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                            aberto
                                ? "border-salvia bg-salvia text-fundo rotate-180"
                                : "border-linha bg-fundo/60 text-salvia group-hover:border-salvia/60"
                        }`}
                        aria-hidden="true"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </span>
                </button>
            </h3>

            <div
                id={contentId}
                hidden={!aberto}
                className="px-5 pb-6 pt-1 sm:px-6 sm:pb-7"
            >
                <div className="border-t border-linha/70 pt-4 text-base leading-relaxed text-texto-2 sm:text-lg">
                    <p className="whitespace-pre-line">{resposta}</p>
                </div>
            </div>
        </article>
    );
}
