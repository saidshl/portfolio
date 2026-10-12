import { motion, useReducedMotion } from 'framer-motion'
import type { Cv } from '../data'
import { Logo } from '../components/Logo'

interface ContactSectionProps {
  cv: Cv
  locale: Cv['locale']
}

export function ContactSection({ cv, locale }: ContactSectionProps) {
  const reduceMotion = useReducedMotion()
  const { email, phone, linkedin, github, nuget } = cv.profile.contact
  const links = [
    ...(email ? [{ label: 'Email', href: `mailto:${email}`, detail: email, kind: 'DIRECT' }] : []),
    ...(phone ? [{ label: locale === 'en' ? 'Phone' : 'Téléphone', href: `tel:${phone}`, detail: phone, kind: 'DIRECT' }] : []),
    ...(linkedin ? [{ label: 'LinkedIn', href: linkedin, detail: formatProfileUrl(linkedin), kind: 'NETWORK / PROFILE' }] : []),
    ...(github ? [{ label: 'GitHub', href: github, detail: formatProfileUrl(github), kind: 'SOURCE / CODE' }] : []),
    ...(nuget ? [{ label: 'NuGet', href: nuget, detail: formatProfileUrl(nuget), kind: 'PACKAGE / PROFILE' }] : []),
  ]
  const title = locale === 'en' ? 'Built around the way systems connect.' : 'Créer des systèmes qui se connectent.'
  const location = locale === 'en' ? `Based in ${cv.profile.location}` : `Basé à ${cv.profile.location}`

  return (
    <>
      <section className="contact-section" id="contact">
        <div className="container-page contact-inner">
          <motion.div
            className="contact-copy"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: 'easeOut' }}
          >
            <p className="section-kicker">{locale === 'en' ? 'The next connection' : 'La prochaine connexion'}</p>
            <h2 className="contact-title">{title}</h2>
            <p className="contact-location">{location}</p>
          </motion.div>
          {links.length > 0 && (
            <div className="contact-links">
              {links.map((link, index) => (
                <motion.a
                  className="contact-link-card"
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.08, ease: 'easeOut' }}
                >
                  <span className="contact-link-top">
                    {link.label === 'GitHub' && (
                      <svg className="contact-brand-icon contact-brand-github" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 6.01 0c2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.628-5.48 5.921.43.372.814 1.102.814 2.222 0 1.604-.015 2.896-.015 3.29 0 .32.216.694.825.576C20.565 22.092 24 17.598 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    )}
                    {link.label === 'LinkedIn' && (
                      <svg className="contact-brand-icon contact-brand-linkedin" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.26zM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.54 9H7.1v11.45H3.54V9zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                      </svg>
                    )}
                    {link.label === 'NuGet' && (
                      <svg className="contact-brand-icon contact-brand-nuget" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" />
                        <path d="m3 7 9 5 9-5M12 12v10M7.5 4.5l9 5" />
                      </svg>
                    )}
                    <span className="contact-link-index">0{index + 1}</span>
                    <span className="contact-link-kind">{link.kind}</span>
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 15 15 5M6 5h9v9" /></svg>
                  </span>
                  <strong>{link.label}</strong>
                  <span className="contact-link-detail">{link.detail}</span>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>
      <footer className="site-footer">
        <div className="container-page footer-inner">
          <a className="brand" href="#top" aria-label="SASHL, back to top"><Logo /></a>
          <span>{locale === 'en' ? 'Full Stack .NET Engineer' : 'Ingénieur Full Stack .NET'}</span>
          <a href="#top">{locale === 'en' ? 'Back to top' : 'Haut de page'} ↑</a>
        </div>
      </footer>
    </>
  )
}

function formatProfileUrl(value: string) {
  try {
    const url = new URL(value)
    return `${url.host}${url.pathname.replace(/\/$/, '')}`
  } catch {
    return value
  }
}