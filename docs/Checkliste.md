# Checkliste

- Ist das Layout auf allen Seiten konsistent und nah genug am Original?
  - Sind unterschiede dokumentiert bzw. kommuniziert?
- Geprüft in Safari, Chrome und Firefox?
- Wie sieht die Seite mobil aus?
- Sind alle Inhalte korrekt übertragen worden?
- Sind alle Bilder korrekt eingebunden und kommen nicht mehr vom alten Server?
- Gehen alle Links?
- Sind alle Formulare funktionsfähig?
- Werden Karten richtig angezeigt?
- Wird das richtige Favicon im Browser angezeigt?
- Hat jede Seite/Unterseite den richtigen Titel und die richtige Beschreibung?
- Wie sieht es aus, wenn man einen Link zur Seite (Startseite/Unterseiten) teilt? (WhatsApp, Twitter, Facebook, etc.)
- Ist die Fehlerseite ansprechend gestaltet?
- Sind alle Seitenpfade noch so wie auf der alten Seite? (Wichtig für vorhandene Links auf anderen Websites)
- Ist die Administration aufgeräumt und übersichtlich?
- Werden "Bearbeiten"-Buttons (für Admin) auf der Seite angezeigt (wenn gewünscht)?
- Google Lighthouse-Score: Wie sieht es mit Performance, Accessibility, Best Practices und SEO aus?
- Ist die Sprache richtig gesetzt? (<html lang="de">)
- Datenschutz: Fonts, Karten, etc. lokal gehostet? (Tile proxy für Karten, etc.)

## Live gehen

- Richtiger SMTP-Account / Empfänger für Formulare?
- Robots.txt anpassen
- `SITE_URL` in `environment=...` anpassen
- DNS-Einträge anpassen (inkl. www.)
- SSL-Zertifikat erstellen