import type { Project } from "@/data/projects";

export type CaseStudyExpertiseItem = { title: string; blurb: string };
export type CaseStudyGalleryItem = { src: string; alt: string };
export type CaseStudyGalleryFace =
  | { kind: "image"; src: string; alt: string }
  | {
      kind: "social";
      projectTitle: string;
      linkedin?: string;
      instagram?: string;
      facebook?: string;
      tiktok?: string;
      website?: string;
      backgroundSrc?: string;
      backgroundAlt?: string;
    };
export type CaseStudyProcessStep = { n: string; title: string; desc: string };

/** Framed client / owner voice for the case study spotlight sections. */
export type CaseStudyReview = {
  eyebrow: string;
  quote: string;
  author: string;
  role: string;
};

export type CaseStudyResultTile = {
  src: string;
  alt: string;
  caption: string;
  variant: "sm" | "tall" | "wide" | "hero";
};

/** Optional per-project overrides for the results masonry (defaults from case study gallery). */
export type CaseStudyResultTileInput = Partial<
  Pick<CaseStudyResultTile, "alt" | "caption" | "variant">
> &
  Pick<CaseStudyResultTile, "src">;

export type ResolvedCaseStudy = {
  client: string;
  industry: string;
  servicesLine: string;
  timeline: string;
  location: string;
  challenge: string;
  goals: string;
  context: string;
  expertise: CaseStudyExpertiseItem[];
  gallery: CaseStudyGalleryItem[];
  galleryFaces: CaseStudyGalleryFace[];
  process: CaseStudyProcessStep[];
  finalStatement: string;
  openingReview: CaseStudyReview;
  closingReview: CaseStudyReview;
  /** Masonry “deliverables” gallery (web, CRM, app, etc.). */
  resultTiles: CaseStudyResultTile[];
};

const PROCESS: CaseStudyProcessStep[] = [
  {
    n: "01",
    title: "Discovery",
    desc: "Immersion, audits, and stakeholder alignment   we map truth before pixels.",
  },
  {
    n: "02",
    title: "Strategy",
    desc: "Positioning, narrative architecture, and measurable outcomes locked early.",
  },
  {
    n: "03",
    title: "Design",
    desc: "Systems, motion logic, and craft passes until the world feels inevitable.",
  },
  {
    n: "04",
    title: "Development",
    desc: "Performant surfaces, resilient content models, and launch-ready QA.",
  },
  {
    n: "05",
    title: "Launch",
    desc: "Rollout, optimization, and the handoff that keeps momentum compounding.",
  },
];

const RESULT_CAPTIONS = [
  "Website",
  "Product UI",
  "CRM suite",
  "Dashboard",
  "Mobile app",
  "Design system",
  "Booking flow",
  "Ops console",
] as const;

const RESULT_VARIANTS: CaseStudyResultTile["variant"][] = [
  "hero",
  "tall",
  "sm",
  "wide",
  "sm",
  "tall",
  "wide",
  "sm",
];

const EXPERTISE_POOL: CaseStudyExpertiseItem[] = [
  { title: "Branding", blurb: "Voice, symbol, and worldbuilding tuned for memorability." },
  { title: "UI / UX", blurb: "Flows that reduce friction and elevate every interaction." },
  { title: "Frontend", blurb: "Cinematic interfaces with performance as a creative constraint." },
  { title: "Backend", blurb: "Stable systems, clear data contracts, and scalable foundations." },
  { title: "Motion", blurb: "Scroll-native choreography and micro-moments that feel alive." },
  { title: "Strategy", blurb: "Commercial clarity   what to build, for whom, and why now." },
];

const SERVICE_BLURBS: Record<string, string> = {
  "Website design & development":
    "Editorial surfaces, enrolment flows, and performance-first builds tuned to convert.",
  Website:
    "Public platform, catalogue, and registration flows built for credibility and conversion.",
  "Website rebuild":
    "Parent-trusted enrolment platform with clear programme and psychosocial paths.",
  Branding: "Logo systems, palettes, and voice that partners and guests recognize instantly.",
  "Brand creation": "Name, identity, and voice built to deploy decades of expertise in market.",
  "Brand refresh": "Inclusive visual system and voice aligned with the impact inside the centre.",
  "Brand sub-system": "Institutional credibility with a forward-looking training signal.",
  "Brand voice & messaging": "Editorial voice that carries the room beyond four walls.",
  "Brand board": "Mood, texture, and typographic direction composed into one living reference.",
  "Naming & identity": "Partner-ready mark and system for B2B recognition and owner trust.",
  "Social media content":
    "Feed architecture, reels, and captions built for reach   always on-brand, never generic.",
  "LinkedIn content strategy": "B2B content engine that opens doors with hoteliers and operators.",
  "Marketing strategy": "Architecture across channels that turns discovery into qualified demand.",
  "Media buying":
    "Meta and Google campaigns with creative iteration tied to real business signals.",
  "Media buying & ads": "Paid social and search tuned for footfall, leads, and measurable ROAS.",
  "Google Ads & media buying": "Campaigns aimed at brunch habit, table bookings, and footfall.",
  "Meta Ads media buying": "Lead-focused funnels for families   warmth, not alarm.",
  "CRM & dashboard":
    "Pipeline visibility, parent follow-up, and team workflows in one operations console.",
  "CRM integration": "Parent and payment management without scattered tools.",
  "Dashboard system":
    "Student progress, cohort analytics, and admin tooling designed for daily use.",
  "Revenue optimisation": "Funnel and offer logic tuned to bookings, enrolment, and LTV.",
  "Lead generation": "Qualified inquiries from owners, investors, and travel operators.",
  Positioning: "Market narrative that deploys expertise where conversations happen.",
  "Curriculum design": "Flagship workshops and programmes built for operator outcomes.",
  "Workshop programming": "Intensive formats that convert curiosity into cohort sign-ups.",
  "Corporate training architecture": "Scalable delivery for teams and enterprise partners.",
  "Launch strategy": "Founding programme and registration flow for first cohorts.",
  "Full rebrand & repositioning": "Village brand rebuilt for surfers, nomads, and creative groups.",
  "Reputation building": "Google and booking platforms aligned with who actually arrives.",
  "Client experience": "Operations and touchpoints that match the repositioned story.",
  "Full business architecture": "Brand, funnel, CRM, and marketing as one operating system.",
  "CRM & operational systems":
    "Appointments, follow-ups, and team workflows in one patient operations layer.",
};

function mergeExpertise(project: Project): CaseStudyExpertiseItem[] {
  return project.services.map((service) => ({
    title: service,
    blurb:
      SERVICE_BLURBS[service] ?? EXPERTISE_POOL.find((e) => e.title === service)?.blurb ?? service,
  }));
}

function buildGalleryFaces(
  gallery: CaseStudyGalleryItem[],
  projectTitle: string,
  social?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    website?: string;
  },
): CaseStudyGalleryFace[] {
  const lastVisual = gallery.length ? gallery[gallery.length - 1] : undefined;

  const socialFace: CaseStudyGalleryFace = {
    kind: "social",
    projectTitle,
    linkedin: social?.linkedin,
    instagram: social?.instagram,
    facebook: social?.facebook,
    tiktok: social?.tiktok,
    website: social?.website,
    ...(lastVisual
      ? {
          backgroundSrc: lastVisual.src,
          backgroundAlt: lastVisual.alt,
        }
      : {}),
  };

  if (!gallery.length) {
    return [socialFace];
  }

  const imageItems = gallery.length === 1 ? gallery : gallery.slice(0, -1);
  return [
    ...imageItems.map((g) => ({ kind: "image" as const, src: g.src, alt: g.alt })),
    socialFace,
  ];
}

function buildResultTiles(
  project: Project,
  gallery: CaseStudyGalleryItem[],
  override: Project["caseStudy"],
): CaseStudyResultTile[] {
  if (override?.resultGallery?.length) {
    return override.resultGallery.map((r, i) => ({
      src: r.src,
      alt:
        r.alt ?? `${project.title}   ${r.caption ?? RESULT_CAPTIONS[i % RESULT_CAPTIONS.length]}`,
      caption: r.caption ?? RESULT_CAPTIONS[i % RESULT_CAPTIONS.length],
      variant: r.variant ?? RESULT_VARIANTS[i % RESULT_VARIANTS.length]!,
    }));
  }
  const pool = gallery.filter((g) => g.src);
  if (!pool.length) {
    return [
      {
        src: project.cover,
        alt: project.title,
        caption: "Website",
        variant: "hero",
      },
    ];
  }
  const tiles: CaseStudyResultTile[] = [];
  for (let i = 0; i < 8; i++) {
    const g = pool[i % pool.length]!;
    tiles.push({
      src: g.src,
      alt: g.alt || `${project.title}   ${RESULT_CAPTIONS[i % RESULT_CAPTIONS.length]}`,
      caption: RESULT_CAPTIONS[i % RESULT_CAPTIONS.length],
      variant: RESULT_VARIANTS[i % RESULT_VARIANTS.length]!,
    });
  }
  return tiles;
}

export function resolveCaseStudy(project: Project): ResolvedCaseStudy {
  const o = project.caseStudy;
  const servicesLine = project.services.join(" · ");

  const client = o?.client ?? project.title;

  const challenge = o?.challenge ?? project.summary;
  const goals = o?.goals ?? `Prove the line in market: ${project.tagline}`;
  const context =
    o?.context ??
    `${project.category}: senior judgment, restraint, and launch discipline in one pipeline.`;

  const finalStatement =
    o?.finalStatement ??
    `${project.title} now moves with clarity a composed presence in market, and a digital layer ready for the next chapter.`;

  const gallerySrcs = o?.gallery?.length
    ? [...o.gallery]
    : [project.cover, project.cover, project.cover];

  const gallery: CaseStudyGalleryItem[] = gallerySrcs.map((src, i) => ({
    src,
    alt: `${project.title}   visual ${i + 1}`,
  }));

  const galleryFaces = buildGalleryFaces(gallery, project.title, {
    ...o?.social,
    website: o?.social?.website ?? project.website,
  });

  const openingReview: CaseStudyReview = {
    eyebrow: o?.openingReview?.eyebrow ?? "Client perspective",
    quote: o?.openingReview?.quote ?? project.summary,
    author: o?.openingReview?.author ?? client,
    role: o?.openingReview?.role ?? "Client",
  };

  const closingReview: CaseStudyReview = {
    eyebrow: o?.closingReview?.eyebrow ?? "After delivery",
    quote: o?.closingReview?.quote ?? finalStatement,
    author: o?.closingReview?.author ?? client,
    role: o?.closingReview?.role ?? "Project owner",
  };

  const resultTiles = buildResultTiles(project, gallery, o);

  return {
    client,
    industry: project.category,
    servicesLine,
    timeline: o?.timeline ?? `${project.year} · engagement`,
    location: o?.location ?? "Morocco · hybrid delivery",
    challenge,
    goals,
    context,
    expertise: mergeExpertise(project),
    process: PROCESS,
    finalStatement,
    openingReview,
    closingReview,
    gallery,
    galleryFaces,
    resultTiles,
  };
}
