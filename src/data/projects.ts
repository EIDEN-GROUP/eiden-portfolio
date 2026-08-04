/** Gallery + project detail: covers, routing slugs, and case-study metadata. */
import type { CaseStudyResultTileInput } from "@/data/projectCaseStudy";
import bopassageBrandPalette from "@/assets/bopassage-brand-palette.png";
import bopassageCover from "@/assets/bopassage-cover.png";
import bopassageHero from "@/assets/bopassage-hero.png";
import bopassageSocialBalance from "@/assets/bopassage-social-balance.png";
import bopassageSocialInstagram from "@/assets/bopassage-social-instagram.png";
import bopassageSocialMatcha from "@/assets/bopassage-social-matcha.png";
import bopassageSocialSlowsDown from "@/assets/bopassage-social-slows-down.png";
import bopassageSocialWaffle from "@/assets/bopassage-social-waffle.png";
import dmcCover from "@/assets/dmc-cover.png";
import dmcHero from "@/assets/dmc-hero.png";
import dmcHeroDetail from "@/assets/dmc-hero-2.png";
import dmcSocialC from "@/assets/dmc-social-c.png";
import dmcSocialD from "@/assets/dmc-social-d.png";
import dmcSocialExcellence from "@/assets/dmc-social-excellence.png";
import dmcSocialM from "@/assets/dmc-social-m.png";
import educazenkidsCover from "@/assets/educazenkids-cover.png";
import educazenkidsScroll1 from "@/assets/educazenkids-scroll-1.png";
import educazenkidsScroll2 from "@/assets/educazenkids-scroll-2.png";
import educazenkidsScroll3 from "@/assets/educazenkids-scroll-3.png";
import educazenHero from "@/assets/educazen-hero.png";
import eidenAcademyBrandCarousel from "@/assets/eiden-academy-brand-carousel.png";
import eidenAcademyCover from "@/assets/eiden-academy-cover.png";
import eidenAcademySocialAiIntegration from "@/assets/eiden-academy-social-ai-integration.png";
import eidenAcademySocialAiTools from "@/assets/eiden-academy-social-ai-tools.png";
import eidenAcademySocialEcommerce from "@/assets/eiden-academy-social-ecommerce.png";
import eidenHero from "@/assets/eiden-hero.png";
import lunjaCover from "@/assets/lunja-cover.png";
import lunjaHero from "@/assets/image lunja village portfoliio.png";
import lunjaSocial1 from "@/assets/lunja-social-1.png";
import lunjaSocial2 from "@/assets/lunja-social-2.png";
import lunjaSocial3 from "@/assets/lunja-social-3.png";
import lunjaSocial4 from "@/assets/lunja-social-4.png";
import lunjaSocial5 from "@/assets/lunja-social-5.png";
import lunjaSocial6 from "@/assets/lunja-social-6.png";
import lunjaSocial7 from "@/assets/lunja-social-7.png";
import medicalBayCampaignImplant from "@/assets/medical-bay-campaign-implant.png";
import medicalBayCampaignVeneer from "@/assets/medical-bay-campaign-veneer.png";
import medicalBayCampaignZirconia from "@/assets/medical-bay-campaign-zirconia.png";
import medicalBayHeroFlatlay from "@/assets/medical-bay-hero-flatlay.png";
import medicalBayLobby from "@/assets/medical-bay-lobby.png";
import medicalBayOffice from "@/assets/medical-bay-office.png";
import medicalBayReception from "@/assets/medical-bay-reception.png";
import webChilloutCover from "@/assets/web-chillout-cover.jpg";
import webChilloutDesktop from "@/assets/web-chillout-desktop.jpg";
import webLithosCover from "@/assets/web-lithos-cover.jpg";
import webLunjaVibesCover from "@/assets/web-lunja-vibes-cover.jpg";
import webOrsenCover from "@/assets/web-orsen-cover.jpg";
import webRihabCover from "@/assets/web-rihab-cover.jpg";
import webSereneCover from "@/assets/web-serene-cover.jpg";
import webVibescapeCover from "@/assets/web-vibescape-cover.jpg";
import webLithosDesktop from "@/assets/web-lithos-desktop.jpg";
import webLunjaVibesDesktop from "@/assets/web-lunja-vibes-desktop.jpg";
import webOrsenDesktop from "@/assets/web-orsen-desktop.jpg";
import webRihabDesktop from "@/assets/web-rihab-desktop.jpg";
import webSereneDesktop from "@/assets/web-serene-desktop.jpg";
import webVibescapeDesktop from "@/assets/web-vibescape-desktop.jpg";

/** Optional overrides for the project detail case study body. */
export type ProjectCaseStudyOverride = {
  /** Masonry “results” tiles (web, CRM, app…). Omit to derive from gallery images. */
  resultGallery?: readonly CaseStudyResultTileInput[];
  client?: string;
  location?: string;
  timeline?: string;
  challenge?: string;
  goals?: string;
  context?: string;
  gallery?: readonly string[];
  social?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    website?: string;
  };
  finalStatement?: string;
  openingReview?: {
    eyebrow?: string;
    quote?: string;
    author?: string;
    role?: string;
  };
  closingReview?: {
    eyebrow?: string;
    quote?: string;
    author?: string;
    role?: string;
  };
};

export const projects = [
  {
    slug: "bopassage",
    title: "Bôpassage",
    cover: bopassageCover,
    detailHero: bopassageHero,
    summary:
      "A Founty café-restaurant rebuilt online   website, voice, and paid media engineered to turn discovery into reservations.",
    tagline: "The place you always come back to now with the digital layer to match.",
    category: "Hospitality",
    year: "2024",
    index: "01",
    services: [
      "Brand voice & messaging",
      "Website design & development",
      "Marketing strategy",
      "Google Ads & media buying",
      "Revenue optimisation",
    ],
    website: "https://bopassage.com",
    caseStudy: {
      social: {
        instagram: "https://www.instagram.com/bo.passage/",
        facebook: "https://www.facebook.com/bopassage",
        tiktok: "https://www.tiktok.com/@bopassage",
      },
      gallery: [
        bopassageSocialBalance,
        bopassageSocialWaffle,
        bopassageSocialMatcha,
        bopassageSocialInstagram,
        bopassageSocialSlowsDown,
        bopassageHero,
        bopassageCover,
      ],
      resultGallery: [
        {
          src: bopassageSocialBalance,
          alt: "Bô Passage   A perfect balance of taste & freshness",
          caption: "Balance",
          variant: "hero",
        },
        {
          src: bopassageSocialWaffle,
          alt: "Bô Passage   Indulge in sweetness",
          caption: "Dessert",
          variant: "tall",
        },
        {
          src: bopassageSocialMatcha,
          alt: "Bô Passage   Matcha moment",
          caption: "Matcha",
          variant: "sm",
        },
        {
          src: bopassageSocialInstagram,
          alt: "Bô Passage Instagram",
          caption: "Social",
          variant: "wide",
        },
        { src: bopassageHero, alt: "Bô Passage interior", caption: "Hospitality", variant: "tall" },
        { src: bopassageCover, alt: "Bô Passage brand", caption: "Brand", variant: "sm" },
      ],
      challenge:
        "Bôpassage had the room, the plates, and the loyalty   but no website, no consistent social rhythm, and no paid layer carrying the brand outside its four walls. The atmosphere stopped at the door.",
      goals:
        "Launch bopassage.com, build a social presence and editorial voice that feels like the room, and run Google Ads campaigns aimed at brunch habit and table bookings.",
      context: "2024 · ongoing engagement   Agadir, Morocco · hybrid delivery",
      openingReview: {
        eyebrow: "Before delivery",
        quote:
          "Bôpassage had the room, the plates, and the loyalty   but no website, no consistent social rhythm, and no paid layer carrying the brand outside its four walls. The atmosphere stopped at the door.",
        // author: "Bôpassage",
        role: "Founty, Agadir",
      },
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "Our site finally feels like the restaurant   warm, clear, easy to book. Social and ads now bring in people who already understand the vibe before they walk in.",
        // author: "Bôpassage",
        role: "Café & restaurant",
      },
    },
  },
  {
    slug: "dmc-morocco",
    title: "DMC Hospitality Morocco",
    cover: dmcCover,
    detailHero: dmcHeroDetail,
    summary:
      "A 30-year hospitality expertise turned into a brand full launch from blank page to live presence in the Moroccan tourism ecosystem.",
    tagline: "Authenticity & excellence hotel expertise translated from mark to inquiry.",
    category: "Hospitality",
    year: "2024",
    index: "02",
    services: [
      "Brand creation",
      "Naming & identity",
      "Website design & development",
      "LinkedIn content strategy",
      "Lead generation",
      "Positioning",
    ],
    website: "https://dmchm.com",
    caseStudy: {
      social: {
        linkedin: "https://www.linkedin.com/company/dmchm/",
      },
      gallery: [dmcSocialExcellence, dmcHero, dmcCover, dmcSocialD, dmcSocialM, dmcSocialC],
      resultGallery: [
        {
          src: dmcSocialExcellence,
          alt: "DMC Hospitality   Excellence in hospitality",
          caption: "Brand campaign",
          variant: "hero",
        },
        { src: dmcHero, alt: "DMC Hospitality website", caption: "Website", variant: "tall" },
        { src: dmcCover, alt: "DMC Hospitality collateral", caption: "Collateral", variant: "sm" },
        {
          src: dmcSocialD,
          alt: "DMC Hospitality   International expertise",
          caption: "Expertise",
          variant: "tall",
        },
        {
          src: dmcSocialM,
          alt: "DMC Hospitality   Tailored support",
          caption: "Management",
          variant: "sm",
        },
        {
          src: dmcSocialC,
          alt: "DMC Hospitality   Authenticity & sustainability",
          caption: "Consulting",
          variant: "wide",
        },
      ],
      challenge:
        "Three decades of hospitality know-how   but no brand, no website, no voice in the market. The expertise existed; the platform to deploy it didn't.",
      goals:
        "Build the brand from scratch: name, identity, website, and LinkedIn content engine that opens doors with hoteliers, investors, and international travel operators.",
      context: "2024 · founding engagement   Casablanca / Marrakech / Agadir · hybrid delivery",
      openingReview: {
        eyebrow: "Before delivery",
        quote:
          "Three decades of hospitality know-how   but no brand, no website, no voice in the market. The expertise existed; the platform to deploy it didn't.",
        // author: "DMC Hospitality Morocco",
        role: "Founding team",
      },
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "We had the expertise. EIDEN built the brand that lets us deploy it. We now show up in the conversations we were excluded from for years.",
        // author: "DMC Hospitality Morocco",
        role: "Hotel consulting",
      },
    },
  },
  {
    slug: "educazen-kids",
    title: "EducazenKids",
    cover: educazenkidsCover,
    detailHero: educazenHero,
    summary:
      "Complete makeover for an Agadir inclusive education centre   website, CRM, marketing engine, and paid media built around children with neuro-specific needs and the families behind them.",
    tagline: "Tailored education with the digital and operational stack to match.",
    category: "Education",
    year: "2024",
    index: "03",
    services: [
      "Brand refresh",
      "Website rebuild",
      "CRM integration",
      "Marketing strategy",
      "Meta Ads media buying",
      "Revenue optimisation",
    ],
    website: "https://educazenkids.eiden-group.workers.dev/",
    caseStudy: {
      social: {
        instagram: "https://www.instagram.com/educazenkids/",
        facebook: "https://www.facebook.com/people/Educazen-Kids/61563794544686/?locale=ru_RU#",
      },
      gallery: [educazenHero, educazenkidsCover, educazenHero],
      resultGallery: [
        {
          src: educazenHero,
          alt: "EducazenKids website desktop",
          caption: "Programs",
          variant: "tall",
        },
        {
          src: educazenkidsCover,
          alt: "EducazenKids website mobile",
          caption: "Mobile",
          variant: "sm",
        },
        {
          src: educazenkidsScroll1,
          alt: "EducazenKids social   working together for fulfilled learning",
          caption: "Social content",
          variant: "wide",
        },
        {
          src: educazenkidsScroll2,
          alt: "EducazenKids social   growing with a calm mind and fulfilled body",
          caption: "Brand campaign",
          variant: "tall",
        },
        {
          src: educazenkidsScroll3,
          alt: "EducazenKids social   curiosity, growing at your own pace",
          caption: "Social creative",
          variant: "sm",
        },
      ],
      challenge:
        "A centre changing children's lives daily   but discoverability gaps, no CRM, no funnel, and a digital presence that didn't reflect the impact happening inside the walls.",
      goals:
        "Launch a new educazenkids.com built as a real enrolment funnel, deploy a CRM for parent and payment management, and run Meta Ads reaching families of children with ADHD, autism, and dyslexia.",
      context: "2024–2025 · ongoing engagement   Agadir, Morocco · full-stack delivery",
      openingReview: {
        eyebrow: "Before delivery",
        quote:
          "A centre changing children's lives daily   but discoverability gaps, no CRM, no funnel, and a digital presence that didn't reflect the impact happening inside the walls.",
        // author: "EducazenKids",
        role: "Director's brief",
      },
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "We used to spend hours on admin and still missed families. Now the system works for us   and parents find us before we even pitch ourselves.",
        // author: "EducazenKids",
        role: "Direction",
      },
    },
  },
  {
    slug: "eiden-academy",
    title: "Eiden Academy",
    cover: eidenAcademyCover,
    detailHero: eidenHero,
    summary:
      "Eiden Academy didn't exist. There was no brand, no structure, no funnel, no positioning. Eiden Group built it from zero and turned it into MENA's most deliberately engineered professional training platform.",
    tagline: "What happens when an architecture firm builds its own school.",
    category: "Education & talent",
    year: "2025",
    index: "04",
    services: [
      "Brand creation",
      "Curriculum architecture",
      "Website design & development",
      "Enrolment funnel",
      "MICE & corporate training",
      "Launch strategy",
    ],
    website: "https://eiden-group.com/academy",
    caseStudy: {
      social: {
        instagram: "https://www.instagram.com/eiden.academy/",
        facebook: "https://www.facebook.com/p/Eiden-Academy-61576064859002/",
      },
      gallery: [
        eidenAcademyBrandCarousel,
        eidenAcademySocialAiTools,
        eidenAcademySocialAiIntegration,
        eidenAcademySocialEcommerce,
        eidenHero,
        eidenAcademyCover,
      ],
      resultGallery: [
        {
          src: eidenAcademyBrandCarousel,
          alt: "Eiden Academy   From knowledge to real skills",
          caption: "Brand",
          variant: "hero",
        },
        {
          src: eidenAcademySocialAiTools,
          alt: "Eiden Academy   Master AI Tools & Applications",
          caption: "AI formation",
          variant: "tall",
        },
        {
          src: eidenAcademySocialAiIntegration,
          alt: "Eiden Academy   AI Integration",
          caption: "AI integration",
          variant: "sm",
        },
        {
          src: eidenAcademySocialEcommerce,
          alt: "Eiden Academy   E-Commerce & Marketplace",
          caption: "E-commerce",
          variant: "wide",
        },
        { src: eidenHero, alt: "Eiden Academy platform", caption: "Platform", variant: "tall" },
        {
          src: eidenAcademyCover,
          alt: "Eiden Academy guidelines",
          caption: "Guidelines",
          variant: "sm",
        },
      ],
      challenge:
        "The market was supply-led, not demand-led. Training programmes were built around what was easy to teach, not around what professionals actually needed to deploy on Monday morning. We didn't build Eiden Academy to compete with existing training providers we built it to make them irrelevant.",
      goals:
        "Launch Eiden Academy as a credible sub-brand: identity, website, four flagship workshops, registration flow, and a launch programme for the first cohorts.",
      context: "2025 · founding engagement   Agadir, Morocco · scaling nationally",
      openingReview: {
        eyebrow: "Before delivery",
        quote:
          "Morocco has business schools. It doesn't have a school that teaches operators how to actually build the architecture under their company   the systems, the revenue logic, the team layer. That's the gap Eiden Academy was built to close.",
        // author: "EIDEN Group",
        role: "Founder",
      },
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "Where there was nothing, there is now a fully operational education brand with a live course catalogue, a converting website, a structured enrolment funnel, and a corporate offer. Eiden Academy launched as a complete institution not a pilot, not a landing page with a waiting list, but a running system. 500+ professionals already moving through its programmes. The architecture is built to scale without breaking.",
        // author: "Emilia R. · AlK Networks",
        // role: "Programme lead",
      },
    },
  },
  {
    slug: "lunja-village",
    title: "Lunja Village",
    cover: lunjaCover,
    detailHero: lunjaHero,
    summary:
      "Full transformation of an Imi Ouaddar resort into a community-led coastal village repositioning, brand, marketing engine, operations, paid media, and reputation system rebuilt end to end.",
    tagline: "Surf, nomad, community a coastal village brand rebuilt for who's actually arriving.",
    category: "Hospitality",
    year: "2024",
    index: "05",
    services: [
      "Full rebrand & repositioning",
      "Marketing strategy",
      "Revenue optimisation",
      "Media buying",
      "Reputation building",
      "Client experience",
    ],
    website: "https://www.lunjavillage.com",
    caseStudy: {
      social: {
        instagram: "https://www.instagram.com/lunjavillage.officiel/",
        facebook: "https://www.facebook.com/LunjaVillage/",
        tiktok: "https://www.tiktok.com/@lunja_villageaga",
      },
      gallery: [
        lunjaHero,
        lunjaCover,
        lunjaSocial2,
        lunjaSocial3,
        lunjaSocial5,
        lunjaSocial6,
        lunjaSocial7,
      ],
      resultGallery: [
        {
          src: lunjaSocial1,
          alt: "Lunja Village social",
          caption: "Social",
          variant: "hero",
        },
        {
          src: lunjaSocial2,
          alt: "Lunja Village   Wave incoming",
          caption: "Surf",
          variant: "tall",
        },
        {
          src: lunjaSocial3,
          alt: "Lunja Village sunset surfboards",
          caption: "Golden hour",
          variant: "sm",
        },
        {
          src: lunjaSocial4,
          alt: "Lunja Village Taghazout skate park",
          caption: "Skate",
          variant: "wide",
        },
        {
          src: lunjaSocial5,
          alt: "Lunja Village   Stay a little longer",
          caption: "Coast",
          variant: "tall",
        },
        {
          src: lunjaSocial6,
          alt: "Lunja Village   Summer view Taghazout",
          caption: "Taghazout",
          variant: "sm",
        },
        {
          src: lunjaSocial7,
          alt: "Lunja Village coastal",
          caption: "Wellness",
          variant: "hero",
        },
      ],
      challenge:
        "Lunja held the location, the spirit, and the audience but the brand still spoke 'resort' while the guests showing up were surfers, digital nomads, and creative groups. The story, the rooms, the operations, and the paid media weren't talking to the same person.",
      goals:
        "Reposition Lunja from resort to community village: new brand system, marketing architecture across Instagram, TikTok, WhatsApp, and paid media, plus a reputation system across Google and booking platforms.",
      context:
        "2024–2025 · ongoing engagement   Imi Ouaddar / Taghazout coastline · full-stack delivery",
      openingReview: {
        eyebrow: "Before delivery",
        quote:
          'Lunja held the location, the spirit, and the audience   but the brand still spoke "resort" while the guests showing up were surfers, digital nomads, and creative groups. The story, the rooms, the operations, and the paid media weren\'t talking to the same person.',
        // author: "Lunja Village",
        role: "Direction",
      },
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "The brand finally matches who actually shows up at Lunja. Bookings come in already understanding the village   and the team has a system, not a scramble.",
        // author: "Lunja Village",
        role: "Direction",
      },
    },
  },
  {
    slug: "medical-bay",
    title: "Medical Bay",
    cover: medicalBayHeroFlatlay,
    detailHero: medicalBayLobby,
    summary:
      "End-to-end build of a modern medical centre brand and operating system architecture, identity, digital infrastructure, marketing, and patient experience designed as one layered system.",
    tagline: "A medical centre, architected from patient experience to revenue logic.",
    category: "Healthcare",
    year: "2026",
    index: "06",
    services: [
      "Full business architecture",
      "Brand creation",
      "Website",
      "CRM & operational systems",
      "Marketing strategy",
      "Revenue optimisation",
    ],
    website: "https://medicalbay.vercel.app/",
    caseStudy: {
      social: {
        instagram: "https://www.instagram.com/medicalbay.maroc/",
        facebook: "https://www.facebook.com/p/Medical-Bay-100085861093531/",
        linkedin: "https://www.linkedin.com/company/medical-bay-agadir/",
      },
      gallery: [medicalBayLobby, medicalBayReception, medicalBayOffice, medicalBayLobby],
      resultGallery: [
        {
          src: medicalBayCampaignImplant,
          alt: "Medical Bay Pack Implant campaign",
          caption: "Pack Implant",
          variant: "hero",
        },
        {
          src: medicalBayCampaignZirconia,
          alt: "Medical Bay Pack Couronne Zircone campaign",
          caption: "Pack Couronne Zircone",
          variant: "tall",
        },
        {
          src: medicalBayCampaignVeneer,
          alt: "Medical Bay Pack Facette campaign",
          caption: "Pack Facette",
          variant: "wide",
        },
        {
          src: medicalBayReception,
          alt: "Medical Bay reception",
          caption: "Patient experience",
          variant: "sm",
        },
        {
          src: medicalBayLobby,
          alt: "Medical Bay lobby and brand environment",
          caption: "Brand environment",
          variant: "tall",
        },
        {
          src: medicalBayOffice,
          alt: "Medical Bay consultation office",
          caption: "Consultation",
          variant: "sm",
        },
      ],
      challenge:
        "A medical project with a clear vision but no architecture underneath   no brand, no patient journey, no CRM, no funnel, no marketing logic. The clinical excellence needed an operating system to scale into.",
      goals:
        "Build Medical Bay end to end: brand, website engineered as a patient funnel, CRM covering appointments and follow-ups, and a marketing engine that reaches the right communities in the right tone.",
      context: "2026 · founding engagement   Morocco · full-stack delivery",
      openingReview: {
        eyebrow: "Before delivery",
        quote:
          "A medical project with a clear vision but no architecture underneath   no brand, no patient journey, no CRM, no funnel, no marketing logic. The clinical excellence needed an operating system to scale into.",
        // author: "Medical Bay",
        role: "Founding team",
      },
      closingReview: {
        eyebrow: "After delivery",
        quote:
          "We didn't open a clinic   we opened a system. Patients feel the difference from the first click, and the team isn't holding the operation together with spreadsheets anymore.",
        // author: "Medical Bay",
        role: "Direction",
      },
    },
  },
  {
    slug: "orsen",
    title: "ORSEN",
    cover: webOrsenCover,
    detailHero: webOrsenDesktop,
    summary:
      "A materials house for architects — 24 matières browsable by effect and by family, a devis path never more than one click away, and a full espace pro behind it.",
    tagline: "La matière avant le décor.",
    category: "Web design",
    year: "2026",
    index: "07",
    services: [
      "Art direction",
      "Design system",
      "Web design & development",
      "B2B portal & quoting",
      "Motion design",
      "Responsive engineering",
    ],
    website: "https://orsen.vercel.app/",
  },
  {
    slug: "lithos-materiaux",
    title: "LITHOS",
    cover: webLithosCover,
    detailHero: webLithosDesktop,
    summary:
      "Limestone, travertine, concrete and marble, catalogued three ways — by effect, by space, by moodboard — for a bureau d'études in Aix-en-Provence.",
    tagline: "La matière, racontée avec soin.",
    category: "Web design",
    year: "2026",
    index: "08",
    services: [
      "Art direction",
      "Design system",
      "Web design & development",
      "Motion design",
      "Responsive engineering",
    ],
    website: "https://lithos-materiaux.vercel.app/",
  },
  {
    slug: "rihab-residence",
    title: "Résidence Rihab",
    cover: webRihabCover,
    detailHero: webRihabDesktop,
    summary:
      "A boutique aparthotel in Cité Founty, Agadir — 49 apartments, sold honestly, with an availability bar that never leaves the viewport.",
    tagline: "A quiet Moroccan address, five minutes from the Atlantic.",
    category: "Web design",
    year: "2026",
    index: "09",
    services: [
      "Art direction",
      "Design system",
      "Web design & development",
      "Booking experience",
      "Bilingual EN/FR build",
      "Responsive engineering",
    ],
    website: "https://rihab-hotel.vercel.app/",
  },
  {
    slug: "lunja-village-vibes",
    title: "Lunja Village Vibes",
    cover: webLunjaVibesCover,
    detailHero: webLunjaVibesDesktop,
    summary:
      "The loudest expression of the Lunja identity — coral, teal and chillout yellow on linen, for the vibe village at Imi Ouaddar.",
    tagline: "Ta parenthèse ensoleillée à Imi Ouaddar.",
    category: "Web design",
    year: "2026",
    index: "10",
    services: [
      "Art direction",
      "Design system",
      "Web design & development",
      "Motion design",
      "Responsive engineering",
    ],
    website: "https://lunja-village-vibes.vercel.app/",
  },
  {
    slug: "lunja-taghazout-bay",
    title: "Lunja Taghazout Bay",
    cover: webSereneCover,
    detailHero: webSereneDesktop,
    summary:
      "The same identity at golden hour — surf, pools and bungalows on the Atlantic, proving the system holds a quieter register.",
    tagline: "Le village qui vit au rythme de l'océan.",
    category: "Web design",
    year: "2026",
    index: "11",
    services: [
      "Art direction",
      "Design system",
      "Web design & development",
      "Motion design",
      "Responsive engineering",
    ],
    website: "https://serene-ui-studio.vercel.app/",
  },
  {
    slug: "chillout-lounge",
    title: "CHILLOUT Lounge",
    cover: webChilloutCover,
    detailHero: webChilloutDesktop,
    summary:
      "A lounge bar with one job — fill tonight. Golden-hour garden palette, CSS-only grunge type, and a live programme that pins to the header.",
    tagline: "Live music, cocktails and sunset sessions facing the Atlantic.",
    category: "Web design",
    year: "2026",
    index: "12",
    services: [
      "Art direction",
      "Design system",
      "Web design & development",
      "Motion design",
      "Responsive engineering",
    ],
    website: "https://chill-vibes-studio.vercel.app/",
  },
  {
    slug: "chillout-social-club",
    title: "CHILLOUT Social Club",
    cover: webVibescapeCover,
    detailHero: webVibescapeDesktop,
    summary:
      "Four venues — surf hostel, beer garden, foodcourt and day café — told as a single scroll structured as one day on the sand.",
    tagline: "Sunrise surf to sunset sets.",
    category: "Web design",
    year: "2026",
    index: "13",
    services: [
      "Art direction",
      "Design system",
      "Web design & development",
      "Motion design",
      "Responsive engineering",
    ],
    website: "https://vibescape-hub.vercel.app/",
  },
] as const;

/** Slugs excluded from the public portfolio (gallery, hero, next-project nav). */
export const HIDDEN_PROJECT_SLUGS = new Set<string>(["eiden-academy"]);

export const visibleProjects = projects.filter((p) => !HIDDEN_PROJECT_SLUGS.has(p.slug));

export type Project = (typeof projects)[number] & {
  caseStudy?: ProjectCaseStudyOverride;
  website?: string;
};

export function projectPath(slug: string) {
  return `/projects/${slug}` as const;
}

export function getProject(slug: string): Project | undefined {
  const project = projects.find((p) => p.slug === slug);
  if (!project || HIDDEN_PROJECT_SLUGS.has(project.slug)) return undefined;
  return project;
}
