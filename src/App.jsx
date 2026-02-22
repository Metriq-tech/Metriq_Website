import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { LayoutDashboard, Zap, Shield, Cpu, Layers, Workflow, CheckCircle2, ArrowRight, ArrowUpRight, Menu, X, Star, ChevronRight, ChevronDown, MessageSquare, Phone, Mail, ScanSearch, Lightbulb, Wrench, GitMerge, TrendingUp, Clock, Users, Globe, Settings, Search, Calendar, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumHero } from './components/PremiumHero'
import KFZHero from './components/KFZHero'
import WissensinfrastrukturPage from './components/WissensinfrastrukturPage'
import WebsiteAutomatisierungPage from './components/WebsiteAutomatisierungPage'
import { TestimonialsMarquee } from './components/ui/TestimonialsMarquee'


// ─── Floating Navbar (Aceternity UI style, adapted for Vite+React+dark) ───

const springTransition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
}

/** Single menu item with Spring-animated dropdown */
const NavMenuItem = ({ setActive, active, item, children }) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="flt-menu-item">
            <motion.span transition={{ duration: 0.3 }} className="flt-menu-label">
                {item}
                <ChevronDown size={13} className={`flt-menu-chevron ${active === item ? 'flt-chevron-open' : ''}`} />
            </motion.span>
            <AnimatePresence>
                {active === item && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 8 }}
                        transition={springTransition}
                        className="flt-panel-outer"
                    >
                        <motion.div
                            layoutId="flt-active-panel"
                            transition={springTransition}
                            className="flt-panel-inner"
                        >
                            <motion.div layout className="flt-panel-content">
                                {children}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

/** Floating pill menu container */
const NavMenu = ({ setActive, children }) => (
    <nav onMouseLeave={() => setActive(null)} className="flt-nav-pill">
        {children}
    </nav>
)

/** Simple hover link inside dropdown */
const NavLink = ({ to, children, onClick }) => (
    <Link to={to} className="flt-dropdown-link" onClick={onClick}>
        {children}
    </Link>
)

/** Soon (disabled) item inside dropdown */
const NavSoon = ({ children }) => (
    <span className="flt-dropdown-link flt-dropdown-soon">{children}</span>
)

// ─── Main Navbar Component ─────────────────────────────────────────────────

const Navbar = () => {
    const [active, setActive] = React.useState(null)
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [mobileExpanded, setMobileExpanded] = React.useState(null)

    const closeAll = () => { setActive(null); setMobileOpen(false); setMobileExpanded(null) }

    return (
        <>
            {/* ── Desktop: Logo + Pill nebeneinander, zentriert ── */}
            <div className="flt-nav-wrapper">
                <Link to="/" className="flt-logo-beside" onClick={closeAll}>
                    <img src="/logo.png" alt="Metriq" className="flt-logo-img" />
                </Link>
                <NavMenu setActive={setActive}>
                    {/* Home */}
                    <Link to="/" className="flt-menu-label flt-plain-link" onClick={closeAll}>Home</Link>

                    {/* Leistungen */}
                    <NavMenuItem setActive={setActive} active={active} item="Leistungen">
                        <div className="flt-dropdown-section">
                            <p className="flt-dropdown-heading">Leistungen</p>
                            <NavLink to="/betrieb-prozesse" onClick={closeAll}>
                                <span className="flt-link-icon">🧠</span>
                                <span>
                                    <strong>Betrieb & Prozesse</strong>
                                    <em>Systeme, Tools & Abläufe optimieren</em>
                                </span>
                            </NavLink>
                            <NavLink to="/website-automatisierung" onClick={closeAll}>
                                <span className="flt-link-icon">⚙️</span>
                                <span>
                                    <strong>Website & Automatisierung</strong>
                                    <em>Websites, CRM & Prozesse</em>
                                </span>
                            </NavLink>
                        </div>
                    </NavMenuItem>

                    {/* Branchen */}
                    <NavMenuItem setActive={setActive} active={active} item="Branchen">
                        <div className="flt-dropdown-section">
                            <p className="flt-dropdown-heading">Branchen</p>
                            <NavLink to="/kfz" onClick={closeAll}>
                                <span className="flt-link-icon">🔧</span>
                                <span>
                                    <strong>KFZ & Handwerk</strong>
                                    <em>Terminbuchung, Follow-Ups, Google</em>
                                </span>
                            </NavLink>
                            <NavSoon>
                                <span className="flt-link-icon">🧠</span>
                                <span>
                                    <strong style={{ opacity: 0.5 }}>Wissensunternehmen & Experten</strong>
                                    <em className="flt-badge">Demnächst</em>
                                </span>
                            </NavSoon>
                        </div>
                    </NavMenuItem>

                    <div className="flt-divider" />

                    {/* CTA */}
                    <button className="btn-primary flt-cta-btn">Erstgespräch buchen</button>
                </NavMenu>
            </div>

            {/* ── Mobile: Top Bar + Hamburger ── */}
            <div className="flt-mobile-bar">
                <Link to="/" onClick={closeAll}>
                    <img src="/logo.png" alt="Metriq" className="flt-logo-img" />
                </Link>
                <button className="flt-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menü">
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2 }}
                        className="flt-mobile-menu"
                    >
                        <Link to="/" className="flt-mobile-link" onClick={closeAll}>Home</Link>

                        <div className="flt-mobile-section">
                            <button className="flt-mobile-trigger" onClick={() => setMobileExpanded(p => p === 'l' ? null : 'l')}>
                                Leistungen <ChevronDown size={15} style={{ transform: mobileExpanded === 'l' ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
                            </button>
                            {mobileExpanded === 'l' && (
                                <div className="flt-mobile-sub">
                                    <Link to="/wissensinfrastruktur" className="flt-mobile-sublink" onClick={closeAll}>🧠 Wissensinfrastruktur</Link>
                                    <Link to="/website-automatisierung" className="flt-mobile-sublink" onClick={closeAll}>⚙️ Website & Automatisierung</Link>
                                </div>
                            )}
                        </div>

                        <div className="flt-mobile-section">
                            <button className="flt-mobile-trigger" onClick={() => setMobileExpanded(p => p === 'b' ? null : 'b')}>
                                Branchen <ChevronDown size={15} style={{ transform: mobileExpanded === 'b' ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
                            </button>
                            {mobileExpanded === 'b' && (
                                <div className="flt-mobile-sub">
                                    <Link to="/kfz" className="flt-mobile-sublink" onClick={closeAll}>🔧 KFZ & Handwerk</Link>
                                    <span className="flt-mobile-sublink flt-mobile-soon">🧠 Wissensunternehmen <em>(demnächst)</em></span>
                                </div>
                            )}
                        </div>

                        <button className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                            Erstgespräch buchen
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

// Testimonials Data
const testimonials = [
    {
        name: "Thomas Bauer",
        role: "Inhaber, Auto Bauer GmbH",
        initials: "TB",
        text: "Seit Metriq unsere Terminbuchung automatisiert hat, haben wir 40% weniger Telefonanrufe. Unsere Kunden buchen jetzt einfach online.",
        rating: 5,
    },
    {
        name: "Sandra Müller",
        role: "Geschäftsführerin, Kfz-Müller",
        initials: "SM",
        text: "Die neue Website hat unsere Online-Sichtbarkeit enorm verbessert. Wir bekommen deutlich mehr Anfragen über Google als vorher.",
        rating: 5,
    },
    {
        name: "Klaus Weber",
        role: "Meister, Weber Fahrzeugtechnik",
        initials: "KW",
        text: "Das Onboarding war unkompliziert und das Team hat alles genau so umgesetzt wie besprochen. Sehr professionell.",
        rating: 5,
    },
    {
        name: "Petra Hoffmann",
        role: "Betriebsleiterin, H&H Service GmbH",
        initials: "PH",
        text: "Die Automatisierung unserer Follow-up-E-Mails hat die Kundenbindung merklich verbessert. Endlich ein System, das mitdenkt.",
        rating: 5,
    },
    {
        name: "Markus Richter",
        role: "Geschäftsführer, Richter Logistik",
        initials: "MR",
        text: "In nur zwei Wochen hatten wir eine vollständig integrierte Lösung. Das Team ist schnell, präzise und versteht mittelständische Betriebe.",
        rating: 5,
    },
    {
        name: "Julia Schneider",
        role: "Inhaberin, JS Reinigungsservice",
        initials: "JS",
        text: "Früher war die Angebotserstellung ein riesiger Aufwand. Heute läuft das automatisch – ich kann mich wieder auf mein Kerngeschäft konzentrieren.",
        rating: 5,
    }
]

// Process Steps
const processSteps = [
    {
        icon: ScanSearch,
        number: "01",
        title: "Analyse",
        description: "Wir schauen uns Ihren Betrieb, Ihre Prozesse und Ihren digitalen Auftritt genau an – und identifizieren die größten Hebel.",
        tag: "Kostenlos & unverbindlich"
    },
    {
        icon: Lightbulb,
        number: "02",
        title: "Konzept",
        description: "Auf Basis der Analyse erhalten Sie ein konkretes Maßnahmenpaket mit Zeitplan, Prioritäten und klaren Zielen.",
        tag: "In 48h"
    },
    {
        icon: Wrench,
        number: "03",
        title: "Umsetzung",
        description: "Wir setzen alles um – Website, Automatisierungen, Systeme. Schnell, verlässlich und ohne Rückfragen-Marathon.",
        tag: "Ø 2–3 Wochen"
    },
    {
        icon: GitMerge,
        number: "04",
        title: "Integration",
        description: "Alle neuen Systeme werden in Ihren laufenden Betrieb integriert – Ihr Team wird eingewiesen, alles funktioniert vom ersten Tag an.",
        tag: "Gemeinsam"
    },
    {
        icon: TrendingUp,
        number: "05",
        title: "Optimierung",
        description: "Nach dem Launch analysieren wir die Ergebnisse und verbessern kontinuierlich. Ihr System wächst mit Ihrem Betrieb.",
        tag: "Laufend"
    },
    {
        icon: Zap,
        number: "06",
        title: "Skalierung",
        description: "Wenn Ihr Betrieb wächst, wächst Ihr System mit. Neue Bereiche, neue Automatisierungen – auf einer stabilen Basis.",
        tag: "Auf Wunsch"
    }
]

const einstiegsPunkte = [
    {
        icon: LayoutDashboard,
        title: "Digitale Präsenz",
        subtitle: "Website & Sichtbarkeit",
        anchor: "ab 599 €",
        description: "Professioneller Auftritt im Netz, der Kunden gewinnt – schnell, mobil und gefunden.",
        features: [
            "Professionelle Website (Mobile-First)",
            "Local SEO & Google Maps Optimierung",
            "Kontaktformular & Anfragen-Management",
            "Fertig in 2–3 Wochen"
        ],
        highlighted: false,
    },
    {
        icon: Zap,
        title: "Prozess-Automatisierung",
        subtitle: "Workflows & Integration",
        anchor: "ab 799 €",
        description: "Wiederkehrende Aufgaben automatisieren, Systeme verbinden, Zeit für das Wesentliche gewinnen.",
        features: [
            "Workflow- & E-Mail-Automatisierung",
            "CRM & Tool-Integration (n8n / Zapier)",
            "Terminbuchung & Follow-up-Systeme",
            "Reporting & Dashboards"
        ],
        highlighted: true,
    },
    {
        icon: Layers,
        title: "Betrieb & Systeme",
        subtitle: "Ganzheitliche Infrastruktur",
        anchor: "ab 1.499 €",
        description: "Alles aus einer Hand – Website, Automatisierung und Prozesse als stabile, skalierbare Einheit.",
        features: [
            "Kombination aller Leistungsbereiche",
            "Maßgeschneiderte System-Architektur",
            "Einweisung & Team-Onboarding",
            "Persönlicher Ansprechpartner & Support"
        ],
        highlighted: false,
    },
]


// FAQ Items
const faqItems = [
    {
        question: "Wie lange dauert die Umsetzung?",
        answer: "Je nach Paket dauert die Umsetzung zwischen 2 und 6 Wochen. Beim Starter-Paket sind es in der Regel 2–3 Wochen, beim Growth-Paket 4–6 Wochen. Wir halten Sie während des gesamten Prozesses auf dem Laufenden."
    },
    {
        question: "Was passiert nach dem Launch?",
        answer: "Jedes Paket enthält Support nach dem Launch. Beim Starter-Paket ist 1 Monat inklusive, beim Growth-Paket 3 Monate. Danach bieten wir flexible Wartungsverträge an, damit Ihre Systeme immer aktuell bleiben."
    },
    {
        question: "Brauche ich technisches Vorwissen?",
        answer: "Nein. Wir übernehmen die gesamte technische Umsetzung. Sie müssen lediglich Ihre Anforderungen und Wünsche kommunizieren – den Rest erledigen wir. Nach dem Launch erklären wir Ihnen alles Wichtige in einer persönlichen Einführung."
    },
    {
        question: "Kann ich meine bestehende Website behalten?",
        answer: "Das hängt vom Zustand Ihrer aktuellen Website ab. In vielen Fällen ist ein Neuaufbau sinnvoller als eine Überarbeitung. Wir analysieren das kostenlos in einem Erstgespräch und geben Ihnen eine ehrliche Empfehlung."
    },
    {
        question: "Wie funktioniert die automatisierte Terminbuchung?",
        answer: "Wir integrieren ein professionelles Buchungssystem direkt in Ihre Website. Kunden können 24/7 Termine buchen, die automatisch in Ihren Kalender (Google Calendar, Outlook etc.) eingetragen werden. Sie erhalten eine Benachrichtigung – ohne manuellen Aufwand."
    },
    {
        question: "Gibt es eine Mindestlaufzeit?",
        answer: "Nein. Unsere Einmalpakete haben keine Mindestlaufzeit. Laufende Wartungsverträge können monatlich gekündigt werden. Wir setzen auf langfristige Partnerschaften durch Qualität, nicht durch Verträge."
    }
]

// FAQ Accordion Component
const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div className={`faq-item ${open ? 'faq-open' : ''}`} onClick={() => setOpen(!open)}>
            <div className="faq-question">
                <span>{question}</span>
                <ChevronDown size={20} className="faq-icon" />
            </div>
            <div className="faq-answer-wrapper">
                <div className="faq-answer">
                    <p className="faq-answer-inner">{answer}</p>
                </div>
            </div>
        </div>
    )
}
// ─── Wonach suchen Sie? (Intent Selector) ───────────────────────────────────
const intent_data = {
    umsatz: {
        label: 'Website & Automatisierung',
        icon: <Workflow size={36} />,
        color: '#7dd3e8',
        desc: 'Premium-Websites und intelligente Automatisierungen, die Kunden gewinnen.',
        href: '/website-automatisierung',
        items: [
            { icon: <Globe size={22} />, title: 'Professionelle Website', desc: 'Websites, die nicht nur gut aussehen – sondern Anfragen generieren' },
            { icon: <Calendar size={22} />, title: 'Online-Terminbuchung', desc: 'Kunden buchen rund um die Uhr, ohne dass Sie ans Telefon müssen' },
            { icon: <Search size={22} />, title: 'Google-Sichtbarkeit', desc: 'Lokal gefunden werden – genau dann, wenn Kunden suchen' },
            { icon: <MessageSquare size={22} />, title: 'Automatisierte Kundenkommunikation', desc: 'Follow-ups, Erinnerungen und Feedbackanfragen vollautomatisch' },
            { icon: <Star size={22} />, title: 'Bewertungsmanagement', desc: 'Mehr positive Bewertungen – systematisch und ohne Aufwand' },
            { icon: <ArrowUpRight size={22} />, title: 'Digitale Neukundengewinnung', desc: 'Automatisierte Prozesse, die neue Kunden anziehen' },
        ]
    },
    aufwand: {
        label: 'Betrieb & Prozesse',
        icon: <Layers size={36} />,
        color: '#a78bfa',
        desc: 'Strukturierte Abläufe und Systeme, die Ihr Team entlasten.',
        href: '/betrieb-prozesse',
        items: [
            { icon: <Settings size={22} />, title: 'Prozessautomatisierung', desc: 'Wiederkehrende Aufgaben automatisieren – mehrere Stunden pro Woche sparen' },
            { icon: <Workflow size={22} />, title: 'Digitale Abläufe', desc: 'Papierstapel und manuelle Eingaben durch saubere Systeme ersetzen' },
            { icon: <Clock size={22} />, title: 'Zeitersparnis im Betrieb', desc: 'Weniger Verwaltungsaufwand – mehr Zeit fürs Kerngeschäft' },
            { icon: <Users size={22} />, title: 'Mitarbeiter-Entlastung', desc: 'Personal entlasten durch smarte Tools statt mehr Personal einstellen' },
            { icon: <Cpu size={22} />, title: 'Systemintegration', desc: 'Alle Tools sprechen miteinander – kein manuelles Übertragen mehr' },
            { icon: <ScanSearch size={22} />, title: 'Digitale Übersicht', desc: 'Alle Kennzahlen im Blick – Entscheidungen auf Datenbasis treffen' },
        ]
    }
}

const LeistungenSelector = () => {
    const [active, setActive] = React.useState(null)

    return (
        <div className="ls-wrapper">
            <div className="ls-choice-grid">
                {Object.entries(intent_data).map(([key, val]) => {
                    const isActive = active === key
                    return (
                        <div
                            key={key}
                            className={`ls-choice-card ${isActive ? 'ls-choice-active' : ''}`}
                            style={{ '--ls-color': val.color }}
                            onClick={() => setActive(isActive ? null : key)}
                            role="button"
                            tabIndex={0}
                            aria-expanded={isActive}
                            aria-label={`${val.label} – ${isActive ? 'Details schließen' : 'Details anzeigen'}`}
                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(isActive ? null : key) } }}
                        >
                            {/* FRONT: Icon + Label zentriert */}
                            <div className="ls-card-front">
                                <span className="ls-front-icon" style={{ color: val.color }}>{val.icon}</span>
                                <span className="ls-front-label">{val.label}</span>
                            </div>

                            {/* BACK: Items-Grid innerhalb der Box */}
                            <div className="ls-card-back">
                                <div className="ls-back-grid">
                                    {val.items.map((item, i) => (
                                        <div key={i} className="ls-back-item" style={{ animationDelay: `${i * 45}ms` }}>
                                            <span className="ls-back-icon" style={{ color: val.color }}>{item.icon}</span>
                                            <div>
                                                <div className="ls-back-title">{item.title}</div>
                                                <div className="ls-back-desc">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <a
                                    href={val.href}
                                    className="ls-back-link"
                                    style={{ color: val.color }}
                                    onClick={e => e.stopPropagation()}
                                >
                                    Mehr zu „{val.label}" <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// pages/Home.jsx
const Home = () => {
    return (
        <div className="page-home">
            <PremiumHero />


            {/* ── Kernkompetenzen als Intent-Selector ──────── */}
            <section id="services" className="kk-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Leistungen</span>
                        <h2>Womit können wir Ihnen helfen?</h2>
                        <p>Klicken Sie auf den Bereich, der für Sie relevant ist – und sehen Sie sofort, was wir konkret anbieten.</p>
                    </div>
                    <LeistungenSelector />
                </div>
            </section>

            {/* ── Prozess ──────────────────────────────────── */}
            <section className="process-section section-padding">
                <div className="container">
                    <span className="section-tag" style={{ display: 'block', width: 'fit-content', margin: '0 auto 1.5rem' }}>Ablauf</span>
                    <div className="ps-layout">

                        {/* Linke Spalte: Text + CTA */}
                        <div className="ps-left-col">
                            <h2>So arbeiten wir zusammen</h2>
                            <p>Klar strukturiert, ohne Überraschungen – von der ersten Analyse bis zum laufenden System.</p>
                            <button className="btn-primary ps-cta" onClick={() => window.location.href = 'mailto:support@metriq.tech'}>
                                Erstgespräch buchen <ArrowUpRight size={18} />
                            </button>
                        </div>

                        {/* Rechte Spalte: Karten-Grid */}
                        <div className="ps-card-grid">
                            {processSteps.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <div key={i} className="ps-card">
                                        <div className="ps-card-icon">
                                            <Icon size={22} />
                                        </div>
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>


            {/* Benefits – Bento Grid */}
            <section className="benefits-section section-padding">
                <div className="container">
                    <span className="section-tag" style={{ display: 'block', width: 'fit-content', margin: '0 auto 1.5rem' }}>Warum Metriq?</span>
                    <div className="bento-grid">

                        {/* Headline Tile – spans rows 1–2, col 1 */}
                        <div className="bento-headline glass-card">
                            <h2>Struktur,<br />die wirkt.</h2>
                            <p>Wir bauen Infrastruktur, die langfristig funktioniert – unabhängig von Einzelpersonen und skalierbar mit Ihrem Betrieb.</p>
                            <button className="btn-primary ps-cta" style={{ width: 'fit-content' }} onClick={() => window.location.href = 'mailto:support@metriq.tech'}>
                                Erstgespräch buchen <ArrowUpRight size={16} />
                            </button>
                        </div>

                        {/* Stat Tiles */}
                        <div className="bento-stat glass-card bs1">
                            <div className="bento-stat-num">+40%</div>
                            <div className="bento-stat-label">Zeitersparnis durch Automatisierung</div>
                        </div>
                        <div className="bento-stat glass-card bs2">
                            <div className="bento-stat-num">24/7</div>
                            <div className="bento-stat-label">Erreichbarkeit für Ihre Kunden</div>
                        </div>
                        <div className="bento-stat glass-card bs3">
                            <div className="bento-stat-num">3 Wo.</div>
                            <div className="bento-stat-label">Durchschnittliche Umsetzungszeit</div>
                        </div>
                        <div className="bento-stat glass-card bs4">
                            <div className="bento-stat-num">100%</div>
                            <div className="bento-stat-label">Fokus auf Ihr Kerngeschäft</div>
                        </div>

                        {/* Feature Row – spans alle 3 cols */}
                        <div className="bento-feat-row">
                            <div className="bento-feat glass-card">
                                <div className="bento-feat-icon"><Clock size={20} /></div>
                                <strong>Zeit zurückgewinnen</strong>
                                <span>Weniger Rückfragen, weniger manuelle Eingriffe.</span>
                            </div>
                            <div className="bento-feat glass-card">
                                <div className="bento-feat-icon"><TrendingUp size={20} /></div>
                                <strong>Skalierung ermöglichen</strong>
                                <span>Stabile Logik unabhängig von Einzelpersonen.</span>
                            </div>
                            <div className="bento-feat glass-card">
                                <div className="bento-feat-icon"><Layers size={20} /></div>
                                <strong>Komplexität reduzieren</strong>
                                <span>Klare Architektur ersetzt Tool-Wildwuchs.</span>
                            </div>
                            <div className="bento-feat glass-card">
                                <div className="bento-feat-icon"><Zap size={20} /></div>
                                <strong>Wirkung pro Stunde</strong>
                                <span>Durch verlässliche, automatisierte Abläufe.</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* Testimonials – Marquee */}
            <TestimonialsMarquee
                title="Was unsere Kunden sagen"
                description="Echte Ergebnisse von echten Betrieben."
                testimonials={testimonials}
            />

            {/* Pricing – Einstiegspunkte */}
            <section className="pricing-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Preise</span>
                        <h2>Einfach. Transparent. Fair.</h2>
                        <p>Keine versteckten Kosten. Kein Kleingedrucktes.<br />Nur klare Leistungen – ab dem ersten Tag.</p>
                    </div>
                    <div className="ep-grid">
                        {einstiegsPunkte.map((ep, i) => {
                            const Icon = ep.icon
                            return (
                                <div key={i} className={`ep-card glass-card ${ep.highlighted ? 'ep-highlighted' : ''}`}>
                                    {ep.highlighted && <div className="ep-badge">Meistgewählt</div>}
                                    <div className="ep-card-top">
                                        <div className="ep-icon"><Icon size={24} /></div>
                                        <div>
                                            <h3 className="ep-title">{ep.title}</h3>
                                            <span className="ep-subtitle">{ep.subtitle}</span>
                                        </div>
                                    </div>
                                    <p className="ep-desc">{ep.description}</p>
                                    <div className="ep-anchor">{ep.anchor}</div>
                                    <ul className="ep-features">
                                        {ep.features.map((f, j) => (
                                            <li key={j}>
                                                <CheckCircle2 size={15} />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="mailto:support@metriq.tech" className={ep.highlighted ? 'btn-primary ep-cta' : 'btn-secondary ep-cta'}>
                                        Erstgespräch anfragen <ArrowUpRight size={15} />
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                    <p className="pricing-note">Alle Projekte starten mit einem kostenlosen, unverbindlichen Erstgespräch. · <a href="mailto:support@metriq.tech">support@metriq.tech</a></p>
                </div>
            </section>

            {/* FAQ */}
            <section className="faq-section section-padding">
                <div className="container">
                    <span className="section-tag" style={{ display: 'block', width: 'fit-content', margin: '0 auto 2rem' }}>FAQ</span>
                    <div className="faq-layout">

                        {/* Bild links */}
                        <div className="faq-image-col">
                            <img src="/FAQ_bild4.png" alt="FAQ" />
                        </div>

                        {/* FAQ rechts */}
                        <div className="faq-content-col">
                            <div className="faq-header">
                                <h2>Häufige Fragen</h2>
                                <p>Alles, was Sie vor dem Start wissen sollten.</p>
                            </div>
                            <div className="faq-list">
                                {faqItems.map((item, i) => (
                                    <FAQItem key={i} question={item.question} answer={item.answer} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <CTABanner />
        </div>
    )
}

// CTA Banner mit scroll-triggered animations
const CTABanner = () => {
    const ref = React.useRef(null)

    React.useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('cta-in-view')
                    observer.disconnect()
                }
            },
            { threshold: 0.25 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section className="cta-banner section-padding">
            <div className="container">
                <div className="cta-banner-inner" ref={ref}>
                    <span className="section-tag cta-animate cta-delay-1">Kostenloses Erstgespräch</span>
                    <h2 className="cta-banner-headline cta-animate cta-delay-2">
                        Bereit, Ihren Betrieb<br />
                        <span className="cta-headline-accent">auf das nächste Level zu bringen?</span>
                    </h2>
                    <p className="cta-banner-sub cta-animate cta-delay-3">
                        In 30 Minuten zeigen wir Ihnen, wo Ihr Betrieb konkret Potenzial lässt <br />
                        und welche Maßnahmen den größten Hebel hätten. <br />Unverbindlich, direkt und ehrlich.
                    </p>
                    <a href="mailto:support@metriq.tech" className="btn-primary cta-btn-main cta-animate cta-delay-5">
                        Jetzt Termin sichern <ArrowUpRight size={18} />
                    </a>
                    <div className="cta-glow-overlay cta-animate cta-delay-7" />
                </div>
            </div>
        </section>
    )
}

// KFZ FAQ Accordion
const KFZFAQItem = ({ q, a }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div className={`kfz-faq-item ${open ? 'kfz-faq-open' : ''}`} onClick={() => setOpen(!open)}>
            <div className="kfz-faq-question">
                <span>{q}</span>
                <ChevronDown size={20} className="kfz-faq-icon" />
            </div>
            {open && <div className="kfz-faq-answer">{a}</div>}
        </div>
    )
}

// Pain Section Component
const kfzPainPoints = [
    {
        emoji: "📞",
        text: "Das Telefon klingelt – mitten in der Reparatur",
        sub: "Kein Kunde will warten. Kein Meister kann beides gleichzeitig."
    },
    {
        emoji: "📅",
        text: "Termine werden manuell eingetragen – und vergessen",
        sub: "Zettel, Excel, Zuruf. Und manchmal doch ein doppelter Termin."
    },
    {
        emoji: "🔍",
        text: "Bei Google finden Kunden Ihre Konkurrenz – nicht Sie",
        sub: "Wer in der Nähe nach einer Werkstatt sucht, landet woanders."
    },
    {
        emoji: "💬",
        text: "Keine automatischen Erinnerungen an TÜV oder Inspektion",
        sub: "Stammkunden kommen seltener zurück, als sie könnten."
    },
    {
        emoji: "🌐",
        text: "Ihre Website wirkt wie von 2012",
        sub: "Kunden beurteilen Sie in 3 Sekunden. Was sehen sie?"
    },
    {
        emoji: "⏱️",
        text: "2–3 Stunden täglich für Admin statt Werkstattarbeit",
        sub: "Anrufe, Nachrichten, Rückfragen – das zieht Energie."
    }
]

const KFZPainSection = () => (
    <section className="kfz-pain-section">
        <div className="container">
            <div className="kfz-pain-header">
                <span className="section-tag kfz-pain-tag">Klingt bekannt?</span>
                <h2 className="kfz-pain-title">
                    Was zu viele Werkstätten täglich bremst
                </h2>
                <p className="kfz-pain-subtitle">
                    Sie sind Meister Ihres Fachs – aber Ihr Betrieb läuft noch nicht so, wie er könnte.
                </p>
            </div>
            <div className="kfz-pain-grid">
                {kfzPainPoints.map((point, i) => (
                    <div key={i} className="kfz-pain-card">
                        <div className="kfz-pain-emoji">{point.emoji}</div>
                        <div className="kfz-pain-content">
                            <p className="kfz-pain-main">{point.text}</p>
                            <p className="kfz-pain-secondary">{point.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="kfz-pain-cta-hint">
                <div className="kfz-pain-arrow">↓</div>
                <p>Wenn Sie bei 2 oder mehr Punkten genickt haben – dann ist Metriq für Sie gemacht.</p>
            </div>
        </div>
    </section>
)

// pages/KFZ.jsx
const KFZ = () => {
    return (
        <div className="page-kfz">
            <KFZHero
                trustBadge={{
                    text: "Spezialisiert auf KFZ-Werkstätten & Meisterbetriebe",
                    icons: ["🔧", "⚙️", "✅"]
                }}
                headline={{
                    line1: "Ihre Werkstatt läuft.",
                    line2: "Ihr Kundenzulauf auch."
                }}
                subtitle="Für KFZ-Werkstätten & Meisterbetriebe: Wir automatisieren Terminbuchung, Follow-Ups und Google-Sichtbarkeit – damit Sie reparieren statt telefonieren."
                buttons={{
                    primary: { text: "Kostenlose Analyse anfragen", onClick: () => document.getElementById('kfz-cta').scrollIntoView({ behavior: 'smooth' }) },
                    secondary: { text: "Leistungen ansehen", onClick: () => document.getElementById('kfz-services').scrollIntoView({ behavior: 'smooth' }) }
                }}
            />

            <KFZPainSection />

            <section id="kfz-services" className="section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Leistungen</span>
                        <h2>Spezialisierte Lösungen für Werkstätten</h2>
                        <p>Wir verstehen Ihr Handwerk und bringen es ins digitale Zeitalter.</p>
                    </div>
                    <div className="grid">
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><Zap size={28} /></div>
                            <h3>Automatisierte Terminbuchung</h3>
                            <p>Keine Telefonate mehr während der Arbeit. Kunden buchen 24/7 online – direkt in Ihren Werkstattkalender.</p>
                        </div>
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><Shield size={28} /></div>
                            <h3>Premium Website</h3>
                            <p>Ein digitaler Auftritt, der Vertrauen schafft. Schnell, mobil-optimiert und auf Konvertierung ausgelegt.</p>
                        </div>
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><CheckCircle2 size={28} /></div>
                            <h3>Automatische Follow-Ups</h3>
                            <p>Erinnerungen an TÜV, Inspektion oder Reifenwechsel werden vollautomatisch per E-Mail oder WhatsApp versendet.</p>
                        </div>
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><LayoutDashboard size={28} /></div>
                            <h3>Google Maps Dominanz</h3>
                            <p>Wir sorgen dafür, dass Sie lokal bei der Suche nach "Werkstatt in meiner Nähe" ganz oben stehen.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* KFZ Prozess Section */}
            <section className="kfz-process-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">So läuft es ab</span>
                        <h2>Vom Erstgespräch zum laufenden System</h2>
                        <p>Kein technisches Vorwissen nötig. Kein Aufwand für Sie während der Umsetzung.</p>
                    </div>
                    <div className="kfz-process-steps">
                        {[
                            { num: '01', icon: '🔍', title: 'Kostenlose Analyse', desc: 'Wir schauen uns Ihren digitalen Auftritt, Ihre Terminverwaltung und Google-Sichtbarkeit an – und zeigen Ihnen konkret, wo Potenzial liegt.' },
                            { num: '02', icon: '📐', title: 'Maßgeschneidertes Konzept', desc: 'Auf Basis der Analyse erstellen wir ein klares System-Konzept mit Zeitplan. Keine Standardlösungen von der Stange.' },
                            { num: '03', icon: '⚙️', title: 'Technik-Setup', desc: 'Wir richten Website, Terminbuchung, Follow-Ups und Google-Profil ein – komplett. Sie müssen nichts installieren.' },
                            { num: '04', icon: '🎓', title: 'Übergabe & Schulung', desc: 'Eine kurze Einführung, und Sie wissen, wie alles funktioniert. Meist reichen 30 Minuten.' },
                            { num: '05', icon: '📈', title: 'Laufende Optimierung', desc: 'Wir beobachten die Zahlen und optimieren kontinuierlich – damit Ihr System mit der Zeit besser wird, nicht schlechter.' },
                        ].map((step, i) => (
                            <div key={i} className="kfz-process-card">
                                <div className="kfz-process-num">{step.num}</div>
                                <div className="kfz-process-icon">{step.icon}</div>
                                <h3 className="kfz-process-title">{step.title}</h3>
                                <p className="kfz-process-desc">{step.desc}</p>
                                {i < 4 && <div className="kfz-process-connector" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KFZ Testimonials */}
            <section className="testimonials-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Kundenstimmen</span>
                        <h2>Was Werkstätten sagen</h2>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card glass-card">
                                <div className="testimonial-stars">
                                    {[...Array(t.rating)].map((_, j) => (
                                        <Star key={j} size={16} fill="var(--accent-color)" color="var(--accent-color)" />
                                    ))}
                                </div>
                                <p className="testimonial-text">"{t.text}"</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{t.initials}</div>
                                    <div>
                                        <div className="testimonial-name">{t.name}</div>
                                        <div className="testimonial-role">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Zahlen-Bar */}
            <section className="kfz-stats-bar">
                <div className="container">
                    <div className="kfz-stats-grid">
                        {[
                            { value: '87+', label: 'Werkstätten betreut', sub: 'in ganz Deutschland' },
                            { value: '12.400+', label: 'automatisierte Termine', sub: 'ohne manuellen Aufwand' },
                            { value: '–40%', label: 'Telefonaufwand', sub: 'im Schnitt nach 4 Wochen' },
                            { value: 'Ø 3 Wo.', label: 'bis zum Go-Live', sub: 'vom Erstgespräch bis live' },
                        ].map((stat, i) => (
                            <div key={i} className="kfz-stat-item">
                                <div className="kfz-stat-value">{stat.value}</div>
                                <div className="kfz-stat-label">{stat.label}</div>
                                <div className="kfz-stat-sub">{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KFZ FAQ */}
            <section className="kfz-faq-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Häufige Fragen</span>
                        <h2>Was Werkstattinhaber uns fragen</h2>
                        <p>Ehrliche Antworten – ohne Marketingsprache.</p>
                    </div>
                    <div className="kfz-faq-list">
                        {[
                            {
                                q: 'Brauche ich dafür eine neue Website?',
                                a: 'Nicht zwingend. Wir schauen uns Ihre aktuelle Website an und entscheiden gemeinsam, ob ein Relaunch sinnvoll ist oder ob wir die bestehende Seite optimieren. Beides ist möglich.'
                            },
                            {
                                q: 'Funktioniert das mit meinem bestehenden Kalender?',
                                a: 'Ja. Wir integrieren die Terminbuchung in Google Calendar, Outlook oder Ihre Werkstattsoftware – was immer Sie bereits nutzen.'
                            },
                            {
                                q: 'Was kostet das monatlich?',
                                a: 'Das hängt vom Leistungsumfang ab. Im Erstgespräch nennen wir Ihnen eine transparente Zahl – kein Versteckspiel. Unsere Einstiegspakete beginnen bei einmalig 990 €.'
                            },
                            {
                                q: 'Wie viel Aufwand habe ich als Werkstatt?',
                                a: 'Sehr wenig. Sie liefern uns Infos zu Ihrem Betrieb, geben Feedback zum Design – den Rest übernehmen wir vollständig. Nach der Übergabe läuft alles automatisch.'
                            },
                            {
                                q: 'Ist WhatsApp-Automatisierung DSGVO-konform?',
                                a: 'Ja – wenn sie korrekt eingerichtet ist. Wir arbeiten ausschließlich mit DSGVO-konformen Lösungen, Hosting in Deutschland und klaren Einwilligungsprozessen für Ihre Kunden.'
                            },
                            {
                                q: 'Was passiert, wenn ich kündigen möchte?',
                                a: 'Kein Problem. Alle Systeme – Website, Buchungstool, Automationen – gehören nach der Übergabe Ihnen. Keine Abhängigkeit, keine Mindestlaufzeit bei Einmalpaketen.'
                            },
                        ].map((item, i) => (
                            <KFZFAQItem key={i} q={item.q} a={item.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Dual CTA */}
            <section id="kfz-cta" className="kfz-dual-cta section-padding">
                <div className="container">
                    <div className="kfz-dual-cta-inner">
                        <div className="kfz-dual-cta-card kfz-cta-hard glass-card">
                            <div className="kfz-cta-icon-wrap">📊</div>
                            <h3>Kostenlose Potenzial-Analyse</h3>
                            <p>Wir analysieren Ihren digitalen Auftritt kostenlos und zeigen Ihnen in einem 30-Minuten-Gespräch, wo konkrete Hebel liegen.</p>
                            <ul className="kfz-cta-checklist">
                                <li>✓ Kein Auftrag nötig</li>
                                <li>✓ Konkrete Handlungsempfehlungen</li>
                                <li>✓ Innerhalb von 48 Stunden vereinbart</li>
                            </ul>
                            <button className="btn-primary kfz-cta-btn">
                                Analyse anfragen
                            </button>
                        </div>
                        <div className="kfz-dual-cta-divider">
                            <span>oder</span>
                        </div>
                        <div className="kfz-dual-cta-card kfz-cta-soft glass-card">
                            <div className="kfz-cta-icon-wrap">📞</div>
                            <h3>Direkt sprechen</h3>
                            <p>Lieber kurz anrufen? Kein Problem. Wir sind werktags von 9–18 Uhr erreichbar und beantworten Ihre Fragen ohne Skript.</p>
                            <div className="kfz-cta-phone">
                                <a href="tel:+4989123456789" className="kfz-cta-phone-number">+49 89 123 456 789</a>
                                <span className="kfz-cta-phone-hint">Mo–Fr, 9–18 Uhr</span>
                            </div>
                            <a href="tel:+4989123456789" className="btn-secondary kfz-cta-btn">
                                Jetzt anrufen
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/betrieb-prozesse" element={<WissensinfrastrukturPage />} />
                        <Route path="/website-automatisierung" element={<WebsiteAutomatisierungPage />} />
                        <Route path="/kfz" element={<KFZ />} />
                    </Routes>
                </main>
                <footer className="footer">
                    <div className="container">
                        <div className="footer-top">
                            <div className="footer-brand">
                                <img src="/logo.png" alt="Metriq" className="footer-logo" />
                                <p>Struktur und Systeme für Experten. Wir digitalisieren Ihren Betrieb – nachhaltig und messbar.</p>
                                <div className="footer-social">
                                    <a href="mailto:support@metriq.tech" aria-label="Email"><Mail size={20} /></a>
                                    <a href="tel:+49" aria-label="Phone"><Phone size={20} /></a>
                                    <a href="#" aria-label="Chat"><MessageSquare size={20} /></a>
                                </div>
                            </div>
                            <div className="footer-links-group">
                                <h4>Leistungen</h4>
                                <Link to="/betrieb-prozesse">Betrieb & Prozesse</Link>
                                <Link to="/website-automatisierung">Website & Automatisierung</Link>
                                <Link to="/kfz">KFZ-Spezialisierung</Link>
                            </div>
                            <div className="footer-links-group">
                                <h4>Unternehmen</h4>
                                <a href="#">Über uns</a>
                                <a href="#">Blog</a>
                                <a href="#">Karriere</a>
                            </div>
                            <div className="footer-links-group">
                                <h4>Rechtliches</h4>
                                <a href="#">Impressum</a>
                                <a href="#">Datenschutz</a>
                                <a href="#">AGB</a>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <p>© 2025 Metriq – Alle Rechte vorbehalten.</p>
                            <p>Made with ❤️ in Deutschland</p>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    )
}

export default App
