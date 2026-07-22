import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { CoachesSection } from '@/components/coaches-section'
import { FeaturesSection } from '@/components/features-section'
import { DatesSection } from '@/components/dates-section'
import { DetailsSection } from '@/components/details-section'
import { RegistrationSection } from '@/components/registration-section'
import { SiteFooter } from '@/components/site-footer'

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
        <RegistrationSection />
      </main>
      <SiteFooter />
    </div>
  )
}
