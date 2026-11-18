# argos-front
Projeto para Global Solution 2026, FIAP — CitzenTech.

## API Java

O front consome a API REST do Argos (repositório `argos-api-java`), publicada em
`https://argos-api-java.onrender.com`. É o endereço que o front usa quando a variável `VITE_API_URL` não existe.
Para testar com a API rodando na sua máquina, copie `.env.example` para `.env.local` e use
`VITE_API_URL=http://localhost:8080`.

No plano gratuito do Render a API dorme quando ninguém a usa: a primeira chamada pode levar até um minuto.
As telas avisam quando isso acontece. No site publicado, o endereço do front também precisa estar na variável
`CORS_ORIGINS` da API, senão o navegador bloqueia as chamadas.

| Tela | Chamadas à API |
|---|---|
| Cadastro (Triagem) | `POST /produtores` · `POST /produtores/{id}/propriedades` · `POST /propriedades/{id}/plantios` |
| Entrar | `GET /produtores` · `GET /produtores/{id}/propriedades` |
| Hoje | `GET /propriedades/{id}/plantios` |
| Conta | `GET /produtores/{id}` |

A API só expõe produtores, propriedades e plantios. As listas de municípios e de culturas (que a API recebe
como `municipioId` e `culturaId`) ficam em `src/data/referencias.ts`, iguais ao script `argos_banco.sql`.

## Cadastro, entrada e reconhecimento por aparelho

- **Cadastro** (`/cadastro`, a mesma tela da triagem em `/triagem`): cria o produtor, a roça e, se quiser, o
  primeiro plantio, e já deixa a pessoa dentro.
- **Entrar** (`/entrar`): a pessoa escreve o telefone cadastrado. O banco do Argos não guarda senha, então isto
  *identifica* a pessoa, mas não a *autentica*: quem souber o telefone consegue entrar como ela. A tela explica isso.
- **Reconhecimento por aparelho**: com "Lembrar deste aparelho" marcado, a conta fica no `localStorage` e o aparelho
  reconhece a pessoa sozinho nas próximas visitas, até sem internet. Sem a opção, a conta fica no `sessionStorage`
  e some ao fechar a aba (para aparelho emprestado). Cada aparelho tem um código sorteado, guardado só no navegador.
  Nada disso é enviado a servidor. Se o produtor deixar de existir na API, a conta sai sozinha.
- **Minha conta** (`/conta`): mostra os dados do cadastro e do aparelho, com "Sair" e "Esquecer este aparelho".
