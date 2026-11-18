import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";
import { AvisoDeTela, Campo, ENTRADA, Escolha } from "../../components/CampoForm/CampoForm";
import { useConta } from "../../contexto/conta";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { INTENSIDADES, rotuloDe } from "../../data/opcoes";
import { useBusca } from "../../hooks/useBusca";
import { ApiError, cadastrarOcorrencia, listarOcorrencias, listarPlantios, listarPragas } from "../../services/api";
import { diasAte, formatarData, hojeEmTexto } from "../../utils/datas";
import { capitalizar } from "../../utils/textos";

/*
    Ocorrências: relato de praga ("vi essa praga aqui"). A pessoa escolhe um plantio da roça dela
    e conta o que viu. Chama GET /pragas, GET /plantios/{id}/ocorrencias e POST /plantios/{id}/ocorrencias.
    A API só aceita relato em plantio ativo (a regra RN06); a tela já avisa antes de tentar.
*/

const BOTAO =
    "inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";

export default function Ocorrencias() {
    const { conta: sessao } = useConta();
    const propriedadeId = sessao?.propriedadeId ?? null;

    const plantios = useBusca(`plantios-${propriedadeId}`, propriedadeId === null ? null : (sinal) => listarPlantios(propriedadeId, sinal));
    const pragas = useBusca("pragas", (sinal) => listarPragas(sinal));

    // Se a pessoa não escolheu, vale o primeiro plantio da roça
    const [plantioEscolhido, setPlantioEscolhido] = useState<number | null>(null);
    const plantioId = plantioEscolhido ?? plantios.dados?.[0]?.id ?? null;
    const plantio = plantios.dados?.find((p) => p.id === plantioId);
    const colhido = plantio ? diasAte(plantio.dataColheitaPrevista) < 0 : false;

    const relatos = useBusca(`relatos-${plantioId}`, plantioId === null ? null : (sinal) => listarOcorrencias(plantioId, sinal));

    const [pragaId, setPragaId] = useState("");
    const [intensidade, setIntensidade] = useState("");
    const [observacao, setObservacao] = useState("");
    const [data, setData] = useState("");
    const [erros, setErros] = useState<Record<string, string>>({});
    const [erroGeral, setErroGeral] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [enviado, setEnviado] = useState(false);

    const pragaDoRelato = pragas.dados?.find((p) => String(p.id) === pragaId);

    async function enviar(evento: FormEvent) {
        evento.preventDefault();
        if (enviando || plantioId === null) return;
        setEnviado(false);
        setErroGeral("");

        const novos: Record<string, string> = {};
        if (!intensidade) novos.intensidade = "Diga o quanto da praga você viu.";
        if (observacao.length > 300) novos.observacao = "A observação pode ter no máximo 300 letras.";
        if (data && data > hojeEmTexto()) novos.dataOcorrencia = "A data do relato não pode ser no futuro.";
        setErros(novos);
        if (Object.keys(novos).length > 0) return;

        setEnviando(true);
        try {
            await cadastrarOcorrencia(plantioId, {
                pragaId: pragaId ? Number(pragaId) : undefined,
                dataOcorrencia: data || undefined,
                intensidade: Number(intensidade),
                observacao: observacao.trim() || undefined,
            });
            setPragaId("");
            setIntensidade("");
            setObservacao("");
            setData("");
            setEnviado(true);
            relatos.tentarDeNovo();
        } catch (erro) {
            if (erro instanceof ApiError && erro.campos.length > 0) {
                const porCampo: Record<string, string> = {};
                for (const { campo, mensagem } of erro.campos) porCampo[campo] = mensagem;
                setErros(porCampo);
            } else {
                setErroGeral(erro instanceof ApiError ? erro.message : "Algo deu errado. Tente de novo.");
            }
        } finally {
            setEnviando(false);
        }
    }

    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege">
            <section className="relative overflow-hidden bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <Navbar />
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-7 pt-14 pb-16">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Ocorrências</p>
                    <h1 className="font-titulo text-[clamp(40px,5.4vw,72px)] leading-none font-extrabold uppercase">Viu uma praga?</h1>
                    <p className="max-w-[620px] text-[clamp(19px,2vw,22px)] text-texto-2">
                        Conte o que viu na sua lavoura. Se não souber que bicho é, tudo bem: escolha "Não sei qual é".
                    </p>
                </div>
            </section>

            <section className="border-t border-linha bg-card py-16">
                <div className="mx-auto w-full max-w-[820px] px-7">
                    {propriedadeId === null ? (
                        sessao ? (
                            <p className="text-texto-2">A sua conta ainda não tem uma roça cadastrada, e o relato de praga é sempre sobre um plantio.</p>
                        ) : (
                            <div className="flex flex-col items-start gap-5">
                                <p className="text-texto-2">Para relatar uma praga, o Argos precisa saber qual é a sua roça. Entre ou faça o cadastro.</p>
                                <div className="flex flex-wrap gap-3.5">
                                    <Link to="/entrar" state={{ de: "/ocorrencias" }} className={BOTAO}>Entrar</Link>
                                    <Link to="/cadastro" className={BOTAO}>Fazer o cadastro</Link>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col gap-10">
                            {plantios.carregando && (
                                <AvisoDeTela tipo="carregando">
                                    Buscando os seus plantios…
                                    {plantios.demorando && " O servidor estava dormindo e está acordando, pode levar alguns segundos."}
                                </AvisoDeTela>
                            )}
                            {plantios.erro && (
                                <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: plantios.tentarDeNovo }}>
                                    {plantios.erro.message}
                                </AvisoDeTela>
                            )}
                            {plantios.dados?.length === 0 && (
                                <div className="flex flex-col items-start gap-5">
                                    <p className="text-texto-2">Sua roça ainda não tem nenhum plantio. Relato de praga é sempre sobre um plantio.</p>
                                    <Link to="/triagem" className={BOTAO}>Voltar à triagem</Link>
                                </div>
                            )}

                            {plantio && (
                                <form onSubmit={enviar} noValidate className="flex flex-col gap-6">
                                    <h2 className="font-titulo text-[clamp(26px,3.2vw,38px)] leading-tight font-extrabold uppercase">O que você viu?</h2>

                                    {plantios.dados && plantios.dados.length > 1 && (
                                        <Campo rotulo="Em qual plantio?">
                                            {(a) => (
                                                <select {...a} className={ENTRADA} value={plantioId ?? ""} onChange={(e) => { setPlantioEscolhido(Number(e.target.value)); setEnviado(false); }}>
                                                    {plantios.dados?.map((p) => (
                                                        <option key={p.id} value={p.id}>{capitalizar(p.culturaNome)}, plantado em {formatarData(p.dataPlantio)}</option>
                                                    ))}
                                                </select>
                                            )}
                                        </Campo>
                                    )}
                                    {plantios.dados?.length === 1 && (
                                        <p className="text-texto-2">Plantio: {capitalizar(plantio.culturaNome)}, plantado em {formatarData(plantio.dataPlantio)}.</p>
                                    )}

                                    {colhido && (
                                        <AvisoDeTela tipo="erro">
                                            Este plantio já passou da colheita. Só dá para relatar praga em plantio que ainda está na roça.
                                        </AvisoDeTela>
                                    )}

                                    <fieldset disabled={colhido} className="flex flex-col gap-6 disabled:opacity-50">
                                        <Campo rotulo="Que praga era?" erro={erros.pragaId}>
                                            {(a) => (
                                                <select {...a} className={ENTRADA} value={pragaId} onChange={(e) => setPragaId(e.target.value)}>
                                                    <option value="">Não sei qual é</option>
                                                    {pragas.dados?.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                                </select>
                                            )}
                                        </Campo>
                                        {pragaDoRelato && (
                                            <details className="rounded-2xl border border-linha bg-fundo p-5">
                                                <summary className="cursor-pointer font-semibold text-salvia">É essa? Veja os sinais e o que fazer</summary>
                                                <p className="mt-3"><strong>Como aparece:</strong> {pragaDoRelato.sintomas}</p>
                                                <p className="mt-3"><strong>O que fazer:</strong> {pragaDoRelato.manejo}</p>
                                                <p className="mt-3 text-[15px] text-texto-2">Fonte: {pragaDoRelato.fonte}</p>
                                            </details>
                                        )}
                                        <Escolha rotulo="O quanto você viu?" opcoes={INTENSIDADES} valor={intensidade} onChange={(v) => { setIntensidade(v); setErros((e) => ({ ...e, intensidade: "" })); }} erro={erros.intensidade} />
                                        <Campo rotulo="Quando viu?" dica="Se deixar em branco, vale hoje." erro={erros.dataOcorrencia}>
                                            {(a) => <input {...a} type="date" max={hojeEmTexto()} min={plantio.dataPlantio} className={ENTRADA} value={data} onChange={(e) => setData(e.target.value)} />}
                                        </Campo>
                                        <Campo rotulo="Quer contar mais?" dica="Pode deixar em branco." erro={erros.observacao}>
                                            {(a) => <textarea {...a} rows={3} maxLength={300} className={`${ENTRADA} py-3`} value={observacao} onChange={(e) => setObservacao(e.target.value)} />}
                                        </Campo>
                                    </fieldset>

                                    {erroGeral && <AvisoDeTela tipo="erro">{erroGeral}</AvisoDeTela>}
                                    {enviado && <p role="status" className="rounded-2xl border-2 border-salvia px-5 py-4 font-semibold text-salvia">Relato enviado. Obrigado por avisar!</p>}

                                    <div>
                                        <button type="submit" disabled={enviando || colhido} className={BOTAO}>
                                            {enviando ? "Enviando…" : "Enviar relato"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {plantio && (
                                <div className="flex flex-col gap-5 border-t border-linha pt-10" aria-live="polite">
                                    <h2 className="font-titulo text-[clamp(26px,3.2vw,38px)] leading-tight font-extrabold uppercase">Relatos deste plantio</h2>
                                    {relatos.carregando && <AvisoDeTela tipo="carregando">Buscando os relatos…</AvisoDeTela>}
                                    {relatos.erro && (
                                        <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: relatos.tentarDeNovo }}>
                                            {relatos.erro.message}
                                        </AvisoDeTela>
                                    )}
                                    {relatos.dados?.length === 0 && <p className="text-texto-2">Nenhum relato ainda. Que bom!</p>}
                                    <ul className="flex flex-col gap-4">
                                        {relatos.dados?.map((relato) => (
                                            <li key={relato.id} className="flex flex-col gap-1.5 rounded-2xl border border-linha bg-fundo p-5">
                                                <p className="font-titulo text-xl font-bold">{relato.pragaNome ?? "Praga não identificada"}</p>
                                                <p className="text-texto-2">
                                                    {formatarData(relato.dataOcorrencia)} · viu {rotuloDe(INTENSIDADES, String(relato.intensidade)).toLowerCase()}
                                                    {relato.confirmada ? " · confirmado por um técnico" : ""}
                                                </p>
                                                {relato.observacao && <p>{relato.observacao}</p>}
                                            </li>
                                        ))}
                                    </ul>
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
