import { useState, useEffect, useCallback } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import CardAlerta from '../../components/CardAlerta/CardAlerta'
import CardPlantio from '../../components/CardPlantio/CardPlantio'
import EstadoCarregando from '../../components/EstadoCarregando/EstadoCarregando'
import EstadoErro from '../../components/EstadoErro/EstadoErro'
import EstadoVazio from '../../components/EstadoVazio/EstadoVazio'

import { buscarAlertasDoMunicipio } from '../../services/alertaService'
import { buscarPlantiosDaPropriedade } from '../../services/plantioService'
import { buscarProdutor } from '../../services/produtorService'
import { ErroDeApi } from '../../services/api'
import { CHAVES_STORAGE } from '../../utils/chavesStorage'

import type { Alerta } from '../../types/alerta'
import type { Plantio } from '../../types/plantio'

/* ─── Leitura segura do localStorage ─── */

interface DadosSalvos {
  produtorId: number | null
  propriedadeId: number | null
  municipioId: number | null
}

function lerDadosSalvos(): DadosSalvos {
  const vazio: DadosSalvos = { produtorId: null, propriedadeId: null, municipioId: null }
  try {
    const pid = localStorage.getItem(CHAVES_STORAGE.produtorId)
    const propId = localStorage.getItem(CHAVES_STORAGE.propriedadeId)
    const munId = localStorage.getItem(CHAVES_STORAGE.municipioId)
    return {
      produtorId: pid ? Number(pid) : null,
      propriedadeId: propId ? Number(propId) : null,
      municipioId: munId ? Number(munId) : null,
    }
  } catch {
    // localStorage indisponível (modo privado, storage cheio, etc.)
    return vazio
  }
}

/* ─── Extrair mensagem amigável de um erro ─── */

function mensagemDoErro(erro: unknown): string {
  if (erro instanceof ErroDeApi) return erro.corpo.mensagem
  if (erro instanceof Error) {
    if (erro.name === 'AbortError') return ''
    return erro.message
  }
  return 'Algo deu errado. Tente de novo.'
}

/* ─── Estados possíveis de cada seção ─── */

type Fase = 'carregando' | 'erro' | 'vazio' | 'ok'

/* ─── Página ─── */

export default function Hoje() {
  const [dados] = useState(lerDadosSalvos)

  /* ── Alertas ── */
  const [alertas, setAlertas] = useState<Alerta[]>([])
  const [faseAlertas, setFaseAlertas] = useState<Fase>('carregando')
  const [erroAlertas, setErroAlertas] = useState('')
  const [recarregarAlertas, setRecarregarAlertas] = useState(0)

  /* ── Plantios ── */
  const [plantios, setPlantios] = useState<Plantio[]>([])
  const [fasePlantios, setFasePlantios] = useState<Fase>('carregando')
  const [erroPlantios, setErroPlantios] = useState('')
  const [recarregarPlantios, setRecarregarPlantios] = useState(0)

  /* ── Buscar alertas ── */
  useEffect(() => {
    // Sem cadastro → não busca, mostra estado "sem cadastro"
    if (!dados.produtorId) {
      setFaseAlertas('vazio')
      return
    }

    const controlador = new AbortController()
    let cancelado = false

    async function carregar() {
      setFaseAlertas('carregando')
      setErroAlertas('')

      try {
        // Se não temos municipioId, busca via produtor
        let municipioId = dados.municipioId
        if (!municipioId) {
          const produtor = await buscarProdutor(dados.produtorId!, controlador.signal)
          municipioId = produtor.municipio.id

          // Salva para próximas visitas
          try {
            localStorage.setItem(CHAVES_STORAGE.municipioId, String(municipioId))
          } catch { /* ignora falha no storage */ }
        }

        const lista = await buscarAlertasDoMunicipio(municipioId, controlador.signal)
        if (cancelado) return

        // Ordena do mais grave para o menos grave
        lista.sort((a, b) => b.severidade - a.severidade)

        setAlertas(lista)
        setFaseAlertas(lista.length > 0 ? 'ok' : 'vazio')
      } catch (erro) {
        if (cancelado) return
        const msg = mensagemDoErro(erro)
        if (!msg) return // AbortError
        setErroAlertas(msg)
        setFaseAlertas('erro')
      }
    }

    carregar()

    return () => {
      cancelado = true
      controlador.abort()
    }
  }, [dados.produtorId, dados.municipioId, recarregarAlertas])

  /* ── Buscar plantios ── */
  useEffect(() => {
    if (!dados.propriedadeId) {
      setFasePlantios('vazio')
      return
    }

    const controlador = new AbortController()
    let cancelado = false

    async function carregar() {
      setFasePlantios('carregando')
      setErroPlantios('')

      try {
        const lista = await buscarPlantiosDaPropriedade(dados.propriedadeId!, controlador.signal)
        if (cancelado) return

        setPlantios(lista)
        setFasePlantios(lista.length > 0 ? 'ok' : 'vazio')
      } catch (erro) {
        if (cancelado) return
        const msg = mensagemDoErro(erro)
        if (!msg) return
        setErroPlantios(msg)
        setFasePlantios('erro')
      }
    }

    carregar()

    return () => {
      cancelado = true
      controlador.abort()
    }
  }, [dados.propriedadeId, recarregarPlantios])

  /* ── Callbacks dos botões "Tentar de novo" ── */
  const tentarAlertasDeNovo = useCallback(() => setRecarregarAlertas((n) => n + 1), [])
  const tentarPlantiosDeNovo = useCallback(() => setRecarregarPlantios((n) => n + 1), [])

  /* ── Verifica se o produtor existe ── */
  const semCadastro = !dados.produtorId

  return (
    <div className="flex min-h-screen flex-col bg-fundo">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 md:px-8">
        <h1 className="mb-8 font-titulo text-3xl font-bold text-bege md:text-4xl">
          Hoje na sua lavoura
        </h1>

        {/* ═══ Estado sem cadastro (global) ═══ */}
        {semCadastro ? (
          <EstadoVazio
            mensagem="Você ainda não fez o cadastro. Faça a triagem para ver os alertas e as suas plantações."
            linkRota="/triagem"
            linkTexto="Fazer cadastro"
          />
        ) : (
          <>
            {/* ═══ Seção Alertas ═══ */}
            <section aria-labelledby="titulo-alertas" className="mb-10">
              <h2
                id="titulo-alertas"
                className="mb-5 font-titulo text-2xl font-bold text-bege"
              >
                Alertas do seu município
              </h2>

              {faseAlertas === 'carregando' && <EstadoCarregando />}

              {faseAlertas === 'erro' && (
                <EstadoErro mensagem={erroAlertas} aoTentarDeNovo={tentarAlertasDeNovo} />
              )}

              {faseAlertas === 'vazio' && (
                <EstadoVazio mensagem="Não há alertas no seu município agora." />
              )}

              {faseAlertas === 'ok' && (
                <ul className="flex flex-col gap-4">
                  {alertas.map((alerta) => (
                    <li key={alerta.id}>
                      <CardAlerta alerta={alerta} />
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* ═══ Seção Plantios ═══ */}
            <section aria-labelledby="titulo-plantios">
              <h2
                id="titulo-plantios"
                className="mb-5 font-titulo text-2xl font-bold text-bege"
              >
                Suas plantações
              </h2>

              {fasePlantios === 'carregando' && <EstadoCarregando />}

              {fasePlantios === 'erro' && (
                <EstadoErro mensagem={erroPlantios} aoTentarDeNovo={tentarPlantiosDeNovo} />
              )}

              {fasePlantios === 'vazio' && (
                <EstadoVazio mensagem="Nenhuma plantação cadastrada ainda." />
              )}

              {fasePlantios === 'ok' && (
                <ul className="flex flex-col gap-4">
                  {plantios.map((plantio) => (
                    <li key={plantio.id}>
                      <CardPlantio plantio={plantio} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
