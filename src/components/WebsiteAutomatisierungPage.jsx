import React from 'react';
import KFZHero from './KFZHero';
import { Zap, Shield, CheckCircle2, LayoutDashboard, Globe, Smartphone, ArrowRight, Mail, Phone } from 'lucide-react';

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
                        <span className="section-tag">Leistungen</span>
                        <h2>Was wir für Sie umsetzen</h2>
                        <p>Von der Website bis zur vollautomatischen Kundengewinnung.</p>
                    </div>
                    <div className="grid">
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><Globe size={28} /></div>
                            <h3>Premium Websites</h3>
                            <p>Ein digitaler Auftritt, der Vertrauen schafft. Schnell, mobil-optimiert und auf Konvertierung ausgelegt.</p>
                        </div>
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><Zap size={28} /></div>
                            <h3>Automatisierte Prozesse</h3>
                            <p>Terminbuchungen, Follow-Ups und Kundenkommunikation laufen 24/7 automatisch – ohne Ihr Zutun.</p>
                        </div>
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><Smartphone size={28} /></div>
                            <h3>Mobile-First Design</h3>
                            <p>Über 70% Ihrer Kunden kommen vom Smartphone. Wir optimieren für perfekte mobile Erlebnisse.</p>
                        </div>
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><LayoutDashboard size={28} /></div>
                            <h3>Google Optimierung</h3>
                            <p>Wir sorgen dafür, dass Sie lokal bei relevanten Suchanfragen ganz oben stehen.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="benefits-section section-padding">
                <div className="container">
                    <div className="benefits-grid">
                        <div className="benefits-text-col">
                            <span className="section-tag">Messbare Ergebnisse</span>
                            <h2>Zahlen, die überzeugen.</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                Unsere Lösungen sind nicht nur schön – sie liefern messbare Ergebnisse für Ihren Betrieb.
                            </p>
                            <ul className="benefits-list-v2">
                                <li><CheckCircle2 size={20} className="icon-blue" /> <div><strong>Mehr Anfragen</strong><span>Durch bessere Sichtbarkeit bei Google und optimierte Conversion.</span></div></li>
                                <li><CheckCircle2 size={20} className="icon-blue" /> <div><strong>Weniger Aufwand</strong><span>Automatisierte Prozesse entlasten Sie und Ihr Team täglich.</span></div></li>
                                <li><CheckCircle2 size={20} className="icon-blue" /> <div><strong>Professioneller Auftritt</strong><span>Eine Website, die Vertrauen schafft und Kunden überzeugt.</span></div></li>
                                <li><CheckCircle2 size={20} className="icon-blue" /> <div><strong>Schnelle Umsetzung</strong><span>Von der Analyse bis zum Launch in nur wenigen Wochen.</span></div></li>
                            </ul>
                        </div>
                        <div className="benefits-stats-col">
                            <div className="stat-card glass-card">
                                <div className="stat-number">+40%</div>
                                <div className="stat-label">Weniger Zeitaufwand für Administration</div>
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
                                <div className="stat-number">Top 3</div>
                                <div className="stat-label">Google-Platzierung lokal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* KFZ Spezialisierung Highlight */}
            <section className="section-padding" style={{ background: 'linear-gradient(to bottom, transparent, rgba(14, 165, 233, 0.03))' }}>
                <div className="container">
                    <div className="glass-card" style={{ textAlign: 'center', borderColor: 'rgba(125, 211, 232, 0.2)' }}>
                        <span className="section-tag">Spezialisierung</span>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', marginTop: '1rem' }}>Speziell für KFZ-Werkstätten</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: '1.7' }}>
                            Für KFZ-Werkstätten bieten wir maßgeschneiderte Lösungen: Von der automatischen Terminbuchung über TÜV-Erinnerungen bis zur Google Maps Dominanz.
                        </p>
                        <button
                            className="btn-primary"
                            onClick={() => window.location.href = '/kfz'}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.9rem 2rem' }}
                        >
                            KFZ-Spezialisierung ansehen <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner section-padding">
                <div className="container">
                    <div className="cta-banner-inner glass-card">
                        <div className="cta-banner-text">
                            <h2>Bereit für Ihre neue Website?</h2>
                            <p>Wir analysieren Ihren aktuellen Auftritt kostenlos und zeigen Ihnen, welche Maßnahmen den größten Unterschied machen.</p>
                        </div>
                        <div className="cta-banner-actions">
                            <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                                Kostenlose Analyse
                            </button>
                            <a href="mailto:support@metriq.tech" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={18} /> Kontakt aufnehmen
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebsiteAutomatisierungPage;
