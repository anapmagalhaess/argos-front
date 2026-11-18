/** Hoje, no formato AAAA-MM-DD, na data do aparelho (não em UTC, que pode estar um dia à frente). */
export function hojeEmTexto() {
    const agora = new Date()
    const mes = String(agora.getMonth() + 1).padStart(2, '0')
    const dia = String(agora.getDate()).padStart(2, '0')
    return `${agora.getFullYear()}-${mes}-${dia}`
}

/** "2026-11-20" vira "20/11/2026". Quebra o texto em vez de criar uma Date, para o fuso não mudar o dia. */
export function formatarData(texto: string) {
    const [ano, mes, dia] = texto.split('-')
    return `${dia}/${mes}/${ano}`
}

/** Quantos dias faltam de hoje até a data (negativo se já passou). */
export function diasAte(texto: string) {
    const [ano, mes, dia] = texto.split('-').map(Number)
    const alvo = new Date(ano, mes - 1, dia)
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    return Math.round((alvo.getTime() - hoje.getTime()) / 86_400_000)
}

/** Lê um número digitado ("1,5" ou "1.5"). Devolve NaN se não for número. */
export function lerNumero(texto: string) {
    const limpo = texto.trim().replace(',', '.')
    return limpo === '' ? NaN : Number(limpo)
}
