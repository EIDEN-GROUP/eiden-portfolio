import bopassage from "@/assets/bopassage.png";
import dmc from "@/assets/dmc.png";
import educazenKids from "@/assets/educazenkids.png";
import eidenAcademyLogo from "@/assets/eiden-academy-logo.png";
import lunjaVillage from "@/assets/lunja-village.png";

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
