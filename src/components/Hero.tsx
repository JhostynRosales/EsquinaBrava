"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "./ui/Button";
import { MoveDown } from "lucide-react";

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const glovesRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Setup inicial — todo invisible
      gsap.set(glovesRef.current, { scale: 0, opacity: 0 });
      gsap.set(raysRef.current, { opacity: 0 });
      gsap.set(".hero-text-mask", { y: "110%" });
      gsap.set(btnRef.current, { opacity: 0, y: 24 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      // 1. Parpadeo eléctrico de los rayos (luz defectuosa de neón)
      tl.to(raysRef.current, {
        opacity: 1,
        duration: 0.07,
        repeat: 7,
        yoyo: true,
        ease: "none",
      });

      // 2. Guantes irrumpen con golpe brutal hacia adelante
      tl.to(
        glovesRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(2.2)",
        },
        "-=0.15"
      );

      // 3. Título emerge desde máscaras (izq → der)
      tl.to(
        ".hero-text-mask",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.12,
          ease: "power4.out",
        },
        "-=0.4"
      );

      // 4. CTA y scroll indicator entran
      tl.to(
        [btnRef.current, scrollIndicatorRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.18,
          ease: "power3.out",
        },
        "-=0.25"
      );

      // Loop continuo del scroll indicator
      gsap.to(".scroll-arrow", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: "sine.inOut",
        delay: 2.5,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ backgroundColor: "#050505" }}
    >
      {/* "EB" fantasma de fondo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display leading-none"
          style={{
            fontSize: "28vw",
            color: "rgba(212,175,55,0.04)",
            filter: "blur(2px)",
          }}
        >
          EB
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-0 w-full max-w-5xl">

        {/* Logo central con guantes */}
        <div className="relative mb-8 flex items-center justify-center" style={{ width: 220, height: 220 }}>
          {/* Rayos */}
          <div
            ref={raysRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 0 }}
          >
            {/* Rayo izquierdo */}
            <svg
              style={{ position: "absolute", left: -56, top: "22%", transform: "rotate(-15deg)" }}
              width="52" height="52" viewBox="0 0 24 24" fill="#D4AF37"
              filter="url(#glow)"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <path d="M13 2L4.5 13.5H11L10 22l9.5-12H13L13 2z"/>
            </svg>
            {/* Rayo derecho */}
            <svg
              style={{ position: "absolute", right: -56, top: "22%", transform: "rotate(15deg)" }}
              width="52" height="52" viewBox="0 0 24 24" fill="#D4AF37"
            >
              <path d="M13 2L4.5 13.5H11L10 22l9.5-12H13L13 2z"/>
            </svg>
          </div>

          {/* Círculo con guantes */}
          <div
            ref={glovesRef}
            style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: "2px solid #D4AF37",
              backgroundColor: "rgba(212,175,55,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 60px rgba(212,175,55,0.2), 0 0 120px rgba(212,175,55,0.06)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <svg viewBox="0 0 110 90" width="160" height="130" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Guante izquierdo */}
              <path d="M6 52 C6 39 13 28 24 23 L29 21 C33 19 37 21 38 26 L42 42 C43 46 40 50 36 51 L33 52 L33 64 C33 68 29 71 25 71 L14 71 C10 71 6 68 6 64 Z" fill="#D4AF37"/>
              <path d="M29 21 L33 12 C35 8 31 4 27 7 L22 11 C18 15 18 22 23 24 Z" fill="#B8960A"/>
              <line x1="6" y1="56" x2="33" y2="56" stroke="#9A7A08" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Guante derecho (espejado) */}
              <path d="M104 52 C104 39 97 28 86 23 L81 21 C77 19 73 21 72 26 L68 42 C67 46 70 50 74 51 L77 52 L77 64 C77 68 81 71 85 71 L96 71 C100 71 104 68 104 64 Z" fill="#D4AF37"/>
              <path d="M81 21 L77 12 C75 8 79 4 83 7 L88 11 C92 15 92 22 87 24 Z" fill="#B8960A"/>
              <line x1="104" y1="56" x2="77" y2="56" stroke="#9A7A08" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Cuerda */}
              <path d="M38 29 C50 19 60 19 72 29" stroke="#7A6008" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Título principal con máscaras */}
        <h1 className="font-display uppercase m-0 p-0 leading-[0.88]" style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}>
          <span style={{ overflow: "hidden", display: "block" }}>
            <span className="hero-text-mask" style={{ display: "block", color: "#D4AF37" }}>
              Esquina
            </span>
          </span>
          <span style={{ overflow: "hidden", display: "block" }}>
            <span className="hero-text-mask" style={{ display: "block", color: "#F4F4F5" }}>
              Brava
            </span>
          </span>
        </h1>

        {/* Línea separadora */}
        <div
          className="hero-text-mask my-6"
          style={{
            width: "60px",
            height: "2px",
            backgroundColor: "#D4AF37",
            display: "block",
          }}
        />

        {/* Subtítulo */}
        <div style={{ overflow: "hidden", marginBottom: "2.5rem" }}>
          <p
            className="hero-text-mask font-sans font-medium"
            style={{ color: "rgba(244,244,245,0.65)", fontSize: "1.1rem", letterSpacing: "0.02em" }}
          >
            La escuela de boxeo donde se forja el carácter.&nbsp;&nbsp;
            <span style={{ color: "#D4AF37" }}>Entrena crudo, pelea fino.</span>
          </p>
        </div>

        {/* CTA */}
        <div ref={btnRef}>
          <Button variant="primary">Únete a la Esquina</Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 flex flex-col items-center"
        style={{ transform: "translateX(-50%)", color: "#D4AF37" }}
      >
        <span
          className="font-display uppercase"
          style={{ letterSpacing: "0.25em", fontSize: "0.65rem", marginBottom: "0.4rem" }}
        >
          Descubre
        </span>
        <MoveDown className="scroll-arrow" style={{ width: 20, height: 20 }} />
      </div>
    </section>
  );
}
