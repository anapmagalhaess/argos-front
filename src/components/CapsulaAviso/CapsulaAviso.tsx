import type { ReactNode } from "react";

/*
    CapsulaAviso: Capsulas de avisos da página Sobre
    chuva, seca, calor, geada, enchente, vento e praga
    com icones indicativos
*/

export type TipoAviso = "chuva" | "seca" | "calor" | "geada" | "enchente" | "vento" | "praga";

type Aviso = {
    nome: string;
    tipo: TipoAviso;
    estilo: string;
};

const iconesAviso: Record<TipoAviso, ReactNode> = {
    chuva: <><path d="M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 1 8.9"/><path d="m9 20-1 2m6-2-1 2m6-2-1 2"/></>,
    seca: <><circle cx="12" cy="9" r="4"/><path d="M12 1v2m0 12v2M4 9h2m12 0h2M6.3 3.3l1.4 1.4m8.6 8.6 1.4 1.4M17.7 3.3l-1.4 1.4M7.7 12.3l-1.4 1.4M3 21h18m-8-4-2 4m4-4 2 4"/></>,
    calor: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/></>,
    geada: <><path d="M12 2v20m-8.7-15 17.4 10m0-10L3.3 17m5.2-9 3.5 2 3.5-2m-7 11 3.5-2 3.5 2"/></>,
    enchente: <><path d="M2 7c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 12c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 17c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/></>,
    vento: <><path d="M3 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M4 16h7a3 3 0 1 1-3 3"/></>,
    praga: <><ellipse cx="12" cy="13" rx="4" ry="6"/><path d="M12 7V4m-4 5L5 7m11 2 3-2m-11 8-3 2m11-2 3 2M9 4l3 2 3-2"/></>,
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
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] shrink-0 max-[760px]:h-[17px] max-[760px]:w-[17px] max-[500px]:h-4 max-[500px]:w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {iconesAviso[aviso.tipo]}
            </svg>
            {aviso.nome}
        </span>
    );
}
