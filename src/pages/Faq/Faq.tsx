import { useState, useMemo } from "react";
import { Link } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import CardDuvida, { type CardDuvidaProps } from "../../components/CardDuvida/CardDuvida";
import IconeFA from "../../components/IconeFA/IconeFA";

//Duvidas
const faqData: (CardDuvidaProps & { id: string })[] = [
    {
        id: "o-que-e-argos",
        numero: "01",
        categoria: "Sobre o Argos",
        pergunta: "O que é o Argos e como ele funciona como meu copiloto?",
        resposta:
            "O Argos é um copiloto digital feito para quem lida com a terra. Ele acompanha o clima do seu município, as condições do seu solo e as necessidades da sua plantação (como milho e feijão).\n\nEm vez de tabelas e previsões difíceis de entender, o Argos entrega avisos diretos com figuras, cores e poucas palavras. Ele diz quando a chuva forte está vindo, quando a seca vai apertar ou quando há risco de pragas na vizinhança, para você agir antes de ter prejuízo.",
        destaque: true,
    },
    {
        id: "custo-produtor",
        numero: "02",
        categoria: "Custos & Acesso",
        pergunta: "Preciso pagar alguma mensalidade para usar o Argos na minha roça?",
        resposta:
            "Não, o Argos é totalmente gratuito para o pequeno e médio produtor rural.\n\nQuem financia a ferramenta são as cooperativas agrícolas, secretarias municipais de agricultura e órgãos de assistência técnica (ATER). Essas organizações contratam o Argos para proteger a produção dos seus cooperados e garantir que a assistência chegue mais rápido a quem mais precisa.",
        destaque: true,
    },
    {
        id: "internet-fraca-offline",
        numero: "03",
        categoria: "Celular & Conexão",
        pergunta: "O sistema funciona se a internet da minha região for fraca ou cair?",
        resposta:
            "Sim. Nós sabemos bem que na roça o sinal de celular oscila muito e que muitos vizinhos dividem a mesma conexão.\n\nPor isso, o Argos funciona como um aplicativo inteligente (PWA): assim que você abre o painel 'Hoje', as informações e os guias visuais ficam salvos no próprio aparelho. Você consegue consultar os alertas e as orientações da sua lavoura mesmo quando estiver sem internet no meio do campo.",
        destaque: true,
    },
    {
        id: "pouca-leitura-acessibilidade",
        numero: "04",
        categoria: "Uso no Campo",
        pergunta: "Tenho dificuldade para ler ou prefiro não digitar. Consigo usar?",
        resposta:
            "Sim! O Argos foi planejado desde o primeiro dia para quem lê pouco ou não tem familiaridade com celulares modernos.\n\nAs perguntas aparecem uma por tela, com figuras bem visíveis e botões grandes de toque fácil. Você também conta com o botão 'Ouvir' para escutar qualquer aviso falado em voz alta pelo próprio aparelho. Se preferir, um filho, neto ou técnico pode fazer seu cadastro em menos de 3 minutos.",
    },
    {
        id: "precisa-de-senha",
        numero: "05",
        categoria: "Custos & Acesso",
        pergunta: "Preciso criar conta, lembrar de senha ou guardar código de acesso?",
        resposta:
            "Não precisa decorar senha nem digitar PIN toda vez que for usar. O Argos guarda sua identificação com segurança no próprio celular.\n\nDepois que você responde a triagem inicial pela primeira vez, toda vez que abrir o Argos você já entra direto na tela 'Hoje', com os alertas da sua cidade e os cuidados da sua plantação.",
    },
    {
        id: "diferenca-chatbots",
        numero: "06",
        categoria: "Sobre o Argos",
        pergunta: "Qual é a diferença entre o Argos e outros assistentes de mensagem?",
        resposta:
            "A grande diferença é simples: outros assistentes no WhatsApp exigem que você saiba o que perguntar e gaste tempo digitando mensagens.\n\nO lema do Argos é: eles respondem quando você pergunta; o Argos avisa antes. Sabendo qual é a sua roça, nosso sistema monitora o tempo dia e noite e avisa você preventivamente sobre seca, excesso de chuva ou pragas antes que você sofra a perda.",
    },
    {
        id: "fontes-dos-dados",
        numero: "07",
        categoria: "Previsões & Dados",
        pergunta: "De onde vêm as previsões do tempo e os alertas da minha região?",
        resposta:
            "Todas as informações do Argos vêm de fontes públicas oficiais e pesquisas agronômicas comprovadas.\n\nNós monitoramos dados meteorológicos do Instituto Nacional de Meteorologia (INMET), avisos de emergência da Defesa Civil e estudos da Embrapa e do IBGE. Todo aviso que aparece na tela traz o nome do órgão responsável, garantindo total transparência e segurança para suas decisões.",
    },
    {
        id: "aviso-de-pragas-vizinhos",
        numero: "08",
        categoria: "Uso no Campo",
        pergunta: "Como funciona o aviso colaborativo de pragas com os vizinhos?",
        resposta:
            "Se você avistar lagartas, fungos ou insetos atacando suas plantas, você pode tocar no botão 'Vi essa praga aqui' e registrar a ocorrência em poucos segundos.\n\nO sistema reúne esses relatos de forma anônima e gera um alerta para os outros produtores cadastrados no mesmo município que também plantam a mesma cultura. Assim, toda a vizinhança ganha tempo para inspecionar as lavouras e aplicar o manejo correto.",
    },
    {
        id: "culturas-atendidas",
        numero: "09",
        categoria: "Sobre o Argos",
        pergunta: "Quais lavouras o Argos já acompanha atualmente?",
        resposta:
            "Hoje o foco principal do Argos é o milho e o feijão, duas das culturas mais importantes para a agricultura familiar brasileira.\n\nNosso guia visual mostra a comparação da planta sadia com a planta sofrendo por seca, excesso d'água ou praga. No nosso plano de expansão, novas culturas como mandioca, hortaliças e frutíferas serão integradas.",
    },
    {
        id: "como-comecar-agora",
        numero: "10",
        categoria: "Custos & Acesso",
        pergunta: "Como posso começar a usar o Argos na minha propriedade agora?",
        resposta:
            "Basta tocar no botão 'Começar' no topo desta página.\n\nVocê responde a 10 perguntas fáceis sobre o seu município, o que você planta e a área aproximada. Não pedimos documentos complicados nem dados de banco. Em instantes o Argos monta o perfil da sua roça e você passa a receber os alertas.",
    },
];

const categorias = [
    "Todas",
    "Sobre o Argos",
    "Custos & Acesso",
    "Celular & Conexão",
    "Uso no Campo",
    "Previsões & Dados",
];

export default function Faq() {
    const [busca, setBusca] = useState("");
    const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");

    const itensFiltrados = useMemo(() => {
        const termo = busca.trim().toLowerCase();
        return faqData.filter((item) => {
            const matchCategoria =
                categoriaAtiva === "Todas" || item.categoria === categoriaAtiva;
            const matchBusca =
                !termo ||
                item.pergunta.toLowerCase().includes(termo) ||
                item.resposta.toLowerCase().includes(termo) ||
                item.categoria.toLowerCase().includes(termo);
            return matchCategoria && matchBusca;
        });
    }, [busca, categoriaAtiva]);

    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege">
            <ScrollReveal />

            {/* HERO */}
            <section
                id="inicio"
                className="relative overflow-x-clip overflow-y-visible bg-[radial-gradient(720px_440px_at_80%_35%,rgba(125,190,140,.18),transparent_70%),radial-gradient(540px_340px_at_10%_0%,rgba(217,166,80,.12),transparent_70%),#17110D]"
            >
                {/* Linhas de relevo como background sutil */}
                <svg
                    aria-hidden="true"
                    viewBox="0 0 1440 400"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
                >
                    <g
                        fill="none"
                        stroke="#3A2F27"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    >
                        <path d="M-20 280 C 260 210 520 340 800 260 S 1250 210 1460 270" />
                        <path d="M-20 320 C 260 250 520 380 800 300 S 1250 250 1460 310" />
                        <path d="M-20 360 C 260 290 520 420 800 340 S 1250 290 1460 350" />
                    </g>
                </svg>

                <Navbar />

                <div
                    data-reveal
                    className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-7 pt-14 pb-20 sm:pb-24"
                >
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-S uppercase tracking-wider text-salvia">Dúvidas Frequentes</span>
                    </div>

                    <h1 className="font-titulo text-[clamp(38px,5.8vw,76px)] font-extrabold uppercase leading-[1.05] text-bege">
                        Perguntas sobre <br />
                        <span className="text-salvia">o seu copiloto.</span>
                    </h1>

                    <p className="max-w-[640px] text-[clamp(18px,1.9vw,22px)] text-texto-2">
                        Tire suas dúvidas sobre o funcionamento do Argos na roça,
                        acessibilidade, conectividade e como ele protege sua colheita.
                    </p>

                    {/* cards de destaque */}
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-[880px]">
                        <div className="rounded-xl border border-linha bg-card/60 p-4 backdrop-blur-xs">
                            <div className="flex items-center gap-2.5 text-salvia">
                                <IconeFA nome="circle-check" className="size-5" />
                                <span className="font-titulo text-sm font-bold uppercase tracking-wider">
                                    100% Gratuito
                                </span>
                            </div>
                            <p className="mt-1.5 text-sm text-texto-2">
                                Sem mensalidade para o produtor rural familiar.
                            </p>
                        </div>

                        <div className="rounded-xl border border-linha bg-card/60 p-4 backdrop-blur-xs">
                            <div className="flex items-center gap-2.5 text-ambar">
                                <IconeFA nome="cloud" className="size-5" />
                                <span className="font-titulo text-sm font-bold uppercase tracking-wider">
                                    Guarda Offline
                                </span>
                            </div>
                            <p className="mt-1.5 text-sm text-texto-2">
                                Os últimos alertas ficam salvos no seu aparelho.
                            </p>
                        </div>

                        <div className="rounded-xl border border-linha bg-card/60 p-4 backdrop-blur-xs">
                            <div className="flex items-center gap-2.5 text-salvia">
                                <IconeFA nome="circle-check" className="size-5" />
                                <span className="font-titulo text-sm font-bold uppercase tracking-wider">
                                    Voz e Figuras
                                </span>
                            </div>
                            <p className="mt-1.5 text-sm text-texto-2">
                                Fácil para quem lê pouco ou prefere ouvir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* secao faq*/}
            <section className="relative overflow-hidden bg-card py-16 sm:py-20">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-terra opacity-10 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-salvia opacity-10 blur-3xl"
                />

                <div className="relative mx-auto w-full max-w-[1100px] px-6 sm:px-8">
                    {/* busca e filtros */}
                    <div data-reveal className="mb-10 flex flex-col gap-6">
                        {/* input de busca */}
                        <div className="relative w-full">
                            <label htmlFor="busca-faq" className="sr-only">
                                Buscar pergunta ou palavra-chave
                            </label>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-texto-2">
                                <IconeFA nome="magnifying-glass" className="size-[22px]" />
                            </div>
                            <input
                                id="busca-faq"
                                type="search"
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                placeholder="Busque por dúvida, ex.: internet, senha, custo, pragas..."
                                className="w-full min-h-[56px] rounded-2xl border border-linha bg-fundo/90 py-3.5 pr-4 pl-12 text-base text-bege placeholder:text-texto-2/70 transition-all focus:border-salvia focus:bg-fundo focus:outline-none focus:ring-2 focus:ring-salvia/40"
                            />
                            {busca && (
                                <button
                                    type="button"
                                    onClick={() => setBusca("")}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-texto-2 hover:text-bege focus-visible:outline-none"
                                    aria-label="Limpar busca"
                                >
                                    <IconeFA nome="xmark" className="size-[18px]" />
                                </button>
                            )}
                        </div>

                        {/* filtros de categoria*/}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-texto-2">
                                Filtrar por:
                            </span>
                            {categorias.map((cat) => {
                                const ativa = categoriaAtiva === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategoriaAtiva(cat)}
                                        className={`min-h-[40px] cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia ${
                                            ativa
                                                ? "bg-salvia text-fundo shadow-sm"
                                                : "border border-linha bg-fundo/50 text-texto-2 hover:border-salvia/50 hover:text-bege"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* lista de duvidas */}
                    {itensFiltrados.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {itensFiltrados.map((item) => (
                                <CardDuvida key={item.id} {...item} />
                            ))}
                        </div>
                    ) : (
                        <div
                            data-reveal
                            className="rounded-2xl border border-linha bg-fundo/70 p-10 text-center"
                        >
                            <IconeFA nome="circle-minus" className="mx-auto mb-3 size-11 text-texto-2" />
                            <h3 className="font-titulo text-xl font-bold text-bege">
                                Nenhuma dúvida encontrada
                            </h3>
                            <p className="mt-1.5 text-texto-2">
                                Não achamos nada para "{busca}". Tente outra
                                palavra ou limpe o filtro.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setBusca("");
                                    setCategoriaAtiva("Todas");
                                }}
                                className="mt-5 inline-flex min-h-[46px] items-center justify-center rounded-xl border border-salvia bg-transparent px-5 font-titulo text-sm font-semibold uppercase text-salvia transition-colors hover:bg-salvia hover:text-fundo"
                            >
                                Mostrar todas as dúvidas
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ainda tem duvidas */}
            <section className="relative overflow-hidden bg-terra-fundo py-16">
                <svg
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
                    aria-hidden="true"
                    viewBox="0 0 1440 280"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <pattern
                            id="faq-contato-pontos"
                            width="22"
                            height="22"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle cx="2" cy="2" r="1.25" fill="#3A2F27" />
                        </pattern>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#faq-contato-pontos)"
                    />
                </svg>

                <div className="relative mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-8 px-7">
                    <div data-reveal className="max-w-[620px]">
                        <span className="text-xs font-semibold uppercase tracking-[.14em] text-salvia">
                            Suporte & Parcerias
                        </span>
                        <h2 className="mt-2 font-titulo text-[clamp(28px,3.4vw,44px)] font-extrabold uppercase leading-tight text-bege">
                            Não encontrou a resposta que procurava?
                        </h2>
                        <p className="mt-3 text-lg text-texto-2">
                            Nossa equipe está à disposição para esclarecer
                            dúvidas de produtores, cooperativas e técnicos
                            agrícolas.
                        </p>
                    </div>

                    <div data-reveal className="flex flex-wrap gap-4">
                        <Link
                            to="/contato"
                            className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-salvia px-7 font-titulo text-base font-bold uppercase tracking-wider text-fundo transition-transform hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-salvia"
                        >
                            Falar com nossa equipe
                            <IconeFA nome="arrow-right" className="size-[18px]" />
                        </Link>

                        <Link
                            to="/triagem"
                            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-linha bg-transparent px-7 font-titulo text-base font-semibold uppercase tracking-wider text-bege transition-all hover:border-salvia hover:text-salvia focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar"
                        >
                            Começar a triagem agora
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
