import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import CardIntegrante from "../../components/CardIntegrante/CardIntegrante";
import { integrantes } from "../../data/integrantes";

export default function Integrantes() {
    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege [background:radial-gradient(620px_460px_at_100%_55%,rgba(217,166,80,.07),transparent_70%),linear-gradient(180deg,var(--color-card)_0%,var(--color-fundo)_42%,var(--color-fundo)_100%)]">
            <ScrollReveal />

            {/* topo da página: mesmo padrão das páginas Sobre e Contato */}
            <section className="relative overflow-x-clip bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-16 hidden size-[380px] opacity-50 md:block">
                    <svg viewBox="0 0 380 380" className="h-full w-full" fill="none">
                        <path d="M190 24 334 107v166l-144 83-144-83V107L190 24Z" stroke="#7DBE8C" strokeOpacity=".22" strokeWidth="1.5" />
                        <path d="M190 66 298 128v124l-108 62-108-62V128l108-62Z" stroke="#D9A650" strokeOpacity=".24" strokeWidth="1.5" />
                        <circle cx="190" cy="190" r="72" fill="url(#equipeAura)" />
                        <circle cx="190" cy="190" r="42" stroke="#7DBE8C" strokeOpacity=".32" />
                        <circle cx="190" cy="190" r="5" fill="#D9A650" />
                        <circle cx="190" cy="24" r="4" fill="#7DBE8C" />
                        <circle cx="334" cy="107" r="3" fill="#D9A650" />
                        <circle cx="46" cy="273" r="3" fill="#7DBE8C" />
                        <defs>
                            <radialGradient id="equipeAura"><stop stopColor="#7DBE8C" stopOpacity=".18" /><stop offset="1" stopColor="#7DBE8C" stopOpacity="0" /></radialGradient>
                        </defs>
                    </svg>
                </div>
                <Navbar />
                <div data-reveal className="relative mx-auto flex w-full max-w-300 flex-col gap-5.5 px-7 pt-14 pb-18">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Integrantes</p>
                    <h1 className="font-titulo text-[clamp(44px,6vw,84px)] leading-none font-extrabold uppercase">
                        Quem faz <br />o Argos.
                    </h1>
                    <p className="max-w-160 text-[clamp(19px,2vw,23px)] text-texto-2">
                        Somos cinco estudantes do 1º ano de Análise e Desenvolvimento de Sistemas da FIAP.
                        Cada um cuida de uma parte, e todos conhecem o projeto inteiro.
                    </p>
                </div>
            </section>

            {/* Os cartões vêm da lista em data/integrantes.ts. Cabem 5 por linha no computador, 3 no tablet
                e 1 no celular; a última linha fica centralizada, sem buraco de um lado. */}
            <section aria-label="Integrantes do grupo" className="relative overflow-hidden border-t border-linha/60 bg-[radial-gradient(ellipse_at_50%_0%,rgba(125,190,140,.055),transparent_60%),radial-gradient(circle_at_1px_1px,rgba(230,218,198,.075)_1px,transparent_0)] [background-size:auto,28px_28px] pt-12 pb-24">
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-salvia/50 to-transparent" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-ambar/[.045] blur-3xl" />
                <ul className="mx-auto flex w-full max-w-300 flex-wrap justify-center gap-6 px-7">
                    {integrantes.map((integrante) => (
                        <li
                            key={integrante.rm}
                            className="flex w-full sm:w-[calc((100%-24px)/2)] md:w-[calc((100%-48px)/3)] xl:w-[calc((100%-96px)/5)]"
                        >
                            <CardIntegrante {...integrante} />
                        </li>
                    ))}
                </ul>
            </section>

            <Footer />
        </main>
    );
}
