import CardDores from "../../components/CardDores/CardDores";
import CardExplorar from "../../components/CardExplorar/CardExplorar";
import BadgeAlerta from "../../components/BadgeAlerta/BadgeAlerta";
import Navbar from "../../components/Navbar/Navbar";
import Metricas from "../../components/Metricas/Metricas";
import Steps from "../../components/Steps/Steps";
import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";

// Home do Argos convertida do protótipo HTML para JSX.

export default function Home() {
    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege">
            <ScrollReveal />
            <section id="inicio" className="relative overflow-hidden bg-[radial-gradient(700px_420px_at_82%_38%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_8%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                {/* Linhas de relevo como background */}
                <svg aria-hidden="true" viewBox="0 0 1440 760" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full opacity-70">
                    <g fill="none" stroke="#3A2F27" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
                        <path d="M-20 560 C 260 470 520 640 800 540 S 1250 470 1460 540" />
                        <path d="M-20 600 C 260 510 520 680 800 580 S 1250 510 1460 580" />
                        <path d="M-20 640 C 260 550 520 720 800 620 S 1250 550 1460 620" />
                        <path d="M-20 680 C 260 590 520 760 800 660 S 1250 590 1460 660" />
                        <path d="M-20 720 C 260 630 520 800 800 700 S 1250 630 1460 700" />
                    </g>
                </svg>

                <Navbar/>

                <div className="relative mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-center gap-14 px-7 pt-14 pb-[104px]">
                    <div data-reveal className="flex flex-col gap-[26px]">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-salvia">Inteligência do campo para o pequeno produtor</p>
                        <h1 className="font-titulo text-[clamp(44px,6vw,80px)] leading-none font-extrabold uppercase text-bege">De olho na sua roça.</h1>
                        <p className="max-w-[540px] text-[clamp(19px,2vw,22px)] text-texto-2">O Argos avisa antes da chuva forte, da seca e da praga. Em palavras simples, com figura e voz, no celular de quem trabalha a terra.</p>
                        <div className="mt-1.5 flex flex-wrap gap-3.5">
                            <a href="#triagem" className="inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] hover:brightness-110 focus-visible:scale-[1.035] active:scale-[.98] motion-reduce:transition-none">Começar a triagem</a>
                            <a href="#como" className="inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-linha bg-transparent px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-bege transition-transform duration-150 hover:scale-[1.035] hover:border-bege focus-visible:scale-[1.035] active:scale-[.98] motion-reduce:transition-none">Ver como funciona</a>
                        </div>
                    </div>

                    {/* Desenho vetorial do trator e da lavoura */}
                    <div data-reveal className="relative pb-12">
                        <div className="overflow-hidden rounded-[32px] border border-linha bg-card shadow-[0_30px_70px_rgba(0,0,0,.5)]">
                            <svg viewBox="0 0 480 420" className="block w-full" role="img" aria-label="Trator cruzando uma plantação de trigo sob o sol">
                                <defs>
                                    <g id="trigo"><path d="M0 0 V-112" stroke="#E6DAC6" strokeWidth="3" fill="none" strokeLinecap="round" /><g fill="#D9A650"><ellipse cx="0" cy="-114" rx="4.5" ry="11" /><ellipse cx="-7" cy="-96" rx="4.5" ry="10" transform="rotate(-28 -7 -96)" /><ellipse cx="7" cy="-96" rx="4.5" ry="10" transform="rotate(28 7 -96)" /><ellipse cx="-7" cy="-79" rx="4.5" ry="10" transform="rotate(-28 -7 -79)" /><ellipse cx="7" cy="-79" rx="4.5" ry="10" transform="rotate(28 7 -79)" /><ellipse cx="-7" cy="-62" rx="4.5" ry="10" transform="rotate(-28 -7 -62)" /><ellipse cx="7" cy="-62" rx="4.5" ry="10" transform="rotate(28 7 -62)" /></g></g>
                                </defs>
                                <circle cx="350" cy="130" r="96" fill="none" stroke="#D9A650" strokeOpacity=".25" strokeWidth="2" />
                                <circle cx="350" cy="130" r="72" fill="#D9A650" />
                                <path d="M0 292 C120 262 320 262 480 294 V420 H0Z" fill="#8A3B2E" />
                                <path d="M0 292 C120 262 320 262 480 294 V304 C320 272 120 272 0 302Z" fill="#2E5A43" />
                                <g fill="none" stroke="#3A1A15" strokeOpacity=".7" strokeWidth="2">
                                    <path d="M0 312 C140 284 320 284 480 314" /><path d="M0 336 C140 308 320 308 480 338" />
                                    <path d="M0 362 C140 334 320 334 480 364" /><path d="M0 392 C140 364 320 364 480 394" />
                                </g>

                                {/* Trator em formas simples */}
                                <rect x="146" y="226" width="9" height="32" rx="3" fill="#E6DAC6" />
                                <rect x="148" y="256" width="104" height="50" rx="12" fill="#E6DAC6" />
                                <rect x="250" y="200" width="74" height="86" rx="8" fill="#E6DAC6" />
                                <rect x="260" y="212" width="54" height="40" rx="5" fill="#2E5A43" />
                                <rect x="242" y="190" width="90" height="12" rx="6" fill="#7DBE8C" />
                                <rect x="148" y="294" width="176" height="16" rx="6" fill="#A8997F" />

                                <circle cx="290" cy="298" r="54" fill="#17110D" stroke="#E6DAC6" strokeWidth="7" />
                                <circle cx="290" cy="298" r="22" fill="#D9A650" /><circle cx="290" cy="298" r="7" fill="#17110D" />
                                <circle cx="172" cy="324" r="31" fill="#17110D" stroke="#E6DAC6" strokeWidth="6" />
                                <circle cx="172" cy="324" r="11" fill="#D9A650" />
                                <use href="#trigo" transform="translate(26 416) scale(1.05)" />
                                <use href="#trigo" transform="translate(58 420) scale(1.25)" />
                                <use href="#trigo" transform="translate(92 414) scale(.95)" />
                                <use href="#trigo" transform="translate(386 416) scale(1)" />
                                <use href="#trigo" transform="translate(420 421) scale(1.3)" />
                                <use href="#trigo" transform="translate(454 415) scale(1.05)" />
                            </svg>
                        </div>
                        {/* Card de Alerta */}
                        <aside className="absolute right-[-18px] bottom-0 w-[270px] max-w-[80%] rounded-[20px] border border-linha bg-fundo p-3.5 shadow-[0_18px_40px_rgba(0,0,0,.55)]">
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-texto-2">Avisos de hoje · Petrolina</p>
                                <span className="rounded-full bg-salvia px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-fundo">Exemplo</span>
                            </div>
                            <div className="mt-2.5 flex flex-col gap-2">
                                <BadgeAlerta nivel={3} titulo="Perigo de seca" tamanho="compacto" />
                                <BadgeAlerta nivel={2} titulo="Calor forte" tamanho="compacto" />
                                <BadgeAlerta nivel={1} titulo="Praga: sem aviso" tamanho="compacto" />
                            </div>
                            <p className="mt-2.5 text-xs text-texto-2">Fonte: INMET · dados de exemplo</p>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Estatísticas */}
            <Metricas />

            {/* Dores*/}
            <section id="dor" className="bg-bege py-24 text-fundo">
                <div className="mx-auto max-w-[1200px] px-7">
                    <div data-reveal className="flex max-w-[780px] flex-col gap-3.5">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mata">A dor</p>
                        <h2 className="font-titulo text-[clamp(32px,4vw,50px)] leading-[1.08] font-extrabold uppercase">Quem planta decide no escuro.</h2>
                        <p className="text-[21px] text-fundo">Na roça do pequeno produtor, uma safra inteira pode se perder em poucos dias:
                            uma chuva forte fora de hora, uma seca que se estende além do previsto, uma praga que passa despercebida. Feijão,
                            milho e mandioca dependem de decisões tomadas sem previsão clara, sem técnico por perto e com informação que
                            quase ninguém consegue ler. Com o El Niño de 2026, o risco aumenta: só entre julho e setembro, os desastres
                            causaram R$ 12,6 bi em prejuízos, e a agricultura foi a mais atingida.
                        </p>
                    </div>
                    <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
                        <CardDores numero="01" titulo="Falta técnico por perto" descricao="Só cerca de 20% recebiam assistência técnica. A decisão fica por conta do produtor." />
                        <CardDores numero="02" titulo="Informação difícil de ler" descricao="O dado oficial existe, mas é espalhado e técnico. 23% dos produtores não leem nem escrevem." />
                        <CardDores numero="03" titulo="Celular sim, sinal nem sempre" descricao="83% da zona rural usa internet, mas 26% dos domicílios conectados dividem o sinal com o vizinho." />
                        <CardDores numero="04" titulo="O El Niño de 2026 chegou" descricao="Mais seca no Norte e no Nordeste, com pico previsto para dezembro." />
                    </div>
                </div>
            </section>

            {/* Fluxo em cinco passos*/}
            <Steps />

            {/* Diferencial e legenda de severidade com BadgeAlerta. */}
            <section className="border-t border-linha bg-fundo py-24">
                <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-14 px-7">
                    <div data-reveal className="flex flex-col gap-[18px]">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-salvia">O diferencial</p>
                        <h2 className="font-titulo text-[clamp(32px,4vw,50px)] leading-[1.08] font-extrabold uppercase text-bege">Eles respondem. 
                            <span className="text-salvia">O Argos avisa antes.</span>
                        </h2>
                        <p className="text-texto-2">Um vizinho que entende do assunto e não espera você perguntar. Todo aviso traz a fonte oficial, 
                            uma figura e palavras do campo.</p>
                        <a href="#triagem" className="mt-2 inline-flex min-h-14 self-start items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] hover:brightness-110 focus-visible:scale-[1.035] active:scale-[.98] motion-reduce:transition-none">Começar agora</a>
                    </div>
                    <div data-reveal className="flex flex-col gap-3.5"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-texto-2">Quatro níveis de aviso. Sempre desenho e palavra.</p><BadgeAlerta nivel={1} mostrarNumero /><BadgeAlerta nivel={2} mostrarNumero /><BadgeAlerta nivel={3} mostrarNumero /><BadgeAlerta nivel={4} mostrarNumero /></div>
                </div>
            </section>

            {/* Explorar */}
            <section id="triagem" className="border-t border-linha bg-card py-24">
                <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-7">
                    <h2 data-reveal className="text-center font-titulo text-[clamp(30px,3.6vw,44px)] leading-tight font-extrabold uppercase text-bege">Explore o Argos</h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
                        <CardExplorar titulo="Triagem" descricao="Responda com figuras e monte o perfil da sua roça." chamada="COMEÇAR →" para="/triagem" />
                        <CardExplorar titulo="Hoje" descricao="Os avisos do seu município, com a fonte." chamada="VER AVISOS →" para="/hoje" />
                        <CardExplorar titulo="Guia visual" descricao="Milho e feijão: saudável, praga, seca e excesso de água." chamada="ABRIR O GUIA →" para="/guia/milho" />
                        <CardExplorar titulo="Sobre" descricao="O problema, a solução e os ODS 2, 13 e 10." chamada="SABER MAIS →" para="/sobre" />
                        <CardExplorar titulo="FAQ" descricao="Dúvidas respondidas em linguagem simples." chamada="TIRAR DÚVIDAS →" para="/faq" />
                        <CardExplorar titulo="Contato" descricao="Fale com a equipe do Argos." chamada="ENVIAR MENSAGEM →" para="/contato" />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
