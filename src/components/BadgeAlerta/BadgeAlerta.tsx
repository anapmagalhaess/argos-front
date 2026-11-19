import IconeFA from "../IconeFA/IconeFA";
import type { NomeIconeFA } from "../IconeFA/IconeFA";

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

const ICONE_NIVEL: Record<NivelAlerta, NomeIconeFA> = {
    1: "circle-check",
    2: "circle-exclamation",
    3: "triangle-exclamation",
    4: "skull-crossbones",
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
        <IconeFA nome={ICONE_NIVEL[nivel]} className={`shrink-0 transition-transform duration-200 group-hover:scale-[1.12] group-hover:-rotate-6 motion-reduce:transition-none ${medidas.icone}`} />

        <span>
            {mostrarNumero ? `${nivel} · ` : ""}
            {texto}
        </span>
    </div>
    );
}
