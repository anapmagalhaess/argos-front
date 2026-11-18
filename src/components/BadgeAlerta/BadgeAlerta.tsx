import type { ReactNode } from "react";

/*
    BadgeAlerta: bloco de aviso
    na seção dos 4 níveis (tamanho "grande")
*/

// Os 4 níveis combinam com nv_severidade (1 a 4) do banco e da API.
export type NivelAlerta = 1 | 2 | 3 | 4;
type Tamanho = "grande" | "compacto";

interface BadgeAlertaProps {
    nivel: NivelAlerta;
    /* Texto do aviso. Se faltar, usa o rótulo padrão do nível ("Atenção", etc.). */

    titulo?: string;
    /* Mostra "3 · " antes do texto (útil na legenda dos níveis). */

    mostrarNumero?: boolean;
    tamanho?: Tamanho;
    className?: string;
}

/*
    Texto escuro no amarelo/laranja e branco no verde/vermelho: é o que passa
    de 4,5:1 de contraste (exigência do guia).
    O nível 4 ganha borda dupla: o aviso não depende só da cor (acessibilidade).
*/

const PADRAO: Record<NivelAlerta, { rotulo: string; classes: string }> = {
    1: { rotulo: "Tudo certo", classes: "bg-nivel-1 text-white" },
    2: { rotulo: "Atenção", classes: "bg-nivel-2 text-fundo" },
    3: { rotulo: "Perigo", classes: "bg-nivel-3 text-fundo" },
    4: { rotulo: "Grande perigo", classes: "bg-nivel-4 text-white border-4 border-double border-bege"}
};

// 2 tamanhos: mudam só espaçamento e fonte.

const TAMANHOS: Record<Tamanho, { caixa: string; icone: string }> = {
    grande: { caixa: "gap-3 rounded-2xl px-5 py-4 font-titulo text-xl uppercase tracking-wide", icone: "h-7 w-7"},
    compacto: { caixa: "gap-2.5 rounded-xl px-3 py-2 text-[15px]", icone: "h-[22px] w-[22px]"},
};

// Os traços do ícone de cada nível. Cada nível tem um FORMATO diferente

// (círculo com visto, círculo com "!", triângulo, octógono): cor + desenho + palavra.
const TRACOS: Record<NivelAlerta, ReactNode> = {
    // Tudo Certo
    1: (
        <>
        <circle cx="12" cy="12" r="10" />
        <path d="m7.5 12.5 3 3 6-7" />
        </>
    ),
    // Atencao
    2: (
        <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 7v6M12 16.5v.5" />
        </>
    ),
    // Perigo
    3: (
        <>
        <path d="M12 3 2 20h20z" />
        <path d="M12 10v4.5M12 17.5v.5" />
        </>
    ),
    // Grande Perigo
    4: (
        <>
        <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z" />
        <path d="M12 7v6M12 16.5v.5" />
        </>
    ),
};

export default function BadgeAlerta({
    nivel,
    titulo,
    mostrarNumero = false,
    tamanho = "grande",
    className = "",

}: BadgeAlertaProps) {
    const { rotulo, classes } = PADRAO[nivel];
    const medidas = TAMANHOS[tamanho];
    const texto = titulo ?? rotulo;

    return (
    <div data-reveal className={`group flex items-center font-semibold ${classes} ${medidas.caixa} ${className}`}>
        {/* stroke="currentColor": o ícone herda a cor do texto */}
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-200 group-hover:scale-[1.12] group-hover:-rotate-6 motion-reduce:transition-none ${medidas.icone}`}>
            {TRACOS[nivel]}
        </svg>

        <span>
            {mostrarNumero ? `${nivel} · ` : ""}
            {texto}
        </span>
    </div>
    );
}