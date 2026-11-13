import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";

export default function Sobre() {
  return (
    <main className="w-full overflow-hidden font-corpo text-lg leading-relaxed text-bege max-[500px]:text-[15px] max-[380px]:text-[14px] max-[500px]:[&_p:not(.up)]:[font-size:15px] max-[380px]:[&_p:not(.up)]:[font-size:14px] [background:radial-gradient(680px_520px_at_10%_0%,rgba(217,166,80,.14),transparent_70%),radial-gradient(720px_560px_at_92%_4%,rgba(138,59,46,.20),transparent_70%),linear-gradient(180deg,var(--color-card)_0%,var(--color-fundo)_32%,var(--color-fundo)_100%)]">
      <ScrollReveal />
      <Navbar />

    {/*HERO*/}
    <section id="inicio" className="relative overflow-hidden bg-transparent [zoom:.97]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(230,218,198,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(230,218,198,.10)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]" />
      <div data-reveal className="mx-auto relative box-border w-full max-w-[1200px] px-7 [display:flex] [flex-wrap:wrap] [gap:40px_56px] [align-items:center] [padding-top:72px] [padding-bottom:112px]">
        <div className="[flex:1_1_460px] [display:flex] [flex-direction:column] [gap:26px]">
          <p className="m-0 up [color:var(--color-salvia)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Sobre o projeto</p>
          <h1 className="font-titulo m-0 [font-size:clamp(42px,5.6vw,80px)] max-[500px]:[font-size:34px] max-[380px]:[font-size:30px] [line-height:1] [font-weight:800] [text-transform:uppercase]">Conheça o Argos por dentro.</h1>
          <p className="m-0 [font-size:clamp(19px,2vw,23px)] [max-width:560px] [color:var(--color-texto-2)]">O que ele é, de onde veio, em que situações mais ajuda e como foi construído.</p>
        </div>

        {/*RADAR*/}
        <div className="[flex:1_1_380px] [display:flex] [justify-content:center]">
          <svg viewBox="0 0 520 520" width="100%" className="[max-width:470px]" role="img" aria-label="Radar com pontos de aviso">
          <g fill="none" stroke="#3A2F27" strokeWidth="1.6">
            <circle cx="260" cy="260" r="60" />
            <circle cx="260" cy="260" r="120" />
            <circle cx="260" cy="260" r="180" />
            <circle cx="260" cy="260" r="240" />
            <path d="M260 14V506M14 260H506" />
          </g>
          <path d="M260 260 L260 20 A240 240 0 0 1 430 90 Z" fill="#7DBE8C" fillOpacity=".12" />
          <path d="M260 260 L260 20" stroke="#7DBE8C" strokeWidth="2.5" />
          <circle cx="260" cy="260" r="9" fill="#7DBE8C" />
          <g fontFamily="Inter,sans-serif" fontSize="15" fontWeight="600" fill="#E6DAC6">
            <circle cx="365" cy="170" r="8" fill="#D9A650" /><text x="379" y="175">chuva forte</text>
            <circle cx="140" cy="318" r="8" fill="#D9A650" /><text x="154" y="323">seca</text>
            <circle cx="330" cy="395" r="8" fill="#7DBE8C" /><text x="344" y="400">praga</text>
            <circle cx="190" cy="140" r="8" fill="#7DBE8C" /><text x="204" y="145">geada</text>
          </g>
          </svg>
        </div>
      </div>
    </section>
      <Footer />
    </main>
  );
}