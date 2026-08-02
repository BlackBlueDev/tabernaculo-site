# Tabernáculo de Davi (TDD Sede) - Site Institucional Estático 100% Autônomo

Este repositório contém o site oficial da igreja **Tabernáculo de Davi (TDD Sede)** em Caruaru-PE, construído com **Vue 3 estático via CDN**, **estilização metálica grafite**, **sincronização automática com Google Agenda a cada 1 minuto** e **gestão dinâmica total via JSON** (`conteudo.json`).

---

## ⚡ Arquitetura 100% Estática (Sem Necessidade do Node.js ou node_modules)

- **Zero Node / Zero `node_modules`**: O site roda de forma **100% estática e autônoma** diretamente no navegador.
- **Pronto para Netlify / GitHub Pages / Hostinger**: Basta fazer upload da pasta ou `git push` para o GitHub e conectar ao Netlify. Não requer comandos de build no servidor!
- **Hospedagem 24/7 Grátis**: Funciona em qualquer servidor estático ou plataforma de hospedagem gratuita.

---

## 🚀 Funcionalidades Integradas

- **Gestão Dinâmica via JSON**: Todas as informações, logos, horários, liderança e ministérios são editados diretamente no arquivo [`conteudo.json`](file:///d:/myigreja/tddsede/conteudo.json).
- **Cultos Fixos Permanentes**: Domingo (18h00), Segunda-feira (19h30) e Quarta-feira (19h30) permanecem visíveis de forma garantida.
- **Sincronização com Google Agenda a cada 1 minuto**: Eventos criados na agenda do Google aparecem como cards novos na sequência cronológica da semana e desaparecem automaticamente quando o evento passa.
- **Accordion de Orientações Unificado**: Todos os cards possuem o botão "Ver orientações do culto" que expande detalhes e o botão "Adicionar no meu Google Agenda".
- **Design Retrato Compacto dos Pastores**: Proporção `3:4` com altura máxima reduzida para preservar espaço.
- **Slider por Toque no Celular**: Carrossel horizontal para arrastar com o dedo em Liderança e Ministérios no smartphone.
- **Frase Institucional no Rodapé**: *"Estamos há dois anos resgatando vidas"*.

---

## 💻 Como Rodar Localmente (Porta 2020)

1. Dê um duplo clique no arquivo **[`iniciar.bat`](file:///d:/myigreja/tddsede/iniciar.bat)** (ou `start.bat`).
2. O servidor local abrirá automaticamente na porta **`http://localhost:2020`**.
3. Não precisa instalar nada nem rodar comandos do Node!

---

## 🌐 Como Hospedar no Netlify via GitHub (24/7 Online)

1. Envie esta pasta para o seu repositório no GitHub (`git push`).
2. Conecte o repositório no [Netlify](https://www.netlify.com/).
3. Não precisa preencher nada em "Build Command"! O diretório public é a própria raiz `.`.
4. O site estará online 24/7 gratuitamente em segundos!
