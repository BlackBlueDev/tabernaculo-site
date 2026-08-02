# Tabernáculo de Davi (TDD Sede) - Site Institucional em Vue 3 + Vite

Este repositório contém o novo site oficial da igreja **Tabernáculo de Davi (TDD Sede)** em Caruaru-PE, refatorado para a framework moderna **Vue 3 + Vite**, ícones **Lucide Icons** e **gestão dinâmica total via JSON** (`conteudo.json`).

---

## 🚀 Arquitetura e Tecnologias

- **Framework**: Vue 3 (Composition API com `<script setup>`)
- **Build Tool**: Vite (Servidor ultrarrápido rodando na porta 2020)
- **Ícones**: Lucide Icons (`lucide-vue-next`)
- **Design System**: Vanilla CSS de alta fidelidade no metálico grafite/chumbo com responsividade completa para Celular, Tablet e PC.

---

## 📁 Estrutura de Componentes

- `src/App.vue`: Gerenciador de estado reativo do `conteudo.json`.
- `src/components/Header.vue`: Cabeçalho com logo dinâmico e menu mobile.
- `src/components/Hero.vue`: Banner principal e atalhos.
- `src/components/TemaMes.vue`: Rotação automática do tema do mês.
- `src/components/Cultos.vue`: Agenda semanal com acordeões de orientações.
- `src/components/AgendaGoogle.vue`: Sincronização 24/7 com o Google Agenda.
- `src/components/Eventos.vue` & `src/components/Campanhas.vue`: Programações especiais dinâmicas.
- `src/components/Sobre.vue`: Documentação oficial (Missão, Visão, 9 Valores e Versículos Chave).
- `src/components/Lideranca.vue`: Fotos e biografias pastorais (500x500).
- `src/components/Departamentos.vue`: Os 7 ministérios da igreja com logos.
- `src/components/Localizacao.vue`: Endereço e mapa interativo.
- `src/components/Contato.vue`: E-mail oficial e redes sociais.
- `src/components/Footer.vue`: Rodapé institucional com direitos autorais atualizados.

---

## 🖼️ Como Alterar Conteúdos no `conteudo.json`

Todas as imagens, logos, horários, fotos da liderança e ministérios continuam sendo carregados diretamente do arquivo **`conteudo.json`**. Basta atualizar os textos ou links de imagem nele.

---

## 💻 Como Rodar e Testar Localmente (Porta 2020)

1. Dê um duplo clique no arquivo **[`iniciar.bat`](file:///d:/myigreja/tddsede/iniciar.bat)** (ou `start.bat`).
2. O script instalará as dependências caso necessário e iniciará o servidor na porta 2020: `http://localhost:2020`.
3. Ao alterar qualquer imagem ou texto no `conteudo.json`, o site atualizará na hora!

---

## 🌐 Como Hospedar no Netlify via GitHub

1. Envie a pasta para o seu repositório no GitHub (`git push`).
2. Conecte o repositório no [Netlify](https://www.netlify.com/).
3. Configurações de Build no Netlify:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
