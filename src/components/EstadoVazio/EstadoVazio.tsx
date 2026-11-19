import { Link } from 'react-router';
import IconeFA from '../IconeFA/IconeFA';

interface EstadoVazioProps {
    mensagem: string;
    /** Se informado, exibe um botão de redirecionamento para outra página */
    linkRota?: string;
    /** Texto do botão (ex: 'Fazer cadastro') */
    linkTexto?: string;
}

/**
 * Bloco de estado vazio (lista sem itens ou usuário sem cadastro).
 */
export default function EstadoVazio({
    mensagem,
    linkRota,
    linkTexto,
}: EstadoVazioProps) {
    return (
        <div className="flex flex-col items-center gap-5 py-10 text-center">
            <IconeFA nome="list" className="h-12 w-12 text-texto-2/60" />

            <p className="max-w-sm font-corpo text-lg text-texto-2 leading-relaxed">
                {mensagem}
            </p>

            {linkRota && linkTexto && (
                <Link
                    to={linkRota}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border-2 border-salvia bg-salvia px-8 py-3 font-titulo text-base font-bold uppercase tracking-wider text-fundo shadow-md transition-all duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia active:scale-95"
                >
                    {linkTexto}
                </Link>
            )}
        </div>
    );
}
