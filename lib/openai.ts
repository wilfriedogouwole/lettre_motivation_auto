export async function generateMotivationLetter(data: {
  jobTitle: string;
  company: string;
  jobDescription: string;
  skills: string;
  experience: string;
}) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erreur réseau');
    }

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    return result.content;
  } catch (error) {
    console.error('Erreur lors de la génération de la lettre:', error);
    throw new Error('Erreur lors de la génération de la lettre de motivation');
  }
}