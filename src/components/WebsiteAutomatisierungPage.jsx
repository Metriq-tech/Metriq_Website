import React from 'react';
import KFZHero from './KFZHero';
import { Zap, Shield, CheckCircle2, LayoutDashboard, Globe, Smartphone, ArrowRight } from 'lucide-react';

const WebsiteAutomatisierungPage = () => {
    return (
        <div className="page-website-automatisierung">
            <KFZHero
                trustBadge={{
                    text: "Premium Websites & Intelligente Automatisierung",
                    icons: ["🌐", "⚡", "🤖"]
                }}
                headline={{
                    line1: "Digitale Präsenz",
                    line2: "die verkauft"
                }}
                subtitle="Wir bauen nicht nur Websites – wir digitalisieren Ihren kompletten Kundenzulauf. Von der ersten Suche bis zum fertigen Termin."
                buttons={{
                    primary: { text: "Kostenlose Analyse anfragen", onClick: () => console.log('CTA Clicked') },
                    secondary: { text: "Leistungen ansehen", onClick: () => document.getElementById('services').scrollIntoView({ behavior: 'smooth' }) }
                }}
            />

            <section id="services" className="section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2>Was wir für Sie umsetzen</h2>
                        <p>Von der Website bis zur vollautomatischen Kundengewinnung.</p>
                    </div>
                    <div className="grid">
                        <div className="glass-card">
                            <Globe className="icon-blue" size={32} />
                            <h3>Premium Websites</h3>
                            <p>Ein digitaler Auftritt, der Vertrauen schafft. Schnell, mobil-optimiert und auf Konvertierung ausgelegt.</p>
                        </div>
                        <div className="glass-card">
                            <Zap className="icon-blue" size={32} />
                            <h3>Automatisierte Prozesse</h3>
                            <p>Terminbuchungen, Follow-Ups und Kundenkommunikation laufen 24/7 automatisch – ohne Ihr Zutun.</p>
                        </div>
                        <div className="glass-card">
                            <Smartphone className="icon-blue" size={32} />
                            <h3>Mobile-First Design</h3>
                            <p>Über 70% Ihrer Kunden kommen vom Smartphone. Wir optimieren für perfekte mobile Erlebnisse.</p>
                        </div>
                        <div className="glass-card">
                            <LayoutDashboard className="icon-blue" size={32} />
                            <h3>Google Optimierung</h3>
                            <p>Wir sorgen dafür, dass Sie lokal bei relevanten Suchanfragen ganz oben stehen.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'linear-gradient(to bottom, transparent, rgba(14, 165, 233, 0.03))' }}>
                <div className="container">
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Spezialisierung: KFZ-Werkstätten</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem' }}>
                            Für KFZ-Werkstätten bieten wir maßgeschneiderte Lösungen: Von der automatischen Terminbuchung über TÜV-Erinnerungen bis zur Google Maps Dominanz.
                        </p>
                        <button
                            className="btn-primary"
                            onClick={() => window.location.href = '/kfz'}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            KFZ-Spezialisierung ansehen <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Messbare Ergebnisse</h2>
                        <div className="grid" style={{ width: '100%' }}>
                            <div>
                                <h4 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>+40%</h4>
                                <p>Weniger Zeitaufwand für Administration</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>24/7</h4>
                                <p>Erreichbarkeit für Ihre Kunden</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>100%</h4>
                                <p>Fokus auf Ihr Kerngeschäft</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebsiteAutomatisierungPage;
