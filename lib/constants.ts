export const OPENAI_CONFIG = {
  model: process.env.NODE_ENV === "development" ? "gpt-3.5-turbo" : "gpt-4",
  max_tokens: process.env.NODE_ENV === "development" ? 100 : 300,
  temperature: 0.7,
};

export const SYSTEM_PROMPT = 
  "Tu es un expert en rédaction de lettres de motivation professionnelles en français. Tu dois créer des lettres persuasives, bien structurées et adaptées au contexte professionnel français.";

export const ERROR_MESSAGES = {
  GENERATION: "Une erreur est survenue lors de la génération de la lettre de motivation",
  NETWORK: "Erreur de connexion au serveur",
  VALIDATION: "Veuillez vérifier les informations saisies",
  API_KEY: "Clé API OpenAI non configurée",
} as const;