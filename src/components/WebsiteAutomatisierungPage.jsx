import React from 'react';
import { Link } from 'react-router-dom';
import { PremiumHero } from './PremiumHero';
import {
    Globe, Zap, Smartphone, Search, BarChart3, Settings,
    CheckCircle2, ArrowRight, ArrowLeft, Mail, CalendarCheck,
    MessageSquare, Bot, Clock, TrendingUp
} from 'lucide-react';

// ── Leistungen / Service Cards ───────────────────────────────────────────────
const SERVICES = [
    {
        icon: <Globe size={28} />,
        title: 'Premium Websites',
        desc: 'Conversion-optimierte Auftritte, die auf mobilen Geräten genauso überzeugen wie auf dem Desktop. Schnell. Klar. Vertrauenswürdig.',
        color: '#7dd3e8',
    },
    {
        icon: <Bot size={28} />,
        title: 'Automatisierte Prozesse',
        desc: 'Terminbuchungen, Follow-Up Mails und Kundenanfragen laufen 24/7 automatisch – ohne manuellen Aufwand von Ihrem Team.',
        color: '#a78bfa',
    },
    {
        icon: <Search size={28} />,
        title: 'Lokale SEO & Google',
        desc: 'Wir sorgen dafür, dass Sie bei relevanten Suchanfragen in Ihrer Region an erster Stelle erscheinen und Kunden Sie finden.',
        color: '#34d399',
    },
    {
        icon: <Smartphone size={28} />,
        title: 'Mobile-First Design',
        desc: 'Über 70 % aller Besucher kommen per Smartphone. Wir optimieren die mobile Erfahrung für maximale Konversionsrate.',
        color: '#fb923c',
    },
    {
        icon: <BarChart3 size={28} />,
        title: 'Analytics & Tracking',
        desc: 'Klares Reporting über Besucher, Anfragen und Conversion – damit Sie sehen, was funktioniert und was nicht.',
        color: '#f472b6',
    },
    {
        icon: <Settings size={28} />,
        title: 'Wartung & Support',
        desc: 'Kein Stillstand. Wir übernehmen den laufenden Betrieb Ihrer digitalen Infrastruktur – Updates, Sicherheit, Performance.',
        color: '#7dd3e8',
    },
];

// ── Prozess Steps ─────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
    { num: '01', title: 'Analyse', desc: 'Wir nehmen Ihren aktuellen Auftritt und Ihre Ziele unter die Lupe. Kostenlos, unverbindlich.' },
    { num: '02', title: 'Strategie', desc: 'Auf Basis der Analyse entwickeln wir ein maßgeschneidertes Konzept – keine Vorlage, kein Copy-Paste.' },
    { num: '03', title: 'Umsetzung', desc: 'Wir bauen, testen und optimieren. Sie sehen den Fortschritt live und geben Feedback in Echtzeit.' },
    { num: '04', title: 'Live & Betrieb', desc: 'Nach dem Launch übernehmen wir den Betrieb. Ihre Website bleibt dauerhaft schnell, sicher und aktuell.' },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
    { value: '+40 %', label: 'Mehr qualifizierte Anfragen im Schnitt' },
    { value: '24 / 7', label: 'Automatische Erreichbarkeit für Ihre Kunden' },
    { value: '3 Wo.', label: 'Durchschnittliche Zeit von Analyse bis Launch' },
    { value: 'Top 3', label: 'Lokale Google-Platzierung für relevante Keywords' },
];

// ── Benefits list ─────────────────────────────────────────────────────────────
const BENEFITS = [
    { title: 'Mehr Anfragen', desc: 'Durch bessere Sichtbarkeit bei Google und eine optimierte Conversion-Strecke.' },
    { title: 'Weniger Aufwand', desc: 'Automatisierte Prozesse entlasten Sie und Ihr Team täglich spürbar.' },
    { title: 'Professioneller Auftritt', desc: 'Eine Website, die Vertrauen schafft – bevor Sie auch nur ein Wort gesagt haben.' },
    { title: 'Messbare Ergebnisse', desc: 'Keine Versprechen ins Blaue hinein – nur Maßnahmen mit klarer Wirkung.' },
];

// ─────────────────────────────────────────────────────────────────────────────

const WebsiteAutomatisierungPage = () => {
    return (
        <div className="subpage wap-root">

            {/* ── Beam Hero mit Breadcrumb ── */}
            <PremiumHero
                badge="Website & Automatisierung"
                titlePrefix="Digitale Präsenz,"
                titles={['die verkauft.', 'die wächst.', 'die überzeugt.', 'die automatisiert.', 'die konvertiert.']}
                description="Wir bauen nicht nur Websites – wir digitalisieren Ihren kompletten Kundenzulauf. Von der ersten Google-Suche bis zum fertigen Erstgespräch, vollständig automatisiert."
                primaryCTA={{ text: 'Kostenlose Analyse anfragen', href: 'mailto:support@metriq.tech?subject=Kostenlose Analyse anfragen' }}
                secondaryCTA={{ text: 'Leistungen ansehen', href: '#leistungen' }}
                showTrust={false}
                topSlot={
                    <Link to="/" className="subpage-back-link">
                        <ArrowLeft size={16} /> Zurück zur Startseite
                    </Link>
                }
            />

            {/* ── Stats ────────────────────────────────────────── */}
            <section className="wap-stats-bar section-padding-sm">
                <div className="container">
                    <div className="wap-stats-grid">
                        {STATS.map((s, i) => (
                            <div key={i} className="wap-stat-item">
                                <div className="wap-stat-value">{s.value}</div>
                                <div className="wap-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Leistungen ───────────────────────────────────── */}
            <section id="leistungen" className="section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Leistungen</span>
                        <h2>Was wir für Sie umsetzen</h2>
                        <p>Von der Website bis zur vollautomatischen Kundengewinnung – alles aus einer Hand.</p>
                    </div>
                    <div className="wap-services-grid">
                        {SERVICES.map((s, i) => (
                            <div key={i} className="wap-service-card glass-card" style={{ '--card-color': s.color }}>
                                <div className="wap-service-icon" style={{ color: s.color }}>{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Benefits + Stats Col ─────────────────────────── */}
            <section className="benefits-section section-padding">
                <div className="container">
                    <div className="benefits-grid">
                        <div className="benefits-text-col">
                            <span className="section-tag">Messbare Ergebnisse</span>
                            <h2>Zahlen, die überzeugen.</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.75' }}>
                                Unsere Lösungen sind nicht nur schön – sie liefern messbare Ergebnisse für Ihren Betrieb.
                            </p>
                            <ul className="benefits-list-v2">
                                {BENEFITS.map((b, i) => (
                                    <li key={i}>
                                        <CheckCircle2 size={20} className="icon-blue" />
                                        <div>
                                            <strong>{b.title}</strong>
                                            <span>{b.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="benefits-stats-col">
                            <div className="glass-card wap-highlight-card">
                                <CalendarCheck size={32} style={{ color: '#7dd3e8', marginBottom: '1rem' }} />
                                <h3>Automatische Terminbuchung</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.65' }}>
                                    Kunden buchen ihren Termin direkt auf Ihrer Website – rund um die Uhr, ohne Telefonat, ohne Hin-und-Her.
                                </p>
                            </div>
                            <div className="glass-card wap-highlight-card">
                                <MessageSquare size={32} style={{ color: '#a78bfa', marginBottom: '1rem' }} />
                                <h3>Automatisierte Follow-Ups</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.65' }}>
                                    Erinnerungen, Dankes-Mails und Nachfass-Sequenzen laufen automatisch – Ihre Kunden fühlen sich persönlich betreut.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Prozess ──────────────────────────────────────── */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Ablauf</span>
                        <h2>So arbeiten wir</h2>
                        <p>Transparent, strukturiert und ohne Überraschungen – von der ersten Analyse bis zum laufenden Betrieb.</p>
                    </div>
                    <div className="wap-process-steps">
                        {PROCESS_STEPS.map((step, i) => (
                            <div key={i} className="wap-process-step glass-card">
                                <div className="wap-step-num">{step.num}</div>
                                <div>
                                    <h3>{step.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.65', marginTop: '0.5rem' }}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ───────────────────────────────────── */}
            <section className="cta-banner section-padding">
                <div className="container">
                    <div className="cta-banner-inner glass-card">
                        <div className="cta-banner-text">
                            <h2>Bereit für Ihren neuen digitalen Auftritt?</h2>
                            <p>
                                In einem kostenlosen 30-Minuten-Gespräch analysieren wir Ihren aktuellen Auftritt
                                und zeigen Ihnen konkret, welche Maßnahmen den größten Unterschied machen.
                            </p>
                        </div>
                        <div className="cta-banner-actions">
                            <a
                                href="mailto:support@metriq.tech?subject=Kostenlose Analyse anfragen"
                                className="btn-primary"
                                style={{ fontSize: '1.05rem', padding: '1rem 2.25rem' }}
                            >
                                Jetzt Analyse anfragen <ArrowRight size={18} />
                            </a>
                            <a
                                href="mailto:support@metriq.tech"
                                className="btn-outline"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <Mail size={18} /> Direkt schreiben
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebsiteAutomatisierungPage;
