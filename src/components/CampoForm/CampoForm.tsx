import { useId } from "react";
import type { ReactElement, ReactNode } from "react";
import type { Opcao } from "../../data/opcoes";

/*
    Peças dos formulários do Argos: o campo com rótulo, dica e erro (Campo) e o grupo de botões
    de escolha (Escolha). Usam a paleta do projeto e deixam o erro ligado ao campo (aria-describedby),
    para o leitor de tela ler junto.
*/

// Classes do <input> e do <select>: alvo de toque grande (56px) e borda que acende no foco.
export const ENTRADA =
    "min-h-14 w-full rounded-[14px] border-2 border-linha bg-card px-4 text-bege placeholder:text-texto-2/60 focus:border-salvia focus-visible:outline-none aria-[invalid=true]:border-nivel-4";

interface CampoProps {
    rotulo: string;
    /* Frase curta embaixo do rótulo, para dizer o que escrever */
    dica?: string;
    erro?: string;
    /* Recebe os atributos de acessibilidade já prontos: id, aria-invalid e aria-describedby */
    children: (atributos: { id: string; "aria-invalid": boolean; "aria-describedby": string | undefined }) => ReactElement;
}

export function Campo({ rotulo, dica, erro, children }: CampoProps) {
    const id = useId();
    const idMensagem = `${id}-msg`;
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="font-semibold text-bege">
                {rotulo}
            </label>
            {dica && <p className="-mt-1 text-[15px] text-texto-2">{dica}</p>}
            {children({ id, "aria-invalid": Boolean(erro), "aria-describedby": erro ? idMensagem : undefined })}
            {erro && (
                <p id={idMensagem} role="alert" className="text-[15px] font-semibold text-[#F4A09A]">
                    {erro}
                </p>
            )}
        </div>
    );
}

interface EscolhaProps {
    rotulo: string;
    opcoes: Opcao[];
    valor: string;
    onChange: (valor: string) => void;
    erro?: string;
    dica?: string;
}

/* Escolha entre poucas opções, em botões grandes (melhor que uma lista para quem usa o celular). */
export function Escolha({ rotulo, opcoes, valor, onChange, erro, dica }: EscolhaProps) {
    const id = useId();
    return (
        <div role="group" aria-labelledby={id} className="flex flex-col gap-2">
            <span id={id} className="font-semibold text-bege">
                {rotulo}
            </span>
            {dica && <p className="-mt-1 text-[15px] text-texto-2">{dica}</p>}
            <div className="flex flex-wrap gap-2.5">
                {opcoes.map((opcao) => {
                    const ativa = opcao.valor === valor;
                    return (
                        <button
                            key={opcao.valor}
                            type="button"
                            aria-pressed={ativa}
                            onClick={() => onChange(opcao.valor)}
                            className={`min-h-12 cursor-pointer rounded-full border-2 px-5 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar motion-reduce:transition-none ${
                                ativa
                                    ? "border-salvia bg-salvia text-fundo"
                                    : "border-linha text-bege hover:border-bege"
                            }`}
                        >
                            {opcao.rotulo}
                        </button>
                    );
                })}
            </div>
            {erro && (
                <p role="alert" className="text-[15px] font-semibold text-[#F4A09A]">
                    {erro}
                </p>
            )}
        </div>
    );
}

interface CartaoDeAvisoProps {
    tipo: "erro" | "carregando";
    children: ReactNode;
    acao?: { rotulo: string; aoClicar: () => void };
}

/* Aviso de tela: "buscando..." ou o erro de uma chamada, com um botão para tentar de novo. */
export function AvisoDeTela({ tipo, children, acao }: CartaoDeAvisoProps) {
    return (
        <div
            role={tipo === "erro" ? "alert" : "status"}
            className={`flex flex-wrap items-center gap-4 rounded-2xl border-2 px-5 py-4 ${
                tipo === "erro" ? "border-nivel-4 bg-terra-fundo" : "border-linha bg-card"
            }`}
        >
            <p className="min-w-0 flex-1 text-bege">{children}</p>
            {acao && (
                <button
                    type="button"
                    onClick={acao.aoClicar}
                    className="min-h-12 cursor-pointer rounded-full border-2 border-bege px-6 font-titulo font-semibold uppercase tracking-[0.04em] text-bege transition-colors hover:bg-bege hover:text-fundo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar motion-reduce:transition-none"
                >
                    {acao.rotulo}
                </button>
            )}
        </div>
    );
}
