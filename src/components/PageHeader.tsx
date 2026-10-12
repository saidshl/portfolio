import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Logo } from './Logo'
import type { Cv } from '../data'
import type { Theme } from '../hooks/useTheme'

interface PageHeaderProps {
  locale: Cv['locale']
  onLocaleChange: (locale: Cv['locale']) => void
  theme: Theme
  onThemeToggle: () => void
}

export function PageHeader({ locale, onLocaleChange, theme, onThemeToggle }: PageHeaderProps) {
  const reduceMotion = useReducedMotion()
  const labels = locale === 'en'
    ? { home: 'Overview', experience: 'Experience', skills: 'Expertise', education: 'Background', contact: 'Contact', light: 'Switch to light theme', dark: 'Switch to dark theme' }
    : { home: 'Accueil', experience: 'Expérience', skills: 'Expertise', education: 'Parcours', contact: 'Contact', light: 'Passer au thème clair', dark: 'Passer au thème sombre' }
  const [activeSection, setActiveSection] = useState('top')
  const navigation = [
    { id: 'top', label: labels.home },
    { id: 'experience', label: labels.experience },
    { id: 'expertise', label: labels.skills },
    { id: 'background', label: labels.education },
    { id: 'contact', label: labels.contact },
  ]

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sectionIds = ['top', 'experience', 'expertise', 'background', 'contact']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver((entries) => {
      const currentSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0]

      if (currentSection) setActiveSection(currentSection.target.id)
    }, { rootMargin: '-22% 0px -68% 0px', threshold: 0 })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="SASHL, home"><Logo /></a>
        <nav className="header-nav" aria-label={locale === 'en' ? 'Main navigation' : 'Navigation principale'}>
          <span className="nav-terminal-label" aria-hidden="true">PS C:\SASHL&gt;</span>
          {navigation.map(({ id, label }) => (
            <a
              className="nav-command"
              href={`#${id}`}
              key={id}
              aria-current={activeSection === id ? 'location' : undefined}
            >
              {activeSection === id && (
                <motion.span
                  className="nav-active-indicator"
                  layoutId="nav-active-indicator"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                  aria-hidden="true"
                />
              )}
              <span className="nav-command-prefix" aria-hidden="true">./</span>
              <span className="nav-command-label">{label}</span>
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-switch" role="group" aria-label={locale === 'en' ? 'Language' : 'Langue'}>
            {(['en', 'fr'] as const).map((language) => (
              <button
                className="language-option"
                type="button"
                key={language}
                aria-pressed={locale === language}
                onClick={() => onLocaleChange(language)}
              >
                {locale === language && (
                  <motion.span
                    className="language-indicator"
                    layoutId="language-indicator"
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 460, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span className="language-option-label">{language.toUpperCase()}</span>
              </button>
            ))}
          </div>
          <motion.button
            className="theme-toggle"
            type="button"
            onClick={onThemeToggle}
            aria-label={theme === 'dark' ? labels.light : labels.dark}
            title={theme === 'dark' ? labels.light : labels.dark}
            whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          >
            {theme === 'dark' ? (
              <motion.svg key={theme} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, rotate: -35, scale: 0.75 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}>
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </motion.svg>
            ) : (
              <motion.svg key={theme} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, rotate: 35, scale: 0.75 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}>
                <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
              </motion.svg>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  )
}