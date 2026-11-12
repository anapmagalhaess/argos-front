import { useEffect } from "react";

/* Revela por posição visual: primeiro o topo da página, depois a esquerda da linha. */
export default function ScrollReveal() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

        const pendentes = new Set<HTMLElement>();
        let timer = 0;

        const observer = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) pendentes.add(entrada.target as HTMLElement);
            });
            revelarProximo();
        }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

        function revelarProximo() {
            if (timer || pendentes.size === 0) return;

            timer = window.setTimeout(() => {
                // Usa a posição atual: de cima para baixo e, na mesma linha, da esquerda para a direita.
                const ordenados = [...pendentes].sort((a, b) => {
                    const posicaoA = a.getBoundingClientRect();
                    const posicaoB = b.getBoundingClientRect();
                    const diferencaVertical = posicaoA.top - posicaoB.top;
                    return Math.abs(diferencaVertical) > 12
                        ? diferencaVertical
                        : posicaoA.left - posicaoB.left;
                });
                const item = ordenados[0];
                pendentes.delete(item);
                item.classList.remove("opacity-0", "translate-y-5");
                item.classList.add("opacity-100", "translate-y-0");
                observer.unobserve(item);
                timer = 0;
                revelarProximo();
            }, 100);
        }

        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
            item.classList.add("opacity-0", "translate-y-5", "transition-all", "duration-700", "ease-out", "motion-reduce:transition-none");
            observer.observe(item);
        });

        return () => {
            observer.disconnect();
            window.clearTimeout(timer);
            pendentes.clear();
        };
    }, []);

    return null;
}
