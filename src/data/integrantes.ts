import type { Integrante } from '../types/integrante'

/**
 * Os 5 integrantes do Argos, em ordem alfabética e todos com o mesmo destaque.
 * A área de cada um segue a divisão do grupo (Documento-Guia, item 7.2).
 * Fotos: arquivos em public/integrantes/, com o RM no nome (ex.: 572279.webp).
 */
export const integrantes: Integrante[] = [
    {
        rm: '560871',
        nome: 'Ana Clara Pereira de Magalhães',
        turma: '1TDSPF',
        funcao: 'Front-end',
        materias: ['Front-End Design Engineering'],
        foto: '/integrantes/560871.webp',
        linkedin: 'https://www.linkedin.com/in/anaclmagalhaes/',
        github: 'https://github.com/anapmagalhaess',
    },
    {
        rm: '573301',
        nome: 'Diogo Guilherme de Assis Reis',
        turma: '1TDSPF',
        funcao: 'API em Java',
        materias: ['Domain Driven Design Using Java'],
        foto: '/integrantes/573301.webp',
        linkedin: 'https://www.linkedin.com/in/diogoareis/',
        github: 'https://github.com/DioohReis',
    },
    {
        rm: '572244',
        nome: 'Gabriel Razo Dantas',
        turma: '1TDSPF',
        funcao: 'Engenharia de Software',
        materias: ['Software Engineering and Business Model'],
        foto: '/integrantes/572244.webp',
        linkedin: 'https://www.linkedin.com/in/gabriel-razo-dantas-34724b301/',
        github: 'https://github.com/gabrielrazod9j-ops',
    },
    {
        rm: '572279',
        nome: 'Gabriel Ricardo Gomes Lima',
        turma: '1TDSPY',
        funcao: 'Dados e IA',
        materias: ['Building Relational Database', 'Artificial Intelligence & Chatbot'],
        foto: '/integrantes/572279.webp',
        linkedin: 'https://www.linkedin.com/in/gabriel-ricardo-lima/',
        github: 'https://github.com/gabriel-ricardo-20',
    },
    {
        rm: '569178',
        nome: 'Pedro Henrique de Lima Reis',
        turma: '1TDSPF',
        funcao: 'Python',
        materias: ['Computational Thinking Using Python'],
        foto: '/integrantes/569178.webp',
        linkedin: 'https://www.linkedin.com/in/pedrolimeis/',
        github: 'https://github.com/pedrolimeisdev',
    },
]
