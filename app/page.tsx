import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { CoachesSection } from '@/components/coaches-section'
import { FeaturesSection } from '@/components/features-section'
import { DatesSection } from '@/components/dates-section'
import { DetailsSection } from '@/components/details-section'
import { RegisterCta } from '@/components/register-cta'
import { SiteFooter } from '@/components/site-footer'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <CoachesSection />
        <FeaturesSection />
        <DatesSection />
        <DetailsSection />
        <RegisterCta />
      </main>
      <SiteFooter />
    </div>
  )
}
