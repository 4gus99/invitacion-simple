import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BedDouble,
  CalendarHeart,
  Heart,
  Send,
  Shirt,
  Sparkles,
  Volume2,
  VolumeX,
  Gift,
} from "lucide-react";

const EVENT_DATE = new Date("2027-01-14T18:00:00");

const RSVP_PHONE_BRIDE = "5492901309424";
const RSVP_PHONE_GROOM = "5492901403076";
const CEREMONY_MAP_URL =
  "https://www.google.com/maps/place/Caba%C3%B1as+Pacar%C3%AD+Tamp%C3%BA/@-32.8533001,-68.8958719,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipOR1aDQGhlCQQATDaaT2c9CIsDR8BBy4QFee2Ba!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipOR1aDQGhlCQQATDaaT2c9CIsDR8BBy4QFee2Ba%3Dw203-h152-k-no!7i2240!8i1680!4m10!3m9!1s0x967e08060b4dc929:0xf27b0a8b70ae5093!5m2!4m1!1i2!8m2!3d-32.853288!4d-68.8956999!10e5!16s%2Fg%2F11b6dh6xkp!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D";
const PARTY_MAP_URL = CEREMONY_MAP_URL;
const MUSIC_URL = "/music/musica.mp3";

const theme = {
  pageBg: "#fcf8ff",
  pageBg2: "#f4ecfb",
  pageBg3: "#efe6f8",
  text: "#4f3b60",
  textSoft: "#806d93",
  accent: "#e9def5",
  accentStrong: "#6e5488",
  accentMuted: "#9b86af",
  accentSoft: "#fbf6ff",
  line: "rgba(110,84,136,0.16)",
  card: "rgba(255,255,255,0.72)",
  cardStrong: "rgba(255,255,255,0.94)",
  heroOverlay: "rgba(61,42,82,0.28)",
  bandBg: "linear-gradient(135deg, rgba(252,248,255,0.96) 0%, rgba(241,232,250,0.94) 48%, rgba(248,242,253,0.96) 100%)",
  bandBgSoft: "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(247,240,252,0.92) 100%)",
  bandLine: "rgba(110,84,136,0.15)",
  whiteSoft: "rgba(255,255,255,0.94)",
  softShadow: "0 24px 70px rgba(90,66,112,0.10)",
};

const lodgingOptions = [
  {
    title: "Cabañas El Challao",
    phone: "+54 261 637 0036",
    address: "Las Delicias 70, El Challao, Mendoza",
    distance: "Aprox. 20 m de Cabañas Pacarí Tampú",
    cta: "Ver hospedaje",
    href: "https://elchallao.com.ar/",
  },
  {
    title: "Complejo Turístico Alfombra Mágika",
    phone: "+54 261 535 7996",
    address: "Av. Champagnat 3162, Las Heras, Mendoza",
    distance: "Aprox. 300 m de Cabañas Pacarí Tampú",
    cta: "Ver hospedaje",
    href: "https://www.booking.com/hotel/ar/complejo-turistico-alfombra-magika.en-gb.html",
  },
  {
    title: "Cabañas Bella Vista El Challao",
    phone: "+54 261 656 1328",
    address: "Champagnat Norte 1640, El Challao, Mendoza",
    distance: "Aprox. 500 m de Cabañas Pacarí Tampú",
    cta: "Ver hospedaje",
    href: "https://www.booking.com/hotel/ar/cabanas-bella-vista-el-challao.html",
  },
  {
    title: "Posada El Álamo Mendoza",
    phone: "+54 261 675 2782",
    address: "El Challao, Las Heras, Mendoza",
    distance: "Aprox. 1,5 km de Cabañas Pacarí Tampú",
    cta: "Ver hospedaje",
    href: "https://www.booking.com/hotel/ar/el-alamo-2.es-ar.html",
  },
];

const paymentData = [
  { label: "Valor tarjeta", value: "$75.000 por adulto" },
  { label: "Alias", value: "CABO.BECADO.ORDEN" },
  { label: "CBU", value: "0170299840000034075432" },
  { label: "Banco", value: "BBVA Francés" },
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


function pad(n) {
  return String(n).padStart(2, "0");
}

function getCountdown(target) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  );
}

function CountBox({ value, label }) {
  return (
    <div
      className="rounded-[28px] px-3 py-4 sm:px-4 sm:py-5 text-center backdrop-blur-md"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(247,241,251,0.86) 100%)",
        border: `1px solid ${theme.line}`,
        boxShadow: "0 16px 42px rgba(32, 20, 47, 0.14)",
      }}
    >
      <div className="font-serif text-[30px] sm:text-[42px] md:text-[50px] leading-none" style={{ color: theme.text }}>
        {value}
      </div>
      <div className="mt-2 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase" style={{ color: theme.textSoft }}>
        {label}
      </div>
    </div>
  );
}


function FloatingPetals() {
  const petals = [
    { left: "7%", delay: 0, duration: 16, size: 14, opacity: 0.28, rotate: 15 },
    { left: "18%", delay: 2.2, duration: 18, size: 18, opacity: 0.22, rotate: -12 },
    { left: "31%", delay: 1, duration: 15, size: 12, opacity: 0.26, rotate: 28 },
    { left: "47%", delay: 3.5, duration: 19, size: 16, opacity: 0.22, rotate: -18 },
    { left: "59%", delay: 0.8, duration: 17, size: 13, opacity: 0.24, rotate: 12 },
    { left: "73%", delay: 2.8, duration: 20, size: 17, opacity: 0.2, rotate: -25 },
    { left: "86%", delay: 1.4, duration: 16, size: 14, opacity: 0.24, rotate: 20 },
  ];

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {petals.map((petal, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{
            left: petal.left,
            top: "-10%",
            width: `${petal.size}px`,
            height: `${petal.size * 0.72}px`,
            background: "linear-gradient(180deg, rgba(248, 238, 255, 0.92), rgba(220, 194, 239, 0.84))",
            borderRadius: "70% 30% 70% 30% / 60% 40% 60% 40%",
            filter: "blur(0.2px)",
            transform: `rotate(${petal.rotate}deg)`,
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, 10, -12, 8, 0],
            rotate: [
              petal.rotate,
              petal.rotate + 120,
              petal.rotate + 260,
              petal.rotate + 360,
            ],
            opacity: [0, petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: "linear",
            delay: petal.delay,
          }}
        />
      ))}
    </div>
  );
}

function OutlineButton({ href, children, inverted = false, onClick, as = "a" }) {
  const shared = {
    borderColor: inverted ? "rgba(255,255,255,0.72)" : theme.accentMuted,
    color: inverted ? "#ffffff" : theme.accentStrong,
    background: inverted ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.72)",
    boxShadow: inverted ? "none" : "0 14px 34px rgba(95,63,120,0.08)",
  };

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center justify-center rounded-full border px-8 py-3 text-[13px] sm:text-[14px] uppercase tracking-[0.14em] transition-all hover:-translate-y-[1px]"
        style={shared}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-full border px-8 py-3 text-[13px] sm:text-[14px] uppercase tracking-[0.14em] transition-all hover:-translate-y-[1px]"
      style={shared}
    >
      {children}
    </a>
  );
}

function GifIcon({ sources = [], alt, fallback }) {
  const [index, setIndex] = useState(0);
  const current = sources[index];

  return (
    <div className="flex justify-center">
      <div className="w-[64px] h-[64px] sm:w-[74px] sm:h-[74px] flex items-center justify-center">
        {current ? (
          <img
            src={current}
            alt={alt}
            className="max-w-full max-h-full object-contain opacity-95"
            onError={() => {
              if (index < sources.length - 1) setIndex((prev) => prev + 1);
              else setIndex(sources.length);
            }}
          />
        ) : (
          fallback
        )}
      </div>
    </div>
  );
}

function SimpleSectionTitle({ icon, title, subtitle }) {
  return (
    <div className="text-center">
      {icon}
      <div className="mt-5 flex items-center justify-center gap-3">
        <span className="h-px w-10" style={{ background: theme.bandLine }} />
        <span className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.textSoft }}>
          Wedding details
        </span>
        <span className="h-px w-10" style={{ background: theme.bandLine }} />
      </div>
      <h2 className="mt-5 font-serif text-[38px] sm:text-[52px] leading-[0.96]" style={{ color: theme.accentStrong }}>
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-[13px] sm:text-[14px] uppercase tracking-[0.28em]" style={{ color: theme.textSoft }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function ItineraryPanel() {
  const [open, setOpen] = useState(false);

  const items = [
    {
      time: "10:00 hs",
      title: "Recepción",
      text: "Recibimos a todos nuestros invitados para comenzar la celebración.",
      gif: ["/images/wedding/libreta.gif", "/images/wedding/libreta(1).gif"],
    },
    {
      time: "12:00 hs",
      title: "Ceremonia",
      text: "La boda se celebra con emoción y amor, nuestro momento del sí.",
      gif: ["/images/wedding/iglesia.gif"],
    },
    {
      time: "14:00 hs",
      title: "Almuerzo",
      text: "Disfrutamos de un almuerzo especial para brindar y compartir juntos.",
      gif: ["/images/wedding/champagne.gif"],
    },
    {
      time: "16:00 hs",
      title: "Torta",
      text: "Cortamos la torta y compartimos un dulce momento.",
      gif: ["/images/wedding/confetti.gif"],
    },
    {
      time: "17:00 hs",
      title: "Juegos",
      text: "Proponemos juegos divertidos para seguir celebrando y reír sin parar.",
      gif: ["/images/wedding/game.gif"],
    },
    {
      time: "19:00 hs",
      title: "Show de máscaras, música y joda",
      text: "Un cierre espectacular con música, máscaras y mucha fiesta.",
      gif: ["/images/wedding/mask.gif"],
    },
  ];

  return (
    <div
      className="mx-auto w-full max-w-[760px] border rounded-[30px] px-6 py-8 sm:px-10 sm:py-10"
      style={{
        borderColor: theme.accentMuted,
        background: "rgba(255,255,255,0.30)",
      }}
    >
      <div className="text-center">
        <GifIcon
          alt="Itinerario"
          sources={["/images/wedding/book.gif"]}
          fallback={<CalendarHeart size={52} color={theme.accentMuted} />}
        />

        <h2
          className="mt-4 text-[22px] sm:text-[26px] uppercase tracking-[0.08em] font-light"
          style={{ color: theme.accentMuted }}
        >
          Itinerario
        </h2>

        <div
          className="mt-5 mx-auto h-px w-[62%]"
          style={{ background: theme.accentMuted }}
        />

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center border px-8 py-3 text-[13px] sm:text-[14px] uppercase tracking-[0.08em] transition-colors"
            style={{
              borderColor: theme.accentMuted,
              color: theme.accentMuted,
              background: "rgba(255,255,255,0.55)",
            }}
          >
            {open ? "Ocultar itinerario" : "Ver itinerario"}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="mt-10 space-y-6">
              {items.map((item, index) => (
                <div
                  key={item.time + item.title}
                  className={index !== items.length - 1 ? "pb-6 border-b" : ""}
                  style={
                    index !== items.length - 1
                      ? { borderColor: theme.line }
                      : undefined
                  }
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 rounded-full flex items-center justify-center"
                      style={{
                        width: "52px",
                        height: "52px",
                        background: "rgba(255,255,255,0.65)",
                        border: `1px solid ${theme.line}`,
                      }}
                    >
                      <div className="scale-[0.72]">
                        <GifIcon
                          alt={item.title}
                          sources={item.gif}
                          fallback={<Sparkles size={24} color={theme.accentMuted} />}
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <p
                        className="text-[12px] sm:text-[13px] uppercase tracking-[0.18em]"
                        style={{ color: theme.accentMuted }}
                      >
                        {item.time}
                      </p>

                      <h3
                        className="mt-2 font-serif text-[24px] sm:text-[28px] leading-none"
                        style={{ color: theme.text }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="mt-3 text-[15px] sm:text-[16px] leading-7"
                        style={{ color: theme.textSoft }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
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
    <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.86fr_1.14fr] gap-8 lg:gap-10 items-center">
      <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-3">
          <span className="h-px w-10" style={{ background: theme.bandLine }} />
          <p
            className="uppercase tracking-[0.32em] text-[11px] sm:text-xs font-medium"
            style={{ color: theme.textSoft }}
          >
            {eyebrow}
          </p>
        </div>

        <h2 className="mt-5 font-serif text-[34px] sm:text-[48px] lg:text-[64px] leading-[0.94]" style={{ color: theme.accentStrong }}>
          {title}
        </h2>

        <p
          className="mt-5 text-[15px] sm:text-base leading-7 sm:leading-8"
          style={{ color: theme.textSoft }}
        >
          {text}
        </p>
      </div>

      <div className="relative">
        <div
          className="absolute -right-3 -top-3 sm:-right-5 sm:-top-5 w-[88%] h-[88%] rounded-[28px] sm:rounded-[34px]"
          style={{
            background: "linear-gradient(180deg, rgba(233,222,245,0.76) 0%, rgba(249,242,255,0.42) 100%)",
          }}
        />

        <div
          className="relative overflow-hidden rounded-[28px] sm:rounded-[34px] border h-[290px] sm:h-[380px] lg:h-[460px] shadow-[0_26px_68px_rgba(53,34,73,0.14)]"
          style={{ borderColor: theme.line, background: "rgba(255,255,255,0.58)" }}
        >
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
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center backdrop-blur-md transition-transform hover:scale-[1.05]"
            style={{
              background: "rgba(255,255,255,0.34)",
              borderColor: "rgba(255,255,255,0.62)",
              color: theme.accentStrong,
            }}
            aria-label="Imagen anterior"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center backdrop-blur-md transition-transform hover:scale-[1.05]"
            style={{
              background: "rgba(255,255,255,0.34)",
              borderColor: "rgba(255,255,255,0.62)",
              color: theme.accentStrong,
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
                    : "rgba(110,84,136,0.18)",
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



function DressCodeModal({ open, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[140] flex items-end sm:items-center justify-center px-0 sm:px-4 py-0 sm:py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          aria-label="Cerrar modal"
          className="absolute inset-0"
          onClick={onClose}
          style={{ background: "rgba(69, 46, 92, 0.30)", backdropFilter: "blur(8px)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.99 }}
          transition={{ duration: 0.22 }}
          className="relative z-10 w-full max-w-2xl max-h-[86vh] overflow-y-auto rounded-t-[28px] sm:rounded-[30px] border overflow-hidden"
          style={{
            borderColor: theme.line,
            background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(247,240,252,0.98) 100%)",
            boxShadow: theme.softShadow,
          }}
        >
          <div className="px-4 py-4 sm:px-7 sm:py-6 border-b" style={{ borderColor: theme.line }}>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border text-lg"
              style={{ borderColor: theme.line, color: theme.accentStrong, background: "rgba(255,255,255,0.88)" }}
            >
              ×
            </button>

            <div className="pr-10">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.30em]" style={{ color: theme.textSoft }}>
                Dress code
              </p>
              <h3 className="mt-3 font-serif text-[28px] sm:text-[38px] leading-[1.04]" style={{ color: theme.accentStrong }}>
                Formal y delicado
              </h3>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-7" style={{ color: theme.textSoft }}>
                Queremos una estética elegante, fresca y natural, pensada para una celebración de día.
              </p>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-7 sm:py-6">
            <div className="grid gap-3">
              <div
                className="rounded-[20px] border px-4 py-4"
                style={{ borderColor: theme.line, background: "rgba(255,255,255,0.84)" }}
              >
                <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: theme.accentStrong }}>
                  Sugerido
                </p>
                <p className="mt-2 text-[14px] sm:text-[15px] leading-7" style={{ color: theme.text }}>
                  Tonos nude, pasteles, beige, lavanda o colores suaves.
                </p>
              </div>

              <div
                className="rounded-[20px] border px-4 py-4"
                style={{ borderColor: theme.line, background: "rgba(255,255,255,0.84)" }}
              >
                <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: theme.accentStrong }}>
                  Prioridad
                </p>
                <p className="mt-2 text-[14px] sm:text-[15px] leading-7" style={{ color: theme.text }}>
                  Verse elegante pero sentirse cómodo durante toda la ceremonia.
                </p>
              </div>

              <div
                className="rounded-[20px] border px-4 py-4"
                style={{ borderColor: theme.line, background: "rgba(255,255,255,0.84)" }}
              >
                <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: theme.accentStrong }}>
                  Mejor evitar
                </p>
                <p className="mt-2 text-[14px] sm:text-[15px] leading-7" style={{ color: theme.text }}>
                  Ropa deportiva, looks demasiado informales o calzado incómodo para exterior.
                </p>
              </div>
            </div>

            <div
              className="mt-4 rounded-[18px] border px-4 py-4"
              style={{ borderColor: theme.line, background: "rgba(255,255,255,0.60)" }}
            >
              <p className="text-[13px] sm:text-[14px] leading-7" style={{ color: theme.textSoft }}>
                La idea es mantener una estética armónica con el entorno y la celebración.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [countdown, setCountdown] = useState(getCountdown(EVENT_DATE));
  const [musicOn, setMusicOn] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showLodging, setShowLodging] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [showRsvpForm, setShowRsvpForm] = useState(false);
  const [showDressCodeModal, setShowDressCodeModal] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    cancion: "",
    restricciones: "",
    mensaje: "",
  });

  const audioRef = useRef(null);
  const heroRef = useRef(null);
  const rsvpRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown(EVENT_DATE)), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/gif";
    link.href = "/favicon.gif";
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.18;

    const tryPlay = async () => {
      try {
        await audio.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }
    };

    tryPlay();
  }, []);

  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [hasEntered]);

  useEffect(() => {
    const heroEl = heroRef.current;
    const rsvpEl = rsvpRef.current;
    if (!heroEl || !rsvpEl) return;

    let heroVisible = true;
    let rsvpVisible = false;

    const update = () => setShowMobileCta(!heroVisible && !rsvpVisible);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 }
    );

    const rsvpObserver = new IntersectionObserver(
      ([entry]) => {
        rsvpVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 }
    );

    heroObserver.observe(heroEl);
    rsvpObserver.observe(rsvpEl);

    return () => {
      heroObserver.disconnect();
      rsvpObserver.disconnect();
    };
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0.18;
      if (audio.paused) {
        await audio.play();
        setMusicOn(true);
      } else {
        audio.pause();
        setMusicOn(false);
      }
    } catch {
      setMusicOn(false);
    }
  }

  const whatsappMessage = useMemo(() => {
    return encodeURIComponent(
      `Hola! Confirmo mi asistencia a la ceremonia boda.\n\nNombre: ${form.nombre || "-"}\nCanción sugerida: ${form.cancion || "-"}\nRestricciones alimentarias: ${form.restricciones || "Ninguna"}\nMensaje: ${form.mensaje || "-"}`
    );
  }, [form]);

  function handleSubmit() {
    window.open(`https://wa.me/${RSVP_PHONE_BRIDE}?text=${whatsappMessage}`, "_blank");
  }

  return (
    <div
      id="top" className="min-h-screen overflow-x-hidden"
      style={{
        color: theme.text,
        background: `radial-gradient(circle at 0% 0%, rgba(233,222,245,0.86) 0%, rgba(233,222,245,0) 34%), radial-gradient(circle at 100% 16%, rgba(248,239,249,0.86) 0%, rgba(248,239,249,0) 28%), linear-gradient(180deg, ${theme.pageBg} 0%, ${theme.pageBg2} 50%, ${theme.pageBg3} 100%)`,
      }}
    >
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" playsInline />

      <style>{`
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Montserrat', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          letter-spacing: 0.01em;
        }
        .font-serif {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
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
          background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(221,197,241,0.96));
          animation: petalFall linear infinite;
          filter: blur(0.5px);
          opacity: 0.85;
          pointer-events: none;
        }
      `}</style>

      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 8, opacity: 0.78 }}
      >
        {[
          ...Array.from({ length: 10 }).map((_, i) => ({
            id: `primera-${i}`,
            left: `${(i * 17) % 100}%`,
            duration: `${10 + (i % 8) * 2}s`,
            delay: `${(i % 9) * 0.5}s`,
            drift: `${-40 + (i % 7) * 14}px`,
            scale: `${0.65 + (i % 5) * 0.16}`,
          })),
          ...Array.from({ length: 5 }).map((_, i) => ({
            id: `segunda-${i}`,
            left: `${(i * 19 + 7) % 100}%`,
            duration: `${12 + (i % 7) * 2}s`,
            delay: `${12 + (i % 8) * 0.8}s`,
            drift: `${-34 + (i % 6) * 12}px`,
            scale: `${0.62 + (i % 4) * 0.15}`,
          })),
          ...Array.from({ length: 3 }).map((_, i) => ({
            id: `tercera-${i}`,
            left: `${(i * 23 + 11) % 100}%`,
            duration: `${14 + (i % 6) * 2}s`,
            delay: `${24 + (i % 7) * 1}s`,
            drift: `${-28 + (i % 5) * 11}px`,
            scale: `${0.58 + (i % 4) * 0.14}`,
          })),
        ].map((petal) => (
          <span
            key={petal.id}
            className="petal"
            style={{
              left: petal.left,
              animationDuration: petal.duration,
              animationDelay: petal.delay,
              ['--drift']: petal.drift,
              transform: `scale(${petal.scale})`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {!hasEntered ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[120] flex items-center justify-center px-6 text-center"
            style={{ background: "radial-gradient(circle at top, rgba(231,219,243,0.9), rgba(231,219,243,0) 40%), linear-gradient(180deg, #fdf9ff 0%, #f4edf8 100%)" }}
          >
            <div>
              <h1 className="font-serif text-[42px] sm:text-[74px] md:text-[92px] tracking-[0.04em]" style={{ color: theme.accentMuted }}>
                Rodo & Vicky
              </h1>
              <p className="mt-5 text-[14px] sm:text-[22px] uppercase tracking-[0.12em]" style={{ color: theme.accentMuted }}>
                El camino es más divertido si lo recorremos juntos
              </p>
              <button
                type="button"
                onClick={() => setHasEntered(true)}
                className="mt-10 rounded-full px-10 py-4 text-white text-[16px] sm:text-[18px] font-semibold uppercase tracking-[0.18em]"
                style={{ background: theme.accentStrong, boxShadow: "0 18px 46px rgba(95,63,120,0.22)" }}
              >
                Ingresar
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className="fixed top-0 inset-x-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5">
        <div
          className="max-w-7xl mx-auto rounded-full px-3 py-2.5 sm:px-5 sm:py-3 border backdrop-blur-xl flex items-center justify-between gap-3 shadow-[0_14px_34px_rgba(31,20,46,0.10)]"
          style={{
            background: "rgba(255,255,255,0.58)",
            borderColor: theme.line,
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Heart size={15} color={theme.accentStrong} />
            <span className="font-serif text-[18px] sm:text-[28px] tracking-[0.08em] truncate" style={{ color: theme.accentStrong }}>Rodo & Vicky</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:scale-[1.02] transition-transform"
              style={{
                background: "rgba(255,255,255,0.82)",
                borderColor: theme.line,
              }}
              aria-label={musicOn ? "Silenciar música" : "Activar música"}
              title={musicOn ? "Silenciar música" : "Activar música"}
            >
              {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </div>
      </header>

      <section
        ref={heroRef}
        className="relative min-h-screen px-4 sm:px-6 pt-20 sm:pt-28 pb-3 sm:pb-6 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/images/wedding/aero.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, rgba(44,29,59,0.14) 0%, ${theme.heroOverlay} 72%, rgba(253,249,255,0.26) 100%)` }}
        />

        <FloatingPetals />

        <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(100svh-6rem)] flex flex-col justify-between">
          <Reveal>
            <div className="max-w-3xl pt-3 sm:pt-6">
              <h1 className="mt-6 font-serif text-[58px] leading-[0.88] tracking-[0.02em] sm:text-[88px] md:text-[128px] text-white font-[600]">
                Rodo & Vicky
              </h1>

              <p className="uppercase tracking-[0.35em] text-[11px] sm:text-xs text-white/78 mt-3">
                14 de enero · Mendoza
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="w-full mt-auto pb-4 sm:pb-6">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-[560px] justify-items-stretch">
                <CountBox label="Días" value={pad(countdown.days)} />
                <CountBox label="Horas" value={pad(countdown.hours)} />
                <CountBox label="Minutos" value={pad(countdown.minutes)} />
                <CountBox label="Segundos" value={pad(countdown.seconds)} />
              </div>

              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#rsvp"
                  className="inline-flex items-center justify-center rounded-full px-6 py-4 text-[15px] sm:text-base font-semibold text-white hover:scale-[1.02] transition-transform shadow-[0_18px_44px_rgba(32,20,47,0.22)]"
                  style={{ background: theme.accentStrong }}
                >
                  Confirmar asistencia
                </a>

                <a
                  href={CEREMONY_MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 text-white px-6 py-4 text-[15px] sm:text-base font-medium bg-white/10 backdrop-blur-sm hover:bg-white/16 transition-colors"
                >
                  Ver ubicación
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="w-full px-6 py-12 sm:py-16" style={{ background: theme.bandBg }}>
        <Reveal>
          <div className="max-w-4xl mx-auto text-center" style={{ color: theme.text }}>
            <div className="mx-auto h-px w-full max-w-[610px]" style={{ background: theme.bandLine }} />
            <p className="mx-auto max-w-[760px] px-3 py-8 font-serif text-[29px] sm:text-[40px] leading-[1.22]">
              Hoy comienza un nuevo capítulo en nuestra historia. Los invitamos a acompañarnos y ser parte de este momento tan especial.
            </p>
            <div className="mx-auto h-px w-full max-w-[610px]" style={{ background: theme.bandLine }} />
          </div>
        </Reveal>
      </section>

      <section className="px-4 sm:px-6 pt-16 sm:pt-20 pb-8">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <SimpleSectionTitle
              icon={
                <GifIcon
                  alt="Cuándo"
                  sources={["/images/wedding/calendario.gif"]}
                  fallback={<CalendarHeart size={54} color={theme.accentMuted} />}
                />
              }
              title="¿Cuándo?"
              subtitle="14 de enero 2027"
            />
          </div>
        </Reveal>
      </section>

      <section className="px-4 sm:px-6 pt-6 pb-12 sm:pb-16">
        <Reveal>
          <ItineraryPanel />
        </Reveal>
      </section>

      <section className="w-full px-6 py-16 sm:py-20" style={{ background: theme.bandBg }}>
        <Reveal>
          <div className="max-w-4xl mx-auto text-center" style={{ color: theme.text }}>
            <div className="mx-auto h-px w-full max-w-[610px]" style={{ background: theme.bandLine }} />
            <p className="mx-auto max-w-[760px] px-3 py-8 font-serif text-[29px] sm:text-[40px] leading-[1.22]">
              Hay momentos que solo el amor puede volver inolvidables.
            </p>
            <div className="mx-auto h-px w-full max-w-[610px]" style={{ background: theme.bandLine }} />
          </div>
        </Reveal>
      </section>


      <section className="px-4 sm:px-6 pt-4 pb-16 sm:pb-20">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <SimpleSectionTitle
              icon={
                <GifIcon
                  alt="Dress code"
                  sources={["/images/wedding/camara.gif"]}
                  fallback={<Shirt size={52} color={theme.accentMuted} />}
                />
              }
              title="Dress code"
              subtitle="Formal"
            />

            <div className="mt-8 flex justify-center px-4">
              <button
                type="button"
                onClick={() => setShowDressCodeModal(true)}
                className="w-full sm:w-auto max-w-[320px] inline-flex items-center justify-center rounded-full border px-6 py-4 text-[13px] sm:text-[14px] uppercase tracking-[0.14em] transition-all hover:-translate-y-[1px]"
                style={{
                  borderColor: theme.accentMuted,
                  color: theme.accentStrong,
                  background: "rgba(255,255,255,0.72)",
                  boxShadow: "0 14px 34px rgba(95,63,120,0.08)",
                }}
              >
                Ver detalles del dress code
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="w-full px-6 py-16 sm:py-20" style={{ background: theme.bandBg }}>
        <Reveal>
          <div className="max-w-4xl mx-auto text-center" style={{ color: theme.text }}>
            <GifIcon
              alt="Valor tarjeta"
              sources={["/images/wedding/regalo.gif"]}
              fallback={<Gift size={54} color={theme.accentStrong} />}
            />
            <h2 className="mt-5 font-serif text-[40px] sm:text-[52px] leading-none">Valor tarjeta</h2>
            <p className="mt-6 mx-auto max-w-[760px] text-[17px] sm:text-[20px] leading-[1.8]">
              Nos haría muy felices compartir este día con ustedes. A continuación les dejamos los datos para quienes quieran confirmar su tarjeta y colaborar con esta celebración.
            </p>
            <div className="mt-8">
              <OutlineButton as="button" onClick={() => setShowPayment((v) => !v)}>
                {showPayment ? "Ocultar valor tarjeta" : "Ver valor tarjeta"}
              </OutlineButton>
            </div>

            <AnimatePresence initial={false}>
              {showPayment ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-10 mx-auto max-w-[520px] rounded-[20px] border px-5 py-6 sm:px-7 sm:py-7 text-left" style={{ background: "rgba(255,255,255,0.86)", borderColor: theme.line, color: theme.accentStrong, boxShadow: "0 18px 45px rgba(111,77,139,0.08)" }}>
                    {paymentData.map((item, idx) => (
                      <div key={item.label} className={idx > 0 ? "mt-5 pt-5 border-t" : ""} style={idx > 0 ? { borderColor: theme.line } : undefined}>
                        <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: theme.textSoft }}>
                          {item.label}
                        </p>
                        <p className="mt-2 text-[16px] sm:text-[18px] break-all" style={{ color: theme.accentStrong }}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>

      <section className="px-4 sm:px-6 pt-16 sm:pt-20 pb-14 sm:pb-16">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <SimpleSectionTitle
              icon={
                <GifIcon
                  alt="Hospedajes"
                  sources={["/images/wedding/casas.gif"]}
                  fallback={<BedDouble size={52} color={theme.accentMuted} />}
                />
              }
              title="Hospedajes"
              subtitle="Si necesitás hospedaje, te compartimos algunas opciones cercanas al lugar."
            />

            <div className="mt-8">
              <OutlineButton as="button" onClick={() => setShowLodging((v) => !v)}>
                {showLodging ? "Ocultar hospedajes" : "Ver hospedajes"}
              </OutlineButton>
            </div>

            <AnimatePresence initial={false}>
              {showLodging ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-8 mx-auto max-w-[920px]">
                    <div className="grid gap-4 text-left md:grid-cols-2">
                      {lodgingOptions.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-[26px] border px-5 py-5 sm:px-6 sm:py-6"
                          style={{
                            borderColor: theme.line,
                            background: "linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(247,240,252,0.96) 100%)",
                            boxShadow: "0 18px 44px rgba(111,77,139,0.07)",
                          }}
                        >
                          <div className="flex h-full flex-col">
                            <p
                              className="font-serif text-[25px] sm:text-[28px] leading-[1.02]"
                              style={{ color: theme.accentStrong }}
                            >
                              {item.title}
                            </p>

                            <div
                              className="mt-4 h-px w-full"
                              style={{ background: theme.line }}
                            />

                            <div className="mt-5 grid gap-3">
                              <div
                                className="rounded-[18px] border px-4 py-3.5"
                                style={{ borderColor: theme.line, background: "rgba(255,255,255,0.58)" }}
                              >
                                <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: theme.textSoft }}>
                                  Teléfono
                                </p>
                                <p className="mt-1 text-[14px] sm:text-[15px] leading-6 break-words" style={{ color: theme.text }}>
                                  {item.phone}
                                </p>
                              </div>

                              <div
                                className="rounded-[18px] border px-4 py-3.5"
                                style={{ borderColor: theme.line, background: "rgba(255,255,255,0.58)" }}
                              >
                                <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: theme.textSoft }}>
                                  Dirección
                                </p>
                                <p className="mt-1 text-[14px] sm:text-[15px] leading-6" style={{ color: theme.text }}>
                                  {item.address}
                                </p>
                              </div>

                              <div
                                className="rounded-[18px] border px-4 py-3.5"
                                style={{ borderColor: theme.line, background: "rgba(255,255,255,0.58)" }}
                              >
                                <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: theme.textSoft }}>
                                  Distancia aproximada
                                </p>
                                <p className="mt-1 text-[14px] sm:text-[15px] leading-6" style={{ color: theme.text }}>
                                  {item.distance}
                                </p>
                              </div>
                            </div>

                            <div className="mt-5 pt-1">
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex w-full items-center justify-center rounded-full border px-6 py-3.5 text-[12px] sm:text-[13px] uppercase tracking-[0.16em] transition-all hover:-translate-y-[1px]"
                                style={{
                                  borderColor: theme.accentMuted,
                                  color: theme.accentStrong,
                                  background: "rgba(255,255,255,0.84)",
                                  boxShadow: "0 14px 34px rgba(95,63,120,0.08)",
                                }}
                              >
                                {item.cta}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>

      <section id="rsvp" ref={rsvpRef} className="pt-8 pb-8 sm:pb-10">
        <Reveal>
          <div className="w-full px-6 py-16 sm:py-20" style={{ background: theme.bandBg }}>
            <div className="max-w-4xl mx-auto text-center" style={{ color: theme.text }}>
              <GifIcon
                alt="Confirmá tu asistencia"
                sources={["/images/wedding/dosCorazones.gif"]}
                fallback={<Send size={52} color={theme.accentStrong} />}
              />
              <h2 className="mt-5 font-serif text-[40px] sm:text-[52px] leading-none">
                Confirmá tu asistencia
              </h2>
              <p className="mt-4 text-[14px] sm:text-[15px] uppercase tracking-[0.32em] leading-[1.45]">
                Antes del 10 de agosto
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setShowRsvpForm((v) => !v)}
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] sm:text-base font-medium uppercase tracking-[0.06em] transition-transform hover:scale-[1.02]"
                  style={{ color: "#ffffff", background: theme.accentStrong, boxShadow: "0 18px 46px rgba(95,63,120,0.22)" }}
                >
                  {showRsvpForm ? "Ocultar formulario" : "Voy a asistir"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <AnimatePresence initial={false}>
          {showRsvpForm ? (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-6 pt-6">
                <div
                  className="max-w-3xl mx-auto rounded-[28px] border px-5 py-6 sm:px-8 sm:py-8"
                  style={{ borderColor: theme.line, background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(248,242,252,0.94) 100%)", boxShadow: theme.softShadow }}
                >
                  <div className="grid gap-4">
                    <label className="block text-left">
                      <span className="block text-sm mb-2" style={{ color: theme.textSoft }}>
                        Nombre y apellido
                      </span>
                      <input
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        className="w-full rounded-[18px] px-4 py-3.5 outline-none"
                        style={{ background: "rgba(255,255,255,0.86)", border: `1px solid ${theme.line}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)" }}
                        placeholder="Tu nombre"
                      />
                    </label>

                    <label className="block text-left">
                      <span className="block text-sm mb-2" style={{ color: theme.textSoft }}>
                        Canción sugerida
                      </span>
                      <input
                        value={form.cancion}
                        onChange={(e) => setForm({ ...form, cancion: e.target.value })}
                        className="w-full rounded-[18px] px-4 py-3.5 outline-none"
                        style={{ background: "rgba(255,255,255,0.86)", border: `1px solid ${theme.line}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)" }}
                        placeholder="Tema para bailar"
                      />
                    </label>

                    <label className="block text-left">
                      <span className="block text-sm mb-2" style={{ color: theme.textSoft }}>
                        Restricciones alimentarias
                      </span>
                      <textarea
                        rows={3}
                        value={form.restricciones}
                        onChange={(e) => setForm({ ...form, restricciones: e.target.value })}
                        className="w-full rounded-[18px] px-4 py-3.5 outline-none resize-none"
                        style={{ background: "rgba(255,255,255,0.86)", border: `1px solid ${theme.line}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)" }}
                        placeholder="Alergias, intolerancias, vegetariano, etc."
                      />
                    </label>

                    <label className="block text-left">
                      <span className="block text-sm mb-2" style={{ color: theme.textSoft }}>
                        Mensaje para los novios
                      </span>
                      <textarea
                        rows={4}
                        value={form.mensaje}
                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                        className="w-full rounded-[18px] px-4 py-3.5 outline-none resize-none"
                        style={{ background: "rgba(255,255,255,0.86)", border: `1px solid ${theme.line}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)" }}
                        placeholder="Escribí algo lindo acá"
                      />
                    </label>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-white text-[15px] sm:text-base font-semibold"
                      style={{ background: theme.accentStrong, boxShadow: "0 18px 46px rgba(95,63,120,0.22)" }}
                    >
                      <Send size={16} /> Confirmar asistencia
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>

      <section className="px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-10">
        <Reveal>
          <div
            className="max-w-6xl mx-auto rounded-[34px] border px-5 py-7 sm:px-8 sm:py-10"
            style={{
              borderColor: theme.line,
              background: theme.bandBgSoft,
              boxShadow: theme.softShadow,
            }}
          >
            <EditorialCarousel
              images={secondCarouselImages}
              eyebrow="Momentos"
              title="La historia que nos trajo hasta acá"
              text="Cada imagen representa un momento compartido, una etapa vivida y un pedacito del camino que hoy nos encuentra celebrando este amor con ustedes."
              theme={theme}
              imageAlt="Recuerdos y momentos especiales"
            />
          </div>
        </Reveal>
      </section>

      <footer className="px-4 sm:px-6 pb-20 sm:pb-24">
        <Reveal>
          <div
            className="max-w-5xl mx-auto rounded-[34px] border px-6 py-10 sm:px-10 sm:py-12 text-center relative overflow-hidden"
            style={{
              borderColor: theme.line,
              background: "linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(248,242,253,0.97) 100%)",
              boxShadow: theme.softShadow,
            }}
          >
            <div
              className="absolute -top-12 left-1/2 -translate-x-1/2 h-36 w-36 rounded-full blur-3xl"
              style={{ background: "rgba(233,222,245,0.75)" }}
            />
            <div
              className="absolute -bottom-16 right-0 h-40 w-40 rounded-full blur-3xl"
              style={{ background: "rgba(248,239,249,0.72)" }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-10" style={{ background: theme.bandLine }} />
                <span className="text-[11px] uppercase tracking-[0.34em]" style={{ color: theme.textSoft }}>
                  Nuestro gran día
                </span>
                <span className="h-px w-10" style={{ background: theme.bandLine }} />
              </div>

              <h2 className="mt-5 font-serif text-[42px] sm:text-[60px] leading-none" style={{ color: theme.accentStrong }}>
                Rodo & Vicky
              </h2>

              <p className="mt-4 text-[13px] sm:text-[14px] uppercase tracking-[0.28em]" style={{ color: theme.textSoft }}>
                14 de enero 2027 · Mendoza
              </p>

              <p className="mt-6 max-w-2xl mx-auto text-[15px] sm:text-[16px] leading-7" style={{ color: theme.textSoft }}>
                Gracias por acompañarnos en esta historia. Nos emociona compartir este momento con ustedes y que formen parte de este recuerdo para siempre.
              </p>

              <div className="mt-10 pt-6 border-t" style={{ borderColor: theme.line }}>
                <p className="text-[12px] uppercase tracking-[0.24em]" style={{ color: theme.textSoft }}>
                  Rodo & Vicky
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </footer>

      <AnimatePresence>
        {showDressCodeModal ? (
          <DressCodeModal open={showDressCodeModal} onClose={() => setShowDressCodeModal(false)} />
        ) : null}
      </AnimatePresence>

      {showMobileCta ? (
        <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden p-3">
          <a
            href="#rsvp"
            className="w-full rounded-full px-6 py-4 text-center text-white font-semibold flex items-center justify-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.22)]"
            style={{ background: theme.accentStrong, boxShadow: "0 18px 46px rgba(95,63,120,0.22)" }}
          >
            <Sparkles size={16} /> Confirmar asistencia
          </a>
        </div>
      ) : null}
    </div>
  );
}
