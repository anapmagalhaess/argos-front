/**
 * Indicador de carregamento.
 * A API no Render pode levar ~1 minuto para acordar — avisamos o produtor.
 */
export default function EstadoCarregando() {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 py-10 text-center"
    >
      {/* Animação simples de três pontinhos pulsando */}
      <div className="flex gap-2" aria-hidden="true">
        <span className="h-3 w-3 animate-bounce rounded-full bg-salvia [animation-delay:0ms]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-salvia [animation-delay:150ms]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-salvia [animation-delay:300ms]" />
      </div>
      <p className="font-corpo text-lg text-bege">
        Sistema carregando, aguarde um pouco…
      </p>
      <p className="font-corpo text-base text-texto-2">
        Pode levar até um minuto na primeira vez.
      </p>
    </div>
  )
}
