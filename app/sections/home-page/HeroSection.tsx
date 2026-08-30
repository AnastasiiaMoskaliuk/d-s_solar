export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-onyx">
      <video
        src="https://res.cloudinary.com/dmxhv1hjs/video/upload/v1788071114/IMG_4904.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        controls={false}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Легке чорне затемнення для мобільних і планшетів */}
      <div className="absolute inset-0 bg-black/50 " />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow/50 bg-onyx/40 px-4 py-2 text-sm font-semibold text-yellow">
            <span className="h-2 w-2 rounded-full !bg-yellow" />
            D&amp;S Solar
          </p>

          <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-snow sm:text-6xl lg:text-8xl">
            Ihr Dach.
            <span className="block text-yellow">Ihre Freiheit.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-snow/75 sm:text-lg">
            Machen Sie sich unabhängiger und nutzen Sie die Kraft der Sonne für
            Ihre Zukunft.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex animate-scroll-hint flex-col items-center gap-2 text-xs lg:text-lg font-medium tracking-[0.2em] text-snow/70">
        SCROLLEN
        <span className="h-10 w-px bg-yellow" />
      </div>
    </section>
  );
}