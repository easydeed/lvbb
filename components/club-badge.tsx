import { cn } from '@/lib/utils'

export function ClubBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex flex-col items-center justify-center rounded-md border-2 border-accent bg-primary px-3 py-2 text-center leading-none text-primary-foreground shadow-lg',
        className,
      )}
      aria-label="La Verne Athletic Club"
    >
      <span className="font-display text-lg tracking-wide">LA VERNE</span>
      <span className="mt-0.5 text-[10px] font-semibold tracking-[0.25em] text-accent">
        ATHLETIC CLUB
      </span>
      <span className="mt-1 font-display text-2xl text-accent">LV</span>
    </div>
  )
}
