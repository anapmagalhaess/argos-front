/**
 * Indicador acessível de carregamento.
 */
export default function EstadoCarregando() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-4 py-10 text-center"
        >
            {/* Três pontos com animação suave */}
            <div className="flex gap-2" aria-hidden="true">
                <span className="h-3 w-3 animate-bounce rounded-full bg-salvia [animation-delay:0ms]" />
                <span className="h-3 w-3 animate-bounce rounded-full bg-salvia [animation-delay:150ms]" />
                <span className="h-3 w-3 animate-bounce rounded-full bg-salvia [animation-delay:300ms]" />
            </div>

            <p className="font-corpo text-lg font-medium text-bege">
                Estamos acordando o sistema, aguarde um pouco…
            </p>
            <p className="font-corpo text-sm text-texto-2">
                A API no servidor pode levar até 1 minuto para inicializar na primeira chamada.
            </p>
        </div>
    );
}
