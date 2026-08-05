import bopassage from "@/assets/bopassage.png";
import dmc from "@/assets/dmc.png";
import educazenKids from "@/assets/educazenkids.png";
import eidenAcademyLogo from "@/assets/eiden-academy-logo.png";
import lunjaVillage from "@/assets/lunja-village.png";
import onereetail from "@/assets/onereetail.png";
import sous_drougrie from "@/assets/souss-drougerie.png";

export type Client = {
  name: string;
  logo: string;
};

export const eidenClients: Client[] = [
  { name: "Bôpassage", logo: bopassage },
  { name: "DMC Hospitality Morocco", logo: dmc },
  { name: "EducazenKids", logo: educazenKids },
  { name: "Lunja Village", logo: lunjaVillage },
  { name: "OneRetail", logo: onereetail },
  { name: "Sous Drougrie", logo: sous_drougrie },

];
