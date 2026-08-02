<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3 style="color: #ffffff;">{{ nomeIgreja || 'TABERNÁCULO DE DAVI' }}</h3>
          <p>{{ subtituloIgreja || 'Casa de Oração e Adoração' }} em {{ cidade || 'Caruaru - PE' }}. Uma comunidade dedicada a glorificar a Deus e edificar vidas.</p>
        </div>

        <div class="footer-nav">
          <h4>Navegação</h4>
          <ul class="footer-links">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#tema-mes">Tema do Mês</a></li>
            <li><a href="#cultos">Cultos</a></li>
            <li><a href="#sobre">Quem Somos</a></li>
            <li><a href="#departamentos">Ministérios</a></li>
            <li><a href="#localizacao">Localização</a></li>
          </ul>
        </div>

        <div class="footer-nav">
          <h4>Informações</h4>
          <ul class="footer-links">
            <li>{{ endereco || 'R. Herculano Cordeiro, 294' }}</li>
            <li>{{ cidade || 'Salgado, Caruaru - PE' }}</li>
            <li v-if="instagramUrl"><a :href="instagramUrl" target="_blank" rel="noopener noreferrer">@tddsede</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} {{ nomeIgreja || 'TABERNÁCULO DE DAVI (TDD SEDE)' }}. Todos os direitos reservados.</p>
        <p style="font-weight: 500; color: var(--accent-graphite-light);">Estamos há dois anos resgatando vidas.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  nomeIgreja: String,
  subtituloIgreja: String,
  cidade: String,
  endereco: String,
  instagramUrl: String
});

const currentYear = ref(new Date().getFullYear());
</script>
