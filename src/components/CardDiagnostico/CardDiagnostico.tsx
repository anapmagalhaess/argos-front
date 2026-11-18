import type { ReactNode } from "react";

/*
    CardDiagnostico: Card para a seção "O Diagnóstico da Realidade".
    Apresenta número/dado em destaque, subtítulo da métrica,
    título em caixa alta, descrição com ênfases e citação da fonte no rodapé.
*/

export interface CardDiagnosticoProps {
  valor: string;
  subtitulo: string;
  titulo: string;
  descricao: ReactNode;
  fonte: string;
  corValor?: "salvia" | "ambar" | "bege" | "nivel-4";
  corHover?: "salvia" | "ambar" | "red";
  valorClassName?: string;
}

const COR_VALOR_MAP: Record<NonNullable<CardDiagnosticoProps["corValor"]>, string> = {
  salvia: "text-salvia",
  ambar: "text-ambar",
  bege: "text-bege",
  "nivel-4": "text-nivel-4",
};

const COR_HOVER_MAP: Record<NonNullable<CardDiagnosticoProps["corHover"]>, string> = {
  salvia: "hover:border-salvia/60",
  ambar: "hover:border-ambar/60",
  red: "hover:border-red-400/60",
};

export default function CardDiagnostico({
  valor,
  subtitulo,
  titulo,
  descricao,
  fonte,
  corValor = "salvia",
  corHover = "salvia",
  valorClassName = "",
}: CardDiagnosticoProps) {
  const classeCorValor = COR_VALOR_MAP[corValor] ?? "text-salvia";
  const classeHover = COR_HOVER_MAP[corHover] ?? "hover:border-salvia/60";

  return (
    <article
      data-reveal
      className={`group relative flex flex-col justify-between rounded-3xl border border-linha bg-card/80 p-7 transition-colors ${classeHover}`}
    >
      <div>
        <div>
          <span
            className={`font-titulo text-5xl font-extrabold leading-none ${classeCorValor} ${valorClassName}`}
          >
            {valor}
          </span>
          <span className="mt-2 block font-mono text-xs text-texto-2">
            {subtitulo}
          </span>
        </div>
        <h3 className="mt-4 font-titulo text-xl font-bold uppercase text-bege">
          {titulo}
        </h3>
        <div className="mt-3 text-sm leading-relaxed text-texto-2">
          {descricao}
        </div>
      </div>
      <footer className="mt-6 border-t border-linha/50 pt-4 font-mono text-[11px] text-texto-2">
        {fonte}
      </footer>
    </article>
  );
}
