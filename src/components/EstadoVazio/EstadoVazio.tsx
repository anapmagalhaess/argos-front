import { Link } from 'react-router'

interface EstadoVazioProps {
  mensagem: string
  /** Se informado, renderiza um botão com link para essa rota. */
  linkRota?: string
  /** Texto do botão (obrigatório se linkRota for informado). */
  linkTexto?: string
}

/**
 * Estado vazio genérico — lista sem itens ou produtor sem cadastro.
 * Exibe uma mensagem e, opcionalmente, um botão grande para outra rota.
 */
export default function EstadoVazio({
  mensagem,
  linkRota,
  linkTexto,
}: EstadoVazioProps) {
  return (
    <div className="flex flex-col items-center gap-5 py-10 text-center">
      {/* Ícone de lista vazia */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-12 w-12 text-texto-2/60"
      >
        <path d="M3 6h18M3 12h12M3 18h8" />
      </svg>

      <p className="max-w-xs font-corpo text-lg text-texto-2">{mensagem}</p>

      {linkRota && linkTexto && (
        <Link
          to={linkRota}
          className="min-h-[48px] rounded-xl bg-salvia px-8 py-3 font-titulo text-lg font-semibold text-fundo transition-transform duration-150 hover:scale-[1.03] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia active:scale-[.97] motion-reduce:transition-none"
        >
          {linkTexto}
        </Link>
      )}
    </div>
  )
}
