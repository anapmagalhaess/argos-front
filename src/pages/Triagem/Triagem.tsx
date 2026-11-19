import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";
import { AvisoDeTela, Campo, ENTRADA, Escolha } from "../../components/CampoForm/CampoForm";
import EstadoCarregando from "../../components/EstadoCarregando/EstadoCarregando";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { CANAIS, ESTAGIOS, FONTES_DE_AGUA, IRRIGACOES, LEITURA, SIM_NAO } from "../../data/opcoes";
import { CULTURAS, MUNICIPIOS, municipioPorId } from "../../data/referencias";
import { ApiError, cadastrarPlantio, cadastrarPropriedade, cadastrarProdutor } from "../../services/api";
import { formatarTelefone } from "../../services/autenticacao";
import { useConta } from "../../contexto/conta";
import type { Plantio, Produtor, Propriedade } from "../../types/api";
import { hojeEmTexto, lerNumero } from "../../utils/datas";

/*
    Triagem: formulário em 3 passos que cadastra, nesta ordem, o produtor, a roça (propriedade) e,
    se a pessoa quiser, o primeiro plantio. Cada passo chama uma rota da API Java:
      POST /produtores  ->  POST /produtores/{id}/propriedades  ->  POST /propriedades/{id}/plantios
    Se um passo falha no meio (ex.: a área do plantio passa da roça), o que já foi criado fica
    guardado e não é enviado de novo quando a pessoa corrige e tenta outra vez.
*/

const PASSOS = ["Você", "Sua roça", "O que plantou"];
const AREA_MAXIMA_HA = 100000;
const DIAS_PARA_REGISTRO_RETROATIVO = 730;

function somarDias(texto: string, dias: number) {
    const data = new Date(`${texto}T00:00:00Z`);
    data.setUTCDate(data.getUTCDate() + dias);
    return data.toISOString().slice(0, 10);
}

function dataValida(texto: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
    const data = new Date(`${texto}T00:00:00Z`);
    return Number.isFinite(data.getTime()) && data.toISOString().slice(0, 10) === texto;
}

function areaValida(texto: string) {
    return /^\d{1,6}(?:[.,]\d{1,2})?$/.test(texto.trim());
}

function temCaractereDeControle(texto: string) {
    return [...texto].some((caractere) => {
        const codigo = caractere.charCodeAt(0);
        return codigo <= 31 || codigo === 127;
    });
}

interface Dados {
    nome: string;
    telefone: string;
    municipioId: string;
    canalPreferido: string;
    preferenciaLeitura: string;
    anosExperiencia: string;
    recebeAter: string;
    consentimento: boolean;
    propNome: string;
    propAreaHa: string;
    fonteAgua: string;
    irrigacao: string;
    culturaId: string;
    plantioAreaHa: string;
    dataPlantio: string;
    dataColheita: string;
    estagio: string;
}

const VAZIO: Dados = {
    nome: "", telefone: "", municipioId: "", canalPreferido: "", preferenciaLeitura: "", anosExperiencia: "",
    recebeAter: "", consentimento: false, propNome: "", propAreaHa: "", fonteAgua: "", irrigacao: "",
    culturaId: "", plantioAreaHa: "", dataPlantio: "", dataColheita: "", estagio: "",
};

type Erros = Record<string, string>;

// A cada passo, as conferências que a API também faz (a API é quem manda; aqui só avisamos mais cedo).
function validarVoce(d: Dados): Erros {
    const e: Erros = {};
    if (!d.nome.trim()) e["produtor.nome"] = "Escreva o seu nome.";
    else if (d.nome.trim().length > 80) e["produtor.nome"] = "O nome pode ter no máximo 80 letras.";
    else if (temCaractereDeControle(d.nome)) e["produtor.nome"] = "Retire caracteres inválidos do nome.";
    const telefone = d.telefone.replace(/\D/g, "");
    if (!/^\d{10,11}$/.test(telefone) || /^([0-9])\1+$/.test(telefone)) e["produtor.telefone"] = "Escreva um telefone válido com DDD (10 ou 11 dígitos).";
    if (!MUNICIPIOS.some((m) => String(m.id) === d.municipioId)) e["produtor.municipioId"] = "Escolha um município da lista.";
    if (!CANAIS.some((o) => o.valor === d.canalPreferido)) e["produtor.canalPreferido"] = "Escolha uma opção da lista.";
    if (!LEITURA.some((o) => o.valor === d.preferenciaLeitura)) e["produtor.preferenciaLeitura"] = "Escolha uma opção da lista.";
    if (d.anosExperiencia.trim() !== "") {
        const anos = lerNumero(d.anosExperiencia);
        if (!/^\d{1,2}$/.test(d.anosExperiencia.trim()) || !Number.isInteger(anos) || anos < 0 || anos > 99) e["produtor.anosExperiencia"] = "Escreva um número inteiro de 0 a 99.";
    }
    if (!SIM_NAO.some((o) => o.valor === d.recebeAter)) e["produtor.recebeAter"] = "Escolha se um técnico visita a sua roça.";
    if (!d.consentimento) e["produtor.consentimento"] = "Para se cadastrar, o Argos precisa do seu aceite para guardar esses dados.";
    return e;
}

function validarRoca(d: Dados): Erros {
    const e: Erros = {};
    if (!d.propNome.trim()) e["propriedade.nome"] = "Dê um nome para a sua roça.";
    else if (d.propNome.trim().length > 80) e["propriedade.nome"] = "O nome pode ter no máximo 80 letras.";
    else if (temCaractereDeControle(d.propNome)) e["propriedade.nome"] = "Retire caracteres inválidos do nome.";
    if (d.fonteAgua && !FONTES_DE_AGUA.some((o) => o.valor === d.fonteAgua)) e["propriedade.fonteAgua"] = "Escolha uma fonte de água da lista.";
    if (d.irrigacao && !IRRIGACOES.some((o) => o.valor === d.irrigacao)) e["propriedade.irrigacao"] = "Escolha um tipo de irrigação da lista.";
    const area = lerNumero(d.propAreaHa);
    if (!areaValida(d.propAreaHa) || !(area > 0)) e["propriedade.areaHa"] = "Escreva uma área válida, entre 0,01 e 100.000 hectares, com até duas casas decimais.";
    else if (area > AREA_MAXIMA_HA) e["propriedade.areaHa"] = "A área não pode passar de 100.000 hectares.";
    return e;
}

function validarPlantio(d: Dados): Erros {
    const e: Erros = {};
    if (!d.culturaId) return e; // sem cultura escolhida = a pessoa pulou este passo
    const cultura = CULTURAS.find((item) => String(item.id) === d.culturaId);
    if (!cultura) {
        e["plantio.culturaId"] = "Escolha uma cultura da lista.";
        return e;
    }
    const area = lerNumero(d.plantioAreaHa);
    const areaDaRoca = lerNumero(d.propAreaHa);
    if (!areaValida(d.plantioAreaHa) || !(area > 0)) e["plantio.areaHa"] = "Escreva uma área válida, maior que zero e com até duas casas decimais.";
    else if (area > areaDaRoca) e["plantio.areaHa"] = `Não pode passar da área da roça (${areaDaRoca} ha).`;
    const hoje = hojeEmTexto();
    const dataMinimaPlantio = somarDias(hoje, -Math.min(DIAS_PARA_REGISTRO_RETROATIVO, cultura.cicloDias * 2));
    const plantioValido = dataValida(d.dataPlantio);
    if (!plantioValido) e["plantio.dataPlantio"] = "Informe uma data válida.";
    else if (d.dataPlantio > hoje) e["plantio.dataPlantio"] = "A data do plantio não pode ser no futuro.";
    else if (d.dataPlantio < dataMinimaPlantio) e["plantio.dataPlantio"] = `A data está distante demais. Para ${cultura.nome}, informe um plantio de até ${Math.min(DIAS_PARA_REGISTRO_RETROATIVO, cultura.cicloDias * 2)} dias atrás.`;
    if (!dataValida(d.dataColheita)) e["plantio.dataColheitaPrevista"] = "Informe uma data válida.";
    else if (plantioValido && d.dataColheita <= d.dataPlantio) e["plantio.dataColheitaPrevista"] = "A colheita tem que ser depois do plantio.";
    else if (d.dataColheita < hoje) e["plantio.dataColheitaPrevista"] = "A previsão de colheita não pode estar no passado.";
    else if (plantioValido && d.dataColheita > somarDias(d.dataPlantio, cultura.cicloDias * 2)) e["plantio.dataColheitaPrevista"] = `A previsão está distante demais. Para ${cultura.nome}, use até ${cultura.cicloDias * 2} dias após o plantio.`;
    if (!ESTAGIOS.some((o) => o.valor === d.estagio)) e["plantio.estagio"] = "Escolha uma fase da lista.";
    return e;
}

// Em que passo mora cada tipo de erro (para levar a pessoa até lá quando a API reclama)
const PASSO_DO_ERRO: Record<string, number> = { produtor: 0, propriedade: 1, plantio: 2 };

export default function Triagem() {
    const { conta, entrar, sair } = useConta();
    const [lembrar, setLembrar] = useState(true);

    const [passo, setPasso] = useState(0);
    const [dados, setDados] = useState<Dados>(VAZIO);
    const [erros, setErros] = useState<Erros>({});
    const [erroGeral, setErroGeral] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [concluido, setConcluido] = useState<{ nome: string; plantou: boolean } | null>(null);
    const [bloqueio, setBloqueio] = useState({ produtor: false, propriedade: false });
    // O que a API já criou nesta triagem: se a pessoa corrige um erro e tenta de novo, não se cria duas vezes
    const criados = useRef<{ produtor?: Produtor; propriedade?: Propriedade; plantio?: Plantio }>({});
    const tituloRef = useRef<HTMLHeadingElement>(null);

    // Ao trocar de passo, o foco vai para o título do passo (quem usa leitor de tela escuta onde está)
    useEffect(() => {
        tituloRef.current?.focus();
    }, [passo, concluido]);

    // Depois de uma validação que falhou, o foco vai para o primeiro campo com erro
    useEffect(() => {
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }, [erros]);

    const definir = (chave: keyof Dados, valor: string | boolean, erro?: string) => {
        setDados((atual) => ({ ...atual, [chave]: valor }));
        if (erro) setErros((atual) => ({ ...atual, [erro]: "" }));
        setErroGeral("");
    };

    const municipioEscolhido = municipioPorId(Number(dados.municipioId));
    const culturaEscolhida = CULTURAS.find((item) => String(item.id) === dados.culturaId);
    const hoje = hojeEmTexto();
    const minimoPlantio = somarDias(hoje, -(culturaEscolhida ? Math.min(DIAS_PARA_REGISTRO_RETROATIVO, culturaEscolhida.cicloDias * 2) : DIAS_PARA_REGISTRO_RETROATIVO));
    const minimoColheita = dataValida(dados.dataPlantio) && dados.dataPlantio >= hoje
        ? somarDias(dados.dataPlantio, 1)
        : hoje;
    const maximoColheita = culturaEscolhida && dataValida(dados.dataPlantio)
        ? somarDias(dados.dataPlantio, culturaEscolhida.cicloDias * 2)
        : undefined;

    function continuar() {
        const novos = passo === 0 ? validarVoce(dados) : validarRoca(dados);
        setErros(novos);
        if (Object.keys(novos).length === 0) setPasso(passo + 1);
    }

    async function enviar() {
        const novos = { ...validarVoce(dados), ...validarRoca(dados), ...validarPlantio(dados) };
        setErros(novos);
        const primeiro = Object.keys(novos)[0];
        if (primeiro) {
            setPasso(PASSO_DO_ERRO[primeiro.split(".")[0]]);
            return;
        }

        setEnviando(true);
        setErroGeral("");
        let etapa = "produtor";
        try {
            if (!criados.current.produtor) {
                criados.current.produtor = await cadastrarProdutor({
                    nome: dados.nome.trim(),
                    telefone: dados.telefone.replace(/\D/g, ""),
                    municipioId: Number(dados.municipioId),
                    canalPreferido: dados.canalPreferido,
                    preferenciaLeitura: dados.preferenciaLeitura,
                    anosExperiencia: dados.anosExperiencia.trim() === "" ? undefined : lerNumero(dados.anosExperiencia),
                    recebeAter: dados.recebeAter === "S",
                    consentimento: dados.consentimento,
                });
                setBloqueio((b) => ({ ...b, produtor: true }));
            }
            etapa = "propriedade";
            if (!criados.current.propriedade) {
                criados.current.propriedade = await cadastrarPropriedade(criados.current.produtor.id, {
                    nome: dados.propNome.trim(),
                    municipioId: Number(dados.municipioId),
                    areaHa: lerNumero(dados.propAreaHa),
                    fonteAgua: dados.fonteAgua || undefined,
                    irrigacao: dados.irrigacao || undefined,
                });
                setBloqueio((b) => ({ ...b, propriedade: true }));
            }
            etapa = "plantio";
            if (dados.culturaId && !criados.current.plantio) {
                criados.current.plantio = await cadastrarPlantio(criados.current.propriedade.id, {
                    culturaId: Number(dados.culturaId),
                    areaHa: lerNumero(dados.plantioAreaHa),
                    dataPlantio: dados.dataPlantio,
                    dataColheitaPrevista: dados.dataColheita,
                    estagio: dados.estagio,
                });
            }

            const { produtor, propriedade } = criados.current;
            // O cadastro já deixa a pessoa dentro: entrar guarda a conta (e o aparelho, se ela pediu)
            entrar(
                {
                    produtorId: produtor.id,
                    produtorNome: produtor.nome,
                    municipioId: produtor.municipioId,
                    municipioNome: municipioPorId(produtor.municipioId)?.nome ?? "",
                    propriedadeId: propriedade.id,
                    propriedadeNome: propriedade.nome,
                },
                lembrar,
            );
            setConcluido({ nome: produtor.nome, plantou: Boolean(criados.current.plantio) });
        } catch (erro) {
            tratarErro(erro, etapa);
        } finally {
            setEnviando(false);
        }
    }

    // Leva o erro da API até o campo certo; o que não for de um campo vira um aviso no fim do passo
    function tratarErro(erro: unknown, etapa: string) {
        setPasso(PASSO_DO_ERRO[etapa]);
        if (!(erro instanceof ApiError)) {
            setErroGeral("Algo deu errado. Tente de novo.");
            return;
        }
        if (erro.campos.length > 0) {
            const porCampo: Erros = {};
            for (const { campo, mensagem } of erro.campos) porCampo[`${etapa}.${campo}`] = mensagem;
            setErros(porCampo);
            return;
        }
        // Telefone repetido (RN02): a mensagem aparece no próprio campo
        if (etapa === "produtor" && erro.status === 409) {
            setErros({ "produtor.telefone": erro.message });
            return;
        }
        setErroGeral(erro.message);
    }

    function aoEnviarFormulario(evento: FormEvent) {
        evento.preventDefault();
        if (enviando) return;
        if (passo < 2) continuar();
        else void enviar();
    }

    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege [background:radial-gradient(700px_420px_at_82%_0%,rgba(125,190,140,.12),transparent_70%),linear-gradient(180deg,var(--color-card)_0%,var(--color-fundo)_38%,var(--color-fundo)_100%)]">
            {enviando && <EstadoCarregando titulo="Salvando o seu cadastro…" descricao="A primeira chamada ao servidor pode levar até cerca de 1 minuto." telaInteira />}
            <section className="relative overflow-visible bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25">
                    <svg viewBox="0 0 1440 620" preserveAspectRatio="none" className="h-full w-full">
                        <g fill="none" stroke="#7DBE8C" strokeWidth="1.2" strokeDasharray="3 6">
                            <path d="M-60 150 C280 45 610 250 920 125 S1280 95 1500 190" />
                            <path d="M-50 340 C260 220 620 430 930 310 S1260 270 1500 390" />
                            <path d="M-40 520 C300 440 620 590 900 490 S1260 430 1500 540" />
                        </g>
                        <g fill="#D9A650" opacity=".55">
                            <circle cx="180" cy="115" r="3" /><circle cx="1220" cy="185" r="3" />
                            <circle cx="1090" cy="470" r="2.5" /><circle cx="320" cy="510" r="2.5" />
                        </g>
                    </svg>
                </div>
                <Navbar />
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-7 pt-14 pb-16">
                    <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[.14em] text-salvia"><span aria-hidden="true" className="size-2 rounded-full bg-salvia shadow-[0_0_0_7px_rgba(125,190,140,.10),0_0_22px_rgba(125,190,140,.55)]" />Triagem</p>
                    <h1 className="font-titulo text-[clamp(40px,5.4vw,72px)] leading-none font-extrabold uppercase">Conte da sua roça.</h1>
                    <p className="max-w-[620px] text-[clamp(19px,2vw,22px)] text-texto-2">
                        São três passos, com perguntas curtas. Com as respostas, o Argos guarda a sua roça e
                        acompanha o que você plantou.
                    </p>
                </div>
            </section>

            <section className="relative isolate overflow-hidden border-t border-linha bg-card py-16">
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-10 z-0 size-64 rounded-full bg-salvia/[.06] blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-16 z-0 size-72 rounded-full bg-ambar/[.05] blur-3xl" />
                <div className="relative z-10 mx-auto w-full max-w-[820px] px-7">
                    {concluido ? (
                        <div className="flex flex-col gap-6">
                            <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Cadastro feito</p>
                            <h2 ref={tituloRef} tabIndex={-1} className="font-titulo text-[clamp(30px,4vw,48px)] leading-tight font-extrabold uppercase focus:outline-none">
                                Tudo certo, {concluido.nome}!
                            </h2>
                            <p className="text-texto-2">
                                {concluido.plantou
                                    ? "Guardamos você, a sua roça e o seu plantio. "
                                    : "Guardamos você e a sua roça. Quando plantar, é só voltar aqui. "}
                                Agora veja a sua roça.
                                {lembrar ? " Este aparelho vai lembrar de você na próxima vez." : ""}
                            </p>
                            <div className="flex flex-wrap gap-3.5">
                                <Link to="/hoje" className="inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none">
                                    Ver a minha roça
                                </Link>
                                <Link to="/mapa" className="inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-linha px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-bege transition-transform duration-150 hover:scale-[1.035] hover:border-bege focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none">
                                    Abrir o mapa
                                </Link>
                            </div>
                        </div>
                    ) : conta ? (
                        <div className="flex flex-col items-start gap-5 rounded-2xl border border-linha bg-fundo p-7">
                            <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Conta já conectada</p>
                            <h2 ref={tituloRef} tabIndex={-1} className="font-titulo text-[clamp(26px,3.2vw,38px)] leading-tight font-extrabold uppercase focus:outline-none">
                                Você já entrou como<br />{conta.produtorNome}.
                            </h2>
                            <p className="max-w-[640px] text-texto-2">
                                Para criar um cadastro ou entrar em outra conta, você precisa sair desta conta primeiro.
                            </p>
                            <button type="button" onClick={sair} className="inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none">
                                Sair da conta
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={aoEnviarFormulario} noValidate className="flex flex-col gap-8">
                            <p className="text-texto-2">
                                Já tem cadastro?{" "}
                                <Link to="/entrar" className="font-semibold text-salvia underline underline-offset-4">Entrar</Link>
                            </p>

                            <ol className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Passos da triagem">
                                {PASSOS.map((nome, i) => (
                                    <li key={nome} aria-current={i === passo ? "step" : undefined} className={`flex items-center gap-2.5 ${i === passo ? "text-bege" : "text-texto-2"}`}>
                                        <span className={`flex size-8 items-center justify-center rounded-full border-2 font-titulo text-sm font-bold transition-shadow duration-300 ${i < passo ? "border-salvia bg-salvia text-fundo shadow-[0_0_0_5px_rgba(125,190,140,.08)]" : i === passo ? "border-salvia text-salvia shadow-[0_0_0_6px_rgba(125,190,140,.10),0_0_20px_rgba(125,190,140,.24)]" : "border-linha"}`}>
                                            {i + 1}
                                        </span>
                                        <span className="font-semibold">{nome}</span>
                                    </li>
                                ))}
                            </ol>

                            <h2 ref={tituloRef} tabIndex={-1} className="font-titulo text-[clamp(26px,3.2vw,38px)] leading-tight font-extrabold uppercase focus:outline-none">
                                {passo === 0 && "Quem é você?"}
                                {passo === 1 && "Como é a sua roça?"}
                                {passo === 2 && "O que você plantou?"}
                            </h2>

                            {passo === 0 && (
                                <fieldset disabled={bloqueio.produtor} className="flex flex-col gap-6 disabled:opacity-60">
                                    {bloqueio.produtor && <p className="text-texto-2">Seu cadastro já foi feito. Esses dados não mudam por aqui.</p>}
                                    <Campo rotulo="Seu nome" dica="Até 80 caracteres." erro={erros["produtor.nome"]}>
                                        {(a) => <input {...a} className={ENTRADA} value={dados.nome} maxLength={80} autoComplete="name" onChange={(e) => definir("nome", e.target.value.slice(0, 80), "produtor.nome")} />}
                                    </Campo>
                                    <Campo rotulo="Seu telefone" dica="Com DDD, só números. Ex.: 87999990000" erro={erros["produtor.telefone"]}>
                                        {(a) => <input {...a} className={ENTRADA} value={dados.telefone} maxLength={15} inputMode="numeric" autoComplete="tel" onChange={(e) => definir("telefone", formatarTelefone(e.target.value), "produtor.telefone")} />}
                                    </Campo>
                                    <Campo rotulo="Seu município" erro={erros["produtor.municipioId"]}>
                                        {(a) => (
                                            <select {...a} className={ENTRADA} value={dados.municipioId} onChange={(e) => definir("municipioId", e.target.value, "produtor.municipioId")}>
                                                <option value="">Escolha…</option>
                                                {MUNICIPIOS.map((m) => <option key={m.id} value={m.id}>{m.nome} ({m.uf})</option>)}
                                            </select>
                                        )}
                                    </Campo>
                                    <Escolha rotulo="Como prefere receber os avisos?" opcoes={CANAIS} valor={dados.canalPreferido} onChange={(v) => definir("canalPreferido", v, "produtor.canalPreferido")} erro={erros["produtor.canalPreferido"]} />
                                    <Escolha rotulo="Prefere ouvir ou ler?" opcoes={LEITURA} valor={dados.preferenciaLeitura} onChange={(v) => definir("preferenciaLeitura", v, "produtor.preferenciaLeitura")} erro={erros["produtor.preferenciaLeitura"]} />
                                    <Campo rotulo="Há quantos anos trabalha na roça?" dica="Pode deixar em branco. De 0 a 99 anos completos." erro={erros["produtor.anosExperiencia"]}>
                                        {(a) => <input {...a} type="number" min="0" max="99" step="1" className={ENTRADA} value={dados.anosExperiencia} onChange={(e) => definir("anosExperiencia", e.target.value, "produtor.anosExperiencia")} />}
                                    </Campo>
                                    <Escolha rotulo="Um técnico visita a sua roça?" dica="É a assistência técnica rural." opcoes={SIM_NAO} valor={dados.recebeAter} onChange={(v) => definir("recebeAter", v, "produtor.recebeAter")} erro={erros["produtor.recebeAter"]} />
                                    <div className="flex flex-col gap-2">
                                        <label className="flex cursor-pointer items-start gap-3.5">
                                            <input
                                                type="checkbox"
                                                checked={dados.consentimento}
                                                aria-invalid={Boolean(erros["produtor.consentimento"])}
                                                onChange={(e) => definir("consentimento", e.target.checked, "produtor.consentimento")}
                                                className="mt-1 size-6 shrink-0 cursor-pointer accent-salvia"
                                            />
                                            <span>Aceito que o Argos guarde estes dados para me mandar avisos da minha roça.</span>
                                        </label>
                                        {erros["produtor.consentimento"] && <p role="alert" className="text-[15px] font-semibold text-[#F4A09A]">{erros["produtor.consentimento"]}</p>}
                                    </div>
                                    <label className="flex cursor-pointer items-start gap-3.5">
                                        <input
                                            type="checkbox"
                                            checked={lembrar}
                                            onChange={(e) => setLembrar(e.target.checked)}
                                            className="mt-1 size-6 shrink-0 cursor-pointer accent-salvia"
                                        />
                                        <span>
                                            Lembrar deste aparelho.{" "}
                                            <span className="text-texto-2">Da próxima vez você entra sozinho. Desmarque se o aparelho não é só seu.</span>
                                        </span>
                                    </label>
                                </fieldset>
                            )}

                            {passo === 1 && (
                                <fieldset disabled={bloqueio.propriedade} className="flex flex-col gap-6 disabled:opacity-60">
                                    {bloqueio.propriedade && <p className="text-texto-2">Sua roça já foi cadastrada. Esses dados não mudam por aqui.</p>}
                                    <p className="text-texto-2">A roça fica em {municipioEscolhido ? `${municipioEscolhido.nome} (${municipioEscolhido.uf})` : "seu município"}.</p>
                                    <Campo rotulo="Nome da roça" dica="Ex.: Sítio Boa Esperança. Até 80 caracteres." erro={erros["propriedade.nome"]}>
                                        {(a) => <input {...a} className={ENTRADA} value={dados.propNome} maxLength={80} onChange={(e) => definir("propNome", e.target.value.slice(0, 80), "propriedade.nome")} />}
                                    </Campo>
                                    <Campo rotulo="Tamanho da roça, em hectares" dica="De 0,01 a 100.000 ha; até duas casas decimais." erro={erros["propriedade.areaHa"]}>
                                        {(a) => <input {...a} type="number" min="0.01" max={AREA_MAXIMA_HA} step="0.01" className={ENTRADA} value={dados.propAreaHa} inputMode="decimal" onChange={(e) => definir("propAreaHa", e.target.value, "propriedade.areaHa")} />}
                                    </Campo>
                                    <Campo rotulo="De onde vem a água?" dica="Pode deixar em branco." erro={erros["propriedade.fonteAgua"]}>
                                        {(a) => (
                                            <select {...a} className={ENTRADA} value={dados.fonteAgua} onChange={(e) => definir("fonteAgua", e.target.value, "propriedade.fonteAgua")}>
                                                <option value="">Prefiro não dizer</option>
                                                {FONTES_DE_AGUA.map((o) => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}
                                            </select>
                                        )}
                                    </Campo>
                                    <Campo rotulo="Como irriga?" dica="Pode deixar em branco." erro={erros["propriedade.irrigacao"]}>
                                        {(a) => (
                                            <select {...a} className={ENTRADA} value={dados.irrigacao} onChange={(e) => definir("irrigacao", e.target.value, "propriedade.irrigacao")}>
                                                <option value="">Prefiro não dizer</option>
                                                {IRRIGACOES.map((o) => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}
                                            </select>
                                        )}
                                    </Campo>
                                </fieldset>
                            )}

                            {passo === 2 && (
                                <div className="flex flex-col gap-6">
                                    <p className="text-texto-2">Este passo é opcional: se não for plantar agora, é só terminar.</p>
                                    <Campo rotulo="O que você plantou?" erro={erros["plantio.culturaId"]}>
                                        {(a) => (
                                            <select {...a} className={ENTRADA} value={dados.culturaId} onChange={(e) => definir("culturaId", e.target.value, "plantio.culturaId")}>
                                                <option value="">Não plantei nada ainda</option>
                                                {CULTURAS.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                            </select>
                                        )}
                                    </Campo>
                                    {dados.culturaId && (
                                        <>
                                            <Campo rotulo="Quanto da roça, em hectares?" dica={`Sua roça tem ${dados.propAreaHa || "?"} ha. Use até duas casas decimais.`} erro={erros["plantio.areaHa"]}>
                                                {(a) => <input {...a} type="number" min="0.01" max={lerNumero(dados.propAreaHa) || undefined} step="0.01" className={ENTRADA} value={dados.plantioAreaHa} inputMode="decimal" onChange={(e) => definir("plantioAreaHa", e.target.value, "plantio.areaHa")} />}
                                            </Campo>
                                            <Campo rotulo="Quando plantou?" erro={erros["plantio.dataPlantio"]}>
                                                {(a) => <input {...a} type="date" min={minimoPlantio} max={hoje} className={ENTRADA} value={dados.dataPlantio} onChange={(e) => definir("dataPlantio", e.target.value, "plantio.dataPlantio")} />}
                                            </Campo>
                                            <Campo rotulo="Quando pretende colher?" erro={erros["plantio.dataColheitaPrevista"]}>
                                                {(a) => <input {...a} type="date" min={minimoColheita} max={maximoColheita} className={ENTRADA} value={dados.dataColheita} onChange={(e) => definir("dataColheita", e.target.value, "plantio.dataColheitaPrevista")} />}
                                            </Campo>
                                            <Escolha rotulo="Em que fase está?" opcoes={ESTAGIOS} valor={dados.estagio} onChange={(v) => definir("estagio", v, "plantio.estagio")} erro={erros["plantio.estagio"]} />
                                        </>
                                    )}
                                </div>
                            )}

                            {erroGeral && <AvisoDeTela tipo="erro">{erroGeral}</AvisoDeTela>}

                            <div className="flex flex-wrap gap-3.5">
                                {passo > 0 && (
                                    <button type="button" onClick={() => setPasso(passo - 1)} disabled={enviando} className="min-h-14 cursor-pointer rounded-[14px] border-2 border-linha px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-bege transition-transform duration-150 hover:scale-[1.035] hover:border-bege focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar disabled:opacity-50 motion-reduce:transition-none">
                                        Voltar
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={enviando}
                                    className="min-h-14 cursor-pointer rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
                                >
                                    {enviando ? "Enviando…" : passo < 2 ? "Continuar" : "Terminar"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
