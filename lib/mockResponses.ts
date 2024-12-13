import { MotivationLetterData } from "./types";

export function getMockResponse(data: MotivationLetterData): string {
  const skillsList = Array.isArray(data.skills)
    ? data.skills.map(skill => `<li>${skill}</li>`).join('')
    : "<li>Aucune compétence spécifiée.</li>";

  return `
    <p>Chère équipe de <strong>${data.company}</strong>,</p>
    <p>Je suis ravi(e) de postuler au poste de <strong>${data.jobTitle}</strong>.</p>
    <p>Je maîtrise les compétences suivantes :</p>
    <ul>${skillsList}</ul>
    <p>Dans l’attente de votre retour favorable, veuillez agréer mes salutations distinguées.</p>
  `;
}
