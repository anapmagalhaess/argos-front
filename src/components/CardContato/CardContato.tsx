import IconeFA from "../IconeFA/IconeFA";
import type { NomeIconeFA } from "../IconeFA/IconeFA";

/*
    CardContato : Card para cada tipo de contato da Pagina Contato
*/
export type CardContatoProps = {
    id: string;
    nome: string;
    descricao: string;
    valor: string;
    icone: NomeIconeFA;
};

export default function CardContato({ id, nome, descricao, valor, icone }: CardContatoProps) {
    return (
        <a
            className="group flex min-w-0 items-center gap-[22px] border-t border-linha px-1 py-6 text-bege transition-[padding] duration-200 hover:pl-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none [&:nth-last-child(-n+2)]:border-b"
            href={`#${id}`}
        >
            <span className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border-2 border-salvia text-salvia transition-colors duration-200 group-hover:bg-salvia group-hover:text-fundo motion-reduce:transition-none">
                <IconeFA nome={icone} className="size-7" />
            </span>
            <span className="min-w-0 flex-1">
                <b className="block font-titulo text-2xl font-semibold">{nome}</b>
                <span className="block text-base text-texto-2">{descricao}</span>
                <span className="mt-0.5 block text-[17px] font-semibold text-salvia">{valor}</span>
            </span>
            <IconeFA nome="arrow-right" className="size-[22px] shrink-0 text-salvia transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
        </a>
    );
}
