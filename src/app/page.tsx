import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Classes } from "@/components/Classes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-background">
      <Hero />
      <About />
      <Classes />
      
      <footer className="py-16 border-t border-foreground/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-12">
            
            {/* Logo y Dirección */}
            <div>
              <h2 className="font-display text-4xl mb-6 gold-text">EB</h2>
              <p className="font-sans text-foreground/70 mb-2">
                <span className="gold-text font-semibold">Dirección:</span><br/>
                Calle Villena 1<br/>
                Villaverde Bajo<br/>
                28021 Madrid
              </p>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="font-display text-xl tracking-widest uppercase mb-6 gold-text">Contacto</h3>
              <p className="font-sans text-foreground/70">
                <a href="tel:+34699961487" className="hover:text-brava-gold transition-colors">
                  +34 699 961 487
                </a>
                <br/><br/>
                <a 
                  href="https://wa.me/34699961487" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-2 font-display uppercase tracking-widest text-xs px-4 py-2 border border-brava-gold text-brava-gold hover:bg-brava-gold hover:text-background transition-colors"
                >
                  Escríbenos por WhatsApp
                </a>
              </p>
            </div>

            {/* Horarios */}
            <div>
              <h3 className="font-display text-xl tracking-widest uppercase mb-6 gold-text">Horarios</h3>
              <ul className="font-sans text-foreground/70 space-y-3 text-sm">
                <li>
                  <strong className="text-foreground">Lunes a Jueves:</strong><br/>
                  10:00 - 12:00 y 16:00 - 21:00
                </li>
                <li>
                  <strong className="text-foreground">Viernes:</strong><br/>
                  10:00 - 12:00 y 16:00 - 20:00
                </li>
                <li>
                  <strong className="text-foreground">Sábados:</strong><br/>
                  10:00 - 12:00
                </li>
                <li className="pt-2 border-t border-white/10 text-brava-gold">
                  * Lunes, miércoles y viernes de 16:00 a 18:00 es horario exclusivo para niños.
                </li>
              </ul>
            </div>

          </div>
          <div className="text-center pt-8 border-t border-foreground/10">
            <p className="font-sans text-sm text-foreground/40">
              © {new Date().getFullYear()} Esquina Brava. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
