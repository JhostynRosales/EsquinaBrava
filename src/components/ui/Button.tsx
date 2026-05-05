"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const onMouseEnter = contextSafe(() => {
    // Relleno de fondo eléctrico
    gsap.to(bgRef.current, {
      scaleX: 1,
      opacity: 1,
      duration: 0.25,
      ease: "power3.out",
      transformOrigin: "left center",
    });
    // Shimmer metálico pasa de izquierda a derecha
    gsap.fromTo(
      shimmerRef.current,
      { x: "-120%" },
      { x: "120%", duration: 0.5, ease: "power2.inOut" }
    );
    // Texto escala levemente y cambia color
    gsap.to(textRef.current, {
      scale: 1.04,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  const onMouseLeave = contextSafe(() => {
    // Devolver botón a posición magnética
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
    gsap.to(bgRef.current, {
      scaleX: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.inOut",
      transformOrigin: "right center",
    });
    gsap.to(textRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  const onMouseMove = contextSafe((e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.28;
    const y = (e.clientY - top - height / 2) * 0.28;
    gsap.to(buttonRef.current, {
      x,
      y,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  // Estilos base comunes
  const base =
    "relative overflow-hidden font-display uppercase tracking-widest text-base px-8 py-4 outline-none cursor-pointer";

  // Variante PRIMARY — fondo dorado metálico, texto negro, shimmer claro al hover
  if (variant === "primary") {
    return (
      <button
        ref={buttonRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        className={cn(base, className)}
        style={{
          background: "var(--gold-gradient)",
          color: "#050505",
          border: "none",
        }}
        {...props}
      >
        {/* Overlay de hover oscuro */}
        <div
          ref={bgRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(5,5,5,0.18)",
            transform: "scaleX(0)",
            opacity: 0,
            zIndex: 0,
            transformOrigin: "left center",
          }}
        />
        {/* Shimmer de luz */}
        <div
          ref={shimmerRef}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "50%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
            transform: "translateX(-120%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <span
          ref={textRef}
          style={{
            position: "relative",
            zIndex: 2,
            display: "inline-block",
            color: "#050505",
            fontWeight: 400,
          }}
        >
          {children}
        </span>
      </button>
    );
  }

  // Variante OUTLINE — borde con gradiente metálico, texto blanco, relleno dorado al hover
  if (variant === "outline") {
    return (
      <button
        ref={buttonRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        className={cn(base, className)}
        style={{
          background: "transparent",
          color: "#F4F4F5",
          border: "1.5px solid #D4AF37",
          position: "relative",
        }}
        {...props}
      >
        {/* Relleno dorado metálico al hover */}
        <div
          ref={bgRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--gold-gradient)",
            transform: "scaleX(0)",
            opacity: 0,
            zIndex: 0,
            transformOrigin: "left center",
          }}
        />
        {/* Shimmer de luz */}
        <div
          ref={shimmerRef}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "50%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,248,196,0.4) 50%, transparent 100%)",
            transform: "translateX(-120%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <span
          ref={textRef}
          style={{
            position: "relative",
            zIndex: 2,
            display: "inline-block",
            color: "#F4F4F5",
          }}
        >
          {children}
        </span>
      </button>
    );
  }

  // Variante GHOST
  return (
    <button
      ref={buttonRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={cn(base, className)}
      style={{ background: "transparent", color: "#F4F4F5" }}
      {...props}
    >
      <div ref={bgRef} style={{ display: "none" }} />
      <div ref={shimmerRef} style={{ display: "none" }} />
      <span
        ref={textRef}
        style={{ position: "relative", zIndex: 2, display: "inline-block" }}
      >
        {children}
      </span>
    </button>
  );
}
