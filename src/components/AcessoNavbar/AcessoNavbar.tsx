import { Link } from "react-router";
import { useConta } from "../../contexto/conta";

/*
    AcessoNavbar: o canto direito da barra de navegação. Sem conta: "Entrar" e o botão "Começar"
    (o cadastro). Com conta: o nome da pessoa (leva à conta), "Sair" e o botão "Hoje".
    Tem duas versões: a do desktop (uma linha) e a do menu mobile (blocos empilhados).
*/

interface AcessoNavbarProps {
    variante: "desktop" | "movel";
    /* Fecha o menu mobile quando a pessoa toca num link */
    aoNavegar?: () => void;
}

const CTA =
    "inline-flex min-h-12 items-center justify-center rounded-[14px] border-2 border-salvia bg-salvia px-6 font-titulo text-[15px] font-semibold uppercase tracking-[0.04em] text-fundo transition-transform duration-150 hover:scale-[1.035] hover:brightness-110 focus-visible:scale-[1.035] active:scale-[.98] motion-reduce:transition-none";
const SECUNDARIO =
    "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[14px] border-2 border-linha px-6 font-titulo text-[15px] font-semibold uppercase tracking-[0.04em] text-bege transition-colors duration-150 hover:border-bege focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia";

export default function AcessoNavbar({ variante, aoNavegar }: AcessoNavbarProps) {
    const { conta, sair } = useConta();
    const primeiroNome = conta?.produtorNome.split(" ")[0];

    if (variante === "desktop") {
        return (
            <div className="flex max-[851px]:hidden items-center gap-3">
                {conta ? (
                    <>
                        <Link
                            to="/conta"
                            aria-label={`Minha conta, ${primeiroNome}`}
                            className="flex items-center gap-2.5 rounded-[10px] px-2 py-1.5 text-base font-medium text-bege transition-colors duration-150 hover:text-salvia focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia"
                        >
                            <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-mata font-titulo text-sm font-bold text-bege">
                                {primeiroNome?.charAt(0).toUpperCase()}
                            </span>
                            Olá, {primeiroNome}
                        </Link>
                        <button type="button" onClick={sair} className="cursor-pointer rounded-[10px] px-2 py-1.5 text-base font-medium text-texto-2 transition-colors duration-150 hover:text-bege focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia">
                            Sair
                        </button>
                        <Link to="/hoje" className={CTA}>Hoje</Link>
                    </>
                ) : (
                    <>
                        <Link to="/entrar" className="rounded-[10px] px-2 py-1.5 text-base font-medium text-bege transition-colors duration-150 hover:text-salvia focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-salvia">
                            Entrar
                        </Link>
                        <Link to="/triagem" className={CTA}>Começar</Link>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2.5">
            {conta ? (
                <>
                    <Link to="/conta" onClick={aoNavegar} className={`${SECUNDARIO} w-full`}>Minha conta ({primeiroNome})</Link>
                    <button type="button" onClick={() => { sair(); aoNavegar?.(); }} className={`${SECUNDARIO} w-full`}>Sair</button>
                    <Link to="/hoje" onClick={aoNavegar} className={`${CTA} w-full`}>Hoje</Link>
                </>
            ) : (
                <>
                    <Link to="/entrar" onClick={aoNavegar} className={`${SECUNDARIO} w-full`}>Entrar</Link>
                    <Link to="/triagem" onClick={aoNavegar} className={`${CTA} w-full`}>Começar</Link>
                </>
            )}
        </div>
    );
}
