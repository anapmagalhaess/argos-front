/* Faixa de indicadores do Home */
const metricas = [
    {
        titulo: "Agricultura familiar",
        valor: "77%",
        descricao: "dos estabelecimentos rurais · IBGE, Censo Agro 2017",
    },
    {
        titulo: "Com assistência técnica",
        valor: "20%",
        descricao: "cerca de um em cada cinco · Censo Agro 2017",
    },
    {
        titulo: "Não sabem ler e escrever",
        valor: "23%",
        descricao: "dos produtores · IBGE, Censo Agro 2017",
    },
    {
        titulo: "Prejuízo por desastres",
        valor: "R$ 12,6 bi",
        descricao: "jul. a set./2026 · CNM, Boletim El Niño",
    },
];

export default function Metricas() {
    return (
        <section aria-label="Dados sobre agricultura familiar" className="bg-mata py-14">
            <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7 px-7">
                {metricas.map((metrica) => (
                    <article key={metrica.titulo} data-reveal className="metric-item">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-bege">{metrica.titulo}</p>
                        <p className="font-titulo text-[48px] leading-[1.1] font-extrabold text-bege">{metrica.valor}</p>
                        <p className="text-base text-bege">{metrica.descricao}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
