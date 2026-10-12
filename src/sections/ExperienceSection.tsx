import type { Cv, Section } from '../data'
import { Reveal } from '../components/Reveal'
import { motion, useReducedMotion } from 'framer-motion'

interface ExperienceSectionProps {
  cv: Cv
  locale: Cv['locale']
}

function formatPeriod(period: Extract<Section, { type: 'timeline' }>['items'][number]['period'], locale: Cv['locale']) {
  const language = locale === 'fr' ? 'fr-FR' : 'en-US'
  const format = (value: string) => new Intl.DateTimeFormat(language, { month: 'short', year: 'numeric' }).format(new Date(`${value}-01T12:00:00`))
  return `${format(period.start)} - ${period.end ? format(period.end) : locale === 'fr' ? "Aujourd'hui" : 'Present'}`
}

export function ExperienceSection({ cv, locale }: ExperienceSectionProps) {
  const reduceMotion = useReducedMotion()
  const section = cv.sections.find((item) => item.type === 'timeline')
  if (!section || section.type !== 'timeline') return null
  const intro = locale === 'en'
    ? 'From high-volume marketplace workflows to secure financial platforms, I build software where dependable integrations matter.'
    : 'Des flux de marketplace aux plateformes financières, je développe des logiciels où la fiabilité des intégrations compte.'

  return (
    <section className="section experience-section" id="experience">
      <div className="container-page">
        <Reveal>
          <div className="section-heading">
            <div><p className="section-kicker">01 / {locale === 'en' ? 'Selected work' : 'Projets sélectionnés'}</p><h2 className="section-title">{section.title}</h2></div>
            <p className="section-intro">{intro}</p>
          </div>
        </Reveal>
        <div className="experience-list">
          {section.items.map((job, index) => (
            <Reveal key={`${job.client}-${job.period.start}`} delay={index * .04}>
              <article className="experience-item">
                <aside className="experience-aside">
                  <motion.span
                    className="experience-marker"
                    aria-hidden="true"
                    initial={reduceMotion ? false : { scale: 0.55, rotate: -24, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 18, delay: index * 0.06 }}
                  >
                    0{index + 1}
                  </motion.span>
                  <time className="experience-period" dateTime={job.period.start}>{formatPeriod(job.period, locale)}</time>
                  <span className="experience-location">{job.location}</span>
                  <h3 className="experience-client">{job.client}</h3>
                </aside>
                <div>
                  <p className="experience-role">{job.role}</p>
                  {job.projects.map((project) => (
                    <div className="project-block" key={project.name}>
                      <h4 className="project-name">{project.name}</h4>
                      <p className="project-description">{project.description}</p>
                      {project.features.length > 0 && (
                        <ul className="project-features">
                          {project.features.map((feature, featureIndex) => (
                            <motion.li
                              key={feature}
                              initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : featureIndex * 0.035, ease: 'easeOut' }}
                            >
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      )}
                      <div className="tech-list" aria-label={locale === 'en' ? 'Technologies' : 'Technologies'}>
                        {project.technologies.map((technology, technologyIndex) => (
                          <motion.span
                            className="tech-chip"
                            key={technology}
                            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: reduceMotion ? 0 : 0.24, delay: reduceMotion ? 0 : technologyIndex * 0.025, ease: 'easeOut' }}
                          >
                            {technology}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}