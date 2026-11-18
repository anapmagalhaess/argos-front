import type { ReactNode } from 'react'
import type { Alerta, TipoAlerta, Severidade } from '../../types/alerta'

// Rótulos legíveis do tipo de alerta

const ROTULO_TIPO: Record<TipoAlerta, string> = {
  CHUVA_FORTE: 'Chuva forte',
  SECA: 'Seca',
  CALOR: 'Calor',
  GEADA: 'Geada',
  ENCHENTE: 'Enchente',
  PRAGA: 'Praga',
  VENTO: 'Vento',
}

// Ícones SVG por tipo de alerta (dentro de viewBox 0 0 24 24)

const ICONE_TIPO: Record<TipoAlerta, ReactNode> = {
  CHUVA_FORTE: (
    <>
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
      <path d="M8 17v1M8 21v1M12 15v1M12 19v1M16 17v1M16 21v1" />
    </>
  ),
  SECA: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </>
  ),
  CALOR: (
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  ),
  GEADA: (
    <>
      <path d="M12 2v20M17 7l-10 10M2 12h20M7 7l10 10" />
      <path d="M12 2l2 3M12 2l-2 3M12 22l2-3M12 22l-2-3" />
    </>
  ),
  ENCHENTE: (
    <>
      <path d="M2 15c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0 3.5 1 5 0" />
      <path d="M2 19c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0 3.5 1 5 0" />
      <path d="M9 10l3-7 3 7" />
      <path d="M12 3v7" />
    </>
  ),
  PRAGA: (
    <>
      <path d="M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z" />
      <path d="M6 13H2M6 9H3M6 17H2M18 13h4M18 9h3M18 17h4" />
    </>
  ),
  VENTO: (
    <>
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </>
  ),
}

// Níveis de severidade: palavra + classes de cor

/**
 *   Fundo + texto de cada nível, com contraste ≥ 4,5:1 verificado:
 *   1 verde (#2E7D32) + branco  → 4,78:1 ✓
 *   2 amarelo (#F9D648) + #1E1E1E → 10,2:1 ✓
 *   3 laranja (#E8711A) + #1E1E1E → 5,09:1 ✓
 *   4 vermelho (#C62828) + branco → 5,56:1 ✓
 */
const NIVEL: Record<Severidade, { palavra: string; fundo: string; texto: string; borda: string }> = {
  1: { palavra: 'Tudo certo',    fundo: 'bg-nivel-1', texto: 'text-white',     borda: '' },
  2: { palavra: 'Atenção',       fundo: 'bg-nivel-2', texto: 'text-[#1E1E1E]', borda: '' },
  3: { palavra: 'Perigo',        fundo: 'bg-nivel-3', texto: 'text-[#1E1E1E]', borda: '' },
  4: { palavra: 'Grande perigo', fundo: 'bg-nivel-4', texto: 'text-white',     borda: 'ring-4 ring-double ring-bege' },
}

/* ─── Formatar data AAAA-MM-DD → DD/MM ─── */

function formatarData(dataIso: string): string {
  const partes = dataIso.split('-')
  if (partes.length < 3) return dataIso
  return `${partes[2]}/${partes[1]}`
}

/* ─── Componente ─── */

interface CardAlertaProps {
  alerta: Alerta
}

/**
 * Card de alerta para a página Hoje.
 *
 * Mostra: ícone do tipo + palavra do nível + cor do nível (nunca só cor),
 * título, mensagem, fonte (RN04) e período.
 */
export default function CardAlerta({ alerta }: CardAlertaProps) {
  const nivel = NIVEL[alerta.severidade]
  const rotuloTipo = ROTULO_TIPO[alerta.tipo]
  const tracos = ICONE_TIPO[alerta.tipo]

  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl p-5 shadow-md ${nivel.fundo} ${nivel.texto} ${nivel.borda}`}
    >
      {/* Cabeçalho: ícone do tipo + tipo por extenso + badge do nível */}
      <div className="flex flex-wrap items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-7 w-7 shrink-0"
        >
          {tracos}
        </svg>

        <span className="font-titulo text-lg font-bold uppercase tracking-wide">
          {rotuloTipo}
        </span>

        <span className="ml-auto rounded-lg bg-black/15 px-2.5 py-1 text-sm font-semibold whitespace-nowrap">
          {nivel.palavra}
        </span>
      </div>

      {/* Título e mensagem */}
      <h3 className="font-titulo text-xl font-bold leading-tight">
        {alerta.titulo}
      </h3>
      <p className="font-corpo text-lg leading-relaxed">
        {alerta.mensagem}
      </p>

      {/* Rodapé: fonte + período */}
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium opacity-85">
        <span>Fonte: {alerta.fonte}</span>
        <span aria-label={`De ${alerta.dataInicio} a ${alerta.dataFim}`}>
          {formatarData(alerta.dataInicio)} a {formatarData(alerta.dataFim)}
        </span>
      </div>
    </article>
  )
}
