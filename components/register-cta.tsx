import Link from 'next/link'
import { CLINIC } from '@/lib/clinic-data'

export function RegisterCta() {
  return (
    <section className="bg-secondary py-14 sm:py-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center">
        <span className="rounded bg-accent px-2 py-0.5 text-sm font-bold uppercase tracking-wide text-accent-foreground">
          Free Registration
        </span>
        <h2 className="mt-4 font-display text-4xl uppercase text-primary sm:text-5xl">
          Reserve Your Spot
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
          {CLINIC.capacityNote}
        </p>
        <Link
          href="/register"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-8 font-display text-lg uppercase tracking-wide text-accent-foreground transition-transform hover:scale-[1.03] active:scale-95"
        >
          Register Now
        </Link>
      </div>
    </section>
  )
}
