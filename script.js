/* ==========================================================================
   TABERNÁCULO DE DAVI (TDD SEDE) - ENGINE ESTÁTICA AUTÔNOMA (VUE 3 CDN)
   ========================================================================== */

const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

const app = createApp({
  setup() {
    const conteudo = ref({});
    const isScrolled = ref(false);
    const isMenuOpen = ref(false);
    const activeAccordions = ref([]);
    const activeAboutTab = ref(null);
    const googleEvents = ref([]);
    let refreshTimer = null;

    const defaultCultos = [
      {
        id: "culto-domingo",
        ativo: true,
        dia: "Domingo",
        titulo: "Culto Principal da Família",
        horario: "18h00",
        descricao: "Grande celebração da igreja com louvor, adoração e pregação da Palavra.",
        destaque: true,
        detalhes: "O momento central da nossa semana! Contamos com acolhimento especial para visitantes e Departamento Infantil ativo."
      },
      {
        id: "culto-segunda",
        ativo: true,
        dia: "Segunda-feira",
        titulo: "Culto de Oração",
        horario: "19h30",
        descricao: "Momento de intercessão, clamor pelas famílias e busca pela presença de Deus.",
        destaque: false,
        detalhes: "Leve seus pedidos de oração. Iniciamos com 30 minutos de clamor silencioso, seguido por louvor e palavra pastoral."
      },
      {
        id: "culto-quarta",
        ativo: true,
        dia: "Quarta-feira",
        titulo: "Culto de Quarta",
        horario: "19h30",
        descricao: "Edificação através da Palavra, cura, libertação e restauração de vidas.",
        destaque: false,
        detalhes: "Culto focado no ensino prático das Escrituras e oração individual com imposição de mãos."
      }
    ];

    const currentYear = ref(new Date().getFullYear());

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 30;
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    const toggleAccordion = (id) => {
      if (activeAccordions.value.includes(id)) {
        activeAccordions.value = activeAccordions.value.filter(item => item !== id);
      } else {
        activeAccordions.value.push(id);
      }
    };

    const toggleAboutTab = (tabName) => {
      if (activeAboutTab.value === tabName) {
        activeAboutTab.value = null;
      } else {
        activeAboutTab.value = tabName;
      }
    };

    const currentTheme = computed(() => {
      const temaConfig = conteudo.value.temaDoMes;
      if (!temaConfig) return {};

      if (temaConfig.modoAutomatico && temaConfig.temasPorMes) {
        const month = new Date().getMonth() + 1; // 1-12
        const themeForMonth = temaConfig.temasPorMes[month.toString()];
        if (themeForMonth) return themeForMonth;
      }

      return temaConfig.custom || temaConfig.temasPorMes?.['8'] || {};
    });

    const getDayIndex = (dayStr, dateObj) => {
      if (dateObj instanceof Date && !isNaN(dateObj)) {
        return dateObj.getDay();
      }
      if (!dayStr) return 0;
      const str = dayStr.toLowerCase();
      if (str.includes('domingo')) return 0;
      if (str.includes('segunda')) return 1;
      if (str.includes('terça') || str.includes('terca')) return 2;
      if (str.includes('quarta')) return 3;
      if (str.includes('quinta')) return 4;
      if (str.includes('sexta')) return 5;
      if (str.includes('sábado') || str.includes('sabado')) return 6;
      return 0;
    };

    const formatEventDay = (startDate) => {
      if (!startDate) return '';
      const d = new Date(startDate);
      const dayName = d.toLocaleDateString('pt-BR', { weekday: 'long' });
      return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    };

    const formatEventTime = (startDate, endDate) => {
      if (!startDate) return '19h30';
      const dStart = new Date(startDate);
      const startTime = dStart.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      if (endDate) {
        const dEnd = new Date(endDate);
        const endTime = dEnd.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        if (startTime !== endTime && endTime !== '00:00') {
          return `${startTime} às ${endTime}`;
        }
      }
      return startTime;
    };

    const sortedCultosCards = computed(() => {
      const cards = [];

      const listToProcess = (conteudo.value.agendaSemanal || conteudo.value.agendaCultos || defaultCultos);

      // 1. Cultos Fixos Permanentes (Domingo, Segunda, Quarta)
      listToProcess.forEach(culto => {
        if (culto.ativo !== false) {
          cards.push({
            id: culto.id,
            diaLabel: culto.dia,
            dayIndex: getDayIndex(culto.dia),
            titulo: culto.titulo,
            horario: culto.horario,
            descricao: culto.descricao || '',
            orientacao: culto.detalhes || culto.orientacao,
            destaque: culto.destaque,
            isDynamic: false
          });
        }
      });

      // 2. Eventos Dinâmicos do Google Agenda
      googleEvents.value.forEach(event => {
        const dIndex = getDayIndex(null, event.start);
        cards.push({
          id: event.id,
          diaLabel: formatEventDay(event.start),
          dayIndex: dIndex,
          titulo: event.title,
          horario: formatEventTime(event.start, event.end),
          descricao: event.description || '',
          orientacao: event.description ? `Informações do evento: ${event.description}` : 'Evento agendado oficialmente na igreja.',
          location: event.location || '',
          badge: event.title.toLowerCase().includes('jovens') ? 'Culto dos Jovens' : 'Culto Especial',
          destaque: true,
          isDynamic: true
        });
      });

      // 3. Ordenação Cronológica Exata (Domingo 0, Segunda 1, Terça 2, Quarta 3, Quinta 4, Sexta 5, Sábado 6)
      return cards.sort((a, b) => a.dayIndex - b.dayIndex);
    });

    const parseICalData = (icalText) => {
      const parsedEvents = [];
      const veventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
      let match;
      const now = new Date();

      while ((match = veventRegex.exec(icalText)) !== null) {
        const block = match[1];
        
        const summaryMatch = block.match(/SUMMARY:(.*)/);
        const descMatch = block.match(/DESCRIPTION:(.*)/);
        const locMatch = block.match(/LOCATION:(.*)/);
        const dtstartMatch = block.match(/DTSTART(?:;[^:]*)?:(.*)/);
        const dtendMatch = block.match(/DTEND(?:;[^:]*)?:(.*)/);

        const title = summaryMatch ? summaryMatch[1].trim() : 'Culto Especial';
        const description = descMatch ? descMatch[1].replace(/\\n/g, ' ').replace(/\\/g, '').trim() : '';
        const location = locMatch ? locMatch[1].replace(/\\/g, '').trim() : '';

        const parseICalDate = (str) => {
          if (!str) return null;
          const cleanStr = str.trim();
          if (cleanStr.length === 8) {
            const y = parseInt(cleanStr.substr(0, 4));
            const m = parseInt(cleanStr.substr(4, 2)) - 1;
            const d = parseInt(cleanStr.substr(6, 2));
            return new Date(y, m, d);
          } else if (cleanStr.includes('T')) {
            const parts = cleanStr.split('T');
            const y = parseInt(parts[0].substr(0, 4));
            const m = parseInt(parts[0].substr(4, 2)) - 1;
            const d = parseInt(parts[0].substr(6, 2));
            const hh = parseInt(parts[1].substr(0, 2)) || 0;
            const mm = parseInt(parts[1].substr(2, 2)) || 0;
            return new Date(Date.UTC(y, m, d, hh, mm));
          }
          return new Date(cleanStr);
        };

        const startDate = dtstartMatch ? parseICalDate(dtstartMatch[1]) : null;
        const endDate = dtendMatch ? parseICalDate(dtendMatch[1]) : startDate;

        if (endDate && endDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
          parsedEvents.push({
            id: Math.random().toString(36).substr(2, 9),
            title,
            description,
            location,
            start: startDate,
            end: endDate
          });
        }
      }

      return parsedEvents;
    };

    const fetchGoogleEvents = async () => {
      const calConfig = conteudo.value.googleCalendar;
      if (!calConfig?.calendarId) return;

      const calendarId = calConfig.calendarId;
      const apiKey = calConfig.apiKey;

      if (apiKey) {
        try {
          const now = new Date().toISOString();
          const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=10`;
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            googleEvents.value = (data.items || []).map(item => ({
              id: item.id,
              title: item.summary || 'Culto Especial',
              description: item.description || '',
              location: item.location || '',
              start: new Date(item.start.dateTime || item.start.date),
              end: new Date(item.end?.dateTime || item.end?.date || item.start.dateTime || item.start.date)
            }));
            return;
          }
        } catch (err) {
          console.warn('API fetch warning:', err);
        }
      }

      try {
        const icalUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
        const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(icalUrl)}`;
        
        const res = await fetch(corsProxyUrl);
        if (res.ok) {
          const icalText = await res.text();
          const parsed = parseICalData(icalText);
          if (parsed.length > 0) {
            googleEvents.value = parsed;
            return;
          }
        }
      } catch (err) {
        console.warn('iCal fetch warning:', err);
      }

      googleEvents.value = [];
    };

    const carregarConteudo = async () => {
      try {
        const res = await fetch('conteudo.json?v=' + Date.now());
        if (res.ok) {
          conteudo.value = await res.json();
          fetchGoogleEvents();
        }
      } catch (err) {
        console.error('Erro ao carregar conteudo.json:', err);
      }
    };

    onMounted(() => {
      carregarConteudo();
      window.addEventListener('scroll', handleScroll);

      // Verificação automática a cada 1 minuto (60.000 ms)
      refreshTimer = setInterval(() => {
        fetchGoogleEvents();
      }, 1 * 60 * 1000);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      if (refreshTimer) {
        clearInterval(refreshTimer);
      }
    });

    return {
      conteudo,
      isScrolled,
      isMenuOpen,
      activeAccordions,
      activeAboutTab,
      currentYear,
      currentTheme,
      sortedCultosCards,
      toggleMenu,
      closeMenu,
      toggleAccordion,
      toggleAboutTab
    };
  }
});

app.mount('#app');
