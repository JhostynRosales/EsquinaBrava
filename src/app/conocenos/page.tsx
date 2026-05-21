"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    name: "Entrenador 1",
    role: "Head Coach",
    bio: "Ex boxeador profesional con más de 15 años de experiencia en el ring. Su filosofía se basa en la disciplina férrea, la técnica impecable y el respeto mutuo. Especialista en acondicionamiento físico y estrategia de combate.",
    image: "/logoBoxeo.jpeg", // Placeholder
  },
  {
    name: "Entrenador 2",
    role: "Especialista Técnico",
    bio: "Experto en las artes del boxeo clásico. Conocido por su enfoque meticuloso en los fundamentos y la defensa. Su entrenamiento está diseñado para forjar la resistencia mental y preparar a los peleadores para los momentos más duros.",
    image: "/logoBoxeo.jpeg", // Placeholder
  }
];

export default function ConocenosPage() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Animación de entrada de la cabecera
      gsap.from(".header-content", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      });

      // Animación al hacer scroll de los entrenadores
      const trainerCards = gsap.utils.toArray(".trainer-card");
      
      trainerCards.forEach((card: any, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1
        });
      });
    },
    { scope: container }
  );

  return (
    <main ref={container} className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12">
      
      {/* Cabecera */}
      <div className="max-w-5xl mx-auto mb-20 header-content relative z-10">
        <Link href="/" className="inline-flex items-center text-brava-gold hover:text-white transition-colors duration-300 font-display tracking-widest text-sm uppercase mb-12">
          <MoveLeft className="w-5 h-5 mr-3" />
          Volver a la Esquina
        </Link>
        
        <h1 className="font-display text-6xl md:text-8xl uppercase leading-none drop-shadow-md">
          Conoce a la <br />
          <span className="gold-text">Familia</span>
        </h1>
        <div className="w-20 h-1 bg-brava-gold my-8" style={{ background: "var(--gold-gradient)" }} />
        <p className="font-sans text-xl text-foreground/70 max-w-2xl">
          Nuestros entrenadores no solo te enseñarán a lanzar golpes, te enseñarán a forjar tu carácter. Conoce a los profesionales detrás de Esquina Brava.
        </p>
      </div>

      {/* Lista de Entrenadores */}
      <div className="max-w-5xl mx-auto space-y-32">
        {trainers.map((trainer, index) => (
          <div key={index} className={`trainer-card flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center relative z-10`}>
            
            {/* Foto del Entrenador */}
            <div className="w-full md:w-1/2 relative">
              {/* Decoración detrás de la foto */}
              <div className="absolute inset-0 bg-brava-gold/10 transform translate-x-4 translate-y-4 border border-brava-gold/30 -z-10" />
              
              <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-transparent" style={{ background: "linear-gradient(#050505, #050505) padding-box, var(--gold-gradient) border-box" }}>
                {/* 
                  Sustituiremos la ruta del src cuando tengamos las fotos reales.
                  Por ahora usamos el logo como placeholder.
                */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                   <p className="font-display text-brava-gold/50 text-2xl uppercase tracking-widest">FOTO_ENTRENADOR</p>
                </div>
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
              </div>
            </div>

            {/* Información del Entrenador */}
            <div className="w-full md:w-1/2">
              <p className="font-display tracking-widest text-sm gold-text uppercase mb-4">
                {trainer.role}
              </p>
              <h2 className="font-display text-4xl md:text-6xl uppercase mb-8">
                {trainer.name}
              </h2>
              <p className="font-sans text-lg text-foreground/80 leading-relaxed mb-8">
                {trainer.bio}
              </p>
              
              <a 
                href={`https://wa.me/34699961487?text=${encodeURIComponent(`Hola, me gustaría información sobre entrenar con ${trainer.name}.`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="font-display uppercase tracking-widest text-sm px-8 py-4 border border-brava-gold text-brava-gold hover:bg-brava-gold hover:text-background transition-colors duration-300">
                  Contactar por WhatsApp
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
      
    </main>
  );
}
