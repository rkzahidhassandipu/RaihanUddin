"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BgTextAnimation({ text }: { text: string }) {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    gsap.fromTo(
      el,
      { x: '100%' },
      { x: '-100%', duration: 15, ease: 'linear', repeat: -1 }
    );
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-start overflow-hidden pointer-events-none">
      <h2
        ref={textRef}
        className="text-[11vw] font-black text-transparent whitespace-nowrap"
        style={{
          WebkitTextStroke: '1.5px rgba(255, 87, 87, 0.15)',
          textStroke: '1.5px rgba(255, 87, 87, 0.15)',
        }}
      >
        {text}
      </h2>
    </div>
  );
}