<template>
  <section class="section section-dark" id="sobre">
    <div class="container">
      <div class="about-grid">
        <div class="about-image reveal visible">
          <img :src="sobreImagem || 'img/sobre-acolhimento.webp'" alt="Acolhimento na igreja Tabernáculo de Davi" loading="lazy">
        </div>

        <div class="about-content reveal visible">
          <span class="section-tag">Conheça Nossos Fundamentos</span>
          <h2>Quem Somos</h2>
          <p style="font-size: 1.15rem; color: var(--accent-graphite-light); font-weight: 600; margin: 0.5rem 0 1.5rem;">
            Tabernáculo de Davi — Casa de Oração e Adoração
          </p>
          <p style="margin-bottom: 1.5rem;">
            Expandas as abas abaixo para conhecer a Visão, a Missão, os Valores e os fundamentos bíblicos da nossa casa:
          </p>

          <!-- Abas Retráteis (Accordions) -->
          
          <!-- Aba 1: VISÃO -->
          <div class="tab-accordion-card">
            <button 
              class="tab-accordion-btn" 
              type="button" 
              :aria-expanded="activeTab === 'visao'"
              @click="toggleTab('visao')"
            >
              <span>Visão</span>
              <ChevronDown 
                class="arrow" 
                :style="{ transform: activeTab === 'visao' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }"
              />
            </button>
            <div class="tab-accordion-content" :class="{ 'open': activeTab === 'visao' }">
              <p style="margin-bottom: 1rem; font-size: 1.05rem; color: #ffffff;">
                A visão do Tabernáculo de Davi – Casa de Oração é restaurar o altar da adoração e intercessão contínua, conforme o modelo bíblico do tabernáculo de Davi (Amós 9:11; Atos 15:16).
              </p>
              <p style="font-weight: 600; color: var(--accent-graphite-light); margin-bottom: 0.5rem;">Vemos uma igreja:</p>
              <ul style="list-style: none; padding: 0; margin-bottom: 1rem; color: #d1d5db; line-height: 1.8;">
                <li style="margin-bottom: 0.6rem;">• <strong>Cheia do Espírito Santo</strong>, apaixonada por Jesus e rendida à Sua presença.</li>
                <li style="margin-bottom: 0.6rem;">• <strong>Onde oração e adoração não param</strong>, como incenso constante diante do trono de Deus (Salmo 141:2).</li>
                <li style="margin-bottom: 0.6rem;">• <strong>Que evangeliza com poder e compaixão</strong>, levando o Reino de Deus às ruas, casas, cidades e nações.</li>
                <li style="margin-bottom: 0.6rem;">• <strong>Que forma discípulos maduros</strong>, curados e equipados para viver como verdadeiros adoradores e missionários do Reino.</li>
              </ul>
              <p style="font-style: italic; color: #e5e7eb; border-left: 3px solid var(--accent-graphite-light); padding-left: 0.8rem;">
                Nossa visão é preparar o caminho para a volta do Senhor Jesus, através da adoração incessante, intercessão eficaz e proclamação do evangelho com autoridade.
              </p>
            </div>
          </div>

          <!-- Aba 2: MISSÃO -->
          <div class="tab-accordion-card">
            <button 
              class="tab-accordion-btn" 
              type="button" 
              :aria-expanded="activeTab === 'missao'"
              @click="toggleTab('missao')"
            >
              <span>Missão</span>
              <ChevronDown 
                class="arrow" 
                :style="{ transform: activeTab === 'missao' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }"
              />
            </button>
            <div class="tab-accordion-content" :class="{ 'open': activeTab === 'missao' }">
              <p style="margin-bottom: 1rem; font-size: 1.05rem; color: #ffffff;">
                A nossa missão é obedecer ao IDE de Jesus Cristo, proclamando o evangelho com ousadia, paixão e amor, até os confins da Terra (Mateus 28:19-20).
              </p>
              <p style="font-weight: 600; color: var(--accent-graphite-light); margin-bottom: 0.5rem;">Somos chamados para:</p>
              <ul style="list-style: none; padding: 0; margin-bottom: 1rem; color: #d1d5db; line-height: 1.8;">
                <li style="margin-bottom: 0.6rem;">• <strong>Evangelizar os perdidos</strong>, levando salvação e libertação através da Palavra e do poder do Espírito Santo.</li>
                <li style="margin-bottom: 0.6rem;">• <strong>Estabelecer um altar de oração e adoração contínua</strong>, onde a presença de Deus habita dia e noite.</li>
                <li style="margin-bottom: 0.6rem;">• <strong>Formar e enviar discípulos</strong> comprometidos com a vontade de Deus, preparados para influenciar esta geração com santidade, amor e verdade.</li>
              </ul>
              <p style="font-style: italic; color: #e5e7eb; border-left: 3px solid var(--accent-graphite-light); padding-left: 0.8rem;">
                Como Casa de Oração, nos consagramos a ser um povo sacerdotal, totalmente dedicado a ministrar ao Senhor, interceder pelas nações e viver uma vida de profunda intimidade com Deus.
              </p>
            </div>
          </div>

          <!-- Aba 3: VALORES FUNDAMENTAIS -->
          <div class="tab-accordion-card">
            <button 
              class="tab-accordion-btn" 
              type="button" 
              :aria-expanded="activeTab === 'valores'"
              @click="toggleTab('valores')"
            >
              <span>Nossos Nove Valores Fundamentais</span>
              <ChevronDown 
                class="arrow" 
                :style="{ transform: activeTab === 'valores' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }"
              />
            </button>
            <div class="tab-accordion-content" :class="{ 'open': activeTab === 'valores' }">
              <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
                <div>
                  <h4 style="color: var(--accent-graphite-light); font-size: 1rem; margin-bottom: 0.3rem;">1. Adoração extravagante e contínua</h4>
                  <p style="font-size: 0.95rem; color: #d1d5db;">Cremos na adoração como o centro de todas as coisas. Buscamos honrar a Deus com tudo o que somos, oferecendo louvor constante, íntimo e sincero, como nos dias do rei Davi (1 Crônicas 16:4; Salmo 132:4-5).</p>
                </div>

                <div>
                  <h4 style="color: var(--accent-graphite-light); font-size: 1rem; margin-bottom: 0.3rem;">2. Oração ininterrupta — Incenso contínuo</h4>
                  <p style="font-size: 0.95rem; color: #d1d5db;">Nos comprometemos com a oração constante. Somos uma casa de intercessão que se posiciona na brecha pelas famílias, igrejas, cidades e nações (Isaías 62:6-7; Apocalipse 5:8).</p>
                </div>

                <div>
                  <h4 style="color: var(--accent-graphite-light); font-size: 1rem; margin-bottom: 0.3rem;">3. Evangelismo intencional e corajoso</h4>
                  <p style="font-size: 0.95rem; color: #d1d5db;">Vivemos o IDE de Jesus. Levamos o evangelho a todos os lugares com ousadia, compaixão e demonstração do poder de Deus, buscando alcançar os perdidos com a mensagem da cruz (Marcos 16:15; Romanos 1:16).</p>
                </div>

                <div>
                  <h4 style="color: var(--accent-graphite-light); font-size: 1rem; margin-bottom: 0.3rem;">4. Presença de Deus acima de tudo</h4>
                  <p style="font-size: 0.95rem; color: #d1d5db;">A presença do Senhor é a nossa prioridade máxima. Tudo o que fazemos nasce da intimidade com Deus e do desejo de agradar Seu coração (Êxodo 33:15).</p>
                </div>

                <div>
                  <h4 style="color: var(--accent-graphite-light); font-size: 1rem; margin-bottom: 0.3rem;">5. Santidade e integridade</h4>
                  <p style="font-size: 0.95rem; color: #d1d5db;">Somos chamados à pureza de coração e à obediência total. Vivemos de forma consagrada, refletindo o caráter de Cristo em todas as áreas da vida (1 Pedro 1:15-16).</p>
                </div>

                <div>
                  <h4 style="color: var(--accent-graphite-light); font-size: 1rem; margin-bottom: 0.3rem;">6. Amor por Deus e pelas pessoas</h4>
                  <p style="font-size: 0.95rem; color: #d1d5db;">Amamos a Deus de todo o coração e servimos ao próximo com compaixão e humildade. O amor é a base de todas as nossas ações (Mateus 22:37-39; João 13:35).</p>
                </div>

                <div>
                  <h4 style="color: var(--accent-graphite-light); font-size: 1rem; margin-bottom: 0.3rem;">7. Unidade e honra no corpo de Cristo</h4>
                  <p style="font-size: 0.95rem; color: #d1d5db;">Valorizamos a comunhão, a honra mútua e o trabalho em unidade. Reconhecemos os dons uns dos outros e caminhamos juntos como família (Efésios 4:3-4).</p>
                </div>

                <div>
                  <h4 style="color: var(--accent-graphite-light); font-size: 1rem; margin-bottom: 0.3rem;">8. Discipulado e formação de servos</h4>
                  <p style="font-size: 0.95rem; color: #d1d5db;">Treinamos filhos e filhas para viverem como discípulos radicais, fundamentados na Palavra, guiados pelo Espírito e prontos para servir e liderar (Mateus 28:20; 2 Timóteo 2:2).</p>
                </div>

                <div>
                  <h4 style="color: var(--accent-graphite-light); font-size: 1rem; margin-bottom: 0.3rem;">9. Serviço com compaixão e justiça</h4>
                  <p style="font-size: 0.95rem; color: #d1d5db;">Agimos com misericórdia, ajudando os necessitados, sendo resposta às dores da sociedade e levando o Reino de Deus em obras e palavras (Tiago 1:27; Miquéias 6:8).</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Aba 4: VERSÍCULOS CHAVE -->
          <div class="tab-accordion-card">
            <button 
              class="tab-accordion-btn" 
              type="button" 
              :aria-expanded="activeTab === 'versiculos'"
              @click="toggleTab('versiculos')"
            >
              <span>Versículos Chave</span>
              <ChevronDown 
                class="arrow" 
                :style="{ transform: activeTab === 'versiculos' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }"
              />
            </button>
            <div class="tab-accordion-content" :class="{ 'open': activeTab === 'versiculos' }">
              <ul style="list-style: none; padding: 0; color: #d1d5db; line-height: 1.8;">
                <li style="margin-bottom: 0.8rem;">• <strong>Isaías 56:7</strong> — "Porque a minha casa será chamada casa de oração para todos os povos."</li>
                <li style="margin-bottom: 0.8rem;">• <strong>Amós 9:11</strong> — "Naquele dia levantarei o tabernáculo caído de Davi..."</li>
                <li style="margin-bottom: 0.8rem;">• <strong>Mateus 28:19-20</strong> — "Ide, portanto, e fazei discípulos de todas as nações..."</li>
                <li style="margin-bottom: 0.8rem;">• <strong>Atos 15:16</strong> — "...reedificarei o tabernáculo de Davi, que está caído."</li>
                <li style="margin-bottom: 0.4rem;">• <strong>Salmo 27:4</strong> — "...que eu possa morar na casa do Senhor todos os dias da minha vida..."</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

defineProps({
  sobreImagem: String
});

const activeTab = ref(null);

const toggleTab = (tabName) => {
  if (activeTab.value === tabName) {
    activeTab.value = null;
  } else {
    activeTab.value = tabName;
  }
};
</script>
