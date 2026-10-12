import { motion, useReducedMotion } from 'framer-motion'
import type { Cv } from '../data'

interface HeroProps {
  cv: Cv
  locale: Cv['locale']
}

export function Hero({ cv, locale }: HeroProps) {
  const reduceMotion = useReducedMotion()
  const copy = locale === 'en'
  ? { eyebrow: 'ENGINEERING PROFILE / 01', map: 'DEVELOPER STACK / 04 LAYERS', diagram: 'Frontend, .NET application stack, clean architecture, microservices, and event messaging', index: 'SASHL / ENGINEERING', frontend: 'FRONTEND', application: 'APPLICATION CORE', architecture: 'ARCHITECTURE', messaging: 'EVENT MESSAGING', api: 'REST API', service: 'MICROSERVICE', worker: 'WORKER', eventBus: 'EVENT BUS' }
  : { eyebrow: 'PROFIL INGÉNIERIE / 01', map: 'STACK DÉVELOPPEUR / 04 COUCHES', diagram: 'Frontend, stack applicative .NET, architecture logicielle, microservices et messagerie événementielle', index: 'SASHL / INGÉNIERIE', frontend: 'FRONTEND', application: 'COEUR APPLICATIF', architecture: 'ARCHITECTURE', messaging: 'MESSAGERIE ÉVÉNEMENTIELLE', api: 'API REST', service: 'MICROSERVICE', worker: 'WORKER', eventBus: 'BUS ÉVÉNEMENTIEL' }
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
  const skillLayers = [
    { label: copy.frontend, skills: frontendSkills, architecture: false },
    { label: copy.application, skills: applicationSkills, architecture: false },
    { label: copy.architecture, skills: architectureSkills, architecture: true },
    { label: copy.messaging, skills: messagingSkills, architecture: false },
  ].filter((layer) => layer.skills.length > 0)
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
            <span className="hero-code-keyword" aria-hidden="true">public class</span>{' '}
            <span>{cv.profile.name}</span>
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
          whileHover={reduceMotion ? undefined : { y: -3 }}
          variants={{
            hidden: { opacity: 0, x: 16 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, delayChildren: 0.12, staggerChildren: 0.09 } },
          }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 24 }}
        >
          <span className="figure-label">{copy.map}</span>
          <div className="dev-stack" aria-label={copy.diagram}>
            {skillLayers.map((layer, index) => (
              <div className="dev-layer" key={layer.label}>
                <div className="dev-layer-heading">
                  <span className="dev-layer-index">0{index + 1}</span>
                  <span className="dev-layer-label">{layer.label}</span>
                </div>
                <ul className="dev-layer-skills">
                  {layer.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
                {layer.architecture && (
                  <div className="architecture-flow" aria-label={`${copy.api} to ${copy.service} to ${copy.worker} through ${copy.eventBus}`}>
                    <div className="architecture-service-chain" aria-hidden="true">
                      <span className="architecture-node">{copy.api}</span>
                      <span className="architecture-connector" />
                      <span className="architecture-node">{copy.service}</span>
                      <span className="architecture-connector" />
                      <span className="architecture-node">{copy.worker}</span>
                    </div>
                    <div className="architecture-event-bus">
                      <span className="architecture-event-dot" aria-hidden="true" />
                      <span>{copy.eventBus}</span>
                      <strong>{messagingSkills.join(' / ')}</strong>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <figcaption className="system-caption">{copy.diagram}</figcaption>
          <span className="figure-index">{copy.index}</span>
        </motion.figure>
      </div>
    </section>
  )
}