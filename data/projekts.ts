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
{
  id: 2,
  handle: "photovoltaikanlage-doppelhaus-crimmitschau2",

  title: "Photovoltaikanlage für ein modernes Doppelhaus",
  shortTitle: "Doppelhaus in Crimmitschau",

  location: "Crimmitschau",
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

  power: "13,2 kWp",
  panels: 30,
  panelType: "Monokristalline Solarmodule",

  inverter: "Hybrid-Wechselrichter 12 kW",
  battery: "13,5 kWh Batteriespeicher",

  roofType: "Satteldach",
  installationTime: "3 Tage",

  description:
    "Leistungsstarke Photovoltaikanlage für ein modernes Doppelhaus mit integriertem Batteriespeicher.",

  details:
    "Für ein modernes Doppelhaus in Crimmitschau wurde eine individuell geplante Photovoltaikanlage mit 30 Solarmodulen realisiert. Die Anlage wurde auf die Größe der Dachfläche und den erhöhten Energiebedarf des Gebäudes abgestimmt.",

  features: [
    "30 Solarmodule",
    "13,2 kWp Anlagenleistung",
    "13,5 kWh Batteriespeicher",
    "12 kW Hybrid-Wechselrichter",
    "Optimale Nutzung der Dachfläche",
  ],

  paragraphs: [
    {
      id: "description",
      type: "text",
      subheading: "Über das Projekt",
      text: "Für ein modernes Doppelhaus in Crimmitschau wurde eine leistungsstarke Photovoltaikanlage geplant und installiert. Aufgrund des höheren Energiebedarfs wurde die Anlage entsprechend dimensioniert, um eine effiziente Nutzung der verfügbaren Dachfläche zu ermöglichen.",
      image: null,
    },

    {
      id: "planning",
      type: "text",
      subheading: "Planung der Photovoltaikanlage",
      text: "Vor Beginn der Montage wurde die Dachfläche detailliert analysiert. Die Größe und Ausrichtung des Satteldaches sowie der erwartete Strombedarf wurden bei der Planung berücksichtigt. Dadurch konnte eine passende Modulaufteilung für das Gebäude entwickelt werden.",
      image: null,
    },

    {
      id: "installation",
      type: "text",
      subheading: "Montage der Solarmodule",
      text: "Auf dem Satteldach wurden insgesamt 30 monokristalline Solarmodule installiert. Die Module wurden gleichmäßig angeordnet und fachgerecht befestigt. Die komplette Montage der Photovoltaikanlage wurde innerhalb von drei Tagen durchgeführt.",
      image: null,
    },

    {
      id: "technology",
      type: "text",
      subheading: "Technische Ausstattung",
      text: "Die Anlage verfügt über eine Gesamtleistung von 13,2 kWp und wurde mit einem modernen Hybrid-Wechselrichter mit 12 kW Leistung ausgestattet. Dadurch kann der erzeugte Solarstrom effizient umgewandelt und für die verschiedenen Verbraucher im Gebäude bereitgestellt werden.",
      image: null,
    },

    {
      id: "storage",
      type: "text",
      subheading: "Energiespeicher",
      text: "Ein Batteriespeicher mit einer Kapazität von 13,5 kWh ergänzt die Photovoltaikanlage. Überschüssiger Solarstrom kann gespeichert und zu einem späteren Zeitpunkt genutzt werden. Dadurch wird die Nutzung der selbst erzeugten Energie noch flexibler.",
      image: null,
    },

    {
      id: "features",
      type: "list",
      subheading: "Projektdetails",
      text: "30 monokristalline Solarmodule\n13,2 kWp Anlagenleistung\n13,5 kWh Batteriespeicher\n12 kW Hybrid-Wechselrichter\nSatteldach\nOptimierte Modulaufteilung\nInstallation innerhalb von 3 Tagen",
      image: null,
    },

    {
      id: "result",
      type: "text",
      subheading: "Das Ergebnis",
      text: "Nach Abschluss der Arbeiten verfügt das Doppelhaus über eine moderne Photovoltaikanlage mit leistungsfähiger Speichertechnik. Die Anlage ermöglicht eine effiziente Nutzung der verfügbaren Dachfläche und unterstützt die Versorgung des Gebäudes mit selbst erzeugtem Solarstrom.",
      image: null,
    },

    {
      id: "conclusion",
      type: "text",
      subheading: "Nachhaltige Energie für das Doppelhaus",
      text: "Durch die Kombination aus 30 Solarmodulen, Hybrid-Wechselrichter und Batteriespeicher wurde eine moderne Energielösung geschaffen. Das Projekt zeigt, wie sich größere Wohngebäude mit einer individuell geplanten Photovoltaikanlage effizient mit Solarenergie versorgen lassen.",
      image: null,
    },
  ],
},

{
  id: 3,
  handle: "photovoltaikanlage-einfamilienhaus-werdau3",

  title: "Effiziente Solaranlage für ein Wohnhaus",
  shortTitle: "Wohnhaus in Werdau",

  location: "Werdau",
  date: "Juli 2026",

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

  power: "8,5 kWp",
  panels: 20,
  panelType: "Monokristalline Solarmodule",

  inverter: "Wechselrichter 8 kW",
  battery: "7,5 kWh Batteriespeicher",

  roofType: "Satteldach",
  installationTime: "2 Tage",

  description:
    "Kompakte Photovoltaikanlage für ein Wohnhaus mit Fokus auf hohen Eigenverbrauch und effiziente Energienutzung.",

  details:
    "Bei diesem Projekt wurde eine kompakte Photovoltaikanlage für ein Wohnhaus in Werdau realisiert. Die Anlage wurde so dimensioniert, dass die verfügbare Dachfläche sinnvoll genutzt und möglichst viel Solarstrom direkt im Haushalt verwendet werden kann.",

  features: [
    "20 Solarmodule",
    "8,5 kWp Anlagenleistung",
    "7,5 kWh Batteriespeicher",
    "8 kW Wechselrichter",
    "Kompakte Dachflächenlösung",
  ],

  paragraphs: [
    {
      id: "description",
      type: "text",
      subheading: "Über das Projekt",
      text: "Für ein Wohnhaus in Werdau wurde eine kompakte Photovoltaikanlage zur eigenen Stromerzeugung umgesetzt. Dabei stand eine effiziente Nutzung der vorhandenen Dachfläche im Mittelpunkt der Planung.",
      image: null,
    },

    {
      id: "analysis",
      type: "text",
      subheading: "Analyse der Dachfläche",
      text: "Im ersten Schritt wurde die Dachfläche vermessen und hinsichtlich ihrer Ausrichtung und nutzbaren Fläche analysiert. Auf Basis dieser Daten wurde die Anzahl und Position der Solarmodule festgelegt.",
      image: null,
    },

    {
      id: "installation",
      type: "text",
      subheading: "Installation der Anlage",
      text: "Insgesamt wurden 20 monokristalline Solarmodule auf dem Satteldach installiert. Die Module wurden entsprechend der Dachgeometrie angeordnet, um eine möglichst gleichmäßige und effiziente Stromerzeugung zu ermöglichen.",
      image: null,
    },

    {
      id: "inverter",
      type: "text",
      subheading: "Wechselrichter und Energieverteilung",
      text: "Für die Anlage wurde ein moderner Wechselrichter mit einer Leistung von 8 kW eingesetzt. Dieser übernimmt die Umwandlung des erzeugten Solarstroms und ermöglicht eine zuverlässige Versorgung der elektrischen Verbraucher im Haushalt.",
      image: null,
    },

    {
      id: "storage",
      type: "text",
      subheading: "Speicherung der Solarenergie",
      text: "Ein Batteriespeicher mit einer Kapazität von 7,5 kWh ergänzt die Photovoltaikanlage. Nicht sofort benötigte Energie kann gespeichert und zu einem späteren Zeitpunkt wieder verwendet werden.",
      image: null,
    },

    {
      id: "features",
      type: "list",
      subheading: "Projektdetails",
      text: "20 monokristalline Solarmodule\n8,5 kWp Anlagenleistung\n7,5 kWh Batteriespeicher\n8 kW Wechselrichter\nSatteldach\nEffiziente Nutzung der Dachfläche\nMontage innerhalb von 2 Tagen",
      image: null,
    },

    {
      id: "result",
      type: "text",
      subheading: "Das Ergebnis",
      text: "Die neue Photovoltaikanlage ermöglicht dem Haushalt eine direkte Nutzung des selbst erzeugten Solarstroms. Durch den Batteriespeicher kann zusätzlich ein Teil der Energie für die spätere Nutzung bereitgestellt werden.",
      image: null,
    },

    {
      id: "conclusion",
      type: "text",
      subheading: "Effiziente Energienutzung",
      text: "Das Projekt zeigt, dass auch eine begrenzte Dachfläche effektiv für die Nutzung von Solarenergie eingesetzt werden kann. Die Anlage verbindet eine kompakte Bauweise mit einer modernen technischen Lösung.",
      image: null,
    },
  ],
},

{
  id: 4,
  handle: "photovoltaikanlage-gebaeude-werdau4",

  title: "Photovoltaikanlage für ein modernes Wohngebäude",
  shortTitle: "Wohngebäude in Werdau",

  location: "Werdau",
  date: "Juni 2026",

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

  power: "12 kWp",
  panels: 28,
  panelType: "Monokristalline Solarmodule",

  inverter: "Hybrid-Wechselrichter 10 kW",
  battery: "12 kWh Batteriespeicher",

  roofType: "Walmdach",
  installationTime: "3 Tage",

  description:
    "Leistungsstarke Photovoltaikanlage für ein modernes Wohngebäude mit großem Batteriespeicher.",

  details:
    "Für dieses Wohngebäude in Werdau wurde eine leistungsstarke Photovoltaikanlage mit 28 Solarmodulen umgesetzt. Die Anlage wurde mit einem Hybrid-Wechselrichter und einem großzügig dimensionierten Batteriespeicher ausgestattet.",

  features: [
    "28 Solarmodule",
    "12 kWp Anlagenleistung",
    "12 kWh Batteriespeicher",
    "10 kW Hybrid-Wechselrichter",
    "Walmdach",
  ],

  paragraphs: [
    {
      id: "description",
      type: "text",
      subheading: "Über das Projekt",
      text: "Bei diesem Projekt wurde ein modernes Wohngebäude in Werdau mit einer leistungsstarken Photovoltaikanlage ausgestattet. Ziel war es, die verfügbare Dachfläche für die Erzeugung von Solarstrom möglichst effizient zu nutzen.",
      image: null,
    },

    {
      id: "planning",
      type: "text",
      subheading: "Planung der Anlage",
      text: "Aufgrund der Form des Walmdaches wurde die Anordnung der Module sorgfältig geplant. Dabei wurde darauf geachtet, die verschiedenen Dachflächen sinnvoll zu nutzen und eine harmonische Anordnung der Solarmodule zu erreichen.",
      image: null,
    },

    {
      id: "installation",
      type: "text",
      subheading: "Installation auf dem Walmdach",
      text: "Insgesamt wurden 28 monokristalline Solarmodule installiert. Die Montage erfolgte fachgerecht auf den vorgesehenen Dachflächen und wurde innerhalb von drei Tagen abgeschlossen.",
      image: null,
    },

    {
      id: "technology",
      type: "text",
      subheading: "Leistungsstarke Technik",
      text: "Die Anlage verfügt über eine Leistung von 12 kWp und wurde mit einem modernen Hybrid-Wechselrichter mit 10 kW Leistung ausgestattet. Dadurch können die erzeugten Energiemengen zuverlässig verarbeitet und im Haushalt genutzt werden.",
      image: null,
    },

    {
      id: "battery",
      type: "text",
      subheading: "Großer Batteriespeicher",
      text: "Ein 12 kWh Batteriespeicher ermöglicht die Speicherung überschüssiger Solarenergie. Dadurch kann mehr der selbst erzeugten Energie auch dann genutzt werden, wenn die Photovoltaikanlage gerade keinen Strom produziert.",
      image: null,
    },

    {
      id: "features",
      type: "list",
      subheading: "Projektdetails",
      text: "28 monokristalline Solarmodule\n12 kWp Anlagenleistung\n12 kWh Batteriespeicher\n10 kW Hybrid-Wechselrichter\nWalmdach\nOptimierte Modulaufteilung\nInstallation innerhalb von 3 Tagen",
      image: null,
    },

    {
      id: "result",
      type: "text",
      subheading: "Das Ergebnis",
      text: "Nach der Fertigstellung verfügt das Wohngebäude über eine moderne Photovoltaikanlage mit leistungsfähiger Speichertechnik. Die Kombination ermöglicht eine flexible Nutzung der erzeugten Solarenergie über den gesamten Tag hinweg.",
      image: null,
    },

    {
      id: "conclusion",
      type: "text",
      subheading: "Moderne Solartechnik",
      text: "Das Projekt verbindet eine sorgfältig geplante Dachbelegung mit moderner Photovoltaik- und Speichertechnik. So konnte eine leistungsfähige Lösung für die nachhaltige Stromerzeugung im eigenen Zuhause geschaffen werden.",
      image: null,
    },
  ],
},

{
  id: 5,
  handle: "photovoltaikanlage-einfamilienhaus-werdau5",

  title: "Solaranlage mit Batteriespeicher für ein Einfamilienhaus",
  shortTitle: "Einfamilienhaus in Werdau",

  location: "Werdau",
  date: "Mai 2026",

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

  power: "9,6 kWp",
  panels: 22,
  panelType: "Monokristalline Solarmodule",

  inverter: "Hybrid-Wechselrichter",
  battery: "15 kWh Batteriespeicher",

  roofType: "Satteldach",
  installationTime: "2 Tage",

  description:
    "Moderne Photovoltaikanlage mit großzügigem Batteriespeicher für eine flexible Nutzung des selbst erzeugten Solarstroms.",

  details:
    "Bei diesem Einfamilienhaus in Werdau wurde eine Photovoltaikanlage mit besonderem Fokus auf die Speicherung der erzeugten Solarenergie installiert. Ein 15 kWh Batteriespeicher ergänzt die Anlage und ermöglicht eine flexible Nutzung des Solarstroms.",

  features: [
    "22 Solarmodule",
    "9,6 kWp Anlagenleistung",
    "15 kWh Batteriespeicher",
    "Hybrid-Wechselrichter",
    "Hoher Eigenverbrauch",
  ],

  paragraphs: [
    {
      id: "description",
      type: "text",
      subheading: "Über das Projekt",
      text: "Für ein Einfamilienhaus in Werdau wurde eine moderne Photovoltaikanlage mit integriertem Batteriespeicher realisiert. Im Mittelpunkt des Projekts stand die möglichst effiziente Nutzung des selbst erzeugten Stroms.",
      image: null,
    },

    {
      id: "planning",
      type: "text",
      subheading: "Planung und Konzept",
      text: "Die Anlage wurde individuell an die vorhandene Dachfläche und den Energiebedarf des Haushalts angepasst. Bei der Planung wurde besonders darauf geachtet, eine sinnvolle Kombination aus Solarleistung und Speicherkapazität zu schaffen.",
      image: null,
    },

    {
      id: "installation",
      type: "text",
      subheading: "Montage der Solarmodule",
      text: "Auf dem Satteldach wurden 22 monokristalline Solarmodule installiert. Die Module wurden so angeordnet, dass die verfügbare Dachfläche optimal genutzt werden kann und eine gleichmäßige Stromerzeugung ermöglicht wird.",
      image: null,
    },

    {
      id: "inverter",
      type: "text",
      subheading: "Hybrid-Wechselrichter",
      text: "Ein moderner Hybrid-Wechselrichter übernimmt die Steuerung und Umwandlung der erzeugten Solarenergie. Er verbindet die Photovoltaikanlage mit dem Haushalt und dem Batteriespeicher und sorgt für eine zuverlässige Energieverteilung.",
      image: null,
    },

    {
      id: "storage",
      type: "text",
      subheading: "15 kWh Batteriespeicher",
      text: "Als Ergänzung zur Photovoltaikanlage wurde ein Batteriespeicher mit einer Kapazität von 15 kWh installiert. Überschüssiger Solarstrom kann gespeichert und später genutzt werden. Dadurch lässt sich die erzeugte Energie zeitlich flexibler einsetzen.",
      image: null,
    },

    {
      id: "features",
      type: "list",
      subheading: "Projektdetails",
      text: "22 monokristalline Solarmodule\n9,6 kWp Anlagenleistung\n15 kWh Batteriespeicher\nHybrid-Wechselrichter\nSatteldach\nOptimierte Dachflächennutzung\nInstallation innerhalb von 2 Tagen",
      image: null,
    },

    {
      id: "result",
      type: "text",
      subheading: "Das Ergebnis",
      text: "Durch die Kombination aus Photovoltaikanlage und großem Batteriespeicher kann ein größerer Anteil des erzeugten Solarstroms im Haushalt genutzt werden. Die Anlage bietet damit eine flexible und moderne Lösung für die eigene Energieversorgung.",
      image: null,
    },

    {
      id: "conclusion",
      type: "text",
      subheading: "Solarstrom flexibel nutzen",
      text: "Das Projekt zeigt, wie eine Photovoltaikanlage mit moderner Speichertechnik kombiniert werden kann. Die individuelle Planung und fachgerechte Installation schaffen eine zuverlässige Grundlage für die langfristige Nutzung erneuerbarer Energie.",
      image: null,
    },
  ],
},
];
