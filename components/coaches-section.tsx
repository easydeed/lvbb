import { Award, CheckCircle2 } from 'lucide-react'
import { COACHES } from '@/lib/clinic-data'

export function CoachesSection() {
  return (
    <section id="coaches" className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
      <div className="text-center">
        <span className="rounded bg-accent px-2 py-0.5 text-sm font-bold uppercase tracking-wide text-accent-foreground">
          Meet Your Coaches
        </span>
        <h2 className="mt-4 font-display text-3xl uppercase text-primary sm:text-4xl">
          Learn From Proven Winners
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">
          This clinic is led by two of the most accomplished coaches in Southern
          California — the kind of instruction that gets players noticed.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {COACHES.map((coach) => (
          <div
            key={coach.name}
            className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Award className="size-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-xl uppercase text-primary">{coach.name}</h3>
                <p className="text-sm font-semibold text-accent">{coach.title}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {coach.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
