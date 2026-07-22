import { CLINIC } from '@/lib/clinic-data'
import { getSessionAvailability } from '@/lib/session-counts'
import { SessionSpotCard } from '@/components/session-spot-card'

export async function DatesSection() {
  const sessions = await getSessionAvailability()

  return (
    <section className="bg-primary py-14 text-primary-foreground sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="text-center font-display text-3xl uppercase tracking-wide sm:text-4xl">
          6 Workout Clinic Dates
        </h2>
        <div className="mx-auto mt-3 h-1 w-24 bg-accent" />
        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
          {CLINIC.capacityNote}
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {sessions.map((session) => (
            <SessionSpotCard key={session.id} session={session} tone="dark" />
          ))}
        </ul>
      </div>
    </section>
  )
}
