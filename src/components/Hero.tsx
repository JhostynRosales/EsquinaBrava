"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "./ui/Button";
import { MoveDown } from "lucide-react";

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Setup inicial — todo invisible
      gsap.set(logoWrapperRef.current, { scale: 0, opacity: 0 });
      gsap.set(raysRef.current, { opacity: 0 });
      gsap.set(".hero-text-mask", { y: "110%" });
      gsap.set(btnRef.current, { opacity: 0, y: 24 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });
      gsap.set(shimmerRef.current, { x: "-150%" });

      // 1. Parpadeo eléctrico de los rayos (luz defectuosa de neón)
      tl.to(raysRef.current, {
        opacity: 1,
        duration: 0.07,
        repeat: 7,
        yoyo: true,
        ease: "none",
      });

      // 2. Logo irrumpe con golpe brutal hacia adelante
      tl.to(
        logoWrapperRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(2.2)",
        },
        "-=0.15"
      );

      // 3. Título emerge desde máscaras
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

      // ✨ Shimmer metálico — se dispara cada 5 segundos
      gsap.delayedCall(3, function fireShimmer() {
        gsap.fromTo(
          shimmerRef.current,
          { x: "-150%" },
          {
            x: "150%",
            duration: 0.9,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.delayedCall(5, fireShimmer);
            },
          }
        );
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

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl pt-16 md:pt-24">

        {/* Bloque del Logo */}
        <div
          className="relative mb-8 flex items-center justify-center"
          style={{ width: 240, height: 240 }}
        >
          {/* Rayos laterales con gradiente metálico */}
          <div
            ref={raysRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 0 }}
          >
            {/* Rayo izquierdo */}
            <svg
              style={{
                position: "absolute",
                left: -64,
                top: "20%",
                transform: "rotate(-15deg)",
                filter: "drop-shadow(0 0 8px #D4AF37)",
              }}
              width="48" height="48" viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="rayGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B8860B"/>
                  <stop offset="45%" stopColor="#D4AF37"/>
                  <stop offset="50%" stopColor="#F7EF8A"/>
                  <stop offset="55%" stopColor="#D4AF37"/>
                  <stop offset="100%" stopColor="#B8860B"/>
                </linearGradient>
              </defs>
              <path d="M13 2L4.5 13.5H11L10 22l9.5-12H13L13 2z" fill="url(#rayGradLeft)"/>
            </svg>
            {/* Rayo derecho */}
            <svg
              style={{
                position: "absolute",
                right: -64,
                top: "20%",
                transform: "rotate(15deg)",
                filter: "drop-shadow(0 0 8px #D4AF37)",
              }}
              width="48" height="48" viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="rayGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B8860B"/>
                  <stop offset="45%" stopColor="#D4AF37"/>
                  <stop offset="50%" stopColor="#F7EF8A"/>
                  <stop offset="55%" stopColor="#D4AF37"/>
                  <stop offset="100%" stopColor="#B8860B"/>
                </linearGradient>
              </defs>
              <path d="M13 2L4.5 13.5H11L10 22l9.5-12H13L13 2z" fill="url(#rayGradRight)"/>
            </svg>
          </div>

          {/* Logo circular con la imagen real */}
          <div
            ref={logoWrapperRef}
            className="logo-circle"
            style={{
              width: 240,
              height: 240,
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            <Image
              src="/logoBoxeo.jpeg"
              alt="Esquina Brava — Escuela de Boxeo"
              fill
              priority
              sizes="240px"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            {/* Shimmer de barrido metálico — controlado por GSAP */}
            <div ref={shimmerRef} className="logo-shimmer-overlay" aria-hidden="true" />
          </div>
        </div>

        {/* Título principal con máscaras — "ESQUINA" en gradiente metálico */}
        <h1
          className="font-display uppercase m-0 p-0 leading-[0.88]"
          style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
        >
          <span style={{ overflow: "hidden", display: "block" }}>
            <span className="hero-text-mask gold-text" style={{ display: "block" }}>
              Esquina
            </span>
          </span>
          <span style={{ overflow: "hidden", display: "block" }}>
            <span className="hero-text-mask" style={{ display: "block", color: "#F4F4F5" }}>
              Brava
            </span>
          </span>
        </h1>

        {/* Separador metálico */}
        <div
          className="hero-text-mask my-6"
          style={{
            width: "60px",
            height: "2px",
            background: "var(--gold-gradient)",
            display: "block",
          }}
        />

        {/* Subtítulo */}
        <div style={{ overflow: "hidden", marginBottom: "2.5rem" }}>
          <p
            className="hero-text-mask font-sans font-medium"
            style={{
              color: "rgba(244,244,245,0.65)",
              fontSize: "1.1rem",
              letterSpacing: "0.02em",
            }}
          >
            La escuela de boxeo donde se forja el carácter.&nbsp;&nbsp;
            <span className="gold-text">Entrena crudo, pelea fino.</span>
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
        style={{ transform: "translateX(-50%)" }}
      >
        <span
          className="font-display uppercase"
          style={{
            letterSpacing: "0.25em",
            fontSize: "0.65rem",
            marginBottom: "0.4rem",
            background: "var(--gold-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Descubre
        </span>
        <MoveDown
          className="scroll-arrow"
          style={{
            width: 20,
            height: 20,
            color: "#D4AF37",
          }}
        />
      </div>
    </section>
  );
}
