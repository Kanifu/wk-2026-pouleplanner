import fs from "node:fs/promises";

const sourceUrl =
  "https://www.sbnation.com/soccer/1117513/world-cup-schedule-2026-how-to-watch-every-match-scores-and-more";
const knockoutSourceUrl =
  "https://www.sbnation.com/soccer/1120771/world-cup-schedule-scores-round-32";
const roundOf16SourceUrl =
  "https://www.sbnation.com/soccer/1121525/2026-world-cup-round-of-16-scores-schedule";
const semifinalBracketSourceUrl =
  "https://www.foxsports.com/stories/soccer/2026-world-cup-bracket-semifinals-final-matchups";
const franceSpainSemifinalSourceUrl =
  "https://www.espn.com/soccer/match/_/gameId/760514/spain-france";
const englandArgentinaSemifinalSourceUrl =
  "https://www.espn.co.uk/football/match/_/gameId/760515";
const scorerSourceUrl =
  "https://www.sbnation.com/fifa-world-cup/1118693/world-cup-2026-golden-boot-standings";
const resultsPath = new URL("../actual-results.json", import.meta.url);
const knockoutPath = new URL("../knockout-results.json", import.meta.url);
const scorersPath = new URL("../top-scorers.json", import.meta.url);

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

const teamNames = [
  ...new Set(Object.values(groups).flat()),
  "South Korea",
  "Türkiye",
  "Turkey",
  "Curaçao",
  "Ivory Coast",
  "Iran",
  "DR Congo",
  "USA",
];

const fixtures = Object.entries(groups).flatMap(([group, teams], groupIndex) =>
  fixturePattern.map(([homeIndex, awayIndex], matchIndex) => ({
    id: String(groupIndex * fixturePattern.length + matchIndex + 1),
    group,
    home: teams[homeIndex],
    away: teams[awayIndex],
  }))
);

const knockoutTemplate = [
  { id: 73, a: "2A", b: "2B" },
  { id: 74, a: "1E", b: "3ABCDF" },
  { id: 75, a: "1F", b: "2C" },
  { id: 76, a: "1C", b: "2F" },
  { id: 77, a: "1I", b: "3CDFGH" },
  { id: 78, a: "2E", b: "2I" },
  { id: 79, a: "1A", b: "3CEFHI" },
  { id: 80, a: "1L", b: "3EHIJK" },
  { id: 81, a: "1D", b: "3BEFIJ" },
  { id: 82, a: "1G", b: "3AEHIJ" },
  { id: 83, a: "2K", b: "2L" },
  { id: 84, a: "1H", b: "2J" },
  { id: 85, a: "1B", b: "3EFGIJ" },
  { id: 86, a: "1J", b: "2H" },
  { id: 87, a: "1K", b: "3DEIJL" },
  { id: 88, a: "2D", b: "2G" },
];

const nextRoundPairs = {
  89: [74, 77],
  90: [73, 75],
  91: [76, 78],
  92: [79, 80],
  93: [81, 82],
  94: [83, 84],
  95: [86, 88],
  96: [85, 87],
  97: [89, 90],
  98: [93, 94],
  99: [91, 92],
  100: [95, 96],
  101: [97, 98],
  102: [99, 100],
  104: [101, 102],
};

const thirdPlacePair = [101, 102];

const confirmedRoundOf32Pairs = [
  { id: "73", a: "South Africa", b: "Canada" },
  { id: "74", a: "Germany", b: "Paraguay" },
  { id: "75", a: "Netherlands", b: "Morocco" },
  { id: "76", a: "Brazil", b: "Japan" },
  { id: "77", a: "France", b: "Sweden" },
  { id: "78", a: "Cote d'Ivoire", b: "Norway" },
  { id: "79", a: "Mexico", b: "Ecuador" },
  { id: "80", a: "England", b: "Congo DR" },
  { id: "81", a: "United States", b: "Bosnia and Herzegovina" },
  { id: "82", a: "Belgium", b: "Senegal" },
  { id: "83", a: "Portugal", b: "Croatia" },
  { id: "84", a: "Spain", b: "Austria" },
  { id: "85", a: "Switzerland", b: "Algeria" },
  { id: "86", a: "Argentina", b: "Cabo Verde" },
  { id: "87", a: "Colombia", b: "Ghana" },
  { id: "88", a: "Australia", b: "Egypt" },
];

const verifiedKnockoutResults = {
  85: { a: "Switzerland", b: "Algeria", home: 2, away: 0 },
};

const confirmedRoundOf16Pairs = [
  { id: "89", a: "Paraguay", b: "France" },
  { id: "90", a: "Canada", b: "Morocco" },
  { id: "91", a: "Brazil", b: "Norway" },
  { id: "92", a: "Mexico", b: "England" },
  { id: "93", a: "United States", b: "Belgium" },
  { id: "94", a: "Portugal", b: "Spain" },
  { id: "95", a: "Argentina", b: "Egypt" },
  { id: "96", a: "Switzerland", b: "Colombia" },
];

const seedKnockoutSourceUrls = [
  knockoutSourceUrl,
  roundOf16SourceUrl,
  semifinalBracketSourceUrl,
  franceSpainSemifinalSourceUrl,
  englandArgentinaSemifinalSourceUrl,
];

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

const knockoutSources = await discoverKnockoutSources(seedKnockoutSourceUrls);
const verifiedKnockoutMatches = {
  ...verifiedKnockoutResults,
};
for (let pass = 0; pass < 4; pass += 1) {
  const knownPairs = buildKnownKnockoutPairs(verifiedKnockoutMatches);
  for (const { html } of knockoutSources.values()) {
    Object.assign(verifiedKnockoutMatches, parseKnockoutResults(html, orderedMatches, knownPairs));
  }
}
await fs.writeFile(
  knockoutPath,
  `${JSON.stringify(
    {
      updatedAt: new Date().toISOString().slice(0, 10),
      sourceUrl: knockoutSourceUrl,
      sourceUrls: [...knockoutSources.keys()],
      sourceNote: "Automatisch bijgewerkt vanuit SBNation knockout-scorepagina's. Nieuwe knockoutrondes worden automatisch ontdekt via gelinkte WK-scorepagina's. Match 85 is gecorrigeerd naar Switzerland 2-0 Algeria omdat de bronregel Austria vermeldt terwijl FIFA/verslaggeving Algeria bevestigt.",
      matches: verifiedKnockoutMatches,
    },
    null,
    2
  )}\n`
);
console.log(`${Object.keys(verifiedKnockoutMatches).length} echte knock-outuitslagen bijgewerkt.`);

const scorerHtml = await fetch(scorerSourceUrl).then((response) => {
  if (!response.ok) throw new Error(`Top scorer fetch failed: ${response.status}`);
  return response.text();
});
const scorers = parseScorers(scorerHtml);
await fs.writeFile(
  scorersPath,
  `${JSON.stringify(
    {
      updatedAt: new Date().toISOString().slice(0, 10),
      sourceUrl: scorerSourceUrl,
      sourceNote: "Automatisch bijgewerkt vanuit de SBNation Golden Boot-stand.",
      scorers,
    },
    null,
    2
  )}\n`
);
console.log(`${scorers.length} topscorers bijgewerkt.`);

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

async function discoverKnockoutSources(seedUrls) {
  const sources = new Map();
  const queue = [...seedUrls];

  while (queue.length && sources.size < 24) {
    const url = queue.shift();
    if (sources.has(url)) continue;
    const html = await fetchOptionalText(url);
    if (!html) continue;
    sources.set(url, { html });
    for (const discoveredUrl of discoverSbnationScoreLinks(html)) {
      if (!sources.has(discoveredUrl) && !queue.includes(discoveredUrl)) queue.push(discoveredUrl);
    }
  }

  return sources;
}

async function fetchOptionalText(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return response.text();
  } catch {
    return null;
  }
}

function discoverSbnationScoreLinks(html) {
  const urls = new Set();
  const matches = html.matchAll(/https:\/\/www\.sbnation\.com\/(?:soccer|fifa-world-cup)\/[a-z0-9/-]+/gi);
  for (const match of matches) {
    const url = match[0].replace(/["'<>)\\]+$/, "");
    const lower = url.toLowerCase();
    const isWorldCup = lower.includes("world-cup");
    const isKnockout = /(round|quarter|semi|final|knockout|scores|schedule|bracket)/.test(lower);
    const isPredictionOnly = /(prediction|odds|picks|betting)/.test(lower);
    if (isWorldCup && isKnockout && !isPredictionOnly) urls.add(url);
  }
  return [...urls];
}

function buildKnownKnockoutPairs(matches) {
  const pairs = [...confirmedRoundOf32Pairs, ...confirmedRoundOf16Pairs];

  Object.entries(nextRoundPairs).forEach(([id, [first, second]]) => {
    const a = winnerTeamFromMatch(matches[first]);
    const b = winnerTeamFromMatch(matches[second]);
    if (a && b) pairs.push({ id, a, b });
  });

  const thirdA = loserTeamFromMatch(matches[thirdPlacePair[0]]);
  const thirdB = loserTeamFromMatch(matches[thirdPlacePair[1]]);
  if (thirdA && thirdB) pairs.push({ id: "103", a: thirdA, b: thirdB });

  return pairs;
}

function winnerTeamFromMatch(match) {
  if (!match) return null;
  if (match.home > match.away) return match.a;
  if (match.away > match.home) return match.b;
  if (Number.isFinite(match.pensHome) && Number.isFinite(match.pensAway)) {
    return match.pensHome >= match.pensAway ? match.a : match.b;
  }
  return null;
}

function loserTeamFromMatch(match) {
  if (!match) return null;
  const winner = winnerTeamFromMatch(match);
  if (!winner) return null;
  return winner === match.a ? match.b : match.a;
}

function parseKnockoutResults(html, groupMatches, confirmedPairs) {
  const bracket = buildRoundOf32Bracket(groupMatches);
  const lines = cleanTextLines(html);
  const matches = {};

  for (const line of lines) {
    const parsed = parseKnockoutScoreLine(line);
    if (!parsed) continue;
    const bracketMatch = bracket.find(
      (match) =>
        (match.a.team === parsed.firstTeam && match.b.team === parsed.secondTeam) ||
        (match.a.team === parsed.secondTeam && match.b.team === parsed.firstTeam)
    ) ?? confirmedPairs.find(
      (match) =>
        (match.a === parsed.firstTeam && match.b === parsed.secondTeam) ||
        (match.a === parsed.secondTeam && match.b === parsed.firstTeam)
    );
    if (!bracketMatch) continue;
    const aTeam = bracketMatch.a.team ?? bracketMatch.a;
    const bTeam = bracketMatch.b.team ?? bracketMatch.b;
    const firstIsA = aTeam === parsed.firstTeam;
    const score = firstIsA
      ? { home: parsed.firstGoals, away: parsed.secondGoals }
      : { home: parsed.secondGoals, away: parsed.firstGoals };
    if (parsed.penaltyWinner) {
      const winnerIsA = aTeam === parsed.penaltyWinner;
      score.pensHome = winnerIsA ? parsed.winnerPens : parsed.loserPens;
      score.pensAway = winnerIsA ? parsed.loserPens : parsed.winnerPens;
    }
    matches[bracketMatch.id] = {
      a: aTeam,
      b: bTeam,
      ...score,
    };
  }

  Object.assign(matches, parseEmbeddedKnockoutScores(html, confirmedPairs));

  return Object.fromEntries(Object.entries(matches).sort(([a], [b]) => Number(a) - Number(b)));
}

function parseEmbeddedKnockoutScores(html, confirmedPairs) {
  const text = cleanTextBlob(html);
  const matches = {};

  for (const pair of confirmedPairs) {
    const directVs = text.match(new RegExp(`\\b${teamPattern(pair.a)}\\s+(\\d+)\\s+vs\\.?\\s+${teamPattern(pair.b)}\\s+(\\d+)\\b`, "i"));
    const reverseVs = text.match(new RegExp(`\\b${teamPattern(pair.b)}\\s+(\\d+)\\s+vs\\.?\\s+${teamPattern(pair.a)}\\s+(\\d+)\\b`, "i"));
    const directDash = text.match(new RegExp(`\\b${teamPattern(pair.a)}\\s+(\\d+)-(\\d+)\\s+${teamPattern(pair.b)}\\b`, "i"));
    const reverseDash = text.match(new RegExp(`\\b${teamPattern(pair.b)}\\s+(\\d+)-(\\d+)\\s+${teamPattern(pair.a)}\\b`, "i"));

    if (directVs) matches[pair.id] = { a: pair.a, b: pair.b, home: Number(directVs[1]), away: Number(directVs[2]) };
    if (reverseVs) matches[pair.id] = { a: pair.a, b: pair.b, home: Number(reverseVs[2]), away: Number(reverseVs[1]) };
    if (directDash) matches[pair.id] = { a: pair.a, b: pair.b, home: Number(directDash[1]), away: Number(directDash[2]) };
    if (reverseDash) matches[pair.id] = { a: pair.a, b: pair.b, home: Number(reverseDash[2]), away: Number(reverseDash[1]) };
  }

  return matches;
}

function cleanTextBlob(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8212;/g, "-")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ");
}

function teamPattern(team) {
  const names = [team, ...(aliases[team] ?? [])].map(escapeRegExp);
  return `(?:${names.join("|")})`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseKnockoutScoreLine(line) {
  const scoreLine =
    line.match(/^(.+?)\s+(\d+),?\s+(.+?)\s+(\d+)(?:\s+\((.+?) wins (\d+)-(\d+) on penalties\))?$/i) ??
    line.match(/^(.+?)\s+(\d+)\s+vs\.?\s+(.+?)\s+(\d+)(?:\s+\((.+?) wins (\d+)-(\d+) on penalties\))?$/i);
  if (scoreLine) {
    return normalizeParsedScore({
      firstTeam: scoreLine[1],
      firstGoals: scoreLine[2],
      secondTeam: scoreLine[3],
      secondGoals: scoreLine[4],
      penaltyWinner: scoreLine[5],
      winnerPens: scoreLine[6],
      loserPens: scoreLine[7],
    });
  }

  const dashedLine = line.match(/^(.+?)\s+(\d+)-(\d+)\s+(.+?)(?:\s+\(.+\))?$/i);
  if (dashedLine) {
    return normalizeParsedScore({
      firstTeam: dashedLine[1],
      firstGoals: dashedLine[2],
      secondTeam: dashedLine[4],
      secondGoals: dashedLine[3],
    });
  }

  return null;
}

function normalizeParsedScore(raw) {
  const firstTeam = normalizeTeam(raw.firstTeam.trim());
  const secondTeam = normalizeTeam(raw.secondTeam.trim());
  if (!teamNames.includes(firstTeam) || !teamNames.includes(secondTeam)) return null;
  return {
    firstTeam,
    firstGoals: Number(raw.firstGoals),
    secondTeam,
    secondGoals: Number(raw.secondGoals),
    penaltyWinner: raw.penaltyWinner ? normalizeTeam(raw.penaltyWinner.trim()) : null,
    winnerPens: raw.winnerPens ? Number(raw.winnerPens) : null,
    loserPens: raw.loserPens ? Number(raw.loserPens) : null,
  };
}

function buildRoundOf32Bracket(groupMatches) {
  const tables = calculateTables(groupMatches);
  const placements = {};
  for (const [group, table] of Object.entries(tables)) {
    placements[`1${group}`] = table[0];
    placements[`2${group}`] = table[1];
    placements[`3${group}`] = table[2];
  }
  const thirds = Object.values(tables)
    .map((table) => table[2])
    .sort(sortTableRows)
    .slice(0, 8);
  const thirdAssignments = assignThirdSlots(thirds);
  return knockoutTemplate
    .map((template) => ({
      id: String(template.id),
      a: resolveSlot(template.a, placements, thirdAssignments),
      b: resolveSlot(template.b, placements, thirdAssignments),
    }))
    .filter((match) => match.a?.team && match.b?.team);
}

function calculateTables(groupMatches) {
  const tables = {};
  for (const [group, teams] of Object.entries(groups)) {
    const rows = Object.fromEntries(teams.map((team) => [team, createTableRow(team, group)]));
    fixtures.filter((fixture) => fixture.group === group).forEach((fixture) => {
      const score = groupMatches[fixture.id];
      if (score) applyResult(rows[fixture.home], rows[fixture.away], score);
    });
    tables[group] = Object.values(rows).sort(sortTableRows).map((row, index) => ({ ...row, rank: index + 1 }));
  }
  return tables;
}

function createTableRow(team, group) {
  return { team, group, played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 };
}

function applyResult(home, away, score) {
  home.played += 1;
  away.played += 1;
  home.gf += score.home;
  home.ga += score.away;
  away.gf += score.away;
  away.ga += score.home;
  home.gd = home.gf - home.ga;
  away.gd = away.gf - away.ga;

  if (score.home > score.away) {
    home.wins += 1;
    away.losses += 1;
    home.points += 3;
  } else if (score.home < score.away) {
    away.wins += 1;
    home.losses += 1;
    away.points += 3;
  } else {
    home.draws += 1;
    away.draws += 1;
    home.points += 1;
    away.points += 1;
  }
}

function sortTableRows(a, b) {
  const strengthA = groups[a.group]?.indexOf(a.team) ?? 99;
  const strengthB = groups[b.group]?.indexOf(b.team) ?? 99;
  return b.points - a.points || b.gd - a.gd || b.gf - a.gf || strengthA - strengthB || a.team.localeCompare(b.team);
}

function assignThirdSlots(thirdPool) {
  const thirdSlots = knockoutTemplate
    .flatMap((template) => [template.a, template.b])
    .filter((slot) => slot.startsWith("3") && slot.length > 2);
  const candidatesBySlot = Object.fromEntries(
    thirdSlots.map((slot) => [slot, thirdPool.filter((row) => slot.slice(1).includes(row.group))])
  );
  const orderedSlots = [...thirdSlots].sort((a, b) => candidatesBySlot[a].length - candidatesBySlot[b].length);
  const assignments = {};
  const usedGroups = new Set();

  function place(index) {
    if (index >= orderedSlots.length) return true;
    const slot = orderedSlots[index];
    for (const candidate of candidatesBySlot[slot]) {
      if (usedGroups.has(candidate.group)) continue;
      assignments[slot] = candidate;
      usedGroups.add(candidate.group);
      if (place(index + 1)) return true;
      usedGroups.delete(candidate.group);
      delete assignments[slot];
    }
    return false;
  }

  place(0);
  return assignments;
}

function resolveSlot(slot, placements, thirdAssignments) {
  if (!slot.startsWith("3") || slot.length === 2) return placements[slot] ?? null;
  return thirdAssignments[slot] ?? null;
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

function parseScorers(html) {
  const tableMatch = html.match(/"rows":(\[\[.*?\]\]),"columns":\["Player"/s);
  if (tableMatch) {
    return JSON.parse(tableMatch[1])
      .map(([player, team, goals, assists, minutes]) => ({
        player: normalizePlayer(player),
        team: normalizeTeam(team),
        goals: Number(goals),
        assists: Number(assists),
        minutes: Number(minutes),
      }))
      .filter((row) => row.goals > 0)
      .sort((a, b) => b.goals - a.goals || b.assists - a.assists || a.minutes - b.minutes || a.player.localeCompare(b.player));
  }

  const textLines = cleanTextLines(html);

  const rows = [];
  for (const line of textLines) {
    const match = line.match(/^(.+?)\s+(\d+)\s+(\d+)\s+(\d+)$/);
    if (!match) continue;
    const leading = match[1];
    const team = findTeamSuffix(leading);
    if (!team) continue;
    const player = leading.slice(0, leading.length - team.source.length).trim();
    if (!player || player === "Player") continue;
    rows.push({
      player: normalizePlayer(player),
      team: normalizeTeam(team.name),
      goals: Number(match[2]),
      assists: Number(match[3]),
      minutes: Number(match[4]),
    });
  }

  return rows
    .filter((row) => row.goals > 0)
    .sort((a, b) => b.goals - a.goals || b.assists - a.assists || a.minutes - b.minutes || a.player.localeCompare(b.player));
}

function cleanTextLines(html) {
  return html
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, "'")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function findTeamSuffix(value) {
  const normalized = value.toLowerCase();
  return teamNames
    .map((name) => ({ source: name, name }))
    .sort((a, b) => b.source.length - a.source.length)
    .find((team) => normalized.endsWith(team.source.toLowerCase()));
}

function normalizePlayer(player) {
  return player
    .replace(/Mbappé/g, "Mbappe")
    .replace(/Dembélé/g, "Dembele")
    .replace(/Leão/g, "Leao")
    .replace(/Muñoz/g, "Munoz")
    .replace(/Díaz/g, "Diaz")
    .replace(/Gyokeres/g, "Gyokeres")
    .replace(/Joāo/g, "Joao")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeTeam(team) {
  const map = {
    "South Korea": "Korea Republic",
    "Türkiye": "Turkiye",
    "Turkey": "Turkiye",
    "Curaçao": "Curacao",
    "Ivory Coast": "Cote d'Ivoire",
    "Iran": "IR Iran",
    "DR Congo": "Congo DR",
    "USA": "United States",
  };
  return map[team] ?? team;
}
