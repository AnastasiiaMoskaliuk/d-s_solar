import Link from "next/link";
import Button from "@/components/ButtonComponent";
// import Image from "next/image";
// import Logo from "@/src/logo.svg";

const benefits = ["Garantie bis zu 25 Jahre", "Montage in ganz Deutschland"];

export default function RechnungSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#062d32] px-5 pb-16 pt-6 text-[snow] sm:px-8 lg:min-h-[720px] lg:px-12 lg:pb-24 lg:pt-10">
      <div className="absolute -right-24 top-[-140px] -z-10 h-[420px] w-[420px] rounded-full bg-[#f7bd37]/20 blur-3xl" />
      <div className="absolute -bottom-64 -left-48 -z-10 h-[440px] w-[440px] rounded-full bg-[#1f7c72]/30 blur-3xl" />

      <div className="mx-auto ">
        <div className="grid items-center justify-items-center gap-10 lg:grid-cols-2 ">
          <div className="max-w-[400px]flex flex-col items-start justify-center align-items text-center lg:text-left">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f7bd37]/35 bg-[#f7bd37]/10 px-4 py-2 text-sm font-semibold text-[#ffe095]">
              <span className="h-2 w-2 rounded-full bg-[#f7bd37]" />
              Sonnenenergie für Ihr Zuhause
            </p>
            <h1 className="max-w-xl text-5xl font-black leading-[0.97] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Solarenergie, die für Sie arbeitet
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[snow]/70 sm:text-lg">
              Wir planen und installieren Solaranlagen, damit Ihr Zuhause oder
              Ihr Unternehmen weniger Energie verbraucht und mehr spart.
            </p>

            <div className="mt-9 flex flex-col gap-3 lg:flex-row">
              <Button
                tag="a"
                background="yellow"
                text="Kosten berechnen"
                href="/"
                className=" transition-all duration-300 hover:bg-darkBlack group"
              />
              <Button
                background="transparent"
                tag="a"
                bordered
                text="Unsere Projekte"
                href="/projekte"
              />
            </div>

            <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-[snow]/75 lg:justify-start">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#f7bd37] text-xs font-black text-[#062d32]">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="absolute inset-x-[12%] top-[5%] h-[70%] rounded-full bg-[#f7bd37]/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[snow]/15 bg-[snow]/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-7">
              <div className="absolute right-7 top-7 grid h-16 w-16 place-items-center rounded-full bg-[#f7bd37] text-3xl shadow-lg shadow-[#f7bd37]/20">
                ☀
              </div>
              <p className="text-sm font-semibold text-[snow]/55">
                D&amp;S SOLAR{" "}
              </p>
              <p className="mt-2 text-[23px] sm:text-[28px] lg:text-[31px] xl:text-[36px] font-extrabold">
                Intelligente Energie
              </p>

              <div className="mt-10 rounded-2xl bg-[#0a4548] p-4 sm:p-6">
                <div className="grid grid-cols-4 gap-1.5 rounded-xl bg-[#08363a] p-2 sm:gap-2 sm:p-3">
                  {Array.from({ length: 20 }, (_, index) => (
                    <span
                      key={index}
                      className="aspect-square rounded-[3px] bg-gradient-to-br from-[#4ca8c6] to-[#126084] shadow-inner shadow-[snow]/20"
                    />
                  ))}
                </div>
                <div className="mx-auto h-8 w-3/4 border-x-4 border-[#154b4b]" />
                <div className="mx-auto h-3 w-[88%] rounded-full bg-[#154b4b]" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[snow]/10 p-4">
                  <p className="text-xs font-medium text-[snow]/60">
                    Einsparung
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-[#ffe095]">
                    bis zu 70%
                  </p>
                </div>
                <div className="rounded-2xl bg-[snow]/10 p-4">
                  <p className="text-xs font-medium text-[snow]/60">Rendite</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#ffe095]">
                    4–6 Jahre
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
