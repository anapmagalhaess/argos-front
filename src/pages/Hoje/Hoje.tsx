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
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege">
            <section className="relative overflow-hidden bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
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
            <section className="border-t border-linha bg-fundo py-16">
                <div className="mx-auto w-full max-w-[1000px] px-7">
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
