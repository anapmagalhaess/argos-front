/** Um integrante do grupo, com os dados de identificação que a FIAP pede (nome, RM e turma). */
export interface Integrante {
    /** Registro do aluno na FIAP, só os números (ex.: "572279"). */
    rm: string
    nome: string
    /** Turma na FIAP, ex.: "1TDSPF". */
    turma: string
    /** A área de cada um no projeto, em poucas palavras. */
    funcao: string
    /** As matérias da Global Solution pelas quais a pessoa responde. */
    materias: string[]
    /** Caminho da foto dentro de public/ (ex.: "/integrantes/572279.webp"). Sem foto, o card mostra as iniciais. */
    foto?: string
    linkedin?: string
    github?: string
}
