import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Classes } from "@/components/Classes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-background">
      <Hero />
      <About />
      <Classes />
      
      {/* Footer minimalista incorporado aquí para rapidez */}
      <footer className="py-12 border-t border-foreground/10 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <h2 className="font-display text-4xl mb-6 text-brava-gold">EB</h2>
          <p className="font-sans text-sm text-foreground/50">
            © {new Date().getFullYear()} Esquina Brava. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
