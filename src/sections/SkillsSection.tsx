import type { Cv } from '../data'
import { Reveal } from '../components/Reveal'
import { motion, useReducedMotion } from 'framer-motion'

interface SkillsSectionProps {
  cv: Cv
  locale: Cv['locale']
}

export function SkillsSection({ cv, locale }: SkillsSectionProps) {
  const reduceMotion = useReducedMotion()
  const section = cv.sections.find((item) => item.type === 'skills')
  if (!section || section.type !== 'skills') return null
  const intro = locale === 'en'
    ? 'A practical toolkit spanning application development, distributed systems, data, and quality.'
    : 'Un ensemble d’outils couvrant le développement applicatif, les systèmes distribués, les données et la qualité.'

  return (
    <section className="section skills-section" id="expertise">
      <div className="container-page skills-layout">
        <Reveal>
          <div><p className="section-kicker">02 / {locale === 'en' ? 'What I work with' : 'Mon environnement'}</p><h2 className="section-title">{section.title}</h2><p className="section-intro skills-intro">{intro}</p></div>
        </Reveal>
        <div className="skill-groups">
          {section.items.map((group, index) => (
            <Reveal key={group.category} delay={index * .035}>
              <div className={`skill-group skill-group-tone-${index % 4}`}>
                <div className="skill-group-heading">
                  <span className="skill-group-index">0{index + 1}</span>
                  <h3 className="skill-category">{group.category}</h3>
                </div>
                <div className="skill-values">
                  {group.values.map((skill, skillIndex) => (
                    <motion.span
                      className="skill-value"
                      key={skill}
                      initial={reduceMotion ? false : { opacity: 0, y: 7 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: reduceMotion ? 0 : 0.26, delay: reduceMotion ? 0 : skillIndex * 0.025, ease: 'easeOut' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}