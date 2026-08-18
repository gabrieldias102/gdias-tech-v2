function CTA() {
  return (
    <section
      id="contato"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 text-center sm:py-28"
    >
      <p className="font-mono text-sm text-primary">// TRANSMITIR_SINAL</p>

      <h2 className="mt-4 font-mono text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
        Vamos Iniciar?
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg">
        Tem um projeto em mente? Mande uma mensagem e vamos transformar essa
        ideia em algo real.
      </p>

      <a
        href="mailto:contatogbd@gmail.com"
        className="mt-10 inline-block rounded-full bg-primary px-8 py-4 font-mono text-sm font-bold uppercase tracking-wide text-background transition-opacity hover:opacity-90"
      >
        Enviar Transmissão
      </a>
    </section>
  );
}

export default CTA;
