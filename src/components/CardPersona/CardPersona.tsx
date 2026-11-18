/*
    CardPersona: Card para a seção "Três olhares sobre a mesma terra" (Público-alvo / Personas).
    Apresenta avatar estilizado, identificação, contexto agrário,
    tópicos de comportamento e atuação do Argos, e badge de validação no rodapé.
*/

export interface TopicoPersona {
  rotulo: string;
  descricao: string;
}

export interface CardPersonaProps {
  iniciais: string;
  nome: string;
  subtitulo: string;
  topicos: TopicoPersona[];
  destaqueRodape: string;
  tema?: "ambar" | "salvia" | "azul";
}

const TEMA_CONFIG = {
  ambar: {
    avatar: "bg-ambar/20 border-ambar/40 text-ambar",
    glow: "bg-amber-500/5",
    rodape: "text-salvia",
  },
  salvia: {
    avatar: "bg-salvia/20 border-salvia/40 text-salvia",
    glow: "bg-salvia/5",
    rodape: "text-ambar",
  },
  azul: {
    avatar: "bg-blue-500/20 border-blue-400/40 text-blue-300",
    glow: "bg-blue-500/5",
    rodape: "text-bege",
  },
};

export default function CardPersona({
  iniciais,
  nome,
  subtitulo,
  topicos,
  destaqueRodape,
  tema = "ambar",
}: CardPersonaProps) {
  const config = TEMA_CONFIG[tema] ?? TEMA_CONFIG.ambar;

  return (
    <article
      data-reveal
      className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-linha bg-fundo p-7"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full blur-xl ${config.glow}`}
      />

      <div>
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border font-titulo text-xl font-bold ${config.avatar}`}
          >
            {iniciais}
          </div>
          <div>
            <h3 className="font-titulo text-xl font-bold uppercase text-bege">
              {nome}
            </h3>
            <p className="text-xs text-texto-2">{subtitulo}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-sm text-texto-2">
          {topicos.map((topico) => (
            <p key={topico.rotulo}>
              <strong className="text-bege">{topico.rotulo}:</strong>{" "}
              {topico.descricao}
            </p>
          ))}
        </div>
      </div>

      <footer className={`mt-6 border-t border-linha/50 pt-4 text-xs font-semibold ${config.rodape}`}>
        {destaqueRodape}
      </footer>
    </article>
  );
}
