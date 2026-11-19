import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import CardContato from "../../components/CardContato/CardContato";
import type { CardContatoProps } from "../../components/CardContato/CardContato";
import IconeFA from "../../components/IconeFA/IconeFA";

// Canais de contato
const canais: CardContatoProps[] = [
    {
        id: "whatsapp",
        nome: "WhatsApp",
        descricao: "Dúvidas rápidas e suporte.",
        valor: "(11) 90000-0000",
        icone: "whatsapp",
    },
    {
        id: "instagram",
        nome: "Instagram",
        descricao: "Novidades e dicas do campo.",
        valor: "@argos.campo",
        icone: "instagram",
    },
    {
        id: "email",
        nome: "E-mail",
        descricao: "Parcerias e mensagens mais longas.",
        valor: "contato@argos.com",
        icone: "envelope",
    },
    {
        id: "telefone",
        nome: "Telefone",
        descricao: "Atendimento por voz.",
        valor: "(11) 4000-0000",
        icone: "phone",
    },
];

export default function Contato() {
    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege">
            <ScrollReveal />

            {/*hero*/}
            <section id="inicio" className="relative overflow-x-clip overflow-y-visible bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
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
                        <IconeFA nome="bug" className="size-9" />
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
                        <IconeFA nome="github" className="size-5" />
                        Abrir Issue
                        <IconeFA nome="arrow-up-right" className="size-5" />
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
