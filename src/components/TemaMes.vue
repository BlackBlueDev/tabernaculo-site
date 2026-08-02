<template>
  <section v-if="temaConfig && temaConfig.ativo" class="section section-dark" id="tema-mes">
    <div class="container">
      <div class="theme-card reveal visible">
        <span class="section-tag" :style="{ color: currentTheme.corDestaque || '#cbd5e1', borderColor: currentTheme.corDestaque || 'rgba(148, 163, 184, 0.35)' }">
          {{ temaConfig.badge || 'Tema do Mês' }}
        </span>
        
        <h2 style="font-size: clamp(1.8rem, 3.5vw, 2.8rem); margin-top: 0.5rem;">
          {{ currentTheme.titulo }}
        </h2>

        <div class="theme-verse" :style="{ borderLeftColor: currentTheme.corDestaque || '#94a3b8' }">
          "{{ currentTheme.versiculo }}"
          <cite>— {{ currentTheme.referencia }}</cite>
        </div>

        <p v-if="currentTheme.descricao" style="font-size: 1.1rem; color: #d1d5db; max-width: 800px; line-height: 1.7;">
          {{ currentTheme.descricao }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  temaConfig: {
    type: Object,
    default: () => ({})
  }
});

const currentTheme = computed(() => {
  if (!props.temaConfig) return {};

  if (props.temaConfig.modoAutomatico && props.temaConfig.temasPorMes) {
    const month = new Date().getMonth() + 1; // 1-12
    const themeForMonth = props.temaConfig.temasPorMes[month.toString()];
    if (themeForMonth) return themeForMonth;
  }

  return props.temaConfig.custom || props.temaConfig.temasPorMes?.['8'] || {};
});
</script>
