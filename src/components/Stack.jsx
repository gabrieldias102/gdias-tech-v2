import { useEffect, useState } from "react";

const STACK_URL = "/stack.json";

function StackItem({ group, isOpen, onToggle }) {
  return (
    <div className="border-t border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-wide text-white">
          <span
            className={`inline-block text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
          >
            +
          </span>
          {group.title}
        </span>
        <span className="font-mono text-xs text-white/40">
          {String(group.items.length).padStart(2, "0")}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div
            className={`flex flex-wrap gap-2 pb-6 pl-6 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded border border-border bg-card px-3 py-1 font-mono text-xs text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stack() {
  const [stack, setStack] = useState([]);
  const [openTitles, setOpenTitles] = useState(() => new Set());

  useEffect(() => {
    const controller = new AbortController();

    fetch(STACK_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setStack(data);
        setOpenTitles(new Set(data.slice(0, 1).map((group) => group.title)));
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Falha ao carregar stack:", error);
        }
      });

    return () => controller.abort();
  }, []);

  const stackColumns = [stack.slice(0, 5), stack.slice(5)];
  const allTitles = stack.map((group) => group.title);
  const allOpen =
    allTitles.length > 0 && allTitles.every((title) => openTitles.has(title));

  const toggle = (title) => {
    setOpenTitles((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setOpenTitles(allOpen ? new Set() : new Set(allTitles));
  };

  return (
    <section
      id="stack"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-primary">// STACK_TECNICA</p>
          <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Tecnologias &amp; Ferramentas
          </h2>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="font-mono text-xs font-bold uppercase tracking-wide text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          {allOpen ? "[ − Recolher tudo ]" : "[ + Expandir tudo ]"}
        </button>
      </div>

      <div className="mt-12 grid gap-x-10 md:grid-cols-2">
        {stackColumns.map((column, index) => (
          <div key={index}>
            {column.map((group) => (
              <StackItem
                key={group.title}
                group={group}
                isOpen={openTitles.has(group.title)}
                onToggle={() => toggle(group.title)}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stack;
