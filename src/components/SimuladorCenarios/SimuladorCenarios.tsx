import { useState } from "react";
import BadgeAlerta, { type NivelAlerta } from "../BadgeAlerta/BadgeAlerta";

/*
    SimuladorCenarios: Componente interativo de demonstração dos cenários reais do argos
    Permite alternar entre perfis de agricultores (Dona Cida / Seu Valdir),
    exibe o diagnóstico de Machine Learning e permite sintetizar a leitura
    por voz via Web Speech API (SpeechSynthesisUtterance).
*/

export type CenarioSimulado = "cida" | "valdir";

export interface DetalhesCenario {
  id: CenarioSimulado;
  produtor: string;
  idade: number;
  localidade: string;
  culturas: string[];
  area: string;
  condicaoAcesso: string;
  desafioClima: string;
  alertaNivel: NivelAlerta;
  alertaTitulo: string;
  alertaMensagem: string;
  audioTexto: string;
  fonteOficial: string;
  acaoRecomendada: string;
  previsaoIA: {
    rendimentoEstimado: string;
    riscoQuebra: string;
    probabilidade: string;
  };
  impactoEvitado: string;
}

// Personas & Dados
export const CENARIOS: Record<CenarioSimulado, DetalhesCenario> = {
  //Cida
  cida: {
    id: "cida",
    produtor: "Dona Cida",
    idade: 58,
    localidade: "Petrolina / PE (Sertão do São Francisco)",
    culturas: ["Feijão-caupi", "Milho de sequeiro", "Mandioca"],
    area: "3,0 hectares",
    condicaoAcesso:
      "Letramento restrito (prefere áudio); celular compartilhado com sinal 3G fraco; sem assistência técnica prévia.",
    desafioClima:
      "Estiagem severa e ondas de calor aceleradas pelo El Niño de 2026, com escassez de água na cisterna.",
    alertaNivel: 3,
    alertaTitulo: "Perigo de Seca e Calor Extremo",
    alertaMensagem:
      "Sem previsão de chuva nos próximos 12 dias. Temperaturas acima de 36°C com baixa umidade do solo.",
    audioTexto:
      "Atenção Dona Cida. Perigo de seca em Petrolina. Não semeie milho nesta semana. Guarde a água da cisterna e cubra o solo com palha para reter a umidade.",
    fonteOficial: "INMET / CEMADEN (Monitor de Secas)",
    acaoRecomendada:
      "Suspender semeadura de sequeiro imediata, priorizar retenção de água em mulching/cobertura vegetal e vedar reservatórios comunitários.",
    previsaoIA: {
      rendimentoEstimado: "680 kg/ha (redução projetada de 42%)",
      riscoQuebra: "ALTO RISCO",
      probabilidade: "78% de chance de quebra se plantado agora",
    },
    impactoEvitado:
      "Economia de até R$ 4.200 em sementes e insumos que seriam calcinados pelo solo quente sem germinação.",
  },
  //Valdir
  valdir: {
    id: "valdir",
    produtor: "Seu Valdir",
    idade: 46,
    localidade: "Bento Gonçalves / RS (Serra Gaúcha)",
    culturas: ["Milho", "Uva para cooperativa"],
    area: "18,0 hectares",
    condicaoAcesso:
      "Lê bem, mas com rotina diária densa no campo; internet oscilante nos vales da serra.",
    desafioClima:
      "Excesso de precipitação torrencial e alta umidade relativa contínua promovida pelo padrão El Niño no Sul.",
    alertaNivel: 2,
    alertaTitulo: "Atenção: Chuva Torrencial e Risco de Míldio",
    alertaMensagem:
      "Acumulado de 140 mm projetado para 48h. Risco alto de encharcamento e desenvolvimento fúngico foliar.",
    audioTexto:
      "Atenção Seu Valdir. Chuvas fortes nos próximos dois dias na Serra Gaúcha. Drene as linhas baixas da lavoura e aplique caldas de proteção antes do temporal.",
    fonteOficial: "Defesa Civil / CEMADEN / Embrapa Uva e Vinho",
    acaoRecomendada:
      "Desobstruir drenos de escoamento rápido na encosta e antecipar aplicação de fungicida protetor de contato antes da lâmina d'água.",
    previsaoIA: {
      rendimentoEstimado: "4.850 kg/ha no milho (dentro da média se drenado)",
      riscoQuebra: "MÉDIO RISCO FÚNGICO",
      probabilidade: "62% de incidência fúngica sem manejo preventivo",
    },
    impactoEvitado:
      "Preservação de até 35% dos cachos de uva que poderiam apodrecer na videira antes da maturação.",
  },
};

export default function SimuladorCenarios() {
  const [cenarioAtivo, setCenarioAtivo] = useState<CenarioSimulado>("cida");
  const [estaOuvindo, setEstaOuvindo] = useState(false);

  const cenario = CENARIOS[cenarioAtivo];


  const falarAlerta = (texto: string) => {
    // Verificação de suporte do navegador 
    if (!("speechSynthesis" in window)) {
      alert("Seu navegador não suporta sintetizador de voz nativo.");
      return;
    }
    //  Interrupção imediata de áudio prévio
    window.speechSynthesis.cancel();
    // Comportamento de Toggle: se já estava lendo, para a leitura
    if (estaOuvindo) {
      setEstaOuvindo(false);
      return;
    }
    // Instanciação e parametrização da voz
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "pt-BR"; // Define o idioma para português brasileiro
    utter.rate = 0.95; // Cadência levemente reduzida (95%) para maior clareza

     // Tratamento de ciclo de vida (eventos assíncronos)
    utter.onend = () => setEstaOuvindo(false);
    utter.onerror = () => setEstaOuvindo(false);

    // Atualização do estado e disparo da reprodução
    setEstaOuvindo(true);
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
      <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-salvia">
            Demonstração Interativa
          </span>
          <h2 className="mt-2 font-titulo text-[clamp(32px,3.8vw,50px)] font-extrabold uppercase leading-[1.08] text-bege">
            Simule o copiloto em dois cenários reais
          </h2>
          <p className="mt-3 max-w-[680px] text-base text-texto-2">
            Selecione abaixo o perfil para ver como o modelo de inteligência artificial, o algoritmo de triagem e o sintetizador de voz reagem aos dados meteorológicos oficiais.
          </p>
        </div>

        {/* Alternador de Cenários */}
        <div className="flex shrink-0 rounded-2xl border border-linha bg-card p-1.5">
          <button
            type="button"
            onClick={() => {
              setCenarioAtivo("cida");
              if (estaOuvindo) window.speechSynthesis.cancel();
              setEstaOuvindo(false);
            }}
            className={`rounded-xl px-5 py-2.5 font-titulo text-sm font-semibold uppercase tracking-wider transition-all ${
              cenarioAtivo === "cida"
                ? "bg-salvia text-fundo shadow-md"
                : "text-texto-2 hover:text-bege"
            }`}
          >
            Dona Cida (Sertão PE)
          </button>
          <button
            type="button"
            onClick={() => {
              setCenarioAtivo("valdir");
              if (estaOuvindo) window.speechSynthesis.cancel();
              setEstaOuvindo(false);
            }}
            className={`rounded-xl px-5 py-2.5 font-titulo text-sm font-semibold uppercase tracking-wider transition-all ${
              cenarioAtivo === "valdir"
                ? "bg-salvia text-fundo shadow-md"
                : "text-texto-2 hover:text-bege"
            }`}
          >
            Seu Valdir (Serra RS)
          </button>
        </div>
      </div>

      {/* Painel do Simulador Dinâmico */}
      <div
        data-reveal
        className="mt-10 rounded-[32px] border-2 border-linha/90 bg-card p-6 shadow-[0_30px_70px_rgba(0,0,0,0.55)] md:p-10"
      >
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Esquerda: Informações do Contexto e da Roça */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-salvia" />
                <span className="font-mono text-xs uppercase tracking-wider text-salvia">
                  Perfil da Propriedade no Banco
                </span>
              </div>
              <h3 className="mt-2 font-titulo text-2xl font-bold uppercase text-bege">
                {cenario.produtor} ({cenario.idade} anos)
              </h3>
              <p className="mt-1 text-sm text-texto-2">{cenario.localidade}</p>
            </div>

            <div className="space-y-3 rounded-2xl border border-linha/80 bg-fundo/70 p-5 text-sm">
              <div className="flex justify-between border-b border-linha/40 py-1">
                <span className="text-texto-2">Área Declarada:</span>
                <span className="font-semibold text-bege">{cenario.area}</span>
              </div>
              <div className="flex justify-between border-b border-linha/40 py-1">
                <span className="text-texto-2">Culturas:</span>
                <span className="font-semibold text-bege">
                  {cenario.culturas.join(", ")}
                </span>
              </div>
              <div className="flex flex-col border-b border-linha/40 py-1">
                <span className="text-texto-2">Condição de Acesso:</span>
                <span className="mt-1 text-xs text-bege">
                  {cenario.condicaoAcesso}
                </span>
              </div>
              <div className="flex flex-col py-1">
                <span className="text-texto-2">Desafio Meteorológico:</span>
                <span className="mt-1 text-xs font-medium text-ambar">
                  {cenario.desafioClima}
                </span>
              </div>
            </div>

            {/* Bloco de Predição de Machine Learning */}
            <div className="rounded-2xl border border-salvia/30 bg-mata/20 p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-salvia">
                  Módulo de IA Preditiva
                </span>
                <span className="rounded bg-salvia/30 px-2 py-0.5 font-mono text-[10px] text-salvia">
                  joblib / Scikit-Learn
                </span>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-texto-2">Rendimento Esperado: </span>
                  <strong className="text-bege">
                    {cenario.previsaoIA.rendimentoEstimado}
                  </strong>
                </div>
                <div>
                  <span className="text-texto-2">Classificação de Quebra: </span>
                  <strong className="font-bold text-amber-400">
                    {cenario.previsaoIA.riscoQuebra}
                  </strong>
                </div>
                <div>
                  <span className="text-texto-2">Probabilidade Estimada: </span>
                  <span className="text-bege">
                    {cenario.previsaoIA.probabilidade}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Direita: O Copiloto Digital em Ação */}
          <div className="flex flex-col gap-6 rounded-3xl border-2 border-linha/90 bg-fundo p-6 shadow-inner md:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-linha/60 pb-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-texto-2">
                  Painel de Alerta Ativo
                </span>
                <h4 className="font-titulo text-xl font-bold uppercase text-bege">
                  Aviso em Linguagem Simples
                </h4>
              </div>
              <button
                type="button"
                onClick={() => falarAlerta(cenario.audioTexto)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  estaOuvindo
                    ? "animate-pulse border-red-500 bg-red-950/40 text-red-300"
                    : "border-salvia bg-salvia/20 text-salvia hover:bg-salvia hover:text-fundo"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                {estaOuvindo ? "Parar Leitura" : "Ouvir em Voz Alta"}
              </button>
            </div>

            {/* Badge Alerta Oficial */}
            <div>
              <BadgeAlerta
                nivel={cenario.alertaNivel}
                titulo={cenario.alertaTitulo}
                tamanho="grande"
                className="w-full justify-start text-lg"
              />
              <p className="mt-3 pl-2 text-base text-bege">
                {cenario.alertaMensagem}
              </p>
            </div>

            {/* Ação Prática Recomendada */}
            <div className="rounded-2xl border border-linha bg-card/80 p-5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ambar">
                <span>💡 Orientação Prática Imediata</span>
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-bege">
                {cenario.acaoRecomendada}
              </p>
            </div>

            {/* Impacto Financeiro Evitado & Fonte Oficial */}
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              <div className="rounded-xl border border-linha/60 bg-card/40 p-3.5">
                <span className="block font-mono text-[11px] uppercase text-texto-2">
                  Impacto Econômico Evitado:
                </span>
                <span className="mt-1 block text-xs font-semibold text-salvia">
                  {cenario.impactoEvitado}
                </span>
              </div>
              <div className="rounded-xl border border-linha/60 bg-card/40 p-3.5">
                <span className="block font-mono text-[11px] uppercase text-texto-2">
                  Fonte Oficial Auditada:
                </span>
                <span className="mt-1 block text-xs font-semibold text-bege">
                  {cenario.fonteOficial}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
