import fs from "node:fs/promises";

const resultsPath = new URL("../actual-results.json", import.meta.url);

const rawResults = await fs.readFile(resultsPath, "utf8");
const results = JSON.parse(rawResults);

const resultEntries = Object.entries(results.matches ?? {});
const invalid = resultEntries.filter(([id, score]) => {
  const matchId = Number(id);
  return matchId < 1 || matchId > 72 || !Number.isInteger(score.home) || !Number.isInteger(score.away);
});

if (invalid.length > 0) {
  console.error("Ongeldige uitslagen:", invalid);
  process.exit(1);
}

console.log(`${resultEntries.length} echte uitslagen gevalideerd (${results.updatedAt}).`);
