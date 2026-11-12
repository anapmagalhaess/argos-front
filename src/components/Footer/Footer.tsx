import LogoArgos from "../LogoArgos/LogoArgos";

/* Rodapé */
export default function Footer() {
    return (
        <footer className="border-t border-linha bg-terra-funda py-10">
            <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-7">
                <LogoArgos className="text-[22px]" />
                <p className="text-[15px] text-texto-2">
                    © 2026 Argos · FIAP Global Solution · CitizenTech · ODS 2, 13 e 10. Personas e avisos de exemplo são fictícios.
                </p>
            </div>
        </footer>
    );
}
