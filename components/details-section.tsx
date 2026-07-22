import { Clock, Gift, Users, Backpack, MapPin, Star } from 'lucide-react'
import { CLINIC, LOCATIONS } from '@/lib/clinic-data'
import { ClubBadge } from '@/components/club-badge'

const DETAILS = [
  { icon: Clock, label: 'Time', value: CLINIC.time },
  { icon: Users, label: 'Who', value: CLINIC.openTo },
  { icon: Gift, label: 'Cost', value: `${CLINIC.price} — limited spots available` },
  { icon: Backpack, label: 'What To Bring', value: CLINIC.whatToBring },
]

export function DetailsSection() {
  return (
    <section id="details" className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
      <div className="flex flex-col items-center">
        <ClubBadge />
        <p className="mt-6 max-w-lg text-center font-display text-2xl uppercase text-primary text-balance sm:text-3xl">
          Invest in your game.
          <span className="block text-accent">The work starts here.</span>
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DETAILS.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
                {label}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {value}
              </p>
            </div>
          </div>
        ))}

        <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 shadow-sm sm:col-span-2">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <MapPin className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
              Locations
            </h3>
            <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {LOCATIONS.map((venue) => (
                <li key={venue.name} className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-primary">{venue.name}</span>
                  <span className="mt-0.5 block">{venue.address}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-accent/15 px-5 py-4 text-center">
        <Star className="size-5 shrink-0 text-accent" aria-hidden="true" />
        <p className="text-sm font-bold uppercase tracking-wide text-primary">
          Spots are limited —{' '}
          <span className="text-accent">sign up today!</span>
        </p>
      </div>
    </section>
  )
}
