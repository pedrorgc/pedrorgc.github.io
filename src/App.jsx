import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Briefcase,
  MapPin,
  ArrowUpRight,
  Sun,
  Moon,
  Copy,
  Check,
} from "lucide-react";

/**
 * Portfólio — Pedro Ricarth Gonçalves Cabral
 * Stack: React + Tailwind CSS + lucide-react
 *
 * Dependência necessária:
 *   npm install lucide-react
 *
 * Assume que o Tailwind CSS já está configurado no projeto
 * (padrão em templates Vite + Tailwind). Basta importar e
 * renderizar <App /> na raiz da aplicação.
 *
 * Tema claro/escuro: as cores são variáveis CSS (THEMES, abaixo), então
 * não é preciso configurar "darkMode" no Tailwind. O botão no menu
 * alterna o tema; o padrão segue a preferência do sistema.
 *
 * Todo o conteúdo fica nos objetos PROFILE, EXPERIENCE, EDUCATION,
 * PROJECTS e CERTIFICATES. Dados extraídos do LinkedIn e dos
 * repositórios públicos do GitHub.
 */

/* =========================================================
   DADOS — edite aqui
   ========================================================= */
const PROFILE = {
  name: "Pedro Ricarth Gonçalves Cabral",
  role: "Desenvolvedor de Software",
  location: "Joaíma, Minas Gerais · Brasil",
  github: "https://github.com/pedrorgc",
  linkedin: "https://www.linkedin.com/in/pedrorgc/",
  email: "pedroricarthgc@gmail.com",
  // Quando tiver o PDF, coloque-o na pasta "public" do projeto Vite e preencha
  // o caminho (ex.: "/curriculo-pedro-cabral.pdf"). Enquanto estiver vazio,
  // o botão "Baixar CV" não é exibido.
  cvUrl: "",
  summary:
    "Estudante do 5º período de Análise e Desenvolvimento de Sistemas, com foco em desenvolvimento full stack. Tenho projetos publicados no GitHub que vão de um sistema de gestão esportiva em Laravel a um placar eletrônico em JavaScript puro, um app em React Native e um pipeline de dados em Python. Trabalho com esporte municipal no dia a dia e gosto de construir software para esse contexto.",
};

const TECH_STACK = ["React", "PHP", "Laravel", "Node.js", "C", "MySQL"];

const EXPERIENCE = [
  {
    role: "Instrutor de esportes",
    org: "Prefeitura Municipal de Joaíma",
    period: "jan. 2025 — atual",
    place: "Joaíma, MG · Presencial",
    description:
      "Atuação diária com esporte municipal, o mesmo contexto dos meus projetos SportFlow e Placar Virtual.",
  },
  {
    role: "Assistente administrativo",
    org: "Prefeitura Municipal de Joaíma",
    period: "mai. 2024 — dez. 2024",
    place: "Joaíma, MG · Presencial",
    description:
      "Atuação no setor de Licitações, com processos e gestão de licitações.",
  },
];

const EDUCATION = [
  {
    course: "Análise e Desenvolvimento de Sistemas",
    institution:
      "Instituto Federal de Educação, Ciência e Tecnologia de Minas Gerais (IFMG)",
    period: "Cursando · 5º período",
  },
];

const PROJECTS = [
  {
    featured: true,
    title: "SportFlow — Sistema de Gestão Esportiva",
    badge: "Projeto de TCC",
    description:
      "Plataforma web para gestão esportiva municipal. Reúne o cadastro de atletas e times por modalidade, campeonatos com inscrições e lançamento de resultados, reserva de espaços esportivos e um painel com indicadores. Tem portal público e área administrativa com três perfis de acesso: administrador, gestor e monitor.",
    highlights: [
      "Arquitetura MVC em Laravel 12 (PHP 8.2), com Form Requests para validação e um controller por recurso",
      "Modelagem relacional em 10 tabelas, com relação N:N entre atletas e times, soft delete e migrations versionadas",
      "Controle de acesso por perfil usando enum e middlewares próprios, com troca obrigatória de senha no primeiro acesso",
      "Reservas com bloqueio de conflito de horário, coberto por testes automatizados com Pest",
    ],
    tech: ["Laravel 12", "PHP 8.2", "MySQL", "Blade", "Bootstrap 5", "Alpine.js", "Vite", "Pest"],
    repo: "https://github.com/pedrorgc/sport-flow",
    // demo: "https://seu-link-de-demo.com", // descomente quando publicar o projeto
  },
  {
    title: "Placar Virtual",
    description:
      "Placar eletrônico para telão em campeonatos municipais. A mesa de controle e o telão são duas janelas sincronizadas em tempo real com postMessage. Aceita upload de escudos e plano de fundo, com compressão e conversão para WebP via Canvas, e dispara uma animação de gol. Roda 100% no navegador, sem banco de dados.",
    note: "Próximo passo: controle remoto com React e WebSocket.",
    tech: ["JavaScript", "HTML5", "CSS3", "Canvas API"],
    repo: "https://github.com/pedrorgc/placar_virtual",
  },
  {
    title: "GestSport — App mobile",
    status: "Protótipo",
    description:
      "Protótipo de app para gestão de atividades esportivas. A interface é em React Native com Expo e navegação por drawer, com telas de início e cadastro de atividades. O back-end em Node.js e Express está em fase inicial, com JWT e PostgreSQL previstos.",
    tech: ["React Native", "Expo", "Node.js", "Express", "PostgreSQL"],
    repo: "https://github.com/pedrorgc/gest-sport",
  },
  {
    title: "Pipeline de dados do ENEM",
    description:
      "Pipeline em Python para processar dados do ENEM em camadas. Faz a ingestão para um data lake no Google Cloud Storage, converte CSV em Parquet, aplica as transformações da camada silver com pandas e carrega a camada gold no BigQuery.",
    tech: ["Python", "pandas", "Parquet", "Cloud Storage", "BigQuery"],
    repo: "https://github.com/pedrorgc/projeto-enem",
  },
];

/**
 * Certificados: a seção só aparece quando esta lista tem itens.
 * Modelo de item:
 *   { title: "Nome do curso", issuer: "Instituição", year: "2025", url: "https://..." }
 */
const CERTIFICATES = [];

/* =========================================================
   TEMA — todas as cores vêm destas variáveis
   ========================================================= */
const LIGHT = {
  "--bg": "#f8fafc",
  "--bg-glass": "rgba(248,250,252,0.92)",
  "--surface": "#ffffff",
  "--chip": "#f1f5f9",
  "--line": "#e2e8f0",
  "--line-strong": "#cbd5e1",
  "--ink": "#0f172a",
  "--text": "#475569",
  "--muted": "#64748b",
  "--accent": "#4f46e5",
  "--accent-soft": "#eef2ff",
  "--accent-line": "#a5b4fc",
  "--feature-line": "#c7d2fe",
  "--btn": "#0f172a",
  "--btn-ink": "#ffffff",
  "--btn-hover": "#4f46e5",
  "--btn-hover-ink": "#ffffff",
  "--blob-a": "rgba(224,231,255,0.7)",
  "--blob-b": "rgba(226,232,240,0.6)",
  "--grain": "0.035",
  "--term-bg": "#0f172a",
  "--term-line": "#1e293b",
};

const DARK = {
  "--bg": "#0e1116",
  "--bg-glass": "rgba(14,17,22,0.88)",
  "--surface": "#161b22",
  "--chip": "#1e2530",
  "--line": "#262d38",
  "--line-strong": "#3a4453",
  "--ink": "#f1f5f9",
  "--text": "#aab4c3",
  "--muted": "#8591a3",
  "--accent": "#818cf8",
  "--accent-soft": "rgba(129,140,248,0.14)",
  "--accent-line": "rgba(129,140,248,0.5)",
  "--feature-line": "rgba(129,140,248,0.38)",
  "--btn": "#e2e8f0",
  "--btn-ink": "#0f172a",
  "--btn-hover": "#818cf8",
  "--btn-hover-ink": "#0f172a",
  "--blob-a": "rgba(99,102,241,0.16)",
  "--blob-b": "rgba(148,163,184,0.07)",
  "--grain": "0.06",
  "--term-bg": "#0a0d12",
  "--term-line": "#252d3a",
};

const toCss = (vars) =>
  Object.entries(vars)
    .map(([key, value]) => `${key}:${value};`)
    .join("");

const THEME_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap");
:root{${toCss(LIGHT)}color-scheme:light}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${toCss(DARK)}color-scheme:dark}}
:root[data-theme="dark"]{${toCss(DARK)}color-scheme:dark}
html,body{background:var(--bg);color:var(--ink)}
body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:16px}
:root .font-mono{font-family:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:60;background:var(--bg)}
`;

/** Classes (Tailwind) que usam as variáveis do tema. */
const K = {
  bg: "bg-[color:var(--bg)]",
  surface: "bg-[color:var(--surface)]",
  chip: "bg-[color:var(--chip)]",
  accentSoft: "bg-[color:var(--accent-soft)]",
  accentFill: "bg-[color:var(--accent)]",
  lineFill: "bg-[color:var(--line)]",
  blobA: "bg-[color:var(--blob-a)]",
  blobB: "bg-[color:var(--blob-b)]",
  line: "border-[color:var(--line)]",
  lineStrong: "border-[color:var(--line-strong)]",
  featureLine: "border-[color:var(--feature-line)]",
  termBg: "bg-[color:var(--term-bg)]",
  termLine: "border-[color:var(--term-line)]",
  ink: "text-[color:var(--ink)]",
  text: "text-[color:var(--text)]",
  muted: "text-[color:var(--muted)]",
  accent: "text-[color:var(--accent)]",
  hoverAccent: "hover:text-[color:var(--accent)]",
  hoverAccentBorder: "hover:border-[color:var(--accent)]",
  hoverAccentLine: "hover:border-[color:var(--accent-line)]",
  btn: "bg-[color:var(--btn)] text-[color:var(--btn-ink)] hover:bg-[color:var(--btn-hover)] hover:text-[color:var(--btn-hover-ink)]",
  btnRound:
    "hover:border-[color:var(--btn-hover)] hover:bg-[color:var(--btn-hover)] hover:text-[color:var(--btn-hover-ink)]",
};

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]";

/** Animação de entrada ao rolar. Coloque false para deixar tudo sempre visível. */
const SCROLL_REVEAL = true;

/* =========================================================
   NAVEGAÇÃO (links montados conforme as seções existentes)
   ========================================================= */
const NAV_LINKS = [
  { id: "sobre", label: "Sobre" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "projetos", label: "Projetos" },
  CERTIFICATES.length > 0 && { id: "certificados", label: "Certificados" },
  { id: "contato", label: "Contato" },
].filter(Boolean);

/* =========================================================
   HOOKS
   ========================================================= */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);
    const handleChange = (event) => setReduced(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

/** Tema claro/escuro: escolha salva > atributo data-theme > preferência do sistema. */
function useTheme() {
  const systemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    try {
      const saved = window.localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (error) {
      /* armazenamento indisponível: segue sem salvar */
    }
    const attribute = document.documentElement.getAttribute("data-theme");
    if (attribute === "light" || attribute === "dark") return attribute;
    return systemTheme();
  });

  const hasChoice = useRef(false);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Enquanto a pessoa não escolher, acompanha mudanças do sistema.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      let saved = null;
      try {
        saved = window.localStorage.getItem("theme");
      } catch (error) {
        saved = null;
      }
      if (!hasChoice.current && !saved) setTheme(systemTheme());
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggle = () => {
    hasChoice.current = true;
    setTheme((previous) => {
      const next = previous === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem("theme", next);
      } catch (error) {
        /* armazenamento indisponível: segue sem salvar */
      }
      return next;
    });
  };

  return [theme, toggle];
}

/** Anima a entrada do conteúdo ao rolar a página (respeita "reduzir movimento"). */
function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const Tag = as;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const animate = SCROLL_REVEAL && !reducedMotion;

  useEffect(() => {
    if (!animate) {
      setVisible(true);
      return undefined;
    }
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [animate]);

  const animation = animate
    ? `transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`
    : "opacity-100";

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`${animation} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* =========================================================
   COMPONENTES DE APOIO
   ========================================================= */
function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10"
      style={{
        opacity: "var(--grain)",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className={`whitespace-nowrap font-mono text-sm font-semibold ${K.accent}`}>
          {eyebrow}
        </span>
        <span className={`h-px flex-1 ${K.lineFill}`} />
      </div>
      <h2
        className={`mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl ${K.ink}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${K.text}`}>{description}</p>
      )}
    </div>
  );
}

function TechPill({ children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs transition-colors ${K.line} ${K.surface} ${K.text} ${K.hoverAccentLine}`}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ href, icon: Icon, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${K.btn} ${FOCUS}`}
    >
      <Icon size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      {children}
    </a>
  );
}

function SecondaryButton({ href, icon: Icon, children, download }) {
  return (
    <a
      href={href}
      download={download}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noreferrer"}
      className={`group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${K.lineStrong} ${K.surface} ${K.text} ${K.hoverAccentBorder} ${K.hoverAccent} ${FOCUS}`}
    >
      <Icon size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" />
      {children}
    </a>
  );
}

/** Cartão estilo "editor de código" — o elemento visual de assinatura do herói. */
function TerminalCard() {
  return (
    <div className={`overflow-hidden rounded-2xl border shadow-xl ${K.termBg} ${K.termLine}`}>
      <div className={`flex items-center gap-2 border-b px-4 py-3 ${K.termLine}`}>
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-2 font-mono text-xs text-slate-500">perfil.js</span>
      </div>

      <div className="space-y-1 overflow-x-auto px-5 py-6 font-mono text-sm leading-relaxed text-slate-300">
        <p>
          <span className="text-indigo-400">const</span>{" "}
          <span className="text-sky-300">desenvolvedor</span>{" "}
          <span className="text-slate-500">{"= {"}</span>
        </p>
        <p className="pl-4">
          nome: <span className="text-amber-300">"Pedro Ricarth G. Cabral"</span>,
        </p>
        <p className="pl-4">
          cargo: <span className="text-amber-300">"{PROFILE.role}"</span>,
        </p>
        <p className="pl-4">
          stack: [
          {TECH_STACK.map((tech, index) => (
            <React.Fragment key={tech}>
              <span className="text-amber-300">"{tech}"</span>
              {index < TECH_STACK.length - 1 && <span className="text-slate-500">, </span>}
            </React.Fragment>
          ))}
          ],
        </p>
        <p className="pl-4">
          formacao: <span className="text-amber-300">"ADS · 5º período"</span>,
        </p>
        <p>
          <span className="text-slate-500">{"}"}</span>;
        </p>
      </div>

      <div className={`flex items-center gap-2 border-t px-5 py-4 ${K.termLine}`}>
        <MapPin size={14} className="text-emerald-400" />
        <span className="font-mono text-xs text-emerald-400">{PROFILE.location}</span>
      </div>
    </div>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${K.line} ${K.surface} ${K.text} ${K.hoverAccentBorder} ${K.hoverAccent} ${FOCUS}`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

/* =========================================================
   NAVEGAÇÃO
   ========================================================= */
function Nav({ theme, onToggleTheme }) {
  const [active, setActive] = useState(NAV_LINKS[0].id);

  // Seção ativa = a última cuja parte de cima já passou de 40% da altura da tela.
  useEffect(() => {
    const update = () => {
      const marker = window.innerHeight * 0.4;
      let current = NAV_LINKS[0].id;
      NAV_LINKS.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section && section.getBoundingClientRect().top <= marker) current = link.id;
      });
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = NAV_LINKS[NAV_LINKS.length - 1].id;
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      style={{ top: "env(safe-area-inset-top, 0px)" }}
      className={`sticky z-50 border-b backdrop-blur bg-[color:var(--bg-glass)] ${K.line}`}
    >
      <nav
        aria-label="Seções da página"
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3 lg:px-8"
      >
        <a
          href="#top"
          className={`hidden font-mono text-sm font-bold sm:block ${K.ink} ${FOCUS}`}
        >
          pedro<span className={K.accent}>.</span>dev
        </a>
        <ul className="flex min-w-0 flex-1 justify-between gap-4 overflow-x-auto whitespace-nowrap text-xs font-medium sm:flex-none sm:justify-end sm:gap-8 sm:text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative inline-block pb-1 transition-colors ${FOCUS} ${
                  active === link.id ? K.accent : `${K.text} ${K.hoverAccent}`
                }`}
              >
                {link.label}
                {active === link.id && (
                  <span className={`absolute bottom-0 left-0 h-px w-full ${K.accentFill}`} />
                )}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </nav>
    </header>
  );
}

/* =========================================================
   HERO
   ========================================================= */
function Hero() {
  return (
    <section
      id="sobre"
      className={`relative scroll-mt-20 overflow-hidden border-b ${K.line}`}
    >
      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${K.blobA}`}
      />
      <div
        className={`pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full blur-3xl ${K.blobB}`}
      />

      <div className="relative mx-auto grid max-w-5xl gap-16 px-6 py-24 sm:py-32 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8">
        <Reveal className="min-w-0 lg:col-span-7">
          <p className={`font-mono text-sm ${K.accent}`}>~/pedro-cabral $ whoami</p>

          <h1
            className={`mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${K.ink}`}
          >
            {PROFILE.name}
          </h1>

          <p className={`mt-3 text-lg font-medium sm:text-xl ${K.text}`}>{PROFILE.role}</p>

          <p className={`mt-6 max-w-xl text-base leading-relaxed ${K.text}`}>
            {PROFILE.summary}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton href={PROFILE.github} icon={Github}>
              Meu GitHub
            </PrimaryButton>
            {PROFILE.cvUrl && (
              <SecondaryButton
                href={PROFILE.cvUrl}
                icon={Download}
                download="curriculo-pedro-cabral.pdf"
              >
                Baixar CV
              </SecondaryButton>
            )}
          </div>
        </Reveal>

        <Reveal delay={150} className="min-w-0 lg:col-span-5">
          <TerminalCard />
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   TRAJETÓRIA (experiência + formação)
   ========================================================= */
function TimelineItem({ icon: Icon, title, subtitle, meta, children }) {
  return (
    <li className={`relative border-l pb-8 pl-8 last:pb-0 ${K.line}`}>
      <span
        className={`absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full border ${K.line} ${K.surface} ${K.accent}`}
      >
        <Icon size={15} />
      </span>
      <h4 className={`font-semibold ${K.ink}`}>{title}</h4>
      <p className={`text-sm ${K.text}`}>{subtitle}</p>
      <p className={`mt-1 font-mono text-xs ${K.muted}`}>{meta}</p>
      {children && <p className={`mt-3 text-sm leading-relaxed ${K.text}`}>{children}</p>}
    </li>
  );
}

function Trajectory() {
  return (
    <section id="trajetoria" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="// trajetória"
          title="Experiência e formação"
          description="Do setor administrativo ao esporte municipal, e da sala de aula ao código."
        />
      </Reveal>

      <div className="mt-14 grid gap-14 md:grid-cols-5">
        <Reveal className="min-w-0 md:col-span-3">
          <h3 className={`mb-6 font-mono text-sm font-semibold ${K.muted}`}>Experiência</h3>
          <ol>
            {EXPERIENCE.map((item) => (
              <TimelineItem
                key={`${item.role}-${item.period}`}
                icon={Briefcase}
                title={item.role}
                subtitle={item.org}
                meta={`${item.period} · ${item.place}`}
              >
                {item.description}
              </TimelineItem>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={100} className="min-w-0 md:col-span-2">
          <h3 className={`mb-6 font-mono text-sm font-semibold ${K.muted}`}>Formação</h3>
          <ol>
            {EDUCATION.map((item) => (
              <TimelineItem
                key={item.course}
                icon={GraduationCap}
                title={item.course}
                subtitle={item.institution}
                meta={item.period}
              />
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   PROJETOS
   ========================================================= */
function ProjectLinks({ repo, demo }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href={repo}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${K.btn} ${FOCUS}`}
      >
        <Github size={16} />
        Repositório
      </a>
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${K.lineStrong} ${K.text} ${K.hoverAccentBorder} ${K.hoverAccent} ${FOCUS}`}
        >
          <ExternalLink size={16} />
          Demo
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  const { featured, title, badge, status, description, highlights, note, tech, repo, demo } =
    project;

  return (
    <article
      className={
        featured
          ? `rounded-2xl border p-8 shadow-sm sm:p-10 ${K.featureLine} ${K.surface}`
          : `flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${K.line} ${K.surface}`
      }
    >
      {featured && badge && (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${K.accentSoft} ${K.accent}`}
        >
          <GraduationCap size={14} />
          {badge}
        </span>
      )}
      {!featured && status && (
        <span
          className={`mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-xs font-semibold ${K.chip} ${K.text}`}
        >
          {status}
        </span>
      )}

      <h3
        className={
          featured
            ? `mt-4 text-2xl font-bold sm:text-3xl ${K.ink}`
            : `text-xl font-bold ${K.ink}`
        }
      >
        {title}
      </h3>

      <p
        className={
          featured
            ? `mt-4 text-base leading-relaxed ${K.text}`
            : `mt-3 text-sm leading-relaxed ${K.text}`
        }
      >
        {description}
      </p>

      {featured && highlights && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {highlights.map((item) => (
            <li key={item} className={`flex items-start gap-2 text-sm ${K.text}`}>
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${K.accentFill}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {note && <p className={`mt-4 font-mono text-xs ${K.accent}`}>{note}</p>}

      <div className="mt-6 flex flex-wrap gap-2">
        {tech.map((item) => (
          <TechPill key={item}>{item}</TechPill>
        ))}
      </div>

      <div className="mt-auto">
        <ProjectLinks repo={repo} demo={demo} />
      </div>
    </article>
  );
}

function Projects() {
  const [featuredProject, ...otherProjects] = PROJECTS;

  return (
    <section id="projetos" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="// projetos"
          title="Projetos em destaque"
          description="Código aberto no GitHub: arquitetura, modelagem de dados e regras de negócio aplicadas em problemas reais do esporte municipal e em dados públicos."
        />
      </Reveal>

      <div className="mt-14 space-y-6">
        <Reveal>
          <ProjectCard project={featuredProject} />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 100} className="min-w-0">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-10">
        <a
          href={`${PROFILE.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className={`group inline-flex items-center gap-1 text-sm font-semibold transition-colors ${K.text} ${K.hoverAccent} ${FOCUS}`}
        >
          Ver todos os repositórios no GitHub
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </Reveal>
    </section>
  );
}

/* =========================================================
   CERTIFICADOS (só aparece quando CERTIFICATES tem itens)
   ========================================================= */
function Certificates() {
  if (CERTIFICATES.length === 0) return null;

  return (
    <section
      id="certificados"
      className={`scroll-mt-20 border-t ${K.line} ${K.surface}`}
    >
      <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="// certificados"
            title="Certificados & conquistas"
            description="Cursos e certificações que complementam a formação acadêmica."
          />
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {CERTIFICATES.map((cert, index) => (
            <Reveal as="li" key={`${cert.title}-${cert.issuer}`} delay={index * 60}>
              <div
                className={`flex h-full items-start gap-4 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${K.line} ${K.bg} ${K.hoverAccentLine}`}
              >
                <FileText className={`mt-0.5 h-6 w-6 shrink-0 ${K.accent}`} />
                <div className="min-w-0 flex-1">
                  <h3 className={`font-semibold ${K.ink}`}>{cert.title}</h3>
                  <p className={`text-sm ${K.muted}`}>
                    {cert.issuer} · {cert.year}
                  </p>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-2 inline-flex items-center gap-1 text-sm font-medium hover:underline ${K.accent} ${FOCUS}`}
                  >
                    Ver credencial
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */
function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  const selectText = () => {
    try {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (error) {
      /* sem ação: a pessoa ainda pode selecionar o texto manualmente */
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      selectText();
    }
  };

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <span ref={textRef} className={`select-all break-all font-mono text-sm ${K.text}`}>
        {PROFILE.email}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-live="polite"
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${K.lineStrong} ${K.surface} ${K.text} ${K.hoverAccentBorder} ${K.hoverAccent} ${FOCUS}`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copiado" : "Copiar e-mail"}
      </button>
    </div>
  );
}

function Footer() {
  const socials = [
    { href: PROFILE.github, label: "GitHub", icon: Github },
    { href: PROFILE.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: `mailto:${PROFILE.email}`, label: "E-mail", icon: Mail },
  ];

  return (
    <footer id="contato" className={`scroll-mt-20 border-t ${K.line} ${K.bg}`}>
      <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
        <Reveal>
          <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${K.ink}`}>
            Vamos conversar?
          </h2>
          <p className={`mx-auto mt-3 max-w-md ${K.text}`}>
            Me chame para falar de projetos, estágio ou vagas na área de desenvolvimento.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                aria-label={label}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 ${K.line} ${K.muted} ${K.btnRound} ${FOCUS}`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <EmailCopy />

          <p
            className={`mt-10 flex items-center justify-center gap-1.5 font-mono text-xs ${K.muted}`}
          >
            <MapPin size={12} />
            {PROFILE.location}
          </p>
          <p className={`mt-2 font-mono text-xs ${K.muted}`}>
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}

/* =========================================================
   APP (export principal)
   ========================================================= */
export default function App() {
  const [theme, toggleTheme] = useTheme();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = previousBehavior;
    };
  }, [reducedMotion]);

  return (
    <div id="top" className={`min-h-screen antialiased ${K.bg} ${K.ink}`}>
      <style>{THEME_CSS}</style>
      <GrainOverlay />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Trajectory />
        <Projects />
        <Certificates />
      </main>
      <Footer />
    </div>
  );
}
