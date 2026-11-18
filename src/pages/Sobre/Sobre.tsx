import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import CapsulaAviso, { avisos } from "../../components/CapsulaAviso/CapsulaAviso";
import BadgeAlerta from "../../components/BadgeAlerta/BadgeAlerta";
import { Link } from "react-router";

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

    {/*TRILHA*/}
    <section className="trail [position:relative] [overflow:hidden] [padding:96px_0_120px] bg-transparent [zoom:.97]"><div className="mx-auto relative box-border w-full max-w-[1200px] px-7">
    {/*01*/}
    <div data-reveal className="stop L [--x:13%] [position:relative] max-[760px]:[margin-bottom:56px] max-[760px]:[--x:32px] max-[500px]:[--x:32px] max-[400px]:[--x:28px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[left:var(--x)] [&:before]:[top:92px] [&:before]:[bottom:0] [&:before]:[border-left:2px_dashed_rgba(125,190,140,.4)] max-[760px]:[&:before]:[top:56px] max-[500px]:[&:before]:[top:56px] max-[400px]:[&:before]:[top:48px]">
      <div className="nd [position:absolute] [left:var(--x)] [top:0] [transform:translateX(-50%)] [width:92px] [height:92px] [border-radius:50%] [border:2px_solid_var(--color-salvia)] [background:var(--color-fundo)] [box-shadow:0_0_0_10px_rgba(125,190,140,.08)] [display:flex] [align-items:center] [justify-content:center] [font-family:Lexend,sans-serif] [font-weight:800] [font-size:34px] [color:var(--color-salvia)] [z-index:1] max-[760px]:[width:56px] max-[760px]:[height:56px] max-[760px]:[font-size:21px] max-[400px]:[width:48px] max-[400px]:[height:48px] max-[400px]:[font-size:18px]">01</div>
      <div className="cnt [padding-bottom:30px] [padding-top:14px] ml-[26%] max-[760px]:[margin:0_0_0_72px] max-[400px]:[margin:0_0_0_60px]">
        <p className="m-0 up [color:var(--color-salvia)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Propósito</p>
        <p className="m-0 [margin-top:22px] [max-width:900px] [font-family:'Lexend',sans-serif] [font-weight:600] [font-size:clamp(30px,4.2vw,58px)] max-[500px]:[font-size:24px] max-[380px]:[font-size:22px] [line-height:1.16] [color:var(--color-bege)]">Queremos que a melhor informação do campo chegue <span className="[color:var(--color-salvia)]">primeiro</span> a quem tem menos acesso a ela.</p>
        <p className="m-0 [font-size:20px] [max-width:560px] [color:var(--color-texto-2)] [margin:40px_0_0_auto]">Nosso propósito é traduzir. Pegar o que hoje só um especialista entende e devolver ao produtor em uma figura, uma cor e uma frase curta, na hora em que ele ainda pode agir.</p>
        <div className="[display:flex] [flex-wrap:wrap] [gap:40px_8%] [margin-top:56px]">
          <div className="[flex:1_1_260px] [max-width:380px]"><p className="m-0 up [color:var(--color-ambar)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Quem queremos alcançar</p><p className="m-0 [margin-top:10px] [color:var(--color-texto-2)]">O produtor da agricultura familiar, quem o ajuda no celular e, mais à frente, o técnico da cooperativa que acompanha muitos produtores.</p></div>
          <div className="[flex:1_1_260px] [max-width:380px] [margin-top:48px]"><p className="m-0 up [color:var(--color-ambar)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">O que queremos mudar</p><p className="m-0 [margin-top:10px] [color:var(--color-texto-2)]">A hora da decisão: que escolher o que plantar, quando regar e como proteger a lavoura aconteça com aviso prévio, e não depois do prejuízo.</p></div>
        </div>
      </div>
    </div>
    <svg className="cn [display:block] [width:100%] [height:150px] max-[760px]:[display:none]" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true"><path className="fill-none stroke-salvia [stroke-opacity:.45] [stroke-width:2] [stroke-dasharray:3_6] [vector-effect:non-scaling-stroke]" d="M13 0 C 13 90, 87 60, 87 150" /></svg>

    {/*02*/}
    <div data-reveal className="stop R [--x:87%] [position:relative] max-[760px]:[margin-bottom:56px] max-[760px]:[--x:32px] max-[500px]:[--x:32px] max-[400px]:[--x:28px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[left:var(--x)] [&:before]:[top:92px] [&:before]:[bottom:0] [&:before]:[border-left:2px_dashed_rgba(125,190,140,.4)] max-[760px]:[&:before]:[top:56px] max-[500px]:[&:before]:[top:56px] max-[400px]:[&:before]:[top:48px]">
      <div className="nd [position:absolute] [left:var(--x)] [top:0] [transform:translateX(-50%)] [width:92px] [height:92px] [border-radius:50%] [border:2px_solid_var(--color-salvia)] [background:var(--color-fundo)] [box-shadow:0_0_0_10px_rgba(125,190,140,.08)] [display:flex] [align-items:center] [justify-content:center] [font-family:Lexend,sans-serif] [font-weight:800] [font-size:34px] [color:var(--color-salvia)] [z-index:1] max-[760px]:[width:56px] max-[760px]:[height:56px] max-[760px]:[font-size:21px] max-[400px]:[width:48px] max-[400px]:[height:48px] max-[400px]:[font-size:18px]">02</div>
      <div className="cnt organic [background:var(--color-bege)] [color:var(--color-fundo)] [margin-top:14px] [padding-top:56px] [padding-top:14px] [border-radius:90px_240px_100px_260px_/_130px_100px_240px_80px] [padding:64px_72px] max-[760px]:[padding:40px_28px] max-[500px]:[padding:36px_20px] max-[400px]:[padding:28px_16px] mr-[26%] max-[760px]:[margin:0_0_0_72px] max-[400px]:[margin:0_0_0_60px] max-[760px]:[&>p:not(.up)]:[font-size:16px] max-[500px]:[&>p:not(.up)]:[font-size:15px] max-[380px]:[&>p:not(.up)]:[font-size:14px] max-[760px]:[&>h2]:[font-size:30px] max-[500px]:[&>h2]:[font-size:26px] max-[380px]:[&>h2]:[font-size:23px] max-[500px]:[&>h2]:[line-height:1.08]">
        <p className="m-0 up [color:var(--color-mata)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Onde mais ajuda</p>
        <h2 className="font-titulo m-0 [margin-top:16px] [font-size:clamp(34px,4.6vw,64px)] max-[760px]:[font-size:30px] max-[500px]:[font-size:26px] max-[380px]:[font-size:23px] max-[760px]:[line-height:1.08] [font-weight:800] [text-transform:uppercase] [color:var(--color-fundo)]">Feito para quando o clima muda.</h2>
        <p className="m-0 [margin-top:22px] [font-size:20px] [max-width:640px]">O primeiro uso que tivemos em mente foi apoiar o produtor durante o El Niño de 2026, o aquecimento do Pacífico que muda a chuva no Brasil. Mas a ideia vale para qualquer risco ambiental que vier depois.</p>
        <div className="[display:flex] [flex-wrap:wrap] [gap:36px_56px] [margin-top:44px]">
          <div className="[flex:1_1_280px] [display:flex] [gap:20px] [align-items:flex-start] [min-width:0] max-[500px]:[gap:12px] max-[500px]:[flex:1_1_100%] max-[500px]:[flex-direction:column] max-[500px]:[gap:12px] max-[500px]:[min-width:0]">
            <div className="ic [flex:0_0_96px] [height:96px] max-[500px]:[flex:0_0_56px] max-[500px]:[height:56px] [border-radius:50%] [background:var(--color-fundo)] [display:flex] [align-items:center] [justify-content:center]">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#D9A650" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
              </svg>
            </div>
          <div>
            <h3 className="font-titulo m-0 [font-size:24px] max-[500px]:[font-size:20px] [color:var(--color-fundo)]">Norte e Nordeste</h3>
            <p className="m-0 up [color:var(--color-mata)] [font-size:12px] [margin-top:4px] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Mais seca e calor</p>
            <p className="m-0 [margin-top:8px] [font-size:17px] max-[500px]:[font-size:15px]">O Argos dá prioridade aos avisos de seca e calor e orienta o que fazer: guardar água, cobrir a semente e planejar o plantio.</p>
          </div>
        </div>
        <div className="[flex:1_1_280px] [display:flex] [gap:20px] [align-items:flex-start] [min-width:0] max-[500px]:[gap:12px] max-[500px]:[flex:1_1_100%] max-[500px]:[flex-direction:column] max-[500px]:[gap:12px] max-[500px]:[min-width:0] [margin-top:36px]">
          <div className="ic [flex:0_0_96px] [height:96px] max-[500px]:[flex:0_0_56px] max-[500px]:[height:56px] [border-radius:50%] [background:var(--color-fundo)] [display:flex] [align-items:center] [justify-content:center]">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#7DBE8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3s5 6 5 10a5 5 0 0 1-10 0c0-4 5-10 5-10z" />
              </svg>
          </div>
          <div>
            <h3 className="font-titulo m-0 [font-size:24px] max-[500px]:[font-size:20px] [color:var(--color-fundo)]">Sul</h3>
            <p className="m-0 up [color:var(--color-mata)] [font-size:12px] [margin-top:4px] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Mais chuva e fungo</p>
            <p className="m-0 [margin-top:8px] [font-size:17px] max-[500px]:[font-size:15px]">Os avisos mudam de foco: chuva forte, excesso de água e atenção ao fungo, que aparece quando a lavoura fica úmida demais.</p>
          </div>
        </div>
      </div>
      <p className="m-0 [margin-top:52px] [font-family:'Lexend',sans-serif] [font-weight:600] [font-size:clamp(21px,2.2vw,28px)] max-[500px]:[font-size:17px] max-[380px]:[font-size:16px] [line-height:1.3] [max-width:720px]">
        <span className="[display:inline-block] [width:16px] [height:16px] [border-radius:50%] [background:var(--color-mata)] [margin-right:14px]"></span>O primeiro foco é o Nordeste, onde a Confederação Nacional de Municípios registrou o maior prejuízo do trimestre de julho a setembro.
      </p>
      <p className="m-0 up [margin-top:56px] [color:var(--color-mata)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Sete tipos de aviso, prontos para outros riscos</p>
      <div className="[display:flex] [flex-wrap:wrap] [gap:14px] [margin-top:18px] max-[760px]:[flex-direction:column] [align-items:center]">{avisos.map((aviso) => <CapsulaAviso key={aviso.tipo} aviso={aviso} />)}</div>
      <p className="m-0 [margin-top:36px] [font-size:19px] [max-width:640px] [margin-left:auto]">O El Niño é o primeiro teste. O mesmo sistema serve a uma geada fora de época, a uma enchente ou a uma onda de calor: muda o aviso, não o jeito de entregá-lo.</p>
      </div>
    </div>
    <svg className="cn [display:block] [width:100%] [height:150px] max-[760px]:[display:none]" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
      <path className="fill-none stroke-salvia [stroke-opacity:.45] [stroke-width:2] [stroke-dasharray:3_6] [vector-effect:non-scaling-stroke]" d="M87 0 C 87 90, 13 60, 13 150" />
    </svg>

    {/*03*/}
    <div data-reveal className="stop L [--x:13%] [position:relative] max-[760px]:[margin-bottom:56px] max-[760px]:[--x:32px] max-[500px]:[--x:32px] max-[400px]:[--x:28px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[left:var(--x)] [&:before]:[top:92px] [&:before]:[bottom:0] [&:before]:[border-left:2px_dashed_rgba(125,190,140,.4)] max-[760px]:[&:before]:[top:56px] max-[500px]:[&:before]:[top:56px] max-[400px]:[&:before]:[top:48px]">
      <div className="nd [position:absolute] [left:var(--x)] [top:0] [transform:translateX(-50%)] [width:92px] [height:92px] [border-radius:50%] [border:2px_solid_var(--color-salvia)] [background:var(--color-fundo)] [box-shadow:0_0_0_10px_rgba(125,190,140,.08)] [display:flex] [align-items:center] [justify-content:center] [font-family:Lexend,sans-serif] [font-weight:800] [font-size:34px] [color:var(--color-salvia)] [z-index:1] max-[760px]:[width:56px] max-[760px]:[height:56px] max-[760px]:[font-size:21px] max-[400px]:[width:48px] max-[400px]:[height:48px] max-[400px]:[font-size:18px]">03</div>
      <div className="cnt [padding-bottom:30px] [padding-top:14px] ml-[26%] max-[760px]:[margin:0_0_0_72px] max-[400px]:[margin:0_0_0_60px]">
        <p className="m-0 up [color:var(--color-salvia)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">A origem</p>
        <h3 className="font-titulo m-0 [margin-top:16px] [font-size:clamp(40px,5vw,68px)] max-[500px]:[font-size:30px] max-[380px]:[font-size:27px] [line-height:1] [font-weight:800] [text-transform:uppercase] [color:var(--color-bege)]">Global Solution</h3>
        <p className="m-0 [margin-top:26px] [color:var(--color-texto-2)] [font-size:19px] [columns:2_300px] [column-gap:48px] max-[760px]:[columns:1] max-[760px]:[column-gap:0] [max-width:900px]">É o projeto integrador da FIAP: o grupo cria uma única solução e a aplica em várias disciplinas. Em 2026/2, o tema é <strong className="[color:var(--color-bege)]">CitizenTech</strong>, ou seja, tecnologia que resolve um problema real do cidadão. As seis disciplinas são Banco de Dados, Inteligência Artificial, Java, Python, Engenharia de Software e Modelo de Negócio, e Front-End, e o Argos aparece em todas. Entre as frentes possíveis do tema, escolhemos <strong className="[color:var(--color-bege)]">Campo</strong> e <strong className="[color:var(--color-bege)]">Clima e emergências</strong>.</p>
        <div aria-hidden="true" className="[margin:52px_0_24px] [border-bottom:2px_dashed_var(--color-linha)]" />
        <p className="m-0 up [color:var(--color-salvia)] [margin-top:32px] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">As ODS que escolhemos e por quê</p>
        <div className="[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr))] [gap:36px_48px] [margin-top:26px]">
          {/*ODS 1*/}
          <div className="[display:flex] [gap:20px] [align-items:flex-start] [min-width:0] max-[500px]:[gap:12px]">
            <div className="hx [background:var(--color-ambar)] [flex:0_0_84px] [height:96px] max-[500px]:[flex:0_0_64px] max-[500px]:[height:74px] max-[500px]:[font-size:23px] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] [background:var(--color-salvia)] [color:var(--color-fundo)] [display:flex] [align-items:center] [justify-content:center] [font-family:Lexend,sans-serif] [font-weight:800] [font-size:28px]">2</div>
            <div>
              <h3 className="font-titulo m-0 [font-size:22px] max-[500px]:[font-size:17px] max-[380px]:[font-size:16px] [color:var(--color-bege)]">Fome zero e agricultura sustentável</h3>
              <span className="up [display:inline-block] [margin:6px_0_4px] [font-size:11px] [background:var(--color-ambar)] [color:var(--color-fundo)] [border-radius:999px] [padding:3px_12px] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Principal</span>
              <p className="m-0 [color:var(--color-texto-2)] [font-size:16px] [margin-top:4px]">Porque é o centro do projeto: quem produz alimento precisa de informação a tempo para proteger a colheita e a renda.</p>
            </div>
          </div>
          {/*ODS 2*/}
          <div className="[display:flex] [gap:20px] [align-items:flex-start] [min-width:0] max-[500px]:[gap:12px]">
            <div className="hx [flex:0_0_84px] [height:96px] max-[500px]:[flex:0_0_64px] max-[500px]:[height:74px] max-[500px]:[font-size:23px] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] [background:var(--color-salvia)] [color:var(--color-fundo)] [display:flex] [align-items:center] [justify-content:center] [font-family:Lexend,sans-serif] [font-weight:800] [font-size:28px]">13</div>
            <div>
              <h3 className="font-titulo m-0 [font-size:22px] max-[500px]:[font-size:17px] max-[380px]:[font-size:16px] [color:var(--color-bege)]">Ação climática</h3>
              <p className="m-0 [color:var(--color-texto-2)] [font-size:16px] max-[500px]:[font-size:13px] [margin-top:8px]">Porque o El Niño de 2026 e outros riscos do clima pedem aviso prévio e preparo, e é isso que o Argos entrega.</p>
            </div>
          </div>
          {/*ODS 3*/}
          <div className="[display:flex] [gap:20px] [align-items:flex-start] [min-width:0] max-[500px]:[gap:12px]">
            <div className="hx [flex:0_0_84px] [height:96px] max-[500px]:[flex:0_0_64px] max-[500px]:[height:74px] max-[500px]:[font-size:23px] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] [background:var(--color-salvia)] [color:var(--color-fundo)] [display:flex] [align-items:center] [justify-content:center] [font-family:Lexend,sans-serif] [font-weight:800] [font-size:28px]">10</div>
            <div>
              <h3 className="font-titulo m-0 [font-size:22px] max-[500px]:[font-size:17px] max-[380px]:[font-size:16px] [color:var(--color-bege)]">Redução das desigualdades</h3>
              <p className="m-0 [color:var(--color-texto-2)] [font-size:16px] max-[500px]:[font-size:13px] [margin-top:8px]">Porque quem tem menos acesso a técnico, leitura e internet é quem mais fica sem a informação. O Argos a leva em linguagem simples.</p>
            </div>
          </div>
          {/*ODS 4*/}
          <div className="[display:flex] [gap:20px] [align-items:flex-start] [min-width:0] max-[500px]:[gap:12px]">
            <div className="hx [flex:0_0_84px] [height:96px] max-[500px]:[flex:0_0_64px] max-[500px]:[height:74px] max-[500px]:[font-size:23px] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] [background:var(--color-salvia)] [color:var(--color-fundo)] [display:flex] [align-items:center] [justify-content:center] [font-family:Lexend,sans-serif] [font-weight:800] [font-size:28px]">9</div>
            <div>
              <h3 className="font-titulo m-0 [font-size:22px] max-[500px]:[font-size:17px] max-[380px]:[font-size:16px] [color:var(--color-bege)]">Indústria, inovação e infraestrutura</h3>
              <p className="m-0 [color:var(--color-texto-2)] [font-size:16px] max-[500px]:[font-size:13px] [margin-top:8px]">Porque usa tecnologia e inovação para colocar o aviso ao alcance do pequeno produtor, direto no celular.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <svg className="cn [display:block] [width:100%] [height:150px] max-[760px]:[display:none]" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
      <path className="fill-none stroke-salvia [stroke-opacity:.45] [stroke-width:2] [stroke-dasharray:3_6] [vector-effect:non-scaling-stroke]" d="M13 0 C 13 90, 87 60, 87 150" />
    </svg>

    {/*04*/}
    <div data-reveal className="stop R [--x:87%] [position:relative] max-[760px]:[margin-bottom:56px] max-[760px]:[--x:32px] max-[500px]:[--x:32px] max-[400px]:[--x:28px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[left:var(--x)] [&:before]:[top:92px] [&:before]:[bottom:0] [&:before]:[border-left:2px_dashed_rgba(125,190,140,.4)] max-[760px]:[&:before]:[top:56px] max-[500px]:[&:before]:[top:56px] max-[400px]:[&:before]:[top:48px]" id="como">
      <div className="nd [position:absolute] [left:var(--x)] [top:0] [transform:translateX(-50%)] [width:92px] [height:92px] [border-radius:50%] [border:2px_solid_var(--color-salvia)] [background:var(--color-fundo)] [box-shadow:0_0_0_10px_rgba(125,190,140,.08)] [display:flex] [align-items:center] [justify-content:center] [font-family:Lexend,sans-serif] [font-weight:800] [font-size:34px] [color:var(--color-salvia)] [z-index:1] max-[760px]:[width:56px] max-[760px]:[height:56px] max-[760px]:[font-size:21px] max-[400px]:[width:48px] max-[400px]:[height:48px] max-[400px]:[font-size:18px]">04</div>
      <div className="cnt [padding-bottom:30px] [padding-top:14px] mr-[26%] max-[760px]:[margin:0_0_0_72px] max-[400px]:[margin:0_0_0_60px]">
        <p className="m-0 up [color:var(--color-salvia)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Na prática</p>
        <div className="[display:flex] [flex-wrap:wrap] [gap:40px_64px] [align-items:flex-start] [margin-top:16px]">
          <div className="[flex:1_1_380px]">
            <h2 className="font-titulo m-0 [font-size:clamp(32px,4vw,54px)] max-[500px]:[font-size:28px] max-[380px]:[font-size:25px] [line-height:1.06] [font-weight:800] [text-transform:uppercase]">Uma conversa curta, uma roça entendida.</h2>
            <p className="m-0 pp [font-size:20px] [font-size:18px] [color:var(--color-bege)] [margin-top:18px]">Tudo começa com um cadastro rápido. O produtor, ou alguém da família, informa o nome, o celular e o município, e autoriza o uso dos dados: <strong>sem consentimento, não há cadastro</strong>. Em seguida vêm de dez a doze perguntas, uma por tela, que se respondem tocando em figuras e ouvindo a pergunta.</p>
            <p className="m-0 pp [font-size:18px] [color:var(--color-bege)] [margin-top:18px]">Com as respostas, o Argos passa a conhecer a roça: o que está plantado, o tamanho da área, de onde vem a água e se o terreno alaga. É esse perfil que faz <strong>o aviso certo chegar ao produtor certo</strong>, em vez de um alerta genérico.</p>
            <p className="m-0 pp [font-size:18px] [color:var(--color-bege)] [margin-top:18px]">Depois disso, a tela "Hoje" reúne os avisos do município, cada um com nível, ícone, palavra e fonte. Quem quer saber o que fazer abre o guia visual, que compara a planta saudável com a que sofre de praga, seca ou excesso de água. Não há senha para lembrar: o aparelho guarda o código do produtor.</p>
          </div>
          {/*celular*/}
          <div className="[flex:0_0_300px] [margin:0_auto] [transform:rotate(3deg)] max-[500px]:[flex:1_1_100%] max-[500px]:[width:100%] max-[500px]:[max-width:300px]">
            <div className="[width:300px] max-[500px]:[width:100%] [box-sizing:border-box] [background:var(--color-fundo)] [border:8px_solid_var(--color-linha)] [border-radius:42px] [padding:22px_16px_18px] max-[500px]:[padding:18px_12px_14px] [box-shadow:0_40px_80px_rgba(0,0,0,.55)]">
              <p className="m-0 up [font-size:11px] [color:var(--color-texto-2)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Hoje em Petrolina · exemplo</p>
              <p className="m-0 [font-family:'Lexend',sans-serif] [font-weight:700] [font-size:26px] [line-height:1.15] [margin-top:6px] [color:var(--color-bege)]">3 avisos para você</p>
              <div className="[display:flex] [flex-direction:column] [gap:8px] [margin-top:16px]">
                {/*badges*/}
                <div className="flex w-full flex-col gap-1.5"><BadgeAlerta nivel={3} titulo="Perigo de seca" tamanho="compacto" className="w-full max-[500px]:gap-2 max-[500px]:rounded-lg max-[500px]:px-2 max-[500px]:py-1.5 max-[500px]:text-[13px] max-[500px]:[&_svg]:h-[18px] max-[500px]:[&_svg]:w-[18px]" />
                  <p className="m-0 pl-[36px] pr-3 text-left text-[13px] text-texto-2">Guarde água. Pouca chuva nos próximos dias.</p>
                </div>
                <div className="flex w-full flex-col gap-1.5"><BadgeAlerta nivel={2} titulo="Atenção: calor forte" tamanho="compacto" className="w-full max-[500px]:gap-2 max-[500px]:rounded-lg max-[500px]:px-2 max-[500px]:py-1.5 max-[500px]:text-[13px] max-[500px]:[&_svg]:h-[18px] max-[500px]:[&_svg]:w-[18px]" />
                  <p className="m-0 pl-[36px] pr-3 text-left text-[13px] text-texto-2">Cubra a semente. Plante cedo.</p>
                </div>
                <div className="flex w-full flex-col gap-1.5"><BadgeAlerta nivel={1} titulo="Praga: tudo certo" tamanho="compacto" className="w-full max-[500px]:gap-2 max-[500px]:rounded-lg max-[500px]:px-2 max-[500px]:py-1.5 max-[500px]:text-[13px] max-[500px]:[&_svg]:h-[18px] max-[500px]:[&_svg]:w-[18px]" /></div>
              </div>
              <div className="[margin-top:16px] [border-radius:999px] [background:var(--color-salvia)] [color:var(--color-fundo)] [text-align:center] [font-family:'Lexend',sans-serif] [font-weight:600] [font-size:15px] [padding:14px]">Ouvir os avisos</div>
              <p className="m-0 [margin-top:12px] [font-size:12px] [color:var(--color-texto-2)] [text-align:center]">Fonte: INMET · dados de exemplo</p>
            </div>
          </div>
        </div>
        <p className="m-0 [margin-top:48px] [font-family:'Lexend',sans-serif] [font-weight:700] [font-size:clamp(30px,4vw,52px)] [line-height:1.1] [color:var(--color-salvia)] [max-width:720px]">Aviso que chega antes do problema.</p>
        </div>
      </div>
      <svg className="cn [display:block] [width:100%] [height:150px] max-[760px]:[display:none]" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
        <path className="fill-none stroke-salvia [stroke-opacity:.45] [stroke-width:2] [stroke-dasharray:3_6] [vector-effect:non-scaling-stroke]" d="M87 0 C 87 90, 13 60, 13 150" />
      </svg>

    {/*05*/}
    <div data-reveal className="stop L [--x:13%] [position:relative] max-[760px]:[margin-bottom:56px] max-[760px]:[--x:32px] max-[500px]:[--x:32px] max-[400px]:[--x:28px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[left:var(--x)] [&:before]:[top:92px] [&:before]:[bottom:0] [&:before]:[border-left:2px_dashed_rgba(125,190,140,.4)] max-[760px]:[&:before]:[top:56px] max-[500px]:[&:before]:[top:56px] max-[400px]:[&:before]:[top:48px]">
      <div className="nd [position:absolute] [left:var(--x)] [top:0] [transform:translateX(-50%)] [width:92px] [height:92px] [border-radius:50%] [border:2px_solid_var(--color-salvia)] [background:var(--color-fundo)] [box-shadow:0_0_0_10px_rgba(125,190,140,.08)] [display:flex] [align-items:center] [justify-content:center] [font-family:Lexend,sans-serif] [font-weight:800] [font-size:34px] [color:var(--color-salvia)] [z-index:1] max-[760px]:[width:56px] max-[760px]:[height:56px] max-[760px]:[font-size:21px] max-[400px]:[width:48px] max-[400px]:[height:48px] max-[400px]:[font-size:18px]">05</div>
      <div className="cnt [padding-bottom:30px] [padding-top:14px] ml-[26%] max-[760px]:[margin:0_0_0_72px] max-[400px]:[margin:0_0_0_60px]">
        <p className="m-0 up [color:var(--color-salvia)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Por dentro</p>
        <h2 className="font-titulo m-0 [margin:16px_0_48px] [font-size:clamp(34px,4.6vw,62px)] max-[500px]:[font-size:28px] max-[380px]:[font-size:25px] [line-height:1.04] [font-weight:800] [text-transform:uppercase] [max-width:760px]">As peças por trás do aviso.</h2>
        <div className="[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))] [gap:40px_56px] ">
          <div className="pc [position:relative] [padding-left:26px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[margin-top:60px] [&:before]:[left:0] [&:before]:[top:11px] [&:before]:[width:12px] [&:before]:[height:12px] [&:before]:[border-radius:50%] [&:before]:[background:var(--color-salvia)] [&_b]:[display:block] [&_b]:[font-family:Lexend,sans-serif] [&_b]:[font-size:24px] [&_b]:[font-weight:600] [&_b]:[color:var(--color-salvia)] [&_b]:[margin-top:60px] [&_b]:[margin-bottom:6px] [&_p]:[color:var(--color-bege)] [&_p]:[font-size:17px] [&_p]:[max-width:400px]">
            <b>O que o produtor vê</b>
            <p>Um site pensado para o celular, feito em React e TypeScript, com a triagem, os avisos do dia e o guia visual.</p>
          </div>
          <div className="pc [margin-top:44px] [position:relative] [padding-left:26px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[left:0] [&:before]:[top:11px] [&:before]:[width:12px] [&:before]:[height:12px] [&:before]:[border-radius:50%] [&:before]:[background:var(--color-salvia)] [&_b]:[display:block] [&_b]:[font-family:Lexend,sans-serif] [&_b]:[font-size:24px] [&_b]:[font-weight:600] [&_b]:[color:var(--color-salvia)] [&_b]:[margin-bottom:6px] [&_p]:[color:var(--color-bege)] [&_p]:[font-size:17px] [&_p]:[max-width:400px]">
            <b>Quem cuida dos dados</b>
            <p>Uma API em Java conversa com um banco Oracle, onde ficam produtores, propriedades, plantios, culturas, pragas e avisos.</p>
          </div>
          <div className="pc [position:relative] [padding-left:26px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[left:0] [&:before]:[top:11px] [&:before]:[width:12px] [&:before]:[height:12px] [&:before]:[border-radius:50%] [&:before]:[background:var(--color-salvia)] [&_b]:[display:block] [&_b]:[font-family:Lexend,sans-serif] [&_b]:[font-size:24px] [&_b]:[font-weight:600] [&_b]:[color:var(--color-salvia)] [&_b]:[margin-bottom:6px] [&_p]:[color:var(--color-bege)] [&_p]:[font-size:17px] [&_p]:[max-width:400px]">
            <b>Quem antecipa o risco</b>
            <p>Modelos de aprendizado de máquina, feitos em Python, estimam quanto uma lavoura deve render e se há risco de quebra de safra, a partir de dados do IBGE e do clima.</p>
          </div>
          <div className="pc [margin-top:44px] [position:relative] [padding-left:26px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[left:0] [&:before]:[top:11px] [&:before]:[width:12px] [&:before]:[height:12px] [&:before]:[border-radius:50%] [&:before]:[background:var(--color-salvia)] [&_b]:[display:block] [&_b]:[font-family:Lexend,sans-serif] [&_b]:[font-size:24px] [&_b]:[font-weight:600] [&_b]:[color:var(--color-salvia)] [&_b]:[margin-bottom:6px] [&_p]:[color:var(--color-bege)] [&_p]:[font-size:17px] [&_p]:[max-width:400px]">
            <b>A ferramenta de campo</b>
            <p>Um terminal em Python, que funciona sem internet, para o técnico ou o ajudante fazer a triagem junto com o produtor.</p>
          </div>
          <div className="pc [position:relative] [padding-left:26px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[left:0] [&:before]:[top:11px] [&:before]:[width:12px] [&:before]:[height:12px] [&:before]:[border-radius:50%] [&:before]:[background:var(--color-salvia)] [&_b]:[display:block] [&_b]:[font-family:Lexend,sans-serif] [&_b]:[font-size:24px] [&_b]:[font-weight:600] [&_b]:[color:var(--color-salvia)] [&_b]:[margin-bottom:6px] [&_p]:[color:var(--color-bege)] [&_p]:[font-size:17px] [&_p]:[max-width:400px]">
            <b>O modelo de negócio</b>
            <p>Define quem usa, quem paga e como o serviço se sustenta: o produtor não paga, e quem contrata é a cooperativa ou o poder público.</p>
          </div>
        </div>
        {/*LIMITES*/}
        <p className="m-0 up [color:var(--color-ambar)] [margin-top:64px] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Limites que assumimos</p>
        <div className="[display:flex] [flex-wrap:wrap] [gap:14px] [margin-top:18px] max-[760px]:[flex-direction:column]">
          <span className="pill [border:2px_solid_var(--color-linha)] [border-radius:999px] [padding:12px_24px] [color:var(--color-texto-2)] [font-size:17px] max-[760px]:[width:100%] max-[760px]:[padding:10px_14px] max-[760px]:[font-size:15px] max-[500px]:[padding:8px_12px] max-[500px]:[font-size:13px] max-[400px]:[padding:6px_10px] max-[500px]:[font-size:15px]">Não é um chatbot de conversa aberta.</span>
          <span className="pill [border:2px_solid_var(--color-linha)] [border-radius:999px] [padding:12px_24px] [color:var(--color-texto-2)] [font-size:17px] max-[760px]:[width:100%] max-[760px]:[padding:10px_14px] max-[760px]:[font-size:15px] max-[500px]:[padding:8px_12px] max-[500px]:[font-size:13px] max-[400px]:[padding:6px_10px] max-[500px]:[font-size:15px]">Não diagnostica pragas por foto.</span>
          <span className="pill [border:2px_solid_var(--color-linha)] [border-radius:999px] [padding:12px_24px] [color:var(--color-texto-2)] [font-size:17px] max-[760px]:[width:100%] max-[760px]:[padding:10px_14px] max-[760px]:[font-size:15px] max-[500px]:[padding:8px_12px] max-[500px]:[font-size:13px] max-[400px]:[padding:6px_10px] max-[500px]:[font-size:15px]">Não substitui o técnico: nos casos graves, orienta a procurar um.</span>
        </div>
      </div>
    </div>
    <svg className="cn [display:block] [width:100%] [height:150px] max-[760px]:[display:none]" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true"><path className="fill-none stroke-salvia [stroke-opacity:.45] [stroke-width:2] [stroke-dasharray:3_6] [vector-effect:non-scaling-stroke]" d="M13 0 C 13 90, 87 60, 87 150" /></svg>

    {/*FECHAMENTO*/}
    <div data-reveal className="stop R [--x:87%] [position:relative] max-[760px]:[margin-bottom:56px] max-[760px]:[--x:32px] max-[500px]:[--x:32px] max-[400px]:[--x:28px] [&:before]:[content:''] [&:before]:[position:absolute] [&:before]:[left:var(--x)] [&:before]:[top:92px] [&:before]:[bottom:0] [&:before]:[border-left:2px_dashed_rgba(125,190,140,.4)] max-[760px]:[&:before]:[top:56px] max-[500px]:[&:before]:[top:56px] max-[400px]:[&:before]:[top:48px]">
      <div className="nd am [position:absolute] [left:var(--x)] [top:0] [transform:translateX(-50%)] [width:92px] [height:92px] [border-radius:50%] [border:2px_solid_var(--color-salvia)] [background:var(--color-fundo)] [box-shadow:0_0_0_10px_rgba(125,190,140,.08)] [display:flex] [align-items:center] [justify-content:center] [font-family:Lexend,sans-serif] [font-weight:800] [font-size:34px] [color:var(--color-salvia)] [z-index:1] max-[760px]:[width:56px] max-[760px]:[height:56px] max-[760px]:[font-size:21px] max-[400px]:[width:48px] max-[400px]:[height:48px] max-[400px]:[font-size:18px] [border-color:var(--color-ambar)] [box-shadow:0_0_0_10px_rgba(217,166,80,.1)] [&:after]:content-[''] [&:after]:[width:30px] [&:after]:[height:30px] [&:after]:[border-radius:50%] [&:after]:[background:var(--color-ambar)]">
    </div>
    <div className="cnt organic [background:var(--color-mata)] [margin-top:14px] [padding-top:56px] [padding-top:14px] [border-radius:90px_240px_100px_260px_/_130px_100px_240px_80px] [padding:64px_72px] max-[760px]:[padding:40px_28px] max-[500px]:[padding:36px_20px] max-[400px]:[padding:28px_16px] mr-[26%] max-[760px]:[margin:0_0_0_72px] max-[400px]:[margin:0_0_0_60px] max-[760px]:[&>p:not(.up)]:[font-size:16px] max-[500px]:[&>p:not(.up)]:[font-size:15px] max-[380px]:[&>p:not(.up)]:[font-size:14px] max-[760px]:[&>h2]:[font-size:30px] max-[500px]:[&>h2]:[font-size:26px] max-[380px]:[&>h2]:[font-size:23px] max-[500px]:[&>h2]:[line-height:1.08]">
      <p className="m-0 up [color:var(--color-bege)] [text-transform:uppercase] [letter-spacing:.14em] [font-weight:600] [font-size:13px]">Depois da Global Solution</p>
      <h2 className="font-titulo m-0 [margin-top:16px] [font-size:clamp(32px,4.4vw,60px)] max-[760px]:[font-size:28px] max-[500px]:[font-size:24px] max-[380px]:[font-size:21px] [line-height:1.08] [font-weight:800] [text-transform:uppercase]">Avisos em tempo real, um painel para quem apoia o produtor e novos canais de aviso.</h2>
      <div className="[display:flex] [flex-wrap:wrap] [gap:12px_36px] [margin-top:32px]">
        <Link to="/triagem" className="lnk inline-block no-underline transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-ambar hover:underline hover:decoration-2 hover:underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-salvia motion-reduce:transition-none">Começar a triagem →</Link>
        <Link to="/integrantes" className="lnk inline-block no-underline transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-ambar hover:underline hover:decoration-2 hover:underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-salvia motion-reduce:transition-none">Conhecer a equipe →</Link>
      </div>
    </div>
    </div>

  </div>
  </section>
  <Footer />
</main>
);
}
