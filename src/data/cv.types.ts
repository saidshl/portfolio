export interface Profile {
  name: string
  logo: string
  title: string
  summary: string
  location: string
  contact: { email: string; phone: string; linkedin: string; github: string; nuget: string }
}

export interface SkillGroup { category: string; values: string[] }
export interface Project {
  name: string
  description: string
  features: string[]
  tasks: string[]
  technologies: string[]
}
export interface Job {
  role: string
  client: string
  period: { start: string; end: string | null }
  location: string
  projects: Project[]
}
export interface EducationItem { period: string; title: string; institution: string }
export interface CertificationItem { title: string; issuer: string; year: string }
export interface LanguageItem { name: string; level: string }

interface SectionBase<T extends string, I> { id: string; type: T; title: string; items: I[] }

export type Section =
  | SectionBase<'skills', SkillGroup>
  | SectionBase<'timeline', Job>
  | SectionBase<'education', EducationItem>
  | SectionBase<'certifications', CertificationItem>
  | SectionBase<'languages', LanguageItem>

export interface Cv {
  locale: 'en' | 'fr'
  profile: Profile
  sections: Section[]
}
