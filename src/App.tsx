import { useState } from 'react'
import { PageHeader } from './components/PageHeader'
import { Hero } from './sections/Hero'
import { ExperienceSection } from './sections/ExperienceSection'
import { SkillsSection } from './sections/SkillsSection'
import { JourneySection } from './sections/JourneySection'
import { ContactSection } from './sections/ContactSection'
import { cvByLocale } from './data'
import type { Cv } from './data'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const [locale, setLocale] = useState<Cv['locale']>('en')
  const { theme, toggle } = useTheme()
  const cv = cvByLocale[locale]

  return (
    <>
      <PageHeader locale={locale} onLocaleChange={setLocale} theme={theme} onThemeToggle={toggle} />
      <main>
        <Hero cv={cv} locale={locale} />
        <ExperienceSection cv={cv} locale={locale} />
        <SkillsSection cv={cv} locale={locale} />
        <JourneySection cv={cv} locale={locale} />
        <ContactSection cv={cv} locale={locale} />
      </main>
    </>
  )
}

export default App
