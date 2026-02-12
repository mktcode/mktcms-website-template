import { z } from 'zod'
import { disallowLinks, linkErrorMessage } from './linkValidation'

export const formSchema = z.object({
  lastname: z.string().min(1, 'Nachname ist erforderlich').refine(disallowLinks, linkErrorMessage),
  firstname: z.string().min(1, 'Vorname ist erforderlich').refine(disallowLinks, linkErrorMessage),
  email: z.email('Ungültige E-Mail-Adresse').min(1, 'E-Mail ist erforderlich').refine(disallowLinks, linkErrorMessage),
  message: z.string().min(1, 'Nachricht ist erforderlich').refine(disallowLinks, linkErrorMessage),
  acceptPrivacyPolicy: z.boolean().refine((value) => value === true, 'Sie müssen die Datenschutzerklärung akzeptieren'),
})