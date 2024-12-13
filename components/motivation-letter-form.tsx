"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motivationLetterSchema } from "@/lib/schemas";
import { generateLetter } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf"; // Import jsPDF
import type { MotivationLetterData } from "@/lib/types";
import type * as z from "zod";

export function MotivationLetterForm() {
  const [generatedLetter, setGeneratedLetter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<MotivationLetterData>({
    resolver: zodResolver(motivationLetterSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      jobDescription: "",
      skills: "",
      experience: "",
    },
  });

  async function onSubmit(values: z.infer<typeof motivationLetterSchema>) {
    try {
      setIsLoading(true);
      const letter = await generateLetter(values);
      setGeneratedLetter(letter);
      toast({
        title: "Lettre générée avec succès !",
        description: "Vous pouvez maintenant copier et personnaliser votre lettre.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Une erreur est survenue";
      toast({
        title: "Erreur",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
      title: "Copié !",
      description: "La lettre a été copiée dans le presse-papier.",
    });
  };

  // Fonction pour générer le PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Ajouter le contenu de la lettre au PDF
    doc.text(generatedLetter, 10, 10);

    // Télécharger le PDF
    doc.save("lettre_de_motivation.pdf");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ScrollText className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            Générateur de Lettre de Motivation
          </CardTitle>
          <CardDescription>
            Remplissez les informations ci-dessous pour générer une lettre de motivation personnalisée
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre du poste</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Développeur Full Stack" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entreprise</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Google" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description du poste</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Copiez l'offre d'emploi ici..."
                        className="min-h-[100px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Incluez les principales responsabilités et exigences du poste
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vos compétences clés</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Ex: JavaScript, React, Node.js, 5 ans d'expérience en développement web..."
                        className="min-h-[100px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expérience pertinente</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez brièvement votre expérience professionnelle pertinente..."
                        className="min-h-[100px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Génération en cours..." : "Générer la lettre de motivation"}
              </Button>
            </form>
          </Form>

          {generatedLetter && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Lettre de motivation générée :</h3>
              <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                {generatedLetter}
              </div>
              <Button
                className="mt-4 w-full"
                variant="secondary"
                onClick={handleCopyToClipboard}
              >
                Copier la lettre
              </Button>

              {/* Bouton pour télécharger la lettre en PDF */}
              <Button
                className="mt-4 w-full"
                
                onClick={handleDownloadPDF}
              >
                Télécharger la lettre en PDF
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
