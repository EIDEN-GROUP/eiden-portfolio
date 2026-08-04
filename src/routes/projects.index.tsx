import { createFileRoute } from "@tanstack/react-router";
import { ProjectsIndex } from "@/components/site/ProjectsIndex";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects   EIDEN Group" },
      {
        name: "description",
        content:
          "Every EIDEN Group mandate in one place   brand systems, websites and the operating layers underneath them. Search and filter the full index.",
      },
      { property: "og:title", content: "Projects   EIDEN Group" },
      {
        property: "og:description",
        content: "The full index of EIDEN Group mandates, searchable by discipline and year.",
      },
    ],
  }),
  component: ProjectsIndex,
});
