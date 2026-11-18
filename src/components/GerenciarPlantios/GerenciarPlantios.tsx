import { useState, type FormEvent } from "react";
import { CULTURAS } from "../../data/referencias";
import { ESTAGIOS, rotuloDe } from "../../data/opcoes";
import { useBusca } from "../../hooks/useBusca";
import { atualizarPlantio, buscarPropriedade, cadastrarPlantio, deletarPlantio } from "../../services/api";
import type { Plantio, PlantioEntrada, Propriedade } from "../../types/api";
import { diasAte, formatarData, hojeEmTexto } from "../../utils/datas";

interface GerenciarPlantiosProps {
    propriedadeId: number | null;
    plantios: Plantio[];
    carregando: boolean;
    erro?: string;
    aoTentarNovamente: () => void;
}

interface ValoresFormulario {
    culturaId: string;
    areaHa: string;
    dataPlantio: string;
    dataColheitaPrevista: string;
    estagio: string;
}

type FormularioAtivo = { modo: "novo" } | { modo: "editar"; plantio: Plantio } | null;

const VAZIO: ValoresFormulario = {
    culturaId: "",
    areaHa: "",
    dataPlantio: "",
    dataColheitaPrevista: "",
    estagio: "",
};

const CONTROLE = "mt-1 min-h-12 w-full rounded-xl border border-linha bg-fundo px-3 py-2 text-base text-bege outline-none focus:border-salvia focus:ring-2 focus:ring-salvia/20";
const BOTAO_SECUNDARIO = "inline-flex min-h-11 items-center justify-center rounded-xl border border-linha px-4 text-sm font-semibold text-bege transition hover:border-salvia hover:text-salvia focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia disabled:cursor-wait disabled:opacity-60";

export default function GerenciarPlantios({ propriedadeId, plantios, carregando, erro, aoTentarNovamente }: GerenciarPlantiosProps) {
    const propriedade = useBusca<Propriedade>(
        `propriedade-plantios-${propriedadeId}`,
        propriedadeId === null ? null : (sinal) => buscarPropriedade(propriedadeId, sinal),
    );
    const [formulario, setFormulario] = useState<FormularioAtivo>(null);
    const [valores, setValores] = useState<ValoresFormulario>(VAZIO);
    const [salvando, setSalvando] = useState(false);
    const [removendo, setRemovendo] = useState<number | null>(null);
    const [erroAcao, setErroAcao] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState<string | null>(null);
    const areaTotal = propriedade.dados?.areaHa;
    const plantioEditadoId = formulario?.modo === "editar" ? formulario.plantio.id : null;
    const areaOcupadaPorOutros = plantios
        .filter((plantio) => plantio.id !== plantioEditadoId)
        .reduce((total, plantio) => total + plantio.areaHa, 0);
    const areaJaPlantada = plantios.reduce((total, plantio) => total + plantio.areaHa, 0);
    const areaDisponivel = areaTotal === undefined ? undefined : Math.max(0, areaTotal - areaOcupadaPorOutros);
    const culturasEmOutrosPlantios = new Set(
        plantios
            .filter((plantio) => plantio.id !== plantioEditadoId)
            .map((plantio) => plantio.culturaId),
    );
    const culturasDisponiveis = CULTURAS.filter((cultura) => !culturasEmOutrosPlantios.has(cultura.id));

    function abrirNovo() {
        setValores(VAZIO);
        setFormulario({ modo: "novo" });
        setErroAcao(null);
        setSucesso(null);
    }

    function abrirEdicao(plantio: Plantio) {
        setValores({
            culturaId: String(plantio.culturaId),
            areaHa: String(plantio.areaHa),
            dataPlantio: plantio.dataPlantio,
            dataColheitaPrevista: plantio.dataColheitaPrevista,
            estagio: plantio.estagio,
        });
        setFormulario({ modo: "editar", plantio });
        setErroAcao(null);
        setSucesso(null);
    }

    function atualizarCampo(campo: keyof ValoresFormulario, valor: string) {
        setValores((atuais) => ({ ...atuais, [campo]: valor }));
        setErroAcao(null);
    }

    async function salvar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (!formulario || salvando) return;
        if (formulario.modo === "novo" && propriedadeId === null) {
            setErroAcao("Cadastre uma propriedade antes de adicionar plantios.");
            return;
        }
        if (propriedade.carregando || areaTotal === undefined) {
            setErroAcao("Aguarde a confirmação da área total da propriedade antes de salvar.");
            return;
        }

        const areaHa = Number(valores.areaHa.replace(",", "."));
        if (!Number.isFinite(areaHa) || areaHa <= 0) {
            setErroAcao("Informe uma área plantada maior que zero.");
            return;
        }
        if (areaDisponivel !== undefined && areaHa > areaDisponivel + 0.000001) {
            setErroAcao(`A roça tem ${areaTotal.toLocaleString("pt-BR")} ha no total, e outros plantios ocupam ${areaOcupadaPorOutros.toLocaleString("pt-BR")} ha. Restam ${areaDisponivel.toLocaleString("pt-BR")} ha para este plantio.`);
            return;
        }
        if (valores.dataColheitaPrevista <= valores.dataPlantio) {
            setErroAcao("A previsão de colheita precisa ser posterior à data do plantio.");
            return;
        }

        const dados: PlantioEntrada = {
            culturaId: Number(valores.culturaId),
            areaHa,
            dataPlantio: valores.dataPlantio,
            dataColheitaPrevista: valores.dataColheitaPrevista,
            estagio: valores.estagio,
        };

        setSalvando(true);
        setErroAcao(null);
        setSucesso(null);
        try {
            if (formulario.modo === "editar") {
                await atualizarPlantio(formulario.plantio.id, dados);
                setSucesso("Plantio atualizado.");
            } else {
                await cadastrarPlantio(propriedadeId!, dados);
                setSucesso("Plantio adicionado à sua roça.");
            }
            setFormulario(null);
            setValores(VAZIO);
            aoTentarNovamente();
        } catch (falha) {
            setErroAcao(falha instanceof Error ? falha.message : "Não foi possível salvar o plantio.");
        } finally {
            setSalvando(false);
        }
    }

    async function remover(plantio: Plantio) {
        const cultura = CULTURAS.find((item) => item.id === plantio.culturaId)?.nome ?? "este plantio";
        if (!window.confirm(`Remover ${cultura} da sua roça? Esta ação não pode ser desfeita.`)) return;

        setRemovendo(plantio.id);
        setErroAcao(null);
        setSucesso(null);
        try {
            await deletarPlantio(plantio.id);
            setSucesso("Plantio removido da sua roça.");
            if (formulario?.modo === "editar" && formulario.plantio.id === plantio.id) setFormulario(null);
            aoTentarNovamente();
        } catch (falha) {
            setErroAcao(falha instanceof Error ? falha.message : "Não foi possível remover o plantio.");
        } finally {
            setRemovendo(null);
        }
    }

    return (
        <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-salvia">Acompanhamento</p>
                    <h2 className="mt-1 font-titulo text-2xl font-bold uppercase sm:text-3xl">O que está plantado</h2>
                </div>
                <button type="button" onClick={abrirNovo} disabled={propriedadeId === null} title={propriedadeId === null ? "Cadastre uma propriedade antes de adicionar plantios" : undefined} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-salvia bg-salvia px-5 font-titulo text-sm font-bold uppercase tracking-wide text-fundo transition hover:bg-transparent hover:text-salvia focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar disabled:cursor-not-allowed disabled:opacity-50">
                    <span aria-hidden="true" className="text-xl leading-none">+</span> Adicionar plantio
                </button>
            </div>

            {sucesso && <p role="status" className="mb-4 rounded-xl border border-salvia/30 bg-salvia/10 px-4 py-3 text-sm text-salvia">{sucesso}</p>}
            {erroAcao && <p role="alert" className="mb-4 rounded-xl border border-terra/50 bg-terra-fundo px-4 py-3 text-sm text-bege">{erroAcao}</p>}

            {areaTotal !== undefined && (
                <div className="mb-5 rounded-xl border border-linha bg-fundo/55 px-4 py-3">
                    <div className="flex flex-wrap justify-between gap-2 text-sm">
                        <span className="text-texto-2">Área ocupada por plantios</span>
                        <strong>{areaJaPlantada.toLocaleString("pt-BR")} de {areaTotal.toLocaleString("pt-BR")} ha</strong>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-linha" aria-hidden="true">
                        <div className="h-full rounded-full bg-salvia transition-[width]" style={{ width: `${Math.min(100, areaTotal > 0 ? (areaJaPlantada / areaTotal) * 100 : 0)}%` }} />
                    </div>
                </div>
            )}

            {propriedade.erro && (
                <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-terra/50 bg-terra-fundo px-4 py-3">
                    <p className="text-sm text-bege">Não foi possível conferir a área total da propriedade: {propriedade.erro.message}</p>
                    <button type="button" onClick={propriedade.tentarDeNovo} className={BOTAO_SECUNDARIO}>Tentar novamente</button>
                </div>
            )}

            {formulario && (
                <form onSubmit={salvar} className="mb-6 rounded-2xl border border-salvia/30 bg-fundo/70 p-5 sm:p-6">
                    <h3 className="font-titulo text-xl font-bold">{formulario.modo === "editar" ? "Editar plantio" : "Novo plantio"}</h3>
                    {areaTotal !== undefined && areaDisponivel !== undefined && (
                        <p className="mt-2 text-sm text-texto-2">Disponível para este plantio: <strong className="text-salvia">{areaDisponivel.toLocaleString("pt-BR")} ha</strong> de {areaTotal.toLocaleString("pt-BR")} ha totais.</p>
                    )}
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        <label className="text-sm font-semibold text-bege">
                            Cultura
                            <select required className={CONTROLE} value={valores.culturaId} onChange={(e) => atualizarCampo("culturaId", e.target.value)}>
                                <option value="" disabled>Selecione uma cultura</option>
                                {culturasDisponiveis.map((cultura) => <option key={cultura.id} value={cultura.id}>{cultura.nome}</option>)}
                            </select>
                            {culturasDisponiveis.length === 0 && <span className="mt-1 block text-xs font-normal text-ambar">Todas as culturas do catálogo já têm um plantio cadastrado.</span>}
                        </label>
                        <label className="text-sm font-semibold text-bege">
                            Área plantada (ha)
                            <input required type="number" min="0.01" max={areaDisponivel} step="0.01" inputMode="decimal" className={CONTROLE} value={valores.areaHa} onChange={(e) => atualizarCampo("areaHa", e.target.value)} />
                        </label>
                        <label className="text-sm font-semibold text-bege">
                            Data do plantio
                            <input required type="date" max={hojeEmTexto()} className={CONTROLE} value={valores.dataPlantio} onChange={(e) => atualizarCampo("dataPlantio", e.target.value)} />
                        </label>
                        <label className="text-sm font-semibold text-bege">
                            Colheita prevista
                            <input required type="date" min={valores.dataPlantio || undefined} className={CONTROLE} value={valores.dataColheitaPrevista} onChange={(e) => atualizarCampo("dataColheitaPrevista", e.target.value)} />
                        </label>
                        <label className="text-sm font-semibold text-bege">
                            Fase do plantio
                            <select required className={CONTROLE} value={valores.estagio} onChange={(e) => atualizarCampo("estagio", e.target.value)}>
                                <option value="" disabled>Selecione a fase</option>
                                {ESTAGIOS.map((estagio) => <option key={estagio.valor} value={estagio.valor}>{estagio.rotulo}</option>)}
                            </select>
                        </label>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button type="submit" disabled={salvando} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-salvia bg-salvia px-5 font-titulo text-sm font-bold uppercase tracking-wide text-fundo transition hover:bg-transparent hover:text-salvia focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar disabled:cursor-wait disabled:opacity-60">
                            {salvando ? "Salvando…" : formulario.modo === "editar" ? "Salvar alterações" : "Salvar plantio"}
                        </button>
                        <button type="button" disabled={salvando} onClick={() => setFormulario(null)} className={BOTAO_SECUNDARIO}>Cancelar</button>
                    </div>
                </form>
            )}

            {carregando && <p role="status" className="rounded-xl border border-linha px-4 py-3 text-texto-2">Atualizando os plantios…</p>}
            {!carregando && erro && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-terra/50 bg-terra-fundo px-4 py-3">
                    <p className="text-sm text-bege">{erro}</p>
                    <button type="button" onClick={aoTentarNovamente} className={BOTAO_SECUNDARIO}>Tentar novamente</button>
                </div>
            )}
            {!carregando && !erro && plantios.length === 0 && (
                <div className="rounded-2xl border border-dashed border-linha px-5 py-8 text-center">
                    <p className="font-titulo text-lg font-bold">
                        {propriedadeId === null ? "Cadastre uma propriedade para começar." : "Ainda não há plantios cadastrados nesta roça."}
                    </p>
                    <p className="mt-1 text-sm text-texto-2">
                        {propriedadeId === null ? "Depois, você poderá registrar e acompanhar cada cultura." : "Adicione uma cultura para começar a acompanhar a sua safra."}
                    </p>
                </div>
            )}

            {!carregando && !erro && plantios.length > 0 && (
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
                    {plantios.map((plantio) => {
                        const cultura = CULTURAS.find((item) => item.id === plantio.culturaId)?.nome ?? "Cultura";
                        const dias = diasAte(plantio.dataColheitaPrevista);
                        return (
                            <li key={plantio.id} className="rounded-2xl border border-linha bg-fundo/70 p-5 sm:p-6">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold text-texto-2">Cultura</p>
                                        <h3 className="mt-1 font-titulo text-2xl font-bold uppercase">{cultura}</h3>
                                    </div>
                                    <span className="rounded-full border border-salvia/30 bg-salvia/10 px-3 py-1 text-xs font-semibold text-salvia">{rotuloDe(ESTAGIOS, plantio.estagio)}</span>
                                </div>
                                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-dashed border-linha pt-4 text-sm">
                                    <div><p className="text-texto-2">Área plantada</p><p className="mt-1 font-semibold">{plantio.areaHa.toLocaleString("pt-BR")} ha</p></div>
                                    <div><p className="text-texto-2">Plantado em</p><p className="mt-1 font-semibold">{formatarData(plantio.dataPlantio)}</p></div>
                                </div>
                                <p className="mt-4 rounded-xl border border-linha/70 bg-card px-4 py-3 text-sm">
                                    {dias < 0 ? `Colheita prevista para ${formatarData(plantio.dataColheitaPrevista)} (data já passou).` : dias === 0 ? "Colheita prevista para hoje." : `Colheita em ${formatarData(plantio.dataColheitaPrevista)} · faltam ${dias} ${dias === 1 ? "dia" : "dias"}.`}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2 border-t border-linha pt-4">
                                    <button type="button" onClick={() => abrirEdicao(plantio)} className={BOTAO_SECUNDARIO}>Editar</button>
                                    <button type="button" disabled={removendo === plantio.id} onClick={() => void remover(plantio)} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-terra/50 px-4 text-sm font-semibold text-ambar transition hover:bg-terra-fundo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar disabled:cursor-wait disabled:opacity-60">
                                        {removendo === plantio.id ? "Removendo…" : "Remover"}
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
