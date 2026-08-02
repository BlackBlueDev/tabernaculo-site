<template>
  <section class="section section-surface" id="localizacao">
    <div class="container">
      <div class="section-heading text-center reveal visible">
        <span class="section-tag">Localização</span>
        <h2>Venha Nos Visitar</h2>
        <p>Estamos localizados no bairro Salgado em {{ cidade || 'Caruaru - PE' }}. Portas abertas para receber você.</p>
      </div>

      <div class="location-grid">
        <div class="panel reveal visible">
          <span class="service-day">Endereço Principal</span>
          <h3 style="margin: 0.5rem 0 1rem;">{{ endereco || 'R. Herculano Cordeiro, 294 - Salgado, Caruaru - PE' }}</h3>
          <p style="margin-bottom: 1.5rem;">
            Facilidade de acesso com recepção preparada para acolher sua família com carinho.
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.8rem;">
            <a
              class="button button-primary"
              :href="mapsUrl || 'https://maps.app.goo.gl/4Gu1yXdouCcGHBmw6'"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin class="icon" />
              Abrir Rota no Google Maps
            </a>
          </div>
        </div>

        <div class="map-wrapper reveal visible">
          <iframe
            title="Mapa de localização da igreja Tabernáculo de Davi Sede"
            src="https://www.google.com/maps?q=R.%20Herculano%20Cordeiro%2C%20294%20-%20Salgado%2C%20Caruaru&amp;output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MapPin } from 'lucide-vue-next';

defineProps({
  cidade: String,
  endereco: String,
  mapsUrl: String
});
</script>
