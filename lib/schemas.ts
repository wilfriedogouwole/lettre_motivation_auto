import * as z from "zod";

export const motivationLetterSchema = z.object({
  jobTitle: z.string().min(2, {
    message: "Le titre du poste doit contenir au moins 2 caractères.",
  }),
  company: z.string().min(2, {
    message: "Le nom de l'entreprise doit contenir au moins 2 caractères.",
  }),
  jobDescription: z.string().min(50, {
    message: "La description du poste doit contenir au moins 50 caractères.",
  }),
  skills: z.string().min(10, {
    message: "Vos compétences doivent contenir au moins 10 caractères.",
  }),
  experience: z.string().min(10, {
    message: "Votre expérience doit contenir au moins 10 caractères.",
  }),
});