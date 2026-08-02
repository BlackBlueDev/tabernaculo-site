<template>
  <section class="hero" id="inicio">
    <div class="hero-background" aria-hidden="true">
      <img 
        :src="heroBg || 'img/hero-fachada-exterior.webp'" 
        alt="Fachada da igreja Tabernáculo de Davi Sede" 
        fetchpriority="high"
      >
    </div>
    <div class="hero-overlay"></div>

    <div class="container hero-layout">
      <div class="hero-copy reveal visible">
        <span class="section-tag">Bem-vindo à nossa casa</span>
        <h1>{{ nomeIgreja || 'TABERNÁCULO DE DAVI' }}</h1>
        <p class="hero-subtitle">{{ subtituloIgreja || 'Casa de Oração e Adoração' }} em {{ cidade || 'Caruaru - PE' }}</p>
        <p class="hero-text">
          Um ambiente acolhedor preparado para receber você e sua família no amor de Cristo. Venha adorar, interceder e viver a Palavra de Deus conosco.
        </p>

        <div class="hero-actions">
          <a class="button button-primary" href="#localizacao">
            <MapPin class="icon" />
            Como Chegar
          </a>
          <a class="button button-secondary" href="#cultos">
            <Calendar class="icon" />
            Agenda de Cultos
          </a>
        </div>

        <div class="hero-meta-badge">
          <strong>Domingo às 18h00</strong>
          <span aria-hidden="true">•</span>
          <span>{{ endereco || 'R. Herculano Cordeiro, 294 - Salgado' }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MapPin, Calendar } from 'lucide-vue-next';

defineProps({
  heroBg: String,
  nomeIgreja: String,
  subtituloIgreja: String,
  cidade: String,
  endereco: String
});
</script>
