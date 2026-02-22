/**
 * AcrosticDrop – Wiederverwendbare Komponente
 * ─────────────────────────────────────────────
 * Zeigt ein Array von { letter, word } Paaren horizontal nebeneinander.
 * Hover auf einem Buchstaben lässt das zugehörige Wort zeichenweise
 * von oben nach unten einfallen (staggered CSS transition).
 *
 * USAGE:
 *   import { AcrosticDrop } from './ui/AcrosticDrop'
 *
 *   const METRIQ = [
 *     { letter: 'M', word: 'Modern' },
 *     { letter: 'E', word: 'Effizient' },
 *     { letter: 'T', word: 'Technisch' },
 *     { letter: 'R', word: 'Routiniert' },
 *     { letter: 'I', word: 'Intelligent' },
 *     { letter: 'Q', word: 'Qualitativ' },
 *   ]
 *
 *   <AcrosticDrop items={METRIQ} />
 *
 * CSS:
 *   Die Stile (ha-col, ha-letter, ha-word, ha-char) müssen aus
 *   index.css oder einer separaten acrostic.css eingebunden sein.
 *   Siehe: /src/styles/acrostic.css (oder Abschnitt in index.css)
 */

import React from 'react'

export function AcrosticDrop({ items = [] }) {
    return (
        <div className="hero-acrostic">
            {items.map(({ letter, word }) => (
                <div key={letter} className="ha-col">
                    <span className="ha-letter">{letter}</span>
                    <div className="ha-word">
                        {word.split('').map((char, i) => (
                            <span key={i} className="ha-char">{char}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

// ─── Preset: METRIQ ───────────────────────────────────────────────────────────
export const METRIQ_ITEMS = [
    { letter: 'M', word: 'Modern' },
    { letter: 'E', word: 'Effizient' },
    { letter: 'T', word: 'Technisch' },
    { letter: 'R', word: 'Routiniert' },
    { letter: 'I', word: 'Intelligent' },
    { letter: 'Q', word: 'Qualitativ' },
]
