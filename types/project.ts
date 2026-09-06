import type { StaticImageData } from "next/image";

export type ImageData = {
  originalSrc: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectParagraph = {
  id: string;
  type: "text" | "image" | "list" | "quote";
  subheading: string | null;
  text: string | null;
  image: ImageData | null;
};

export type SolarProject = {
  id: number;
  handle: string;
  title: string;
  shortTitle?: string;

  location: string;
  date?: string;

  power?: string;
  panels?: number;
  panelType?: string;
  inverter?: string;
  battery?: string;
  roofType?: string;
  installationTime?: string;

  description: string;
  details?: string;

  images: ImageData[];
  features: string[];
  paragraphs: ProjectParagraph[];
};