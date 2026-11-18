import AppRoutes from './routes/AppRoutes'
import LeitorDeTela from './components/LeitorDeTela/LeitorDeTela'
import ContaProvider from './contexto/ContaProvider'

export default function App() {
  return (
    // O provedor da conta fica por fora: a Navbar e as páginas sabem quem está usando o Argos
    <ContaProvider>
      <AppRoutes />
      {/* Botão flutuante e painel de acessibilidade com síntese de voz (ativo em todas as páginas) */}
      <LeitorDeTela />
    </ContaProvider>
  )
}
