import { Link } from "react-router";
import { AvisoDeTela } from "../../components/CampoForm/CampoForm";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useConta } from "../../contexto/conta";
import { CANAIS, LEITURA, rotuloDe } from "../../data/opcoes";
import { useBusca } from "../../hooks/useBusca";
import { buscarProdutor } from "../../services/api";
import { formatarData } from "../../utils/datas";
import { esconderTelefone } from "../../utils/textos";

/*
    Conta: quem está neste aparelho, os dados do cadastro (buscados na API) e o que o aparelho
    guardou. Daqui a pessoa sai da conta ou manda o aparelho esquecê-la de vez.
*/

const BOTAO =
    "inline-flex min-h-14 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none";
const BOTAO_CLARO =
    "inline-flex min-h-14 cursor-pointer items-center justify-center rounded-[14px] border-2 border-linha px-[30px] font-titulo text-[17px] font-semibold uppercase tracking-[0.04em] text-bege transition-transform duration-150 hover:scale-[1.035] hover:border-bege focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ambar motion-reduce:transition-none";

export default function Conta() {
    const { conta, aparelho, sair, esquecerAparelho } = useConta();
    const produtor = useBusca(`produtor-${conta?.produtorId}`, conta ? (sinal) => buscarProdutor(conta.produtorId, sinal) : null);

    return (
        <main className="w-full overflow-hidden bg-fundo font-corpo text-lg leading-relaxed text-bege">
            <section className="relative overflow-visible bg-[radial-gradient(700px_420px_at_84%_30%,rgba(125,190,140,.16),transparent_70%),radial-gradient(520px_320px_at_6%_0%,rgba(217,166,80,.10),transparent_70%),#17110D]">
                <Navbar />
                <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-7 pt-14 pb-16">
                    <p className="text-sm font-semibold uppercase tracking-[.14em] text-salvia">Minha conta</p>
                    <h1 className="font-titulo text-[clamp(40px,5.4vw,72px)] leading-none font-extrabold uppercase">
                        {conta ? conta.produtorNome : "Entre para ver."}
                    </h1>
                </div>
            </section>

            <section className="border-t border-linha bg-card py-16">
                <div className="mx-auto flex w-full max-w-[820px] flex-col gap-10 px-7">
                    {!conta ? (
                        <div className="flex flex-col items-start gap-5">
                            <p className="text-texto-2">Você ainda não entrou neste aparelho.</p>
                            <div className="flex flex-wrap gap-3.5">
                                <Link to="/entrar" state={{ de: "/conta" }} className={BOTAO}>Entrar</Link>
                                <Link to="/cadastro" className={BOTAO_CLARO}>Fazer o cadastro</Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4">
                                <h2 className="font-titulo text-[clamp(24px,3vw,34px)] leading-tight font-extrabold uppercase">Seus dados</h2>
                                {produtor.carregando && <AvisoDeTela tipo="carregando">Buscando os seus dados…</AvisoDeTela>}
                                {produtor.erro && (
                                    <AvisoDeTela tipo="erro" acao={{ rotulo: "Tentar de novo", aoClicar: produtor.tentarDeNovo }}>
                                        {produtor.erro.message}
                                    </AvisoDeTela>
                                )}
                                <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-5">
                                    <Item rotulo="Município" valor={`${conta.municipioNome}`} />
                                    <Item rotulo="Sua roça" valor={conta.propriedadeNome ?? "Ainda não cadastrada"} />
                                    {produtor.dados && (
                                        <>
                                            <Item rotulo="Telefone" valor={esconderTelefone(produtor.dados.telefone)} />
                                            <Item rotulo="Recebe os avisos por" valor={rotuloDe(CANAIS, produtor.dados.canalPreferido)} />
                                            <Item rotulo="Prefere" valor={rotuloDe(LEITURA, produtor.dados.preferenciaLeitura)} />
                                        </>
                                    )}
                                </dl>
                            </div>

                            <div className="flex flex-col gap-4 border-t border-linha pt-10">
                                <h2 className="font-titulo text-[clamp(24px,3vw,34px)] leading-tight font-extrabold uppercase">Este aparelho</h2>
                                <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-5">
                                    <Item rotulo="Código do aparelho" valor={aparelho.id.slice(0, 8)} />
                                    <Item rotulo="Conhecido desde" valor={formatarData(aparelho.desde)} />
                                    <Item
                                        rotulo="Reconhece você sozinho?"
                                        valor={conta.lembrar ? "Sim, ele lembra de você" : "Não, vale só até fechar a aba"}
                                    />
                                    {conta.entrouEm && <Item rotulo="Você entrou em" valor={formatarData(conta.entrouEm)} />}
                                </dl>
                                <p className="max-w-[640px] text-texto-2">
                                    Esses dados ficam só neste navegador. "Sair" encerra a sua entrada; "Esquecer este aparelho"
                                    apaga também o código dele.
                                </p>
                                <div className="flex flex-wrap gap-3.5">
                                    <Link to="/hoje" className={BOTAO}>Ver os avisos de hoje</Link>
                                    <button type="button" onClick={sair} className={BOTAO_CLARO}>Sair</button>
                                    <button type="button" onClick={esquecerAparelho} className={BOTAO_CLARO}>Esquecer este aparelho</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

function Item({ rotulo, valor }: { rotulo: string; valor: string }) {
    return (
        <div className="flex flex-col gap-1 rounded-2xl border border-linha bg-fundo px-5 py-4">
            <dt className="text-sm font-semibold uppercase tracking-[.12em] text-texto-2">{rotulo}</dt>
            <dd className="font-semibold">{valor}</dd>
        </div>
    );
}
