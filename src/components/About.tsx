"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Configuración inicial
      gsap.set(".about-text-mask", { y: "110%" });
      gsap.set(".about-image", { scale: 1.1, opacity: 0 });

      // Animación de texto
      ScrollTrigger.create({
        trigger: container.current,
        start: "top 70%",
        animation: gsap.to(".about-text-mask", {
          y: "0%",
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        }),
      });

      // Animación de imagen
      ScrollTrigger.create({
        trigger: container.current,
        start: "top 60%",
        animation: gsap.to(".about-image", {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        }),
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative py-32 px-4 md:px-12 lg:px-24 min-h-screen flex items-center"
      style={{ backgroundColor: '#050505' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Contenido de texto */}
        <div className="order-2 lg:order-1">
          <h2 className="font-display text-5xl md:text-7xl mb-8 uppercase leading-[0.9]">
            <span className="text-mask-container block">
              <span className="about-text-mask block text-brava-gold">No somos</span>
            </span>
            <span className="text-mask-container block">
              <span className="about-text-mask block" style={{ color: '#F4F4F5' }}>
                un gimnasio
              </span>
            </span>
            <span className="text-mask-container block">
              <span className="about-text-mask block" style={{ color: '#F4F4F5' }}>
                convencional.
              </span>
            </span>
          </h2>

          <div className="space-y-6 text-foreground/70 font-sans text-lg mb-10 max-w-lg">
            <p className="text-mask-container">
              <span className="about-text-mask block">
                Aquí no vienes a sacarte selfies en espejos limpios. Vienes a
                sudar, a golpear duro y a encontrar el límite de lo que creías
                posible.
              </span>
            </p>
            <p className="text-mask-container">
              <span className="about-text-mask block">
                Entrenadores de la vieja escuela combinados con metodologías de
                alto rendimiento. Un ambiente donde el respeto se gana en la lona.
              </span>
            </p>
          </div>

          <div className="text-mask-container">
            <div className="about-text-mask">
              <Button variant="outline">Conoce a los Entrenadores</Button>
            </div>
          </div>
        </div>

        {/* Imágenes solapadas */}
        <div className="order-1 lg:order-2 relative h-[50vh] lg:h-[70vh] w-full">
          {/* Imagen Principal — placeholder visual */}
          <div className="about-image absolute top-0 right-0 w-4/5 h-4/5 border border-brava-gold/30 flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'rgba(212,175,55,0.06)' }}>
             <div className="font-display text-4xl" style={{ color: 'rgba(244,244,245,0.15)' }}>FOTO_ENTRENO.JPG</div>
          </div>
          
          {/* Imagen Secundaria Solapada */}
          <div className="about-image absolute bottom-0 left-0 w-3/5 h-3/5 border border-brava-gold/50 flex items-center justify-center backdrop-blur-sm -translate-y-10 translate-x-10" style={{ backgroundColor: 'rgba(212,175,55,0.08)' }}>
             <div className="font-display text-2xl" style={{ color: 'rgba(212,175,55,0.4)' }}>FOTO_DETALLE.JPG</div>
          </div>

          {/* Elemento Decorativo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-display text-background opacity-5 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] z-20 pointer-events-none mix-blend-difference">
            BOX
          </div>
        </div>
      </div>
    </section>
  );
}
