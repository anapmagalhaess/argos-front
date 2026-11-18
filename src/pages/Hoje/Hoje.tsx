import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Link } from "react-router";
import BadgeAlerta from "../../components/BadgeAlerta/BadgeAlerta";
import CardRiscoQuebra from "../../components/CardRiscoQuebra/CardRiscoQuebra";
import { AvisoDeTela } from "../../components/CampoForm/CampoForm";
import EstadoVazio from "../../components/EstadoVazio/EstadoVazio";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useConta } from "../../contexto/conta";
import { ESTAGIOS, rotuloDe } from "../../data/opcoes";
import { culturaPorId, rotuloDoMunicipio } from "../../data/referencias";
import { useBusca } from "../../hooks/useBusca";
import { buscarAlertasDoMunicipio } from "../../services/alertaService";
import { listarPlantios } from "../../services/api";
import { ROTULO_TIPO_ALERTA } from "../../types/alerta";
import type { Alerta } from "../../types/alerta";
import type { Plantio } from "../../types/plantio";
import type { EntradaPredicao } from "../../types/predicao";
import { diasAte, formatarData } from "../../utils/datas";

type Aba = "visao" | "plantios" | "avisos" | "previsoes" | "risco";

const ABAS: { id: Aba; rotulo: string; simbolo: string }[] = [
    { id: "visao", rotulo: "Visão geral", simbolo: "◉" },
    { id: "plantios", rotulo: "Plantios", simbolo: "⌂" },
    { id: "avisos", rotulo: "Avisos", simbolo: "!" },
    { id: "previsoes", rotulo: "Previsões", simbolo: "↗" },
    { id: "risco", rotulo: "Risco de quebra", simbolo: "◇" },
];

const ENTRADA_RISCO_ARACI_2023: EntradaPredicao = {
    chuva_total_mm: 482.2,
    temp_media: 25.67,
    temp_max_media: 31.42,
    dias_acima_35: 48,
    maior_seq_seca: 26,
    oni: 0.81,
    regiao_sul: 0,
    media_5a: 669.6,
};

// Níveis 1 a 4 (cor + número + palavra, nunca só cor)
const NIVEL: Record<number, { palavra: string; cor: string }> = {
    1: { palavra: "Baixo", cor: "text-[#7DBE8C]" },
    2: { palavra: "Atenção", cor: "text-[#F9D648]" },
    3: { palavra: "Alto", cor: "text-[#E8711A]" },
    4: { palavra: "Muito alto", cor: "text-[#E5524A]" },
};

const BOTAO =
    "inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none";

function saudacao(h: number): string {
    return h < 5 ? "Boa madrugada" : h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
}

function textoDias(d: number): string {
    return d < 0 ? "Data já passou" : d === 0 ? "É hoje" : `Em ${d} ${d === 1 ? "dia" : "dias"}`;
}

export default function Hoje() {
    const { conta: sessao } = useConta();
    const propriedadeId = sessao?.propriedadeId ?? null;
    const plantios = useBusca(
        `plantios-${propriedadeId}`,
        propriedadeId === null ? null : (sinal) => listarPlantios(propriedadeId, sinal),
    );
    const alertas = useBusca(
        `alertas-${sessao?.municipioId}`,
        sessao ? (sinal) => buscarAlertasDoMunicipio(sessao.municipioId, sinal) : null,
    );
    const [hora, setHora] = useState(() => new Date().getHours());
    const [aba, setAba] = useState<Aba>("visao");
    const [filtro, setFiltro] = useState<string>("TODOS");

    useEffect(() => {
        const t = window.setInterval(() => setHora(new Date().getHours()), 60_000);
        return () => window.clearInterval(t);
    }, []);

    const listaPlantios: Plantio[] = plantios.dados ?? [];
    const listaAlertas: Alerta[] = alertas.dados ?? [];

    // Números do painel, calculados dos dados que já vêm da API
    const resumo = useMemo(() => {
        const area = listaPlantios.reduce((s, p) => s + p.areaHa, 0);
        const proximas = listaPlantios.map((p) => diasAte(p.dataColheitaPrevista)).filter((d) => d >= 0);
        const nivelMax = listaAlertas.reduce((m, a) => Math.max(m, a.severidade), 0);
        return { area, proxima: proximas.length ? Math.min(...proximas) : null, nivelMax };
    }, [listaPlantios, listaAlertas]);

    const tiposPresentes = useMemo(() => Array.from(new Set(listaAlertas.map((a) => a.tipo))), [listaAlertas]);
    const alertasFiltrados = filtro === "TODOS" ? listaAlertas : listaAlertas.filter((a) => a.tipo === filtro);

    function moverAba(e: KeyboardEvent<HTMLButtonElement>) {
        const i = ABAS.findIndex((a) => a.id === aba);
        let n = i;
        if (e.key === "ArrowRight") n = (i + 1) % ABAS.length;
        else if (e.key === "ArrowLeft") n = (i - 1 + ABAS.length) % ABAS.length;
        else if (e.key === "Home") n = 0;
        else if (e.key === "End") n = ABAS.length - 1;
        else return;
        e.preventDefault();
        setAba(ABAS[n].id);
        document.getElementById(`aba-hoje-${ABAS[n].id}`)?.focus();
    }

    const carregando = plantios.carregando || alertas.carregando;

    return (
        <main className="flex min-h-screen min-h-svh w-full flex-col overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege [background:radial-gradient(700px_480px_at_100%_60%,rgba(125,190,140,.06),transparent_70%),linear-gradient(180deg,var(--color-card)_0%,var(--color-fundo)_38%,var(--color-fundo)_100%)]">
            <section className="relative overflow-visible bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-36 size-[440px] rounded-full border border-salvia/10 shadow-[0_0_0_22px_rgba(125,190,140,.025),0_0_0_54px_rgba(125,190,140,.018)]" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[10%] top-24 size-44 rounded-full bg-salvia/10 blur-[70px]" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[20%] top-24 hidden size-2 rounded-full bg-ambar shadow-[0_0_0_8px_rgba(217,166,80,.08),0_0_24px_rgba(217,166,80,.55)] md:block" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[34%] top-48 hidden size-1.5 rounded-full bg-salvia shadow-[0_0_0_7px_rgba(125,190,140,.08)] md:block" />
                <Navbar />
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-7 pt-14 pb-16">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Hoje · Painel da roça</p>
                    <h1 className="font-titulo text-[clamp(40px,5.4vw,72px)] leading-none font-extrabold uppercase">
                        {sessao ? (
                            <>
                                {saudacao(hora)},
                                <br />
                                <span className="text-salvia">{sessao.produtorNome}.</span>
                            </>
                        ) : "Sua roça, hoje."}
                    </h1>
                    <p className="max-w-[620px] text-[clamp(19px,2vw,22px)] text-texto-2">
                        A sua roça e o que está plantado nela, num lugar só.
                    </p>
                </div>
            </section>

            <section className="relative isolate flex-1 overflow-hidden border-t border-linha bg-[radial-gradient(ellipse_at_50%_0%,rgba(125,190,140,.035),transparent_58%)] py-12 md:py-16">
                <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 z-0 hidden size-72 rounded-full bg-ambar/[.045] blur-3xl xl:block" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 z-0 hidden size-80 rounded-full bg-salvia/[.05] blur-3xl xl:block" />
                <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-7">
                    {!sessao ? (
                        <div className="mx-auto max-w-[760px] rounded-3xl border border-linha bg-card/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,.24)] sm:p-10">
                            <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Seu painel começa aqui</p>
                            <h2 className="mt-2 font-titulo text-[clamp(28px,3.6vw,42px)] font-extrabold uppercase leading-tight">Entre para ver a sua roça.</h2>
                            <p className="mt-4 text-texto-2">Entre ou faça o cadastro para consultar seus plantios e os avisos do seu município.</p>
                            <div className="mt-7 flex flex-wrap gap-3.5">
                                <Link to="/entrar" state={{ de: "/hoje" }} className={BOTAO}>Entrar</Link>
                                <Link to="/triagem" className="inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-linha px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-bege transition hover:border-bege focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar">Fazer cadastro</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-3xl border border-linha bg-card shadow-[0_24px_80px_rgba(0,0,0,.3)]">
                            {/* Barra do painel: marca + abas (padrão de dashboard) */}
                            <div className="flex flex-col gap-4 border-b border-linha bg-fundo/60 px-4 py-4 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-center gap-3">
                                    <span aria-hidden="true" className="size-3 rounded-full bg-salvia shadow-[0_0_0_5px_rgba(125,190,140,.15)]" />
                                    <div>
                                        <p className="font-titulo text-xl font-bold leading-tight">{sessao.propriedadeNome ?? "Sua propriedade"}</p>
                                        <p className="text-sm text-texto-2">{rotuloDoMunicipio(sessao.municipioId)}</p>
                                    </div>
                                </div>
                                <div role="tablist" aria-label="Painel da sua roça" className="flex gap-2 overflow-x-auto">
                                    {ABAS.map((a) => {
                                        const on = aba === a.id;
                                        return (
                                            <button
                                                key={a.id}
                                                id={`aba-hoje-${a.id}`}
                                                type="button"
                                                role="tab"
                                                aria-selected={on}
                                                aria-controls={`painel-hoje-${a.id}`}
                                                tabIndex={on ? 0 : -1}
                                                onClick={() => setAba(a.id)}
                                                onKeyDown={moverAba}
                                                className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl border px-4 font-titulo text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia ${on ? "border-salvia bg-salvia text-fundo" : "border-linha text-texto-2 hover:border-texto-2 hover:text-bege"}`}
                                            >
                                                <span aria-hidden="true">{a.simbolo}</span>
                                                {a.rotulo}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div id={`painel-hoje-${aba}`} role="tabpanel" aria-labelledby={`aba-hoje-${aba}`} tabIndex={0}
                                className="min-h-[340px] p-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-salvia sm:p-7">
                                {aba === "visao" && (
                                    <div>
                                        <Titulo etiqueta="Última atualização: agora" titulo="Visão geral" />
                                        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                                            <Kpi rotulo="Risco atual" valor={carregando ? "…" : resumo.nivelMax ? NIVEL[resumo.nivelMax].palavra : "Sem avisos"}
                                                cor={resumo.nivelMax ? NIVEL[resumo.nivelMax].cor : "text-salvia"}
                                                legenda={resumo.nivelMax ? `Nível ${resumo.nivelMax} de 4` : "Nenhum aviso ativo"} />
                                            <Kpi rotulo="Avisos ativos" valor={alertas.carregando ? "…" : listaAlertas.length} cor="text-ambar" legenda="No seu município" />
                                            <Kpi rotulo="Plantios" valor={plantios.carregando ? "…" : listaPlantios.length} cor="text-salvia" legenda="Cadastrados na roça" />
                                            <Kpi rotulo="Área plantada" valor={plantios.carregando ? "…" : `${resumo.area.toLocaleString("pt-BR")} ha`} cor="text-bege" legenda="Soma dos plantios" />
                                            <Kpi rotulo="Próxima colheita" valor={plantios.carregando ? "…" : resumo.proxima === null ? "—" : resumo.proxima === 0 ? "Hoje" : `${resumo.proxima} d`}
                                                cor="text-salvia" legenda={resumo.proxima === null ? "Sem colheita marcada" : "Dias até colher"} />
                                            <Kpi rotulo="Município" valor={sessao.municipioId ? rotuloDoMunicipio(sessao.municipioId) : "—"} cor="text-bege" legenda="Onde os avisos valem" pequeno />
                                        </div>
                                        {(plantios.erro || alertas.erro) && (
                                            <div className="mt-5 space-y-3">
                                                {plantios.erro && <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: plantios.tentarDeNovo }}>{plantios.erro.message}</AvisoDeTela>}
                                                {alertas.erro && <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: alertas.tentarDeNovo }}>{alertas.erro.message}</AvisoDeTela>}
                                            </div>
                                        )}
                                        {listaAlertas[0] && (
                                            <article className="mt-6 rounded-2xl border border-linha bg-fundo/70 p-5">
                                                <p className="text-sm font-semibold text-texto-2">Aviso mais recente</p>
                                                <h3 className="mt-1 font-titulo text-xl font-bold">{listaAlertas[0].titulo}</h3>
                                                <p className="mt-1 text-base text-texto-2">{listaAlertas[0].mensagem}</p>
                                                <button type="button" onClick={() => setAba("avisos")} className="mt-3 min-h-12 text-sm font-semibold text-salvia underline underline-offset-4 hover:text-bege">Ver todos os avisos</button>
                                            </article>
                                        )}
                                        <div className="mt-6 flex flex-wrap items-center gap-4">
                                            <Link to="/guia/milho" className="text-sm font-semibold text-salvia underline underline-offset-4 hover:text-bege">Abrir guia visual →</Link>
                                        </div>
                                    </div>
                                )}

                                {aba === "plantios" && (
                                    <div>
                                        <Titulo etiqueta="Acompanhamento" titulo="O que está plantado" />
                                        {plantios.carregando && <AvisoDeTela tipo="carregando">Buscando os seus plantios…</AvisoDeTela>}
                                        {plantios.erro && <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: plantios.tentarDeNovo }}>{plantios.erro.message}</AvisoDeTela>}
                                        {plantios.dados?.length === 0 && <EstadoVazio mensagem="Ainda não há plantios cadastrados nesta roça." />}
                                        {listaPlantios.length > 0 && (
                                            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
                                                {listaPlantios.map((p) => {
                                                    const dias = diasAte(p.dataColheitaPrevista);
                                                    return (
                                                        <li key={p.id} className="rounded-2xl border border-linha bg-fundo/70 p-5 sm:p-6">
                                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                                <div>
                                                                    <p className="text-xs font-semibold text-texto-2">Cultura</p>
                                                                    <h3 className="mt-1 font-titulo text-2xl font-bold uppercase">{culturaPorId(p.culturaId)?.nome ?? "Cultura"}</h3>
                                                                </div>
                                                                <span className="rounded-full border border-salvia/30 bg-salvia/10 px-3 py-1 text-xs font-semibold text-salvia">{rotuloDe(ESTAGIOS, p.estagio)}</span>
                                                            </div>
                                                            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-dashed border-linha pt-4 text-sm">
                                                                <div><p className="text-texto-2">Área plantada</p><p className="mt-1 font-semibold">{p.areaHa.toLocaleString("pt-BR")} ha</p></div>
                                                                <div><p className="text-texto-2">Plantado em</p><p className="mt-1 font-semibold">{formatarData(p.dataPlantio)}</p></div>
                                                            </div>
                                                            <p className="mt-4 rounded-xl border border-linha/70 bg-card px-4 py-3 text-sm">
                                                                {dias < 0 ? `Colheita prevista para ${formatarData(p.dataColheitaPrevista)} (data já passou).` : dias === 0 ? "Colheita prevista para hoje." : `Colheita em ${formatarData(p.dataColheitaPrevista)} · faltam ${dias} ${dias === 1 ? "dia" : "dias"}.`}
                                                            </p>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                )}

                                {aba === "avisos" && (
                                    <div>
                                        <Titulo etiqueta="Clima e lavoura" titulo="Avisos do seu município" />
                                        {alertas.carregando && <AvisoDeTela tipo="carregando">Buscando avisos para {rotuloDoMunicipio(sessao.municipioId)}…</AvisoDeTela>}
                                        {alertas.erro && <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: alertas.tentarDeNovo }}>{alertas.erro.message}</AvisoDeTela>}
                                        {alertas.dados?.length === 0 && <EstadoVazio mensagem="Não há avisos ativos para o seu município agora." />}
                                        {listaAlertas.length > 0 && (
                                            <>
                                                <div role="group" aria-label="Filtrar por tipo de aviso" className="mb-6 flex flex-wrap gap-2">
                                                    {["TODOS", ...tiposPresentes].map((t) => (
                                                        <button key={t} type="button" aria-pressed={filtro === t} onClick={() => setFiltro(t)}
                                                            className={`min-h-12 rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia ${filtro === t ? "border-salvia bg-salvia text-fundo" : "border-linha text-texto-2 hover:text-bege"}`}>
                                                            {t === "TODOS" ? "Todos" : ROTULO_TIPO_ALERTA[t as Alerta["tipo"]]}
                                                        </button>
                                                    ))}
                                                </div>
                                                <ol className="relative space-y-4 border-l border-linha pl-6">
                                                    {alertasFiltrados.map((a) => (
                                                        <li key={a.id} className="relative rounded-2xl border border-linha bg-fundo/70 p-5 sm:p-6">
                                                            <span aria-hidden="true" className="absolute -left-[31px] top-7 size-3 rounded-full bg-ambar ring-4 ring-card" />
                                                            <p className="text-sm font-semibold text-texto-2">{formatarData(a.dataInicio)} a {formatarData(a.dataFim)}</p>
                                                            <div className="mt-2">
                                                                <BadgeAlerta nivel={a.severidade} titulo={ROTULO_TIPO_ALERTA[a.tipo]} mostrarNumero tamanho="compacto" className="inline-flex max-w-full" />
                                                            </div>
                                                            <h3 className="mt-3 font-titulo text-xl font-bold">{a.titulo}</h3>
                                                            <p className="mt-1 text-base text-texto-2">{a.mensagem}</p>
                                                            <p className="mt-4 border-t border-dashed border-linha pt-3 text-xs text-texto-2"><strong className="text-bege">Fonte:</strong> {a.fonte}</p>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </>
                                        )}
                                    </div>
                                )}

                                {aba === "previsoes" && (
                                    <div>
                                        <Titulo etiqueta="Calendário da safra" titulo="Previsões de colheita" className="mb-4" />
                                        <p className="mb-16 max-w-[720px] text-sm text-texto-2">Datas estimadas conforme o cadastro de cada plantio.</p>
                                        {plantios.carregando && <AvisoDeTela tipo="carregando">Buscando as datas dos seus plantios…</AvisoDeTela>}
                                        {plantios.erro && <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: plantios.tentarDeNovo }}>{plantios.erro.message}</AvisoDeTela>}
                                        {plantios.dados?.length === 0 && <EstadoVazio mensagem="Cadastre um plantio para acompanhar a data prevista de colheita." />}
                                        {listaPlantios.length > 0 && (
                                            <div className="flex flex-col gap-3">
                                                {[...listaPlantios].sort((x, y) => x.dataColheitaPrevista.localeCompare(y.dataColheitaPrevista)).map((p) => {
                                                    const dias = diasAte(p.dataColheitaPrevista);
                                                    const total = Math.max(1, dias - diasAte(p.dataPlantio));
                                                    const pct = Math.min(100, Math.max(0, Math.round((-diasAte(p.dataPlantio) / total) * 100)));
                                                    return (
                                                        <article key={p.id} className="rounded-2xl border border-linha bg-fundo/70 p-5 sm:p-6">
                                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                                <div>
                                                                    <p className="font-titulo text-lg font-bold">{culturaPorId(p.culturaId)?.nome ?? "Cultura"}</p>
                                                                    <p className="mt-1 text-sm text-texto-2">{rotuloDe(ESTAGIOS, p.estagio)} · {p.areaHa.toLocaleString("pt-BR")} ha</p>
                                                                </div>
                                                                <div className="sm:text-right">
                                                                    <p className="text-xs font-semibold text-texto-2">Colheita prevista</p>
                                                                    <p className="font-titulo text-xl font-bold text-salvia">{formatarData(p.dataColheitaPrevista)}</p>
                                                                    <p className="text-sm text-texto-2">{textoDias(dias)}</p>
                                                                </div>
                                                            </div>
                                                            <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Andamento do ciclo" className="mt-4 h-2.5 overflow-hidden rounded-full bg-linha">
                                                                <div className="h-full rounded-full bg-salvia" style={{ width: `${pct}%` }} />
                                                            </div>
                                                            <p className="mt-1 text-xs text-texto-2">{pct}% do ciclo</p>
                                                        </article>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        <p className="mt-6 rounded-xl border border-ambar/20 bg-ambar/[.06] px-4 py-3 text-sm text-texto-2">
                                            A estimativa de risco e produtividade por inteligência artificial é opcional no MVP e depende da API de demonstração. Esta aba mostra as datas de colheita cadastradas.
                                        </p>
                                    </div>
                                )}

                                {aba === "risco" && (
                                    <CardRiscoQuebra
                                        entrada={ENTRADA_RISCO_ARACI_2023}
                                        legenda="Clima de 2023 em Araci (BA)"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </main>
    );
}

function Titulo({ etiqueta, titulo, className = "" }: { etiqueta: string; titulo: string; className?: string }) {
    return (
        <div className={className || "mb-16"}>
            <p className="text-sm font-semibold text-salvia">{etiqueta}</p>
            <h2 className="mt-1 font-titulo text-2xl font-bold uppercase sm:text-3xl">{titulo}</h2>
        </div>
    );
}

function Kpi({ rotulo, valor, legenda, cor, pequeno = false }: { rotulo: string; valor: ReactNode; legenda: string; cor: string; pequeno?: boolean }) {
    return (
        <div className="rounded-2xl border border-linha bg-fundo/70 p-4 sm:p-5">
            <p className="text-sm font-semibold text-texto-2">{rotulo}</p>
            <p className={`mt-2 font-titulo font-extrabold uppercase leading-tight ${pequeno ? "text-xl" : "text-3xl"} ${cor}`}>{valor}</p>
            <p className="mt-1 text-xs text-texto-2">{legenda}</p>
        </div>
    );
}
