import type { ErroApi } from '../types/erroApi';

/**
    URL base da API REST Java publicada no Render.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'https://argos-api-java.onrender.com';

/**
 * Classe customizada de erro para respostas da API Java.
 * Permite que a interface recupere a mensagem e a lista de campos inválidos.
 */
export class ErroDeApi extends Error {
    corpo: ErroApi;

    constructor(corpo: ErroApi) {
        super(corpo.mensagem || `Erro na requisição (Status ${corpo.status})`);
        this.name = 'ErroDeApi';
        this.corpo = corpo;
    }
}

/**
 * Função utilitária centralizada de requisições HTTP usando Fetch API nativa.
 */
export async function requisicao<T>(
    caminho: string,
    opcoes: RequestInit = {},
    sinal?: AbortSignal
): Promise<T> {
    const url = `${BASE_URL.replace(/\/$/, '')}${caminho.startsWith('/') ? caminho : `/${caminho}`}`;

    const cabecalhosPadrao: Record<string, string> = {
        'Accept': 'application/json',
    };

    if (opcoes.body && typeof opcoes.body === 'string') {
        cabecalhosPadrao['Content-Type'] = 'application/json';
    }

    const resposta = await fetch(url, {
        ...opcoes,
        signal: sinal,
        headers: {
            ...cabecalhosPadrao,
            ...opcoes.headers,
        },
    });

    // Se o status for 204 No Content (ex: DELETE bem sucedido)
    if (resposta.status === 204) {
        return undefined as T;
    }

    if (!resposta.ok) {
        let corpoErro: ErroApi;
        try {
            corpoErro = (await resposta.json()) as ErroApi;
        } catch {
            corpoErro = {
                status: resposta.status,
                mensagem: `O servidor retornou erro ${resposta.status}: ${resposta.statusText}`,
            };
        }

        throw new ErroDeApi(corpoErro);
    }

    return (await resposta.json()) as T;
}

/**
 * Método de conveniência para requisições GET
 */
export function buscar<T>(caminho: string, sinal?: AbortSignal): Promise<T> {
    return requisicao<T>(caminho, { method: 'GET' }, sinal);
}

/**
 * Método de conveniência para requisições POST
 */
export function enviar<T, B = unknown>(caminho: string, dados: B, sinal?: AbortSignal): Promise<T> {
    return requisicao<T>(
        caminho,
        {
            method: 'POST',
            body: JSON.stringify(dados),
        },
        sinal
    );
}

/**
 * Método de conveniência para requisições PUT
 */
export function atualizar<T, B = unknown>(caminho: string, dados: B, sinal?: AbortSignal): Promise<T> {
    return requisicao<T>(
        caminho,
        {
            method: 'PUT',
            body: JSON.stringify(dados),
        },
        sinal
    );
}

/**
 * Método de conveniência para requisições DELETE
 */
export function remover(caminho: string, sinal?: AbortSignal): Promise<void> {
    return requisicao<void>(caminho, { method: 'DELETE' }, sinal);
}
