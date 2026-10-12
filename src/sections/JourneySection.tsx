import type { Cv } from '../data'
import { Reveal } from '../components/Reveal'
import { motion, useReducedMotion } from 'framer-motion'

interface JourneySectionProps {
  cv: Cv
  locale: Cv['locale']
}

export function JourneySection({ cv, locale }: JourneySectionProps) {
  const reduceMotion = useReducedMotion()
  const education = cv.sections.find((item) => item.type === 'education')
  const certifications = cv.sections.find((item) => item.type === 'certifications')
  const languages = cv.sections.find((item) => item.type === 'languages')

  return (
    <section className="section container-page journey-section" id="background">
      <Reveal>
        <div>
          <p className="section-kicker">03 / {locale === 'en' ? 'Foundation' : 'Formation'}</p>
          <h2 className="section-title">{education?.title ?? (locale === 'en' ? 'Education' : 'Formation')}</h2>
          <div className="education-list">
            {education?.type === 'education' && education.items.map((item, index) => (
              <motion.article
                className="education-entry"
                key={`${item.period}-${item.title}`}
                initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, delay: reduceMotion ? 0 : index * 0.1, ease: 'easeOut' }}
              >
                <span className="education-marker" aria-hidden="true">0{index + 1}</span>
                <span className="education-period">{item.period}</span>
                <div><h3 className="education-title">{item.title}</h3>{item.institution && <p className="education-institution">{item.institution}</p>}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={.08}>
        <div>
          <div className="credential-column">
            <p className="section-kicker">04 / {locale === 'en' ? 'Recognition' : 'Certifications'}</p>
            <h2 className="section-title">{certifications?.title ?? (locale === 'en' ? 'Certifications' : 'Certifications')}</h2>
            <div className="credential-list">
              {certifications?.type === 'certifications' && certifications.items.map((item, index) => (
                <motion.article
                  className="credential-entry"
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 7 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : index * 0.08, ease: 'easeOut' }}
                >
                  <h3 className="credential-name">{item.title}<span className="education-institution">{item.issuer}</span></h3>
                  <span className="credential-detail">{item.year}</span>
                </motion.article>
              ))}
            </div>
          </div>
          <div className="credential-column">
            <p className="section-kicker">05 / {locale === 'en' ? 'Languages' : 'Langues'}</p>
            <h2 className="section-title">{languages?.title ?? (locale === 'en' ? 'Languages' : 'Langues')}</h2>
            <div className="credential-list">
              {languages?.type === 'languages' && languages.items.map((item, index) => (
                <motion.div
                  className="credential-entry language-entry"
                  key={item.name}
                  initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : index * 0.07, ease: 'easeOut' }}
                >
                  <span>{item.name}</span><span>{item.level}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}