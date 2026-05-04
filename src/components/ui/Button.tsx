"use client";

import React, { useRef, useState } from "react";
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
  const textRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const onMouseEnter = contextSafe(() => {
    setIsHovered(true);
    gsap.to(bgRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(textRef.current, {
      scale: 1.05,
      color: variant === "primary" ? "#050505" : "#D4AF37",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  const onMouseLeave = contextSafe(() => {
    setIsHovered(false);
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
    gsap.to(bgRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(textRef.current, {
      scale: 1,
      color: variant === "primary" ? "#F4F4F5" : "inherit",
      duration: 0.3,
      ease: "power2.inOut",
    });
  });

  const onMouseMove = contextSafe((e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;

    gsap.to(buttonRef.current, {
      x,
      y,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  const baseStyles =
    "relative overflow-hidden font-display uppercase tracking-widest text-lg px-8 py-4 transition-colors duration-300 outline-none";
  const variantStyles = {
    primary: "bg-brava-gold text-background border border-brava-gold",
    outline: "bg-transparent text-foreground border border-brava-gold",
    ghost: "bg-transparent text-foreground hover:text-brava-gold",
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      <div
        ref={bgRef}
        className={cn(
          "absolute inset-0 z-0 origin-center scale-0 opacity-0 rounded-none",
          variant === "primary" ? "bg-foreground" : "bg-brava-gold/10"
        )}
      />
      <span ref={textRef} className="relative z-10 inline-block pointer-events-none mix-blend-difference">
        {children}
      </span>
    </button>
  );
}
