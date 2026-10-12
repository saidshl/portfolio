import en from './cv.en.json'
import fr from './cv.fr.json'
import type { Cv } from './cv.types'

export const cvByLocale = { en, fr } as unknown as Record<Cv['locale'], Cv>
export type { Cv, Section } from './cv.types'
