import ScrambleText from "./ScrambleText";

const SCRAMBLE_WORDS = [
  "Escalável.",
  "Resiliente.",
  "Confiável.",
  "Eficiente.",
  "Inteligente.",
  "Moderna.",
  "Segura.",
  "Rápida.",
  "Sustentável.",
  "Inovadora.",
];

function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:pt-20 sm:pb-24"
    >
      <span className="inline-block border border-primary px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-primary">
        Disponível para novos projetos
      </span>

      <h1 className="mt-6 font-mono text-[clamp(1.5rem,8.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-white sm:mt-8 sm:text-7xl lg:text-8xl">
        <span className="block">Construindo</span>
        <span className="block text-primary italic underline">
          Infraestrutura
        </span>
        <span className="block">Digital</span>
        <ScrambleText words={SCRAMBLE_WORDS} className="block" />
      </h1>

      <div className="mt-10 grid gap-8 pt-8 md:grid-cols-2 md:items-end">
        <p className="max-w-md text-base text-white/70 sm:text-lg">
          Desenvolvedor full stack especializado em arquiteturas React, Node.js,
          Vue, PHP e Python — transformo problemas complexos em lógica elegante.
        </p>

        <div className="font-mono text-sm md:justify-self-end md:text-right">
          <p className="text-white/50">// LOCALIZACAO_ATUAL</p>
          <p className="mt-1 font-bold text-white">
            PORTO ALEGRE, BR <span className="text-primary">[30.0330° S]</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
