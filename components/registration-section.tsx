'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { registerPlayer, type RegistrationState } from '@/app/actions'

const initialState: RegistrationState = { status: 'idle' }

const GRADES = [
  '6th Grade',
  '7th Grade',
  '8th Grade',
  '9th Grade (Freshman)',
  '10th Grade (Sophomore)',
  '11th Grade (Junior)',
  '12th Grade (Senior)',
]

const fieldBase =
  'min-h-12 w-full rounded-md border bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/40'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-8 font-display text-lg uppercase tracking-wide text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
          Reserving...
        </>
      ) : (
        'Reserve My Spot'
      )}
    </button>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-sm font-medium text-destructive">{message}</p>
}

export function RegistrationSection() {
  const [state, formAction] = useActionState(registerPlayer, initialState)
  const errors = state.errors ?? {}

  return (
    <section id="register" className="bg-secondary py-14 sm:py-20">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="text-center">
          <span className="rounded bg-accent px-2 py-0.5 text-sm font-bold uppercase tracking-wide text-accent-foreground">
            Free Registration
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase text-primary sm:text-5xl">
            Sign Up For The Clinic
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Reserve your player&apos;s spot for all 6 sessions. Spots are limited
            and fill up fast.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-md sm:p-8">
          {state.status === 'success' ? (
            <div className="flex flex-col items-center py-6 text-center">
              <CheckCircle2 className="size-14 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl uppercase text-primary">
                You&apos;re Registered!
              </h3>
              <p className="mt-2 max-w-md text-pretty text-muted-foreground">
                {state.message}
              </p>
            </div>
          ) : (
            <form action={formAction} noValidate className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="playerName"
                  className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-primary"
                >
                  Player Name
                </label>
                <input
                  id="playerName"
                  name="playerName"
                  type="text"
                  autoComplete="name"
                  placeholder="Player's full name"
                  aria-invalid={!!errors.playerName}
                  className={fieldBase}
                />
                <FieldError message={errors.playerName} />
              </div>

              <div>
                <label
                  htmlFor="grade"
                  className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-primary"
                >
                  Grade Level
                </label>
                <select
                  id="grade"
                  name="grade"
                  defaultValue=""
                  aria-invalid={!!errors.grade}
                  className={fieldBase}
                >
                  <option value="" disabled>
                    Select grade level
                  </option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.grade} />
              </div>

              <div>
                <label
                  htmlFor="parentName"
                  className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-primary"
                >
                  Parent / Guardian Name
                </label>
                <input
                  id="parentName"
                  name="parentName"
                  type="text"
                  placeholder="Your full name"
                  aria-invalid={!!errors.parentName}
                  className={fieldBase}
                />
                <FieldError message={errors.parentName} />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-primary"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    className={fieldBase}
                  />
                  <FieldError message={errors.email} />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-primary"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(555) 555-5555"
                    aria-invalid={!!errors.phone}
                    className={fieldBase}
                  />
                  <FieldError message={errors.phone} />
                </div>
              </div>

              {state.status === 'error' && state.message ? (
                <p
                  role="alert"
                  className="rounded-md bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive"
                >
                  {state.message}
                </p>
              ) : null}

              <SubmitButton />

              <p className="text-center text-xs text-muted-foreground">
                By registering you agree to be contacted about the clinic. No cost
                to attend.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
