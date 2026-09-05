"use client";
import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import { Modal, ActionIcon, Button } from "@mantine/core";

import MainButton from "@/components/ButtonComponent";

import Logo from "@/src/logo.svg";
import Close from "@/src/vectors/close.svg";
import Burger from "@/src/vectors/burger.svg";

const navData = [
  { link: "/#leistungen", text: "Leistungen" },
  { link: "/projekte", text: "Projekte" },
  { link: "/#ueber-uns", text: "Über uns" },
  { link: "/legal", text: "Hilfe" },
];

const HeaderComponent: FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [opened, { open, close }] = useDisclosure(false);

  const HeaderNavigation: FC<{ className?: string }> = ({ className }) => {
    return (
      <div
        className={`${className} flex flex-col gap-[25px] z-30 items-center justify-center xl:flex-row`}
      >
        <div className="flex flex-col xl:flex-row gap-[40px]  xl:mr-[20px] ">
          <nav
            className={`flex flex-col xl:flex-row ${
              isHomePage ? "text-onyx xl:text-snow" : "text-onyx"
            }`}
          >
            {navData.map((item, index) => (
              <div key={index} className="relative group xl:mx-[15px] ">
                <MainButton
                  tag="a"
                  background="transparent"
                  text={item.text}
                  href={item.link}
                  onClick={() => {
                    close();
                  }}
                  className="group-hover:text-lightGreen transition-all duration-300 transform xl:!px-[0px]"
                />
                <span className="hidden xl:block absolute left-1/2 bottom-4 w-0 h-[2px] bg-lightGreen text-center transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </div>
            ))}
          </nav>

          <MainButton text="Kontakt" tag="a" href="/contact-us" />
        </div>
      </div>
    );
  };

  const HeaderLogo = () => {
    if (isHomePage) {
      return (
        <span className="cursor-default">
          <Image
            src={Logo}
            alt="Logo"
            width={70}
            height={50}
            loading="lazy"
            className="object-contain w-[90px] h-[70px] lg:w-[160px] lg:h-[80px]"
          />
        </span>
      );
    }

    return (
      <Link href="/" onClick={close}>
        <Image
          src={Logo}
          alt="Logo"
          width={70}
          height={50}
          loading="lazy"
          className="object-contain w-[90px] h-[70px] lg:w-[160px] lg:h-[80px]"
        />
      </Link>
    );
  };

  return (
    <header
      className={`
    z-50 w-full py-[10px] lg:py-[30px]
    ${isHomePage ? "absolute top-0 left-0 bg-transparent" : "relative top-0 "}
  `}
    >
      <div
        className={`w-full flex justify-between items-center gap-[30px] rounded-2xl px-4 py-1 lg:py-3 ${
          isHomePage
            ? "border border-snow/15 bg-[#949292]/40 shadow-xl shadow-snow/20 backdrop-blur-md"
            : ""
        }`}
      >
        <HeaderLogo />

        <Button
          onClick={open}
          className="xl:hidden ml-[60px] pr-[20px] hover:bg-transparent"
        >
          <Image
            src={Burger}
            alt="Burger"
            className={`${isHomePage ? "invert" : ""}`}
          />
        </Button>

        <HeaderNavigation className="hidden xl:flex" />

        <Modal
          opened={opened}
          onClose={close}
          title=""
          fullScreen
          withCloseButton={false}
          radius={0}
          transitionProps={{ transition: "scale-x", duration: 200 }}
          className="xl:hidden"
          styles={{
            body: {
              padding: "0",
            },
            content: {
              backgroundColor: "#ffffff",
              zIndex: 9999,
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            },
            header: {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <div className="container flex justify-between items-center py-[20px] mb-[40px] ">
            <HeaderLogo />

            <ActionIcon
              variant="transparent"
              onClick={close}
              className="w-[24px] h-[24px]"
            >
              <Image src={Close} alt="Close" />
            </ActionIcon>
          </div>

          <HeaderNavigation />
        </Modal>
      </div>
    </header>
  );
};

export default HeaderComponent;
