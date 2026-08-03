<template>
  <div id="app-root">
    <!-- Header / Navbar -->
    <Header 
      :logo-url="conteudo.imagensGlobais?.logoCabecalho"
      :nome-igreja="conteudo.igreja?.nome"
      :subtitulo-igreja="conteudo.igreja?.subtitulo"
      :config="conteudo.configuracoes"
    />

    <main>
      <!-- Hero Section -->
      <Hero 
        :hero-bg="conteudo.imagensGlobais?.heroBackground"
        :nome-igreja="conteudo.igreja?.nome"
        :subtitulo-igreja="conteudo.igreja?.subtitulo"
        :cidade="conteudo.igreja?.cidade"
        :endereco="conteudo.igreja?.endereco"
      />

      <!-- Tema do Mês -->
      <TemaMes 
        v-if="conteudo.configuracoes?.exibirTemaDoMes"
        :tema-config="conteudo.temaDoMes"
      />

      <!-- Nossos Cultos (Fixos Permanentes e Eventos da Agenda em Sequência Cronológica) -->
      <Cultos 
        v-if="conteudo.configuracoes?.exibirAgendaSemanal !== false"
        :cultos-list="conteudo.agendaSemanal || conteudo.agendaCultos"
        :google-calendar="conteudo.googleCalendar"
      />

      <!-- Quem Somos -->
      <Sobre 
        :sobre-imagem="conteudo.imagensGlobais?.sobreImagem"
      />

      <!-- Liderança Pastoral -->
      <Lideranca 
        v-if="conteudo.configuracoes?.exibirLideranca"
        :lideranca-list="conteudo.lideranca"
      />

      <!-- Ministérios / Departamentos -->
      <Departamentos 
        v-if="conteudo.configuracoes?.exibirDepartamentos"
        :departamentos-list="conteudo.departamentos"
      />

      <!-- Localização & Mapa -->
      <Localizacao 
        :cidade="conteudo.igreja?.cidade"
        :endereco="conteudo.igreja?.endereco"
        :maps-url="conteudo.igreja?.googleMapsUrl"
      />

      <!-- Contato & Redes Sociais -->
      <Contato 
        :email="conteudo.igreja?.email"
        :social-urls="{
          instagramUrl: conteudo.igreja?.instagramUrl,
          youtubeUrl: conteudo.igreja?.youtubeUrl,
          facebookUrl: conteudo.igreja?.facebookUrl
        }"
      />
    </main>

    <!-- Rodapé -->
    <Footer 
      :logo-url="conteudo.imagensGlobais?.logoCabecalho"
      :nome-igreja="conteudo.igreja?.nome"
      :subtitulo-igreja="conteudo.igreja?.subtitulo"
      :cidade="conteudo.igreja?.cidade"
      :endereco="conteudo.igreja?.endereco"
      :instagram-url="conteudo.igreja?.instagramUrl"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import TemaMes from './components/TemaMes.vue';
import Cultos from './components/Cultos.vue';
import Sobre from './components/Sobre.vue';
import Lideranca from './components/Lideranca.vue';
import Departamentos from './components/Departamentos.vue';
import Localizacao from './components/Localizacao.vue';
import Contato from './components/Contato.vue';
import Footer from './components/Footer.vue';

const conteudo = ref({});

const carregarConteudo = async () => {
  try {
    const res = await fetch('/conteudo.json?v=' + Date.now());
    if (res.ok) {
      conteudo.value = await res.json();
    }
  } catch (err) {
    console.error('Erro ao carregar conteudo.json:', err);
  }
};

onMounted(() => {
  carregarConteudo();
});
</script>
