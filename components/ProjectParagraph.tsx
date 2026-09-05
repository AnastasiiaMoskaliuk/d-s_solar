import Image from "next/image";
import React, { FC } from "react";

import { ProjectParagraph } from "@/data/projekts";

interface ParagraphsProps {
  paragraph: ProjectParagraph;
}

const ParagraphsComponent: FC<ParagraphsProps> = ({ paragraph }) => {
  const paragraphContent = () => {
    if (paragraph.type === "text") {
      const textLines = paragraph.text?.split("\n").map((line, index) => (
        <p key={index} className="text-[16px] leading-[28px] text-[#787A80] md:text-[18px] md:leading-[30px]">
          {line}
        </p>
      ));

      return (
        <div className="flex flex-col gap-[5px]">
          {paragraph.subheading && (
            <p className="font-bold text-[18px] md:text-[20px]">
              {paragraph.subheading}
            </p>
          )}

          {textLines}
        </div>
      );
    }

    if (paragraph.type === "quote") {
      return (
        <div className="flex items-start gap-[30px] py-[12px] text-[16px] font-bold md:py-[24px] md:text-[18px] lg:text-[20px]">
          <span className="text-[30px] text-[#f7bd37]">“</span>

          <p>{paragraph.text}</p>
        </div>
      );
    }

    if (paragraph.type === "image") {
      return paragraph.image ? (
        <div className="flex justify-center">
          <Image
            src={paragraph.image.originalSrc}
            alt={paragraph.image.alt || ""}
            width={paragraph.image.width || 1000}
            height={paragraph.image.height || 600}
            className="h-auto w-full rounded-[20px] object-cover"
          />
        </div>
      ) : null;
    }

    if (paragraph.type === "list") {
      const listItems = paragraph.text?.split("\n").map((item, index) => (
        <li key={index} className="flex items-start gap-[12px]">
          <span className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full bg-[#f7bd37] text-[#154b4b]">
            ✓
          </span>

          <span>{item}</span>
        </li>
      ));

      return (
        <div className="flex flex-col gap-[12px] text-[16px] text-[#555] md:text-[18px]">
          {paragraph.subheading && (
            <p className="font-bold text-[18px] md:text-[20px]">
              {paragraph.subheading}
            </p>
          )}

          <ul className="flex flex-col gap-[12px]">
            {listItems}
          </ul>
        </div>
      );
    }

    return null;
  };

  return <div>{paragraphContent()}</div>;
};

export default ParagraphsComponent;