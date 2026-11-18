import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AvisoDeTela, Campo, ENTRADA } from "../../components/CampoForm/CampoForm";
import EstadoCarregando from "../../components/EstadoCarregando/EstadoCarregando";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useConta } from "../../contexto/conta";
import { ApiError } from "../../services/api";
import { formatarTelefone, identificarPorTelefone, telefoneValido } from "../../services/autenticacao";

/*
    Entrar: a pessoa escreve o telefone que cadastrou e o Argos a reconhece. Não há senha: o banco
    do Argos não guarda senha, então isto identifica, não autentica (a tela explica isso).
    "Lembrar deste aparelho" liga o reconhecimento por aparelho: da próxima vez a pessoa já entra
    sozinha. A tela que mandou a pessoa entrar pode passar `state={{ de: "/rota" }}` no Link, e
    depois de entrar a pessoa volta para lá.
*/

const BOTAO =
    "min-h-14 cursor-pointer rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";
const BOTAO_CLARO =
    "min-h-14 cursor-pointer rounded-[14px] border-2 border-linha px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-bege transition-transform duration-150 hover:scale-[1.035] hover:border-bege focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none";

export default function Entrar() {
    const { conta, entrar, sair } = useConta();
    const navegar = useNavigate();
    const local = useLocation();
    // Para onde ir depois de entrar: a tela de onde a pessoa veio, ou a "Hoje"
    const destino: string = typeof local.state?.de === "string" && local.state.de.startsWith("/") ? local.state.de : "/hoje";

    const [telefone, setTelefone] = useState("");
    const [lembrar, setLembrar] = useState(true);
    const [erroDoCampo, setErroDoCampo] = useState("");
    const [erroDaApi, setErroDaApi] = useState<ApiError | null>(null);
    const [enviando, setEnviando] = useState(false);

    async function enviar(evento: FormEvent) {
        evento.preventDefault();
        if (enviando) return;
        setErroDaApi(null);
        if (!telefoneValido(telefone)) {
            setErroDoCampo("Escreva o telefone com DDD, só números (10 ou 11 dígitos).");
            return;
        }
        setErroDoCampo("");
        setEnviando(true);
        try {
            const dados = await identificarPorTelefone(telefone);
            entrar(dados, lembrar);
            navegar(destino, { replace: true });
        } catch (erro) {
            setErroDaApi(erro instanceof ApiError ? erro : new ApiError(0, "Algo deu errado. Tente de novo."));
        } finally {
            setEnviando(false);
        }
    }

    return (
        <main className="flex min-h-screen min-h-svh w-full flex-col overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege [background:radial-gradient(800px_500px_at_90%_10%,rgba(125,190,140,.09),transparent_70%),linear-gradient(180deg,var(--color-card)_0%,var(--color-fundo)_40%,var(--color-fundo)_100%)]">
            {enviando && <EstadoCarregando titulo="Procurando o seu cadastro…" descricao="A resposta do servidor pode levar até cerca de 1 minuto." telaInteira />}
            <section className="relative overflow-visible bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 size-[430px] rounded-full border border-salvia/10 shadow-[0_0_0_24px_rgba(125,190,140,.025),0_0_0_58px_rgba(125,190,140,.02)]" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-20 size-52 rounded-full bg-salvia/10 blur-[70px]" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[16%] top-24 hidden size-2 rounded-full bg-ambar shadow-[0_0_0_8px_rgba(217,166,80,.08),0_0_24px_rgba(217,166,80,.6)] md:block" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[29%] top-44 hidden size-1.5 rounded-full bg-salvia shadow-[0_0_0_7px_rgba(125,190,140,.08)] md:block" />
                <Navbar />
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-7 pt-14 pb-16">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Entrar</p>
                    <h1 className="font-titulo text-[clamp(40px,5.4vw,72px)] leading-none font-extrabold uppercase">Que bom ver você.</h1>
                    <p className="max-w-[620px] text-[clamp(19px,2vw,22px)] text-texto-2">
                        Escreva o telefone que você usou no cadastro e o Argos abre a sua roça.
                    </p>
                </div>
            </section>

            <section className="relative isolate flex-1 overflow-hidden border-t border-linha bg-card py-16">
                <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-20 z-0 size-64 rounded-full bg-ambar/[.06] blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 z-0 size-72 rounded-full bg-salvia/[.07] blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[12%] top-16 z-0 hidden size-40 rounded-full border border-ambar/10 shadow-[0_0_0_16px_rgba(217,166,80,.025),0_0_0_36px_rgba(217,166,80,.018)] lg:block" />
                <div className="relative z-10 mx-auto flex w-full max-w-[680px] flex-col gap-8 px-7">
                    {conta ? (
                        // O aparelho já reconheceu a pessoa
                        <div className="flex flex-col gap-6">
                            <h2 className="font-titulo text-[clamp(26px,3.2vw,38px)] leading-tight font-extrabold uppercase">
                                Olá de novo, {conta.produtorNome.split(" ")[0]}.
                            </h2>
                            <p className="text-texto-2">
                                O Argos reconheceu este aparelho.{" "}
                                {conta.lembrar
                                    ? "Você pediu para ele lembrar de você."
                                    : "Esta entrada vale só até você fechar esta aba."}
                            </p>
                            <div className="flex flex-wrap gap-3.5">
                                <button type="button" onClick={() => navegar(destino, { replace: true })} className={BOTAO}>
                                    Continuar como {conta.produtorNome.split(" ")[0]}
                                </button>
                                <button type="button" onClick={sair} className={BOTAO_CLARO}>
                                    Não sou {conta.produtorNome.split(" ")[0]}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={enviar} noValidate className="flex flex-col gap-6">
                            <Campo rotulo="Seu telefone" dica="Com DDD, só números. Ex.: 87999990000" erro={erroDoCampo}>
                                {(a) => (
                                    <input
                                        {...a}
                                        className={ENTRADA}
                                        value={telefone}
                                        maxLength={15}
                                        inputMode="numeric"
                                        autoComplete="tel"
                                        onChange={(e) => { setTelefone(formatarTelefone(e.target.value)); setErroDoCampo(""); setErroDaApi(null); }}
                                    />
                                )}
                            </Campo>

                            <label className="flex cursor-pointer items-start gap-3.5">
                                <input
                                    type="checkbox"
                                    checked={lembrar}
                                    onChange={(e) => setLembrar(e.target.checked)}
                                    className="mt-1 size-6 shrink-0 cursor-pointer accent-salvia"
                                />
                                <span>
                                    Lembrar deste aparelho.{" "}
                                    <span className="text-texto-2">Da próxima vez você entra sozinho. Desmarque se o aparelho não é só seu.</span>
                                </span>
                            </label>

                            {erroDaApi && (
                                <AvisoDeTela tipo="erro">
                                    {erroDaApi.message}
                                    {erroDaApi.status === 404 && (
                                        <>
                                            {" "}
                                            <Link to="/cadastro" className="font-semibold text-salvia underline underline-offset-4">Fazer o cadastro</Link>
                                        </>
                                    )}
                                </AvisoDeTela>
                            )}

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                                <button type="submit" disabled={enviando} className={BOTAO}>
                                    {enviando ? "Procurando…" : "Entrar"}
                                </button>
                                <p className="text-texto-2">
                                    Ainda não tem cadastro?{" "}
                                    <Link to="/cadastro" className="font-semibold text-salvia underline underline-offset-4">Fazer o cadastro</Link>
                                </p>
                            </div>
                        </form>
                    )}

                    <details className="rounded-2xl border border-linha bg-fundo p-5">
                        <summary className="min-h-11 cursor-pointer py-2.5 font-semibold text-salvia">Como funciona a entrada?</summary>
                        <ul className="mt-4 flex list-disc flex-col gap-2.5 pl-5 text-texto-2">
                            <li>O Argos não pede senha. Ele reconhece você pelo telefone do cadastro.</li>
                            <li>Por isso, não conte para ninguém que usa o seu telefone no Argos: quem souber o número consegue entrar como você.</li>
                            <li>"Lembrar deste aparelho" guarda a sua entrada só neste navegador. Nada disso é enviado para outro lugar.</li>
                            <li>Em aparelho emprestado, desmarque a opção e use "Sair" no fim.</li>
                        </ul>
                    </details>
                </div>
            </section>

            <Footer />
        </main>
    );
}
