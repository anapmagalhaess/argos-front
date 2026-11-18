import { Link } from "react-router";
import { AvisoDeTela } from "../../components/CampoForm/CampoForm";
import { useConta } from "../../contexto/conta";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { culturaPorId, rotuloDoMunicipio } from "../../data/referencias";
import { ESTAGIOS, rotuloDe } from "../../data/opcoes";
import { useBusca } from "../../hooks/useBusca";
import { listarPlantios } from "../../services/api";
import { diasAte, formatarData } from "../../utils/datas";

/*
    Hoje: a roça cadastrada na triagem e o que está plantado nela.
    Chama GET /propriedades/{id}/plantios. Quem ainda não tem conta é levado a entrar ou a se cadastrar.
*/

const BOTAO =
    "inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none";

export default function Hoje() {
    // A triagem deixa guardado quem é a pessoa e qual é a roça dela
    const { conta: sessao } = useConta();
    const propriedadeId = sessao?.propriedadeId ?? null;
    const plantios = useBusca(`plantios-${propriedadeId}`, propriedadeId === null ? null : (sinal) => listarPlantios(propriedadeId, sinal));

    return (
        <main className="flex min-h-screen min-h-svh w-full flex-col overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege [background:radial-gradient(700px_480px_at_100%_60%,rgba(125,190,140,.06),transparent_70%),linear-gradient(180deg,var(--color-card)_0%,var(--color-fundo)_38%,var(--color-fundo)_100%)]">
            <section className="relative overflow-visible bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-36 size-[440px] rounded-full border border-salvia/10 shadow-[0_0_0_22px_rgba(125,190,140,.025),0_0_0_54px_rgba(125,190,140,.018)]" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[10%] top-24 size-44 rounded-full bg-salvia/10 blur-[70px]" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[20%] top-24 hidden size-2 rounded-full bg-ambar shadow-[0_0_0_8px_rgba(217,166,80,.08),0_0_24px_rgba(217,166,80,.55)] md:block" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[34%] top-48 hidden size-1.5 rounded-full bg-salvia shadow-[0_0_0_7px_rgba(125,190,140,.08)] md:block" />
                <Navbar />
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-7 pt-14 pb-16">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Hoje</p>
                    <h1 className="font-titulo text-[clamp(40px,5.4vw,72px)] leading-none font-extrabold uppercase">
                        {sessao ? `Bom dia, ${sessao.produtorNome}.` : "Sua roça, hoje."}
                    </h1>
                    <p className="max-w-[620px] text-[clamp(19px,2vw,22px)] text-texto-2">
                        A sua roça e o que está plantado nela, num lugar só.
                    </p>
                </div>
            </section>

            {/* Plantios da roça */}
            <section className="relative isolate flex-1 overflow-hidden border-t border-linha bg-[radial-gradient(ellipse_at_50%_0%,rgba(125,190,140,.035),transparent_58%)] py-16">
                <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 z-0 hidden size-72 rounded-full bg-ambar/[.045] blur-3xl xl:block" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 z-0 hidden size-80 rounded-full bg-salvia/[.05] blur-3xl xl:block" />
                <div className="relative z-10 mx-auto w-full max-w-[1000px] px-7">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Sua roça</p>
                    <h2 className="mt-2 font-titulo text-[clamp(28px,3.6vw,44px)] leading-tight font-extrabold uppercase">
                        {sessao?.propriedadeNome ?? "O que está plantado"}
                    </h2>
                    {sessao && <p className="mt-2 text-texto-2">{rotuloDoMunicipio(sessao.municipioId)}</p>}

                    {propriedadeId === null ? (
                        sessao ? (
                            <p className="mt-7 max-w-[560px] text-texto-2">
                                A sua conta ainda não tem uma roça cadastrada. Quando tiver, os plantios aparecem aqui.
                            </p>
                        ) : (
                            <div className="mt-7 flex flex-col items-start gap-5">
                                <p className="max-w-[560px] text-texto-2">
                                    Entre ou faça o cadastro para o Argos mostrar a sua roça e acompanhar o que você plantou.
                                </p>
                                <div className="flex flex-wrap gap-3.5">
                                    <Link to="/entrar" state={{ de: "/hoje" }} className={BOTAO}>Entrar</Link>
                                    <Link to="/cadastro" className={BOTAO}>Fazer o cadastro</Link>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="mt-8 flex flex-col gap-4" aria-live="polite">
                            {plantios.carregando && <AvisoDeTela tipo="carregando">Buscando os seus plantios…</AvisoDeTela>}
                            {plantios.erro && (
                                <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: plantios.tentarDeNovo }}>
                                    {plantios.erro.message}
                                </AvisoDeTela>
                            )}
                            {plantios.dados?.length === 0 && (
                                <p className="rounded-2xl border-2 border-linha px-5 py-4 text-texto-2">
                                    Nenhum plantio cadastrado nesta roça ainda.
                                </p>
                            )}
                            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
                                {plantios.dados?.map((plantio) => {
                                    const dias = diasAte(plantio.dataColheitaPrevista);
                                    return (
                                        <li key={plantio.id} className="flex flex-col gap-3 rounded-3xl border border-linha bg-card p-6">
                                            <p className="font-titulo text-2xl font-extrabold uppercase">{culturaPorId(plantio.culturaId)?.nome ?? "Cultura"}</p>
                                            <p className="text-salvia">{rotuloDe(ESTAGIOS, plantio.estagio)}</p>
                                            <p className="text-texto-2">{plantio.areaHa.toLocaleString("pt-BR")} ha · plantado em {formatarData(plantio.dataPlantio)}</p>
                                            <p>
                                                {dias < 0
                                                    ? `A colheita estava prevista para ${formatarData(plantio.dataColheitaPrevista)}.`
                                                    : dias === 0
                                                      ? "A colheita está prevista para hoje."
                                                      : `Faltam ${dias} ${dias === 1 ? "dia" : "dias"} para a colheita (${formatarData(plantio.dataColheitaPrevista)}).`}
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
