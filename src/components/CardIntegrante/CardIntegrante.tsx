import { useState } from "react";
import type { Integrante } from "../../types/integrante";

/*
    CardIntegrante: cartão de um integrante na página Integrantes.
    Em cima, a foto em retrato (ou as iniciais, se a foto faltar ou não carregar).
    Embaixo, a área no projeto, o nome, as matérias e os selos de turma e RM.
*/

type CardIntegranteProps = Integrante;

/* "Gabriel Ricardo Gomes Lima" vira "GL": primeira letra do primeiro e do último nome. */
function pegarIniciais(nome: string): string {
    const partes = nome.trim().split(/\s+/);
    const primeira = partes[0]?.charAt(0) ?? "";
    const ultima = partes.length > 1 ? partes[partes.length - 1].charAt(0) : "";
    return (primeira + ultima).toUpperCase();
}

export default function CardIntegrante({ rm, nome, turma, funcao, materias, foto }: CardIntegranteProps) {
    // Se o arquivo da foto não abrir, o card troca a imagem quebrada pelas iniciais.
    const [fotoFalhou, setFotoFalhou] = useState(false);
    const mostrarFoto = Boolean(foto) && !fotoFalhou;

    return (
        <article
            data-reveal
            className="group flex w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-linha bg-card transition-colors duration-300 hover:border-salvia/60"
        >
            {/* Moldura da foto: sempre em retrato (4:5), para os 5 cartões ficarem do mesmo tamanho. */}
            <div className="relative aspect-4/5 overflow-hidden bg-terra-fundo">
                {mostrarFoto ? (
                    <img
                        src={foto}
                        alt={`Foto de ${nome}`}
                        width={480}
                        height={600}
                        loading="lazy"
                        onError={() => setFotoFalhou(true)}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                ) : (
                    // As iniciais são enfeite: o nome completo já está escrito no cartão.
                    <div
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(125,190,140,.18),transparent_65%)]"
                    >
                        <span className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-salvia/70 font-titulo text-4xl font-bold text-salvia">
                            {pegarIniciais(nome)}
                        </span>
                    </div>
                )}
                {/* Escurece a base da foto para o card "sair" dela sem corte seco. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-card to-transparent" />
            </div>

            <div className="flex flex-1 flex-col gap-4 px-5 pt-2 pb-6">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[.12em] text-salvia">{funcao}</p>
                    <h2 className="mt-1 font-titulo text-[22px] leading-tight font-bold text-bege">{nome}</h2>
                </div>

                <div>
                    <p className="text-sm font-semibold uppercase tracking-[.12em] text-texto-2">Responsável por</p>
                    <ul className="mt-1 space-y-0.5 text-lg leading-snug text-bege">
                        {materias.map((materia) => (
                            <li key={materia}>{materia}</li>
                        ))}
                    </ul>
                </div>

                {/* Turma e RM em selos. A lista de definição liga cada rótulo ao valor (leitor de tela). */}
                <dl className="mt-auto flex flex-wrap gap-2 pt-1">
                    <div className="flex items-center gap-1.5 rounded-full border border-linha px-3 py-1.5">
                        <dt className="text-sm font-semibold uppercase tracking-[.08em] text-texto-2">Turma</dt>
                        <dd className="font-semibold text-bege">{turma}</dd>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-linha px-3 py-1.5">
                        <dt className="text-sm font-semibold uppercase tracking-[.08em] text-texto-2">RM</dt>
                        <dd className="font-semibold text-bege">{rm}</dd>
                    </div>
                </dl>
            </div>
        </article>
    );
}
