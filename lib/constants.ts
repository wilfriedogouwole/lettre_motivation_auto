export const OPENAI_CONFIG = {
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  max_tokens: 1000,
};

export const SYSTEM_PROMPT = 
  "Tu es un expert en rédaction de lettres de motivation professionnelles en français. Tu dois créer des lettres persuasives, bien structurées et adaptées au contexte professionnel français.";

export const ERROR_MESSAGES = {
  GENERATION: "Une erreur est survenue lors de la génération de la lettre de motivation",
  NETWORK: "Erreur de connexion au serveur",
  VALIDATION: "Veuillez vérifier les informations saisies",
  API_KEY: "Clé API OpenAI non configurée",
} as const;