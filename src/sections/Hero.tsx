import { motion, useReducedMotion } from 'framer-motion'
import type { Cv } from '../data'

interface HeroProps {
  cv: Cv
  locale: Cv['locale']
}

export function Hero({ cv, locale }: HeroProps) {
  const reduceMotion = useReducedMotion()
  const copy = locale === 'en'
  ? { eyebrow: 'ENGINEERING PROFILE / 01', map: 'SKILL CONSTELLATION / CV', diagram: 'Technical skills constellation centered on .NET 8, connecting application, frontend, architecture, and messaging skills', index: 'SASHL / ENGINEERING', core: 'CORE / .NET 8', constellationTitle: 'A connected engineering toolkit' }
  : { eyebrow: 'PROFIL INGÉNIERIE / 01', map: 'CONSTELLATION DE COMPÉTENCES', diagram: 'Constellation de compétences techniques centrée sur .NET 8, reliant développement, architecture et messagerie', index: 'SASHL / INGÉNIERIE', core: 'COEUR / .NET 8', constellationTitle: 'Un ensemble de compétences connectées' }
  const skillSection = cv.sections.find((section) => section.type === 'skills')
  const skillsFor = (category: RegExp) => skillSection?.type === 'skills'
    ? skillSection.items.find((group) => category.test(group.category))?.values ?? []
    : []
  const frontendSkills = skillsFor(/^Frameworks/).filter((skill) => /^(Angular|React\.js)$/.test(skill))
  const applicationSkills = [
    ...skillsFor(/^Languages$|^Langages$/).filter((skill) => skill === 'C#'),
    ...skillsFor(/^Frameworks/).filter((skill) => /^(\.NET 8|ASP\.NET Core|ASP\.NET Framework)$/.test(skill)),
  ]
  const architectureSkills = skillsFor(/^Architectures$/).filter((skill) => /^(Event Driven Architecture|Clean Architecture|Microservices)$/.test(skill))
  const messagingSkills = skillsFor(/^Project Tools$|^Outils de projet$/).filter((skill) => /^(Kafka|RabbitMQ)$/.test(skill))
  const coreSkill = applicationSkills.find((skill) => skill === '.NET 8') ?? applicationSkills[0] ?? 'C#'
  const constellationSkills = [
    ...applicationSkills.filter((skill) => skill !== coreSkill).map((skill) => ({ skill, category: 'application' })),
    ...frontendSkills.map((skill) => ({ skill, category: 'frontend' })),
    ...architectureSkills.map((skill) => ({ skill, category: 'architecture' })),
    ...messagingSkills.map((skill) => ({ skill, category: 'messaging' })),
  ]
  const constellationPositions = [
    { left: 20, top: 21 }, { left: 50, top: 17 }, { left: 80, top: 22 },
    { left: 83, top: 48 }, { left: 78, top: 77 }, { left: 50, top: 87 },
    { left: 22, top: 78 }, { left: 17, top: 49 }, { left: 35, top: 38 },
    { left: 66, top: 39 },
  ]
  return (
    <section className="hero-section" id="top">
      <div className="container-page hero-grid">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="hero-name" aria-label={cv.profile.name}>
            <span className="hero-code-keyword" aria-hidden="true">Said</span>{' '}
            <span>SOUHAYEL</span>
          </h1>
          <p className="hero-title"><span className="hero-code-comment" aria-hidden="true">// </span>{cv.profile.title}</p>
          <div className="hero-terminal" aria-label={locale === 'en' ? 'Profile summary in PowerShell style' : 'Résumé de profil au format PowerShell'}>
            <div className="hero-terminal-bar" aria-hidden="true">
              <span className="hero-terminal-dots"><i /><i /><i /></span>
              <span className="hero-terminal-prompt">PS C:\SASHL&gt;</span>
              <span className="hero-terminal-command">Get-Content .\profile.txt</span>
            </div>
            <p className="hero-terminal-output"><span aria-hidden="true">&gt; </span>{cv.profile.summary}</p>
          </div>
          <div className="hero-meta"><span className="status-dot" aria-hidden="true" />{cv.profile.location}</div>
        </motion.div>

        <motion.figure
          className="system-figure"
          aria-label={copy.diagram}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: 16 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, delayChildren: 0.12, staggerChildren: 0.09 } },
          }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 24 }}
        >
          <span className="figure-label">{copy.map}</span>
          <div className="skill-universe" aria-label={copy.diagram}>
            <h3 className="constellation-title">{copy.constellationTitle}</h3>
            <svg className="constellation-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {constellationSkills.map(({ skill, category }, index) => {
                const position = constellationPositions[index % constellationPositions.length]
                return (
                  <motion.path
                    className={`constellation-link constellation-link-${category}`}
                    key={`${skill}-link`}
                    d={`M50 53 L${position.left} ${position.top}`}
                    initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: reduceMotion ? 0.28 : 0.48 }}
                    transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.16 + index * 0.045, ease: 'easeOut' }}
                  />
                )
              })}
            </svg>
            <motion.div
              className="constellation-core"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{copy.core}</span>
              <strong>{coreSkill}</strong>
            </motion.div>
            <ul className="constellation-nodes">
              {constellationSkills.map(({ skill, category }, index) => {
                const position = constellationPositions[index % constellationPositions.length]
                return (
                  <li
                    className="constellation-node-position"
                    key={skill}
                    style={{ left: `${position.left}%`, top: `${position.top}%` }}
                  >
                    <motion.span
                      className={`constellation-node constellation-node-${category}`}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: reduceMotion ? 0 : 0.34, delay: reduceMotion ? 0 : 0.2 + index * 0.055, ease: 'easeOut' }}
                    >
                      <span className="constellation-star" aria-hidden="true" />
                      <span className="constellation-skill-name">{skill}</span>
                    </motion.span>
                  </li>
                )
              })}
            </ul>
          </div>
          <figcaption className="system-caption">{copy.diagram}</figcaption>
          <span className="figure-index">{copy.index}</span>
        </motion.figure>
      </div>
    </section>
  )
}