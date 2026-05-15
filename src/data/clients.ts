import allAccor from "@/assets/All Accor.png";
import anisal from "@/assets/anisal.png";
import bopassage from "@/assets/bopassage.png";
import cabinet from "@/assets/cabinet.png";
import chillOut from "@/assets/chill-out.png";
import dmc from "@/assets/dmc.png";
import educazenKids from "@/assets/educazenkids.png";
import lunjaVillage from "@/assets/lunja-village.png";
import madaef from "@/assets/madaef.png";
import medicalBay from "@/assets/medical-bay.png";

export type Client = {
  name: string;
  logo: string;
};

export const eidenClients: Client[] = [
  { name: "All Accor", logo: allAccor },
  { name: "Anisal", logo: anisal },
  { name: "BoPassage", logo: bopassage },
  { name: "Cabinet", logo: cabinet },
  { name: "Chill Out", logo: chillOut },
  { name: "DMC", logo: dmc },
  { name: "EducazenKids", logo: educazenKids },
  { name: "Lunja Village", logo: lunjaVillage },
  { name: "Madaef", logo: madaef },
  { name: "Medical Bay", logo: medicalBay },
];
