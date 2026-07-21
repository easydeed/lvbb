import { FEATURES } from '@/lib/clinic-data'

export function FeaturesSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon className="size-7" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-lg uppercase text-primary">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
