import { Phone, Globe, Camera } from 'lucide-react'
import { CLINIC, LOCATIONS } from '@/lib/clinic-data'

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg uppercase">{CLINIC.club}</p>
          <p className="text-sm text-background/60">
            6 Workout Clinic · 12U Players · {CLINIC.time}
          </p>
          <p className="mt-1 text-xs text-background/50">
            {LOCATIONS.map((v) => `${v.name} — ${v.address}`).join(' · ')}
          </p>
        </div>

        <nav className="flex flex-col items-center gap-3 text-sm sm:flex-row sm:gap-6">
          <a
            href={CLINIC.phoneHref}
            className="inline-flex min-h-11 flex-col items-center justify-center gap-0.5 transition-colors hover:text-accent sm:items-start"
          >
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4" aria-hidden="true" />
              {CLINIC.phone}
            </span>
            <span className="text-[10px] uppercase tracking-wide text-background/50">
              {CLINIC.phoneLabel}
            </span>
          </a>
          <a
            href={CLINIC.websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-accent"
          >
            <Globe className="size-4" aria-hidden="true" />
            {CLINIC.website}
          </a>
          <a
            href={CLINIC.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-accent"
          >
            <Camera className="size-4" aria-hidden="true" />
            {CLINIC.instagram}
          </a>
        </nav>
      </div>
    </footer>
  )
}
