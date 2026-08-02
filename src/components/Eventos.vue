<template>
  <section v-if="eventosList && eventosList.length > 0" class="section section-dark" id="eventos">
    <div class="container">
      <div class="section-heading text-center reveal visible">
        <span class="section-tag">Programação Especial</span>
        <h2>Próximos Eventos</h2>
        <p>Fique por dentro das conferências, vigílias e encontros especiais da nossa igreja.</p>
      </div>

      <div class="card-grid">
        <div 
          v-for="evento in eventosList" 
          :key="evento.id" 
          class="event-card reveal visible"
        >
          <div class="event-media">
            <img :src="evento.imagem" :alt="evento.titulo" loading="lazy">
            <span class="event-tag-pill">{{ evento.categoria || 'Evento Especial' }}</span>
          </div>

          <div class="event-body">
            <div class="event-date">
              <Calendar class="icon" style="display: inline-block; vertical-align: middle; margin-right: 0.3rem;" />
              {{ evento.data }} às {{ evento.horario }}
            </div>
            <h3>{{ evento.titulo }}</h3>
            <p>{{ evento.descricao }}</p>
            
            <a 
              v-if="evento.link" 
              :href="evento.link" 
              target="_blank" 
              class="button button-secondary button-small"
              style="margin-top: auto;"
            >
              Mais Informações
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Calendar } from 'lucide-vue-next';

defineProps({
  eventosList: {
    type: Array,
    default: () => []
  }
});
</script>
