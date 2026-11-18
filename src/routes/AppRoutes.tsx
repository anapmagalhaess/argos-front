import { Routes, Route } from 'react-router'

import Home from '../pages/Home/Home'
import Integrantes from '../pages/Integrantes/Integrantes'
import Sobre from '../pages/Sobre/Sobre'
import Solucao from '../pages/Solucao/Solucao'
import FAQ from '../pages/Faq/Faq'
import Contato from '../pages/Contato/Contato'
import Triagem from '../pages/Triagem/Triagem'
import Entrar from '../pages/Entrar/Entrar'
import Conta from '../pages/Conta/Conta'
import Hoje from '../pages/Hoje/Hoje'
import Guia from '../pages/Guia/Guia'
import Mapa from '../pages/Mapa/Mapa'
import Ocorrencias from '../pages/Ocorrencias/Ocorrencias'
import NotFound from '../pages/NotFound/NotFound'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/solucao" element={<Solucao />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/triagem" element={<Triagem />} />
            {/* O cadastro é a própria triagem: /cadastro e /triagem abrem a mesma tela */}
            <Route path="/cadastro" element={<Triagem />} />
            <Route path="/entrar" element={<Entrar />} />
            <Route path="/conta" element={<Conta />} />
            <Route path="/hoje" element={<Hoje />} />
            <Route path="/guia/:cultura" element={<Guia />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes