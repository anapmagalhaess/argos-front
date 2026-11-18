import { Link } from "react-router";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

// Página para endereços que não existem (rota "*")
export default function NotFound() {
    return (
        <main className="flex min-h-svh w-full flex-col bg-fundo font-corpo text-lg leading-relaxed text-bege">
            <Navbar />
            <section className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-start justify-center gap-5 px-7 py-16">
                <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Erro 404</p>
                <h1 className="font-titulo text-[clamp(36px,5.4vw,72px)] leading-none font-extrabold uppercase">
                    Não achamos essa página.
                </h1>
                <p className="max-w-[560px] text-[clamp(19px,2vw,22px)] text-texto-2">
                    O endereço pode ter mudado ou ter sido digitado errado. Volte ao início ou abra o mapa das lavouras.
                </p>
                <div className="mt-2 flex flex-wrap gap-3.5">
                    <Link
                        to="/"
                        className="inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none"
                    >
                        Ir para o início
                    </Link>
                    <Link
                        to="/mapa"
                        className="inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-linha px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-bege transition-transform duration-150 hover:scale-[1.035] hover:border-bege focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none"
                    >
                        Abrir o mapa
                    </Link>
                </div>
            </section>
            <Footer />
        </main>
    );
}
