# argos-front
Projeto para Global Solution 2026, FIAP — CitzenTech.

## API Java

O front consome a API REST do Argos (repositório `argos-api-java`). O endereço da API fica na variável
`VITE_API_URL`: copie `.env.example` para `.env.local` e troque pelo endereço da API (a do Render, no
site publicado). Sem a variável, o front usa `http://localhost:8080`.

No site publicado, o endereço do front também precisa estar na variável `CORS_ORIGINS` da API, senão o
navegador bloqueia as chamadas.

| Tela | Chamadas à API |
|---|---|
| Triagem | `GET /municipios` · `GET /culturas` · `POST /produtores` · `POST /produtores/{id}/propriedades` · `POST /propriedades/{id}/plantios` |
| Hoje | `GET /municipios/{cd}/alertas` · `GET /propriedades/{id}/plantios` |
| Ocorrências | `GET /pragas` · `GET /plantios/{id}/ocorrencias` · `POST /plantios/{id}/ocorrencias` |

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
