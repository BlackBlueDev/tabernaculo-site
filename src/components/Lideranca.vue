<template>
  <section class="section section-surface" id="lideranca">
    <div class="container">
      <div class="section-heading text-center reveal visible">
        <span class="section-tag">Liderança Pastoral</span>
        <h2>Cuidando da Casa e das Famílias</h2>
        <p>Nossa liderança caminha junto da igreja com amor, direção espiritual e compromisso pastoral.</p>
      </div>

      <div class="leadership-grid">
        <div 
          v-for="pastor in liderancaList" 
          :key="pastor.id"
          class="pastor-card reveal visible"
        >
          <div 
            class="pastor-img-wrapper"
            :class="{ 'pastor-img-white-bg': pastor.fundoBranco }"
          >
            <img :src="pastor.imagem" :alt="pastor.nome" loading="lazy">
          </div>

          <div class="pastor-info">
            <span class="pastor-role">{{ pastor.cargo }}</span>
            <h3 style="margin: 0.3rem 0 0.6rem; font-size: 1.3rem;">{{ pastor.nome }}</h3>
            <p v-if="pastor.descricao || pastor.bio" style="font-size: 0.95rem;">{{ pastor.descricao || pastor.bio }}</p>
          </div>
        </div>
      </div>

      <div class="carousel-hint">
        <ArrowRight class="icon" style="width: 1.1rem; height: 1.1rem;" />
        <span>Deslize para o lado para ver a liderança</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next';
defineProps({
  liderancaList: {
    type: Array,
    default: () => []
  }
});
</script>
