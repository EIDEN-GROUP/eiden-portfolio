import bopassage from "@/assets/bopassage.png";
import dmc from "@/assets/dmc.png";
import educazenKids from "@/assets/educazenkids.png";
import lunjaVillage from "@/assets/lunja-village.png";

/** Wordmark placeholder until a dedicated Academy lockup asset ships (footer expects dark marks on transparent). */
const eidenAcademyLogo =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 36"><text x="0" y="26" fill="#111" font-family="system-ui,sans-serif" font-size="20" font-weight="600" letter-spacing="-0.02em">Eiden Academy</text></svg>`,
  );

export type Client = {
  name: string;
  logo: string;
};

export const eidenClients: Client[] = [
  { name: "Bôpassage", logo: bopassage },
  { name: "DMC", logo: dmc },
  { name: "EducazenKids", logo: educazenKids },
  { name: "Eiden Academy", logo: eidenAcademyLogo },
  { name: "Lunja Village", logo: lunjaVillage },
];
