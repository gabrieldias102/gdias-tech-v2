import { useState } from "react";

const STACK = [
  {
    title: "Linguagens",
    items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "Bash"],
  },
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "Angular",
      "jQuery",
      "Tailwind",
      "Bootstrap",
      "MUI",
      "Shadcn",
      "Styled Components",
      "Sass",
      "Framer Motion",
      "Redux",
      "Zustand",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "NestJS", "Laravel", "FastAPI"],
  },
  {
    title: "Banco/ORM",
    items: [
      "PostgreSQL",
      "MySQL",
      "MariaDB",
      "SQL Server",
      "SQLite",
      "Supabase",
      "Prisma",
    ],
  },
  {
    title: "DevOps/Cloud",
    items: [
      "Docker",
      "Docker Compose",
      "Azure",
      "Vercel",
      "Cloudflare",
      "Firebase",
      "Ansible",
      "Jenkins",
      "GitHub Actions",
      "GitLab CI/CD",
      "Azure DevOps",
      "Nginx",
      "Apache",
      "Linux",
    ],
  },
  {
    title: "Testes/Qualidade",
    items: [
      "Jest",
      "Vitest",
      "Cypress",
      "PHPUnit",
      "React Testing Library",
      "Storybook",
      "SonarQube",
      "ESLint",
      "Prettier",
      "Grafana",
    ],
  },
  {
    title: "API/Integrações",
    items: [
      "REST",
      "GraphQL",
      "OAuth2",
      "JWT",
      "Swagger",
      "Postman",
      "Axios",
      "Fetch",
    ],
  },
  {
    title: "Ferramentas",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "VS Code",
      "Visual Studio",
      "IntelliJ",
      "PHPStorm",
      "WebStorm",
      "DBeaver",
      "SSMS",
      "npm",
      "Yarn",
      "pnpm",
      "Chocolatey",
      "Homebrew",
    ],
  },
  {
    title: "IA/Dados",
    items: [
      "OpenAI API",
      "Anthropic API",
      "Hugging Face",
      "TensorFlow",
      "PyTorch",
      "Pandas",
      "NumPy",
      "Power BI",
      "n8n",
    ],
  },
];

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

const STACK_COLUMNS = [STACK.slice(0, 5), STACK.slice(5)];

const ALL_TITLES = STACK.map((group) => group.title);

function Stack() {
  const [openTitles, setOpenTitles] = useState(() => new Set([STACK[0].title]));
  const allOpen = ALL_TITLES.every((title) => openTitles.has(title));

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
    setOpenTitles(allOpen ? new Set() : new Set(ALL_TITLES));
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
        {STACK_COLUMNS.map((column, index) => (
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
