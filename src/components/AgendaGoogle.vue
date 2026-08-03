<template>
  <section v-if="googleCalendar && googleCalendar.ativo" class="section section-dark" id="agenda-google">
    <div class="container">
      <div class="section-heading text-center reveal visible">
        <span class="section-tag">Sincronização em Tempo Real</span>
        <h2>Próximos Eventos da Agenda</h2>
        <p>Estes eventos são sincronizados automaticamente a partir da nossa agenda oficial do Google. Ao adicionar ou remover na agenda, o site é atualizado instantaneamente.</p>
      </div>

      <!-- Estado de Carregamento -->
      <div v-if="loading" class="text-center" style="padding: 2rem 0; color: var(--text-muted);">
        <p>Buscando eventos da agenda...</p>
      </div>

      <!-- Grid de Eventos Dinâmicos do Google Agenda -->
      <div v-else-if="events.length > 0" class="card-grid">
        <div 
          v-for="event in events" 
          :key="event.id"
          class="event-card reveal visible"
        >
          <div class="event-media" style="height: 140px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); display: flex; align-items: center; justify-content: center; padding: 1.5rem; text-align: center;">
            <div>
              <span class="event-tag-pill" style="position: static; display: inline-block; margin-bottom: 0.5rem;">
                {{ event.category || 'Evento Agendado' }}
              </span>
              <div style="font-size: 1.2rem; font-weight: 700; color: #ffffff;">
                {{ formatEventDay(event.start) }}
              </div>
            </div>
          </div>

          <div class="event-body">
            <div class="event-date" style="color: var(--accent-graphite-light); font-weight: 600; margin-bottom: 0.5rem;">
              <Clock class="icon" style="display: inline-block; vertical-align: middle; margin-right: 0.4rem;" />
              {{ formatEventTime(event.start, event.end) }}
            </div>

            <h3 style="margin-bottom: 0.8rem; font-size: 1.3rem;">{{ event.title }}</h3>
            
            <p v-if="event.description" style="margin-bottom: 1rem; color: #d1d5db; line-height: 1.6;">
              {{ event.description }}
            </p>

            <div v-if="event.location" style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.2rem;">
              <MapPin class="icon" style="display: inline-block; vertical-align: middle; width: 0.9rem; height: 0.9rem; margin-right: 0.3rem;" />
              {{ event.location }}
            </div>

            <a
              v-if="googleCalendar.subscribeUrl || googleCalendar.calendarId"
              class="button button-secondary button-small"
              :href="googleCalendar.subscribeUrl || ('https://calendar.google.com/calendar/render?cid=' + encodeURIComponent(googleCalendar.calendarId))"
              target="_blank"
              rel="noopener noreferrer"
              style="margin-top: auto; width: 100%; justify-content: center;"
            >
              <Calendar class="icon" />
              Salvar na Minha Agenda
            </a>
          </div>
        </div>
      </div>

      <!-- Estado Quando Não Há Eventos Agendados -->
      <div v-else class="panel text-center reveal visible" style="max-width: 600px; margin: 0 auto;">
        <Calendar class="icon" style="width: 3rem; height: 3rem; color: var(--accent-graphite-light); margin-bottom: 1rem;" />
        <h3 style="margin-bottom: 0.5rem;">Nenhum evento futuro agendado no momento</h3>
        <p style="margin-bottom: 1.5rem;">
          Novos eventos e cultos especiais serão exibidos aqui automaticamente assim que forem adicionados à agenda do Google.
        </p>
        <a
          v-if="googleCalendar.subscribeUrl || googleCalendar.calendarId"
          class="button button-primary"
          :href="googleCalendar.subscribeUrl || ('https://calendar.google.com/calendar/render?cid=' + encodeURIComponent(googleCalendar.calendarId))"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Calendar class="icon" />
          Acompanhar Agenda no Google
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Calendar, Clock, MapPin } from 'lucide-vue-next';

const props = defineProps({
  googleCalendar: {
    type: Object,
    default: () => ({})
  }
});

const loading = ref(true);
const events = ref([]);

const sanitizeEventTitle = (rawTitle) => {
  if (!rawTitle) return 'Culto Especial';
  const clean = rawTitle.trim();
  if (/^busy$/i.test(clean) || /^occupied$/i.test(clean) || /^private$/i.test(clean) || /^ocupado$/i.test(clean)) {
    return 'Culto Especial';
  }
  return clean;
};

/**
 * Parses raw iCal string (basic.ics) into event objects
 */
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

    const rawSummary = summaryMatch ? summaryMatch[1].trim() : 'Evento Agendado';
    const title = sanitizeEventTitle(rawSummary);
    const description = descMatch ? descMatch[1].replace(/\\n/g, ' ').replace(/\\/g, '').trim() : '';
    const location = locMatch ? locMatch[1].replace(/\\/g, '').trim() : '';

    const parseICalDate = (str) => {
      if (!str) return null;
      const cleanStr = str.trim();
      if (cleanStr.length === 8) {
        // YYYYMMDD
        const y = parseInt(cleanStr.substr(0, 4));
        const m = parseInt(cleanStr.substr(4, 2)) - 1;
        const d = parseInt(cleanStr.substr(6, 2));
        return new Date(y, m, d);
      } else if (cleanStr.includes('T')) {
        // YYYYMMDDTHHMMSSZ
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

    // Filter out past events (keep events that end today or in the future)
    if (endDate && endDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      parsedEvents.push({
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        location,
        start: startDate,
        end: endDate,
        category: title.toLowerCase().includes('jovens') ? 'Culto dos Jovens' : 'Evento Especial'
      });
    }
  }

  // Sort upcoming events by start date
  return parsedEvents.sort((a, b) => a.start - b.start);
};

/**
 * Fetches events via API Key or public iCal feed
 */
const fetchGoogleEvents = async () => {
  if (!props.googleCalendar?.calendarId) {
    loading.value = false;
    return;
  }

  loading.value = true;
  const calendarId = props.googleCalendar.calendarId;
  const apiKey = props.googleCalendar.apiKey;

  // 1. Try Google Calendar API v3 if apiKey is present
  if (apiKey) {
    try {
      const now = new Date().toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=10`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        events.value = (data.items || []).map(item => {
          const title = sanitizeEventTitle(item.summary);
          return {
            id: item.id,
            title: title,
            description: item.description || '',
            location: item.location || '',
            start: new Date(item.start.dateTime || item.start.date),
            end: new Date(item.end?.dateTime || item.end?.date || item.start.dateTime || item.start.date),
            category: title.toLowerCase().includes('jovens') ? 'Culto dos Jovens' : 'Evento Especial'
          };
        });
        loading.value = false;
        return;
      }
    } catch (err) {
      console.warn('API Key fetch failed, trying iCal feed fallback...', err);
    }
  }

  // 2. Fallback: Fetch Public iCal feed
  try {
    const icalUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
    const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(icalUrl)}`;
    
    const res = await fetch(corsProxyUrl);
    if (res.ok) {
      const icalText = await res.text();
      const parsed = parseICalData(icalText);
      if (parsed.length > 0) {
        events.value = parsed;
        loading.value = false;
        return;
      }
    }
  } catch (err) {
    console.warn('CORS proxy iCal fetch warning:', err);
  }

  events.value = [];
  loading.value = false;
};

const formatEventDay = (startDate) => {
  if (!startDate) return '';
  const d = new Date(startDate);
  return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
};

const formatEventTime = (startDate, endDate) => {
  if (!startDate) return '';
  const dStart = new Date(startDate);
  const startTime = dStart.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  if (endDate) {
    const dEnd = new Date(endDate);
    const endTime = dEnd.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    if (startTime !== endTime && endTime !== '00:00') {
      return `${startTime} - ${endTime}`;
    }
  }
  return `às ${startTime}`;
};

onMounted(() => {
  fetchGoogleEvents();
  // Auto-verificação periódica a cada 3 minutos (180.000 ms)
  refreshTimer = setInterval(() => {
    fetchGoogleEvents();
  }, 3 * 60 * 1000);
});

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});

watch(() => props.googleCalendar, () => {
  fetchGoogleEvents();
}, { deep: true });
</script>
