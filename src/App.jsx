import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarHeart,
  Clock3,
  MapPin,
  Shirt,
  Wine,
  Trees,
  Waves,
  Mountain,
  BedDouble,
  CarTaxiFront,
  CloudSun,
  Gift,
  Check,
  ChevronDown,
  Volume2,
  VolumeX,
  Heart,
  Send,
  Sparkles,
  Utensils,
} from "lucide-react";

// Fecha fija de la bodas
const EVENT_DATE = new Date("2027-01-09T11:00:00");

// Datos de contacto. Reemplazar con valores reales antes de publicar.
const RSVP_PHONE = "5492901309424";
const RSVP_FORM_URL = "#";
const MAP_URL =
  "https://www.google.com/maps/place/Caba%C3%B1as+Pacar%C3%AD+Tamp%C3%BA/@-32.8533001,-68.8958719,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipOR1aDQGhlCQQATDaaT2c9CIsDR8BBy4QFee2Ba!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipOR1aDQGhlCQQATDaaT2c9CIsDR8BBy4QFee2Ba%3Dw203-h152-k-no!7i2240!8i1680!4m10!3m9!1s0x967e08060b4dc929:0xf27b0a8b70ae5093!5m2!4m1!1i2!8m2!3d-32.853288!4d-68.8956999!10e5!16s%2Fg%2F11b6dh6xkp!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D";
const MUSIC_URL = "/music/musica.mp3";
const WHATSAPP_GROUP_BOYS =
  "https://chat.whatsapp.com/KCiORDv1gg649f8Go7SGO9?mode=gi_t";

const WHATSAPP_GROUP_GIRLS =
  "https://chat.whatsapp.com/HjmP9uVvbfk9BFc2BzdAFd?mode=gi_t";
// Paleta única inspirada en la primera versión de la página (lila seda)
const theme = {
  name: "Lila Seda",
  pageBg: "#f6f1fb",
  pageBg2: "#e9def6",
  text: "#432953",
  textSoft: "#7d6193",
  accent: "#bb95da",
  accentStrong: "#5d3f75",
  accentSoft: "#efe3fb",
  line: "rgba(67,37,83,0.12)",
  card: "rgba(255,255,255,0.56)",
  cardStrong: "rgba(255,255,255,0.84)",
  chip: "#f3ebfa",
  heroOverlay: "rgba(25,18,32,0.44)",
};

// Contenido principal
// Cronograma del día de la ceremonia. Esta agenda se muestra en la sección "El día".
const timeline = [
  {
    time: "10:00 hs",
    title: "Recepción",
    text: "Recibimos a todos nuestros invitados para comenzar la celebración.",
  },
  {
    time: "12:00 hs",
    title: "Ceremonia",
    text: "La boda se celebra con emoción y amor, nuestro momento del sí.",
  },
  {
    time: "14:00 hs",
    title: "Almuerzo",
    text: "Disfrutamos de un almuerzo especial para brindar y compartir juntos.",
  },
  {
    time: "16:00 hs",
    title: "Torta",
    text: "Cortamos la torta y compartimos un dulce momento.",
  },
  {
    time: "17:00 hs",
    title: "Juegos",
    text: "Proponemos juegos divertidos para seguir celebrando y reír sin parar.",
  },
  {
    time: "19:00 hs",
    title: "Show de máscaras, música y joda",
    text: "Un cierre espectacular con música, máscaras y mucha fiesta.",
  },
];

// Cronograma general por fechas. Resume las fechas clave de la experiencia.
const generalSchedule = [
  {
    time: "09/01",
    title: "Civil en Ushuaia",
    text: "La boda por civil se celebra en Ushuaia, como primer momento de esta historia.",
  },
  {
    time: "12/01",
    title: "Check‑in en cabañas",
    text: "Comienza la experiencia en Mendoza con el ingreso a las cabañas y la recepción de invitados.",
  },
  {
    time: "13/01",
    title: "Bodegas y trekking",
    text: "Un día para disfrutar del paisaje mendocino, el vino y las primeras actividades compartidas.",
  },
  {
    time: "14/01",
    title: "Ceremonia",
    text: "El gran día: ceremonia, celebración y un momento inolvidable con todos ustedes.",
  },
  {
    time: "15/01",
    title: "Actividades",
    text: "Termas, rafting, río Mendoza y tiempo para seguir disfrutando esta escapada especial.",
  },
  {
    time: "16/01",
    title: "Checkout de cabañas",
    text: "Cierre de la estadía y despedida de estos días tan lindos compartidos.",
  },
];

// Cronograma desglosado por día. Muestra las actividades de cada jornada en detalle.
const detailedSchedule = [
  {
    day: "Día 12/01",
    title: "Llegada a Mendoza",
    items: [
      "Ingreso a las cabañas",
      "Recepción durante el día",
      "Actividad recreativa al Cerro Arco (trek)",
      "Cena de bienvenida para los invitados",
    ],
  },
  {
    day: "Día 13/01",
    title: "Viñas, aventura y festejo",
    items: [
      "Bodegas",
      "Cabalgata",
      "Cena karaoke",
    ],
  },
  {
    day: "Día 14/01",
    title: "Ceremonia",
    items: [
      "Ceremonia durante todo el día",
    ],
  },
  {
    day: "Día 15/01",
    title: "Día de actividades",
    items: [
      "Termas y/o rafting",
      "Piletas y río Mendoza",
      "Noche de cierre de estadía",
    ],
  },
  {
    day: "Día 16/01",
    title: "Despedida",
    items: [
      "Checkout",
    ],
  },
];

const details = [
  {
    icon: CalendarHeart,
    title: "Fecha",
    text: "Sábado 9 de enero de 2027",
  },
  {
    icon: Clock3,
    title: "Horario",
    text: "Desde las 11:00 hs",
  },
  {
    icon: MapPin,
    title: "Lugar",
    text: "Luján de Cuyo, Mendoza",
  },
  {
    icon: Shirt,
    title: "Dress code",
    text: "Elegante de día · tonos suaves, tierra, vino, nude o negro",
  },
];

// Opciones de actividad principal (se elige solo una). Bodegas es obligatoria y se maneja por separado.
const activities = [
  {
    key: "cabalgata",
    title: "Cabalgata",
    subtitle: "Elegí una opción",
    text: "Un paseo tranquilo para disfrutar la montaña y el paisaje mendocino.",
    //meta: "Suave · 2 hs · con reserva",
    icon: Trees,
    image: "/images/wedding/cabalgata.jpg",
  },
  {
    key: "rafting",
    title: "Rafting",
    subtitle: "Elegí una opción",
    text: "Plan aventurero, divertido y más intenso para quienes quieran adrenalina.",
    //meta: "Alto · 3 hs · con reserva",
    icon: Waves,
    image: "/images/wedding/rafting.jpg",
  },
  {
    key: "termas",
    title: "Termas",
    subtitle: "Elegí una opción",
    text: "Una experiencia más relajada para descansar, disfrutar y compartir un momento tranquilo.",
    //meta: "Relax",
    icon: Wine,
    image: "/images/wedding/termas.jpg",
  },
  {
  key: "tirolesa",
  title: "Tirolesa",
  subtitle: "Elegí una opción",
  text: "Una experiencia aérea llena de adrenalina, ideal para quienes quieren algo distinto y divertido.",
  //meta: "Medio/alto · 2 hs ",
  icon: Mountain,
  image: "/images/wedding/tirolesa.jpg",
},
];

const stayInfo = [
  {
    icon: BedDouble,
    title: "Hospedaje",
    text: "El hospedaje está incluido en Cabañas Pacarí Tampú. El check-in será el 12 de enero y la despedida el 16 de enero.",
  },
  {
    icon: CarTaxiFront,
    title: "Traslados",
    text: "Recomendamos alojarse cerca de Luján de Cuyo. Más adelante confirmaremos traslados.",
  },
  {
    icon: CloudSun,
    title: "Clima",
    text: "Enero en Mendoza suele ser cálido. Traé lentes, protector solar y calzado cómodo.",
  },
];

const transferData = [
  { label: "Alias", value: "RODO.VICKY.BODA" },
  { label: "CBU", value: "0000003100000000000001" },
  { label: "Titular", value: "Rodo y Vicky" },
  { label: "Banco", value: "Banco a confirmar" },
];

const faqs = [
  {
    q: "¿Hasta cuándo puedo confirmar asistencia?",
    a: "Les agradeceremos confirmar su asistencia idealmente hasta 120 días antes del evento, para que podamos organizar cada detalle con tiempo.",
  },
  {
    q: "¿La invitación es individual?",
    a: "Sí, cada invitación ha sido pensada de manera individual. Si desean asistir con un acompañante, les pedimos que lo coordinen previamente con nosotros.",
  },
  {
    q: "¿El hospedaje está incluido?",
    a: "Sí, el hospedaje estará incluido en Cabañas Pacarí Tampú, del 12 al 16 de enero.",
  },
  {
    q: "¿Qué comodidades tendrá el alojamiento?",
    a: "Las cabañas cuentan con Wi-Fi gratuito, estacionamiento sin costo, piscina al aire libre, aire acondicionado y cocina en todas las unidades.",
  },
  {
    q: "¿El hospedaje incluye comidas?",
    a: "Si, aunque cada cabaña dispone de cocina para mayor comodidad, el alojamiento no incluye desayuno ni restaurante,",
  },
  {
    q: "¿Habrá traslado desde o hacia el aeropuerto?",
    a: "No, el alojamiento no cuenta con servicio de traslado, por lo que recomendamos organizarlo con anticipación.",
  },
  {
    q: "¿Puedo informar restricciones alimentarias?",
    a: "Sí. Al confirmar asistencia podrán indicarnos alergias, intolerancias o preferencias alimentarias.",
  },
  {
    q: "¿Cómo será el dress code?",
    a: "Elegante de día, en tonos neutros y cálidos como beige, arena, nude o tierra.",
  },
  {
    q: "¿Qué calzado conviene llevar?",
    a: "Recomendamos priorizar comodidad, especialmente para disfrutar de espacios al aire libre y terreno natural.",
  },
];

const mendozaImages = [
  "/images/wedding/mendoza2.jpg",
  "/images/wedding/mendoza9.jpg",
  "/images/wedding/mendoza1.jpg",
  "/images/wedding/mendoza14.jpg",
  "/images/wedding/mendoza4.jpg",
  "/images/wedding/mendoza11.jpg",
  "/images/wedding/mendoza3.jpg",
  "/images/wedding/mendoza6.jpg",
];
const secondCarouselImages = [
  "/images/wedding/hero.jpg",
  "/images/wedding/1.jpg",
  "/images/wedding/2.jpg",
  "/images/wedding/3.jpg",
  "/images/wedding/4.jpg",
  "/images/wedding/5.jpg",
  "/images/wedding/6.jpg",
  "/images/wedding/7.jpg",
  "/images/wedding/8.jpg",
  "/images/wedding/9.jpg",
  "/images/wedding/11.jpg",
  "/images/wedding/12.jpg",
  "/images/wedding/13.jpg",
  "/images/wedding/14.jpg",
  "/images/wedding/15.jpg",
  "/images/wedding/16.jpg",
  "/images/wedding/17.jpg",
];
// Padding helper for countdown numbers
function pad(n) {
  return String(n).padStart(2, "0");
}

// Calculate remaining time for the countdown
function getCountdown(target) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: false,
  };
}

// Componente para encabezados de sección
function SectionHeader({ eyebrow, title, text, theme, align = "center" }) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "text-center mx-auto" : ""} max-w-3xl`}>
      <p
        className="uppercase tracking-[0.32em] text-[11px] sm:text-xs font-medium"
        style={{ color: theme.textSoft }}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[34px] sm:text-[42px] md:text-[58px] leading-[0.96] font-serif">
        {title}
      </h2>
      {text ? (
        <p
          className="mt-4 text-[15px] sm:text-base md:text-lg leading-7 md:leading-8"
          style={{ color: theme.textSoft }}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}

// Componente para tarjetas estilo vidrio esmerilado
function Card({ children, theme, className = "" }) {
  return (
    <div
      className={`rounded-[28px] border shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl ${className}`}
      style={{ background: theme.card, borderColor: theme.line }}
    >
      {children}
    </div>
  );
}

// Componente para cada cifra del contador
function CountBox({ label, value, theme }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center rounded-[20px] px-2 py-3 sm:px-4 sm:py-5 min-h-[55px] sm:min-h-[160px] w-full"
      style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
    >
      <div className="text-[28px] sm:text-[34px] md:text-[42px] font-serif tracking-[0.03em] leading-none">
        {value}
      </div>

      <div
        className="mt-2 text-[9px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] leading-none text-center"
        style={{ color: theme.textSoft }}
      >
        {label}
      </div>
    </div>
  );
}

// Componente para cada pregunta frecuente con comportamiento de acordeón
function FAQItem({ item, theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-[22px] border overflow-hidden"
      style={{ background: theme.cardStrong, borderColor: theme.line }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
      >
        <span className="font-medium text-[15px] sm:text-base">{item.q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: theme.textSoft }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div
              className="px-5 pb-5 text-[15px] leading-7"
              style={{ color: theme.textSoft }}
            >
              {item.a}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}




// Componente para revelar secciones al hacer scroll
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

function EditorialCarousel({
  images,
  eyebrow,
  title,
  text,
  theme,
  imageAlt = "Imagen del carrusel",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoPlayRef = useRef(null);

  function startAutoPlay() {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5500);
  }

  function resetAutoPlay() {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5500);
  }

  function prevSlide() {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetAutoPlay();
  }

  function nextSlide() {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  }

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [images.length]);

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
      <div className="max-w-md">
        <p
          className="uppercase tracking-[0.32em] text-[11px] sm:text-xs font-medium"
          style={{ color: theme.textSoft }}
        >
          {eyebrow}
        </p>

        <h2 className="mt-4 text-[38px] sm:text-[52px] md:text-[68px] leading-[0.95] font-serif">
          {title}
        </h2>

        <p
          className="mt-5 text-[15px] sm:text-base leading-7 sm:leading-8"
          style={{ color: theme.textSoft }}
        >
          {text}
        </p>

        <div className="mt-8">
          <div
            className="h-px w-20"
            style={{ background: "rgba(93,63,117,0.18)" }}
          />
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute right-0 top-[-26px] w-[78%] h-[82%] rounded-[2px]"
          style={{
            background: "rgba(93,63,117,0.08)",
          }}
        />

        <div className="relative overflow-hidden h-[320px] sm:h-[420px] lg:h-[500px] shadow-[0_24px_60px_rgba(0,0,0,0.14)]">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.img
              key={images[currentIndex]}
              src={images[currentIndex]}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
              custom={direction}
              initial={(dir) => ({
                x: dir > 0 ? "100%" : "-100%",
                opacity: 1,
              })}
              animate={{ x: "0%", opacity: 1 }}
              exit={(dir) => ({
                x: dir > 0 ? "-100%" : "100%",
                opacity: 1,
              })}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-[1.05]"
            style={{
              background: "rgba(255,255,255,0.14)",
              borderColor: "rgba(255,255,255,0.28)",
              color: "#fff",
            }}
            aria-label="Imagen anterior"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-[1.05]"
            style={{
              background: "rgba(255,255,255,0.14)",
              borderColor: "rgba(255,255,255,0.28)",
              color: "#fff",
            }}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background:
                  index === currentIndex
                    ? theme.accentStrong
                    : "rgba(93,63,117,0.20)",
                transform:
                  index === currentIndex ? "scale(1.18)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [countdown, setCountdown] = useState(getCountdown(EVENT_DATE));
  const [musicOn, setMusicOn] = useState(false);
  const [copied, setCopied] = useState("");
  
  const [form, setForm] = useState({
    nombre: "",
    asistencia: "si",
    acompanantes: "1",
    restricciones: "",
    cancion: "",
    mensaje: "",
    actividadPrincipal: "",
    senderoCerroArco: "tal vez",
    genero: "",
  });
  const audioRef = useRef(null);
  const heroRef = useRef(null);
  const [showMobileCta, setShowMobileCta] = useState(false);

 

  // Actualizar contador cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(EVENT_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Controlar reproducción de música
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.volume = 0.18;
      const promise = audio.play();
      if (promise && typeof promise.catch === "function") {
        promise.catch(() => setMusicOn(false));
      }
    } else {
      audio.pause();
    }
  }, [musicOn]);


  // Limpiar mensaje de copiado después de un tiempo
  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(""), 1600);
    return () => clearTimeout(timeout);
  }, [copied]);

  // Mostrar botón fijo mobile solo cuando el hero deja de estar visible
useEffect(() => {
  const heroEl = heroRef.current;
  if (!heroEl) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setShowMobileCta(!entry.isIntersecting);
    },
    {
      threshold: 0.15,
    }
  );

  observer.observe(heroEl);

  return () => observer.disconnect();
}, []);

  // Componer mensaje para WhatsApp
  const whatsappMessage = useMemo(() => {
  const actividadElegida = form.actividadPrincipal
    ? form.actividadPrincipal
    : "Ninguna elegida";

  return encodeURIComponent(
    `Hola 💛 Confirmo datos para la boda de Rodo y Vicky.\n\nNombre: ${form.nombre || "-"}\nAsistencia: ${form.asistencia}\nGénero: ${form.genero || "-"}\nInvitación: individual (1 persona)\nRestricciones alimentarias: ${form.restricciones || "Ninguna"}\nCanción sugerida: ${form.cancion || "Ninguna"}\nActividad principal: ${actividadElegida}\nSendero a Cerro Arco: ${form.senderoCerroArco}\nMensaje: ${form.mensaje || "-"}`
  );
}, [form]);

  // Seleccionar o deseleccionar actividad principal
  function selectActividadPrincipal(key) {
    setForm((prev) => ({
      ...prev,
      actividadPrincipal: prev.actividadPrincipal === key ? "" : key,
    }));
  }

  // Copiar datos bancarios al portapapeles
  async function copyValue(label, value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
    } catch (error) {
      console.error("No se pudo copiar:", error);
    }
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        color: theme.text,
        background: `linear-gradient(180deg, ${theme.pageBg} 0%, ${theme.pageBg2} 45%, ${theme.pageBg} 100%)`,
      }}
    >
      {/* Audio de fondo */}
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" playsInline />

      {/* Estilos globales y animaciones */}
      <style>{`
        html { scroll-behavior: smooth; }
        body { 
          font-family: 'Montserrat', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
        }
        .font-serif { 
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; 
        }
        .grain::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.06;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.7) 0, transparent 24%),
            radial-gradient(circle at 80% 0%, rgba(255,255,255,0.45) 0, transparent 18%),
            radial-gradient(circle at 50% 80%, rgba(255,255,255,0.35) 0, transparent 22%);
          mix-blend-mode: soft-light;
        }
        @keyframes petalFall {
          0% { transform: translate3d(0,-20vh,0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translate3d(var(--drift),120vh,0) rotate(360deg); opacity: 0; }
        }
        .petal {
          position: absolute;
          top: -10vh;
          width: 14px;
          height: 20px;
          border-radius: 80% 0 80% 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(221,170,197,0.95));
          animation: petalFall linear infinite;
          filter: blur(0.5px);
          opacity: 0.85;
          pointer-events: none;
        }
      `}</style>

      {/* Superposición de pétalos */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 50, opacity: 0.9 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${(i * 17) % 100}%`,
              animationDuration: `${10 + (i % 8) * 2}s`,
              animationDelay: `${(i % 9) * 0.5}s`,
              ['--drift']: `${-40 + (i % 7) * 14}px`,
              transform: `scale(${0.65 + (i % 5) * 0.16})`,
            }}
          />
        ))}
      </div>

      {/* Cabecera */}
      <header className="fixed top-0 inset-x-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5">
        <div
          className="max-w-7xl mx-auto rounded-full px-3 py-2 sm:px-4 sm:py-3 border backdrop-blur-xl flex items-center justify-between gap-3"
          style={{
            background: theme.card,
            borderColor: theme.line,
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Heart size={16} />
            <span className="text-sm sm:text-[15px] truncate">Rodo & Vicky</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMusicOn((v) => !v)}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:scale-[1.02] transition-transform"
              style={{
                background: theme.cardStrong,
                borderColor: theme.line,
              }}
              aria-label={musicOn ? 'Silenciar música' : 'Activar música'}
              title={musicOn ? 'Silenciar música' : 'Activar música'}
            >
              {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
     <section
  ref={heroRef}
  className="relative min-h-screen pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 overflow-hidden"
>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/images/wedding/aero.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: theme.heroOverlay }}
        />
        <div className="relative z-10 max-w-7xl mx-auto flex items-center min-h-[calc(100vh-7rem)]">
          <Reveal>
            <div className="max-w-3xl">
              <p className="uppercase tracking-[0.35em] text-[11px] sm:text-xs text-white/70">
                9 de enero · Mendoza
              </p>
              <h1 className="mt-4 font-serif text-[52px] leading-[0.9] tracking-[0.02em] sm:text-[78px] md:text-[118px] text-white font-[600]">
                Rodo & Vicky
              </h1>
              <p className="mt-4 max-w-xl text-[15px] sm:text-lg md:text-xl leading-7 sm:leading-8 text-white/82">
                Un día para celebrar el amor, el vino y todo lo que queremos compartir con ustedes.
              </p>
              <div className="mt-25 sm:mt-16 grid grid-cols-4 gap-2 sm:gap-4 max-w-[560px] justify-items-stretch">
                <CountBox label="Días" value={pad(countdown.days)} theme={theme} />
                <CountBox label="Horas" value={pad(countdown.hours)} theme={theme} />
                <CountBox label="Minutos" value={pad(countdown.minutes)} theme={theme} />
                <CountBox label="Segundos" value={pad(countdown.seconds)} theme={theme} />
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#rsvp"
                  className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-4 text-[15px] sm:text-base font-semibold hover:scale-[1.02] transition-transform"
                >
                  Confirmar asistencia
                </a>
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/24 text-white px-6 py-4 text-[15px] sm:text-base font-medium bg-white/8 backdrop-blur-sm hover:bg-white/12 transition-colors"
                >
                  Ver ubicación
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    
      {/* Lo esencial */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Lo esencial"
              title="Todo lo importante, claro y a mano"
              text="La idea es que esta página sea su guía principal: fecha, lugar, dress code, actividades, regalos y confirmación."
              theme={theme}
            />
          </div>
        </Reveal>
      </section>

      {/* Bloque editorial con imagen y flechas */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <Reveal>
          <EditorialCarousel
            images={mendozaImages}
            eyebrow="Mendoza"
            title="Un destino para celebrar"
            text="Entre viñas, montaña y atardeceres inolvidables, queremos que estos días también se sientan como una escapada hermosa para compartir juntos."
            theme={theme}
            imageAlt="Paisajes de Mendoza"
          />
        </Reveal>
      </section>

      {/* Cronograma completo */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Cronograma"
              title="Así vamos a vivir estos días"
              text="Primero celebramos el civil en Ushuaia y, unos días después, nos reencontramos en Mendoza para compartir la experiencia completa."
              theme={theme}
            />

            <div className="mt-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8">
              {/* Resumen general */}
              <Card theme={theme} className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-serif">Cronograma general</h3>
                <div className="mt-6 space-y-5">
                  {generalSchedule.map((item, index) => (
                    <div key={`${item.time}-${item.title}`} className="grid grid-cols-[72px_1fr] gap-4">
                      <div>
                        <div
                          className="rounded-full px-3 py-2 text-center text-xs uppercase tracking-[0.18em]"
                          style={{ background: theme.chip, color: theme.accentStrong }}
                        >
                          {item.time}
                        </div>
                      </div>

                      <div className="relative">
                        {index !== generalSchedule.length - 1 ? (
                          <div
                            className="absolute left-[6px] top-7 bottom-[-18px] w-px"
                            style={{ background: theme.line }}
                          />
                        ) : null}

                        <div className="flex items-start gap-3">
                          <div
                            className="mt-1.5 w-3 h-3 rounded-full"
                            style={{ background: theme.accent }}
                          />
                          <div>
                            <h4 className="text-lg sm:text-xl font-serif">{item.title}</h4>
                            <p
                              className="mt-1 text-[15px] leading-7"
                              style={{ color: theme.textSoft }}
                            >
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Desglose por día */}
              <Card theme={theme} className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-serif">Cronograma desglosado</h3>

                <div className="mt-6 space-y-4">
                  {detailedSchedule.map((dayItem) => (
                    <div
                      key={dayItem.day}
                      className="rounded-[22px] p-5"
                      style={{
                        background: theme.cardStrong,
                        border: `1px solid ${theme.line}`,
                      }}
                    >
                      <p
                        className="text-[11px] uppercase tracking-[0.24em]"
                        style={{ color: theme.textSoft }}
                      >
                        {dayItem.day}
                      </p>

                      <h4 className="mt-2 text-xl sm:text-2xl font-serif">
                        {dayItem.title}
                      </h4>

                      <ul className="mt-4 space-y-2 text-[15px] leading-7">
                        {dayItem.items.map((item) => (
                          <li key={item} style={{ color: theme.textSoft }}>
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Reveal>
      </section>

      {/* El día + Dress code */}
      <section className="px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8 items-stretch">
          <Reveal delay={0.05}>
            <Card theme={theme} className="overflow-hidden">
              <div className="grid md:grid-cols-[0.95fr_1.05fr] h-full">
                <div className="relative min-h-[280px] md:min-h-full">
                  <img
                    src="/images/wedding/pareja.png"
                    alt="Rodo y Vicky"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 lg:p-10">
                  <SectionHeader
                eyebrow="Día de la ceremonia · 14 de enero"
                title="El momento más importante"
                text="Este es el día que imaginamos durante mucho tiempo. Queremos compartir cada instante con ustedes: desde la recepción hasta la última canción, en una celebración llena de emoción, alegría y fiesta."
                theme={theme}
                align="left"
              />
                  <div className="mt-8 space-y-5">
                    {timeline.map((item, index) => (
                      <div key={item.title} className="grid grid-cols-[76px_1fr] gap-4">
                        <div>
                          <div
                            className="rounded-full px-3 py-2 text-center text-xs uppercase tracking-[0.18em]"
                            style={{ background: theme.chip, color: theme.accentStrong }}
                          >
                            {item.time}
                          </div>
                        </div>
                        <div className="relative">
                          {index !== timeline.length - 1 ? (
                            <div
                              className="absolute left-[6px] top-7 bottom-[-20px] w-px"
                              style={{ background: theme.line }}
                            />
                          ) : null}
                          <div className="flex items-start gap-3">
                            <div
                              className="mt-1.5 w-3 h-3 rounded-full"
                              style={{ background: theme.accent }}
                            />
                            <div>
                              <h3 className="text-lg sm:text-xl font-serif">{item.title}</h3>
                              <p className="mt-1 text-[15px] leading-7" style={{ color: theme.textSoft }}>
                                {item.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card theme={theme} className="p-6 sm:p-8 lg:p-10">
              <SectionHeader
                eyebrow="Dress code"
                title="Elegante, luminoso y cómodo"
                text="Queremos una estética cuidada, fresca y natural. La idea es que se sientan lindos, cómodos y en sintonía con el lugar."
                theme={theme}
                align="left"
              />
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div
                  className="rounded-[22px] p-5"
                  style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
                >
                  <p className="text-sm uppercase tracking-[0.22em]" style={{ color: theme.textSoft }}>
                    Sí
                  </p>
                  <ul className="mt-3 space-y-2 text-[15px] leading-7">
                    <li>• Tonos nude, tierra, vino, negro, oliva o suaves</li>
                    <li>• Telas livianas y cortes elegantes</li>
                    <li>• Calzado cómodo para exterior</li>
                  </ul>
                </div>
                <div
                  className="rounded-[22px] p-5"
                  style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
                >
                  <p className="text-sm uppercase tracking-[0.22em]" style={{ color: theme.textSoft }}>
                    Mejor evitar
                  </p>
                  <ul className="mt-3 space-y-2 text-[15px] leading-7">
                    <li>• Looks demasiado deportivos</li>
                    <li>• Prendas incómodas para un día largo</li>
                    <li>• Calzado poco práctico para terreno natural</li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-7" style={{ color: theme.textSoft }}>
                Mendoza en enero puede ser cálido, así que conviene priorizar frescura y comodidad sin perder elegancia.
              </p>
            </Card>
          </Reveal>
        </div>
      </section>
      
            {/* Segundo carrusel */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <Reveal>
          <EditorialCarousel
            images={secondCarouselImages}
            eyebrow="Momentos"
            title="La historia que nos trajo hasta acá"
            text="Cada imagen representa un momento compartido, una etapa vivida y un pedacito del camino que hoy nos encuentra celebrando este amor con ustedes."
            theme={theme}
            imageAlt="Recuerdos y momentos especiales"
          />
        </Reveal>
      </section>

      {/* Encuesta de actividades */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Experiencias"
              title="Encuesta de actividades"
              text="Nos encantaría vivir con ustedes algunos momentos especiales en Mendoza. Bodegas va sí o sí. Además queremos saber qué otro plan te entusiasma más."
              theme={theme}
            />
            {/* Actividad obligatoria */}
            {/* Actividad obligatoria */}
            <div className="mt-6">
              <Card theme={theme} className="p-5 sm:p-6">
                {/* Actividad obligatoria */}
<div className="mt-6">
  <div
    className="rounded-[28px] overflow-hidden border"
    style={{
      background: theme.card,
      borderColor: theme.accent,
      boxShadow: `0 20px 50px rgba(0,0,0,0.09), 0 0 0 1px ${theme.accent} inset`,
    }}
  >
    <div className="relative h-[220px]">
      <img
        src="/images/wedding/vino.png"
        alt="Bodegas"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

      <div className="absolute top-4 right-4">
        <div
          className="rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] font-medium"
          style={{
            background: "rgba(255,255,255,0.16)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.22)",
            backdropFilter: "blur(8px)",
          }}
        >
          Incluida
        </div>
      </div>

      <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">
                    Experiencia confirmada
                  </p>
                  <h3 className="mt-1 text-2xl font-serif text-white">Bodegas</h3>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/14 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                  <Check size={18} />
                </div>
              </div>
            </div>

            <div
              className="p-5"
              style={{
                background: theme.accentSoft,
              }}
            >
              <p
                className="text-[15px] leading-7"
                style={{ color: theme.accentStrong }}
              >
                Esta experiencia va sí o sí. Queremos brindar con ustedes y compartir un momento especial entre viñas.
              </p>
              <p className="mt-3 text-sm" style={{ color: theme.accentStrong }}>
                Actividad incluida · no requiere elección
              </p>
            </div>
          </div>
        </div>
              </Card>
            </div>
            {/* Opciones de actividad principal */}
            <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {activities.map((item) => (
                <motion.button
                  key={item.key}
                  type="button"
                  onClick={() => selectActividadPrincipal(item.key)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="text-left rounded-[28px] overflow-hidden border transition-transform hover:-translate-y-1"
                  style={{
                  background: theme.card,
                  borderColor:
                    form.actividadPrincipal === item.key ? theme.accentStrong : theme.line,
                  boxShadow:
                    form.actividadPrincipal === item.key
                      ? `0 22px 55px rgba(93,63,117,0.18), 0 0 0 1px ${theme.accentStrong} inset`
                      : "0 20px 50px rgba(0,0,0,0.06)",
                }}
                >
                  <div className="relative h-[220px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                    <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">
                          {item.subtitle}
                        </p>
                        <h3 className="mt-1 text-2xl font-serif text-white">{item.title}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/14 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                        {form.actividadPrincipal === item.key ? <Check size={18} /> : <item.icon size={18} />}
                      </div>
                    </div>
                  </div>
                  <div
  className="p-5 transition-colors duration-300"
  style={{
    background:
  form.actividadPrincipal === item.key
    ? "rgba(124, 58, 237, 0.12)" // violeta más visible
    : "transparent",
  }}
>
  <p
    className="text-[15px] leading-7 transition-colors duration-300"
    style={{
      color:
        form.actividadPrincipal === item.key ? theme.accentStrong : theme.text,
    }}
  >
    {item.text}
  </p>
  <p
    className="mt-3 text-sm transition-colors duration-300"
    style={{
      color:
        form.actividadPrincipal === item.key
          ? theme.accentStrong
          : theme.textSoft,
    }}
  >
    {item.meta}
  </p>
</div>
                </motion.button>
              ))}
            </div>
            {/* Sendero Cerro Arco */}
            <div className="mt-8">
              <Card theme={theme} className="p-5 sm:p-6">
                <div className="flex flex-col gap-3">
                  <div>
                    <p
                      className="text-[11px] uppercase tracking-[0.24em]"
                      style={{ color: theme.textSoft }}
                    >
                      Actividad opcional
                    </p>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-serif">Sendero a Cerro Arco</h3>
                    <p className="mt-3 text-[15px] leading-7" style={{ color: theme.textSoft }}>
                      Queremos saber si te sumás a esta actividad para organizarnos mejor.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {[{ value: 'si', label: 'Sí, me sumo' }, { value: 'tal vez', label: 'Tal vez' }, { value: 'no', label: 'No esta vez' }].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            senderoCerroArco: option.value,
                          }))
                        }
                        className="rounded-full px-4 py-2.5 text-sm transition-transform hover:scale-[1.02]"
                        style={{
                          background:
                            form.senderoCerroArco === option.value ? theme.accentStrong : theme.chip,
                          color:
                            form.senderoCerroArco === option.value ? '#ffffff' : theme.text,
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Hospedaje, transporte y regalos */}
      <section className="px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8">
          <Reveal delay={0.05}>
            <Card theme={theme} className="p-6 sm:p-8 lg:p-10">
              <SectionHeader
                eyebrow="Hospedaje y transporte"
                title="Información útil para organizar el viaje"
                text="Queremos que todo sea fácil también para quienes vienen desde afuera."
                theme={theme}
                align="left"
              />
              <div className="mt-8 space-y-4">
                {stayInfo.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] p-5"
                    style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: theme.accentSoft, color: theme.accentStrong }}
                      >
                        <item.icon size={18} />
                      </div>
                      <div>
                        <h3 className="text-lg font-serif">{item.title}</h3>
                        <p className="mt-1 text-[15px] leading-7" style={{ color: theme.textSoft }}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card theme={theme} className="p-6 sm:p-8 lg:p-10" id="regalos">
              <SectionHeader
                eyebrow="Celebrar juntos"
                title="Un fin de semana pensado para disfrutar"
                text="En lugar de regalos, elegimos compartir esta experiencia con ustedes. El aporte es de $150.000 por persona e incluye hospedaje, comidas y actividades durante toda la estadía."
                theme={theme}
                align="left"
              />
              <div className="mt-8 space-y-3">
                {transferData.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] p-4 sm:p-5 flex items-center justify-between gap-3"
                    style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: theme.textSoft }}>
                        {item.label}
                      </p>
                      <p className="mt-1 text-[15px] sm:text-base break-all">{item.value}</p>
                    </div>
                    <button
                      onClick={() => copyValue(item.label, item.value)}
                      className="shrink-0 rounded-full px-4 py-2 text-sm font-medium"
                      style={{ background: theme.chip }}
                    >
                      {copied === item.label ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                ))}
              </div>
              <div
                className="mt-5 rounded-[22px] p-5 flex items-start gap-4"
                style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: theme.accentSoft, color: theme.accentStrong }}
                >
                  <Heart size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[15px] leading-7" style={{ color: theme.textSoft }}>
                    Su presencia es el regalo más importante para nosotros.
                  </p>

                  <p className="text-[15px] leading-7 mt-3" style={{ color: theme.textSoft }}>
                    Sabemos que estar acá implica tiempo, organización y esfuerzo, y lo valoramos profundamente.
                  </p>

                  <p className="text-[15px] leading-7 mt-3 font-medium" style={{ color: theme.text }}>
                    Lo único que realmente queremos es compartir este momento con ustedes.
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* RSVP */}
      <section className="px-4 sm:px-6 pb-14 sm:pb-20" id="rsvp">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <Card theme={theme} className="overflow-hidden">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[280px] lg:min-h-full">
                  <img
                    src="/images/wedding/2.jpg"
                    alt="Momento emotivo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
                    <h2 className="mt-3 text-[34px] sm:text-[46px] font-serif leading-[0.96]">
                      Nos encantaría contar con vos
                    </h2>
                    <p className="mt-3 max-w-md text-[15px] sm:text-base leading-7 text-white/82">
                      Completá tus datos.
                    </p>
                  </div>
                </div>
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="block text-sm mb-2" style={{ color: theme.textSoft }}>
                        Nombre y apellido
                      </span>
                      <input
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        className="w-full rounded-[18px] px-4 py-3.5 outline-none"
                        style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
                        placeholder="Tu nombre"
                      />
                    </label>

                    <label className="block">
                      <span className="block text-sm mb-2" style={{ color: theme.textSoft }}>
                        Invitación individual
                      </span>
                      <input
                        type="text"
                        value="1 persona"
                        readOnly
                        className="w-full rounded-[18px] px-4 py-3.5 outline-none cursor-not-allowed"
                        style={{
                          background: theme.cardStrong,
                          border: `1px solid ${theme.line}`,
                          color: theme.textSoft,
                        }}
                      />
                    </label>

                    <label className="block">
                      <span className="block text-sm mb-2" style={{ color: theme.textSoft }}>
                        Género
                      </span>
                      <select
                        value={form.genero}
                        onChange={(e) => setForm({ ...form, genero: e.target.value })}
                        className="w-full rounded-[18px] px-4 py-3.5 outline-none"
                        style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
                      >
                        <option value="">Seleccionar</option>
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="block text-sm mb-2" style={{ color: theme.textSoft }}>
                        Canción sugerida
                      </span>
                      <input
                        value={form.cancion}
                        onChange={(e) => setForm({ ...form, cancion: e.target.value })}
                        className="w-full rounded-[18px] px-4 py-3.5 outline-none"
                        style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
                        placeholder="Tema para bailar"
                      />
                    </label>
                  </div>
                  <label className="block mt-4">
                    <span className="block text-sm mb-2" style={{ color: theme.textSoft }}>
                      Restricciones alimentarias
                    </span>
                    <textarea
                      value={form.restricciones}
                      onChange={(e) => setForm({ ...form, restricciones: e.target.value })}
                      rows={3}
                      className="w-full rounded-[18px] px-4 py-3.5 outline-none resize-none"
                      style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
                      placeholder="Alergias, intolerancias, vegetariano, etc."
                    />
                  </label>
                  <label className="block mt-4">
                    <span className="block text-sm mb-2" style={{ color: theme.textSoft }}>
                      Mensaje para los novios
                    </span>
                    <textarea
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      rows={4}
                      className="w-full rounded-[18px] px-4 py-3.5 outline-none resize-none"
                      style={{ background: theme.cardStrong, border: `1px solid ${theme.line}` }}
                      placeholder="Escribí algo lindo acá"
                    />
                  </label>
                  {/* Selecciones de actividades en RSVP */}
                  <div className="mt-5">
                    <p className="text-sm mb-3" style={{ color: theme.textSoft }}>
                      Actividad principal elegida
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activities.map((item) => {
                        const active = form.actividadPrincipal === item.key;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => selectActividadPrincipal(item.key)}
                            className="rounded-full px-4 py-2 text-sm transition-transform hover:scale-[1.02]"
                            style={{
                              background: active ? theme.accentStrong : theme.chip,
                              color: active ? '#ffffff' : theme.text,
                            }}
                          >
                            {item.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm mb-3" style={{ color: theme.textSoft }}>
                      Sendero a Cerro Arco
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[{ value: 'si', label: 'Sí, me sumo' }, { value: 'tal vez', label: 'Tal vez' }, { value: 'no', label: 'No esta vez' }].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, senderoCerroArco: option.value }))}
                          className="rounded-full px-4 py-2 text-sm transition-transform hover:scale-[1.02]"
                          style={{
                            background: form.senderoCerroArco === option.value ? theme.accentStrong : theme.chip,
                            color: form.senderoCerroArco === option.value ? '#ffffff' : theme.text,
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
  <button
    type="button"
    onClick={() => {
      if (!form.genero) {
        alert("Por favor seleccioná tu género antes de confirmar.");
        return;
      }

      const whatsappURL = `https://wa.me/${RSVP_PHONE}?text=${whatsappMessage}`;
      window.open(whatsappURL, "_blank");

      setTimeout(() => {
        if (form.genero === "hombre") {
          window.open(WHATSAPP_GROUP_BOYS, "_blank");
        } else if (form.genero === "mujer") {
          window.open(WHATSAPP_GROUP_GIRLS, "_blank");
        }
      }, 1500);
    }}
    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-white text-[15px] sm:text-base font-semibold"
    style={{ background: theme.accentStrong }}
  >
    <Send size={16} />
    Confirmar por WhatsApp
  </button>

  <a
    href={RSVP_FORM_URL}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] sm:text-base font-semibold"
    style={{
      background: theme.cardStrong,
      border: `1px solid ${theme.line}`,
    }}
  >
    <Utensils size={16} />
    Abrir formulario RSVP
  </a>
</div>
                  <p className="mt-4 text-sm leading-6" style={{ color: theme.textSoft }}>
                    Reemplazá el link del formulario cuando lo tengas conectado a Google Forms, Sheets o la opción que prefieras.
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 pb-24 sm:pb-28">
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Preguntas frecuentes"
              title="Para que nadie tenga que adivinar nada"
              text="Acá dejamos resueltas las dudas más comunes para que todo sea más simple."
              theme={theme}
            />
            <div className="mt-10 grid lg:grid-cols-2 gap-4">
              {faqs.map((item) => (
                <FAQItem key={item.q} item={item} theme={theme} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Sección final con llamada a la acción */}
      <section className="px-4 sm:px-6 pb-28 sm:pb-20">
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <Card theme={theme} className="relative overflow-hidden grain p-8 sm:p-10 lg:p-14 text-center">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background: `radial-gradient(circle at top, ${theme.accentSoft}, transparent 42%)`,
                }}
              />
              <div className="relative z-10">
                <p
                  className="uppercase tracking-[0.35em] text-[11px] sm:text-xs"
                  style={{ color: theme.textSoft }}
                >
                  Con mucho amor
                </p>
                <h2 className="mt-4 text-[36px] sm:text-[48px] md:text-[68px] leading-[0.94] font-serif">
                  Los esperamos
                </h2>
                <p
                  className="mt-4 max-w-2xl mx-auto text-[15px] sm:text-lg leading-7 sm:leading-8"
                  style={{ color: theme.textSoft }}
                >
                  Gracias por ser parte de nuestra historia. Más que una web, queríamos que esto se sintiera como una invitación hecha con cariño.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href="#rsvp"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-white text-[15px] sm:text-base font-semibold"
                    style={{ background: theme.accentStrong }}
                  >
                    <Sparkles size={16} /> Confirmar asistencia
                  </a>
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] sm:text-base font-semibold"
                    style={{
                      background: theme.cardStrong,
                      border: `1px solid ${theme.line}`,
                    }}
                  >
                    <MapPin size={16} /> Cómo llegar
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* Botón fijo para móviles */}
      {showMobileCta ? (
    <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden p-3">
      <a
        href="#rsvp"
        className="w-full rounded-full px-6 py-4 text-center text-white font-semibold flex items-center justify-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.22)]"
        style={{
          background: theme.accentStrong,
        }}
      >
        <Sparkles size={16} /> Confirmar asistencia
      </a>
    </div>
  ) : null}
    </div>
  );
}