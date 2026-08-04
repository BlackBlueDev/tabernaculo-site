<template>
  <section v-if="temaConfig && temaConfig.ativo" class="section section-dark" id="tema-mes">
    <div class="container">
      <div class="theme-card reveal visible" :style="themeCardStyle">
        <span class="section-tag" :style="{ color: currentTheme.corDestaque || '#cbd5e1', borderColor: currentTheme.corDestaque || 'rgba(148, 163, 184, 0.35)', boxShadow: '0 0 12px ' + (currentTheme.corDestaque || '#ef4444') + '55' }">
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

const hexToRgba = (hex, alpha = 0.4) => {
  if (!hex) return `rgba(239, 68, 68, ${alpha})`;
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(239, 68, 68, ${alpha})`;
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
};

const themeCardStyle = computed(() => {
  const color = currentTheme.value.corDestaque || '#ef4444';
  const glow1 = hexToRgba(color, 0.45);
  const glow2 = hexToRgba(color, 0.22);
  const glowInset = hexToRgba(color, 0.15);

  return {
    borderColor: color,
    boxShadow: `0 0 25px -2px ${glow1}, 0 0 55px -6px ${glow2}, inset 0 0 25px -5px ${glowInset}`
  };
});
</script>
