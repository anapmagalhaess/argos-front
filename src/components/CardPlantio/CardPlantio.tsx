import type { Plantio, EstagioPlantio } from '../../types/plantio'

/* ─── Rótulos legíveis dos estágios ─── */

const ROTULO_ESTAGIO: Record<EstagioPlantio, string> = {
  PREPARO: 'Preparo do solo',
  PLANTIO: 'Plantio',
  CRESCIMENTO: 'Crescimento',
  FLORACAO: 'Floração',
  COLHEITA: 'Colheita',
}

/* ─── Ícone por estágio (viewBox 0 0 24 24) ─── */

import type { ReactNode } from 'react'

const ICONE_ESTAGIO: Record<EstagioPlantio, ReactNode> = {
  PREPARO: (
    <path d="M12 22V8M5 12l7-10 7 10" />
  ),
  PLANTIO: (
    <>
      <path d="M7 20h10" />
      <path d="M12 20v-8" />
      <path d="M12 12C12 8 9 5 5 4c0 4 3 7 7 8z" />
      <path d="M12 12c0-4 3-7 7-8 0 4-3 7-7 8z" />
    </>
  ),
  CRESCIMENTO: (
    <>
      <path d="M12 22V12" />
      <path d="M12 12c0-5-4-8-8-9 0 5 4 8 8 9z" />
      <path d="M12 8c0-3 3-6 6-7 0 3-3 6-6 7z" />
      <path d="M7 20h10" />
    </>
  ),
  FLORACAO: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M12 5c0-2 2-4 4-4-1 2-2 3-4 4zM12 5c0-2-2-4-4-4 1 2 2 3 4 4z" />
      <path d="M9 8c-2 0-4-1-4-3 2 0 3 1 4 3zM15 8c2 0 4-1 4-3-2 0-3 1-4 3z" />
      <path d="M12 11v9M8 20h8" />
    </>
  ),
  COLHEITA: (
    <>
      <path d="M12 22V12" />
      <path d="M4 15l8-3 8 3" />
      <path d="M8 5c0 3 2 5 4 7 2-2 4-4 4-7a4 4 0 0 0-8 0z" />
    </>
  ),
}

/* ─── Cor de fundo sutil por estágio ─── */

const COR_ESTAGIO: Record<EstagioPlantio, string> = {
  PREPARO: 'border-terra/40',
  PLANTIO: 'border-salvia/40',
  CRESCIMENTO: 'border-salvia/60',
  FLORACAO: 'border-ambar/50',
  COLHEITA: 'border-salvia/80',
}

/* ─── Formatar data AAAA-MM-DD → DD/MM/AAAA ─── */

function formatarData(dataIso: string): string {
  const partes = dataIso.split('-')
  if (partes.length < 3) return dataIso
  return `${partes[2]}/${partes[1]}/${partes[0]}`
}

/* ─── Componente ─── */

interface CardPlantioProps {
  plantio: Plantio
}

/**
 * Card de plantio para a página Hoje.
 *
 * Mostra: culturaId (TODO: trocar pelo nome quando a API enviar),
 * área em hectares, data do plantio, colheita prevista e estágio com
 * rótulo legível.
 */
export default function CardPlantio({ plantio }: CardPlantioProps) {
  const estagio = ROTULO_ESTAGIO[plantio.estagio]
  const icone = ICONE_ESTAGIO[plantio.estagio]
  const corBorda = COR_ESTAGIO[plantio.estagio]

  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl border-l-4 ${corBorda} bg-card p-5 shadow-md`}
    >
      {/* Cabeçalho: estágio */}
      <div className="flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-salvia"
        >
          {icone}
        </svg>

        <span className="rounded-lg bg-mata/30 px-3 py-1 font-titulo text-sm font-semibold uppercase tracking-wide text-salvia">
          {estagio}
        </span>
      </div>

      {/* Dados do plantio */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-corpo text-lg">
        {/* TODO: trocar culturaId pelo nome da cultura quando a API confirmar */}
        <div>
          <span className="block text-sm text-texto-2">Cultura</span>
          <span className="font-semibold text-bege">#{plantio.culturaId}</span>
        </div>
        <div>
          <span className="block text-sm text-texto-2">Área</span>
          <span className="font-semibold text-bege">{plantio.areaHa} ha</span>
        </div>
        <div>
          <span className="block text-sm text-texto-2">Plantado em</span>
          <span className="font-semibold text-bege">{formatarData(plantio.dataPlantio)}</span>
        </div>
        <div>
          <span className="block text-sm text-texto-2">Colheita prevista</span>
          <span className="font-semibold text-bege">{formatarData(plantio.dataColheitaPrevista)}</span>
        </div>
      </div>
    </article>
  )
}
