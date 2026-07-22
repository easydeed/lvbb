import { CLINIC } from '@/lib/clinic-data'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-baseball.jpg"
          alt=""
          aria-hidden="true"
          className="size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center sm:py-24">
        <span className="rounded-full border border-accent/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {CLINIC.club}
        </span>

        <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] text-balance sm:text-7xl">
          Free 6-Session 12U
          <span className="mt-1 block text-accent">Baseball Development Clinic</span>
        </h1>

        <p className="mt-6 max-w-md rounded-md bg-primary-foreground/10 px-5 py-2 font-display text-xl uppercase tracking-wide sm:text-2xl">
          {CLINIC.tagline}
        </p>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
          A free, high-intensity development clinic for 12U players. Whether
          you&apos;re building reps for fall ball or trying to make a travel
          ball team, this is where the work starts — led by two of the most
          accomplished coaches in Southern California, at Mt. SAC and Bonita
          High School.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#register"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-8 font-display text-lg uppercase tracking-wide text-accent-foreground transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
          >
            Reserve Your Spot
          </a>
          <a
            href="#details"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-primary-foreground/40 px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:border-accent hover:text-accent sm:w-auto"
          >
            View Details
          </a>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
          <span className="rounded bg-accent px-2 py-0.5 text-accent-foreground">
            {CLINIC.price}
          </span>
          Spots are limited — sign up today!
        </div>
      </div>

      <div className="stitch-rule h-1.5 w-full opacity-80" />
    </section>
  )
}
