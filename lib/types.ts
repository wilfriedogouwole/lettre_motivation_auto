export interface MotivationLetterData {
  jobTitle: string;
  company: string;
  jobDescription: string;
  skills: string;
  experience: string;
}

export interface GenerateResponse {
  content?: string;
  error?: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}