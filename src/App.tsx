import { GitFork, Globe2 } from "lucide-react";

import { ProjectGallery } from "./ProjectGallery";
import "./styles.css";

const applications = [
  {
    title: "Bus Priority Impact Studio",
    description:
      "Built an original, source-backed dataset tracing how New York City bus service changed before and after bus-priority projects.",
    images: [
      {
        src: "/previews/bus-priority.png",
        alt: "Bus Priority Impact Studio showing its NYC bus route search and system summary",
        width: 1280,
        height: 720,
      },
      {
        src: "/previews/bus-priority-route-detail.png",
        alt: "Bus Priority Impact Studio showing M15-SBS performance, ridership, bus-lane coverage, and a route map",
        width: 1440,
        height: 1100,
      },
      {
        src: "/previews/bus-priority-interventions.png",
        alt: "Bus Priority Impact Studio showing its source-backed intervention ledger",
        width: 1280,
        height: 720,
      },
    ],
    live: "https://bus-priority-impact-studio.c20carroll.workers.dev/",
    source: "https://github.com/mannyc2/bus-priority-impact-studio",
  },
  {
    title: "Plato Wiki",
    description:
      "A searchable knowledge base and guided reading of 27 Platonic dialogues, with exact Stephanus citations and audio readings generated using local models.",
    images: [
      {
        src: "/previews/plato-wiki.png",
        alt: "Plato Wiki homepage with links for reading, tracing patterns, and searching passages",
        width: 1280,
        height: 720,
      },
      {
        src: "/previews/plato-wiki-dialogues.png",
        alt: "Plato Wiki dialogues index showing searchable guided readings for 27 dialogues",
        width: 1280,
        height: 720,
      },
      {
        src: "/previews/plato-wiki-reading.png",
        alt: "Plato Wiki guided reading with the dialogue, commentary, and margin records shown together",
        width: 1280,
        height: 720,
      },
    ],
    live: "https://straussian-llm-wiki.pages.dev/",
    source: "https://github.com/mannyc2/straussian-llm-wiki",
  },
  {
    title: "Sprite.exe",
    description:
      "A full-stack AI learning platform that generates courses and quizzes, runs code, tracks progress, and lets each learner configure their study environment.",
    images: [
      {
        src: "/previews/sprite-exe.jpg",
        alt: "Sprite.exe homepage introducing its personalized AI learning companions",
        width: 1280,
        height: 720,
      },
      {
        src: "/previews/sprite-exe-features.png",
        alt: "Sprite.exe showing its AI-powered course generation interface",
        width: 1280,
        height: 720,
      },
    ],
    live: "https://trysprite.app/",
    source: "https://github.com/yingxingxin/Senior-Project",
  },
  {
    title: "Watchify",
    description:
      "A native macOS app that monitors Shopify stores for price drops, restocks, and new products, with local history, charts, and notifications.",
    images: [
      {
        src: "/previews/watchify.png",
        alt: "Watchify for macOS showing monitored stores in a native SwiftUI interface",
        width: 2560,
        height: 1704,
      },
    ],
    source: "https://github.com/mannyc2/watchify-app",
  },
  {
    title: "Set Visualizer",
    description:
      "An interactive Venn editor that canonicalizes three-set expressions, stores shareable programs in the URL, and verifies the rendered canvas output.",
    images: [
      {
        src: "/previews/set-visualizer.png",
        alt: "Set Visualizer showing an expression editor beside a three-circle Venn diagram",
        width: 1280,
        height: 720,
      },
      {
        src: "/previews/set-visualizer-intersection.png",
        alt: "Set Visualizer rendering the intersection of two sets",
        width: 1280,
        height: 720,
      },
    ],
    live: "https://mannyc2.github.io/set-visualizer/",
    source: "https://github.com/mannyc2/set-visualizer",
  },
] as const;

function ProjectActions({
  live,
  source,
}: {
  live?: string;
  source: string;
}) {
  return (
    <div className="project-actions">
      {live ? (
        <a href={live}>
          <Globe2 aria-hidden="true" size={15} strokeWidth={1.8} />
          <span>website</span>
        </a>
      ) : null}
      <a href={source}>
        <GitFork aria-hidden="true" size={15} strokeWidth={1.8} />
        <span>github</span>
      </a>
    </div>
  );
}

const tools = [
  {
    title: "nyc-transit-kit",
    description:
      "A TypeScript SDK and Bun CLI for official NYC and MTA APIs, with stable JSON, fixtures, dry runs, and Promise wrappers.",
    source: "https://github.com/mannyc2/nyc-transit-kit",
  },
  {
    title: "MTA Wiki",
    description:
      "A source-backed pipeline that turns public MTA documents into structured records and a generated static wiki.",
    live: "https://mannyc2.github.io/mta-wiki/",
    source: "https://github.com/mannyc2/mta-wiki",
  },
  {
    title: "ts-release",
    description:
      "A release tool that previews and gates TypeScript and Bun publishing across npm, PyPI, Homebrew, Scoop, and GitHub Releases.",
    source: "https://github.com/mannyc2/ts-release",
  },
  {
    title: "open-design-cli",
    description:
      "A local design-generation toolkit that launches Codex or Claude and serves the generated project for immediate preview.",
    source: "https://github.com/mannyc2/open-design-cli",
  },
] as const;

export default function App() {
  return (
    <main className="site" id="top">
      <header className="site-header">
        <a className="site-name" href="#top">
          chris
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">work</a>
          <a href="https://github.com/mannyc2">github</a>
        </nav>
      </header>

      <section className="work" id="work" aria-labelledby="work-title">
        <h1 id="work-title">Projects</h1>

        <section
          className="project-section"
          id="applications"
          aria-labelledby="applications-title"
        >
          <h2 className="section-heading" id="applications-title">
            Applications
          </h2>

          <div className="project-list">
            {applications.map((project, index) => (
              <article className="project" key={project.title}>
                <div className="project-copy">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ProjectActions
                    live={"live" in project ? project.live : undefined}
                    source={project.source}
                  />
                </div>

                <ProjectGallery
                  images={project.images}
                  href={"live" in project ? project.live : project.source}
                  title={project.title}
                  priority={index === 0}
                />
              </article>
            ))}
          </div>
        </section>

        <section
          className="project-section tools-section"
          aria-labelledby="tools-title"
        >
          <h2 className="section-heading" id="tools-title">
            Tools &amp; systems
          </h2>

          <div className="tool-list">
            {tools.map((tool) => (
              <article className="tool" key={tool.title}>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <ProjectActions
                  live={"live" in tool ? tool.live : undefined}
                  source={tool.source}
                />
              </article>
            ))}
          </div>
        </section>
      </section>

      <div className="page-end" aria-hidden="true" />
    </main>
  );
}
