import { Routes, Route } from 'react-router'

import Home from '../pages/Home/Home'
import Integrantes from '../pages/Integrantes/Integrantes'
import Sobre from '../pages/Sobre/Sobre'
import FAQ from '../pages/Faq/Faq'
import Contato from '../pages/Contato/Contato'
import Triagem from '../pages/Triagem/Triagem'
import Hoje from '../pages/Hoje/Hoje'
import Guia from '../pages/Guia/Guia'
import Ocorrencias from '../pages/Ocorrencias/Ocorrencias'
import NotFound from '../pages/NotFound/NotFound'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/triagem" element={<Triagem />} />
            <Route path="/hoje" element={<Hoje />} />
            <Route path="/guia/:cultura" element={<Guia />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes