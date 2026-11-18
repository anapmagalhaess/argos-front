import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import CardIntegrante from "../../components/CardIntegrante/CardIntegrante";
import { integrantes } from "../../data/integrantes";

export default function Integrantes() {
    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege">
            <ScrollReveal />

            {/* topo da página: mesmo padrão das páginas Sobre e Contato */}
            <section className="relative overflow-x-clip bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <Navbar />
                <div data-reveal className="relative mx-auto flex w-full max-w-300 flex-col gap-5.5 px-7 pt-14 pb-18">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Integrantes</p>
                    <h1 className="font-titulo text-[clamp(44px,6vw,84px)] leading-none font-extrabold uppercase">
                        Quem faz <br />o Argos.
                    </h1>
                    <p className="max-w-160 text-[clamp(19px,2vw,23px)] text-texto-2">
                        Somos cinco estudantes do 1º ano de Análise e Desenvolvimento de Sistemas da FIAP.
                        Cada um cuida de uma parte, e todos conhecem o projeto inteiro.
                    </p>
                </div>
            </section>

            {/* Os cartões vêm da lista em data/integrantes.ts. Cabem 5 por linha no computador, 3 no tablet
                e 1 no celular; a última linha fica centralizada, sem buraco de um lado. */}
            <section aria-label="Integrantes do grupo" className="bg-fundo pt-4 pb-24">
                <ul className="mx-auto flex w-full max-w-300 flex-wrap justify-center gap-6 px-7">
                    {integrantes.map((integrante) => (
                        <li
                            key={integrante.rm}
                            className="flex w-full sm:w-[calc((100%-24px)/2)] md:w-[calc((100%-48px)/3)] xl:w-[calc((100%-96px)/5)]"
                        >
                            <CardIntegrante {...integrante} />
                        </li>
                    ))}
                </ul>
            </section>

            <Footer />
        </main>
    );
}
