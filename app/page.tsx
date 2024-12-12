import { Suspense } from 'react';
import { MotivationLetterForm } from "@/components/motivation-letter-form";

export default function Home() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <MotivationLetterForm />
    </Suspense>
  );
}