import React from 'react'

// Einfache initials-basierte Avatar-Komponente (kein Radix / kein Bild nötig)
function Avatar({ initials, color }) {
    return (
        <div className="tm-avatar" style={{ background: color }}>
            {initials}
        </div>
    )
}

// Farbpalette für Avatare – rotiert nach Index
const AVATAR_COLORS = [
    'rgba(125,211,232,0.25)',
    'rgba(99,179,237,0.25)',
    'rgba(167,139,250,0.25)',
    'rgba(52,211,153,0.25)',
    'rgba(251,191,36,0.25)',
]

export function TestimonialCard({ author, text, index = 0 }) {
    const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
    const Card = author.href ? 'a' : 'div'

    return (
        <Card
            {...(author.href ? { href: author.href, target: '_blank', rel: 'noopener' } : {})}
            className="tm-card glass-card"
            style={{ textDecoration: 'none' }}
        >
            <div className="tm-card-header">
                <Avatar initials={author.initials} color={color} />
                <div className="tm-card-author">
                    <span className="tm-card-name">{author.name}</span>
                    <span className="tm-card-role">{author.role}</span>
                </div>
            </div>
            <p className="tm-card-text">"{text}"</p>
            {author.rating && (
                <div className="tm-card-stars">
                    {'★'.repeat(author.rating)}
                </div>
            )}
        </Card>
    )
}
