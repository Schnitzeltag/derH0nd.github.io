# [DerH0nd]

Eine persönliche Website. Gebaut mit HTML, CSS und JavaScript – ohne Frameworks, ohne Build-Tools, ohne CMS.

---

Ich wollte einfach eine eigene Seite haben. Keinen Blog auf irgendeiner Plattform, kein Substack, kein Medium-Account. Einfach eine Seite, die mir gehört, die ich selbst zusammengebaut habe und die ich jederzeit anfassen kann ohne erst drei Dokumentationen lesen zu müssen.

Das Ergebnis ist DerH0nd. Eine kleine, statische Website auf der ich Texte veröffentliche über Dinge die mich beschäftigen – meistens irgendwas mit Tech, Internetkultur oder dem Web selbst.

## Wie funktioniert das?

Die Seite kommt komplett ohne Backend aus. Artikel werden als `.json`-Dateien im `content/`-Ordner gespeichert, ein paar JavaScript-Funktionen lesen diese beim Aufruf der Seite aus und rendern sie direkt im Browser. Das klingt umständlicher als es ist – in der Praxis bedeutet es, dass ein neuer Artikel einfach eine neue Textdatei ist. Kein Login, kein Editor, kein Deployment-Prozess.

Gehostet wird das ganze auf GitHub Pages. Kostenlos, zuverlässig, und ich muss keinen Server anfassen.

## Projektstruktur

```
├── index.html                    # Startseite
├── content/
│   ├── index.json                # Liste aller Artikel
│   └── posts/                    # Artikel als einzelne JSON-Dateien
│       ├── das-stille-web.json
│       └── webrings.json
├── pages/
│   ├── topics.html               # Artikelübersicht mit Filter
│   ├── article.html              # Template für einzelne Artikel
│   ├── about.html                # Über die Seite
│   ├── links.html                # Linksammlung
│   └── guestbook.html            # Gästebuch
└── assets/
    ├── css/
    │   └── style.css             # Alle Styles, CSS-Variablen
    └── js/
        ├── main.js               # Allgemeine Funktionen
        ├── article-loader.js     # Lädt und rendert einzelne Artikel
        └── topics-loader.js      # Lädt und filtert die Artikelübersicht
```

## Artikel schreiben

Ein Artikel ist eine einfache JSON-Datei unter `content/posts/`. Das Format sieht so aus:

```json
{
  "id": "mein-artikel",
  "title": "Titel des Artikels",
  "date": "2025-01-20",
  "readTime": "5 min",
  "tags": ["Tech", "Internetkultur"],
  "excerpt": "Ein kurzer Teaser der unter dem Titel erscheint.",
  "content": [
    {
      "type": "paragraph",
      "text": "Erster Absatz des Artikels."
    },
    {
      "type": "heading",
      "text": "Eine Zwischenüberschrift"
    },
    {
      "type": "paragraph",
      "text": "Weiterer Text."
    }
  ]
}
```

Danach muss der Artikel noch in `content/index.json` eingetragen werden, damit er in der Übersicht auftaucht.

## Design

Das Design ist bewusst ruhig gehalten. Dunkler Hintergrund, eine serifenlose Schrift für Fließtext, Monospace für Details und Akzente. Die Farbpalette beschränkt sich auf wenige Töne – ein warmes Gold für Links und Highlights, alles andere bleibt in Grautönen.

Keine Animationen die ablenken, keine Elemente die sich bewegen wenn man nicht damit interagiert. Die Seite soll lesbar sein, nicht beeindruckend.

Die CSS-Variablen in `style.css` machen es einfach das Design anzupassen falls sich der Geschmack mal ändert.

## Lokale Entwicklung

Da die Seite JSON-Dateien per Fetch lädt, braucht man einen lokalen Webserver – direkt als Datei im Browser öffnen funktioniert wegen CORS-Einschränkungen nicht.

Der einfachste Weg mit Python:

```bash
python -m http.server 5500
```

Dann ist die Seite unter `http://localhost:5500` erreichbar.

Alternativ funktioniert die Live Server Extension in VS Code genauso gut.

## Deployment

Die Seite liegt auf GitHub Pages. Im Repository-Settings unter Pages einfach den `main`-Branch als Quelle auswählen, fertig. Bei jedem Push ins Repository wird die Seite automatisch aktualisiert.

Eine eigene Domain lässt sich ebenfalls in den GitHub Pages Einstellungen hinterlegen.

## Abhängigkeiten

Keine npm-Pakete. Keine Build-Pipeline. Die einzige externe Abhängigkeit ist Google Fonts für die Schriftarten – wer das nicht möchte, kann die `@import`-Zeile in der CSS rauswerfen und auf System-Fonts zurückfallen.

---

*[DerH0nd] – Teil des stillen Webs.* 🐾
