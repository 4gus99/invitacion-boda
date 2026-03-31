import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarHeart,
  Clock3,
  MapPin,
  Wine,
  Music4,
  Shirt,
  Heart,
  ChevronDown,
  Sparkles,
  Send,
  Flower2,
  MoonStar,
  SunMedium,
  Palette,
  Copy,
  Check,
  Trees,
  Waves,
  Mountain,
  Activity,
  Footprints,
  Utensils,
  PartyPopper,
} from "lucide-react";

const EVENT_DATE = new Date("2027-01-09T11:00:00");
const RSVP_PHONE = "5492901309424";
const RSVP_FORM_URL = "#"; // Reemplazar por el link del formulario conectado a Excel/Sheets
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Calle+Fray+Mamerto+Esquiu+Lujan+de+Cuyo+Mendoza";
const CERRO_ARCO_URL = "https://www.google.com/maps/search/?api=1&query=Cerro+Arco+Mendoza";
const MUSIC_URL =
  "https://cdn.pixabay.com/download/audio/2023/03/02/audio_8b6d5d1c3a.mp3?filename=romantic-background-141997.mp3";
// Splash background: put your photo at public/splash-bg.jpg to use it here.
const SPLASH_BG = "/splash-bg.jpg";

const venuePhotos = [
  { src: "/images/wedding/table.jpg", title: "Mesa elegante en la viña" },
  { src: "/images/wedding/landscape.jpg", title: "Viñedo al atardecer" },
  { src: "/images/wedding/moment.jpg", title: "Momento emotivo" },
  { src: "/images/wedding/bouquet.jpg", title: "Ramo delicado" },
];

const themes = {
  rose: {
    name: "Rosa Vino",
    bg: "#f8f2f3",
    bg2: "#efe2e5",
    text: "#4d2330",
    soft: "#8c5b6a",
    accent: "#b86d86",
    accent2: "#6f2c43",
    card: "rgba(255,255,255,0.55)",
    border: "rgba(255,255,255,0.68)",
  },
  lilac: {
    name: "Lila Seda",
    bg: "#f6f1fb",
    bg2: "#e9def6",
    text: "#432953",
    soft: "#7d6193",
    accent: "#bb95da",
    accent2: "#5d3f75",
    card: "rgba(255,255,255,0.56)",
    border: "rgba(255,255,255,0.70)",
  },
  ivory: {
    name: "Marfil Bodega",
    bg: "#fbf7f0",
    bg2: "#efe3d3",
    text: "#4b3526",
    soft: "#866650",
    accent: "#d3ad81",
    accent2: "#6c4a2a",
    card: "rgba(255,255,255,0.58)",
    border: "rgba(255,255,255,0.72)",
  },
  night: {
    name: "Noche Cabernet",
    bg: "#1d1320",
    bg2: "#311927",
    text: "#f7edf2",
    soft: "#d2bcc7",
    accent: "#c97a98",
    accent2: "#f2d6df",
    card: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.14)",
  },
};

const schedule = [
  {
    time: "11:00 hs",
    title: "Ceremonia civil",
    text: "Nuestro primer sí del día, íntimo y lleno de emoción.",
  },
  {
    time: "13:00 hs",
    title: "Celebración",
    text: "Comida, abrazos, brindis y mucha alegría compartida.",
  },
  {
    time: "18:30 hs",
    title: "Golden hour",
    text: "Fotos, vino, música suave y una tarde mendocina soñada.",
  },
  {
    time: "21:00 hs",
    title: "Fiesta",
    text: "A bailar, celebrar y disfrutar hasta la madrugada.",
  },
];

const transferData = {
  alias: "RODO.VICKY.BODA",
  cbu: "0000003100000000000001",
  titular: "Rodo y Vicky",
  banco: "Banco a confirmar",
};

const activityOptions = [
  {
    key: "bodegas",
    label: "Bodegas",
    description: "Incluida sí o sí. Queremos brindar con ustedes.",
    icon: Wine,
    locked: true,
  },
  {
    key: "tirolesa",
    label: "Tirolesa",
    description: "Para quienes quieran algo con adrenalina y vistas.",
    icon: Mountain,
  },
  {
    key: "cabalgata",
    label: "Cabalgata",
    description: "Recorrido relajado, paisaje y aire de montaña.",
    icon: Trees,
  },
  {
    key: "rafting",
    label: "Rafting",
    description: "Plan intenso, agua, risas y aventura.",
    icon: Waves,
  },
  {
    key: "termas",
    label: "Termas",
    description: "Opción tranquila para descansar y disfrutar.",
    icon: Activity,
  },
];

function formatCountdown(target) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, ended: false };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function SectionTitle({ eyebrow, title, text, color }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <p className="uppercase tracking-[0.35em] text-xs md:text-sm" style={{ color }}>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl md:text-6xl font-serif leading-[0.96]">
        {title}
      </h2>
      {text ? <p className="mt-5 text-base md:text-lg leading-8 opacity-80">{text}</p> : null}
    </div>
  );
}

function GlassCard({ children, theme, className = "" }) {
  return (
    <div
      className={`backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${className}`}
      style={{
        background: theme.card,
        border: `1px solid ${theme.border}`,
      }}
    >
      {children}
    </div>
  );
}

export default function InvitacionBodaRodoVicky() {
  const [opened, setOpened] = useState(false);
  const [themeKey, setThemeKey] = useState("rose");
  const [countdown, setCountdown] = useState(formatCountdown(EVENT_DATE));
  const [musicOn, setMusicOn] = useState(false);
  const [copied, setCopied] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    asistentes: "1",
    restricciones: "",
    sendero: "si",
    actividades: ["bodegas"],
  });
  const audioRef = useRef(null);

  const theme = themes[themeKey];

  useEffect(() => {
    // When the splash is visible (opened === false) lock background scrolling
    if (!opened) {
      try {
        document.body.style.overflow = "hidden";
      } catch (e) {}
    } else {
      try {
        document.body.style.overflow = "";
      } catch (e) {}
    }
    return () => {
      try {
        document.body.style.overflow = "";
      } catch (e) {}
    };
  }, [opened]);

  useEffect(() => {
    const t = setInterval(() => setCountdown(formatCountdown(EVENT_DATE)), 1000);
    return () => clearInterval(t);
  }, []);

  const enterBtnRef = useRef(null);
  const [playOpenAnim, setPlayOpenAnim] = useState(false);
  const audioContextRef = useRef(null);
  const padNodesRef = useRef(null);
  const [audioFallback, setAudioFallback] = useState(false);
  const [audioErrorMessage, setAudioErrorMessage] = useState("");

  useEffect(() => {
    if (!opened && enterBtnRef.current) {
      enterBtnRef.current.focus({ preventScroll: true });
    }
  }, [opened]);

  const startEnter = () => {
    if (playOpenAnim) return;
    setPlayOpenAnim(true);
    // start music as part of the user gesture (should be allowed by browsers)
    try {
      const audio = audioRef.current;
      if (audio) {
        try {
          audio.volume = 0.15;
        } catch (e) {}
        // attempt to play immediately from the click event and fallback to generated pad
        const p = audio.play();
        if (p && typeof p.then === "function") {
          p
            .then(() => {
              // played successfully
            })
            .catch((err) => {
              console.warn("audio.play() failed, falling back to generated pad:", err);
              setAudioErrorMessage("La reproducción de la pista fue bloqueada. Reproduciré un acompañamiento suave.");
              startPad();
              setAudioFallback(true);
            });
        }
      }
    } catch (e) {}
    setMusicOn(true);
    // allow the envelope/flap animation to play before removing the splash
    setTimeout(() => setOpened(true), 900);
  };

  function startPad() {
    try {
      if (padNodesRef.current) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      try { if (ctx.state === 'suspended' && typeof ctx.resume === 'function') ctx.resume(); } catch (e) {}
      audioContextRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0.06;
      master.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;
      filter.Q.value = 0.9;
      filter.connect(master);

      const osc1 = ctx.createOscillator();
      const g1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.value = 220;
      osc1.detune.value = -8;
      g1.gain.value = 0.0001;
      osc1.connect(g1);
      g1.connect(filter);

      const osc2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.value = 330;
      osc2.detune.value = 6;
      g2.gain.value = 0.0001;
      osc2.connect(g2);
      g2.connect(filter);

      osc1.start();
      osc2.start();

      // fade in
      const now = ctx.currentTime;
      g1.gain.linearRampToValueAtTime(0.02, now + 1.4);
      g2.gain.linearRampToValueAtTime(0.03, now + 1.6);

      padNodesRef.current = { ctx, master, filter, osc1, osc2, g1, g2 };
      setAudioFallback(true);
      setAudioErrorMessage("");
    } catch (err) {
      console.warn('startPad error', err);
      setAudioErrorMessage('No fue posible reproducir audio en este dispositivo.');
    }
  }

  function stopPad() {
    try {
      const nodes = padNodesRef.current;
      if (!nodes) return;
      const { ctx, g1, g2, osc1, osc2, master } = nodes;
      const now = ctx.currentTime;
      g1.gain.cancelScheduledValues(now);
      g2.gain.cancelScheduledValues(now);
      g1.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      g2.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        try { osc1.stop(); } catch (e) {}
        try { osc2.stop(); } catch (e) {}
        try { master.disconnect(); } catch (e) {}
        padNodesRef.current = null;
        if (audioContextRef.current) {
          try { audioContextRef.current.close(); } catch (e) {}
          audioContextRef.current = null;
        }
        setAudioFallback(false);
      }, 900);
    } catch (err) {
      console.warn('stopPad error', err);
      padNodesRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      // cleanup on unmount
      try {
        const audio = audioRef.current;
        if (audio) audio.pause();
      } catch (e) {}
      try { stopPad(); } catch (e) {}
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      try {
        audio.volume = 0.15;
      } catch (e) {}
      if (audio.paused) audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [musicOn]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(""), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const whatsappMessage = useMemo(() => {
    const acts = form.actividades.join(", ");
    return encodeURIComponent(
      `Hola 💜 Confirmo asistencia a la boda de Rodo y Vicky.%0A%0ANombre: ${form.nombre || ""}%0AAcompañantes: ${form.asistentes}%0ARestricciones alimenticias: ${form.restricciones || "Ninguna"}%0AActividades elegidas: ${acts}%0A¿Sendero a Cerro Arco?: ${form.sendero}`
    );
  }, [form]);

  const toggleActivity = (key, locked) => {
    if (locked) return;
    setForm((prev) => {
      const exists = prev.actividades.includes(key);
      return {
        ...prev,
        actividades: exists
          ? prev.actividades.filter((x) => x !== key)
          : [...prev.actividades, key],
      };
    });
  };

  const copyValue = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
    } catch {}
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-700"
      style={{
        background: `linear-gradient(180deg, ${theme.bg} 0%, ${theme.bg2} 50%, ${theme.bg} 100%)`,
        color: theme.text,
      }}
    >
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" playsInline crossOrigin="anonymous" />

      <style>{`
        html { scroll-behavior: smooth; }
        body { font-family: Georgia, 'Times New Roman', serif; }
        .font-serif { font-family: Georgia, 'Times New Roman', serif; }
        .font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        .name-font { font-family: 'Allura', cursive; }

        @keyframes petalFall {
          0% { transform: translate3d(0,-20vh,0) rotate(0deg); opacity: 0; }
          10% { opacity: .8; }
          100% { transform: translate3d(var(--drift),120vh,0) rotate(360deg); opacity: 0; }
        }
        @keyframes floaty {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 10px 40px rgba(0,0,0,.06), 0 0 0 rgba(255,255,255,0); }
          50% { box-shadow: 0 18px 60px rgba(0,0,0,.10), 0 0 60px rgba(255,255,255,.15); }
        }
        @keyframes shine {
          0% { transform: translateX(-120%) rotate(12deg); }
          100% { transform: translateX(120%) rotate(12deg); }
        }
        .petal {
          position: absolute;
          top: -10vh;
          width: 14px;
          height: 20px;
          border-radius: 80% 0 80% 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(221,170,197,0.95));
          animation: petalFall linear infinite;
          filter: blur(0.5px); /* Aumentar visibilidad sutilmente */
          opacity: 0.9; /* Incrementar opacidad ligeramente */
          pointer-events: none;
        }
        .floaty { animation: floaty 7s ease-in-out infinite; }
        .glowPulse { animation: glowPulse 4s ease-in-out infinite; }
        .shine:before {
          content: '';
          position: absolute;
          inset: -20%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
          animation: shine 6s linear infinite;
        }
        .scrollbar-soft::-webkit-scrollbar { height: 8px; width: 8px; }
        .scrollbar-soft::-webkit-scrollbar-thumb { background: rgba(120,120,120,.25); border-radius: 999px; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-90" style={{ zIndex: 60 }}>
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${(i * 17) % 100}%`,
              animationDuration: `${10 + (i % 8) * 2}s`,
              animationDelay: `${(i % 9) * 0.6}s`,
              ["--drift"]: `${-40 + (i % 7) * 14}px`,
              transform: `scale(${0.65 + (i % 5) * 0.16})`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {!opened && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.66), rgba(0,0,0,0.66)), url(${SPLASH_BG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 9999,
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-title"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                startEnter();
              }
            }}
          >
            <motion.div
              className="w-full min-h-screen flex items-center justify-center px-6"
              initial={{ opacity: 0, y: 12, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={playOpenAnim ? { opacity: 0, y: -30, scale: 0.98 } : { opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <motion.div className="max-w-5xl text-center px-4" initial={{ opacity: 0, y: 8 }} animate={playOpenAnim ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="uppercase tracking-[0.35em] text-sm md:text-base font-sans text-white/90">Nombre Invitado</p>
                <h1 id="invite-title" className="mt-4 text-6xl md:text-[96px] name-font text-white leading-none" style={{ textShadow: '0 18px 40px rgba(0,0,0,0.45)' }}>Rodo y Vicky</h1>
                <p className="mt-4 text-lg md:text-xl text-white/85">Con mucha alegría te invitamos a celebrar nuestra boda</p>

                <div className="mt-10 flex gap-4 justify-center">
                  <button ref={enterBtnRef} onClick={startEnter} className="rounded-full px-6 py-3 bg-white text-black font-semibold shadow-md hover:scale-[1.02] transition-transform">Entrar a la invitación</button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen px-5 md:px-8 pt-8 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-8">
  <div className="text-center max-w-4xl mx-auto">
    <p className="uppercase tracking-[0.4em] text-xs md:text-sm opacity-70 font-sans">
      Invitación digital de boda
    </p>
    <h1 className="mt-3 text-6xl md:text-8xl lg:text-[110px] leading-[0.9] name-font">
      Rodo y Vicky
    </h1>
    <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-8 opacity-80 font-sans">
      Un día para celebrar el amor, el vino, Mendoza y todo lo hermoso que queremos compartir con ustedes.
    </p>
  </div>

  <div className="mt-6 flex flex-wrap gap-3 justify-center">
    <button
      onClick={() => setMusicOn((v) => !v)}
      className="rounded-full px-5 py-3 font-sans text-sm shadow-lg transition hover:scale-[1.03]"
      style={{ background: theme.card, border: `1px solid ${theme.border}` }}
    >
      <span className="inline-flex items-center gap-2">
        <Music4 size={16} /> {musicOn ? "Pausar música" : "Reproducir música"}
      </span>
    </button>
    <a
      href="#rsvp"
      className="rounded-full px-5 py-3 font-sans text-sm text-white shadow-lg transition hover:scale-[1.03]"
      style={{ background: theme.accent2 }}
    >
      Confirmar asistencia
    </a>
  </div>
</div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8 items-stretch">
            <GlassCard theme={theme} className="rounded-[38px] p-8 md:p-10 relative overflow-visible shine shadow-md">
              <div className="absolute inset-0 z-0 pointer-events-none" style={{
                background: `radial-gradient(circle at 50% 0%, ${theme.accent2}10 0%, transparent 90%)`,
                borderRadius: '38px',
              }} />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm uppercase tracking-[0.25em] font-sans shadow-md"
                  style={{ background: "rgba(255,255,255,0.5)", color: theme.accent2 }}>
                  <Sparkles size={16} /> Save the date
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4 font-sans items-center">
                  <div className="rounded-[24px] p-6 flex flex-col items-start gap-2 w-full h-full" style={{ background: "rgba(255,255,255,0.55)" }}>
                    <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: theme.accent }}>
                      <CalendarHeart size={18} /> Fecha
                    </span>
                    <span className="text-3xl md:text-4xl font-serif font-bold" style={{ letterSpacing: ".01em" }}>09 de enero de 2027</span>
                    <span className="mt-1 opacity-80 leading-7 text-[15px]">Ceremonia civil a las 11:00 hs<br />Celebración durante todo el día.</span>
                  </div>
                  <div className="rounded-[24px] p-6 flex flex-col items-start gap-2 w-full h-full" style={{ background: "rgba(255,255,255,0.55)" }}>
                    <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: theme.accent }}>
                      <MapPin size={18} /> Lugar
                    </span>
                    <span className="text-3xl md:text-4xl font-serif font-bold" style={{ letterSpacing: ".01em" }}>Fray Mamerto Esquiú</span>
                    <span className="mt-1 opacity-80 leading-7 text-[15px]">Luján de Cuyo, Mendoza<br />Desde las 11:00 hasta las 06:00 hs.</span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 font-sans">
                  {([
                    { label: "Días", value: countdown.days },
                    { label: "Horas", value: countdown.hours },
                    { label: "Min", value: countdown.minutes },
                    { label: "Seg", value: countdown.seconds },
                  ]).map((item) => (
                    <div key={item.label} className="rounded-[24px] p-4 text-center shadow-md" style={{ background: "rgba(255,255,255,0.6)" }}>
                      <div className="text-4xl md:text-5xl font-serif font-bold" style={{ color: theme.accent2 }}>{pad(item.value)}</div>
                      <div className="text-xs uppercase tracking-[0.25em] opacity-70" style={{ color: theme.soft }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center text-base md:text-lg font-serif opacity-80">
                  ¡Falta poco para celebrar juntos!
                </div>

                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <a href={MAP_URL} target="_blank" rel="noreferrer" className="rounded-full px-6 py-3 text-white shadow-lg font-sans text-sm" style={{ background: theme.accent2 }}>
                    <span className="inline-flex items-center gap-2"><MapPin size={16} /> Ver ubicación</span>
                  </a>
                  <a href="#agenda" className="rounded-full px-6 py-3 shadow-lg font-sans text-sm" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                    <span className="inline-flex items-center gap-2"><CalendarHeart size={16} /> Ver agenda</span>
                  </a>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-4 md:gap-5 h-full">
              {venuePhotos.map((photo, idx) => (
                <motion.div
                  key={photo.title}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.25 + idx * 0.12, duration: 0.8 }}
                >
                  <GlassCard theme={theme} className={`rounded-[28px] overflow-hidden h-[260px] md:h-[300px]`}>
                    <div className="relative h-full group">
                      <img src={photo.src} alt={photo.title} className="absolute inset-0 w-full h-full object-cover transition duration-[4000ms] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
                      <div className="absolute left-5 bottom-4 text-white">
                        <p className="text-xl md:text-2xl font-serif">{photo.title}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid xl:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
          <GlassCard theme={theme} className="rounded-[34px] p-6 md:p-8 lg:p-10">
            <SectionTitle
              eyebrow="Detalles"
              title="Todo lo importante, en una sola página"
              text="Una experiencia elegante, suave y clara, inspirada en una invitación digital premium para que cada invitado encuentre todo sin perderse nada."
              color={theme.soft}
            />

            <div className="mt-10 grid md:grid-cols-2 gap-4 font-sans">
              {[
                { icon: CalendarHeart, title: "Fecha", text: "Sábado 9 de enero de 2027" },
                { icon: Clock3, title: "Horario", text: "Desde 11:00 hs hasta las 06:00 hs" },
                { icon: MapPin, title: "Ubicación", text: "Calle Fray Mamerto Esquiú, Luján de Cuyo, Mendoza" },
                { icon: Shirt, title: "Dress code", text: "Elegante de día · tonos suaves, nude, vino, tierra o negro" },
              ].map((item) => (
                <div key={item.title} className="rounded-[24px] p-5" style={{ background: "rgba(255,255,255,0.42)" }}>
                  <item.icon size={18} className="mb-3" />
                  <p className="text-xl font-serif">{item.title}</p>
                  <p className="mt-2 leading-7 opacity-80">{item.text}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard theme={theme} className="rounded-[34px] p-6 md:p-8 lg:p-10">
            <SectionTitle
              eyebrow="Elegí tu tema"
              title="Viví la invitación con tu estilo"
              text="Cada invitado puede cambiar la ambientación visual de la página."
              color={theme.soft}
            />

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
              {Object.entries(themes).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setThemeKey(key)}
                  className="rounded-[24px] p-4 text-left transition hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${t.bg}, ${t.bg2})`,
                    border: key === themeKey ? `2px solid ${theme.accent2}` : `1px solid ${theme.border}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-xl" style={{ color: t.text }}>{t.name}</p>
                    <Palette size={16} style={{ color: t.accent2 }} />
                  </div>
                  <div className="mt-4 flex gap-2">
                    {[t.bg, t.bg2, t.accent, t.accent2].map((c) => (
                      <span key={c} className="w-8 h-8 rounded-full border border-white/40" style={{ background: c }} />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section id="agenda" className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="Agenda"
            title="Cómo imaginamos este día"
            text="Para que ya empieces a vivirlo desde ahora."
            color={theme.soft}
          />

          <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-4 font-sans">
            {schedule.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
              >
                <GlassCard theme={theme} className="rounded-[28px] p-6 h-full">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: theme.accent2 }}>
                    <PartyPopper size={20} />
                  </div>
                  <p className="mt-5 text-sm uppercase tracking-[0.24em] opacity-70">{item.time}</p>
                  <h3 className="mt-2 text-2xl font-serif">{item.title}</h3>
                  <p className="mt-3 leading-7 opacity-80">{item.text}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid xl:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
          <GlassCard theme={theme} className="rounded-[34px] p-6 md:p-8 lg:p-10">
            <SectionTitle
              eyebrow="Aventura mendocina"
              title="Encuesta de actividades"
              text="Bodegas va sí o sí. Además queremos saber qué otro plan te entusiasma más."
              color={theme.soft}
            />

            <div className="mt-10 grid md:grid-cols-2 gap-4 font-sans">
              {activityOptions.map((item) => {
                const active = form.actividades.includes(item.key);
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleActivity(item.key, item.locked)}
                    className="rounded-[26px] p-5 text-left transition hover:scale-[1.01]"
                    style={{
                      background: active ? theme.accent2 : "rgba(255,255,255,0.42)",
                      color: active ? "white" : theme.text,
                      border: active ? "1px solid transparent" : `1px solid ${theme.border}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2">
                          <Icon size={18} />
                          <p className="font-serif text-2xl">{item.label}</p>
                        </div>
                        <p className="mt-3 leading-7 opacity-90">{item.description}</p>
                      </div>
                      {item.locked ? (
                        <span className="text-xs uppercase tracking-[0.22em] opacity-90">Incluida</span>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-current mt-1 flex items-center justify-center">
                          {active ? <Check size={14} /> : null}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-[28px] p-5 md:p-6 font-sans" style={{ background: "rgba(255,255,255,0.42)" }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2">
                    <Footprints size={18} />
                    <p className="font-serif text-2xl">Sendero a Cerro Arco</p>
                  </div>
                  <p className="mt-2 leading-7 opacity-80">Queremos saber si te sumás a esta actividad para organizarlo mejor.</p>
                </div>
                <a href={CERRO_ARCO_URL} target="_blank" rel="noreferrer" className="rounded-full px-5 py-3 text-white shadow-lg font-sans text-sm" style={{ background: theme.accent2 }}>
                  Ver referencia
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {[
                  { value: "si", label: "Sí, me sumo" },
                  { value: "tal vez", label: "Tal vez" },
                  { value: "no", label: "No esta vez" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setForm((p) => ({ ...p, sendero: opt.value }))}
                    className="rounded-full px-5 py-3 font-sans text-sm transition"
                    style={{
                      background: form.sendero === opt.value ? theme.accent2 : "rgba(255,255,255,0.42)",
                      color: form.sendero === opt.value ? "white" : theme.text,
                      border: form.sendero === opt.value ? "1px solid transparent" : `1px solid ${theme.border}`,
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard theme={theme} className="rounded-[34px] p-6 md:p-8 lg:p-10">
            <SectionTitle
              eyebrow="Dress code"
              title="Elegancia suave con alma de viñedo"
              text="Nos imaginamos una estética armónica, fresca y sofisticada."
              color={theme.soft}
            />

            <div className="mt-10 grid gap-4 font-sans">
              {[
                {
                  icon: SunMedium,
                  title: "Ideal",
                  text: "Tonos vino, rosa empolvado, champagne, nude, negro, gris humo, arena o verde suave.",
                },
                {
                  icon: MoonStar,
                  title: "Estilo",
                  text: "Elegante · romántico · prolijo. Pueden sumar texturas, brillo sutil o detalles delicados.",
                },
                {
                  icon: Flower2,
                  title: "Tip",
                  text: "Como será un día largo, prioricen verse hermosos pero también cómodos para disfrutar de todo.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[24px] p-5" style={{ background: "rgba(255,255,255,0.42)" }}>
                  <div className="inline-flex items-center gap-2">
                    <item.icon size={18} />
                    <p className="font-serif text-2xl">{item.title}</p>
                  </div>
                  <p className="mt-3 leading-7 opacity-80">{item.text}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section id="rsvp" className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid xl:grid-cols-[1fr_1fr] gap-8 items-start">
          <GlassCard theme={theme} className="rounded-[34px] p-6 md:p-8 lg:p-10">
            <SectionTitle
              eyebrow="RSVP"
              title="Confirmá tu asistencia"
              text="Podés usar el formulario conectado a Excel/Sheets y además enviarnos un WhatsApp con tu info por si acaso."
              color={theme.soft}
            />

            <div className="mt-10 grid gap-4 font-sans">
              <div>
                <label className="block text-sm uppercase tracking-[0.24em] opacity-70 mb-2">Nombre y apellido</label>
                <input
                  value={form.nombre}
                  onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                  className="w-full rounded-[18px] px-4 py-4 outline-none"
                  style={{ background: "rgba(255,255,255,0.52)", border: `1px solid ${theme.border}` }}
                  placeholder="Escribí tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-[0.24em] opacity-70 mb-2">Cantidad de asistentes</label>
                <select
                  value={form.asistentes}
                  onChange={(e) => setForm((p) => ({ ...p, asistentes: e.target.value }))}
                  className="w-full rounded-[18px] px-4 py-4 outline-none"
                  style={{ background: "rgba(255,255,255,0.52)", border: `1px solid ${theme.border}` }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-[0.24em] opacity-70 mb-2">Restricciones alimenticias</label>
                <textarea
                  value={form.restricciones}
                  onChange={(e) => setForm((p) => ({ ...p, restricciones: e.target.value }))}
                  className="w-full min-h-[120px] rounded-[18px] px-4 py-4 outline-none resize-y"
                  style={{ background: "rgba(255,255,255,0.52)", border: `1px solid ${theme.border}` }}
                  placeholder="Ej: vegetariano, celiaquía, sin lactosa, alergias, etc."
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 font-sans">
              <a
                href={RSVP_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-6 py-3.5 text-white shadow-lg hover:scale-[1.03] transition"
                style={{ background: theme.accent2 }}
              >
                <span className="inline-flex items-center gap-2"><Send size={16} /> Ir al formulario / Excel</span>
              </a>
              <a
                href={`https://wa.me/${RSVP_PHONE}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-6 py-3.5 hover:scale-[1.03] transition"
                style={{ background: theme.card, border: `1px solid ${theme.border}` }}
              >
                Enviar por WhatsApp
              </a>
            </div>

            <div className="mt-5 rounded-[22px] p-4 font-sans text-sm leading-7" style={{ background: "rgba(255,255,255,0.42)" }}>
              Pegá en <strong>RSVP_FORM_URL</strong> el link de tu formulario conectado a Excel/Google Sheets. Así el botón queda operativo de verdad y las respuestas se guardan automáticamente.
            </div>
          </GlassCard>

          <GlassCard theme={theme} className="rounded-[34px] p-6 md:p-8 lg:p-10">
            <SectionTitle
              eyebrow="Regalo"
              title="Datos para transferencia"
              text="Su presencia ya es un regalo. Si además quieren acompañarnos con algo más, les dejamos los datos acá."
              color={theme.soft}
            />

            <div className="mt-10 grid gap-4 font-sans">
              {[
                ["Alias", transferData.alias],
                ["CBU", transferData.cbu],
                ["Titular", transferData.titular],
                ["Banco", transferData.banco],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[22px] p-5 flex items-center justify-between gap-4" style={{ background: "rgba(255,255,255,0.42)" }}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] opacity-65">{label}</p>
                    <p className="mt-2 text-xl font-serif break-all">{value}</p>
                  </div>
                  <button
                    onClick={() => copyValue(label, value)}
                    className="rounded-full w-11 h-11 flex items-center justify-center"
                    style={{ background: theme.card, border: `1px solid ${theme.border}` }}
                  >
                    {copied === label ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="px-5 md:px-8 pt-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <GlassCard theme={theme} className="rounded-[38px] p-8 md:p-10 lg:p-14 text-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at top, ${theme.accent}, transparent 45%)` }} />
            <div className="relative z-10">
              <p className="uppercase tracking-[0.35em] text-xs md:text-sm opacity-70 font-sans">Con mucho amor</p>
              <h2 className="mt-5 text-5xl md:text-7xl font-serif leading-[0.95]">Los esperamos</h2>
              <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg leading-8 opacity-80 font-sans">
                Gracias por ser parte de nuestra historia. Queremos que esta invitación no solo informe, sino que haga sentir desde ahora lo especial que va a ser ese día.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 font-sans">
                <a href="#rsvp" className="rounded-full px-6 py-3.5 text-white shadow-lg" style={{ background: theme.accent2 }}>
                  Confirmar asistencia
                </a>
                <a href={MAP_URL} target="_blank" rel="noreferrer" className="rounded-full px-6 py-3.5" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                  Cómo llegar
                </a>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
      {opened && (
        <>
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => {
                const next = !musicOn;
                setMusicOn(next);
                if (audioFallback) {
                  if (next) startPad(); else stopPad();
                } else {
                  const audio = audioRef.current;
                  if (audio) {
                    try {
                      if (next) {
                        audio.volume = 0.15;
                        const p = audio.play();
                        if (p && typeof p.then === 'function') p.catch(() => {});
                      } else {
                        audio.pause();
                      }
                    } catch (e) {}
                  }
                }
              }}
              aria-label={musicOn ? "Pausar música" : "Reproducir música"}
              title={musicOn ? "Pausar música" : "Reproducir música"}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-white/90"
            >
              <Music4 size={18} />
            </button>
          </div>

          {audioErrorMessage ? (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/60 text-white px-4 py-2 rounded-md">
              {audioErrorMessage}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
