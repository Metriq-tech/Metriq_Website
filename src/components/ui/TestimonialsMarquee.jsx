import React, { useRef, useEffect } from 'react'
import { TestimonialCard } from './TestimonialCard'

/**
 * Testimonials mit JS-RAF-Marquee – nahtlos, kein CSS-Sprung
 * – 3× dupliziert: reset von 2/3 zurück auf 1/3 scrollWidth
 *   → Reset-Punkt liegt immer weit außerhalb des sichtbaren Bereichs
 * – Pausiert on hover
 * – Fade-Overlays links + rechts
 */
export function TestimonialsMarquee({ title, description, testimonials }) {
    const trackRef = useRef(null)
    const rafRef = useRef(null)
    const posRef = useRef(0)
    const paused = useRef(false)
    const SPEED = 0.63 // px per frame (~60fps → ~38px/s)

    // Dreifache Liste – reset zwischen Block 2 und Block 3
    const tripled = [...testimonials, ...testimonials, ...testimonials]

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        const step = () => {
            if (!paused.current) {
                posRef.current += SPEED
                const oneThird = track.scrollWidth / 3
                // Wenn wir Block 3 betreten, springe zu Block 2-Anfang
                // (beide Blöcke sehen identisch aus → nahtloser Loop)
                if (posRef.current >= oneThird * 2) {
                    posRef.current = oneThird
                }
                track.style.transform = `translateX(-${posRef.current}px)`
            }
            rafRef.current = requestAnimationFrame(step)
        }

        // Starte in Block 1 (sichtbar), beim ersten Reset geht's nach Block 2
        posRef.current = 0

        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = requestAnimationFrame(step)
        })

        const pause = () => { paused.current = true }
        const resume = () => { paused.current = false }

        track.addEventListener('mouseenter', pause)
        track.addEventListener('mouseleave', resume)

        return () => {
            cancelAnimationFrame(rafRef.current)
            track.removeEventListener('mouseenter', pause)
            track.removeEventListener('mouseleave', resume)
        }
    }, [])

    return (
        <section className="tm-section section-padding">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Kundenstimmen</span>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>

            {/* Marquee – volle Breite, außerhalb des containers */}
            <div className="tm-marquee-wrapper">
                <div className="tm-marquee-track" ref={trackRef}>
                    {tripled.map((t, i) => (
                        <TestimonialCard
                            key={i}
                            author={{
                                name: t.name,
                                role: t.role,
                                initials: t.initials,
                                rating: t.rating,
                                href: t.href,
                            }}
                            text={t.text}
                            index={i % testimonials.length}
                        />
                    ))}
                </div>

                {/* Fade overlays */}
                <div className="tm-fade-left" />
                <div className="tm-fade-right" />
            </div>
        </section>
    )
}
