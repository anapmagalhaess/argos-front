import { useState } from "react";
import { Link } from "react-router";
import BadgeAlerta from "../../components/BadgeAlerta/BadgeAlerta";
import type { NivelAlerta } from "../../components/BadgeAlerta/BadgeAlerta";
import { AvisoDeTela, Campo, ENTRADA } from "../../components/CampoForm/CampoForm";
import { useConta } from "../../contexto/conta";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { ESTAGIOS, rotuloDe } from "../../data/opcoes";
import { useBusca } from "../../hooks/useBusca";
import { listarAlertas, listarMunicipios, listarPlantios } from "../../services/api";
import { diasAte, formatarData } from "../../utils/datas";
import { capitalizar } from "../../utils/textos";

/*
    Hoje: os avisos que valem hoje no município e os plantios da roça cadastrada na triagem.
    Chama GET /municipios/{cd}/alertas e GET /propriedades/{id}/plantios.
    Os avisos não precisam de cadastro: quem ainda não fez a triagem escolhe o município aqui mesmo.
*/

// A API devolve a severidade como número; o componente de alerta só aceita 1 a 4
const comoNivel = (severidade: number) => Math.min(4, Math.max(1, severidade)) as NivelAlerta;

const BOTAO =
    "inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none";

export default function Hoje() {
    // A triagem deixa guardado quem é a pessoa; sem ela, a tela pede só o município
    const { conta: sessao } = useConta();
    const [municipioId, setMunicipioId] = useState<number | null>(sessao?.municipioId ?? null);

    const municipios = useBusca("municipios", (sinal) => listarMunicipios(sinal));
    const alertas = useBusca(`alertas-${municipioId}`, municipioId === null ? null : (sinal) => listarAlertas(municipioId, sinal));
    const propriedadeId = sessao?.propriedadeId ?? null;
    const plantios = useBusca(`plantios-${propriedadeId}`, propriedadeId === null ? null : (sinal) => listarPlantios(propriedadeId, sinal));

    const municipioAtual = municipios.dados?.find((m) => m.id === municipioId);
    const nomeDoMunicipio = municipioAtual ? `${municipioAtual.nome} (${municipioAtual.uf})` : sessao?.municipioNome;

    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege">
            <section className="relative overflow-hidden bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <Navbar />
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-7 pt-14 pb-16">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Hoje</p>
                    <h1 className="font-titulo text-[clamp(40px,5.4vw,72px)] leading-none font-extrabold uppercase">
                        {sessao ? `Bom dia, ${sessao.produtorNome}.` : "O que vale hoje."}
                    </h1>
                    <p className="max-w-[620px] text-[clamp(19px,2vw,22px)] text-texto-2">
                        Os avisos do seu município e o que está plantado na sua roça, num lugar só.
                    </p>
                </div>
            </section>

            {/* Avisos do município */}
            <section className="border-t border-linha bg-card py-16">
                <div className="mx-auto w-full max-w-[1000px] px-7">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Avisos</p>
                    <h2 className="mt-2 font-titulo text-[clamp(28px,3.6vw,44px)] leading-tight font-extrabold uppercase">
                        {nomeDoMunicipio ? `Em ${nomeDoMunicipio}` : "Escolha o município"}
                    </h2>

                    <div className="mt-7 max-w-[460px]">
                        <Campo rotulo={sessao ? "Ver os avisos de outro município" : "Seu município"}>
                            {(a) => (
                                <select
                                    {...a}
                                    className={ENTRADA}
                                    value={municipioId ?? ""}
                                    onChange={(e) => setMunicipioId(e.target.value ? Number(e.target.value) : null)}
                                >
                                    <option value="">Escolha…</option>
                                    {municipios.dados?.map((m) => (
                                        <option key={m.id} value={m.id}>{m.nome} ({m.uf})</option>
                                    ))}
                                </select>
                            )}
                        </Campo>
                    </div>

                    <div className="mt-8 flex flex-col gap-4" aria-live="polite">
                        {municipios.erro && !alertas.erro && (
                            <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: municipios.tentarDeNovo }}>
                                {municipios.erro.message}
                            </AvisoDeTela>
                        )}
                        {municipioId === null && !municipios.erro && (
                            <p className="text-texto-2">Escolha o município para ver os avisos.</p>
                        )}
                        {alertas.carregando && (
                            <AvisoDeTela tipo="carregando">
                                Buscando os avisos…
                                {alertas.demorando && " O servidor estava dormindo e está acordando, pode levar alguns segundos."}
                            </AvisoDeTela>
                        )}
                        {alertas.erro && (
                            <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: alertas.tentarDeNovo }}>
                                {alertas.erro.message}
                            </AvisoDeTela>
                        )}
                        {alertas.dados?.length === 0 && (
                            <p className="rounded-2xl border-2 border-linha px-5 py-4 text-texto-2">
                                Nenhum aviso valendo agora para este município. Isso não é garantia de tempo bom: confira
                                também os avisos oficiais da Defesa Civil.
                            </p>
                        )}
                        {alertas.dados?.map((alerta) => (
                            <article key={alerta.id} className="flex flex-col gap-3">
                                <BadgeAlerta nivel={comoNivel(alerta.severidade)} titulo={alerta.titulo} mostrarNumero />
                                <p className="px-1">{alerta.mensagem}</p>
                                <p className="px-1 text-[15px] text-texto-2">
                                    Fonte: {alerta.fonte} · vale até {formatarData(alerta.dataFim)}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plantios da roça */}
            <section className="border-t border-linha bg-fundo py-16">
                <div className="mx-auto w-full max-w-[1000px] px-7">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Sua roça</p>
                    <h2 className="mt-2 font-titulo text-[clamp(28px,3.6vw,44px)] leading-tight font-extrabold uppercase">
                        {sessao?.propriedadeNome ?? "O que está plantado"}
                    </h2>

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
                                            <p className="font-titulo text-2xl font-extrabold uppercase">{capitalizar(plantio.culturaNome)}</p>
                                            <p className="text-salvia">{rotuloDe(ESTAGIOS, plantio.estagio)}</p>
                                            <p className="text-texto-2">{plantio.areaHa} ha · plantado em {formatarData(plantio.dataPlantio)}</p>
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
                            {plantios.dados && plantios.dados.length > 0 && (
                                <div className="mt-3">
                                    <Link to="/ocorrencias" className={BOTAO}>Vi uma praga</Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
