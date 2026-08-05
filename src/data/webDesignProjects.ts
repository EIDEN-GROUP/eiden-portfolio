/**
 * Web-design case studies: shipped product sites shown as design work rather
 * than brand campaigns. Palette and type values are lifted verbatim from each
 * site's own stylesheet so the portfolio stays truthful to what was deployed.
 */
import chilloutDesktop from "@/assets/web-chillout-desktop.jpg";
import chilloutMobile from "@/assets/web-chillout-mobile.jpg";
import lithosDesktop from "@/assets/web-lithos-desktop.jpg";
import lithosMobile from "@/assets/web-lithos-mobile.jpg";
import lunjaVibesDesktop from "@/assets/web-lunja-vibes-desktop.jpg";
import lunjaVibesMobile from "@/assets/web-lunja-vibes-mobile.jpg";
import orsenDesktop from "@/assets/web-orsen-desktop.jpg";
import orsenMobile from "@/assets/web-orsen-mobile.jpg";
import rihabDesktop from "@/assets/web-rihab-desktop.jpg";
import rihabMobile from "@/assets/web-rihab-mobile.jpg";
import sereneDesktop from "@/assets/web-serene-desktop.jpg";
import sereneMobile from "@/assets/web-serene-mobile.jpg";
import vibescapeDesktop from "@/assets/web-vibescape-desktop.jpg";
import vibescapeMobile from "@/assets/web-vibescape-mobile.jpg";
import oneRetailDesktop from "@/assets/web-one-retail-desktop.jpg";
import oneRetailMobile from "@/assets/web-one-retail-mobile.jpg";
import droguerieSoussDesktop from "@/assets/web-droguerie-souss-desktop.jpg";
import droguerieSoussMobile from "@/assets/web-droguerie-souss-mobile.jpg";

export type Swatch = {
  name: string;
  value: string;
  /** Role in the 70/20/10 balance, e.g. "Surface" / "Accent". */
  role: string;
};

export type TypeSpec = {
  role: string;
  family: string;
  note: string;
  /** Rendered as a live specimen using this CSS font stack. */
  stack: string;
  weight: number;
};

export type MotionNote = {
  title: string;
  detail: string;
};

export type WebDesignProject = {
  slug: string;
  liveUrl: string;
  /** Real captures of the deployed site, used as poster frames for the device shells. */
  shots: { desktop: string; mobile: string };
  /** Two or three short paragraphs: the problem, the design decision, the result. */
  intent: readonly string[];
  designNotes: string;
  /**
   * Fontshare CSS query for faces that aren't on Google Fonts, so the type
   * specimens render in the site's actual typeface rather than a stand-in.
   */
  fontshareUrl?: string;
  palette: readonly Swatch[];
  type: readonly TypeSpec[];
  motion: readonly MotionNote[];
  /** The page architecture, in scroll order. */
  architecture: readonly string[];
  responsive: readonly string[];
  stack: readonly string[];
};

const ORSEN: WebDesignProject = {
  slug: "orsen",
  liveUrl: "https://orsen.vercel.app/",
  shots: { desktop: orsenDesktop, mobile: orsenMobile },
  intent: [
    "A materials house selling marble, natural stone, concrete, wood and metal to architects — an audience that reads specification sheets, not marketing copy. La matière, tenue du premier trait à la livraison.",
    "So the layout is built on plates: flat blocks of anthracite and blanc cassé that butt against each other at a 2px radius with a single hairline. Nothing floats, nothing glows, and the type is Satoshi and nothing else — one family carrying display, navigation and specification tables alike. The only colour that ever interrupts is the rouge signal, and it only ever means action.",
    "Behind the public catalogue sits a full espace pro: catalogue, clients, commandes, devis and stock, with an admin role on top. Architects browse and build a sélection; the trade side runs the orders.",
  ],
  designNotes: "Plate-based sections, one signal colour, one typeface. The restraint is the brand.",
  fontshareUrl: "f[]=satoshi@400,500,700,900&display=swap",
  palette: [
    { name: "Blanc", value: "#FFFFFF", role: "Cards" },
    { name: "Blanc cassé", value: "#F6F5F3", role: "Page ground" },
    { name: "Gris clair", value: "#E7E6E3", role: "Secondary / borders" },
    { name: "Gris moyen", value: "#B9B8B4", role: "Muted type" },
    { name: "Anthracite", value: "#232323", role: "Ink & pro sidebar" },
    { name: "Rouge signal", value: "#C81E2C", role: "Action only" },
  ],
  type: [
    {
      role: "Display",
      family: "Satoshi",
      note: "Black weight, tight tracking, set in oversized uppercase slabs that break across the viewport.",
      stack: '"Satoshi", "Archivo", system-ui, sans-serif',
      weight: 900,
    },
    {
      role: "Interface",
      family: "Satoshi",
      note: "Medium and semibold for navigation, specs and the espace-pro tables. Satoshi uniquement — one family, full range, no second voice.",
      stack: '"Satoshi", "Archivo", system-ui, sans-serif',
      weight: 500,
    },
  ],
  motion: [
    {
      title: "Editorial easing",
      detail:
        "A single --ease-editorial token, cubic-bezier(.16, 1, .3, 1), drives every transition, so the whole site decelerates with one personality.",
    },
    {
      title: "Reveal & stagger",
      detail:
        "Shared Reveal / Stagger / RevealItem primitives wrap each block, so sections and their children enter on one rhythm instead of per-component guesswork.",
    },
    {
      title: "Magnetic links",
      detail:
        "Primary calls to action drift toward the cursor on approach — the only playful gesture in an otherwise deadpan interface.",
    },
    {
      title: "Colour-blind-safe data",
      detail:
        "The chart pair is validated rather than chosen: ΔE 10.3 apart in light, 8.7 in dark, contrast ≥ 3:1 on both surfaces. A third chromatic tone was rejected because amber and red collapse under deuteranopia, so 'attention' carries a neutral hue plus an icon.",
    },
  ],
  architecture: [
    "Hero — la matière avant le décor, with explore and quote CTAs",
    "Notre parti pris — the sourcing position",
    "Cinq familles — marble, stone, concrete, wood, metal",
    "Choisir par l'effet — browse by finish rather than by SKU",
    "Sélection du moment, then six matières à voir de près",
    "Réalisations — the projects reference wall",
    "Passer au chiffrage — quote request, favoris and sélection",
    "Espace pro — catalogue, clients, commandes, devis, stock, admin",
  ],
  responsive: [
    "Desktop holds the editorial grid with full-bleed plate sections and a persistent search, favoris and cart rail.",
    "Tablet collapses the material families to two-up and moves search into a full-screen overlay.",
    "Mobile drives everything from a full-screen menu, keeping demander un devis reachable from any surface.",
  ],
  stack: ["React", "TanStack Start", "Tailwind v4", "Motion", "Supabase", "Vercel"],
};

const LITHOS: WebDesignProject = {
  slug: "lithos-materiaux",
  liveUrl: "https://lithos-materiaux.vercel.app/",
  shots: { desktop: lithosDesktop, mobile: lithosMobile },
  intent: [
    "LITHOS sells limestone, travertine, concrete and marble in the south of France, and the brief was one line: la matière, racontée avec soin. The material, told with care.",
    "The whole design system is a quarry palette — calcaire, sable, pierre, laiton, terracotta, espresso — governed by a strict 70/20/10 rule: seventy percent limestone and sand, twenty espresso, ten terracotta. Corners are almost square at 2px, because stone does not have a border radius.",
    "The catalogue is entered three ways: by effect, by space, and by moodboard, mirroring how an architect actually specifies.",
  ],
  designNotes:
    "A 70/20/10 quarry palette, near-square corners, and a condensed grotesk that behaves like engraving.",
  fontshareUrl: "f[]=britney@400,700&display=swap",
  palette: [
    { name: "Calcaire", value: "#E9E4DC", role: "Page ground (70%)" },
    { name: "Sable", value: "#DCD2C2", role: "Secondary surface" },
    { name: "Pierre", value: "#B3A998", role: "Muted" },
    { name: "Laiton", value: "#A88547", role: "Focus / ring" },
    { name: "Terracotta", value: "#B7623F", role: "Accent (10%)" },
    { name: "Espresso", value: "#302B22", role: "Ink (20%)" },
  ],
  type: [
    {
      role: "Display",
      family: "Britney",
      note: "A high-contrast display face for section titles, used sparingly and always in sentence case French.",
      stack: '"Britney", "Archivo Narrow", system-ui, sans-serif',
      weight: 700,
    },
    {
      role: "Body & interface",
      family: "Archivo Narrow",
      note: "Condensed by default so long French specification copy holds a comfortable measure.",
      stack: '"Archivo Narrow", system-ui, sans-serif',
      weight: 400,
    },
  ],
  motion: [
    {
      title: "Ease matière",
      detail:
        "A shared cubic-bezier(.22, 1, .36, 1) token — every reveal settles like something heavy being set down.",
    },
    {
      title: "Voile gradient",
      detail:
        "Imagery is veiled with a bottom-up espresso gradient so type always lands on a legible field, no matter the photo.",
    },
    {
      title: "Shadow matière",
      detail:
        "A single deep, wide shadow (0 24px 60px -32px) lifts cards a millimetre off the page instead of casting them into space.",
    },
  ],
  architecture: [
    "Hero with the material promise and showroom location",
    "Catalogue by effect — limestone, travertine, concrete, marble",
    "Catalogue by space — floors, façades, bathrooms, exteriors",
    "Moodboards as pre-composed material pairings",
    "Bureau d'études — the technical studio offer",
    "Showroom in Aix-en-Provence with visit booking",
  ],
  responsive: [
    "Desktop runs a three-up material grid with a persistent filter rail.",
    "Tablet drops to two-up and moves filters into a sticky bar under the header.",
    "Mobile becomes a single column with the moodboards as a swipeable carousel.",
  ],
  stack: ["React", "TanStack Start", "Tailwind v4", "Motion", "Supabase", "Vercel"],
};

const RIHAB: WebDesignProject = {
  slug: "rihab-residence",
  liveUrl: "https://rihab-hotel.vercel.app/",
  shots: { desktop: rihabDesktop, mobile: rihabMobile },
  intent: [
    "Forty-nine spacious apartments in the calm of Cité Founty, five minutes' walk from the Atlantic. Family-run, honestly priced, unmistakably Moroccan — and every competitor site in Agadir was selling that as five-star luxury it never claimed to be.",
    "The design leans into honesty instead: a navy, steel-blue and off-white palette that answers the building's own blue-and-white, a Fraunces serif that reads editorial rather than corporate, and photography left uncropped and unfiltered. The guest words on the page are real ones, staff named — Suleiman and Mahdi looked after us like family.",
    "Underneath it is a working reservation system, not a contact form: rooms, rates and availability live in Postgres, guests book straight from the site without an account, and the family manages rooms and reservations from an admin console behind a role check. It still never asks for a card.",
  ],
  designNotes:
    "Editorial serif, navy-and-cream, a booking bar that never leaves the viewport — and two languages that are not translations of each other.",
  fontshareUrl: "f[]=excon@400,500,600&f[]=tanker@400&f[]=telma@400,500&display=swap",
  palette: [
    { name: "Forest", value: "#153149", role: "Primary" },
    { name: "Forest deep", value: "#0D2033", role: "Mega-menu ground" },
    { name: "Sage", value: "#81A1BC", role: "Secondary" },
    { name: "Sage soft", value: "#CCCCCC", role: "Accent" },
    { name: "Cream", value: "#F7F6F0", role: "Page ground" },
    { name: "Sand", value: "#D5D5D5", role: "Dividers" },
    { name: "Ink", value: "#222222", role: "Body type" },
    { name: "Ink soft", value: "#555555", role: "Muted type" },
  ],
  type: [
    {
      role: "Title",
      family: "Fraunces",
      note: "Optical-size serif at weight 500 for the hero and every section heading, italic for the standfirst.",
      stack: '"Fraunces", Georgia, serif',
      weight: 500,
    },
    {
      role: "Display",
      family: "Tanker",
      note: "The heavier display cut behind h1–h4, set at -0.01em tracking.",
      stack: '"Tanker", "Fraunces", Georgia, serif',
      weight: 400,
    },
    {
      role: "Interface",
      family: "Excon",
      note: "The body grotesk for the booking bar and forms, with ss01 and cv01 stylistic sets on throughout.",
      stack: '"Excon", "Archivo", system-ui, sans-serif',
      weight: 500,
    },
    {
      role: "Accent",
      family: "Telma",
      note: "A calligraphic serif kept for the rare flourish, never for anything a guest must read to book.",
      stack: '"Telma", "Fraunces", Georgia, serif',
      weight: 400,
    },
  ],
  motion: [
    {
      title: "Slow hero settle",
      detail:
        "The hero image scales gently to rest while the standfirst fades up — a single breath before the booking bar arrives.",
    },
    {
      title: "Availability bar",
      detail:
        "Docked over the hero, then it detaches and sticks on scroll. On mobile it collapses to a tap-to-open sheet in the bottom safe area.",
    },
    {
      title: "Tone-aware language switch",
      detail:
        "The EN/FR toggle is sharp-cornered to match the header's square brand blocks, and restyles itself across three grounds — translucent white over the hero photo, forest ink on the scrolled cream bar, sage inside the dark forest mega-menu.",
    },
    {
      title: "Framed depth",
      detail:
        "Two shadow tokens do all the lifting: a deep --shadow-frame for hero and room imagery, a shallower --shadow-card for everything else.",
    },
    {
      title: "Two languages, not one translated twice",
      detail:
        "The French is written, not translated. It carries a warm Gadiri voice for French-speaking and Moroccan families, and the navigation is re-conceived rather than converted — 'Rihab' becomes 'La maison', 'Visit' becomes 'Nous trouver'.",
    },
  ],
  architecture: [
    "Hero with availability bar — check-in, check-out, guests, room type",
    "The house — 49 apartments, family-run, five minutes from the Atlantic",
    "Stay — double room, studio, 1-bedroom and 2-bedroom apartments, rates in MAD",
    "Comforts — pools & terrace, hammam & spa, restaurant & rooftop bar",
    "Gallery and real guest reviews, staff named",
    "Visit — Cité Founty, Agadir, and what to do nearby",
    "Reserve — dates, guests, nights and total priced live, no card required",
    "Admin console — rooms, rates, availability and reservations behind a role check",
  ],
  responsive: [
    "Desktop lays the availability bar as a five-field horizontal strip over the hero, with a dark forest mega-menu for the four nav groups.",
    "Tablet wraps the bar to two rows and keeps the search button full width.",
    "Mobile converts it to a single tap-to-open sheet pinned to the bottom safe area.",
  ],
  stack: ["React", "TanStack Start", "Tailwind v4", "Motion", "Lenis", "Supabase", "Vercel"],
};

const LUNJA_VIBES: WebDesignProject = {
  slug: "lunja-village-vibes",
  liveUrl: "https://lunja-village-vibes.vercel.app/",
  shots: { desktop: lunjaVibesDesktop, mobile: lunjaVibesMobile },
  intent: [
    "Ta parenthèse ensoleillée à Imi Ouaddar — thirty minutes from Agadir, apartments and bungalows, pools, live music and a genuinely good crowd.",
    "This is the loudest member of the Lunja family and the palette says so: coral against teal against a near-fluorescent yellow, all sitting on warm linen. Three saturated colours that should not work together, held apart by generous linen space and a heavy condensed display face.",
    "A hand-lettered script runs underneath as the human voice — used for asides and captions only, never for anything a guest has to read to book.",
  ],
  designNotes:
    "Coral, teal and chillout yellow on linen — three loud colours held together by space.",
  palette: [
    { name: "Coral", value: "#F25C2A", role: "Primary" },
    { name: "Teal", value: "#1E9E8A", role: "Secondary" },
    { name: "Teal deep", value: "#0F4A42", role: "Dark sections" },
    { name: "Yellow", value: "#FBF304", role: "Accent" },
    { name: "Linen", value: "#F4EFE4", role: "Page ground" },
    { name: "Ink", value: "#141010", role: "Type" },
  ],
  type: [
    {
      role: "Display",
      family: "Barlow Condensed",
      note: "Weight 900, condensed, set enormous. Headlines are meant to be read from across a beach.",
      stack: '"Barlow Condensed", system-ui, sans-serif',
      weight: 900,
    },
    {
      role: "Script",
      family: "Caveat Brush",
      note: "The village's handwriting — captions, asides, and the occasional arrow.",
      stack: '"Caveat Brush", cursive',
      weight: 400,
    },
    {
      role: "Body",
      family: "DM Sans",
      note: "Quiet, legible, and deliberately unremarkable so the colour does the talking.",
      stack: '"DM Sans", system-ui, sans-serif',
      weight: 400,
    },
  ],
  motion: [
    {
      title: "Ken Burns hero",
      detail:
        "The hero image runs a slow scale from 1.12 to 1.18 — never resting at 1, so the frame always feels alive under the type.",
    },
    {
      title: "Marquee band",
      detail:
        "A continuous yellow marquee of village words runs between sections on a pure CSS loop, no scroll listener and no JavaScript.",
    },
    {
      title: "Drift and float",
      detail:
        "Decorative elements wander on drift and float-y — a few pixels of translate plus a couple of degrees of rotate, offset per element so nothing beats in sync.",
    },
    {
      title: "Pop-in menu",
      detail:
        "Navigation items enter on menu-item-in with a per-item delay, and the gallery opens on lightbox-pop. The whole site animates in CSS keyframes — there is no motion library in the bundle.",
    },
  ],
  architecture: [
    "Hero — LUNJA VILLAGE, ouvert 7/7, à 5 min de l'océan",
    "Imi Ouaddar marquee band, open 7/7",
    "Piscines et jardins",
    "Live music",
    "Surf & yoga",
    "Les séjours, B&B inclus",
    "CHILLOUT — the bar, open 7/7",
    "Résa express — réponse sous 24 h",
  ],
  responsive: [
    "Desktop runs asymmetric colour-blocked sections with overlapping imagery.",
    "Tablet flattens the overlaps into a stacked rhythm, keeping the colour blocks full-bleed.",
    "Mobile turns the stay cards into a snap carousel and shrinks the display type to a two-line maximum.",
  ],
  stack: ["React", "TanStack Start", "Tailwind v4", "CSS animation", "Vercel"],
};

const SERENE: WebDesignProject = {
  slug: "lunja-taghazout-bay",
  liveUrl: "https://serene-ui-studio.vercel.app/",
  shots: { desktop: sereneDesktop, mobile: sereneMobile },
  intent: [
    "The same village, told for Taghazout Bay: surf, pools, bungalows and apartments from 1180 MAD a night, on a coastline that lives by the ocean's schedule.",
    "Where the Imi Ouaddar site shouts, this one is set at golden hour. The palette drops the coral and the teal and keeps sun yellow against ink on a bleached linen ground, with terracotta, olive and clay as the earth notes underneath.",
    "It is the calmest expression of the Lunja system — four keyframes of motion against the family's usual dozen — and it still carries the loud part: a lineup, a fan zone and a compte à rebours to the next date.",
  ],
  designNotes: "The golden-hour register of the Lunja system — sun yellow, ink, linen, olive.",
  palette: [
    { name: "Sun", value: "#FFE600", role: "Accent" },
    { name: "Ink", value: "#141010", role: "Primary" },
    { name: "Linen", value: "#F7F3E8", role: "Page ground" },
    { name: "Paper", value: "#EDE6D6", role: "Cards" },
    { name: "Terracotta", value: "#C46A45", role: "Focus ring" },
    { name: "Olive", value: "#6E7248", role: "Earth note" },
    { name: "Clay", value: "#D98C6A", role: "Earth note" },
  ],
  type: [
    {
      role: "Display",
      family: "Barlow Condensed",
      note: "Same condensed display as the family, dialled back a weight and given more air.",
      stack: '"Barlow Condensed", system-ui, sans-serif',
      weight: 800,
    },
    {
      role: "Script",
      family: "Caveat Brush",
      note: "Used only for surf-report style asides and the price-from callout.",
      stack: '"Caveat Brush", cursive',
      weight: 400,
    },
    {
      role: "Body",
      family: "DM Sans",
      note: "Set slightly larger and looser than its sister sites, matching the slower pace.",
      stack: '"DM Sans", system-ui, sans-serif',
      weight: 400,
    },
  ],
  motion: [
    {
      title: "Floating blobs",
      detail:
        "Soft background shapes drift on float-blob — a 20px translate paired with a 1.08 scale — the slowest, widest gesture in the family.",
    },
    {
      title: "Pulse to book",
      detail:
        "The reservation CTA carries pulse-book: a sun-yellow ring that expands to 18px and dissolves, the one insistent thing on an otherwise calm page.",
    },
    {
      title: "Marquee and wiggle",
      detail:
        "A looping marquee band between sections, and a ±2° wiggle on playful accents. The whole motion set is four keyframes — deliberately the smallest in the family, matching the slower register.",
    },
  ],
  architecture: [
    "Hero — un village, ouvert 7/7, au rythme de l'océan",
    "Le surf — Anchor Point, Devil's Rock and the Taghazout Bay breaks",
    "Choisis ton nid — bungalows et apparts, dès 1180 MAD",
    "Le village — tout est là",
    "Événements — en tête d'affiche et fan zone",
    "Compte à rebours to the next date",
    "Taghazout Bay et le type de séjour",
    "Un mot pour nous — réservation",
  ],
  responsive: [
    "Desktop uses a wide editorial split — image left, standfirst right — across alternating sections.",
    "Tablet stacks the split and keeps the imagery full-bleed to the gutter.",
    "Mobile collapses to a single column with the rate callout promoted above the fold.",
  ],
  stack: ["React", "TanStack Start", "Tailwind v4", "CSS animation", "Vercel"],
};

const CHILLOUT: WebDesignProject = {
  slug: "chillout-lounge",
  liveUrl: "https://chill-vibes-studio.vercel.app/",
  shots: { desktop: chilloutDesktop, mobile: chilloutMobile },
  intent: [
    "The lounge bar inside Lunja Village: live music, signature cocktails, tapas and sunset sessions facing the Atlantic, open 7/7 from 16h to 01h. One job — fill tonight.",
    "The palette is the golden-hour garden: sun-bleached linen, warm near-black, chillout yellow and a terracotta lifted straight from the market umbrellas on the terrace.",
    "Because the venue is loud and hand-made, the headlines carry a grunge speckle overlay — three layered radial gradients that put a print texture over solid type without a single image request.",
  ],
  designNotes: "Golden-hour garden palette with a CSS-only grunge overlay on the display type.",
  palette: [
    { name: "Chillout yellow", value: "#FFE600", role: "Primary" },
    { name: "Warm black", value: "#1A1410", role: "Secondary" },
    { name: "Linen", value: "#F4EFE4", role: "Page ground" },
    { name: "Aged paper", value: "#EDE8DC", role: "Cards" },
    { name: "Terracotta", value: "#D44B2A", role: "Accent" },
    { name: "Warm tan", value: "#C8BFA8", role: "Borders" },
  ],
  type: [
    {
      role: "Display",
      family: "Barlow Condensed",
      note: "Weight 900 with +0.02em tracking and a grunge speckle mask — print poster, not web header.",
      stack: '"Barlow Condensed", system-ui, sans-serif',
      weight: 900,
    },
    {
      role: "Script",
      family: "Caveat Brush",
      note: "Chalkboard voice for the nightly programme and cocktail notes.",
      stack: '"Caveat Brush", cursive',
      weight: 400,
    },
    {
      role: "Body",
      family: "DM Sans",
      note: "Menu items, times and the booking form.",
      stack: '"DM Sans", system-ui, sans-serif',
      weight: 400,
    },
  ],
  motion: [
    {
      title: "Grunge overlay",
      detail:
        "Three stacked radial-gradient speckle layers ride on top of headline type, animated by grain-drift walking the background-position a few pixels each way — full print texture, zero image weight.",
    },
    {
      title: "Ken Burns and sun particles",
      detail:
        "Hero imagery scales 1.12 to 1.18 while particle-float lifts sun motes 55px up the frame on a per-particle --drift offset.",
    },
    {
      title: "Polaroid bob",
      detail:
        "Photo cards rest at a --tilt angle and bob 8px on polaroid-bob, so the wall of pictures reads as pinned rather than placed.",
    },
    {
      title: "Shimmer and pulse",
      detail:
        "A yellow shimmer-sweep crosses the primary button from -100% to 140%, and the reserve CTA carries an 18px pulse-ring. All CSS keyframes — no motion library in the bundle.",
    },
  ],
  architecture: [
    "Hero — CHILL, open 7/7, 16h → 01h",
    "Events — what's on tonight",
    "Upcoming — the programme ahead",
    "Cocktails signature",
    "Tapas et sunset sessions face à l'Atlantique",
    "Réserve ta soirée",
  ],
  responsive: [
    "Desktop pairs the programme and the menu as a two-column editorial spread.",
    "Tablet stacks them and keeps the sunset imagery bleeding past the gutter.",
    "Mobile pins a reserve-tonight bar to the bottom safe area under the ticker.",
  ],
  stack: ["React", "TanStack Start", "Tailwind v4", "CSS animation", "Vercel"],
};

const VIBESCAPE: WebDesignProject = {
  slug: "chillout-social-club",
  liveUrl: "https://vibescape-hub.vercel.app/",
  shots: { desktop: vibescapeDesktop, mobile: vibescapeMobile },
  intent: [
    "Sunrise surf to sunset sets. The widest brief in the Lunja family — a surf hostel, a beer garden, a foodcourt and a day café, four venues that had to read as one social club without flattening into a directory.",
    "The answer was a single scroll structured as a day. The page moves through morning, afternoon and night, and each venue owns the moment it actually belongs to rather than a tab.",
    "Everything sits on an oklch palette so the warm neutrals stay perceptually even across the whole run, and the motion is pure CSS — a neon flicker on deliberately broken timing, a 40px reveal, and drift offsets so no two venues breathe together.",
  ],
  designNotes:
    "Four venues told as one day, on an oklch palette that holds its warmth as the page darkens.",
  palette: [
    { name: "Sun", value: "#F0E000", role: "Accent" },
    { name: "Ink", value: "#1C1512", role: "Primary" },
    { name: "Linen", value: "#F7F1E4", role: "Page ground" },
    { name: "Paper", value: "#FFFFFF", role: "Cards" },
    { name: "Terra", value: "#D8CCB9", role: "Secondary" },
    { name: "Muted", value: "#6B5F52", role: "Muted type" },
  ],
  type: [
    {
      role: "Display",
      family: "Barlow Condensed",
      note: "The family display face, used here to timestamp each part of the day.",
      stack: '"Barlow Condensed", system-ui, sans-serif',
      weight: 900,
    },
    {
      role: "Script",
      family: "Caveat Brush",
      note: "Venue nicknames and the surf-report tone of voice.",
      stack: '"Caveat Brush", cursive',
      weight: 400,
    },
    {
      role: "Body",
      family: "DM Sans",
      note: "Opening hours, menus and hostel rates across four venues.",
      stack: '"DM Sans", system-ui, sans-serif',
      weight: 400,
    },
  ],
  motion: [
    {
      title: "Neon flicker",
      detail:
        "The sign type runs flicker on deliberately irregular stops — 18%, 22%, 25%, 53%, 57% — dropping opacity and killing its sun-yellow text-shadow for a frame. Broken-tube timing, not a smooth pulse.",
    },
    {
      title: "Reveal up",
      detail:
        "Sections enter on reveal-up, a 40px rise out of zero opacity, applied per block so the day reads as a sequence.",
    },
    {
      title: "Drift, float and wiggle",
      detail:
        "Decorative elements wander on drift and float-slow (-14px) and tilt ±3° on wiggle, each offset so the four venues never pulse together.",
    },
    {
      title: "Pulse ring and marquee",
      detail:
        "CTAs expand an 18px sun-yellow ring, and a looping marquee band ties the venues together. Every one of these is a CSS keyframe — the site ships no motion library at all.",
    },
  ],
  architecture: [
    "Hero — IT'S ON! Sunrise surf to sunset sets",
    "Sunrise to last call — the day, end to end",
    "The Hostel — beds and dawn patrol",
    "The Garden — beer garden and lounge nights",
    "A playground — foodcourt and day café on the sand",
    "Book the Wild",
    "Contact",
  ],
  responsive: [
    "Desktop runs the day as a continuous vertical scroll with venues alternating left and right.",
    "Tablet centres the venues and keeps the day-cycle gradient intact.",
    "Mobile compresses each venue to a full-viewport panel so the day still reads as a sequence.",
  ],
  stack: ["React", "TanStack Start", "Tailwind v4", "CSS animation", "Vercel"],
};

const ONE_RETAIL: WebDesignProject = {
  slug: "one-retail",
  liveUrl: "https://one--retail.vercel.app/",
  shots: { desktop: oneRetailDesktop, mobile: oneRetailMobile },
  intent: [
    "One Retail is the retail arm of Morocco's H&S Group, bringing Franprix, Monopoly, Venezia-Ice, BeautyForYou, Mr.Le Bricolage, Flormar and Dahab under one maison. The brief was to make a holding feel like a destination, not a portfolio of logos.",
    "The system runs on a warm editorial pairing that reads comme un grand magasin: brick and wine-deep reds against pearl cream, with Averia Serif Libre carrying the headlines and Righteous handling the labels. The cream is the page ground, the red is the action, and near-black ink keeps the institutional weight.",
    "The centrepiece is a living ecosystem explorer, hover and tap through the group's entities and sectors, so the architecture itself tells the consolidation story. A president's word, four activity pillars, five values and the newsroom complete a page that sells the group as a single sensory experience.",
  ],
  designNotes:
    "Brick, pearl and wine on cream, an editorial retail maison for Morocco's H&S Group.",
  palette: [
    { name: "Brick", value: "#AB2D26", role: "Primary / action" },
    { name: "Wine deep", value: "#640705", role: "Deep CTAs" },
    { name: "Wine", value: "#8B1A1A", role: "Focus / scrollbar" },
    { name: "Ember", value: "#C93A30", role: "Borders / highlights" },
    { name: "Pearl", value: "#F5F0E6", role: "Page ground" },
    { name: "Pearl deep", value: "#ECE4D3", role: "Soft surfaces" },
    { name: "Ink", value: "#1A1A1A", role: "Type" },
    { name: "Ink soft", value: "#3B3431", role: "Muted type" },
  ],
  type: [
    {
      role: "Display",
      family: "Averia Serif Libre",
      note: "A warm, softly-rounded serif for headlines, set tight with ss01 features on. The maison speaks in print.",
      stack: '"Averia Serif Libre", Georgia, serif',
      weight: 700,
    },
    {
      role: "Label",
      family: "Righteous",
      note: "A chunky display grotesk reserved for eyebrows and marquee bands, wide-tracked and always uppercase.",
      stack: '"Righteous", "Inter", system-ui, sans-serif',
      weight: 400,
    },
    {
      role: "Body",
      family: "Inter",
      note: "The workhorse for copy, nav and cards, quiet enough to let the serif own the page.",
      stack: '"Inter", system-ui, sans-serif',
      weight: 400,
    },
  ],
  motion: [
    {
      title: "Sensory marquee",
      detail:
        "A 32-second linear marquee of the group's brand logos runs across the ecosystem band, paused on hover — the one continuous gesture that says the whole is bigger than any single enseigne.",
    },
    {
      title: "Scroll reveal",
      detail:
        "Every section enters on a shared IntersectionObserver reveal with spring easing (cubic-bezier(0.22, 1, 0.36, 1)), so the page assembles itself as it is read.",
    },
    {
      title: "Slow hero settle",
      detail:
        "The hero imagery drifts from scale 1.15 down to rest under a vignette scrim, keeping the headline legible over any photography.",
    },
    {
      title: "Group hover",
      detail:
        "Cards lift, arrows translate, images scale to 1.05 and links warm to brick on group-hover — motion that answers the cursor without ever upstaging the cream.",
    },
  ],
  architecture: [
    "Hero — Au cœur du commerce marocain moderne, with Découvrir",
    "Qui sommes-nous ? — One Retail, filiale de H&S Group",
    "L'écosystème — hover-to-explore entity map of the group",
    "Mot du Président — Moncef Belkhayat on a modern Moroccan retail",
    "Nos Domaines d'Activité — Lifestyle, Beauty, Restauration, Bricolage",
    "Nos Valeurs — Ownership, Agility, Simplicity, Integrity, Sustainability",
    "Ambitions & Missions — the four growth pillars",
    "Actualités — the group newsroom",
    "Contact — Parlons de votre projet retail",
  ],
  responsive: [
    "Desktop runs the full-bleed hero and a four-column domain grid, with the ecosystem explorer on a 12-column hover map.",
    "Tablet collapses the ecosystem explorer to a simpler grid and the domains to two-up.",
    "Mobile swaps hover for tap-to-explore on the ecosystem, stacks the domains, and shrinks the logo marquee heights.",
  ],
  stack: ["React 19", "React Router", "Vite", "Tailwind v4", "Framer Motion", "Vercel"],
};

const DROGUERIE_SOUSS: WebDesignProject = {
  slug: "droguerie-souss",
  liveUrl: "https://droguerie-souss.vercel.app/",
  shots: { desktop: droguerieSoussDesktop, mobile: droguerieSoussMobile },
  intent: [
    "Souss Droguerie is a twenty-year-old building-materials house in Agadir: carrelage, marbre, peinture, ciment, plâtre, électricité, plomberie and quincaillerie, delivered fast across the Souss. The brief was a shop that feels like a builder's merchant — competent, quick, and honest about stock.",
    "The palette answers the trade: deep indigo for the brand and CTAs, near-black ink for hero and footer, white and cool lavender surfaces for the shop, and a single crimson reserved for every action. Fraunces sets the headings in uppercase like painted signage, Inter carries the catalogue, and IBM Plex Mono handles prices and specs.",
    "A hero running real footage of the yard leads into eight category cards, best-sellers, and a partner marquee of LAFARGE, Holcim, Schneider, Legrand, Grohe and KNAUF. A devis banner and a floating WhatsApp button complete a funnel aimed at one outcome: a phone call within 24 hours.",
  ],
  designNotes: "Indigo, ink and crimson on white, a builder's merchant that means business.",
  palette: [
    { name: "Paper", value: "#FFFFFF", role: "Page ground" },
    { name: "Ink", value: "#30313D", role: "Type / hero / footer" },
    { name: "Brand", value: "#2F378D", role: "Primary / CTAs" },
    { name: "Brand secondary", value: "#202560", role: "Deep brand shade" },
    { name: "Cream", value: "#F3F3F8", role: "Alt section ground" },
    { name: "Mint", value: "#DDDFEC", role: "Secondary surfaces" },
    { name: "Sky", value: "#8E93C3", role: "Eyebrows on dark" },
    { name: "Accent red", value: "#B8001F", role: "Action only" },
    { name: "WhatsApp", value: "#25D366", role: "Contact FAB" },
  ],
  type: [
    {
      role: "Display",
      family: "Fraunces",
      note: "Uppercase serif headings with tight leading, like painted merchant signage over the yard.",
      stack: '"Fraunces", "Iowan Old Style", Georgia, serif',
      weight: 700,
    },
    {
      role: "Body",
      family: "Inter",
      note: "The catalogue workhorse for categories, products and nav, bold and wide-tracked on buttons.",
      stack: '"Inter", system-ui, sans-serif',
      weight: 500,
    },
    {
      role: "Data",
      family: "IBM Plex Mono",
      note: "Mono accents for prices, references and specifications — the parts of the page a buyer reads like an invoice.",
      stack: '"IBM Plex Mono", "SFMono-Regular", Menlo, monospace',
      weight: 400,
    },
  ],
  motion: [
    {
      title: "Preloader stamp",
      detail:
        "A paper preloader with the logo scales in from 0.6 under a pinging red frame, so the store declares itself before a single tile renders.",
    },
    {
      title: "Ken Burns hero",
      detail:
        "Real footage of the yard drifts from scale 1.08 down to rest under a left-to-right ink gradient, keeping the headline legible over the video.",
    },
    {
      title: "Partner marquee",
      detail:
        "An infinite LAFARGE-to-KNAUF logo strip runs at 4s on mobile and 10s on desktop, grayscale until hover, paused under the cursor.",
    },
    {
      title: "Hide-on-scroll header",
      detail:
        "The sticky header slides up 80px on scroll and returns on scroll-up, so the catalogue gets the full viewport while the cart stays one tap away.",
    },
    {
      title: "WhatsApp FAB",
      detail:
        "A green chat button with a pinging halo and an expanding Discuter sur WhatsApp label pins to the bottom-right safe area on every page.",
    },
  ],
  architecture: [
    "Utility bar — Livraison rapide dans tout le Souss · Devis gratuit sous 24h",
    "Sticky header — logo, nav, phone, cart",
    "Hero — video, Bâtissez avec les meilleurs matériaux, two CTAs",
    "Nos rayons — Toutes les catégories, eight trade cards",
    "Best-sellers — Nos produits populaires",
    "Nos fournisseurs partenaires — infinite partner marquee",
    "Notre catalogue — Découvrez nos produits",
    "CTA banner — Recevez votre devis gratuit en 24h",
    "Footer + WhatsApp FAB",
  ],
  responsive: [
    "Desktop runs the full-width hero video, a four-up category grid and the 10-second partner marquee.",
    "Tablet drops the categories to two-up and collapses the utility bar into the header.",
    "Mobile swaps nav for a hamburger, speeds the marquee to 4s, and pins the WhatsApp FAB into the bottom safe area.",
  ],
  stack: ["React 19", "TanStack Start", "Vite", "Tailwind v4", "Lucide", "Supabase", "Vercel"],
};

const WEB_DESIGN_BY_SLUG: Record<string, WebDesignProject> = {
  orsen: ORSEN,
  "lithos-materiaux": LITHOS,
  "rihab-residence": RIHAB,
  "lunja-village-vibes": LUNJA_VIBES,
  "lunja-taghazout-bay": SERENE,
  "chillout-lounge": CHILLOUT,
  "chillout-social-club": VIBESCAPE,
  "one-retail": ONE_RETAIL,
  "droguerie-souss": DROGUERIE_SOUSS,
};

export function getWebDesignProject(slug: string): WebDesignProject | undefined {
  return WEB_DESIGN_BY_SLUG[slug];
}
