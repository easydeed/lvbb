import Link from 'next/link'
import { Phone } from 'lucide-react'
import { CLINIC } from '@/lib/clinic-data'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-accent/30 bg-primary/95 text-primary-foreground backdrop-blur supports-[backdrop-filter]:bg-primary/85">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            {CLINIC.club}
          </span>
          <span className="font-display text-lg uppercase">{CLINIC.title}</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={CLINIC.phoneHref}
            className="hidden min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-primary-foreground/90 transition-colors hover:text-accent sm:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-wide text-accent">
                {CLINIC.phoneLabel}
              </span>
              <span>{CLINIC.phone}</span>
            </span>
          </a>
          <Link
            href="/register"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-4 text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-[1.03] active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}
