<template>
  <section class="section section-dark" id="departamentos">
    <div class="container">
      <div class="section-heading text-center reveal visible">
        <span class="section-tag">Ministérios</span>
        <h2>Departamentos</h2>
        <p>Espaços de comunhão e crescimento espiritual para todas as idades.</p>
      </div>

      <div class="dept-grid">
        <div 
          v-for="dept in departamentosList" 
          :key="dept.id" 
          class="dept-card reveal visible"
        >
          <div class="dept-thumb">
            <img :src="dept.imagem" :alt="dept.titulo" loading="lazy">
          </div>

          <div class="dept-content">
            <h3>{{ dept.titulo }}</h3>
            <p>{{ dept.descricao }}</p>
            <a 
              v-if="dept.link" 
              :href="dept.link" 
              target="_blank" 
              class="dept-link"
            >
              Saiba Mais <ArrowRight class="icon" style="width: 1rem; height: 1rem;" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next';

defineProps({
  departamentosList: {
    type: Array,
    default: () => []
  }
});
</script>
