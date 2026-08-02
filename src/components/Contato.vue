<template>
  <section class="section section-dark" id="contato">
    <div class="container">
      <div class="section-heading text-center reveal visible">
        <span class="section-tag">Fale Conosco</span>
        <h2>Canais de Contato e Redes Sociais</h2>
        <p>Acompanhe novidades, envie pedidos de oração e tire suas dúvidas.</p>
      </div>

      <div class="contact-grid">
        <div class="contact-card reveal visible">
          <h3 style="margin-bottom: 0.8rem;">E-mail Oficial</h3>
          <p style="margin-bottom: 1.2rem;">Canal para dúvidas, informações e agendamentos.</p>
          <a
            class="button button-secondary button-small"
            :href="'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(email || 'tabernaculodedavicaruaru@gmail.com') + '&su=Contato%20pelo%20site%20-%20Tabernaculo%20de%20Davi'"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail class="icon" />
            Enviar E-mail
          </a>
        </div>

        <div class="contact-card reveal visible">
          <h3 style="margin-bottom: 0.8rem;">Redes Sociais</h3>
          <p style="margin-bottom: 1rem;">Siga a igreja no Instagram, YouTube e Facebook.</p>
          <div class="social-links-row">
            <a 
              v-if="socialUrls.instagramUrl" 
              :href="socialUrls.instagramUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="social-icon-btn" 
              aria-label="Instagram"
            >
              <Instagram class="icon" />
            </a>
            <a 
              v-if="socialUrls.youtubeUrl" 
              :href="socialUrls.youtubeUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="social-icon-btn" 
              aria-label="YouTube"
            >
              <Youtube class="icon" />
            </a>
            <a 
              v-if="socialUrls.facebookUrl" 
              :href="socialUrls.facebookUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="social-icon-btn" 
              aria-label="Facebook"
            >
              <Facebook class="icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Mail, Instagram, Youtube, Facebook } from 'lucide-vue-next';

defineProps({
  email: String,
  socialUrls: {
    type: Object,
    default: () => ({})
  }
});
</script>
