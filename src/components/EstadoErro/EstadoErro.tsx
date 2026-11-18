interface EstadoErroProps {
    mensagem: string;
    aoTentarDeNovo: () => void;
}

/*
    Bloco de erro
 */
export default function EstadoErro({ mensagem, aoTentarDeNovo }: EstadoErroProps) {
    return (
        <div
            role="alert"
            className="flex flex-col items-center gap-4 rounded-3xl border border-nivel-4/40 bg-nivel-4/10 px-6 py-8 text-center shadow-lg"
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-10 w-10 text-nivel-4"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
            </svg>

            <p className="max-w-md font-corpo text-lg font-medium text-bege">
                {mensagem || 'Não foi possível carregar as informações agora.'}
            </p>

            <button
                type="button"
                onClick={aoTentarDeNovo}
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-mata px-8 py-3 font-titulo text-base font-semibold text-white shadow-md transition-all duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia active:scale-95"
            >
                Tentar de novo
            </button>
        </div>
    );
}
