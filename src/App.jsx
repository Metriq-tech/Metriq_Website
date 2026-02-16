import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { LayoutDashboard, Zap, Shield, Cpu, Layers, Workflow, CheckCircle2, ArrowRight, Menu, X } from 'lucide-react'
import { PremiumHero } from './components/PremiumHero'
import KFZHero from './components/KFZHero'
import WissensinfrastrukturPage from './components/WissensinfrastrukturPage'
import WebsiteAutomatisierungPage from './components/WebsiteAutomatisierungPage'


// components/Navbar.jsx
const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="Metriq Logo" className="logo-img" />
                </Link>
                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/wissensinfrastruktur" onClick={() => setIsOpen(false)}>Wissensinfrastruktur</Link>
                    <Link to="/website-automatisierung" onClick={() => setIsOpen(false)}>Website & Automatisierung</Link>
                    <Link to="/kfz" onClick={() => setIsOpen(false)}>KFZ-Spezialisierung</Link>
                    <button className="btn-primary">Erstgespräch buchen</button>
                </div>
                <button className="mobile-toggle" onClick={() => setIsOpen(true)}>
                    <Menu size={24} />
                </button>
            </div>
            {isOpen && (
                <div className="mobile-overlay" onClick={() => setIsOpen(false)}>
                    <button className="mobile-close" onClick={() => setIsOpen(false)}>
                        <X size={32} />
                    </button>
                </div>
            )}
        </nav>
    )
}

// pages/Home.jsx
const Home = () => {
    return (
        <div className="page-home">
            <PremiumHero />


            <section id="services" className="services-grid section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2>Unsere Leistungsbereiche</h2>
                        <p>Wir bieten spezialisierte Lösungen für digitale Infrastruktur und Automatisierung.</p>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                        <div className="glass-card" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/wissensinfrastruktur'}>
                            <Layers className="icon-blue" size={40} />
                            <h3>Wissensinfrastruktur</h3>
                            <p>Architektur, Aufbau und Betrieb Ihrer digitalen Systeme. Von der Tool-Auswahl über Integration bis zum laufenden Support.</p>
                            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontWeight: '600' }}>
                                Mehr erfahren <ArrowRight size={18} />
                            </div>
                        </div>
                        <div className="glass-card" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/website-automatisierung'}>
                            <Workflow className="icon-blue" size={40} />
                            <h3>Website & Automatisierung</h3>
                            <p>Premium-Websites und intelligente Automatisierungen für Ihren Kundenzulauf. Inklusive Spezialisierung für KFZ-Werkstätten.</p>
                            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontWeight: '600' }}>
                                Mehr erfahren <ArrowRight size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="benefits-section section-padding">
                <div className="container">
                    <div className="benefits-container glass-card">
                        <div className="benefits-text">
                            <h2>Warum Metriq?</h2>
                            <ul className="benefits-list">
                                <li><CheckCircle2 className="icon-blue" /> <strong>Zeit zurückgewinnen:</strong> Weniger Rückfragen, weniger manuelle Eingriffe.</li>
                                <li><CheckCircle2 className="icon-blue" /> <strong>Skalierung ermöglichen:</strong> Stabile Logik unabhängig von Einzelpersonen.</li>
                                <li><CheckCircle2 className="icon-blue" /> <strong>Komplexität reduzieren:</strong> Klare Architektur ersetzt Tool-Wildwuchs.</li>
                                <li><CheckCircle2 className="icon-blue" /> <strong>Wirkung pro Stunde erhöhen:</strong> Durch verlässliche Abläufe.</li>
                            </ul>
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
                        <h2>Spezialisierte Lösungen für Werkstätten</h2>
                        <p>Wir verstehen Ihr Handwerk und bringen es ins digitale Zeitalter.</p>
                    </div>
                    <div className="grid">
                        <div className="glass-card">
                            <Zap className="icon-blue" size={32} />
                            <h3>Automatisierte Terminbuchung</h3>
                            <p>Keine Telefonate mehr während der Arbeit. Kunden buchen 24/7 online – direkt in Ihren Werkstattkalender.</p>
                        </div>
                        <div className="glass-card">
                            <Shield className="icon-blue" size={32} />
                            <h3>Premium Website</h3>
                            <p>Ein digitaler Auftritt, der Vertrauen schafft. Schnell, mobil-optimiert und auf Konvertierung ausgelegt.</p>
                        </div>
                        <div className="glass-card">
                            <CheckCircle2 className="icon-blue" size={32} />
                            <h3>Automatische Follow-Ups</h3>
                            <p>Erinnerungen an TÜV, Inspektion oder Reifenwechsel werden vollautomatisch per E-Mail oder WhatsApp versendet.</p>
                        </div>
                        <div className="glass-card">
                            <LayoutDashboard className="icon-blue" size={32} />
                            <h3>Google Maps Dominanz</h3>
                            <p>Wir sorgen dafür, dass Sie lokal bei der Suche nach "Werkstatt in meiner Nähe" ganz oben stehen.</p>
                        </div>
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
                <footer className="footer section-padding">
                    <div className="container">
                        <div className="footer-content">
                            <p>© 2025 Metriq – Struktur und Systeme für Experten</p>
                            <div className="footer-links">
                                <a href="mailto:support@metriq.tech">support@metriq.tech</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    )
}

export default App
