/* ==========================================================================
   TABERNÁCULO DE DAVI (TDD SEDE) - GRAPHITE ENGINE & AUTOMATIC MONTHLY ROTATOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Automatic Device Detection Engine (Mobile, Tablet, Desktop)
  initDeviceDetection();
  window.addEventListener('resize', debounce(initDeviceDetection, 150));

  // 2. Core Navigation & Header Setup
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const currentYearSpan = document.getElementById('current-year');

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 3. Header Scroll Glass Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 4. Mobile Navigation Menu Toggle
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!siteNav.contains(e.target) && !menuToggle.contains(e.target) && siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 5. Init Scroll Animations
  initScrollAnimations();

  // 6. Load Site Content from conteudo.json
  loadSiteContent();
});

/**
 * Identifies the current device platform (Celular, Tablet, Desktop)
 * and attaches helper classes to document.body for tailored styling.
 */
function initDeviceDetection() {
  const width = window.innerWidth;
  const body = document.body;
  const userAgent = navigator.userAgent.toLowerCase();

  body.classList.remove('device-mobile', 'device-tablet', 'device-desktop');

  if (width <= 640 || /iphone|ipod|android.*mobile|windows phone/i.test(userAgent)) {
    body.classList.add('device-mobile');
  } else if ((width > 640 && width <= 1024) || /ipad|android(?!.*mobile)/i.test(userAgent)) {
    body.classList.add('device-tablet');
  } else {
    body.classList.add('device-desktop');
  }
}

/**
 * Utility debounce function for smooth resize events
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Scroll Observer Setup
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

/**
 * Fallback Content Object
 */
const DEFAULT_FALLBACK_CONTENT = {
  configuracoes: {
    exibirTemaDoMes: true,
    exibirAgendaSemanal: true,
    exibirGoogleAgenda: true,
    exibirEventos: false,
    exibirCampanhas: false,
    exibirLideranca: true,
    exibirDepartamentos: true
  },
  imagensGlobais: {
    logoCabecalho: "img/logo-tabernaculo.jpg",
    heroBackground: "img/hero-fachada-exterior.webp",
    sobreImagem: "img/sobre-acolhimento.webp"
  },
  googleCalendar: {
    ativo: true,
    calendarId: "tabernaculodedavicaruaru@gmail.com",
    embedUrl: "https://calendar.google.com/calendar/embed?src=tabernaculodedavicaruaru%40gmail.com&ctz=America%2FRecife"
  },
  temaDoMes: {
    ativo: true,
    badge: "Tema do Mês",
    modoAutomatico: true,
    titulo: "Batismo com o Espírito Santo",
    versiculo: "Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas.",
    referencia: "Atos 1:8",
    descricao: "Neste mês, buscamos o revestimento de poder, as chamas do avivamento e a unção do Espírito Santo sobre toda a igreja.",
    corDestaque: "#ef4444"
  },
  agendaSemanal: [
    { id: "culto-segunda", ativo: true, dia: "Segunda-feira", titulo: "Culto de Oração", horario: "19h30", descricao: "Intercessão e clamor pelas famílias.", destaque: false, detalhes: "Iniciamos com oração comunitária e clamor pelas necessidades apresentadas." },
    { id: "culto-quarta", ativo: true, dia: "Quarta-feira", titulo: "Culto de Cura e Libertação", horario: "19h30", descricao: "Palavra de fé e restauração de vidas.", destaque: false, detalhes: "Estudo bíblico profundo e momento de oração com imposição de mãos." },
    { id: "culto-domingo", ativo: true, dia: "Domingo", titulo: "Culto Principal da Família", horario: "18h00", descricao: "Grande celebração e adoração.", destaque: true, detalhes: "Culto festivo para toda a família com recepção e Departamento Infantil ativo." }
  ],
  lideranca: [
    { id: "pastor-erivonaldo", ativo: true, nome: "Erivonaldo Teixeira", cargo: "Pastor Presidente", descricao: "Liderança pastoral focada na pregação da Palavra, direção espiritual e cuidado com o rebanho.", imagem: "img/pastor-erivonaldo-2026.jpg", fundoBranco: false },
    { id: "pastora-marta", ativo: true, nome: "Marta Teixeira", cargo: "Pastora", descricao: "Referência de apoio ministerial, ensino, intercessão e fortalecimento das famílias.", imagem: "img/pastora-marta-2026.jpg", fundoBranco: true }
  ],
  departamentos: [
    { id: "renovajovem", ativo: true, categoria: "Jovens", titulo: "Renovajovem", descricao: "Comunhão, discipulado e fortalecimento espiritual para a juventude.", imagem: "img/renova-jovem.svg", link: "#contato" },
    { id: "casais", ativo: true, categoria: "Família", titulo: "Rede de Casais", descricao: "Encontros e sermões dedicados à edificação de lares sólidos no Senhor.", imagem: "img/casais.jpg", link: "#contato" },
    { id: "midia", ativo: true, categoria: "Comunicação", titulo: "Mídia", descricao: "Comunicação visual, transmissões ao vivo e registros dos cultos.", imagem: "img/midia.webp", link: "#contato" },
    { id: "teatro", ativo: true, categoria: "Artes", titulo: "Teatro", descricao: "Evangelismo criativo e artes para ministrar a mensagem do Evangelho.", imagem: "img/teatro.webp", link: "#contato" },
    { id: "guardias", ativo: true, categoria: "Mulheres", titulo: "Guardiãs da Fé", descricao: "Ministério de mulheres focado em oração, comunhão, ensino e fortalecimento da fé.", imagem: "img/guardias-da-fe.jpg", link: "#contato" },
    { id: "kids", ativo: true, categoria: "Crianças", titulo: "Kids", descricao: "Ministério infantil dedicado ao ensino bíblico, cuidado e atenção às crianças.", imagem: "img/kids.svg", link: "#contato" },
    { id: "louvor", ativo: true, categoria: "Adoração", titulo: "Grupo de Louvor", descricao: "Ministério dedicado a conduzir a igreja em adoração com excelência, unidade e sensibilidade.", imagem: "img/louvor.svg", link: "#contato" }
  ]
};

/**
 * Main Fetch & Render Engine
 */
async function loadSiteContent() {
  let content = null;

  try {
    const res = await fetch('conteudo.json');
    if (res.ok) {
      content = await res.json();
    } else {
      content = DEFAULT_FALLBACK_CONTENT;
    }
  } catch (err) {
    content = DEFAULT_FALLBACK_CONTENT;
  }

  if (!content) return;

  const config = content.configuracoes || {};

  // Render Global Images
  if (content.imagensGlobais) {
    renderImagensGlobais(content.imagensGlobais);
  }

  // Render Tema do Mês Automático (Identificação por Mês Atual)
  const temaAtual = resolveTemaDoMesAtual(content.temaDoMes);
  toggleSectionVisibility('tema-mes', config.exibirTemaDoMes && temaAtual !== null);
  if (config.exibirTemaDoMes && temaAtual) {
    renderTemaDoMes(temaAtual);
  }

  // Render Agenda Semanal
  const activeCultos = (content.agendaSemanal || []).filter(c => c.ativo !== false);
  toggleSectionVisibility('cultos', config.exibirAgendaSemanal && activeCultos.length > 0);
  if (config.exibirAgendaSemanal) renderAgendaSemanal(activeCultos);

  // Render Google Agenda 24/7 Integration
  const showGCalendar = config.exibirGoogleAgenda !== false && content.googleCalendar?.ativo !== false;
  toggleSectionVisibility('agenda-google', showGCalendar);
  if (showGCalendar && content.googleCalendar) {
    renderGoogleCalendar(content.googleCalendar);
  }

  // Render Eventos
  const activeEventos = (content.eventos || []).filter(e => e.ativo !== false);
  toggleSectionVisibility('eventos', config.exibirEventos && activeEventos.length > 0);
  if (config.exibirEventos) renderEventos(activeEventos);

  // Render Campanhas
  const activeCampanhas = (content.campanhas || []).filter(c => c.ativo !== false);
  toggleSectionVisibility('campanhas', config.exibirCampanhas && activeCampanhas.length > 0);
  if (config.exibirCampanhas) renderCampanhas(activeCampanhas);

  // Render Liderança (Pastores)
  const activeLideranca = (content.lideranca || []).filter(l => l.ativo !== false);
  toggleSectionVisibility('lideranca', config.exibirLideranca !== false && activeLideranca.length > 0);
  if (config.exibirLideranca !== false) renderLideranca(activeLideranca);

  // Render Departamentos (7 Departamentos)
  const activeDeptos = (content.departamentos || []).filter(d => d.ativo !== false);
  toggleSectionVisibility('departamentos', config.exibirDepartamentos !== false && activeDeptos.length > 0);
  if (config.exibirDepartamentos !== false) renderDepartamentos(activeDeptos);

  // Initialize interactive accordion tabs
  initAccordionTabs();
}

/**
 * Dynamic Monthly Theme Resolver
 * Automatically detects current month (1..12) and matches against `temasPorMes`
 */
function resolveTemaDoMesAtual(temaConfig) {
  if (!temaConfig || temaConfig.ativo === false) return null;

  if (temaConfig.modoAutomatico !== false && temaConfig.temasPorMes) {
    const currentMonthNum = new Date().getMonth() + 1; // 1 = Janeiro ... 12 = Dezembro
    const temaAgendado = temaConfig.temasPorMes[String(currentMonthNum)];
    if (temaAgendado) {
      const nomeMes = getNomeDoMes(currentMonthNum);
      return {
        badge: `Tema do Mês • ${nomeMes}`,
        titulo: temaAgendado.titulo,
        versiculo: temaAgendado.versiculo,
        referencia: temaAgendado.referencia,
        descricao: temaAgendado.descricao,
        corDestaque: temaAgendado.corDestaque || '#64748b'
      };
    }
  }

  // Fallback to static theme config
  return temaConfig;
}

/**
 * Portuguese Month Name Helper
 */
function getNomeDoMes(mesNum) {
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return meses[mesNum - 1] || 'Atual';
}

/**
 * Render Google Calendar Integration Settings
 */
function renderGoogleCalendar(gcal) {
  const iframe = document.getElementById('google-calendar-iframe');
  const btn = document.getElementById('btn-add-google-calendar');

  if (gcal.embedUrl && iframe) {
    iframe.src = gcal.embedUrl;
  }
  if (gcal.calendarId && btn) {
    btn.href = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(gcal.calendarId)}`;
  }
}

/**
 * Render Global Images dynamically
 */
function renderImagensGlobais(imgs) {
  if (imgs.logoCabecalho) {
    const brandLogo = document.querySelector('.brand-logo');
    if (brandLogo) brandLogo.src = imgs.logoCabecalho;
  }
  if (imgs.heroBackground) {
    const heroBgImg = document.querySelector('.hero-background img');
    if (heroBgImg) heroBgImg.src = imgs.heroBackground;
  }
  if (imgs.sobreImagem) {
    const sobreImg = document.querySelector('.about-image img');
    if (sobreImg) sobreImg.src = imgs.sobreImagem;
  }
}

/**
 * Shows/Hides a section and its navbar link dynamically
 */
function toggleSectionVisibility(sectionId, shouldShow) {
  const section = document.getElementById(sectionId);
  const navLink = document.querySelector(`.site-nav a[href="#${sectionId}"]`);
  const footerLink = document.querySelector(`.footer-links a[href="#${sectionId}"]`);

  if (section) {
    section.style.display = shouldShow ? 'block' : 'none';
  }
  if (navLink) {
    navLink.style.display = shouldShow ? 'inline-block' : 'none';
  }
  if (footerLink) {
    footerLink.parentElement.style.display = shouldShow ? 'list-item' : 'none';
  }
}

/**
 * Render Tema do Mês (with dynamic month accent color styling)
 */
function renderTemaDoMes(data) {
  if (!data) return;
  const container = document.getElementById('container-tema-mes');
  if (!container) return;

  const accentColor = data.corDestaque || '#94a3b8';

  container.innerHTML = `
    <article class="theme-card reveal visible" style="border-color: ${escapeHtml(accentColor)}66; box-shadow: 0 10px 30px -5px ${escapeHtml(accentColor)}33;">
      <span class="section-tag" style="border-color: ${escapeHtml(accentColor)}; color: ${escapeHtml(accentColor)}; background: ${escapeHtml(accentColor)}18;">${escapeHtml(data.badge || 'Tema do Mês')}</span>
      <h2>${escapeHtml(data.titulo)}</h2>
      <blockquote class="theme-verse" style="border-left-color: ${escapeHtml(accentColor)};">
        <p>"${escapeHtml(data.versiculo)}"</p>
        <cite style="color: ${escapeHtml(accentColor)};">${escapeHtml(data.referencia)}</cite>
      </blockquote>
      <p style="margin-top: 1rem; color: #d1d5db;">${escapeHtml(data.descricao)}</p>
    </article>
  `;
}

/**
 * Render Agenda Semanal
 */
function renderAgendaSemanal(agenda) {
  const container = document.getElementById('container-agenda-cultos');
  if (!container) return;

  container.innerHTML = agenda.map(item => `
    <article class="service-card ${item.destaque ? 'highlight' : ''} reveal visible">
      ${item.destaque ? '<span class="service-badge">Destaque</span>' : ''}
      <div>
        <span class="service-day">${escapeHtml(item.dia)}</span>
        <h3>${escapeHtml(item.titulo)}</h3>
        <div class="service-time">${escapeHtml(item.horario)}</div>
        <p>${escapeHtml(item.descricao)}</p>
        
        ${item.detalhes ? `
          <button class="accordion-toggle-btn" type="button" aria-expanded="false" onclick="toggleCardDetails(this)">
            <span>Ver mais detalhes</span>
            <span class="arrow">&darr;</span>
          </button>
          <div class="accordion-body">
            <p style="margin-top: 0.8rem; font-size: 0.9rem; color: #d1d5db;">${escapeHtml(item.detalhes)}</p>
          </div>
        ` : ''}
      </div>
    </article>
  `).join('');
}

/**
 * Render Eventos
 */
function renderEventos(eventos) {
  const container = document.getElementById('container-eventos');
  if (!container) return;

  container.innerHTML = eventos.map(ev => `
    <article class="event-card reveal visible">
      <div class="event-media">
        <img src="${escapeHtml(ev.imagem || 'img/bg-culto-congregacao.webp')}" alt="${escapeHtml(ev.titulo)}" loading="lazy">
        <span class="event-tag-pill">${escapeHtml(ev.tag || 'Evento')}</span>
      </div>
      <div class="event-body">
        <div class="event-date">📅 ${escapeHtml(ev.data)} • ${escapeHtml(ev.horario)}</div>
        <h3>${escapeHtml(ev.titulo)}</h3>
        <p>${escapeHtml(ev.descricao)}</p>
        <small style="color: var(--text-dim); display: block; margin-bottom: 1rem;">📍 ${escapeHtml(ev.local)}</small>
        
        ${ev.detalhes ? `
          <button class="accordion-toggle-btn" type="button" aria-expanded="false" onclick="toggleCardDetails(this)" style="margin-bottom: 1rem;">
            <span>Ver programação detalhada</span>
            <span class="arrow">&darr;</span>
          </button>
          <div class="accordion-body">
            <p style="margin-bottom: 1rem; font-size: 0.9rem; color: #d1d5db;">${escapeHtml(ev.detalhes)}</p>
          </div>
        ` : ''}

        <a href="${escapeHtml(ev.link || '#contato')}" class="button button-secondary button-small" style="width: 100%;">
          ${escapeHtml(ev.linkTexto || 'Mais detalhes')}
        </a>
      </div>
    </article>
  `).join('');
}

/**
 * Render Campanhas
 */
function renderCampanhas(campanhas) {
  const container = document.getElementById('container-campanhas');
  if (!container) return;

  container.innerHTML = campanhas.map(c => `
    <div class="panel reveal visible" style="border-color: var(--border-accent);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; flex-wrap: wrap; gap: 0.5rem;">
        <span class="section-tag" style="margin-bottom: 0;">${escapeHtml(c.badge || 'Campanha')}</span>
        <small style="color: var(--accent-graphite-light); font-weight: 600;">${escapeHtml(c.periodo)}</small>
      </div>
      <h3>${escapeHtml(c.titulo)}</h3>
      <p style="font-style: italic; color: #f3f4f6; margin: 0.8rem 0;">"${escapeHtml(c.versiculo)}"</p>
      <p>${escapeHtml(c.descricao)}</p>
      
      ${c.detalhes ? `
        <button class="accordion-toggle-btn" type="button" aria-expanded="false" onclick="toggleCardDetails(this)" style="margin-top: 0.8rem;">
          <span>Ler orientações da campanha</span>
          <span class="arrow">&darr;</span>
        </button>
        <div class="accordion-body">
          <p style="margin-top: 0.8rem; font-size: 0.9rem; color: #d1d5db;">${escapeHtml(c.detalhes)}</p>
        </div>
      ` : ''}

      <a href="${escapeHtml(c.acaoLink || '#contato')}" class="button button-primary button-small" style="margin-top: 1.2rem;">
        ${escapeHtml(c.acaoTexto || 'Participar')}
      </a>
    </div>
  `).join('');
}

/**
 * Render Liderança Pastoral (Proporção 500x500)
 */
function renderLideranca(lideranca) {
  const container = document.getElementById('container-lideranca');
  if (!container) return;

  container.innerHTML = lideranca.map(pastor => `
    <article class="pastor-card reveal visible">
      <div class="pastor-img-wrapper ${pastor.fundoBranco ? 'pastor-img-white-bg' : ''}">
        <img src="${escapeHtml(pastor.imagem)}" alt="${escapeHtml(pastor.nome)}" loading="lazy">
      </div>
      <div class="pastor-info">
        <span class="pastor-role">${escapeHtml(pastor.cargo)}</span>
        <h3>${escapeHtml(pastor.nome)}</h3>
        <p>${escapeHtml(pastor.descricao)}</p>
      </div>
    </article>
  `).join('');
}

/**
 * Render Departamentos (Format 500x500, Title & Description MANDATORILY below image)
 */
function renderDepartamentos(deptos) {
  const container = document.getElementById('container-departamentos');
  if (!container) return;

  container.innerHTML = deptos.map(dept => `
    <article class="dept-card reveal visible">
      <div class="dept-thumb">
        <img src="${escapeHtml(dept.imagem)}" alt="${escapeHtml(dept.titulo)}" loading="lazy">
      </div>
      <div class="dept-content">
        <span class="service-day">${escapeHtml(dept.categoria || 'Ministério')}</span>
        <h3>${escapeHtml(dept.titulo)}</h3>
        <p>${escapeHtml(dept.descricao)}</p>
        <a href="${escapeHtml(dept.link || '#contato')}" class="dept-link">Saber mais &rarr;</a>
      </div>
    </article>
  `).join('');
}

/**
 * Collapsible Accordion Toggle Handler (Abas Retráteis)
 */
function toggleCardDetails(button) {
  const body = button.nextElementSibling;
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  button.setAttribute('aria-expanded', !isExpanded);
  
  if (!isExpanded) {
    body.classList.add('open');
    button.querySelector('.arrow').innerHTML = '&uarr;';
  } else {
    body.classList.remove('open');
    button.querySelector('.arrow').innerHTML = '&darr;';
  }
}

/**
 * Initialize general accordion tabs on page
 */
function initAccordionTabs() {
  document.querySelectorAll('.tab-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !isExpanded);
      if (targetContent) {
        targetContent.classList.toggle('open');
      }
    });
  });
}

/**
 * Helper to escape HTML characters
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
