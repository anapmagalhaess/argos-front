//Uso de parametros para consulta de culturas e identificacao via URL

import { useParams } from 'react-router'

export default function Guia() {
    const { cultura } = useParams<{ cultura: string }>()
    const nomeDaCultura = cultura
        ? cultura.charAt(0).toLocaleUpperCase() + cultura.slice(1)
        : 'Cultura não informada'

    return (
        <main className="min-h-screen bg-lime-50 px-4 py-12 text-stone-900 sm:px-6">
            <section className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-green-800">
                    Guia visual do Argos
                </p>
                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                    Guia de {nomeDaCultura}
                </h1>
                <p className="mt-4 text-lg text-stone-700">
                    Esta página recebe a cultura pela URL. O parâmetro atual é{' '}
                    <strong>{cultura ?? 'indisponível'}</strong>.
                </p>
            </section>
        </main>
    )
}
