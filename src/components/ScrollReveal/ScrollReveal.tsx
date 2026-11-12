import { useEffect } from "react";

/* Ativa a animação depois da página ter sido carregada completamente */
export default function ScrollReveal() {
    useEffect(() => {
        const itens = document.querySelectorAll<HTMLElement>("[data-reveal]");
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver((entradas, instancia) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) return;
                const item = entrada.target as HTMLElement;
                item.classList.remove("opacity-0", "translate-y-5");
                item.classList.add("opacity-100", "translate-y-0");
                instancia.unobserve(entrada.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

        const atrasos = ["delay-0", "delay-75", "delay-150", "delay-200", "delay-300", "delay-500"];
        itens.forEach((item, index) => {
            item.classList.add(
                "opacity-0",
                "translate-y-5",
                "transition-all",
                "duration-[650ms]",
                "ease-[cubic-bezier(.2,.7,.2,1)]",
                "motion-reduce:transition-none",
                atrasos[index % atrasos.length],
            );
            observer.observe(item);
        });
        return () => observer.disconnect();
    }, []);

    return null;
}
