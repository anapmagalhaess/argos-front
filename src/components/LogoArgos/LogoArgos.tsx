import { Link } from "react-router";

interface LogoArgosProps {
    className?: string;
}

export default function LogoArgos({ className = "" }: LogoArgosProps) {
    return (
        <Link
            to="/"
            aria-label="Argos"
            className={`inline-flex min-h-11 items-center font-titulo font-extrabold uppercase tracking-[0.14em] ${className}`}>
            Argos<span className="text-salvia">.</span>
        </Link>
    );
}
