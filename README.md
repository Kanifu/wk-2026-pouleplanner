# WK 2026 Pouleplanner

Statische webapp voor een WK 2026 voetbalpoule.

## Functies

- Voorspelde uitslagen voor alle groepswedstrijden.
- Aanpasbare voorspellingen per wedstrijd.
- Echte uitslagen naast voorspellingen.
- Automatische poulestanden, beste nummers drie en knock-outfase.
- Verwachte topscorer en live/projectie-topscorer.
- Import van uitslagen, knock-outresultaten en topscorerstanden.

## Gebruik

Open `index.html` in een browser. Er is geen buildstap of server nodig.

De app bevat echte uitslagen in `actual-results.json`, live topscorers in `top-scorers.json` en marktcorrecties in `market-adjustments.json`. Op GitHub Pages haalt de app deze bestanden automatisch op bij laden en daarna periodiek opnieuw.

De uitslagen en topscorers worden ook via GitHub Actions automatisch bijgewerkt. Lokaal kun je de scraper draaien met:

```bash
node scripts/update-results.mjs
```

Voor import kun je regels gebruiken zoals:

```text
Mexico 2-1 South Africa
M73 1-1 5-4p
Kylian Mbappe 3 goals
```
