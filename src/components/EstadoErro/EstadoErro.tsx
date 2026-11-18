interface EstadoErroProps {
  mensagem: string
  aoTentarDeNovo: () => void
}

/**
 * Bloco de erro genérico com mensagem simples e botão "Tentar de novo".
 * Nunca exibe stack trace — apenas texto vindo do corpo de erro da API.
 */
export default function EstadoErro({ mensagem, aoTentarDeNovo }: EstadoErroProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-2xl border border-nivel-4/30 bg-nivel-4/10 px-6 py-8 text-center"
    >
      {/* Ícone de erro */}
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
        <path d="M12 7v6M12 16.5v.5" />
      </svg>

      <p className="font-corpo text-lg text-bege">{mensagem}</p>

      <button
        type="button"
        onClick={aoTentarDeNovo}
        className="min-h-[48px] rounded-xl bg-mata px-8 py-3 font-titulo text-base font-semibold text-white transition-transform duration-150 hover:scale-[1.03] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia active:scale-[.97] motion-reduce:transition-none"
      >
        Tentar de novo
      </button>
    </div>
  )
}
