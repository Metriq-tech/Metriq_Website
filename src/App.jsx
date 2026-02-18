import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { LayoutDashboard, Zap, Shield, Cpu, Layers, Workflow, CheckCircle2, ArrowRight, Menu, X, Star, ChevronRight, ChevronDown, MessageSquare, Phone, Mail } from 'lucide-react'
import { PremiumHero } from './components/PremiumHero'
import KFZHero from './components/KFZHero'
import WissensinfrastrukturPage from './components/WissensinfrastrukturPage'
import WebsiteAutomatisierungPage from './components/WebsiteAutomatisierungPage'


// components/Navbar.jsx
const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="Metriq Logo" className="logo-img" />
                </Link>
                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/wissensinfrastruktur" onClick={() => setIsOpen(false)}>Wissensinfrastruktur</Link>
                    <Link to="/website-automatisierung" onClick={() => setIsOpen(false)}>Website & Automatisierung</Link>
                    <Link to="/kfz" onClick={() => setIsOpen(false)}>KFZ-Spezialisierung</Link>
                    <button className="btn-primary nav-cta">Erstgespräch buchen</button>
                </div>
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {isOpen && (
                <div className="mobile-menu">
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/wissensinfrastruktur" onClick={() => setIsOpen(false)}>Wissensinfrastruktur</Link>
                    <Link to="/website-automatisierung" onClick={() => setIsOpen(false)}>Website & Automatisierung</Link>
                    <Link to="/kfz" onClick={() => setIsOpen(false)}>KFZ-Spezialisierung</Link>
                    <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Erstgespräch buchen</button>
                </div>
            )}
        </nav>
    )
}

// Testimonials Data
const testimonials = [
    {
        name: "Thomas Bauer",
        role: "Inhaber, Auto Bauer GmbH",
        text: "Seit Metriq unsere Terminbuchung automatisiert hat, haben wir 40% weniger Telefonanrufe während der Arbeitszeit. Unsere Kunden buchen jetzt einfach online.",
        rating: 5,
        initials: "TB"
    },
    {
        name: "Sandra Müller",
        role: "Geschäftsführerin, Kfz-Müller",
        text: "Die neue Website hat unsere Online-Sichtbarkeit enorm verbessert. Wir bekommen deutlich mehr Anfragen über Google als vorher.",
        rating: 5,
        initials: "SM"
    },
    {
        name: "Klaus Weber",
        role: "Meister, Weber Fahrzeugtechnik",
        text: "Das Onboarding war unkompliziert und das Team hat alles genau so umgesetzt wie besprochen. Sehr professionell.",
        rating: 5,
        initials: "KW"
    }
]

// Process Steps
const processSteps = [
    {
        number: "01",
        title: "Kostenlose Analyse",
        description: "Wir analysieren Ihren aktuellen digitalen Auftritt, Ihre Prozesse und identifizieren die größten Hebel für Wachstum."
    },
    {
        number: "02",
        title: "Maßgeschneidertes Konzept",
        description: "Auf Basis der Analyse erstellen wir ein konkretes Konzept mit klaren Maßnahmen, Zeitplan und messbaren Zielen."
    },
    {
        number: "03",
        title: "Umsetzung & Launch",
        description: "Wir setzen alles um – von der Website bis zur Automatisierung – und begleiten Sie beim Launch und darüber hinaus."
    }
]

// Pricing Plans
const pricingPlans = [
    {
        name: "Starter",
        price: "990",
        period: "einmalig",
        description: "Perfekt für Betriebe, die ihren ersten digitalen Schritt machen wollen.",
        features: [
            "Premium Website (5 Seiten)",
            "Mobile-First Design",
            "Google Maps Optimierung",
            "Kontaktformular & Karte",
            "1 Monat Support inklusive"
        ],
        cta: "Jetzt starten",
        highlighted: false
    },
    {
        name: "Growth",
        price: "1.990",
        period: "einmalig",
        description: "Für Betriebe, die Prozesse automatisieren und mehr Kunden gewinnen wollen.",
        features: [
            "Alles aus Starter",
            "Automatisierte Terminbuchung",
            "Follow-Up Automatisierung",
            "WhatsApp & E-Mail Integration",
            "Google Ads Setup",
            "3 Monate Support inklusive"
        ],
        cta: "Empfohlen wählen",
        highlighted: true,
        badge: "Beliebteste Wahl"
    },
    {
        name: "Enterprise",
        price: "Individuell",
        period: "nach Absprache",
        description: "Für komplexe Anforderungen mit vollständiger Wissensinfrastruktur.",
        features: [
            "Alles aus Growth",
            "Wissensinfrastruktur-Aufbau",
            "CRM & Tool-Integration",
            "Individuelle Automatisierungen",
            "Dedizierter Ansprechpartner",
            "Laufender Betrieb & Wartung"
        ],
        cta: "Gespräch anfragen",
        highlighted: false
    }
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
            {open && <div className="faq-answer">{answer}</div>}
        </div>
    )
}

// pages/Home.jsx
const Home = () => {
    return (
        <div className="page-home">
            <PremiumHero />

            {/* Logos / Trust Bar */}
            <section className="trust-bar">
                <div className="container">
                    <p className="trust-bar-label">Vertrauen von Betrieben in ganz Deutschland</p>
                    <div className="trust-logos">
                        <span className="trust-logo-item">🔧 Auto Bauer GmbH</span>
                        <span className="trust-logo-item">⚙️ Kfz-Müller</span>
                        <span className="trust-logo-item">🛠️ Weber Fahrzeugtechnik</span>
                        <span className="trust-logo-item">🚗 DG Fahrzeugtechnik</span>
                        <span className="trust-logo-item">🔩 Auto Thies</span>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="services-grid section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Leistungen</span>
                        <h2>Unsere Leistungsbereiche</h2>
                        <p>Wir bieten spezialisierte Lösungen für digitale Infrastruktur und Automatisierung.</p>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                        <div className="glass-card service-card" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/wissensinfrastruktur'}>
                            <div className="service-card-icon">
                                <Layers size={28} />
                            </div>
                            <h3>Wissensinfrastruktur</h3>
                            <p>Architektur, Aufbau und Betrieb Ihrer digitalen Systeme. Von der Tool-Auswahl über Integration bis zum laufenden Support.</p>
                            <div className="card-link">
                                Mehr erfahren <ArrowRight size={16} />
                            </div>
                        </div>
                        <div className="glass-card service-card" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/website-automatisierung'}>
                            <div className="service-card-icon">
                                <Workflow size={28} />
                            </div>
                            <h3>Website & Automatisierung</h3>
                            <p>Premium-Websites und intelligente Automatisierungen für Ihren Kundenzulauf. Inklusive Spezialisierung für KFZ-Werkstätten.</p>
                            <div className="card-link">
                                Mehr erfahren <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="process-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Prozess</span>
                        <h2>So arbeiten wir</h2>
                        <p>Klar strukturiert, ohne Überraschungen – von der ersten Analyse bis zum fertigen System.</p>
                    </div>
                    <div className="process-steps">
                        {processSteps.map((step, i) => (
                            <div key={i} className="process-step">
                                <div className="process-step-number">{step.number}</div>
                                <div className="process-step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                                {i < processSteps.length - 1 && (
                                    <div className="process-connector">
                                        <ChevronRight size={24} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="benefits-section section-padding">
                <div className="container">
                    <div className="benefits-grid">
                        <div className="benefits-text-col">
                            <span className="section-tag">Warum Metriq?</span>
                            <h2>Struktur, die wirkt.</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                Wir bauen keine Insellösungen. Wir schaffen digitale Infrastruktur, die langfristig funktioniert – unabhängig von Einzelpersonen und skalierbar mit Ihrem Betrieb.
                            </p>
                            <ul className="benefits-list-v2">
                                <li><CheckCircle2 size={20} className="icon-blue" /> <div><strong>Zeit zurückgewinnen</strong><span>Weniger Rückfragen, weniger manuelle Eingriffe.</span></div></li>
                                <li><CheckCircle2 size={20} className="icon-blue" /> <div><strong>Skalierung ermöglichen</strong><span>Stabile Logik unabhängig von Einzelpersonen.</span></div></li>
                                <li><CheckCircle2 size={20} className="icon-blue" /> <div><strong>Komplexität reduzieren</strong><span>Klare Architektur ersetzt Tool-Wildwuchs.</span></div></li>
                                <li><CheckCircle2 size={20} className="icon-blue" /> <div><strong>Wirkung pro Stunde erhöhen</strong><span>Durch verlässliche, automatisierte Abläufe.</span></div></li>
                            </ul>
                        </div>
                        <div className="benefits-stats-col">
                            <div className="stat-card glass-card">
                                <div className="stat-number">+40%</div>
                                <div className="stat-label">Zeitersparnis durch Automatisierung</div>
                            </div>
                            <div className="stat-card glass-card">
                                <div className="stat-number">24/7</div>
                                <div className="stat-label">Erreichbarkeit für Ihre Kunden</div>
                            </div>
                            <div className="stat-card glass-card">
                                <div className="stat-number">3 Wo.</div>
                                <div className="stat-label">Durchschnittliche Umsetzungszeit</div>
                            </div>
                            <div className="stat-card glass-card">
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Fokus auf Ihr Kerngeschäft</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Kundenstimmen</span>
                        <h2>Was unsere Kunden sagen</h2>
                        <p>Echte Ergebnisse von echten Betrieben.</p>
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

            {/* Pricing */}
            <section className="pricing-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Preise</span>
                        <h2>Transparent & fair</h2>
                        <p>Keine versteckten Kosten. Klare Pakete, die zu Ihrem Betrieb passen.</p>
                    </div>
                    <div className="pricing-grid">
                        {pricingPlans.map((plan, i) => (
                            <div key={i} className={`pricing-card glass-card ${plan.highlighted ? 'pricing-highlighted' : ''}`}>
                                {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
                                <div className="pricing-header">
                                    <h3 className="pricing-name">{plan.name}</h3>
                                    <div className="pricing-price">
                                        {plan.price !== 'Individuell' && <span className="pricing-currency">€</span>}
                                        <span className="pricing-amount">{plan.price}</span>
                                    </div>
                                    <div className="pricing-period">{plan.period}</div>
                                    <p className="pricing-description">{plan.description}</p>
                                </div>
                                <ul className="pricing-features">
                                    {plan.features.map((f, j) => (
                                        <li key={j}>
                                            <CheckCircle2 size={16} />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={plan.highlighted ? 'btn-primary pricing-cta' : 'btn-secondary pricing-cta'}>
                                    {plan.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                    <p className="pricing-note">Alle Preise zzgl. MwSt. · Individuelle Anforderungen? <a href="mailto:support@metriq.tech">Schreiben Sie uns.</a></p>
                </div>
            </section>

            {/* FAQ */}
            <section className="faq-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">FAQ</span>
                        <h2>Häufige Fragen</h2>
                        <p>Alles, was Sie vor dem Start wissen sollten.</p>
                    </div>
                    <div className="faq-list">
                        {faqItems.map((item, i) => (
                            <FAQItem key={i} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner section-padding">
                <div className="container">
                    <div className="cta-banner-inner glass-card">
                        <div className="cta-banner-text">
                            <h2>Bereit für den nächsten Schritt?</h2>
                            <p>Buchen Sie jetzt Ihr kostenloses Erstgespräch und erfahren Sie, welche digitalen Hebel in Ihrem Betrieb noch ungenutzt sind.</p>
                        </div>
                        <div className="cta-banner-actions">
                            <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                                Erstgespräch buchen
                            </button>
                            <a href="mailto:support@metriq.tech" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={18} /> support@metriq.tech
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

// pages/KFZ.jsx
const KFZ = () => {
    return (
        <div className="page-kfz">
            <KFZHero
                trustBadge={{
                    text: "Meisterbetrieb für Expertensysteme",
                    icons: ["🛠️", "⚙️", "📱"]
                }}
                headline={{
                    line1: "Die digitale Werkstatt",
                    line2: "der nächsten Generation"
                }}
                subtitle="Wir digitalisieren Ihren kompletten Kundenzulauf – von der Google-Suche bis zum fertigen Termin in Ihrem Kalender."
                buttons={{
                    primary: { text: "Kostenlose Analyse anfragen", onClick: () => console.log('CTA Clicked') },
                    secondary: { text: "Leistungen ansehen", onClick: () => document.getElementById('kfz-services').scrollIntoView({ behavior: 'smooth' }) }
                }}
            />

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

            <section className="section-padding benefits-section">
                <div className="container">
                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Warum Metriq für KFZ?</h2>
                        <div className="grid" style={{ width: '100%' }}>
                            <div>
                                <h4 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>+40%</h4>
                                <p>Weniger Zeitaufwand am Telefon</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>24/7</h4>
                                <p>Erreichbarkeit für Terminbuchungen</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>100%</h4>
                                <p>Fokus auf Ihre eigentliche Arbeit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner section-padding">
                <div className="container">
                    <div className="cta-banner-inner glass-card">
                        <div className="cta-banner-text">
                            <h2>Kostenlose Analyse für Ihre Werkstatt</h2>
                            <p>Wir schauen uns Ihren aktuellen digitalen Auftritt an und zeigen Ihnen konkret, wo die größten Potenziale liegen.</p>
                        </div>
                        <div className="cta-banner-actions">
                            <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                                Jetzt anfragen
                            </button>
                            <a href="tel:+49" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={18} /> Direkt anrufen
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
                        <Route path="/wissensinfrastruktur" element={<WissensinfrastrukturPage />} />
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
                                <Link to="/wissensinfrastruktur">Wissensinfrastruktur</Link>
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
