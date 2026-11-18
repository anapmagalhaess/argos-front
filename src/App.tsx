import AppRoutes from './routes/AppRoutes'
import LeitorDeTela from './components/LeitorDeTela/LeitorDeTela'

export default function App() {
  return (
    <>
      <AppRoutes />
      {/* Botão flutuante e painel de acessibilidade com síntese de voz (ativo em todas as páginas) */}
      <LeitorDeTela />
    </>
  )
}
