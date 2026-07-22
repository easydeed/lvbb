import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { RegistrationForm } from '@/components/registration-form'
import { CLINIC } from '@/lib/clinic-data'
import { getSessionAvailability } from '@/lib/session-counts'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Register | 12U Baseball Development Clinic',
  description:
    'Reserve a spot in the free 12U baseball development clinic. Small by design — just 20 players per session.',
}

export default async function RegisterPage() {
  const sessions = await getSessionAvailability()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 bg-secondary py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl px-4">
          <div className="text-center">
            <span className="rounded bg-accent px-2 py-0.5 text-sm font-bold uppercase tracking-wide text-accent-foreground">
              Free Registration
            </span>
            <h1 className="mt-4 font-display text-4xl uppercase text-primary sm:text-5xl">
              Sign Up For The Clinic
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
              Reserve your 12U player&apos;s spot. {CLINIC.capacityNote}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {CLINIC.time} · {CLINIC.location}
            </p>
          </div>

          <div className="mt-10">
            <RegistrationForm initialSessions={sessions} />
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link href="/" className="font-semibold text-primary underline-offset-4 hover:underline">
              ← Back to clinic details
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
