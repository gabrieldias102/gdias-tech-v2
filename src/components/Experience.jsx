import { useEffect, useLayoutEffect, useRef, useState } from "react";

const EXPERIENCES = [
  {
    period: "Mar 2026 — Atual",
    role: "Desenvolvedor Full Stack",
    company: "Facta",
    description:
      "Plataformas digitais multi-tenant para o setor financeiro, com React, TypeScript e Tailwind CSS. Foco em componentização e soluções escaláveis para múltiplos clientes.",
  },
  {
    period: "Fev 2025 — Mar 2026",
    role: "Desenvolvedor Front-End",
    company: "OTI Software",
    description:
      "Aplicações com Vue.js e Nuxt.js, migração de projetos legados (JSF/Vue 2) para Vue 3 e integração de APIs REST com PostgreSQL.",
  },
  {
    period: "Abr 2024 — Jan 2025",
    role: "Desenvolvedor Full Stack",
    company: "Cathalyst",
    description:
      "SPAs com React e Node.js, APIs RESTful e modelagem de dados com PostgreSQL, SQLite e Prisma ORM.",
  },
  {
    period: "Jul 2020 — Fev 2024",
    role: "Desenvolvedor",
    company: "Kinghost",
    description:
      "Trajetória do suporte técnico (N1) ao desenvolvimento web: manutenção de sistemas legados, arquitetura, Docker e documentação técnica.",
  },
  {
    period: "Jan 2021 — Dez 2026",
    role: "Análise e Desenvolvimento de Sistemas",
    company: "UNISINOS",
    description:
      "Tecnicas de programação, estruturas de dados, algoritmos, engenharia de software, banco de dados e desenvolvimento web.",
  },
];

const PHOTOS = [
  "/experiences/image-1.jpg",
  "/experiences/image-2.jpg",
  "/experiences/image-3.jpg",
  "/experiences/image-4.jpg",
  "/experiences/image-5.jpg",
  "/experiences/image-6.jpg",
];

const ITEMS = [];
for (let i = 0; i < Math.max(PHOTOS.length, EXPERIENCES.length); i++) {
  if (PHOTOS[i]) {
    ITEMS.push({ type: "photo", key: `photo-${i}`, src: PHOTOS[i], index: i });
  }
  if (EXPERIENCES[i]) {
    ITEMS.push({ type: "experience", key: `exp-${i}`, ...EXPERIENCES[i] });
  }
}

const SET_SIZE = ITEMS.length;
const DISPLAY_ITEMS = [0, 1, 2].flatMap((set) =>
  ITEMS.map((item) => ({ ...item, key: `${item.key}-set${set}` })),
);

const AUTOPLAY_MS = 4500;

function PhotoCard({ src, index }) {
  return (
    <div
      data-card
      className="aspect-3/4 w-64 flex-none snap-center overflow-hidden rounded-lg border border-border bg-card sm:w-72"
    >
      <img
        src={src}
        alt={`Foto ${index + 1} de Gabriel Dias`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

function ExperienceCard({ period, role, company, description }) {
  return (
    <div
      data-card
      className="flex aspect-3/4 w-64 flex-none snap-center flex-col rounded-lg border border-border bg-card p-6 sm:w-72"
    >
      <p className="font-mono text-xs font-bold text-primary">{period}</p>
      <h3 className="mt-3 font-mono text-lg font-bold uppercase text-white">
        {role}
      </h3>
      <p className="mt-1 font-mono text-sm text-white/50">{company}</p>
      <p className="mt-4 text-sm text-white/70">{description}</p>
    </div>
  );
}

function Experience() {
  const scrollerRef = useRef(null);
  const boundsRef = useRef({ start: 0, width: 0 });
  const restartAutoplayRef = useRef(() => {});
  const [activeIndex, setActiveIndex] = useState(0);

  const measureBounds = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const middleStart = el.children[SET_SIZE];
    const middleEnd = el.children[SET_SIZE * 2];
    if (!middleStart || !middleEnd) return;
    boundsRef.current = {
      start: middleStart.offsetLeft,
      width: middleEnd.offsetLeft - middleStart.offsetLeft,
    };
  };

  // Deduz qual item (dentro de um único set) está mais visível agora,
  // pra acender a bolinha certa.
  const updateActiveIndex = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 24 : 300;
    const { start } = boundsRef.current;
    if (!step) return;
    const rel = Math.round((el.scrollLeft - start) / step);
    setActiveIndex(((rel % SET_SIZE) + SET_SIZE) % SET_SIZE);
  };

  useLayoutEffect(() => {
    measureBounds();
    const el = scrollerRef.current;
    if (el) el.scrollLeft = boundsRef.current.start;
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const handleResize = () => measureBounds();
    window.addEventListener("resize", handleResize);

    let debounceTimeout;
    let rafId;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveIndex);

      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const { start, width } = boundsRef.current;
        if (!width) return;
        if (el.scrollLeft < start) {
          el.scrollLeft += width;
        } else if (el.scrollLeft >= start + width) {
          el.scrollLeft -= width;
        }
        updateActiveIndex();
      }, 120);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveIndex();

    return () => {
      window.removeEventListener("resize", handleResize);
      el.removeEventListener("scroll", handleScroll);
      clearTimeout(debounceTimeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 24 : 300;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
    restartAutoplayRef.current();
  };

  const scrollToIndex = (index) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 24 : 300;
    el.scrollTo({
      left: boundsRef.current.start + index * step,
      behavior: "smooth",
    });
    restartAutoplayRef.current();
  };

  // Rolagem automática: avança sozinho a cada AUTOPLAY_MS, pausa ao passar
  // o mouse/dedo por cima, e é desligada pra quem prefere menos animação.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intervalId;
    let paused = false;

    const start = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (!paused) scrollByCard(1);
      }, AUTOPLAY_MS);
    };
    restartAutoplayRef.current = start;
    start();

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    return () => {
      clearInterval(intervalId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="experiencia"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-primary">// TRAJETORIA</p>
          <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Experiência
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-white transition-colors hover:border-primary hover:text-primary"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Próximo"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-white transition-colors hover:border-primary hover:text-primary"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {DISPLAY_ITEMS.map((item) =>
          item.type === "photo" ? (
            <PhotoCard key={item.key} src={item.src} index={item.index} />
          ) : (
            <ExperienceCard
              key={item.key}
              period={item.period}
              role={item.role}
              company={item.company}
              description={item.description}
            />
          ),
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center">
        {ITEMS.map((item, index) => (
          <button
            key={item.key}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`Ir para item ${index + 1} de ${SET_SIZE}`}
            aria-current={activeIndex === index}
            className="flex h-6 w-6 items-center justify-center sm:h-8 sm:w-8"
          >
            <span
              className={`block h-1.5 rounded-full transition-all sm:h-2 ${
                activeIndex === index
                  ? "w-4 bg-primary sm:w-6"
                  : "w-1.5 bg-border hover:bg-white/40 sm:w-2"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export default Experience;
