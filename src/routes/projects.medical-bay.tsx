import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  ProjectDetailPage,
  projectDetailHead,
  ProjectRouteNotFound,
} from "@/components/site/ProjectDetailPage";
import { getProject } from "@/data/projects";

const SLUG = "medical-bay" as const;

export const Route = createFileRoute("/projects/medical-bay")({
  loader: () => {
    const project = getProject(SLUG);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => projectDetailHead(loaderData?.project),
  component: Page,
  notFoundComponent: ProjectRouteNotFound,
});

function Page() {
  const { project } = Route.useLoaderData();
  return <ProjectDetailPage project={project} />;
}
