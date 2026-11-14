import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import CardContato from "../../components/CardContato/CardContato";

// Canais de contato
const canais = [
    {
        id: "whatsapp",
        nome: "WhatsApp",
        descricao: "Dúvidas rápidas e suporte.",
        valor: "(11) 90000-0000",
        icone: (
            <>
                <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3z" />
                <path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1.2-1.2-2-1-.8.8c-.8-.4-1.5-1.1-1.9-1.9l.8-.8-1-2z" />
            </>
        ),
    },
    {
        id: "instagram",
        nome: "Instagram",
        descricao: "Novidades e dicas do campo.",
        valor: "@argos.campo",
        icone: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
            </>
        ),
    },
    {
        id: "email",
        nome: "E-mail",
        descricao: "Parcerias e mensagens mais longas.",
        valor: "contato@argos.com",
        icone: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="m3.5 7 8.5 6 8.5-6" />
            </>
        ),
    },
    {
        id: "telefone",
        nome: "Telefone",
        descricao: "Atendimento por voz.",
        valor: "(11) 4000-0000",
        icone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
    },
];

export default function Contato() {
    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege">
            <ScrollReveal />

            {/*hero*/}
            <section id="inicio" className="relative overflow-hidden bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <svg className="pointer-events-none absolute top-1/2 right-[7%] h-[240px] w-[240px] -translate-y-1/2 opacity-70" aria-hidden="true" viewBox="0 0 240 240">
                    <defs>
                        <pattern id="contato-hero-pontos" width="22" height="22" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.25" fill="#3A2F27" />
                        </pattern>
                    </defs>
                    <rect width="240" height="240" fill="url(#contato-hero-pontos)" />
                </svg>
                <Navbar />
                <div data-reveal className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-[22px] px-7 pt-14 pb-[88px]">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Contato</p>
                    <h1 className="font-titulo text-[clamp(44px,6vw,84px)] leading-none font-extrabold uppercase">Fale com o <br></br>Argos.</h1>
                    <p className="max-w-[620px] text-[clamp(19px,2vw,23px)] text-texto-2">Tem alguma dúvida, problema ou interesse em parceria? Nos mande uma mensagem!</p>
                </div>
            </section>

            {/* os ccontatos vêm de uma lista e são renderizados com a mesma estrutura */}
            <section className="relative overflow-hidden bg-card py-[88px] pb-24">
                <div aria-hidden="true" className="pointer-events-none absolute right-[-180px] bottom-[-140px] h-[520px] w-[520px] rounded-[58%_42%_55%_45%_/_50%_58%_42%_50%] bg-terra opacity-[.14]" />
                <div className="relative mx-auto w-full max-w-[1200px] px-7">
                    <p className="mb-[26px] text-sm font-semibold uppercase tracking-[.14em] text-salvia">Escolha um canal</p>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-[72px]">
                        {canais.map((canal) => <CardContato key={canal.id} {...canal} />)}
                    </div>
                </div>
            </section>

            {/* banner issue */}
            <section className="relative overflow-hidden bg-terra-fundo py-[72px]">
                <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-60" aria-hidden="true" viewBox="0 0 1440 300" preserveAspectRatio="none">
                    <defs>
                        <pattern id="contato-feedback-pontos" width="22" height="22" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.25" fill="#3A2F27" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#contato-feedback-pontos)" />
                </svg>
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-12 gap-y-7 px-7">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-ambar text-ambar">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="8" y="8" width="8" height="12" rx="4" />
                            <path d="M9 8a3 3 0 0 1 6 0M4 13h4M16 13h4M5 7l3 2.5M19 7l-3 2.5M5 19l3-2M19 19l-3-2" />
                        </svg>
                    </div>
                    <div className="min-w-0 flex-[1_1_360px]">
                        <h2 className="font-titulo text-[clamp(28px,3.4vw,46px)] leading-[1.08] font-extrabold uppercase">Encontrou algum problema?</h2>
                        <p className="mt-2.5 max-w-[560px] text-[19px] text-texto-2">Conte para a gente no GitHub. Cada aviso ajuda a deixar o Argos melhor.</p>
                    </div>
                    <a
                        className="inline-flex min-h-[60px] items-center justify-center gap-3 rounded-full bg-bege px-[34px] font-titulo text-lg font-bold uppercase tracking-[.04em] text-fundo transition-transform duration-200 hover:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none"
                        href="https://github.com/anapmagalhaess/argos-front/issues"
                        target="_blank"
                        rel="noopener"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                        </svg>
                        Abrir Issue
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
