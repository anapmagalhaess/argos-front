import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";
import { AvisoDeTela, Campo, ENTRADA } from "../../components/CampoForm/CampoForm";
import EstadoCarregando from "../../components/EstadoCarregando/EstadoCarregando";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useConta } from "../../contexto/conta";
import { CANAIS, FONTES_DE_AGUA, IRRIGACOES, LEITURA, rotuloDe } from "../../data/opcoes";
import { MUNICIPIOS } from "../../data/referencias";
import { useBusca } from "../../hooks/useBusca";
import { atualizarProdutor, atualizarPropriedade, buscarProdutor, listarPropriedadesDoProdutor } from "../../services/api";
import { formatarData, lerNumero } from "../../utils/datas";
import { esconderTelefone } from "../../utils/textos";

/*
    Conta: quem está neste aparelho, os dados do cadastro (buscados na API) e o que o aparelho
    guardou. Daqui a pessoa sai da conta ou manda o aparelho esquecê-la de vez.
*/

const BOTAO =
    "inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none";
const BOTAO_CLARO =
    "inline-flex min-h-14 cursor-pointer items-center justify-center rounded-[14px] border-2 border-linha px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-bege transition-transform duration-150 hover:scale-[1.035] hover:border-bege focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none";

export default function Conta() {
    const { conta, aparelho, sair, esquecerAparelho } = useConta();
    const [saindo, setSaindo] = useState(false);
    const [editando, setEditando] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [erroEdicao, setErroEdicao] = useState("");
    const [sucessoEdicao, setSucessoEdicao] = useState("");
    const [produtorEdit, setProdutorEdit] = useState({ nome: "", telefone: "", municipioId: "", canalPreferido: "", preferenciaLeitura: "", anosExperiencia: "", recebeAter: "" });
    const [propriedadeEdit, setPropriedadeEdit] = useState({ nome: "", areaHa: "", fonteAgua: "", irrigacao: "" });
    const produtor = useBusca(`produtor-${conta?.produtorId}`, conta ? (sinal) => buscarProdutor(conta.produtorId, sinal) : null);
    const propriedades = useBusca(`propriedades-conta-${conta?.produtorId}`, conta ? (sinal) => listarPropriedadesDoProdutor(conta.produtorId, sinal) : null);
    const propriedade = propriedades.dados?.find((item) => item.id === conta?.propriedadeId) ?? propriedades.dados?.[0];

    useEffect(() => {
        if (!produtor.dados) return;
        setProdutorEdit({ nome: produtor.dados.nome, telefone: produtor.dados.telefone, municipioId: String(produtor.dados.municipioId), canalPreferido: produtor.dados.canalPreferido, preferenciaLeitura: produtor.dados.preferenciaLeitura, anosExperiencia: String(produtor.dados.anosExperiencia ?? ""), recebeAter: produtor.dados.recebeAter ? "S" : "N" });
    }, [produtor.dados]);
    useEffect(() => {
        if (!propriedade) return;
        setPropriedadeEdit({ nome: propriedade.nome, areaHa: String(propriedade.areaHa), fonteAgua: propriedade.fonteAgua ?? "", irrigacao: propriedade.irrigacao ?? "" });
    }, [propriedade]);

    async function salvarEdicao(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (!conta || !produtor.dados) return;
        const telefone = produtorEdit.telefone.replace(/\D/g, "");
        const areaHa = lerNumero(propriedadeEdit.areaHa);
        const anosExperiencia = produtorEdit.anosExperiencia.trim() ? lerNumero(produtorEdit.anosExperiencia) : undefined;
        if (!produtorEdit.nome.trim() || !/^\d{10,11}$/.test(telefone) || !produtorEdit.municipioId || !produtorEdit.canalPreferido || !produtorEdit.preferenciaLeitura || (propriedade && (!propriedadeEdit.nome.trim() || !(areaHa > 0))) || (anosExperiencia !== undefined && (!Number.isInteger(anosExperiencia) || anosExperiencia < 0 || anosExperiencia > 99))) {
            setErroEdicao("Confira os campos: nome, telefone, município, preferências e área são obrigatórios. A área deve ser maior que zero.");
            return;
        }
        setSalvando(true); setErroEdicao(""); setSucessoEdicao("");
        try {
            await atualizarProdutor(conta.produtorId, { nome: produtorEdit.nome.trim(), telefone, municipioId: Number(produtorEdit.municipioId), canalPreferido: produtorEdit.canalPreferido, preferenciaLeitura: produtorEdit.preferenciaLeitura, anosExperiencia, recebeAter: produtorEdit.recebeAter === "S", consentimento: produtor.dados.consentimento });
            if (propriedade) await atualizarPropriedade(propriedade.id, { nome: propriedadeEdit.nome.trim(), municipioId: Number(produtorEdit.municipioId), areaHa, fonteAgua: propriedadeEdit.fonteAgua || undefined, irrigacao: propriedadeEdit.irrigacao || undefined });
            await Promise.all([produtor.tentarDeNovo(), propriedades.tentarDeNovo()]);
            setEditando(false); setSucessoEdicao("Seus dados foram atualizados.");
        } catch (erro) {
            setErroEdicao(erro instanceof Error ? erro.message : "Não foi possível salvar as alterações. Tente novamente.");
        } finally { setSalvando(false); }
    }

    const iniciarSaida = () => {
        if (saindo) return;
        setSaindo(true);
        window.setTimeout(() => {
            sair();
            setSaindo(false);
        }, 650);
    };

    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege">
            {saindo && <EstadoCarregando titulo="Saindo da sua conta…" descricao="Encerrando a sua entrada neste aparelho." telaInteira />}
            <section className="relative overflow-visible bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <Navbar />
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-7 pt-14 pb-16">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Minha conta</p>
                    <h1 className="font-titulo text-[clamp(40px,5.4vw,72px)] leading-none font-extrabold uppercase">
                        {conta ? (produtor.dados?.nome ?? conta.produtorNome) : "Entre para ver."}
                    </h1>
                </div>
            </section>

            <section className="border-t border-linha bg-card py-16">
                <div className="mx-auto flex w-full max-w-[820px] flex-col gap-10 px-7">
                    {!conta ? (
                        <div className="flex flex-col items-start gap-5">
                            <p className="text-texto-2">Você ainda não entrou neste aparelho.</p>
                            <div className="flex flex-wrap gap-3.5">
                                <Link to="/entrar" state={{ de: "/conta" }} className={BOTAO}>Entrar</Link>
                                <Link to="/cadastro" className={BOTAO_CLARO}>Fazer o cadastro</Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4">
                                <h2 className="font-titulo text-[clamp(24px,3vw,34px)] leading-tight font-extrabold uppercase">Seus dados</h2>
                                {propriedades.carregando && <AvisoDeTela tipo="carregando">Buscando os dados da sua propriedade…</AvisoDeTela>}
                                {sucessoEdicao && <p role="status" className="text-salvia">{sucessoEdicao}</p>}
                                {!editando && <button type="button" onClick={() => { setEditando(true); setSucessoEdicao(""); }} className={BOTAO_CLARO}>Editar informações</button>}
                                {editando && (
                                    <form onSubmit={salvarEdicao} className="flex flex-col gap-6 rounded-2xl border border-linha bg-fundo p-6">
                                        <h3 className="font-titulo text-xl font-bold uppercase">Editar cadastro e propriedade</h3>
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <Campo rotulo="Nome">{(a) => <input {...a} required maxLength={80} className={ENTRADA} value={produtorEdit.nome} onChange={e => setProdutorEdit(v => ({ ...v, nome: e.target.value }))} />}</Campo>
                                            <Campo rotulo="Telefone" dica="Com DDD, 10 ou 11 números">{(a) => <input {...a} required inputMode="tel" className={ENTRADA} value={produtorEdit.telefone} onChange={e => setProdutorEdit(v => ({ ...v, telefone: e.target.value }))} />}</Campo>
                                            <Campo rotulo="Município">{(a) => <select {...a} required className={ENTRADA} value={produtorEdit.municipioId} onChange={e => setProdutorEdit(v => ({ ...v, municipioId: e.target.value }))}>{MUNICIPIOS.map(m => <option key={m.id} value={m.id}>{m.nome} ({m.uf})</option>)}</select>}</Campo>
                                            <Campo rotulo="Como prefere receber avisos">{(a) => <select {...a} required className={ENTRADA} value={produtorEdit.canalPreferido} onChange={e => setProdutorEdit(v => ({ ...v, canalPreferido: e.target.value }))}>{CANAIS.map(o => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}</select>}</Campo>
                                            <Campo rotulo="Prefere">{(a) => <select {...a} required className={ENTRADA} value={produtorEdit.preferenciaLeitura} onChange={e => setProdutorEdit(v => ({ ...v, preferenciaLeitura: e.target.value }))}>{LEITURA.map(o => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}</select>}</Campo>
                                            <Campo rotulo="Anos de experiência">{(a) => <input {...a} type="number" min="0" max="99" className={ENTRADA} value={produtorEdit.anosExperiencia} onChange={e => setProdutorEdit(v => ({ ...v, anosExperiencia: e.target.value }))} />}</Campo>
                                            <Campo rotulo="Recebe visita de técnico">{(a) => <select {...a} required className={ENTRADA} value={produtorEdit.recebeAter} onChange={e => setProdutorEdit(v => ({ ...v, recebeAter: e.target.value }))}><option value="S">Sim</option><option value="N">Não</option></select>}</Campo>
                                            <Campo rotulo="Nome da propriedade">{(a) => <input {...a} required maxLength={80} disabled={!propriedade} className={ENTRADA} value={propriedadeEdit.nome} onChange={e => setPropriedadeEdit(v => ({ ...v, nome: e.target.value }))} />}</Campo>
                                            <Campo rotulo="Tamanho do local (ha)" dica="Área total da propriedade em hectares">{(a) => <input {...a} required type="number" min="0.01" step="0.01" disabled={!propriedade} className={ENTRADA} value={propriedadeEdit.areaHa} onChange={e => setPropriedadeEdit(v => ({ ...v, areaHa: e.target.value }))} />}</Campo>
                                            <Campo rotulo="Fonte de água">{(a) => <select {...a} className={ENTRADA} disabled={!propriedade} value={propriedadeEdit.fonteAgua} onChange={e => setPropriedadeEdit(v => ({ ...v, fonteAgua: e.target.value }))}><option value="">Não informado</option>{FONTES_DE_AGUA.map(o => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}</select>}</Campo>
                                            <Campo rotulo="Irrigação">{(a) => <select {...a} className={ENTRADA} disabled={!propriedade} value={propriedadeEdit.irrigacao} onChange={e => setPropriedadeEdit(v => ({ ...v, irrigacao: e.target.value }))}><option value="">Não informado</option>{IRRIGACOES.map(o => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}</select>}</Campo>
                                        </div>
                                        {erroEdicao && <AvisoDeTela tipo="erro">{erroEdicao}</AvisoDeTela>}
                                        <div className="flex flex-wrap gap-3"><button type="submit" disabled={salvando || propriedades.carregando} className={`${BOTAO} disabled:opacity-60`}>{salvando ? "Salvando…" : "Salvar alterações"}</button><button type="button" onClick={() => setEditando(false)} disabled={salvando} className={BOTAO_CLARO}>Cancelar</button></div>
                                    </form>
                                )}
                                {produtor.carregando && <AvisoDeTela tipo="carregando">Buscando os seus dados…</AvisoDeTela>}
                                {produtor.erro && (
                                    <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: produtor.tentarDeNovo }}>
                                        {produtor.erro.message}
                                    </AvisoDeTela>
                                )}
                                <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-5">
                                    <Item rotulo="Município" valor={`${conta.municipioNome}`} />
                                    <Item rotulo="Sua roça" valor={conta.propriedadeNome ?? "Ainda não cadastrada"} />
                                    {propriedade && <Item rotulo="Tamanho do local" valor={`${propriedade.areaHa} ha`} />}
                                    {produtor.dados && (
                                        <>
                                            <Item rotulo="Telefone" valor={esconderTelefone(produtor.dados.telefone)} />
                                            <Item rotulo="Recebe os avisos por" valor={rotuloDe(CANAIS, produtor.dados.canalPreferido)} />
                                            <Item rotulo="Prefere" valor={rotuloDe(LEITURA, produtor.dados.preferenciaLeitura)} />
                                        </>
                                    )}
                                </dl>
                            </div>

                            <div className="flex flex-col gap-4 border-t border-linha pt-10">
                                <h2 className="font-titulo text-[clamp(24px,3vw,34px)] leading-tight font-extrabold uppercase">Este aparelho</h2>
                                <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-5">
                                    <Item rotulo="Código do aparelho" valor={aparelho.id.slice(0, 8)} />
                                    <Item rotulo="Conhecido desde" valor={formatarData(aparelho.desde)} />
                                    <Item
                                        rotulo="Reconhece você sozinho?"
                                        valor={conta.lembrar ? "Sim, ele lembra de você" : "Não, vale só até fechar a aba"}
                                    />
                                    {conta.entrouEm && <Item rotulo="Você entrou em" valor={formatarData(conta.entrouEm)} />}
                                </dl>
                                <p className="max-w-[640px] text-texto-2">
                                    Esses dados ficam só neste navegador. "Sair" encerra a sua entrada; "Esquecer este aparelho"
                                    apaga também o código dele.
                                </p>
                                <div className="flex flex-wrap gap-3.5">
                                    <Link to="/hoje" className={BOTAO}>Ver os avisos de hoje</Link>
                                    <button type="button" onClick={iniciarSaida} disabled={saindo} className={`${BOTAO_CLARO} disabled:cursor-not-allowed disabled:opacity-60`}>Sair</button>
                                    <button type="button" onClick={esquecerAparelho} className={BOTAO_CLARO}>Esquecer este aparelho</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

function Item({ rotulo, valor }: { rotulo: string; valor: string }) {
    return (
        <div className="flex flex-col gap-1 rounded-2xl border border-linha bg-fundo px-5 py-4">
            <dt className="text-sm font-semibold uppercase tracking-[.12em] text-texto-2">{rotulo}</dt>
            <dd className="font-semibold">{valor}</dd>
        </div>
    );
}
