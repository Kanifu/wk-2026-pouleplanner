import fs from "node:fs/promises";

const sourceUrl =
  "https://www.sbnation.com/soccer/1117513/world-cup-schedule-2026-how-to-watch-every-match-scores-and-more";
const resultsPath = new URL("../actual-results.json", import.meta.url);

const groups = {
  A: ["Mexico", "South Africa", "Korea Republic", "Czechia"],
  B: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["United States", "Paraguay", "Australia", "Turkiye"],
  E: ["Germany", "Curacao", "Cote d'Ivoire", "Ecuador"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Belgium", "Egypt", "IR Iran", "New Zealand"],
  H: ["Spain", "Cabo Verde", "Saudi Arabia", "Uruguay"],
  I: ["France", "Senegal", "Iraq", "Norway"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "Congo DR", "Uzbekistan", "Colombia"],
  L: ["England", "Croatia", "Ghana", "Panama"],
};

const fixturePattern = [
  [0, 1],
  [2, 3],
  [3, 1],
  [0, 2],
  [3, 0],
  [1, 2],
];

const aliases = {
  "Korea Republic": ["Korea Republic", "South Korea"],
  Turkiye: ["Turkiye", "Türkiye", "Turkey"],
  Curacao: ["Curacao", "Curaçao"],
  "Cote d'Ivoire": ["Cote d'Ivoire", "Côte d'Ivoire", "Ivory Coast"],
  "IR Iran": ["IR Iran", "Iran"],
  "Congo DR": ["Congo DR", "DR Congo"],
};

const fixtures = Object.entries(groups).flatMap(([group, teams], groupIndex) =>
  fixturePattern.map(([homeIndex, awayIndex], matchIndex) => ({
    id: String(groupIndex * fixturePattern.length + matchIndex + 1),
    group,
    home: teams[homeIndex],
    away: teams[awayIndex],
  }))
);

const html = await fetch(sourceUrl).then((response) => {
  if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
  return response.text();
});

const lines = html
  .replace(/<[^>]+>/g, "\n")
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&#x27;/g, "'")
  .split(/\n+/)
  .map((line) => line.trim())
  .filter((line) => /^Group [A-L]:/.test(line) && !line.includes(" vs."));

const matches = {};
for (const line of lines) {
  const parsed = parseLine(line);
  if (parsed) matches[parsed.id] = { home: parsed.home, away: parsed.away };
}

const orderedMatches = Object.fromEntries(
  Object.entries(matches).sort(([a], [b]) => Number(a) - Number(b))
);

const results = {
  updatedAt: new Date().toISOString().slice(0, 10),
  sourceUrl,
  sourceNote: "Automatisch bijgewerkt vanuit de SBNation World Cup scorelijst.",
  matches: orderedMatches,
};

await fs.writeFile(resultsPath, `${JSON.stringify(results, null, 2)}\n`);
console.log(`${Object.keys(orderedMatches).length} echte uitslagen bijgewerkt.`);

function parseLine(line) {
  const group = line.match(/^Group ([A-L]):/)?.[1];
  if (!group) return null;
  const scoreText = line.replace(/^Group [A-L]:\s*/, "");
  const groupFixtures = fixtures.filter((fixture) => fixture.group === group);

  for (const fixture of groupFixtures) {
    const direct = parseFixtureScore(scoreText, fixture.home, fixture.away);
    if (direct) return { id: fixture.id, home: direct.home, away: direct.away };

    const reverse = parseFixtureScore(scoreText, fixture.away, fixture.home);
    if (reverse) return { id: fixture.id, home: reverse.away, away: reverse.home };
  }

  return null;
}

function parseFixtureScore(text, home, away) {
  for (const homeAlias of teamAliases(home)) {
    for (const awayAlias of teamAliases(away)) {
      const pattern = new RegExp(`^${escapeRegex(homeAlias)}\\s+(\\d+),?\\s+${escapeRegex(awayAlias)}\\s+(\\d+)$`, "i");
      const match = text.match(pattern);
      if (match) return { home: Number(match[1]), away: Number(match[2]) };
    }
  }
  return null;
}

function teamAliases(team) {
  return aliases[team] ?? [team];
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
