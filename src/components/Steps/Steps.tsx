import { useEffect, useRef, useState } from "react";

const passos = [
    { titulo: "Entrar", descricao: "Nome, celular e município. Um ajudante pode fazer." },
    { titulo: "Responder", descricao: "Perguntas fáceis, uma por tela, com figura e botão grande." },
    { titulo: "Perfil da roça", descricao: "O Argos entende a sua roça e estima o risco." },
    { titulo: "Ver o Hoje", descricao: "Avisos do município: chuva, seca, calor e praga." },
    { titulo: "Agir", descricao: "Guia visual: planta saudável ou com problema." },
];

/* A sequência das etapas avança quando esta seção entra na área visível. */
export default function Steps() {
    const sectionRef = useRef<HTMLElement>(null);
    const [etapaAtiva, setEtapaAtiva] = useState(0);

    useEffect(() => {
        const secao = sectionRef.current;
        if (!secao) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setEtapaAtiva(passos.length);
            return;
        }

        let timer = 0;
        const observer = new IntersectionObserver(([entrada]) => {
            if (!entrada.isIntersecting) return;
            observer.disconnect();
            let etapa = 0;
            timer = window.setInterval(() => {
                etapa += 1;
                setEtapaAtiva(etapa);
                if (etapa >= passos.length) window.clearInterval(timer);
            }, 520);
        }, { threshold: 0.35 });

        observer.observe(secao);
        return () => {
            observer.disconnect();
            window.clearInterval(timer);
        };
    }, []);

    return (
        <section id="como" ref={sectionRef} className="bg-terra-fundo py-24">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-7">
                <div data-reveal className="flex max-w-[720px] flex-col gap-3.5">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-salvia">A solução</p>
                    <h2 className="font-titulo text-[clamp(32px,4vw,50px)] leading-[1.08] font-extrabold uppercase text-bege">Um copiloto no bolso, em 5 passos.</h2>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-5">
                    {passos.map((passo, index) => (
                        <article
                            key={passo.titulo}
                            data-reveal
                            data-step-complete={etapaAtiva > index}
                            data-step-current={etapaAtiva === index + 1}
                            aria-current={etapaAtiva === index + 1 ? "step" : undefined}
                            className={`relative pt-[34px] before:absolute before:top-[11px] before:right-[-20px] before:left-0 before:h-0.5 before:bg-linha before:transition-colors before:duration-400 after:absolute after:top-0 after:left-0 after:box-border after:h-6 after:w-6 after:rounded-full after:border-[3px] after:border-salvia after:bg-terra-fundo after:transition-transform after:duration-400 ${etapaAtiva > index ? "before:bg-salvia after:bg-salvia" : ""} ${etapaAtiva === index + 1 ? "after:animate-pulse" : ""} motion-reduce:after:animate-none`}
                        >
                            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-salvia">Passo {index + 1}</p>
                            <h3 className="mt-1.5 font-titulo text-[23px] font-semibold text-bege">{passo.titulo}</h3>
                            <p className="mt-1.5 text-base text-texto-2">{passo.descricao}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
