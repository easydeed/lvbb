import { DATES } from '@/lib/clinic-data'

export function DatesSection() {
  return (
    <section className="bg-primary py-14 text-primary-foreground sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="text-center font-display text-3xl uppercase tracking-wide sm:text-4xl">
          6 Workout Clinic Dates
        </h2>
        <div className="mx-auto mt-3 h-1 w-24 bg-accent" />

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {DATES.map(({ month, day, suffix }, i) => (
            <li
              key={day}
              className="flex flex-col items-center rounded-lg border border-accent/40 bg-primary-foreground/5 py-6"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
                {month}
              </span>
              <span className="mt-1 font-display text-5xl text-accent">
                {day}
                <sup className="ml-0.5 text-lg">{suffix}</sup>
              </span>
              <span className="mt-2 text-xs uppercase tracking-wide text-primary-foreground/60">
                Session {i + 1}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
