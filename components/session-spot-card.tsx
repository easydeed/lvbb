import { cn } from '@/lib/utils'
import type { SessionAvailability } from '@/lib/session-counts'

export function SessionSpotCard({
  session,
  tone = 'dark',
}: {
  session: SessionAvailability
  tone?: 'dark' | 'light'
}) {
  const pct = Math.min((session.filled / session.capacity) * 100, 100)
  const isDark = tone === 'dark'

  return (
    <li
      className={cn(
        'flex flex-col items-center rounded-lg border py-5 px-3 text-center transition-opacity',
        isDark
          ? 'border-accent/40 bg-primary-foreground/5'
          : 'border-border bg-card shadow-sm',
        session.isFull && 'opacity-55',
      )}
    >
      <span
        className={cn(
          'text-sm font-semibold uppercase tracking-[0.2em]',
          isDark ? 'text-primary-foreground/80' : 'text-muted-foreground',
        )}
      >
        {session.month}
      </span>
      <span
        className={cn(
          'mt-1 font-display text-5xl',
          session.isFull
            ? isDark
              ? 'text-primary-foreground/40'
              : 'text-muted-foreground'
            : 'text-accent',
        )}
      >
        {session.day}
        <sup className="ml-0.5 text-lg">{session.suffix}</sup>
      </span>

      {session.isFull ? (
        <span className="mt-3 rounded bg-destructive/90 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
          Full
        </span>
      ) : (
        <span
          className={cn(
            'mt-3 text-xs font-semibold uppercase tracking-wide',
            isDark ? 'text-primary-foreground/70' : 'text-muted-foreground',
          )}
        >
          {session.filled} / {session.capacity} spots filled
        </span>
      )}

      <div
        className={cn(
          'mt-2 h-1.5 w-full max-w-[7rem] overflow-hidden rounded-full',
          isDark ? 'bg-primary-foreground/15' : 'bg-muted',
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'h-full rounded-full transition-all',
            session.isFull ? 'bg-destructive/80' : 'bg-accent',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </li>
  )
}
