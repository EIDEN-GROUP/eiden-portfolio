import type { Project } from "@/data/projects";

export function projectDetailHead(p: Project | undefined) {
  if (!p) return { meta: [{ title: "Project   EIDEN Group" }] };
  return {
    meta: [
      { title: `${p.title}   EIDEN Group` },
      { name: "description", content: p.summary },
      { property: "og:title", content: `${p.title}   EIDEN Group` },
      { property: "og:description", content: p.summary },
      { property: "og:image", content: p.detailHero },
    ],
  };
}
