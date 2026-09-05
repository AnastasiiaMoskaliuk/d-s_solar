import type { StaticImageData } from "next/image";

import image1 from "@/src/projekte/projekt1/1.jpg";
import image2 from "@/src/projekte/projekt1/2.jpg";
import image3 from "@/src/projekte/projekt1/3.jpg";
import image4 from "@/src/projekte/projekt1/4.jpg";
import image5 from "@/src/projekte/projekt1/5.jpg";

export type ImageData = {
  originalSrc: StaticImageData;
  alt: string;
};

export type ProjectParagraph = {
  id: string;
  type: "text" | "image" | "list" | "quote";
  text: string | null;
  subheading: string | null;
  image: {
    originalSrc: StaticImageData;
    alt?: string;
    width?: number;
    height?: number;
  } | null;
};


export interface SolarProject {
  id: number;
  handle: string;

  title: string;
  shortTitle?: string;

  location: string;
  date?: string;

images: ImageData[];

  power?: string;
  panels?: number;
  panelType?: string;

  inverter?: string;
  battery?: string;

  roofType?: string;
  installationTime?: string;

  description: string;
  details?: string;

  features?: string[];

    paragraphs?: ProjectParagraph[];
}

export const projectsData: SolarProject[] = [
  {
    id: 1,
    handle: "photovoltaikanlage-einfamilienhaus-werdau",

    title: "Photovoltaikanlage für ein Einfamilienhaus",
    shortTitle: "Einfamilienhaus in Werdau",

    location: "Werdau",
    date: "August 2026",

    images: [
      {
        originalSrc: image1,
        alt: "Solaranlage auf einem Dach",
      },
      {
        originalSrc: image2,
        alt: "Solarmodule auf dem Dach",
      },
      {
        originalSrc: image3,
        alt: "Photovoltaikanlage",
      },
      {
        originalSrc: image4,
        alt: "Solaranlage Detailansicht",
      },
      {
        originalSrc: image5,
        alt: "Fertige Solaranlage",
      },
    ],

    power: "10 kWp",
    panels: 24,
    panelType: "Monokristalline Solarmodule",

    inverter: "Hybrid-Wechselrichter",
    battery: "10 kWh Batteriespeicher",

    roofType: "Satteldach",
    installationTime: "2 Tage",

    description:
      "Moderne Photovoltaikanlage für ein Einfamilienhaus zur effizienten Nutzung der Sonnenenergie.",

    details:
      "Für dieses Einfamilienhaus wurde eine individuell geplante Photovoltaikanlage installiert. Die Anlage nutzt die verfügbare Dachfläche optimal und ermöglicht dem Kunden eine nachhaltige und zuverlässige Energieversorgung.",

    features: [
      "24 Solarmodule",
      "10 kWp Anlagenleistung",
      "10 kWh Batteriespeicher",
      "Hybrid-Wechselrichter",
      "Optimale Dachflächennutzung",
    ],
    
paragraphs: [
  {
    id: "description",
    type: "text",
    subheading: "Über das Projekt",
    text: "Für ein Einfamilienhaus in Werdau wurde eine moderne Photovoltaikanlage geplant und installiert. Ziel des Projekts war es, die vorhandene Dachfläche optimal zu nutzen und gleichzeitig eine zuverlässige und nachhaltige Energieversorgung für den Haushalt zu schaffen.",
    image: null,
  },

  {
    id: "planning",
    type: "text",
    subheading: "Planung und Vorbereitung",
    text: "Zu Beginn des Projekts wurde die vorhandene Dachfläche sorgfältig analysiert. Dabei wurden die Größe und Ausrichtung des Daches, die verfügbare Fläche sowie die technischen Voraussetzungen berücksichtigt. Auf dieser Grundlage wurde eine individuelle Lösung entwickelt, die optimal auf die Anforderungen des Einfamilienhauses abgestimmt ist.",
    image: null,
  },

  {
    id: "installation",
    type: "text",
    subheading: "Installation der Photovoltaikanlage",
    text: "Auf dem Satteldach wurden insgesamt 24 monokristalline Solarmodule installiert. Die Module wurden so angeordnet, dass die verfügbare Dachfläche möglichst effizient genutzt werden kann. Die fachgerechte Montage sorgt für eine stabile Konstruktion und eine langfristig zuverlässige Nutzung der Anlage.",
    image: null,
  },

  {
    id: "technology",
    type: "text",
    subheading: "Technische Lösung",
    text: "Die installierte Photovoltaikanlage verfügt über eine Leistung von 10 kWp und wurde mit einem modernen Hybrid-Wechselrichter ausgestattet. Zusätzlich wurde ein Batteriespeicher mit einer Kapazität von 10 kWh integriert. Dadurch kann ein Teil der erzeugten Solarenergie gespeichert und zu einem späteren Zeitpunkt genutzt werden.",
    image: null,
  },

  {
    id: "energy",
    type: "text",
    subheading: "Effiziente Nutzung der Solarenergie",
    text: "Durch die Kombination aus Photovoltaikanlage, Hybrid-Wechselrichter und Batteriespeicher kann die erzeugte Energie besonders effizient genutzt werden. Überschüssige Energie muss nicht sofort verbraucht werden, sondern kann im Batteriespeicher zwischengespeichert und bei Bedarf wieder zur Verfügung gestellt werden.",
    image: null,
  },

  {
    id: "features",
    type: "list",
    subheading: "Projektdetails",
    text: "24 monokristalline Solarmodule\n10 kWp Anlagenleistung\n10 kWh Batteriespeicher\nModerner Hybrid-Wechselrichter\nOptimale Nutzung der vorhandenen Dachfläche\nSatteldach\nProfessionelle Installation innerhalb von 2 Tagen",
    image: null,
  },

  {
    id: "result",
    type: "text",
    subheading: "Das Ergebnis",
    text: "Mit der neuen Photovoltaikanlage verfügt das Einfamilienhaus über eine moderne Lösung zur eigenen Stromerzeugung. Die Kombination aus leistungsstarken Solarmodulen und Batteriespeicher ermöglicht eine flexible Nutzung der erzeugten Solarenergie und schafft eine solide Grundlage für eine nachhaltigere Energieversorgung.",
    image: null,
  },

  {
    id: "conclusion",
    type: "text",
    subheading: "Nachhaltige Energie für die Zukunft",
    text: "Das Projekt zeigt, wie sich eine bestehende Dachfläche sinnvoll für die Nutzung erneuerbarer Energien einsetzen lässt. Durch die individuelle Planung und professionelle Umsetzung wurde eine zuverlässige Photovoltaiklösung geschaffen, die langfristig zur Nutzung von Solarenergie im eigenen Zuhause beiträgt.",
    image: null,
  },
],
  },

//   {
//     id: 2,
//     handle: "solaranlage-wohnhaus-zwickau",

//     title: "Solaranlage auf einem modernen Wohnhaus",
//     shortTitle: "Wohnhaus in Zwickau",

//     location: "Zwickau",
//     date: "Juli 2026",

//     images: [
//       "/images/projects/project-2/1.jpg",
//       "/images/projects/project-2/2.jpg",
//       "/images/projects/project-2/3.jpg",
//     ],

//     power: "8 kWp",
//     panels: 20,
//     panelType: "Monokristalline Solarmodule",

//     inverter: "Wechselrichter",
//     battery: "8 kWh Batteriespeicher",

//     roofType: "Satteldach",
//     installationTime: "2 Tage",

//     description:
//       "Effiziente Solarlösung für ein modernes Wohnhaus mit dem Ziel, den Eigenverbrauch zu erhöhen.",

//     details:
//       "Bei diesem Projekt wurde eine leistungsstarke Photovoltaikanlage installiert, die speziell auf den Energiebedarf des Haushalts abgestimmt wurde.",

//     features: [
//       "20 Solarmodule",
//       "8 kWp Anlagenleistung",
//       "8 kWh Batteriespeicher",
//       "Hoher Eigenverbrauch",
//       "Moderne Installation",
//     ],
//   },

//   {
//     id: 3,
//     handle: "photovoltaikanlage-sachsen",

//     title: "Photovoltaikanlage für nachhaltige Energie",
//     shortTitle: "Photovoltaikanlage in Sachsen",

//     location: "Sachsen",
//     date: "Juni 2026",

//     images: [
//       "/images/projects/project-3/1.jpg",
//       "/images/projects/project-3/2.jpg",
//       "/images/projects/project-3/3.jpg",
//     ],

//     power: "12 kWp",
//     panels: 28,
//     panelType: "Monokristalline Solarmodule",

//     inverter: "Hybrid-Wechselrichter",
//     battery: "12 kWh Batteriespeicher",

//     roofType: "Satteldach",
//     installationTime: "3 Tage",

//     description:
//       "Leistungsstarke Photovoltaikanlage für eine langfristige und nachhaltige Energieversorgung.",

//     details:
//       "Die Anlage wurde individuell geplant und optimal auf die vorhandene Dachfläche sowie den Energiebedarf des Kunden abgestimmt.",

//     features: [
//       "28 Solarmodule",
//       "12 kWp Anlagenleistung",
//       "12 kWh Batteriespeicher",
//       "Hybrid-System",
//       "Individuelle Planung",
//     ],
//   },
];