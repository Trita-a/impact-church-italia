# Guida alla Manutenzione del Sito Impact Church Italia

---

## ✅ MODIFICHE E MIGLIORIE DA EFFETTUATE

### 🔒 Sicurezza
- [x] Aggiunto `rel="noopener noreferrer"` a **tutti i link esterni** con `target="_blank"` (13 pagine)
  - Previene attacchi di tipo "tabnabbing"
  - Migliora la sicurezza degli utenti

### 🔍 SEO e Structured Data
- [x] **Rimosso numero di telefono placeholder** (`+39000000000`) dallo Schema.org in `index.html` e `en/index.html`
  - I dati strutturati ora contengono solo informazioni reali
- [x] **Aggiunto favicon** a tutte le 13 pagine HTML
  ```html
  <link rel="icon" type="image/png" href="assets/images/logo-icon.png">
  <link rel="apple-touch-icon" href="assets/images/logo-icon.png">
  ```
- [x] **Creata immagine OG** (`images/og-image.jpg`) per la condivisione sui social media
  - Dimensioni: 1200x630 pixel (formato ottimale per Facebook/Twitter)

### 🖼️ Ottimizzazione Immagini
- [x] **Scaricata immagine Unsplash localmente** per `chi-siamo.html` e `en/about-us.html`
  - Prima: caricava da `images.unsplash.com` (dipendenza esterna)
  - Dopo: usa `images/chi-siamo-hero.webp` (locale, più veloce)
- [x] **Convertita in formato WebP** per migliori performance

### 📁 Organizzazione Codice
- [x] **Creata cartella `templates/`** con componenti riutilizzabili:
  - `templates/header.html` - Header italiano
  - `templates/footer.html` - Footer italiano
  - `templates/mobile-nav.html` - Menu mobile italiano
  - `templates/preloader.html` - Preloader animato
  - `templates/en/header.html` - Header inglese
  - `templates/en/footer.html` - Footer inglese
  - `templates/en/mobile-nav.html` - Menu mobile inglese

### 📄 File Creati
| File | Descrizione |
|------|-------------|
| `images/chi-siamo-hero.webp` | Immagine hero per pagina Chi Siamo |
| `images/chi-siamo-hero.jpg` | Versione JPG di backup |
| `images/og-image.jpg` | Immagine per social media sharing |
| `templates/*.html` | Template componenti IT |
| `templates/en/*.html` | Template componenti EN |
| `build.py` | Script per sistema template (opzionale) |
| `src/index.html` | File sorgente esempio (opzionale) |
| `GUIDA_MANUTENZIONE.md` | Questo file |

---

## Struttura Attuale

```
Sito chiesa/
├── index.html, chi-siamo.html, partecipa.html, live.html, donazioni.html, privacy.html, 404.html (IT)
├── en/ (versione inglese)
├── css/style.css
├── js/main.js
├── images/
├── assets/images/
└── templates/          ← NUOVI FILE TEMPLATE
    ├── header.html
    ├── footer.html
    ├── mobile-nav.html
    ├── preloader.html
    └── en/
        ├── header.html
        ├── footer.html
        └── mobile-nav.html
```

---

## 🔧 COME MODIFICARE HEADER, FOOTER O MENU MOBILE

### Problema
Il codice di header, footer e menu mobile è ripetuto in **13 pagine HTML**. Se vuoi cambiare qualcosa (es. aggiungere un link, cambiare un'icona), devi farlo 13 volte.

### Soluzione
Ho creato i file template in `templates/`. Modifica quelli e poi copia il contenuto in tutte le pagine.

---

## 📋 PROCEDURA PASSO-PASSO

### 1. Modificare l'Header (Italiano)

**File da modificare:** `templates/header.html`

**Dopo la modifica, copia il contenuto in queste pagine italiane:**
- `index.html`
- `chi-siamo.html`
- `partecipa.html`
- `live.html`
- `donazioni.html`
- `privacy.html`
- `404.html`

**Dove copiare:** Cerca `<!-- HEADER -->` e sostituisci fino a `</header>`

**⚠️ ATTENZIONE ai percorsi:**
- Nelle pagine nella root (`index.html`, ecc.): i link devono essere `chi-siamo.html`, `partecipa.html`
- Nella pagina `404.html`: i link devono essere uguali (è nella root)

---

### 2. Modificare l'Header (Inglese)

**File da modificare:** `templates/en/header.html`

**Copia in queste pagine inglesi:**
- `en/index.html`
- `en/about-us.html`
- `en/get-involved.html`
- `en/live.html`
- `en/giving.html`
- `en/privacy.html`

**⚠️ ATTENZIONE ai percorsi nelle pagine EN:**
- Logo: `href="index.html"` (relativo alla cartella en/)
- Link IT: `href="../index.html"` (torna alla root)
- CSS/JS: `href="../css/style.css"`, `src="../js/main.js"`
- Immagini: `src="../images/..."`

---

### 3. Modificare il Footer

**File Italiano:** `templates/footer.html`
**File Inglese:** `templates/en/footer.html`

**Dove copiare:** Cerca `<!-- FOOTER -->` e sostituisci fino a `</footer>`

**Differenze tra IT e EN:**
- IT: `"Fede · Speranza · Amore"` → EN: `"Faith · Hope · Love"`
- IT: `Dom. 11:00` → EN: `Sun. 11:00`
- IT: `privacy.html` → EN: `privacy.html` (stesso nome)

---

### 4. Modificare il Menu Mobile

**File Italiano:** `templates/mobile-nav.html`
**File Inglese:** `templates/en/mobile-nav.html`

**Dove copiare:** Cerca `<!-- Mobile Navigation Overlay -->` e sostituisci fino a `</nav>` (quello del mobile-nav)

---

## 🔄 CHECKLIST RAPIDA PER MODIFICHE

### Se modifichi l'Header IT:
- [ ] `index.html`
- [ ] `chi-siamo.html`
- [ ] `partecipa.html`
- [ ] `live.html`
- [ ] `donazioni.html`
- [ ] `privacy.html`
- [ ] `404.html`

### Se modifichi l'Header EN:
- [ ] `en/index.html`
- [ ] `en/about-us.html`
- [ ] `en/get-involved.html`
- [ ] `en/live.html`
- [ ] `en/giving.html`
- [ ] `en/privacy.html`

### Se modifichi Footer o Mobile Nav:
Stessa lista di sopra per IT e EN.

---

## 📝 ESEMPIO PRATICO

### Vuoi aggiungere un nuovo link "Blog" nel menu?

**1. Apri `templates/header.html` e aggiungi:**
```html
<a href="blog.html" class="nav-link">Blog</a>
```

**2. Apri `templates/mobile-nav.html` e aggiungi:**
```html
<a href="blog.html" class="mobile-link">
  <span class="link-num">07</span>
  <span class="link-text">Blog</span>
</a>
```

**3. Copia le modifiche in tutte le 7 pagine IT**

**4. Ripeti per la versione EN** (in `templates/en/`) con testo "Blog" e copia in tutte le 6 pagine EN

---

## 🎨 MODIFICHE AL CSS

**File:** `css/style.css`

Il CSS è unico per tutto il sito. Modifica qui e si applica ovunque.

**Sezioni principali:**
- Linee 1-150: Variabili e reset
- Linee 150-400: Header e navigazione
- Linee 400-700: Hero e sezioni
- Linee 700-1000: Cards e componenti
- Linee 1000-1300: Footer
- Linee 1300-1600: Mobile nav
- Linee 1600+: Responsive

---

## ⚙️ MODIFICHE AL JAVASCRIPT

**File:** `js/main.js`

**Funzionalità:**
- Preloader (linee 1-50)
- Menu mobile (linee 50-150)
- Scroll animations (linee 150-300)
- YouTube API per live (linee 300-450)
- Mappa Leaflet (linee 450-550)

---

## 🖼️ IMMAGINI

**Cartelle:**
- `images/` - Foto persone, hero, contenuti
- `assets/images/` - Logo e icone

**Formato consigliato:** WebP per performance migliori

**Per convertire immagini:** Usa `convert_images.py` (già presente)

---

## 🌐 SEO - Cosa Controllare

Ogni pagina deve avere:
- [ ] `<title>` unico
- [ ] `<meta name="description">` unica
- [ ] `<link rel="canonical">` corretto
- [ ] Tag Open Graph (`og:title`, `og:description`, `og:image`)
- [ ] Tag hreflang per IT/EN

---

## 🚀 METTERE ONLINE

1. Avvia il server locale: `python tools/server.py`
2. Oppure usa: `START_SITO_ONLINE.bat` (avvia ngrok)

---

## ❓ DOMANDE FREQUENTI

### Come testo le modifiche?
1. Apri un terminale nella cartella del sito
2. Esegui: `python -m http.server 8000`
3. Apri nel browser: `http://localhost:8000`

### Come faccio backup?
Copia l'intera cartella "Sito chiesa" prima di fare modifiche importanti.



---

## 📞 CONTATTI NEL SITO

**Email attuale:** giuseppejulia@libero.it
**Indirizzo:** Via Gino Bombagli, snc - 06062 Città della Pieve (PG)
**Orari:** Domenica 11:00 - 12:30

Per modificare questi dati, cerca e sostituisci in tutti i file (sono nel footer e nella sezione contatti).

---

## 🐛 PROBLEMI NOTI / DA FARE (OPZIONALE)

### Miglioramenti futuri consigliati:
- [ ] **Spostare stili inline nel CSS** - Alcune sezioni (es. contact form) hanno stili inline
- [ ] **Aggiungere numero di telefono reale** nello Schema.org quando disponibile
- [ ] **Implementare form di contatto funzionante** (attualmente solo HTML, serve backend)
- [ ] **Aggiungere sitemap dinamica** se si aggiungono nuove pagine
- [ ] **Comprimere ulteriormente le immagini** se necessario per mobile

### Note tecniche:
- Il sito è **statico** (solo HTML/CSS/JS), non richiede database
- Le **live YouTube** vengono caricate automaticamente via API
- La **mappa** usa Leaflet (gratuito, open source)
- I **font** sono caricati da Google Fonts

---

*Ultimo aggiornamento: 1 febbraio 2026*
