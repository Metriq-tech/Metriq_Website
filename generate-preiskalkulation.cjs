// generate-preiskalkulation.js
// Metriq – DOCX Generator für Preiskalkulation
// Skill: docx (npm install -g docx)

const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
    VerticalAlign, LevelFormat, PageBreak, Footer, PageNumber
} = require('docx');
const fs = require('fs');
const path = require('path');

// ── Farben ──────────────────────────────────────────────────────────────────
const CLR_HEADER_BG = '1A3A5C';   // Dunkelblau (Metriq)
const CLR_HEADER_TXT = 'FFFFFF';
const CLR_ALT_ROW = 'EEF4FA';   // Hellblau-grau für alternierende Zeilen
const CLR_ACCENT = '2E86C1';   // Blau für Highlight-Zeilen
const CLR_ACCENT_TXT = 'FFFFFF';
const CLR_BORDER = 'C0D3E8';

// ── Hilfsfunktionen ─────────────────────────────────────────────────────────
const border = { style: BorderStyle.SINGLE, size: 1, color: CLR_BORDER };
const borders = { top: border, bottom: border, left: border, right: border };

function makeHeading(text, level = HeadingLevel.HEADING_1, spaceAfter = 200) {
    return new Paragraph({
        heading: level,
        spacing: { before: level === HeadingLevel.HEADING_1 ? 480 : 300, after: spaceAfter },
        children: [new TextRun({
            text, bold: true, font: 'Arial',
            size: level === HeadingLevel.HEADING_1 ? 32 : level === HeadingLevel.HEADING_2 ? 26 : 22,
            color: level === HeadingLevel.HEADING_1 ? CLR_HEADER_BG : '1A1A2E'
        })]
    });
}

function makeText(text, { italic = false, color = '333333', size = 22, spaceBefore = 60, spaceAfter = 80 } = {}) {
    return new Paragraph({
        spacing: { before: spaceBefore, after: spaceAfter },
        children: [new TextRun({ text, italic, color, font: 'Arial', size })]
    });
}

function makeBullet(text, numbering) {
    return new Paragraph({
        numbering: { reference: 'bullets', level: 0 },
        spacing: { before: 40, after: 40 },
        children: [new TextRun({ text, font: 'Arial', size: 22, color: '333333' })]
    });
}

function makeTableHeader(cells, colWidths) {
    return new TableRow({
        tableHeader: true,
        children: cells.map((text, i) =>
            new TableCell({
                borders,
                width: { size: colWidths[i], type: WidthType.DXA },
                shading: { fill: CLR_HEADER_BG, type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [new TextRun({ text, bold: true, color: CLR_HEADER_TXT, font: 'Arial', size: 20 })]
                })]
            })
        )
    });
}

function makeTableRow(cells, colWidths, { highlighted = false, altRow = false } = {}) {
    const bg = highlighted ? CLR_ACCENT : altRow ? CLR_ALT_ROW : 'FFFFFF';
    const txtColor = highlighted ? CLR_ACCENT_TXT : '333333';
    return new TableRow({
        children: cells.map((text, i) =>
            new TableCell({
                borders,
                width: { size: colWidths[i], type: WidthType.DXA },
                shading: { fill: bg, type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 140, right: 140 },
                children: [new Paragraph({ children: [new TextRun({ text, font: 'Arial', size: 20, color: txtColor })] })]
            })
        )
    });
}

function makeTable(headers, rows, colWidths, { highlightRow = null } = {}) {
    const total = colWidths.reduce((a, b) => a + b, 0);
    return new Table({
        width: { size: total, type: WidthType.DXA },
        columnWidths: colWidths,
        rows: [
            makeTableHeader(headers, colWidths),
            ...rows.map((row, i) =>
                makeTableRow(row, colWidths, {
                    highlighted: i === highlightRow,
                    altRow: i % 2 === 1 && i !== highlightRow
                })
            )
        ]
    });
}

function spacer(lines = 1) {
    return Array.from({ length: lines }, () =>
        new Paragraph({ spacing: { before: 0, after: 60 }, children: [new TextRun('')] })
    );
}

function pageBreak() {
    return new Paragraph({ children: [new PageBreak()] });
}

// ── Tabellen-Contentwidth: A4 mit 1.5cm Rand (8504 DXA brutto, ~7568 netto) ─
// A4 = 11906 DXA breit, 2x 1080 DXA Rand = 9746 netto
const W = 9746;

// ── DOKUMENT AUFBAUEN ────────────────────────────────────────────────────────
const children = [];

// ── COVER ────────────────────────────────────────────────────────────────────
children.push(
    new Paragraph({
        spacing: { before: 2000, after: 200 },
        children: [new TextRun({ text: 'METRIQ', bold: true, font: 'Arial', size: 72, color: CLR_HEADER_BG })]
    }),
    new Paragraph({
        spacing: { before: 0, after: 400 },
        children: [new TextRun({ text: 'Digitale Infrastruktur für Betriebe', font: 'Arial', size: 28, color: '666666', italics: true })]
    }),
    new Paragraph({
        children: [new TextRun({ text: 'Angebots- & Preiskalkulation', bold: true, font: 'Arial', size: 52, color: '1A1A2E' })]
    }),
    new Paragraph({
        spacing: { before: 200, after: 1200 },
        children: [new TextRun({ text: 'Intern · Stand: Februar 2026', font: 'Arial', size: 22, color: '999999' })]
    }),
    // Trennlinie (leere Tabelle als "Linie")
    new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [W],
        rows: [new TableRow({
            children: [new TableCell({
                borders: {
                    top: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.SINGLE, size: 6, color: CLR_HEADER_BG }
                },
                width: { size: W, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun('')] })]
            })]
        })]
    }),
    ...spacer(2),
    makeText('Dieses Dokument enthält die interne Preiskalkulation für alle Metriq-Leistungsbereiche. Nicht für Kunden bestimmt.', { italic: true, color: '888888' }),
    pageBreak()
);

// ── 1. ÜBERGEORDNETER FRAME ──────────────────────────────────────────────────
children.push(
    makeHeading('1. Übergeordneter Rahmen: Wert vs. Preis'),
    makeText('Metriq verkauft keine Stunden und keine Tools – wir verkaufen operative Entlastung und digitalen Wettbewerbsvorteil für inhabergeführte Betriebe.'),
    ...spacer(1),
    makeHeading('Referenzrahmen für Kundengespräche', HeadingLevel.HEADING_2),
    makeTable(
        ['Kontext', 'Kennzahl'],
        [
            ['Typischer KMU-Jahresumsatz', '€300k – 2M'],
            ['Durchschnittlicher Auftragswert (Werkstatt)', '€200 – 500'],
            ['5 neue Aufträge/Monat durch bessere Sichtbarkeit', '€12.000 – 30.000 Mehreinnahmen/Jahr'],
            ['3h/Woche Zeitersparnis durch Automatisierung', '~€7.500/Jahr (@ €50 Opportunitätskosten)'],
        ],
        [Math.round(W * 0.55), Math.round(W * 0.45)]
    ),
    ...spacer(1),
    makeText('⚠  Preispsychologie: Zu günstig wirkt unserös. Der Setup-Preis ist nicht die Frage „was kostet das?" – sondern „was bringt das?"', { italic: true, color: '2E5D8E', size: 20 }),
    pageBreak()
);

// ── 2. WEBSITE ───────────────────────────────────────────────────────────────
children.push(
    makeHeading('2. Bereich: Websites (KFZ & Handwerk)'),
    makeHeading('Markteinordnung', HeadingLevel.HEADING_2),
    makeTable(
        ['Wettbewerber', 'Preis (vergleichbar)'],
        [
            ['Lokale Webagenturen', '€2.000 – 6.000 einmalig, 3–8 Wochen Lieferzeit'],
            ['Baukastensysteme (Wix, Jimdo)', '€0 – 300, keine Conversion-Optimierung'],
            ['Freelancer', '€800 – 2.500, unzuverlässige Qualität'],
            ['Metriq', '€599 – 1.299 einmalig, ~2 Wochen Lieferzeit'],
        ],
        [Math.round(W * 0.4), Math.round(W * 0.6)],
        { highlightRow: 3 }
    ),
    ...spacer(1),

    makeHeading('Einmalige Setup-Gebühr', HeadingLevel.HEADING_2),
    makeTable(
        ['Paket', 'Preis', 'Positionierung'],
        [
            ['Classic (Version A)', '€ 599', 'Einstieg für preissensitive Kunden'],
            ['Professional (Version B) ⭐', '€ 899', 'Meistverkauft – Preis-Leistungs-Sweet-Spot'],
            ['Signature (Version C)', '€ 1.299', 'Lokaler Marktführer-Auftritt'],
            ['Ohne Retainer (Aufschlag)', '+ € 200', 'Einmalzahler werden trotzdem Support anfragen'],
        ],
        [Math.round(W * 0.3), Math.round(W * 0.2), Math.round(W * 0.5)],
        { highlightRow: 1 }
    ),
    ...spacer(1),

    makeHeading('Monatlicher Retainer (Hosting & Betreuung)', HeadingLevel.HEADING_2),
    makeTable(
        ['Paket', 'Preis/Monat', 'Enthält'],
        [
            ['Classic', '€ 49 / Mo', 'Hosting, 2 Aktualisierungen/Mo, WhatsApp-Erreichbarkeit'],
            ['Professional ⭐', '€ 69 / Mo', 'Hosting, 3 Updates/Mo, Reaktion <24h bei Dringlichkeiten'],
            ['Signature', '€ 89 / Mo', 'Hosting, 4 Updates/Mo, Prioritäts-Support, proaktive Vorschläge'],
        ],
        [Math.round(W * 0.25), Math.round(W * 0.2), Math.round(W * 0.55)],
        { highlightRow: 1 }
    ),
    ...spacer(1),
    makeText('Kostenstruktur: GitHub Pages ~€0 · Domain ~€1–2/Mo · Zeitaufwand ∅ 1–2h/Mo → eff. Stundensatz €45–89/h', { italic: true, color: '666666', size: 20 }),
    ...spacer(1),

    makeHeading('Jahresübersicht (Ø-Jahreswert für Metriq)', HeadingLevel.HEADING_2),
    makeTable(
        ['Paket', 'Setup', 'Retainer', 'Ø Jahreswert'],
        [
            ['Starter (Classic)', '€ 599', '€ 49/Mo', '€ 1.187'],
            ['Professional ⭐', '€ 899', '€ 69/Mo', '€ 1.727'],
            ['Signature', '€ 1.299', '€ 89/Mo', '€ 2.367'],
        ],
        [Math.round(W * 0.3), Math.round(W * 0.2), Math.round(W * 0.2), Math.round(W * 0.3)],
        { highlightRow: 1 }
    ),
    pageBreak()
);

// ── 3. AUTOMATISIERUNGEN ─────────────────────────────────────────────────────
children.push(
    makeHeading('3. Bereich: Prozess-Automatisierungen'),
    makeHeading('Markteinordnung', HeadingLevel.HEADING_2),
    makeTable(
        ['Wettbewerber', 'Preis'],
        [
            ['n8n / Zapier Consultants', '€100 – 200/h, meist kein Fixpreis'],
            ['Digitalisierungsagenturen', '€3.000 – 15.000+ pro Projekt'],
            ['Freelancer (Upwork)', '€40 – 80/h, wenig Branchenverständnis'],
            ['Metriq', '€799 – 3.499 einmalig + optionaler Retainer'],
        ],
        [Math.round(W * 0.4), Math.round(W * 0.6)],
        { highlightRow: 3 }
    ),
    ...spacer(1),

    makeHeading('Automatisierungs-Kategorien (Angebotspalette)', HeadingLevel.HEADING_2),
    makeTable(
        ['Kategorie', 'Beispiele', 'Tools'],
        [
            ['Kommunikation', 'Follow-up E-Mail, Bestätigung, Erinnerung, Reaktivierung', 'n8n, Make, Brevo'],
            ['Terminbuchung', 'Cal.com-Integration, Google Calendar Sync, Pufferzeit', 'Cal.com, n8n'],
            ['CRM & Leads', 'Kontakt → CRM, Lead-Scoring, Angebots-Erinnerung', 'Notion, Airtable, n8n'],
            ['Interne Abläufe', 'KPI-Reports, Rechnungs-Reminder, Lagermeldungen', 'Google Sheets, n8n'],
            ['Reputation', 'Review-Link nach Abschluss, Auswertung, Content-Ideen', 'Zapier, Make'],
        ],
        [Math.round(W * 0.25), Math.round(W * 0.45), Math.round(W * 0.3)]
    ),
    ...spacer(1),

    makeHeading('Einmalige Setup-Gebühr', HeadingLevel.HEADING_2),
    makeTable(
        ['Paket', 'Preis', 'Umfang'],
        [
            ['Starter-Flow', '€ 799', '1–2 Workflows, max. 2 Tools'],
            ['Standard-Suite ⭐', '€ 1.499', '3–5 Workflows, bis 4 Tools, inkl. Testing'],
            ['Premium-Automation', '€ 2.499', '6–10 Workflows, komplexe Logik, Fehlerhandling, Doku'],
            ['Enterprise-Custom', 'ab € 3.499', 'Maßgeschneidert, API-Integrationen, Team-Onboarding'],
        ],
        [Math.round(W * 0.3), Math.round(W * 0.2), Math.round(W * 0.5)],
        { highlightRow: 1 }
    ),
    ...spacer(1),

    makeHeading('Monatlicher Retainer (Wartung & Anpassungen)', HeadingLevel.HEADING_2),
    makeTable(
        ['Tier', 'Preis/Mo', 'Enthält'],
        [
            ['Basis', '€ 79 / Mo', 'Monitoring, 1 Anpassung/Mo, Fehlerbehebung <48h'],
            ['Standard ⭐', '€ 129 / Mo', 'Monitoring, 3 Anpassungen/Mo, 24h-Response, monatl. Review'],
            ['Premium', '€ 199 / Mo', 'Monitoring, unlimitierte Anpassungen, proaktive Optimierung'],
        ],
        [Math.round(W * 0.2), Math.round(W * 0.2), Math.round(W * 0.6)],
        { highlightRow: 1 }
    ),
    ...spacer(1),

    makeHeading('Jahresübersicht', HeadingLevel.HEADING_2),
    makeTable(
        ['Paket', 'Setup', 'Retainer', 'Ø Jahreswert'],
        [
            ['Kommunikation-Starter', '€ 799', '€ 79/Mo', '€ 1.747'],
            ['Prozess-Suite ⭐', '€ 1.499', '€ 129/Mo', '€ 3.047'],
            ['Full-Automation', '€ 2.499', '€ 199/Mo', '€ 4.887'],
        ],
        [Math.round(W * 0.3), Math.round(W * 0.2), Math.round(W * 0.2), Math.round(W * 0.3)],
        { highlightRow: 1 }
    ),
    pageBreak()
);

// ── 4. WISSENSINFRASTRUKTUR ──────────────────────────────────────────────────
children.push(
    makeHeading('4. Bereich: Wissensinfrastrukturen'),
    makeText('Strukturiertes digitales Fundament eines Betriebs: SOPs, Onboarding, interne Wissensdatenbanken, Trainings-Hubs. Zielgruppe: Betriebe ab 5–10 Mitarbeitern, die vom „Kopf des Inhabers" auf dokumentierte Prozesse umstellen wollen.'),
    ...spacer(1),

    makeHeading('Markteinordnung', HeadingLevel.HEADING_2),
    makeTable(
        ['Wettbewerber', 'Preis'],
        [
            ['Unternehmensberater (klassisch)', '€150 – 300/h, Projekte €10k – 50k'],
            ['Notion-Consultants (Upwork)', '€50 – 120/h'],
            ['In-House Dokumentation', 'Fehlt in 90% der Betriebe komplett'],
            ['Metriq', '€1.499 – 5.999 einmalig + Retainer'],
        ],
        [Math.round(W * 0.4), Math.round(W * 0.6)],
        { highlightRow: 3 }
    ),
    ...spacer(1),

    makeHeading('Einmalige Setup-Gebühr', HeadingLevel.HEADING_2),
    makeTable(
        ['Paket', 'Preis', 'Umfang', 'Lieferzeit'],
        [
            ['SOP-Basis', '€ 1.499', '10–15 SOPs, Notion-Setup, 1 Review-Runde', '3–4 Wochen'],
            ['Onboarding-System', '€ 1.999', 'Vollst. Onboarding für 1–3 Rollen, Lernpfade', '4 Wochen'],
            ['Wissensdatenbank ⭐', '€ 2.999', 'Komplette Datenbank-Architektur, Templates, Schulung', '5–6 Wochen'],
            ['Trainings-Hub', '€ 3.499', 'Lernpfade, 5–8 Module, Video-Integration', '6–8 Wochen'],
            ['Digitales Fundament', 'ab € 5.499', 'Alles kombiniert, Team-Schulung', '8–12 Wochen'],
        ],
        [Math.round(W * 0.26), Math.round(W * 0.18), Math.round(W * 0.38), Math.round(W * 0.18)],
        { highlightRow: 2 }
    ),
    ...spacer(1),

    makeHeading('Monatlicher Retainer', HeadingLevel.HEADING_2),
    makeTable(
        ['Tier', 'Preis/Mo', 'Enthält'],
        [
            ['Pflege-Basis', '€ 99 / Mo', 'Bis 3 SOP-Aktualisierungen/Mo, neue MA einpflegen'],
            ['Wachstum ⭐', '€ 179 / Mo', 'Bis 8 Änderungen/Mo, neue Prozesse, Quartals-Review'],
            ['Partner', '€ 299 / Mo', 'Unlimitierte Pflege, proaktive Struktur, monatl. Call'],
        ],
        [Math.round(W * 0.2), Math.round(W * 0.2), Math.round(W * 0.6)],
        { highlightRow: 1 }
    ),
    ...spacer(1),

    makeHeading('Jahresübersicht', HeadingLevel.HEADING_2),
    makeTable(
        ['Paket', 'Setup', 'Retainer', 'Ø Jahreswert'],
        [
            ['SOP-Starter', '€ 1.499', '€ 99/Mo', '€ 2.687'],
            ['Knowledge-Suite ⭐', '€ 2.999', '€ 179/Mo', '€ 5.147'],
            ['Digitales Fundament', 'ab € 5.499', '€ 299/Mo', 'ab € 9.087'],
        ],
        [Math.round(W * 0.3), Math.round(W * 0.2), Math.round(W * 0.2), Math.round(W * 0.3)],
        { highlightRow: 1 }
    ),
    pageBreak()
);

// ── 5. KOMBIPAKETE ───────────────────────────────────────────────────────────
children.push(
    makeHeading('5. Kombipakete & Cross-Selling'),
    makeTable(
        ['Paket', 'Enthält', 'Setup', 'Retainer', 'Ø Jahreswert'],
        [
            ['KFZ Complete', 'Website B + Terminbuchung + Follow-up', '€ 2.099\n(statt €2.398)', '€ 149/Mo', '€ 3.887'],
            ['Betrieb Complete ⭐', 'Website C + 3 Automatisierungen + SOP-Basis', '€ 3.999\n(statt €4.797)', '€ 249/Mo', '€ 6.987'],
            ['Full Digital Partner', 'Betrieb Complete + Wissensdatenbank + Coaching', 'ab € 7.499', '€ 399/Mo', 'ab € 12.287'],
        ],
        [Math.round(W * 0.22), Math.round(W * 0.28), Math.round(W * 0.15), Math.round(W * 0.15), Math.round(W * 0.2)],
        { highlightRow: 1 }
    ),
    ...spacer(1),
    makeText('Kombipakete enthalten ~15% Bundlerabatt – bei gleichzeitig höherer Kundenbindung und höherem Gesamtwert.', { italic: true, color: '666666', size: 20 }),
    ...spacer(2),

    makeHeading('6. Vollübergabe-Modell (Ohne Hosting etc.)'),
    makeText('Für Kunden, die alles in Eigenregie betreiben wollen. Aufschlag auf den regulären Setup-Preis:'),
    makeTable(
        ['Leistung', 'Aufschlag', 'Enthält'],
        [
            ['Website (Vollübergabe)', '+ € 500', 'Quellcode, Deployment-Anleitung, 1h Übergabe-Call'],
            ['Automatisierungen (Vollübergabe)', '+ € 600', 'n8n Export, Doku aller Flows, 2h Schulung'],
            ['Wissensdatenbank (Vollübergabe)', '+ € 400', 'Notion Export/Backup, Pflege-Anleitung, 1h Schulung'],
        ],
        [Math.round(W * 0.3), Math.round(W * 0.2), Math.round(W * 0.5)]
    ),
    ...spacer(1),
    makeText('Gesprächsleitfaden: „Vollübergabe ist möglich – aber wer übernimmt dann Updates und Fehlerbehebung? Unser Retainer kostet weniger als eine Stunde Ihrer Zeit, die Sie sonst mit dem System verbringen."', { italic: true, color: '2E5D8E', size: 20 }),
    pageBreak()
);

// ── 7. STRATEGISCHE HINWEISE ─────────────────────────────────────────────────
children.push(
    makeHeading('7. Strategische Hinweise'),

    makeHeading('Preisverhandlung', HeadingLevel.HEADING_2),
    makeBullet('Niemals unter 80% des Listenpreises gehen – erstes Angebot immer auf Liste.'),
    makeBullet('Bei Preisdruck: nicht Preis senken, sondern Umfang reduzieren.'),
    makeBullet('Ratenzahlung bei Projekten >€1.500 anbieten: 50% Anzahlung, 50% bei Lieferung.'),
    ...spacer(1),

    makeHeading('Skalierungspotenzial (Retainer)', HeadingLevel.HEADING_2),
    makeTable(
        ['Szenario', 'Passives Monatseinkommen'],
        [
            ['10 Website-Retainer (Ø €69)', '≈ €690 / Monat'],
            ['5 Automatisierungs-Retainer (Ø €129)', '≈ €645 / Monat'],
            ['3 Wissensinfrastruktur-Retainer (Ø €179)', '≈ €537 / Monat'],
            ['Gesamt bei 18 Kunden', '≈ €1.872 / Monat passiv'],
        ],
        [Math.round(W * 0.55), Math.round(W * 0.45)]
    ),
    ...spacer(1),

    makeHeading('Typischer Upsell-Pfad', HeadingLevel.HEADING_2),
    makeText('Website Starter → Professional Upgrade (6 Mo) → Terminbuchung-Automatisierung → Follow-up Suite → SOP-Basis → Knowledge-Partner (Retainer-Upgrade).'),
    ...spacer(1),

    makeHeading('Was du NICHT machen solltest', HeadingLevel.HEADING_2),
    makeBullet('Kein Stunden-basiertes Pricing – du verkaufst Ergebnisse, keine Zeit.'),
    makeBullet('Keinen Freundschaftspreis ohne klare Gegenleistung (Referenz, Testimonial, Video).'),
    makeBullet('Keine Projekte ohne schriftlichen Auftrag (einfache E-Mail reicht).'),
    makeBullet('Kein Retainer-Ende ohne Offboarding-Gespräch anbieten.'),
    pageBreak()
);

// ── 8. SCHNELLÜBERSICHT ──────────────────────────────────────────────────────
children.push(
    makeHeading('8. Schnellübersicht (Druckversion)'),

    makeHeading('Website', HeadingLevel.HEADING_2),
    makeTable(
        ['', 'Classic', 'Professional ⭐', 'Signature'],
        [
            ['Setup', '€ 599', '€ 899', '€ 1.299'],
            ['Retainer', '€ 49/Mo', '€ 69/Mo', '€ 89/Mo'],
            ['Ø Jahreswert', '€ 1.187', '€ 1.727', '€ 2.367'],
        ],
        [Math.round(W * 0.22), Math.round(W * 0.26), Math.round(W * 0.26), Math.round(W * 0.26)]
    ),
    ...spacer(1),

    makeHeading('Automatisierungen', HeadingLevel.HEADING_2),
    makeTable(
        ['', 'Starter-Flow', 'Standard ⭐', 'Premium'],
        [
            ['Setup', '€ 799', '€ 1.499', '€ 2.499'],
            ['Retainer', '€ 79/Mo', '€ 129/Mo', '€ 199/Mo'],
            ['Ø Jahreswert', '€ 1.747', '€ 3.047', '€ 4.887'],
        ],
        [Math.round(W * 0.22), Math.round(W * 0.26), Math.round(W * 0.26), Math.round(W * 0.26)]
    ),
    ...spacer(1),

    makeHeading('Wissensinfrastruktur', HeadingLevel.HEADING_2),
    makeTable(
        ['', 'SOP-Starter', 'Knowledge ⭐', 'Fundament'],
        [
            ['Setup', '€ 1.499', '€ 2.999', 'ab € 5.499'],
            ['Retainer', '€ 99/Mo', '€ 179/Mo', '€ 299/Mo'],
            ['Ø Jahreswert', '€ 2.687', '€ 5.147', 'ab € 9.087'],
        ],
        [Math.round(W * 0.22), Math.round(W * 0.26), Math.round(W * 0.26), Math.round(W * 0.26)]
    ),
    ...spacer(1),

    makeHeading('Vollübergabe-Aufschlag', HeadingLevel.HEADING_2),
    makeTable(
        ['Bereich', 'Aufschlag', 'Enthält'],
        [
            ['Website', '+ € 500', 'Code + Anleitung + 1h Call'],
            ['Automatisierungen', '+ € 600', 'n8n Export + Doku + 2h Schulung'],
            ['Wissensdatenbank', '+ € 400', 'Export + Pflege-Anleitung + 1h Call'],
        ],
        [Math.round(W * 0.3), Math.round(W * 0.2), Math.round(W * 0.5)]
    ),
    ...spacer(2),
    makeText('Erstellt: Februar 2026 · Metriq · Interne Strategiedatei · Vertraulich', { italic: true, color: '999999', size: 18 })
);

// ── DOKUMENT ERSTELLEN ───────────────────────────────────────────────────────
const doc = new Document({
    styles: {
        default: { document: { run: { font: 'Arial', size: 22, color: '333333' } } },
        paragraphStyles: [
            {
                id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 32, bold: true, font: 'Arial', color: CLR_HEADER_BG },
                paragraph: { spacing: { before: 480, after: 200 }, outlineLevel: 0 }
            },
            {
                id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 26, bold: true, font: 'Arial', color: '1A1A2E' },
                paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 1 }
            },
            {
                id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 22, bold: true, font: 'Arial', color: '444444' },
                paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 }
            },
        ]
    },
    numbering: {
        config: [{
            reference: 'bullets',
            levels: [{
                level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } }
            }]
        }]
    },
    sections: [{
        properties: {
            page: {
                size: { width: 11906, height: 16838 }, // A4
                margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
            }
        },
        footers: {
            default: new Footer({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                            new TextRun({ text: 'Metriq – Preiskalkulation  |  Seite ', font: 'Arial', size: 18, color: '999999' }),
                            new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 18, color: '999999' }),
                        ]
                    })
                ]
            })
        },
        children
    }]
});

// ── AUSGABE ──────────────────────────────────────────────────────────────────
const outPath = path.join(__dirname, 'docs', 'Metriq_Preiskalkulation.docx');
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(outPath, buffer);
    console.log(`✅ Datei erstellt: ${outPath}`);
}).catch(err => {
    console.error('Fehler:', err);
    process.exit(1);
});
