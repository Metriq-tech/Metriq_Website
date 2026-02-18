import React from 'react';
import { PremiumHero } from './PremiumHero';
import { Cpu, Workflow, Shield, Layers, CheckCircle2, ArrowRight, Mail } from 'lucide-react';

const WissensinfrastrukturPage = () => {
    return (
        <div className="page-wissensinfrastruktur">
            <PremiumHero />

            <section className="services-grid section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Leistungen</span>
                        <h2>Was Wissensinfrastruktur bedeutet</h2>
                        <p>Wir vereinfachen Komplexität und schaffen Stabilität – damit Ihr Betrieb unabhängig von Einzelpersonen skaliert.</p>
                    </div>
                    <div className="grid">
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><Cpu size={28} /></div>
                            <h3>Architektur-Entscheidungen</h3>
                            <p>Welche Systeme wie zusammenspielen. Wir planen Ihre Infrastruktur für langfristiges Wachstum.</p>
                        </div>
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><Workflow size={28} /></div>
                            <h3>Systemaufbau & Integration</h3>
                            <p>Aufsetzen, Verbinden, Testen. Wir bauen Brücken zwischen Ihren Tools (CRM, LMS, E-Mail).</p>
                        </div>
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><Shield size={28} /></div>
                            <h3>Betrieb & Wartung</h3>
                            <p>Laufende technische Verantwortung. Wir kümmern uns um Updates, Bugfixes und Performance.</p>
                        </div>
                        <div className="glass-card service-card">
                            <div className="service-card-icon"><Layers size={28} /></div>
                            <h3>Toolauswahl</h3>
                            <p>Entscheidung über Werkzeuge auf Basis von Anforderungen, nicht auf Basis von Hypes.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="benefits-section section-padding">
                <div className="container">
                    <div className="benefits-grid">
                        <div className="benefits-text-col">
                            <span className="section-tag">Warum Wissensinfrastruktur?</span>
                            <h2>Wissen, das bleibt.</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                Wenn Wissen nur in Köpfen steckt, ist es verletzlich. Wir bauen Systeme, die Wissen speichern, strukturieren und für alle zugänglich machen.
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
                                <div className="stat-number">-60%</div>
                                <div className="stat-label">Weniger Rückfragen im Team</div>
                            </div>
                            <div className="stat-card glass-card">
                                <div className="stat-number">3×</div>
                                <div className="stat-label">Schnelleres Onboarding neuer Mitarbeiter</div>
                            </div>
                            <div className="stat-card glass-card">
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Wissen bleibt im Unternehmen</div>
                            </div>
                            <div className="stat-card glass-card">
                                <div className="stat-number">∞</div>
                                <div className="stat-label">Skalierbar ohne Personalaufwand</div>
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
                            <h2>Bereit für strukturiertes Wissen?</h2>
                            <p>Buchen Sie jetzt Ihr kostenloses Erstgespräch und erfahren Sie, wie wir Ihre Wissensinfrastruktur aufbauen können.</p>
                        </div>
                        <div className="cta-banner-actions">
                            <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                                Erstgespräch buchen
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

export default WissensinfrastrukturPage;
