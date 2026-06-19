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

De app bevat geverifieerde echte uitslagen in `actual-results.json`. Op GitHub Pages kan de knop `Update echte uitslagen` dit bestand opnieuw inladen. Lokaal kun je de dataset valideren met:

```bash
node scripts/update-results.mjs
```

Voor import kun je regels gebruiken zoals:

```text
Mexico 2-1 South Africa
M73 1-1 5-4p
Kylian Mbappe 3 goals
```
