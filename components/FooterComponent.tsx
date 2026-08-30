import Link from "next/link";
import Image from "next/image";

import Logo from "@/src/logo.svg";
import Tiktok from "@/src/social-networks/tiktok.svg";
import Instagram from "@/src/social-networks/instagram.svg";

const SocialObject = [
  {
    href: "/",
    title: "Tiktok",
    image: Tiktok,
  },
  {
    href: "/",
    title: "Instagram",
    image: Instagram,
  }
];
const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col  items-center gap-[40px] pt-[20px] ">
      <div className=" px-[20px] lg:px-[60px] flex flex-col lg:flex-row gap-[50px] items-center lg:justify-between w-[100%]">
        <div className="flex flex-col items-center">
          <Link href="/" className="px-[20px]">
            <Image
              src={Logo}
              alt="Logo"
              width={380}
              height={100}
              className="w-[380px] h-[150px]"
              loading="lazy"
            />
          </Link>
        </div>

        <div
          className={` flex flex-col gap-[10px] w-max items-center`}
        >
          <p className="font-[700] text-[16px] tracking-[0.10em] text-onyx">Folgen Sie uns</p>
          <div className="flex gap-[12px] items-center ">
            {SocialObject.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lightGreen shadow-lg rounded-[50%] p-[8px] transition-all duration-300 hover:scale-105 hover:bg-onyx group"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  height={12}
                  className="h-[18px] w-[18px] transition-all duration-300 group-hover:filter group-hover:brightness-0 invert"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[100%] py-[10px] text-center text-onyx min-h-[60px] px-[20px] leading-[25px] flex flex-col items-center gap-[15px] md:relative">
        <p className="text-center">
          © Copyright {currentYear} D&S Solar - Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;