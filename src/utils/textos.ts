/** "MILHO" vira "Milho". O banco guarda os nomes das culturas em maiúsculas. */
export function capitalizar(texto: string) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}

/** Mostra só o fim do telefone: "87990000001" vira "(••) •••••-0001". Serve para a tela de conta. */
export function esconderTelefone(telefone: string) {
    const fim = telefone.slice(-4)
    return `(••) •••••-${fim}`
}
