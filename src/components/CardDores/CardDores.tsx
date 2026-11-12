/*
    CardDores: Cards da seção "Quem planta decide no escuro".
    Estrutura: número, título, texto
*/

interface CardDoresProps {
    /* Numeração em texto ("01"), para manter o zero à esquerda. */
    numero: string;
    titulo: string;
    descricao: string;
}

export default function CardDores({ numero, titulo, descricao }: CardDoresProps) {
    return (
        // A seção da dor tem fundo bege; o card é escuro para criar contraste.
        <article className="rounded-3xl bg-fundo p-7 text-bege">
        {/* Âmbar é a cor de destaque neutra: não confunde com alerta. */}
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ambar">{numero}</p>
            <h3 className="mt-2.5 font-titulo text-2xl font-semibold text-bege">{titulo}</h3>
            <p className="mt-2.5 text-texto-2">{descricao}</p>
        </article>
    );
}