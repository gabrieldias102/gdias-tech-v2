import { useState } from "react";

const LINKS = [
  { label: "STACK", href: "#stack" },
  { label: "EXPERIÊNCIA", href: "#experiencia" },
  { label: "PROJETOS", href: "#projetos" },
  { label: "CONTATO", href: "#contato" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <div>
          <a
            href="#top"
            className="font-mono text-lg font-bold tracking-tight text-white"
          >
            GABRIEL_DIAS
          </a>
          <a
            href="#top"
            className="font-mono text-sm font-semibold tracking-tight text-primary"
          >
            _v2
          </a>
        </div>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-sm font-medium text-white/80 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white md:hidden"
          aria-label="Abrir menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {isOpen && (
        <ul className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-2 py-3 font-mono text-sm font-medium text-white/80 hover:bg-white/5 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contato"
              onClick={() => setIsOpen(false)}
              className="block rounded-full bg-primary px-5 py-2 text-center font-mono text-sm font-bold text-background"
            >
              Fale comigo
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Navbar;
