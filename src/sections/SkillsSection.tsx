import type { Cv } from '../data'
import { Reveal } from '../components/Reveal'

interface SkillsSectionProps {
  cv: Cv
  locale: Cv['locale']
}

export function SkillsSection({ cv, locale }: SkillsSectionProps) {
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
              <div className="skill-group">
                <h3 className="skill-category">{group.category}</h3>
                <div className="skill-values">{group.values.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}