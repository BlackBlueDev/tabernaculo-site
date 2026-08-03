<template>
  <header class="site-header" :class="{ 'scrolled': isScrolled }" id="topo">
    <div class="container header-inner">
      <a class="brand" href="#inicio" aria-label="Ir para o início">
        <img 
          :src="logoUrl || 'img/logo-tabernaculo.png'" 
          alt="Logo Tabernáculo de Davi" 
          class="brand-logo"
        >
        <span class="brand-copy">
          <strong>TABERNÁCULO DE DAVI</strong>
          <small>Casa de Oração e Adoração</small>
        </span>
      </a>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="menu"
        aria-label="Abrir menu de navegação"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="site-nav" :class="{ 'open': isMenuOpen }" id="menu" aria-label="Menu principal">
        <a href="#inicio" @click="closeMenu">Início</a>
        <a v-if="config.exibirTemaDoMes !== false" href="#tema-mes" @click="closeMenu">Tema do Mês</a>
        <a href="#cultos" @click="closeMenu">Cultos</a>
        <a href="#sobre" @click="closeMenu">Quem Somos</a>
        <a href="#departamentos" @click="closeMenu">Ministérios</a>
        <a href="#localizacao" @click="closeMenu">Localização</a>
      </nav>

      <a class="button button-primary header-button" href="#localizacao">Visite-nos</a>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  logoUrl: String,
  nomeIgreja: String,
  subtituloIgreja: String,
  config: {
    type: Object,
    default: () => ({
      exibirTemaDoMes: true,
      exibirAgendaSemanal: true,
      exibirLideranca: true,
      exibirDepartamentos: true
    })
  }
});

const isScrolled = ref(false);
const isMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
