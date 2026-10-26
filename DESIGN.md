---
name: Impact Church Italia
description: Visual design system per il sito web ufficiale di Impact Church Italia a Città della Pieve
colors:
  primary: "#1f2937"
  primary-dark: "#111827"
  primary-light: "#374151"
  accent: "#dba581"
  accent-dark: "#8c5d38"
  accent-light: "#eac4aa"
  accent-text: "#7a5030"
  secondary: "#b6cad3"
  cta: "#1a3a4c"
  warm: "#f4f1eb"
  neutral-bg: "#fafaf9"
  neutral-bg-alt: "#f5f5f4"
  neutral-text: "#1f2937"
  neutral-muted: "#6b7280"
  neutral-border: "#e7e5e4"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  quote:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    fontStyle: "italic"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.md}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.accent-light}"
  button-secondary:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "12px 28px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "32px"
---

# Design System

<!-- impeccable:design-schema 1 -->

## Overview

Il design system di **Impact Church Italia** fonde la solennità e il calore dell'adorazione cristiana con un'estetica editoriale pulita ed elegante. L'identità visiva si basa sull'armonia tra i toni caldi del territorio umbro (terracotta, sabbia, beige dorato), il contrasto profondo dello slate/antracite e la luce eterea delle campiture chiare.

- **Atmosfera:** Calda, accogliente, contemplativa ma vibrante e contemporanea.
- **Principio guida:** Chiarezza relazionale, accessibilità inclusiva e rispetto della parola.

## Colors

La palette cromatica è organizzata secondo ruoli semantici e di contrasto:

- **Primari Scuro (`--color-primary`, `--color-primary-dark`):** `#1f2937` e `#111827`. Utilizzati per la hero cinematografica, il footer, i testi principali e gli elementi ad alto contrasto.
- **Accenti Caldi (`--color-accent`, `--color-accent-text`):** `#dba581` (badge e dettagli decorativi su sfondo scuro) e `#7a5030` (accento per testi su sfondo chiaro conforme a WCAG AA 5.2:1).
- **CTA Secondario (`--color-cta`):** `#1a3a4c`. Blu ardesia profondo per pulsanti di contatto, donazioni e azioni secondarie.
- **Sfondi e Superfici Neutre:** `#fafaf9` (sfondo pagina principale), `#f5f5f4` (sezioni alternate), `#f4f1eb` (sfondo caldo cards), `#ffffff` (cards in rilievo).
- **Testo e Metadati:** `#1f2937` (titoli e testo primario), `#6b7280` (testo secondario/muted), `#9ca3af` (metadati discreti).

## Typography

Il sistema tipografico unisce tre famiglie complementari:

1. **`Playfair Display` (Titoli e Display):** Utilizzato per i titoli di sezione (`h1`, `h2`) e citazioni di impatto. Conferisce dignità, tradizione biblica e grazia editoriale.
2. **`Inter` (Interfaccia e Corpo del testo):** Utilizzato per la lettura continuativa, pulsanti, navigazione e schede. Garantisce massima leggibilità a qualsiasi risoluzione.
3. **`Lora` (Citazioni ed Estratti scritturali):** Utilizzato in corsivo per versetti biblici e testimonianze.

### Scala Tipografica
- **Display:** `clamp(2.25rem, 5vw, 4.5rem)` – Hero titles
- **Heading 1 / 2:** `2rem` / `2.5rem` – Titoli di sezione
- **Heading 3 / 4:** `1.25rem` / `1.5rem` – Card titles e sottosezioni
- **Body:** `1rem` (16px), line-height `1.6`
- **Small / Meta:** `0.875rem` (14px) o `0.75rem` (12px). **Nessun testo funzionale deve scendere sotto gli 11px.**

## Layout

- **Larghezza Contenitore Massimo:** `1200px` (`--container-max`) con padding laterale adattivo (`1.5rem` su desktop, `1rem` su mobile).
- **Griglia:** Sistema modulare CSS Grid (1 colonna su mobile `<768px`, 2 colonne su tablet `768px - 1024px`, 3 o 4 colonne su desktop `>1024px`).
- **Ritmo Verticale:** Spaziatura standard tra sezioni di `5rem` (`80px`) su desktop e `3rem` (`48px`) su mobile.

## Elevation & Depth

L'elevazione è discreta e organica, preferendo sottili ombre volumetriche neutre a effetti pesanti:

- **Bassa Elevazione (`--shadow-sm`):** `0 1px 2px rgba(26, 35, 50, 0.04)` per bottoni a riposo e separatori.
- **Media Elevazione (`--shadow-md`):** `0 4px 12px rgba(26, 35, 50, 0.06), 0 2px 4px rgba(26, 35, 50, 0.04)` per cards evento e leadership.
- **Alta Elevazione (`--shadow-lg`):** `0 12px 24px rgba(26, 35, 50, 0.08)` per hover state di card interattive e modali.
- **Bordi:** Delicati (`1px solid #e7e5e4` o `1px solid rgba(255, 255, 255, 0.1)` su sfondi scuri) per definire i limiti senza appesantire.

## Shapes

- **Arrotondamenti Standard:** `8px` (`--radius-md`) per cards e pannelli; `4px` (`--radius-sm`) per input form; `9999px` (`--radius-full`) per badge di stato e pillole linguistiche.
- **Rapporto di Forma:** Forme rettangolari stabili con angoli ammorbiditi che trasmettono accoglienza e stabilità istituzionale.

## Components

- **Header / Navigation:** Barra sticky semi-trasparente con effetto blur (`backdrop-filter: blur(12px)`), logo a sinistra, menu di navigazione centrale, selettore di lingua a pillola (`IT / EN`) e CTA principale.
- **Hero Section:** Sfondo fotografico scuro con overlay gradiente cinematico, badge dorato della denominazione, titolo serif importante, orari di culto ben visibili e doppio bottone d'azione.
- **Team / Leadership Cards:** Ritratti fotografici proporzionati con cornice discreta, nome in serif, ruolo ministeriale in chiaro e biografia sintetica.
- **Live Stream Widget:** Indicatore di stato dal vivo o ultima registrazione con miniatura 16:9, titolo del messaggio e link diretto a YouTube.
- **Footer:** Tonalità profonda (`#111827`), colonne ordinate con logo, orari di ritrovo, indirizzo con mappa rapida, recapiti e link social attivi.

## Do's and Don'ts

### Do
- Utilizzare `--color-accent-text` (`#7a5030`) quando si scrive testo color accent su fondo chiaro per superare WCAG AA (minimo 4.5:1).
- Mantenere la gerarchia dei titoli rigorosa (`h1` -> `h2` -> `h3` -> `h4`) senza saltare livelli.
- Rispettare la soglia minima di 11px per qualsiasi etichetta testuale o badge interattivo.
- Offrire una transizione fluida e reattiva tra italiano e inglese.

### Don't
- Non utilizzare ombre colorate fluorescenti o zero-offset glow (`dark-glow`) artificiali.
- Non inserire pulsanti o testi inferiori a 44x44px di target touch su dispositivi mobili.
- Non inserire testo bianco (`#ffffff`) o accent chiaro (`#dba581`) direttamente su sfondi crema (`#fafaf9`).
- Non rompere il layout con testi troppo lunghi non gestiti; prevedere ellissi o wrap appropriati.
