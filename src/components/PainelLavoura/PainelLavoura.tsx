import { Link } from 'react-router'
import type { EstadoDasCondicoes } from '../../hooks/useCondicoes'
import type { Camada } from '../../types/condicoes'
import type { Cultura } from '../../types/cultura'
import { CAMADAS } from '../../utils/descreverCamada'
import type { DescricaoDaCamada } from '../../utils/descreverCamada'
import Seletor from '../Seletor/Seletor'

interface PainelLavouraProps {
    cultura: Cultura
    camada: Camada
    descricao: DescricaoDaCamada
    /** Situação da busca do tempo e do ar: carregando, erro ou pronto. */
    situacao: EstadoDasCondicoes['situacao']
    /** Mensagem para quando a busca falha. */
    mensagemDeErro: string
    /** As imagens do mapa não carregaram. */
    semImagem: boolean
    onCamada: (camada: Camada) => void
}

/**
 * Painel da lavoura aberta. As setas trocam a camada (clima, ar, umidade, solo); embaixo vêm a leitura
 * em palavras simples, o número, a fonte e o caminho para o guia da lavoura.
 */
export default function PainelLavoura({
    cultura,
    camada,
    descricao,
    situacao,
    mensagemDeErro,
    semImagem,
    onCamada,
}: PainelLavouraProps) {
    const indice = CAMADAS.indexOf(camada)
    const passar = (passo: number) => onCamada(CAMADAS[(indice + passo + CAMADAS.length) % CAMADAS.length])
    // Clima, ar e umidade vêm da internet: enquanto a resposta não chega, a tela avisa.
    const esperando = descricao.aoVivo && situacao === 'carregando'
    const falhou = descricao.aoVivo && situacao === 'erro'

    return (
        <section aria-label={`${descricao.titulo} na lavoura de ${cultura.nome}`}>
            <Seletor
                indice={indice}
                total={CAMADAS.length}
                titulo={descricao.titulo}
                rotuloAnterior="Camada anterior"
                rotuloProximo="Próxima camada"
                onPassar={passar}
            >
                <div aria-live="polite" className="mt-2 flex min-h-24 flex-col items-center">
                    {esperando && <p className="text-lg opacity-90">Buscando os dados de hoje…</p>}
                    {falhou && <p className="max-w-md text-lg">{mensagemDeErro}</p>}
                    {!esperando && !falhou && (
                        <>
                            {descricao.avaliacao && (
                                // Cor, nome e número juntos: a leitura nunca depende só da cor.
                                <p className="flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase">
                                    <span
                                        aria-hidden="true"
                                        style={{ backgroundColor: descricao.avaliacao.cor }}
                                        className="size-3 rounded-full ring-2 ring-[#E6DAC6]/80"
                                    />
                                    {descricao.avaliacao.rotulo}
                                </p>
                            )}
                            <p className="mt-1 font-display text-2xl font-medium sm:text-3xl">{descricao.frase}</p>
                            {descricao.detalhe && <p className="mt-1 max-w-xl text-lg opacity-90">{descricao.detalhe}</p>}
                        </>
                    )}
                </div>
                <p className="mt-2 max-w-xl text-sm opacity-75">
                    Fonte: {descricao.fonte}.{' '}
                    {semImagem
                        ? 'Sem internet para a imagem de satélite.'
                        : 'Imagem: Sentinel-2 cloudless 2020, EOX (dados Copernicus).'}
                </p>
                <Link
                    to={`/guia/${cultura.slug}`}
                    className="mt-3 flex min-h-12 items-center rounded-full bg-[#7DBE8C] px-7 text-lg font-bold text-[#17110D] transition-opacity hover:opacity-90 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#E6DAC6]"
                >
                    Abrir o guia de {cultura.nome.toLowerCase()}
                </Link>
            </Seletor>
        </section>
    )
}
