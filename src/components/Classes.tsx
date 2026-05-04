"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/Button";

gsap.registerPlugin(ScrollTrigger);

const classTypes = [
  {
    title: "BOXEO CLÁSICO",
    desc: "Fundamentos, técnica y sparring controlado. Para quienes quieren aprender el arte noble desde cero.",
    time: "LUN / MIE / VIE - 19:00",
  },
  {
    title: "ACONDICIONAMIENTO",
    desc: "Entrenamiento de alta intensidad (HIIT) enfocado en fuerza explosiva y resistencia cardiovascular.",
    time: "MAR / JUE - 18:00",
  },
  {
    title: "COMPETICIÓN",
    desc: "Solo por invitación. Preparación física y táctica para peleadores amateur y profesionales.",
    time: "LUN a VIE - 20:30",
  },
];

export function Classes() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".class-card");
      
      cards.forEach((card: any, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          animation: gsap.fromTo(
            card,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
          ),
        });
      });

      ScrollTrigger.create({
        trigger: ".classes-title",
        start: "top 80%",
        animation: gsap.fromTo(
          ".classes-title",
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power4.out" }
        ),
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative py-24" style={{ backgroundColor: '#F4F4F5', color: '#050505' }}>
      {/* Textura de fondo invertida */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} 
      />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <h2 className="classes-title font-display text-7xl md:text-9xl mb-16 uppercase drop-shadow-md" style={{ color: '#050505' }}>
          Nuestras <br />
          <span className="text-brava-gold">Disciplinas</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-12 justify-end mt-[-100px] md:mt-[-200px] relative z-20">
          {classTypes.map((cls, index) => (
            <div
              key={index}
              className={`class-card p-8 md:p-12 border-t-4 border-brava-gold shadow-2xl flex-1 ${
                index === 1 ? "md:translate-y-20" : ""
              } ${index === 2 ? "md:translate-y-40" : ""}`}
              style={{ backgroundColor: '#050505', color: '#F4F4F5' }}
            >
              <h3 className="font-display text-3xl mb-4 uppercase" style={{ color: '#F4F4F5' }}>{cls.title}</h3>
              <p className="font-sans mb-8 min-h-[80px]" style={{ color: 'rgba(244,244,245,0.6)' }}>
                {cls.desc}
              </p>
              <div className="border-t pt-4 mb-8" style={{ borderColor: 'rgba(244,244,245,0.1)' }}>
                <p className="font-display tracking-widest text-sm text-brava-gold">
                  {cls.time}
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Reservar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
