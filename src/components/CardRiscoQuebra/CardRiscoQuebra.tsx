import { useEffect, useState } from "react";
import BadgeAlerta from "../BadgeAlerta/BadgeAlerta";
import { preverProdutividade, preverRiscoQuebra } from "../../services/predicaoService";
import type { EntradaPredicao, NivelRisco, RespostaProdutividade, RespostaRiscoQuebra } from "../../types/predicao";

/*
    CardRiscoQuebra: card "risco de quebra" da tela Hoje (BÔNUS da GS).
    Pede as duas previsões à API Flask e mostra o resultado com cor + ícone + palavra.
    Se a Flask estiver desligada, mostra um erro só dentro do card: o resto da tela continua funcionando.
*/

interface CardRiscoQuebraProps {
    /** Clima da safra que vai para os modelos (uma linha do dataset_argos.csv). */
    entrada: EntradaPredicao;
    /** De onde vieram os números, para o produtor saber o que está vendo. */
    legenda: string;
}

/* O risco vira um dos níveis de aviso do Argos (os mesmos do BadgeAlerta). */
const NIVEL_DO_RISCO: Record<NivelRisco, { nivel: 1 | 2 | 3; texto: string }> = {
    BAIXO: { nivel: 1, texto: "Risco baixo" },
    MEDIO: { nivel: 2, texto: "Risco médio" },
    ALTO: { nivel: 3, texto: "Risco alto" },
};

export default function CardRiscoQuebra({ entrada, legenda }: CardRiscoQuebraProps) {
    // Os três estados de toda busca na API: carregando, erro e dados.
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [risco, setRisco] = useState<RespostaRiscoQuebra | null>(null);
    const [produtividade, setProdutividade] = useState<RespostaProdutividade | null>(null);
    // Mudar este número faz o efeito rodar de novo (botão "Tentar de novo").
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        // AbortController cancela o pedido se a pessoa sair da tela antes da resposta.
        const controle = new AbortController();

        async function buscarPrevisoes() {
            try {
                const respostaRisco = await preverRiscoQuebra(entrada, controle.signal);
                const respostaProdutividade = await preverProdutividade(entrada, controle.signal);
                setRisco(respostaRisco);
                setProdutividade(respostaProdutividade);
            } catch (falha) {
                if (controle.signal.aborted) return;
                // TypeError ("Failed to fetch") = a Flask não respondeu (desligada ou sem CORS).
                if (falha instanceof TypeError) setErro("A previsão da IA está desligada.");
                else if (falha instanceof Error) setErro(falha.message);
                else setErro("Erro desconhecido.");
            } finally {
                if (!controle.signal.aborted) setCarregando(false);
            }
        }

        buscarPrevisoes();
        return () => controle.abort();
    }, [entrada, tentativa]);

    function tentarDeNovo() {
        setErro(null);
        setCarregando(true);
        setTentativa(tentativa + 1);
    }

    return (
        <section aria-labelledby="titulo-risco" className="rounded-3xl border border-linha bg-card p-6 text-bege sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 id="titulo-risco" className="font-titulo text-2xl font-bold">Risco de quebra da safra</h2>
                <span className="text-sm font-semibold uppercase tracking-[.12em] text-salvia">Previsão da IA</span>
            </div>

            {/* aria-live: o leitor de tela avisa quando o resultado ou o erro aparecem */}
            <div aria-live="polite" className="mt-5">
                {carregando && (
                    <p role="status" className="flex items-center gap-3 text-lg text-texto-2">
                        <span aria-hidden="true" className="h-6 w-6 animate-spin rounded-full border-[3px] border-linha border-t-salvia motion-reduce:animate-none" />
                        Calculando o risco...
                    </p>
                )}

                {!carregando && erro && (
                    <div className="flex flex-col gap-4">
                        <p className="text-lg">
                            Não deu para calcular o risco agora. {erro}
                            <span className="block text-texto-2">Os avisos do seu município continuam valendo.</span>
                        </p>
                        <button
                            type="button"
                            onClick={tentarDeNovo}
                            className="min-h-12 self-start rounded-[14px] border-2 border-salvia px-6 font-titulo text-[15px] font-semibold uppercase tracking-[.04em] text-salvia transition-colors hover:bg-salvia hover:text-fundo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar"
                        >
                            Tentar de novo
                        </button>
                    </div>
                )}

                {!carregando && !erro && risco && produtividade && (
                    <ResultadoRisco risco={risco} produtividade={produtividade} />
                )}
            </div>
        </section>
    );
}

interface ResultadoRiscoProps {
    risco: RespostaRiscoQuebra;
    produtividade: RespostaProdutividade;
}

function ResultadoRisco({ risco, produtividade }: ResultadoRiscoProps) {
    // Se a Flask mandar um valor fora da lista, mostra o texto dela em amarelo (atenção).
    const visual = NIVEL_DO_RISCO[risco.risco] ?? { nivel: 2, texto: `Risco ${risco.risco}` };
    const porcentagem = Math.round(risco.probabilidade * 100);
    const kgPorHectare = Math.round(produtividade.kg_ha_previsto).toLocaleString("pt-BR");

    return (
        <div className="flex flex-col gap-4">
            <BadgeAlerta nivel={visual.nivel} titulo={visual.texto} tamanho="compacto" className="self-start" />
            <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                    <dt className="text-[15px] text-texto-2">Chance de quebra</dt>
                    <dd className="font-titulo text-3xl font-bold">{porcentagem}%</dd>
                </div>
                <div>
                    <dt className="text-[15px] text-texto-2">Colheita prevista</dt>
                    <dd className="font-titulo text-3xl font-bold">
                        {kgPorHectare} <span className="text-lg font-semibold">kg por hectare</span>
                    </dd>
                </div>
            </dl>
            <p className="text-[15px] text-texto-2">Modelos: {risco.modelo} e {produtividade.modelo}.</p>
        </div>
    );
}
