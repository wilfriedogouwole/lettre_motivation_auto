import { MotivationLetterData } from './types';

export function createUserPrompt(data: MotivationLetterData): string {
  return `Rédige une lettre de motivation professionnelle pour un poste de ${data.jobTitle} chez ${data.company}.

Description du poste :
${data.jobDescription}

Mes compétences principales :
${data.skills}

Mon expérience professionnelle :
${data.experience}

Instructions spécifiques :
- La lettre doit être formelle et professionnelle
- Utilise la structure classique d'une lettre de motivation française
- Mets en avant la correspondance entre mes compétences et les exigences du poste
- Inclus une formule de politesse appropriée
- La lettre doit être persuasive et démontrer ma motivation
- Personnalise le contenu en fonction de l'entreprise et du poste`;
}