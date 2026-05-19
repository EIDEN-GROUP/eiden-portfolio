import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectDetailPage, ProjectRouteNotFound } from "@/components/site/ProjectDetailPage";
import { projectDetailHead } from "@/components/site/projectDetailHead";
import { getProject } from "@/data/projects";

const SLUG = "bopassage" as const;

export const Route = createFileRoute("/projects/bopassage")({
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
