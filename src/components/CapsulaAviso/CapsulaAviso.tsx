import IconeFA from "../IconeFA/IconeFA";
import type { NomeIconeFA } from "../IconeFA/IconeFA";

export type TipoAviso = "chuva" | "seca" | "calor" | "geada" | "enchente" | "vento" | "praga";

type Aviso = {
    nome: string;
    tipo: TipoAviso;
    estilo: string;
};

const iconesAviso: Record<TipoAviso, NomeIconeFA> = {
    chuva: "cloud-rain",
    seca: "sun",
    calor: "temperature-high",
    geada: "snowflake",
    enchente: "water",
    vento: "wind",
    praga: "bug",
};

export const avisos: Aviso[] = [
    { nome: "Chuva forte", tipo: "chuva", estilo: "bg-fundo text-bege" },
    { nome: "Seca", tipo: "seca", estilo: "border-2 border-fundo text-fundo" },
    { nome: "Calor", tipo: "calor", estilo: "bg-mata text-bege" },
    { nome: "Geada", tipo: "geada", estilo: "border-2 border-fundo text-fundo" },
    { nome: "Enchente", tipo: "enchente", estilo: "bg-fundo text-bege" },
    { nome: "Vento", tipo: "vento", estilo: "border-2 border-fundo text-fundo" },
    { nome: "Praga", tipo: "praga", estilo: "bg-mata text-bege" },
];

export default function CapsulaAviso({ aviso }: { aviso: Aviso }) {
    return (
        <span className={`inline-flex h-[42px] items-center justify-center gap-2 rounded-full px-[22px] text-center text-base font-semibold max-[760px]:h-[38px] max-[760px]:gap-1.5 max-[760px]:px-[14px] max-[760px]:text-[14px] max-[500px]:h-[34px] max-[500px]:gap-1.5 max-[500px]:px-3 max-[500px]:text-[13px] max-[500px]:leading-none ${aviso.estilo}`}>
            <IconeFA nome={iconesAviso[aviso.tipo]} className="h-[18px] w-[18px] shrink-0 max-[760px]:h-[17px] max-[760px]:w-[17px] max-[500px]:h-4 max-[500px]:w-4" />
            {aviso.nome}
        </span>
    );
}
