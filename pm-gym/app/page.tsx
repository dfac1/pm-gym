import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ValueProposition from '@/components/ValueProposition'
import HowItWorks from '@/components/HowItWorks'
import FeaturesPreview from '@/components/FeaturesPreview'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ValueProposition />
      <HowItWorks />
      <FeaturesPreview />
      <FinalCTA />
      <Footer />
    </main>
  )
}
