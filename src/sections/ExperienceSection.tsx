import type { Cv, Section } from '../data'
import { Reveal } from '../components/Reveal'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

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
  const projects = section.items.flatMap((job) => job.projects.map((project) => ({
    ...project,
    client: job.client,
    location: job.location,
    period: formatPeriod(job.period, locale),
    role: job.role,
  })))
  return <ExperienceExplorer projects={projects} locale={locale} reduceMotion={reduceMotion} title={section.title} />
}

interface ExperienceExplorerProps {
  projects: (Extract<Section, { type: 'timeline' }>['items'][number]['projects'][number] & {
    client: string
    location: string
    period: string
    role: string
  })[]
  locale: Cv['locale']
  reduceMotion: boolean | null
  title: string
}

function ExperienceExplorer({ projects, locale, reduceMotion, title }: ExperienceExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex]
  const intro = locale === 'en'
    ? 'A closer look at the environments, challenges, and strengths behind selected work.'
    : 'Un aperçu des contextes, des défis et des compétences mobilisées sur des projets choisis.'
  const labels = locale === 'en'
    ? { index: 'Project files', context: 'Context', outcomes: 'What I worked on', people: 'How I work', practices: 'Engineering practices', tools: 'Technology in the field', select: 'Select a project' }
    : { index: 'Projets', context: 'Contexte', outcomes: 'Réalisations', people: 'Savoir-être', practices: 'Pratiques d’ingénierie', tools: 'Technologies mobilisées', select: 'Choisir un projet' }

  return (
    <section className="section experience-section" id="experience">
      <div className="container-page">
        <Reveal>
          <div className="section-heading">
            <div><p className="section-kicker">01 / {locale === 'en' ? 'Selected work' : 'Projets sélectionnés'}</p><h2 className="section-title">{title}</h2></div>
            <p className="section-intro">{intro}</p>
          </div>
        </Reveal>
        <div className="experience-explorer">
          <nav className="project-index" aria-label={labels.select}>
            <p className="project-index-label">{labels.index}<span>0{projects.length}</span></p>
            {projects.map((project, index) => (
              <button
                className={`project-index-item${index === activeIndex ? ' is-active' : ''}`}
                type="button"
                key={`${project.client}-${project.name}`}
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
              >
                <span className="project-index-number">0{index + 1}</span>
                <span className="project-index-copy"><span>{project.client}</span><strong>{project.name}</strong></span>
                <span className="project-index-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </nav>
          <div className="project-stage" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                className="project-spotlight"
                key={activeProject.name}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : .28, ease: 'easeOut' }}
              >
                <div className="project-context-line"><span>{activeProject.client}</span><span>{activeProject.location}</span><span>{activeProject.period}</span></div>
                <p className="experience-role">{activeProject.role}</p>
                <h3 className="project-name">{activeProject.name}</h3>
                <div className="project-context">
                  <span className="project-section-label">{labels.context}</span>
                  <p className="project-description">{activeProject.description}</p>
                </div>
                <div className="project-signal-grid">
                  <div className="project-signal project-outcomes">
                    <h4 className="project-section-label">{labels.outcomes}</h4>
                    <ul className="project-features">
                      {activeProject.features.map((feature, index) => (
                        <motion.li
                          key={feature}
                          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: reduceMotion ? 0 : .22, delay: reduceMotion ? 0 : index * .035 }}
                        >{feature}</motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="project-signal project-people">
                    <h4 className="project-section-label">{labels.people}</h4>
                    <ul className="soft-skill-list">
                      {activeProject.softSkills.map((skill) => <li key={skill}>{skill}</li>)}
                    </ul>
                  </div>
                </div>
                {activeProject.tasks.length > 0 && (
                  <div className="project-practice-strip">
                    <h4 className="project-section-label">{labels.practices}</h4>
                    <div className="project-practice-list">
                      {activeProject.tasks.map((task) => <span key={task}>{task}</span>)}
                    </div>
                  </div>
                )}
                <div className="project-toolkit">
                  <h4 className="project-section-label">{labels.tools}</h4>
                  <div className="tech-list" aria-label={labels.tools}>
                    {activeProject.technologies.map((technology) => <span className="tech-chip" key={technology}>{technology}</span>)}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}