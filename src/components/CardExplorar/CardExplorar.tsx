import { Link } from "react-router-dom";

/*
    CardExplorar: Atalho da seção "Explore o Argos" (Triagem, Hoje, Guia...).
*/

interface CardExplorarProps {
    titulo: string;
    descricao: string;

    /** Texto do convite no rodapé do card, ex.: "COMEÇAR →". */
    chamada: string;
    /** Rota de destino, ex.: "/triagem". */
    para: string;
}

export default function CardExplorar({
    titulo,
    descricao,
    chamada,
    para,
}: CardExplorarProps) {
    return (
        <Link
        to={para}
        className="group flex min-h-40 flex-col gap-2.5 rounded-[20px] border border-linha bg-fundo p-6 text-bege transition-colors hover:border-salvia focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ambar">
        <b className="font-titulo text-[22px] font-semibold">{titulo}</b>
        <span className="text-base text-texto-2">{descricao}</span>
        <i className="mt-auto text-[15px] font-semibold not-italic tracking-[0.08em] text-salvia transition-transform group-hover:translate-x-1">{chamada}</i>
        </Link>
    );
}