<template>
  <section v-if="campanhasList && campanhasList.length > 0" class="section section-surface" id="campanhas">
    <div class="container">
      <div class="section-heading text-center reveal visible">
        <span class="section-tag">Propósito & Oração</span>
        <h2>Campanhas de Fé e Jejum</h2>
        <p>Junte-se a nós em propósitos contínuos de intercessão e busca espiritual.</p>
      </div>

      <div class="card-grid">
        <div 
          v-for="campanha in campanhasList" 
          :key="campanha.id" 
          class="event-card reveal visible"
        >
          <div class="event-media">
            <img :src="campanha.imagem" :alt="campanha.titulo" loading="lazy">
            <span class="event-tag-pill">{{ campanha.badge || 'Campanha de Fé' }}</span>
          </div>

          <div class="event-body">
            <div class="event-date">
              <Calendar class="icon" style="display: inline-block; vertical-align: middle; margin-right: 0.3rem;" />
              {{ campanha.periodo }}
            </div>
            <h3>{{ campanha.titulo }}</h3>
            <p>{{ campanha.descricao }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Calendar } from 'lucide-vue-next';

defineProps({
  campanhasList: {
    type: Array,
    default: () => []
  }
});
</script>
