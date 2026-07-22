'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { CLINIC, PLAYER_AGES, POSITIONS } from '@/lib/clinic-data'
import type { SessionAvailability } from '@/lib/session-counts'
import { SessionSpotCard } from '@/components/session-spot-card'
import { cn } from '@/lib/utils'

const fieldBase =
  'min-h-12 w-full rounded-md border bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/40'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-sm font-medium text-destructive">{message}</p>
}

export function RegistrationForm({
  initialSessions,
}: {
  initialSessions: SessionAvailability[]
}) {
  const [sessions, setSessions] = useState(initialSessions)
  const [selected, setSelected] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function refresh() {
      try {
        const res = await fetch('/api/sessions', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as { sessions: SessionAvailability[] }
        if (!cancelled && data.sessions) {
          setSessions(data.sessions)
          setSelected((prev) =>
            prev.filter((id) => !data.sessions.find((s) => s.id === id)?.isFull),
          )
        }
      } catch {
        // keep initial server data
      }
    }
    refresh()
    return () => {
      cancelled = true
    }
  }, [])

  function toggleSession(id: string, isFull: boolean) {
    if (isFull) return
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    )
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setErrors({})
    setFormError(null)

    const form = new FormData(e.currentTarget)
    const payload = {
      playerName: String(form.get('playerName') ?? ''),
      playerAge: Number(form.get('playerAge')),
      parentName: String(form.get('parentName') ?? ''),
      phone: String(form.get('phone') ?? ''),
      email: String(form.get('email') ?? ''),
      position: String(form.get('position') ?? ''),
      sessions: selected,
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as {
        error?: string
        message?: string
        fieldErrors?: Record<string, string>
        code?: string
      }

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors)
        setFormError(data.error ?? 'Unable to complete registration.')
        if (data.code === 'SESSION_FULL') {
          const refresh = await fetch('/api/sessions', { cache: 'no-store' })
          if (refresh.ok) {
            const next = (await refresh.json()) as {
              sessions: SessionAvailability[]
            }
            setSessions(next.sessions)
            setSelected((prev) =>
              prev.filter(
                (id) => !next.sessions.find((s) => s.id === id)?.isFull,
              ),
            )
          }
        }
        return
      }

      setSuccessMessage(data.message ?? "You're registered!")
      const refresh = await fetch('/api/sessions', { cache: 'no-store' })
      if (refresh.ok) {
        const next = (await refresh.json()) as { sessions: SessionAvailability[] }
        setSessions(next.sessions)
      }
    } catch {
      setFormError('Network error. Please try again.')
    } finally {
      setPending(false)
    }
  }

  if (successMessage) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-md sm:p-8">
        <div className="flex flex-col items-center py-6 text-center">
          <CheckCircle2 className="size-14 text-primary" aria-hidden="true" />
          <h3 className="mt-4 font-display text-2xl uppercase text-primary">
            You&apos;re Registered!
          </h3>
          <p className="mt-2 max-w-md text-pretty text-muted-foreground">
            {successMessage}
          </p>
        </div>
      </div>
    )
  }

  const openSessions = sessions.filter((s) => !s.isFull)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-xl uppercase text-primary">
          Session Availability
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{CLINIC.capacityNote}</p>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sessions.map((session) => (
            <SessionSpotCard key={session.id} session={session} tone="light" />
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-md sm:p-8">
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
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
              htmlFor="playerAge"
              className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-primary"
            >
              Player Age (12U)
            </label>
            <select
              id="playerAge"
              name="playerAge"
              defaultValue=""
              aria-invalid={!!errors.playerAge}
              className={fieldBase}
            >
              <option value="" disabled>
                Select age (11 or 12)
              </option>
              {PLAYER_AGES.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
            <FieldError message={errors.playerAge} />
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
                placeholder="(626) 555-5555"
                aria-invalid={!!errors.phone}
                className={fieldBase}
              />
              <FieldError message={errors.phone} />
            </div>

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
          </div>

          <fieldset>
            <legend className="mb-1.5 text-sm font-bold uppercase tracking-wide text-primary">
              Session Date(s)
            </legend>
            <p className="mb-3 text-xs text-muted-foreground">
              Select one or more open sessions. Full sessions cannot be selected.
            </p>
            {openSessions.length === 0 ? (
              <p className="rounded-md bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                All sessions are currently full.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {sessions.map((session) => {
                  const checked = selected.includes(session.id)
                  return (
                    <label
                      key={session.id}
                      className={cn(
                        'flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm transition-colors',
                        session.isFull
                          ? 'cursor-not-allowed border-border/60 bg-muted/40 text-muted-foreground opacity-60'
                          : checked
                            ? 'border-accent bg-accent/10 text-primary'
                            : 'border-border bg-background hover:border-accent/60',
                      )}
                    >
                      <input
                        type="checkbox"
                        className="size-4 accent-[oklch(0.68_0.16_56)]"
                        checked={checked}
                        disabled={session.isFull}
                        onChange={() =>
                          toggleSession(session.id, session.isFull)
                        }
                      />
                      <span className="flex flex-col">
                        <span className="font-semibold">{session.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {session.isFull
                            ? 'FULL'
                            : `${session.filled} / ${session.capacity} filled`}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            )}
            <FieldError message={errors.sessions} />
          </fieldset>

          <div>
            <label
              htmlFor="position"
              className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-primary"
            >
              Position <span className="font-normal normal-case">(optional)</span>
            </label>
            <select id="position" name="position" defaultValue="" className={fieldBase}>
              <option value="">Select position</option>
              {POSITIONS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          {formError ? (
            <p
              role="alert"
              className="rounded-md bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive"
            >
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending || openSessions.length === 0}
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

          <p className="text-center text-xs text-muted-foreground">
            By registering you agree to be contacted about the clinic. No cost to
            attend. {CLINIC.capacityNote}
          </p>
        </form>
      </div>
    </div>
  )
}
