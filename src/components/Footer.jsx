const SOCIALS = [
  {
    label: "GITHUB",
    path: "/gabrieldias102",
    href: "https://github.com/gabrieldias102",
  },
  {
    label: "LINKEDIN",
    path: "/in/gabrieldias102",
    href: "https://www.linkedin.com/in/gabrieldias102/",
  },
  {
    label: "INSTAGRAM",
    path: "/gabriel.dias102",
    href: "https://www.instagram.com/gabriel.dias102/",
  },
];

function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-base text-white/60 sm:text-lg">
          Ou também, conecte-se por aqui:
        </p>

        <div className="mt-6 grid grid-cols-1 items-end gap-6 border-t border-border pt-8 sm:grid-cols-4">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <p className="font-mono text-xs text-white/40">
                // {social.label}
              </p>
              <p className="mt-1 font-mono text-sm font-bold text-white transition-colors group-hover:text-primary">
                {social.path}
              </p>
            </a>
          ))}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-bold uppercase tracking-wide text-primary">
              Online
            </span>
          </div>
        </div>

        <p className="mt-10 font-mono text-xs text-white/30">
          © {new Date().getFullYear()} Gabriel Dias. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
