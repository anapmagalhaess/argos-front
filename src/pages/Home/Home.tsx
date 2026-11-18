import CardDores from "../../components/CardDores/CardDores";
import CardExplorar from "../../components/CardExplorar/CardExplorar";
import BadgeAlerta from "../../components/BadgeAlerta/BadgeAlerta";
import Abertura from "../../components/Abertura/Abertura";
import Metricas from "../../components/Metricas/Metricas";
import Steps from "../../components/Steps/Steps";
import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import { useRolagemDireta } from "../../hooks/useRolagemDireta";

/** Uma girada do mouse leva direto da abertura para o resto da página, e de volta. */
const PARADAS = ["inicio", "conteudo"];

// Home do Argos convertida do protótipo HTML para JSX.

export default function Home() {
    useRolagemDireta(PARADAS);

    return (
        // A abertura fica presa no alto (sticky), por isso o `overflow-hidden` não pode estar no <main>:
        // ele vai na caixa de baixo, que sobe por cima da abertura conforme a página rola.
        <main className="bg-[#17110D]">
            <Abertura proximaParte="conteudo" />

            <div
                id="conteudo"
                className="relative z-10 w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege shadow-[0_-30px_70px_rgb(0_0_0/0.55)]"
            >
            <ScrollReveal />

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
                        <CardExplorar titulo="Solução" descricao="Conheça o problema real, os dados oficiais e a tese completa do Argos." chamada="VER SOLUÇÃO →" para="/solucao" />
                        <CardExplorar titulo="Triagem" descricao="Responda com figuras e monte o perfil da sua roça." chamada="COMEÇAR →" para="/triagem" />
                        <CardExplorar titulo="Hoje" descricao="Os avisos do seu município, com a fonte." chamada="VER AVISOS →" para="/hoje" />
                        <CardExplorar titulo="Mapa das lavouras" descricao="O Brasil visto do satélite: clima, ar, umidade, solo e pragas de seis lavouras." chamada="ABRIR O MAPA →" para="/mapa" />
                        <CardExplorar titulo="Guia visual" descricao="Milho e feijão: saudável, praga, seca e excesso de água." chamada="ABRIR O GUIA →" para="/guia/milho" />
                        <CardExplorar titulo="Sobre" descricao="O problema, a solução e os ODS 2, 13 e 10." chamada="SABER MAIS →" para="/sobre" />
                        <CardExplorar titulo="FAQ" descricao="Dúvidas respondidas em linguagem simples." chamada="TIRAR DÚVIDAS →" para="/faq" />
                        <CardExplorar titulo="Contato" descricao="Fale com a equipe do Argos." chamada="ENVIAR MENSAGEM →" para="/contato" />
                    </div>
                </div>
            </section>
            <Footer />
            </div>
        </main>
    );
}
