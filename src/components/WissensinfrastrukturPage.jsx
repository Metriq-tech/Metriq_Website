import React from 'react';
import { PremiumHero } from './PremiumHero';
import { Cpu, Workflow, Shield, Layers, CheckCircle2 } from 'lucide-react';

const WissensinfrastrukturPage = () => {
    return (
        <div className="page-wissensinfrastruktur">
            <PremiumHero />

            <section className="services-grid section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2>Was Wissensinfrastruktur bedeutet</h2>
                        <p>Wir vereinfachen Komplexität und schaffen Stabilität.</p>
                    </div>
                    <div className="grid">
                        <div className="glass-card">
                            <Cpu className="icon-blue" size={32} />
                            <h3>Architektur-Entscheidungen</h3>
                            <p>Welche Systeme wie zusammenspielen. Wir planen Ihre Infrastruktur für langfristiges Wachstum.</p>
                        </div>
                        <div className="glass-card">
                            <Workflow className="icon-blue" size={32} />
                            <h3>Systemaufbau & Integration</h3>
                            <p>Aufsetzen, Verbinden, Testen. Wir bauen Brücken zwischen Ihren Tools (CRM, LMS, E-Mail).</p>
                        </div>
                        <div className="glass-card">
                            <Shield className="icon-blue" size={32} />
                            <h3>Betrieb & Wartung</h3>
                            <p>Laufende technische Verantwortung. Wir kümmern uns um Updates, Bugfixes und Performance.</p>
                        </div>
                        <div className="glass-card">
                            <Layers className="icon-blue" size={32} />
                            <h3>Toolauswahl</h3>
                            <p>Entscheidung über Werkzeuge auf Basis von Anforderungen, nicht auf Basis von Hypes.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="benefits-section section-padding">
                <div className="container">
                    <div className="benefits-container glass-card">
                        <div className="benefits-text">
                            <h2>Warum Wissensinfrastruktur?</h2>
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
    );
};

export default WissensinfrastrukturPage;
