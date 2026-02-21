import React from 'react'
import { TestimonialCard } from './TestimonialCard'

/**
 * Testimonials mit CSS-Marquee-Animation (kein Tailwind, kein shadcn)
 * – Dupliziert die Liste 2× für nahtlosen Loop
 * – Pausiert on hover
 * – Fade-Overlays links + rechts
 */
export function TestimonialsMarquee({ title, description, testimonials }) {
    // Doppelte Liste für nahtlosen Loop
    const doubled = [...testimonials, ...testimonials]

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
                <div className="tm-marquee-track">
                    {doubled.map((t, i) => (
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
