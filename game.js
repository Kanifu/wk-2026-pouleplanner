const SAVE_KEY = "wk-2026-pouleplanner-v1";
const ACTUAL_SAVE_KEY = "wk-2026-echte-uitslagen-v1";
const SCORER_SAVE_KEY = "wk-2026-echte-topscorers-v1";
const KNOCKOUT_SAVE_KEY = "wk-2026-echte-knockout-v1";

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

const teamData = {
  Spain: { strength: 95, title: 16.5, penalties: 46 },
  France: { strength: 95, title: 16.2, penalties: 52 },
  England: { strength: 91, title: 10.5, penalties: 48 },
  Portugal: { strength: 90, title: 9.3, penalties: 64 },
  Argentina: { strength: 91, title: 9.2, penalties: 78 },
  Brazil: { strength: 89, title: 8.1, penalties: 63 },
  Germany: { strength: 86, title: 6.0, penalties: 82 },
  Netherlands: { strength: 84, title: 4.4, penalties: 42 },
  Norway: { strength: 80, title: 2.6 },
  Belgium: { strength: 79, title: 2.2 },
  Colombia: { strength: 78, title: 1.9 },
  Mexico: { strength: 77, title: 1.7, host: true },
  "United States": { strength: 77, title: 1.7, host: true },
  Japan: { strength: 76, title: 1.5 },
  Morocco: { strength: 76, title: 1.5 },
  Uruguay: { strength: 75, title: 1.1 },
  Switzerland: { strength: 75, title: 1.1 },
  Croatia: { strength: 75, title: 0.9 },
  Austria: { strength: 74, title: 0.8 },
  Senegal: { strength: 73, title: 0.7 },
  Sweden: { strength: 73, title: 0.7 },
  Ecuador: { strength: 72, title: 0.6 },
  "Cote d'Ivoire": { strength: 71, title: 0.5 },
  "Korea Republic": { strength: 71, title: 0.5 },
  Paraguay: { strength: 70, title: 0.4 },
  Canada: { strength: 70, title: 0.4, host: true },
  Egypt: { strength: 70, title: 0.4 },
  "IR Iran": { strength: 69, title: 0.3 },
  Tunisia: { strength: 68, title: 0.25 },
  Australia: { strength: 68, title: 0.25 },
  Turkiye: { strength: 72, title: 0.6 },
  Czechia: { strength: 68, title: 0.25 },
  Scotland: { strength: 67, title: 0.2 },
  Ghana: { strength: 67, title: 0.2 },
  Algeria: { strength: 66, title: 0.18 },
  "Saudi Arabia": { strength: 65, title: 0.14 },
  Qatar: { strength: 64, title: 0.12 },
  "Bosnia and Herzegovina": { strength: 64, title: 0.12 },
  "South Africa": { strength: 63, title: 0.1 },
  Uzbekistan: { strength: 62, title: 0.08 },
  Panama: { strength: 61, title: 0.07 },
  "New Zealand": { strength: 59, title: 0.05 },
  Jordan: { strength: 58, title: 0.04 },
  "Cabo Verde": { strength: 58, title: 0.04 },
  "Congo DR": { strength: 60, title: 0.06 },
  Iraq: { strength: 59, title: 0.05 },
  Haiti: { strength: 56, title: 0.03 },
  Curacao: { strength: 55, title: 0.03 },
};

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

const knockoutSchedule = {
  73: { date: "2026-06-28", time: "15:00 ET", venue: "Los Angeles" },
  74: { date: "2026-06-29", time: "16:30 ET", venue: "Boston" },
  75: { date: "2026-06-29", time: "21:00 ET", venue: "Monterrey" },
  76: { date: "2026-06-29", time: "13:00 ET", venue: "Houston" },
  77: { date: "2026-06-30", time: "17:00 ET", venue: "New York/New Jersey" },
  78: { date: "2026-06-30", time: "13:00 ET", venue: "Dallas" },
  79: { date: "2026-06-30", time: "21:00 ET", venue: "Mexico City" },
  80: { date: "2026-07-01", time: "12:00 ET", venue: "Atlanta" },
  81: { date: "2026-07-01", time: "20:00 ET", venue: "San Francisco Bay Area" },
  82: { date: "2026-07-01", time: "16:00 ET", venue: "Seattle" },
  83: { date: "2026-07-02", time: "19:00 ET", venue: "Toronto" },
  84: { date: "2026-07-02", time: "15:00 ET", venue: "Los Angeles" },
  85: { date: "2026-07-02", time: "23:00 ET", venue: "Vancouver" },
  86: { date: "2026-07-03", time: "18:00 ET", venue: "Miami" },
  87: { date: "2026-07-03", time: "21:30 ET", venue: "Kansas City" },
  88: { date: "2026-07-03", time: "14:00 ET", venue: "Dallas" },
  89: { date: "2026-07-04", time: "17:00 ET", venue: "Philadelphia" },
  90: { date: "2026-07-04", time: "13:00 ET", venue: "Houston" },
  91: { date: "2026-07-05", time: "16:00 ET", venue: "New York/New Jersey" },
  92: { date: "2026-07-05", time: "20:00 ET", venue: "Mexico City" },
  93: { date: "2026-07-06", time: "15:00 ET", venue: "Dallas" },
  94: { date: "2026-07-06", time: "20:00 ET", venue: "Seattle" },
  95: { date: "2026-07-07", time: "12:00 ET", venue: "Atlanta" },
  96: { date: "2026-07-07", time: "16:00 ET", venue: "Vancouver" },
  97: { date: "2026-07-09", time: "16:00 ET", venue: "Boston" },
  98: { date: "2026-07-10", time: "15:00 ET", venue: "Los Angeles" },
  99: { date: "2026-07-11", time: "17:00 ET", venue: "Miami" },
  100: { date: "2026-07-11", time: "21:00 ET", venue: "Kansas City" },
  101: { date: "2026-07-14", time: "15:00 ET", venue: "Dallas" },
  102: { date: "2026-07-15", time: "15:00 ET", venue: "Atlanta" },
  104: { date: "2026-07-19", time: "15:00 ET", venue: "New York/New Jersey" },
};

const topScorerContenders = [
  {
    player: "Kylian Mbappe",
    team: "France",
    probability: 16,
    baseGoals: 5.8,
    note: "Favoriet volgens recente Golden Boot-markten; Frankrijk wordt diep verwacht.",
  },
  {
    player: "Harry Kane",
    team: "England",
    probability: 13,
    baseGoals: 5.4,
    note: "Penaltynemer en vaste spits van een favoriet team.",
  },
  {
    player: "Erling Haaland",
    team: "Norway",
    probability: 8,
    baseGoals: 4.8,
    note: "Extreem scorend vermogen, maar afhankelijk van hoe ver Noorwegen komt.",
  },
  {
    player: "Lionel Messi",
    team: "Argentina",
    probability: 7,
    baseGoals: 4.2,
    note: "Veel betrokkenheid bij goals, maar minuten en rol zijn onzeker.",
  },
  {
    player: "Lamine Yamal",
    team: "Spain",
    probability: 6,
    baseGoals: 4.0,
    note: "Sterk team en hoge marktinteresse, maar minder klassieke afmaker.",
  },
  {
    player: "Vinicius Junior",
    team: "Brazil",
    probability: 5,
    baseGoals: 3.8,
    note: "Brazilie heeft scorend potentieel, maar goals kunnen breder verdeeld worden.",
  },
  {
    player: "Cristiano Ronaldo",
    team: "Portugal",
    probability: 5,
    baseGoals: 3.6,
    note: "Nog steeds kandidaat door penalties en Portugal-route.",
  },
  {
    player: "Lautaro Martinez",
    team: "Argentina",
    probability: 4,
    baseGoals: 3.4,
    note: "Kan profiteren als Argentinie ver komt en Messi meer aangever is.",
  },
  {
    player: "Cody Gakpo",
    team: "Netherlands",
    probability: 3,
    baseGoals: 3.2,
    note: "Beste Nederlandse kandidaat; kans groeit als Oranje de kwartfinale haalt.",
  },
  {
    player: "Romelu Lukaku",
    team: "Belgium",
    probability: 3,
    baseGoals: 3.1,
    note: "Doelpuntenprofiel is sterk, maar Belgie heeft een smallere route.",
  },
];

const verifiedTopScorers = [
  { player: "Lionel Messi", team: "Argentina", goals: 5, assists: 0, minutes: 188 },
  { player: "Vinicius Jr.", team: "Brazil", goals: 4, assists: 1, minutes: 294 },
  { player: "Kylian Mbappe", team: "France", goals: 4, assists: 0, minutes: 199 },
  { player: "Erling Haaland", team: "Norway", goals: 4, assists: 0, minutes: 208 },
  { player: "Deniz Undav", team: "Germany", goals: 3, assists: 2, minutes: 69 },
  { player: "Johan Manzambi", team: "Switzerland", goals: 3, assists: 1, minutes: 147 },
  { player: "Matheus Cunha", team: "Brazil", goals: 3, assists: 0, minutes: 191 },
  { player: "Ismael Saibari", team: "Morocco", goals: 3, assists: 0, minutes: 255 },
  { player: "Jonathan David", team: "Canada", goals: 3, assists: 0, minutes: 271 },
  { player: "Crysencio Summerville", team: "Netherlands", goals: 2, assists: 1, minutes: 123 },
  { player: "Mikel Oyarzabal", team: "Spain", goals: 2, assists: 1, minutes: 144 },
  { player: "Ayase Ueda", team: "Japan", goals: 2, assists: 1, minutes: 174 },
  { player: "Maxi Araujo", team: "Uruguay", goals: 2, assists: 1, minutes: 174 },
  { player: "Cody Gakpo", team: "Netherlands", goals: 2, assists: 1, minutes: 182 },
  { player: "Ruben Vargas", team: "Switzerland", goals: 2, assists: 1, minutes: 194 },
];

let marketAdjustments = {
  Germany: 4,
  Netherlands: 3,
  Portugal: 3,
  Colombia: 2.5,
  Brazil: 2,
  Argentina: 1.5,
  France: 1,
  Spain: 1,
  "United States": 1,
  "Cote d'Ivoire": 1,
  Ecuador: -1.5,
  Curacao: -2,
  Tunisia: -2,
  Qatar: -2,
};

const rounds = [
  { name: "Ronde van 32", ids: knockoutTemplate.map((match) => match.id) },
  { name: "Achtste finales", ids: [89, 90, 91, 92, 93, 94, 95, 96] },
  { name: "Kwartfinales", ids: [97, 98, 99, 100] },
  { name: "Halve finales", ids: [101, 102] },
  { name: "Finale", ids: [104] },
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

const fixturePattern = [
  [0, 1],
  [2, 3],
  [3, 1],
  [0, 2],
  [3, 0],
  [1, 2],
];

const fixtureDates = {
  A: ["2026-06-11", "2026-06-11", "2026-06-18", "2026-06-18", "2026-06-24", "2026-06-24"],
  B: ["2026-06-12", "2026-06-13", "2026-06-18", "2026-06-18", "2026-06-24", "2026-06-24"],
  C: ["2026-06-13", "2026-06-13", "2026-06-19", "2026-06-19", "2026-06-24", "2026-06-24"],
  D: ["2026-06-12", "2026-06-14", "2026-06-19", "2026-06-19", "2026-06-25", "2026-06-25"],
  E: ["2026-06-14", "2026-06-14", "2026-06-20", "2026-06-20", "2026-06-25", "2026-06-25"],
  F: ["2026-06-14", "2026-06-14", "2026-06-21", "2026-06-20", "2026-06-25", "2026-06-25"],
  G: ["2026-06-15", "2026-06-15", "2026-06-21", "2026-06-21", "2026-06-26", "2026-06-26"],
  H: ["2026-06-15", "2026-06-15", "2026-06-21", "2026-06-21", "2026-06-26", "2026-06-26"],
  I: ["2026-06-16", "2026-06-16", "2026-06-22", "2026-06-22", "2026-06-26", "2026-06-26"],
  J: ["2026-06-16", "2026-06-16", "2026-06-22", "2026-06-22", "2026-06-27", "2026-06-27"],
  K: ["2026-06-17", "2026-06-17", "2026-06-23", "2026-06-23", "2026-06-27", "2026-06-27"],
  L: ["2026-06-17", "2026-06-17", "2026-06-23", "2026-06-23", "2026-06-27", "2026-06-27"],
};

const verifiedActualScores = {
  1: { home: 2, away: 0 },
  2: { home: 2, away: 1 },
  3: { home: 1, away: 1 },
  4: { home: 1, away: 0 },
  5: { home: 0, away: 3 },
  6: { home: 1, away: 0 },
  7: { home: 1, away: 1 },
  8: { home: 1, away: 1 },
  9: { home: 4, away: 1 },
  10: { home: 6, away: 0 },
  11: { home: 2, away: 1 },
  12: { home: 3, away: 1 },
  13: { home: 1, away: 1 },
  14: { home: 0, away: 1 },
  15: { home: 0, away: 1 },
  16: { home: 3, away: 0 },
  17: { home: 0, away: 3 },
  18: { home: 4, away: 2 },
  19: { home: 4, away: 1 },
  20: { home: 2, away: 0 },
  21: { home: 0, away: 1 },
  22: { home: 2, away: 0 },
  25: { home: 7, away: 1 },
  26: { home: 1, away: 0 },
  27: { home: 0, away: 0 },
  28: { home: 2, away: 1 },
  31: { home: 2, away: 2 },
  32: { home: 5, away: 1 },
  33: { home: 0, away: 4 },
  34: { home: 5, away: 1 },
  37: { home: 1, away: 1 },
  38: { home: 2, away: 2 },
  39: { home: 1, away: 3 },
  40: { home: 0, away: 0 },
  43: { home: 0, away: 0 },
  44: { home: 1, away: 1 },
  45: { home: 2, away: 2 },
  46: { home: 4, away: 0 },
  49: { home: 3, away: 1 },
  50: { home: 1, away: 4 },
  51: { home: 3, away: 2 },
  52: { home: 3, away: 0 },
  55: { home: 3, away: 0 },
  56: { home: 3, away: 1 },
  57: { home: 1, away: 2 },
  58: { home: 2, away: 0 },
  61: { home: 1, away: 1 },
  62: { home: 1, away: 3 },
  63: { home: 1, away: 0 },
  64: { home: 5, away: 0 },
  67: { home: 4, away: 2 },
  68: { home: 1, away: 0 },
  69: { home: 0, away: 1 },
  70: { home: 0, away: 0 },
};

const fixtures = Object.entries(groups).flatMap(([group, teams], groupIndex) =>
  fixturePattern.map(([homeIndex, awayIndex], matchIndex) => {
    const id = groupIndex * fixturePattern.length + matchIndex + 1;
    return {
      id,
      date: fixtureDates[group][matchIndex],
      group,
      round: matchIndex < 2 ? 1 : matchIndex < 4 ? 2 : 3,
      home: teams[homeIndex],
      away: teams[awayIndex],
    };
  })
);

let actualScores = { ...verifiedActualScores, ...loadActualScores() };
let actualScorers = loadScorerGoals();
let liveTopScorers = [...verifiedTopScorers];
let defaultScores = computeDefaultScores();
let scores = { ...defaultScores, ...loadScores() };
let actualKnockoutScores = loadKnockoutScores();

const matchesView = document.querySelector("#matchesView");
const daysView = document.querySelector("#daysView");
const tablesView = document.querySelector("#tablesView");
const thirdsView = document.querySelector("#thirdsView");
const knockoutView = document.querySelector("#knockoutView");
const scorersView = document.querySelector("#scorersView");
const resetScoresButton = document.querySelector("#resetScores");
const copySummaryButton = document.querySelector("#copySummary");
const importResultsButton = document.querySelector("#importResults");
const updateActualResultsButton = document.querySelector("#updateActualResults");

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("is-active"));
    document.querySelector(`#${button.dataset.view}View`).classList.add("is-active");
  });
});

resetScoresButton.addEventListener("click", () => {
  refreshPredictedScores();
  saveScores();
  render();
});

importResultsButton.addEventListener("click", () => {
  const box = document.querySelector("#importBox");
  box?.classList.toggle("is-open");
});

updateActualResultsButton.addEventListener("click", async () => {
  const [resultsLoaded, scorersLoaded] = await Promise.all([updateActualResultsFromFile(), updateTopScorersFromFile()]);
  updateActualResultsButton.textContent = resultsLoaded || scorersLoaded ? "Live data bijgewerkt" : "Geen updatebestand";
  window.setTimeout(() => {
    updateActualResultsButton.textContent = "Update live data";
  }, 1600);
});

copySummaryButton.addEventListener("click", async () => {
  const summary = createSummary();
  await navigator.clipboard.writeText(summary);
  copySummaryButton.textContent = "Gekopieerd";
  window.setTimeout(() => {
    copySummaryButton.textContent = "Kopieer overzicht";
  }, 1400);
});

render();
updateActualResultsFromFile();
updateTopScorersFromFile();
updateMarketAdjustmentsFromFile();
window.setInterval(updateActualResultsFromFile, 15 * 60 * 1000);
window.setInterval(updateTopScorersFromFile, 15 * 60 * 1000);
window.setInterval(updateMarketAdjustmentsFromFile, 60 * 60 * 1000);

function loadScores() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function saveScores() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(scores));
}

function computeDefaultScores() {
  return Object.fromEntries(fixtures.map((match) => [match.id, predictScore(match.home, match.away)]));
}

function refreshPredictedScores() {
  defaultScores = computeDefaultScores();
  scores = structuredClone(defaultScores);
}

function loadActualScores() {
  try {
    const raw = localStorage.getItem(ACTUAL_SAVE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function saveActualScores() {
  localStorage.setItem(ACTUAL_SAVE_KEY, JSON.stringify(actualScores));
}

async function updateActualResultsFromFile() {
  try {
    const response = await fetch("actual-results.json", { cache: "no-store" });
    if (!response.ok) return false;
    const data = await response.json();
    if (!data || typeof data !== "object" || !data.matches) return false;
    actualScores = { ...actualScores, ...normalizeImportedScores(data.matches) };
    refreshPredictedScores();
    saveActualScores();
    render();
    return true;
  } catch {
    return false;
  }
}

async function updateTopScorersFromFile() {
  try {
    const response = await fetch("top-scorers.json", { cache: "no-store" });
    if (!response.ok) return false;
    const data = await response.json();
    if (!data || typeof data !== "object" || !Array.isArray(data.scorers)) return false;
    liveTopScorers = data.scorers
      .map((scorer) => ({
        player: String(scorer.player),
        team: String(scorer.team),
        goals: Number(scorer.goals),
        assists: Number(scorer.assists ?? 0),
        minutes: Number(scorer.minutes ?? 0),
      }))
      .filter((scorer) => scorer.player && scorer.team && Number.isFinite(scorer.goals))
      .sort(sortLiveScorers);
    refreshPredictedScores();
    render();
    return true;
  } catch {
    return false;
  }
}

async function updateMarketAdjustmentsFromFile() {
  try {
    const response = await fetch("market-adjustments.json", { cache: "no-store" });
    if (!response.ok) return false;
    const data = await response.json();
    if (!data || typeof data !== "object" || !data.teams) return false;
    marketAdjustments = { ...marketAdjustments, ...data.teams };
    refreshPredictedScores();
    render();
    return true;
  } catch {
    return false;
  }
}

function normalizeImportedScores(matches) {
  return Object.fromEntries(
    Object.entries(matches)
      .map(([id, score]) => [id, { home: Number(score.home), away: Number(score.away) }])
      .filter(([, score]) => Number.isFinite(score.home) && Number.isFinite(score.away))
  );
}

function loadScorerGoals() {
  try {
    const raw = localStorage.getItem(SCORER_SAVE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function saveScorerGoals() {
  localStorage.setItem(SCORER_SAVE_KEY, JSON.stringify(actualScorers));
}

function loadKnockoutScores() {
  try {
    const raw = localStorage.getItem(KNOCKOUT_SAVE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function saveKnockoutScores() {
  localStorage.setItem(KNOCKOUT_SAVE_KEY, JSON.stringify(actualKnockoutScores));
}

function predictScore(home, away) {
  const homeData = teamData[home];
  const awayData = teamData[away];
  const homeStrength = teamStrength(home);
  const awayStrength = teamStrength(away);
  const gap = homeStrength - awayStrength;
  const base = 1.32;
  const homeGoals = clamp(base + gap / 32 + homeData.title / 44 + attackAdjustment(home) - defensiveDrag(away), 0.25, 4.1);
  const awayGoals = clamp(base - gap / 34 + awayData.title / 48 + attackAdjustment(away) - defensiveDrag(home), 0.22, 3.9);
  let best = { home: 0, away: 0, probability: -1 };

  for (let homeScore = 0; homeScore <= 5; homeScore += 1) {
    for (let awayScore = 0; awayScore <= 5; awayScore += 1) {
      const totalGoals = homeScore + awayScore;
      const drawBoost = homeScore === awayScore ? 1.32 : 1;
      const favoriteBoost = Math.abs(gap) > 14 && Math.sign(gap) === Math.sign(homeScore - awayScore) ? 1.08 : 1;
      const tempoBoost = totalGoals >= 3 ? 1.12 : 1;
      const probability = poisson(homeScore, homeGoals) * poisson(awayScore, awayGoals) * drawBoost * favoriteBoost * tempoBoost;
      if (probability > best.probability) {
        best = { home: homeScore, away: awayScore, probability };
      }
    }
  }

  return { home: best.home, away: best.away };
}

function attackAdjustment(team) {
  const stats = teamTournamentStats(team);
  const topScorerGoals = liveTopScorers
    .filter((scorer) => scorer.team === team)
    .slice(0, 3)
    .reduce((total, scorer) => total + scorer.goals, 0);
  const goalForm = stats.played > 0 ? (stats.goalsFor / stats.played - 1.35) * 0.22 : 0;
  const scorerForm = clamp(topScorerGoals * 0.045, 0, 0.42);
  return clamp(goalForm + scorerForm, -0.25, 0.55);
}

function defensiveDrag(team) {
  const stats = teamTournamentStats(team);
  if (stats.played === 0) return 0;
  return clamp((1.25 - stats.goalsAgainst / stats.played) * 0.16, -0.22, 0.22);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function poisson(goals, expectedGoals) {
  return (Math.exp(-expectedGoals) * expectedGoals ** goals) / factorial(goals);
}

function factorial(value) {
  let result = 1;
  for (let index = 2; index <= value; index += 1) result *= index;
  return result;
}

function winProbability(home, away) {
  const gap = teamStrength(home) - teamStrength(away);
  const homeWin = 1 / (1 + Math.exp(-gap / 10));
  const draw = clamp(0.28 - Math.abs(gap) / 120, 0.12, 0.28);
  const adjustedHome = homeWin * (1 - draw);
  const adjustedAway = (1 - homeWin) * (1 - draw);
  return { home: adjustedHome, draw, away: adjustedAway };
}

function teamStrength(team) {
  const data = teamData[team];
  return data.strength + (data.host ? 3 : 0) + tournamentAdjustment(team) + (marketAdjustments[team] ?? 0);
}

function tournamentAdjustment(team) {
  const stats = teamTournamentStats(team);
  if (stats.played === 0) return 0;
  const pointsPerGame = stats.points / stats.played;
  const form = (pointsPerGame - 1.2) * 2.4;
  const goalForm = clamp(stats.goalDiff * 0.45, -4, 4);
  return clamp(form + goalForm, -7, 7);
}

function teamTournamentStats(team) {
  return fixtures.reduce(
    (stats, match) => {
      const score = actualScores[match.id];
      if (!score || !Number.isFinite(score.home) || !Number.isFinite(score.away)) return stats;
      if (match.home !== team && match.away !== team) return stats;
      const isHome = match.home === team;
      const goalsFor = isHome ? score.home : score.away;
      const goalsAgainst = isHome ? score.away : score.home;
      stats.played += 1;
      stats.goalsFor += goalsFor;
      stats.goalsAgainst += goalsAgainst;
      stats.goalDiff += goalsFor - goalsAgainst;
      if (goalsFor > goalsAgainst) stats.points += 3;
      else if (goalsFor === goalsAgainst) stats.points += 1;
      return stats;
    },
    { played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0 }
  );
}

function render() {
  renderMatches();
  renderDays();
  const predictedTables = calculateTables("predicted");
  const actualTables = calculateTables("actual");
  renderTables(predictedTables, actualTables, actualTables);
  const predictedThirds = rankThirds(predictedTables);
  const actualThirds = rankThirds(actualTables);
  renderThirds(predictedThirds, actualThirds);
  const predictedKnockout = buildKnockout(predictedTables, predictedThirds);
  const actualKnockout = buildCertainKnockout(actualTables);
  renderKnockout(predictedKnockout, actualKnockout);
  renderScorers(predictedKnockout, actualKnockout);
}

function renderMatches() {
  matchesView.innerHTML = `
    ${renderImportBox()}
    <div class="section-grid">${Object.keys(groups).map(renderGroupMatches).join("")}</div>
  `;
  bindImportBox();
  bindScoreInputs(matchesView);
}

function bindScoreInputs(root) {
  root.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const { id, side, scoreType } = event.target.dataset;
      const value = Number.parseInt(event.target.value, 10);
      if (scoreType === "actual") {
        if (!actualScores[id]) actualScores[id] = { home: null, away: null };
        actualScores[id][side] = Number.isFinite(value) && value >= 0 ? value : null;
        if (actualScores[id].home === null && actualScores[id].away === null) delete actualScores[id];
        saveActualScores();
      } else {
        scores[id][side] = Number.isFinite(value) && value >= 0 ? value : 0;
        saveScores();
      }
      render();
    });
  });
}

function renderDays() {
  const matchesByDate = fixtures.reduce((days, match) => {
    if (!days[match.date]) days[match.date] = [];
    days[match.date].push(match);
    return days;
  }, {});
  const orderedDates = Object.keys(matchesByDate).sort();
  daysView.innerHTML = `
    <div class="note">Dagoverzicht van alle groepswedstrijden. Alleen teams en voorspelling; details, echte uitslagen en statistieken staan bij Wedstrijden en Poulestanden.</div>
    <div class="section-grid">
      ${orderedDates.map((date) => renderDayCard(date, matchesByDate[date])).join("")}
    </div>
  `;
  bindScoreInputs(daysView);
}

function renderDayCard(date, dayMatches) {
  const dayGroups = [...new Set(dayMatches.map((match) => `Groep ${match.group}`))].join(" / ");
  return `
    <article class="day-card">
      <div class="group-head">
        <div>
          <h2>${formatLongDate(date)}</h2>
          <span class="day-summary">${dayMatches.length} wedstrijden</span>
        </div>
        <span>${dayGroups}</span>
      </div>
      <div class="match-list">
        ${dayMatches.map(renderDayMatchRow).join("")}
      </div>
    </article>
  `;
}

function renderDayMatchRow(match) {
  const predicted = scores[match.id];
  return `
    <div class="day-match-row">
      <div>
        <span class="team-name">${match.home}</span>
        <span class="team-meta">Groep ${match.group} · Match ${match.id}</span>
      </div>
      <div class="day-score-block">
        <span>Voorspeld</span>
        <strong>${predicted.home}-${predicted.away}</strong>
      </div>
      <div>
        <span class="team-name">${match.away}</span>
        <span class="team-meta">Speeldag ${formatDate(match.date)}</span>
      </div>
    </div>
  `;
}

function renderImportBox() {
  return `
    <section id="importBox" class="import-box" aria-label="Importeer echte uitslagen">
      <h2>Importeer echte uitslagen</h2>
      <p class="team-meta">Plak per regel bijvoorbeeld: Mexico 2-1 South Africa. Voor knock-out: M73 1-1 5-4p. Voor topscorers: Kylian Mbappe 3 goals. Zonder API-sleutel is dit betrouwbaarder dan scrapen, en je houdt controle over correcties.</p>
      <textarea id="importText" placeholder="Mexico 2-1 South Africa&#10;Korea Republic 1-0 Czechia&#10;M73 1-1 5-4p&#10;Kylian Mbappe 3 goals"></textarea>
      <div class="import-actions">
        <button id="applyImport" class="primary-button" type="button">Verwerk import</button>
        <button id="clearActuals" class="ghost-button" type="button">Herstel geverifieerde uitslagen</button>
      </div>
    </section>
  `;
}

function bindImportBox() {
  document.querySelector("#applyImport")?.addEventListener("click", () => {
    const text = document.querySelector("#importText")?.value ?? "";
    importActualData(text);
    saveActualScores();
    saveScorerGoals();
    saveKnockoutScores();
    render();
  });

  document.querySelector("#clearActuals")?.addEventListener("click", () => {
    actualScores = { ...verifiedActualScores };
    actualScorers = {};
    actualKnockoutScores = {};
    saveActualScores();
    saveScorerGoals();
    saveKnockoutScores();
    render();
  });
}

function renderGroupMatches(group) {
  const groupMatches = fixtures.filter((match) => match.group === group);
  return `
    <article class="group-card">
      <div class="group-head">
        <h2>Groep ${group}</h2>
        <span>${groups[group].join(" / ")}</span>
      </div>
      <div class="match-list">
        ${groupMatches.map(renderMatchRow).join("")}
      </div>
    </article>
  `;
}

function renderMatchRow(match, options = {}) {
  const showDate = options.showDate ?? true;
  const score = scores[match.id];
  const actual = actualScores[match.id] ?? { home: "", away: "" };
  const prob = winProbability(match.home, match.away);
  return `
    <div class="match-row">
      <div class="match-date">
        <span class="team-name">${showDate ? formatDate(match.date) : `Match ${match.id}`}</span>
        <span class="team-meta">Groep ${match.group}</span>
        ${options.extraStatus ? `<span class="day-status ${hasActualScore(match.id) ? "is-played" : ""}">${options.extraStatus}</span>` : ""}
      </div>
      <div class="team">
        <span class="team-name">${match.home}</span>
        <span class="team-meta">Modelrating ${teamData[match.home].strength}</span>
      </div>
      <div class="score-pair">
        <span>Voorspeld</span>
        <input class="score-input" type="number" min="0" max="15" inputmode="numeric" value="${score.home}" data-score-type="predicted" data-id="${match.id}" data-side="home" aria-label="Voorspelling ${match.home} goals">
        <input class="score-input" type="number" min="0" max="15" inputmode="numeric" value="${score.away}" data-score-type="predicted" data-id="${match.id}" data-side="away" aria-label="Voorspelling ${match.away} goals">
      </div>
      <div class="score-pair">
        <span>Echt</span>
        <input class="score-input actual-input" type="number" min="0" max="15" inputmode="numeric" value="${actual.home ?? ""}" data-score-type="actual" data-id="${match.id}" data-side="home" aria-label="Echte uitslag ${match.home} goals">
        <input class="score-input actual-input" type="number" min="0" max="15" inputmode="numeric" value="${actual.away ?? ""}" data-score-type="actual" data-id="${match.id}" data-side="away" aria-label="Echte uitslag ${match.away} goals">
      </div>
      <div class="team">
        <span class="team-name">${match.away}</span>
        <span class="team-meta">Modelrating ${teamData[match.away].strength}</span>
      </div>
      <div class="prediction">
        <span class="probability">1 ${pct(prob.home)} / X ${pct(prob.draw)} / 2 ${pct(prob.away)}</span>
        Match ${match.id} · speelronde ${match.round}
      </div>
    </div>
  `;
}

function calculateTables(mode = "predicted") {
  const tables = {};
  for (const [group, teams] of Object.entries(groups)) {
    const rows = Object.fromEntries(teams.map((team) => [team, createTableRow(team, group)]));
    fixtures.filter((match) => match.group === group).forEach((match) => {
      const score = scoreForMatch(match.id, mode);
      if (score) applyResult(rows[match.home], rows[match.away], score);
    });
    tables[group] = Object.values(rows).sort(sortTableRows).map((row, index) => ({ ...row, rank: index + 1 }));
  }
  return tables;
}

function scoreForMatch(id, mode) {
  const actual = actualScores[id];
  const hasActual = hasActualScore(id);
  if (mode === "actual") return hasActual ? actual : null;
  if (mode === "live") return hasActual ? actual : scores[id];
  return scores[id];
}

function hasActualScore(id) {
  const actual = actualScores[id];
  return Boolean(actual && Number.isFinite(actual.home) && Number.isFinite(actual.away));
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
  return b.points - a.points || b.gd - a.gd || b.gf - a.gf || teamStrength(b.team) - teamStrength(a.team) || a.team.localeCompare(b.team);
}

function rankThirds(tables) {
  return Object.values(tables)
    .map((table) => table[2])
    .sort(sortTableRows)
    .map((row, index) => ({ ...row, thirdRank: index + 1, qualified: index < 8 }));
}

function renderTables(predictedTables, actualTables, playedTables) {
  tablesView.innerHTML = `
    <div class="note">Links staat de voorspelling met het actuele model. Rechts staat alleen de werkelijke stand op basis van gespeelde wedstrijden; er worden geen resterende duels geprojecteerd.</div>
    <div class="section-grid">${Object.keys(groups).map((group) => renderTable(group, predictedTables[group], actualTables[group], playedTables[group])).join("")}</div>
  `;
}

function renderTable(group, predictedTable, liveTable, playedTable) {
  return `
    <article class="group-card">
      <div class="group-head"><h2>Groep ${group}</h2><span>Top 2 gaat zeker door</span></div>
      <div class="dual-table">
        <div class="table-panel">
          <div class="table-title">Voorspeld</div>
          <div class="table">${tableHeader()}${predictedTable.map((row) => tableRow(row, row.rank <= 2)).join("")}</div>
        </div>
        <div class="table-panel">
          <div class="table-title">Werkelijke stand</div>
          <div class="table">${tableHeader()}${liveTable.map((row) => tableRow(row, row.rank <= 2)).join("")}</div>
          <div class="table-title">Alleen echt gespeeld: ${playedTable.reduce((sum, row) => sum + row.played, 0) / 2} duels</div>
        </div>
      </div>
    </article>
  `;
}

function tableHeader() {
  return `
    <div class="table-row is-header">
      <span>#</span><span>Team</span><span class="number">P</span><span class="number">PT</span>
      <span class="number">GD</span><span class="number">V</span><span class="number hide-mobile">T</span><span class="number hide-mobile">W</span>
    </div>
  `;
}

function tableRow(row, qualified) {
  return `
    <div class="table-row ${qualified ? "is-qualified" : ""}">
      <span class="rank">${row.rank}</span><span class="team-name">${row.team}</span>
      <span class="number">${row.played}</span><span class="number">${row.points}</span>
      <span class="number">${formatGd(row.gd)}</span><span class="number">${row.gf}</span>
      <span class="number hide-mobile">${row.ga}</span><span class="number hide-mobile">${row.wins}</span>
    </div>
  `;
}

function renderThirds(predictedThirds, liveThirds) {
  thirdsView.innerHTML = `
    <div class="note">De beste acht nummers drie gaan door. Bij gelijke stand gebruikt deze tool punten, doelsaldo, gemaakte goals en daarna teamsterkte als praktische tiebreaker.</div>
    <div class="comparison-grid">
      <section class="comparison-column">
        <h2>Voorspelde nummers drie</h2>
        <article class="third-card">${thirdHeader()}${predictedThirds.map((row) => thirdRow(row)).join("")}</article>
      </section>
      <section class="comparison-column">
        <h2>Werkelijke nummers drie</h2>
        <article class="third-card">${thirdHeader()}${liveThirds.map((row) => thirdRow(row)).join("")}</article>
      </section>
    </div>
  `;
}

function thirdHeader() {
  return `
    <div class="third-row is-header">
      <span>#</span><span>Team</span><span class="number">Grp</span><span class="number">PT</span>
      <span class="number">GD</span><span class="number">V</span><span class="number hide-mobile">T</span><span class="number hide-mobile">Door</span>
    </div>
  `;
}

function thirdRow(row) {
  return `
    <div class="third-row ${row.qualified ? "is-qualified" : ""}">
      <span class="rank">${row.thirdRank}</span><span class="team-name">${row.team}</span>
      <span class="number">${row.group}</span><span class="number">${row.points}</span>
      <span class="number">${formatGd(row.gd)}</span><span class="number">${row.gf}</span>
      <span class="number hide-mobile">${row.ga}</span><span class="number hide-mobile">${row.qualified ? "Ja" : "Nee"}</span>
    </div>
  `;
}

function renderKnockout(predictedKnockout, liveKnockout) {
  knockoutView.innerHTML = `
    <div class="note">Links staat de modelvoorspelling. Rechts staan alleen zekere teams of positie-labels zoals 1D en 2G. Pas wanneer beide teams zeker zijn, vult de app een voorspelling in.</div>
    <div class="comparison-grid">
      <section class="comparison-column">
        <h2>Voorspelde knock-out</h2>
        <div class="knockout-grid">${rounds.map((round) => renderRound(round, predictedKnockout)).join("")}</div>
      </section>
      <section class="comparison-column">
        <h2>Zekere knock-out</h2>
        <div class="knockout-grid">${renderScheduledKnockoutList(liveKnockout)}</div>
      </section>
    </div>
  `;
}

function renderScorers(predictedKnockout, liveKnockout) {
  const predicted = rankScorers(predictedKnockout);
  const live = rankLiveScorers(liveKnockout);
  scorersView.innerHTML = `
    <div class="note">Voorspeld gebruikt markt-kans, toernooivorm en route. Werkelijk is de live Golden Boot-stand: goals, assists en minuten volgens de tiebreakregels.</div>
    <div class="comparison-grid">
      <section class="comparison-column">
        <h2>Voorspelde topscorer</h2>
        <div class="scorer-list">${predicted.map((contender, index) => renderScorer(contender, index, false)).join("")}</div>
      </section>
      <section class="comparison-column">
        <h2>Live Golden Boot-stand</h2>
        <div class="scorer-list">${live.map((contender, index) => renderLiveScorer(contender, index)).join("")}</div>
      </section>
    </div>
  `;
}

function renderLiveScorer(contender, index) {
  return `
    <article class="scorer-row ${index === 0 ? "is-favorite" : ""}">
      <span class="scorer-rank">${index + 1}</span>
      <div>
        <span class="team-name">${contender.player}</span>
        <span class="team-meta">${contender.team} · ${contender.matches} verwachte wedstrijden</span>
      </div>
      <div>
        <span class="team-name">${contender.goals} goals</span>
        <span class="team-meta">${contender.assists} assists · ${contender.minutes} min</span>
      </div>
      <div>
        <div class="meter" aria-hidden="true"><div class="meter-fill" style="width: ${Math.min(100, contender.goals * 16)}%"></div></div>
        <span class="team-meta">Live stand, met route-indicatie op basis van zekere knock-outplaatsen.</span>
      </div>
    </article>
  `;
}

function renderScorer(contender, index, showActual) {
  return `
    <article class="scorer-row ${index === 0 ? "is-favorite" : ""}">
      <span class="scorer-rank">${index + 1}</span>
      <div>
        <span class="team-name">${contender.player}</span>
        <span class="team-meta">${contender.team} · ${contender.matches} verwachte wedstrijden</span>
      </div>
      <div>
        <span class="team-name">${contender.expectedGoals.toFixed(1)} goals</span>
        <span class="team-meta">${showActual ? `${contender.actualGoals} echt · ` : ""}Golden Boot-kans ${contender.adjustedProbability.toFixed(1)}%</span>
      </div>
      <div>
        <div class="meter" aria-hidden="true"><div class="meter-fill" style="width: ${Math.min(100, contender.adjustedProbability * 4)}%"></div></div>
        <span class="team-meta">${contender.note}</span>
      </div>
    </article>
  `;
}

function buildKnockout(tables, thirds) {
  const placements = {};
  for (const [group, table] of Object.entries(tables)) {
    placements[`1${group}`] = table[0];
    placements[`2${group}`] = table[1];
    placements[`3${group}`] = table[2];
  }

  const thirdPool = thirds.filter((row) => row.qualified);
  const thirdAssignments = assignThirdSlots(thirdPool);
  const matches = {};

  knockoutTemplate.forEach((template) => {
    const a = resolveSlot(template.a, placements, thirdAssignments);
    const b = resolveSlot(template.b, placements, thirdAssignments);
    matches[template.id] = createKnockoutMatch(template.id, a, b);
  });

  Object.entries(nextRoundPairs).forEach(([id, [first, second]]) => {
    matches[id] = createKnockoutMatch(Number(id), matches[first].winner, matches[second].winner);
  });

  return matches;
}

function buildCertainKnockout(actualTables) {
  const placements = {};
  for (const group of Object.keys(groups)) {
    const isComplete = fixtures.filter((match) => match.group === group).every((match) => hasActualScore(match.id));
    placements[`1${group}`] = isComplete ? actualTables[group][0] : placeholder(`1${group}`);
    placements[`2${group}`] = isComplete ? actualTables[group][1] : placeholder(`2${group}`);
    placements[`3${group}`] = isComplete ? actualTables[group][2] : placeholder(`3${group}`);
  }

  const allGroupsComplete = Object.keys(groups).every((group) =>
    fixtures.filter((match) => match.group === group).every((match) => hasActualScore(match.id))
  );
  const thirdPool = allGroupsComplete ? rankThirds(actualTables).filter((row) => row.qualified) : [];
  const thirdAssignments = allGroupsComplete ? assignThirdSlots(thirdPool) : {};
  const matches = {};

  knockoutTemplate.forEach((template) => {
    const a = resolveCertainSlot(template.a, placements, thirdAssignments);
    const b = resolveCertainSlot(template.b, placements, thirdAssignments);
    matches[template.id] = createCertainKnockoutMatch(template.id, a, b);
  });

  Object.entries(nextRoundPairs).forEach(([id, [first, second]]) => {
    const a = matches[first].winner ?? placeholder(`W${first}`);
    const b = matches[second].winner ?? placeholder(`W${second}`);
    matches[id] = createCertainKnockoutMatch(Number(id), a, b);
  });

  return matches;
}

function resolveCertainSlot(slot, placements, thirdAssignments) {
  if (!slot.startsWith("3") || slot.length === 2) return placements[slot] ?? placeholder(slot);
  return thirdAssignments[slot] ?? placeholder(slot);
}

function createCertainKnockoutMatch(id, a, b) {
  if (!a?.team || !b?.team) return { id, a, b, score: null, winner: null, method: "wacht op zekerheid" };
  return createKnockoutMatch(id, a, b);
}

function placeholder(label) {
  return { team: null, label };
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

function createKnockoutMatch(id, a, b) {
  if (!a || !b) return { id, a, b, score: null, winner: a ?? b ?? null };
  const actual = actualKnockoutScores[id];
  if (actual) {
    return {
      id,
      a,
      b,
      score: actual,
      regularScore: actual,
      probabilities: knockoutProbabilities(a.team, b.team),
      method: actual.pensHome !== undefined ? "na penalties" : "echt",
      winner: winnerFromKnockoutScore(actual, a, b),
    };
  }

  const score = predictScore(a.team, b.team);
  const probabilities = knockoutProbabilities(a.team, b.team);
  const strengthGap = teamStrength(a.team) - teamStrength(b.team);
  let method = "na 90 min";
  let winner = score.home > score.away ? a : b;
  let decidedScore = { ...score };

  if (score.home === score.away) {
    const penaltyGap = penaltyRating(a.team) - penaltyRating(b.team);
    const usePenalties = Math.abs(strengthGap) <= 4 || probabilities.penalties >= probabilities.extraTimeDecided;
    method = usePenalties ? "na penalties" : "na verlenging";
    winner = usePenalties
      ? penaltyGap >= 0 ? a : b
      : strengthGap >= 0 ? a : b;
    decidedScore = usePenalties
      ? { home: score.home, away: score.away, pensHome: penaltyGap >= 0 ? 5 : 4, pensAway: penaltyGap >= 0 ? 4 : 5 }
      : { home: score.home + (winner === a ? 1 : 0), away: score.away + (winner === b ? 1 : 0) };
  }

  return { id, a, b, score: decidedScore, regularScore: score, probabilities, method, winner };
}

function renderRound(round, matches) {
  return `
    <section class="knockout-round">
      <div class="round-head"><h2>${round.name}</h2><span>${round.ids.length} wedstrijden</span></div>
      ${round.ids.map((id) => renderKnockoutMatch(matches[id])).join("")}
    </section>
  `;
}

function renderScheduledKnockoutList(matches) {
  return `
    <section class="knockout-round">
      <div class="round-head"><h2>Op datum</h2><span>${scheduledKnockoutIds().length} wedstrijden</span></div>
      ${scheduledKnockoutIds().map((id) => renderKnockoutMatch(matches[id])).join("")}
    </section>
  `;
}

function scheduledKnockoutIds() {
  return Object.keys(knockoutSchedule)
    .map(Number)
    .sort((a, b) => scheduleSortValue(a).localeCompare(scheduleSortValue(b)));
}

function scheduleSortValue(id) {
  const schedule = knockoutSchedule[id];
  return `${schedule.date} ${schedule.time}`;
}

function renderKnockoutMatch(match) {
  const a = entryLabel(match.a);
  const b = entryLabel(match.b);
  const score = match.score ? formatKnockoutScore(match.score) : "-";
  const schedule = knockoutSchedule[match.id];
  const scheduleText = schedule ? `${formatKnockoutDate(schedule.date)} · ${schedule.time} · ${schedule.venue}` : "Datum n.t.b.";
  const method = match.method && match.winner ? ` · ${match.method}` : "";
  const chanceLine = match.probabilities
    ? `Verlenging ${pct(match.probabilities.extraTime)} · penalties ${pct(match.probabilities.penalties)}`
    : "";
  return `
    <div class="knockout-match">
      <span class="team-meta">Match ${match.id}</span>
      <span class="team-meta">${scheduleText}</span>
      <div class="knockout-teams">
        <span class="team-name ${match.winner?.team === match.a?.team ? "winner" : ""} ${match.a?.team ? "" : "placeholder"}">${a}</span>
        <span class="score-pill">${score}</span>
        <span class="team-name ${match.winner?.team === match.b?.team ? "winner" : ""} ${match.b?.team ? "" : "placeholder"}">${b}</span>
      </div>
      <span class="team-meta">${match.winner ? `Winnaar: ${match.winner.team}${method}` : "Nog niet zeker"}</span>
      <span class="team-meta">${chanceLine}</span>
    </div>
  `;
}

function entryLabel(entry) {
  return entry?.team ?? entry?.label ?? "Nog onbekend";
}

function createSummary() {
  const tables = calculateTables("predicted");
  const actualTables = calculateTables("actual");
  const thirds = rankThirds(tables);
  const knockout = buildKnockout(tables, thirds);
  const actualKnockout = buildCertainKnockout(actualTables);
  const lines = ["WK 2026 voorspelling", ""];

  Object.keys(groups).forEach((group) => {
    lines.push(`Groep ${group}`);
    fixtures.filter((match) => match.group === group).forEach((match) => {
      const score = scores[match.id];
      lines.push(`${match.home} ${score.home}-${score.away} ${match.away}`);
    });
    lines.push(`Stand: ${tables[group].map((row) => `${row.rank}. ${row.team} (${row.points}p, ${formatGd(row.gd)})`).join(" | ")}`, "");
  });

  lines.push("Beste nummers drie:");
  thirds.forEach((row) => lines.push(`${row.thirdRank}. ${row.team} (${row.group}) ${row.points}p ${formatGd(row.gd)} ${row.qualified ? "door" : "uit"}`));
  lines.push("", "Knock-out:");
  rounds.forEach((round) => {
    lines.push(round.name);
    round.ids.forEach((id) => {
      const match = knockout[id];
      lines.push(`M${id} (${summarySchedule(id)}): ${match.a?.team ?? "?"} ${match.score ? formatKnockoutScore(match.score) : "-"} ${match.b?.team ?? "?"} -> ${match.winner?.team ?? "?"} ${match.method ?? ""}`);
    });
  });

  lines.push("", "Zekere knock-out:");
  scheduledKnockoutIds().forEach((id) => {
    const match = actualKnockout[id];
    lines.push(`M${id} (${summarySchedule(id)}): ${entryLabel(match.a)} ${match.score ? formatKnockoutScore(match.score) : "-"} ${entryLabel(match.b)} -> ${match.winner?.team ?? "nog niet zeker"}`);
  });

  lines.push("", "Verwachte topscorer:");
  rankScorers(knockout).slice(0, 5).forEach((scorer, index) => {
    lines.push(`${index + 1}. ${scorer.player} (${scorer.team}) - ${scorer.expectedGoals.toFixed(1)} goals, kans ${scorer.adjustedProbability.toFixed(1)}%`);
  });

  lines.push("", "Live Golden Boot-stand:");
  rankLiveScorers(actualKnockout).slice(0, 5).forEach((scorer, index) => {
    lines.push(`${index + 1}. ${scorer.player} (${scorer.team}) - ${scorer.goals} goals, ${scorer.assists} assists, ${scorer.minutes} min`);
  });

  return lines.join("\n");
}

function rankScorers(knockoutMatches, includeActual = false) {
  const gamesByTeam = projectedGamesByTeam(knockoutMatches);
  return topScorerContenders
    .map((contender) => {
      const matches = gamesByTeam[contender.team] ?? 3;
      const pathBoost = 1 + (matches - 3) * 0.13;
      const actualGoals = actualScorers[contender.player] ?? 0;
      const remainingProjection = contender.baseGoals * pathBoost;
      const expectedGoals = includeActual ? actualGoals + remainingProjection * 0.65 : remainingProjection;
      const adjustedProbability = includeActual
        ? contender.probability * pathBoost + actualGoals * 3.2
        : contender.probability * pathBoost;
      return { ...contender, matches, actualGoals, expectedGoals, adjustedProbability };
    })
    .sort((a, b) => b.adjustedProbability - a.adjustedProbability || b.expectedGoals - a.expectedGoals);
}

function rankLiveScorers(knockoutMatches) {
  const gamesByTeam = projectedGamesByTeam(knockoutMatches);
  return liveTopScorers
    .map((scorer) => ({
      ...scorer,
      matches: gamesByTeam[scorer.team] ?? 3,
    }))
    .sort(sortLiveScorers);
}

function sortLiveScorers(a, b) {
  return b.goals - a.goals || b.assists - a.assists || a.minutes - b.minutes || a.player.localeCompare(b.player);
}

function projectedGamesByTeam(knockoutMatches) {
  const games = Object.fromEntries(Object.keys(teamData).map((team) => [team, 3]));
  Object.values(knockoutMatches).forEach((match) => {
    if (match.a?.team) games[match.a.team] += 1;
    if (match.b?.team) games[match.b.team] += 1;
  });
  return games;
}

function pct(value) {
  return `${Math.round(value * 100)}%`;
}

function formatGd(value) {
  return value > 0 ? `+${value}` : String(value);
}

function penaltyRating(team) {
  return teamData[team].penalties ?? clamp(teamData[team].strength - 8, 40, 72);
}

function knockoutProbabilities(home, away) {
  const { draw } = winProbability(home, away);
  const extraTime = draw;
  const penalties = draw * 0.55;
  return {
    extraTime,
    penalties,
    extraTimeDecided: draw - penalties,
  };
}

function formatKnockoutScore(score) {
  if ("pensHome" in score && "pensAway" in score) {
    return `${score.home}-${score.away} (${score.pensHome}-${score.pensAway}p)`;
  }
  return `${score.home}-${score.away}`;
}

function winnerFromKnockoutScore(score, a, b) {
  if (score.home > score.away) return a;
  if (score.away > score.home) return b;
  if (score.pensHome !== undefined && score.pensAway !== undefined) {
    return score.pensHome >= score.pensAway ? a : b;
  }
  return teamData[a.team].strength >= teamData[b.team].strength ? a : b;
}

function importActualData(text) {
  text.split(/\n+/).map((line) => line.trim()).filter(Boolean).forEach((line) => {
    if (importKnockoutLine(line)) return;
    if (importScorerLine(line)) return;
    importMatchLine(line);
  });
}

function importKnockoutLine(line) {
  const match = line.match(/^M?(\d{2,3})\s+(\d+)\s*[-:]\s*(\d+)(?:\s+(\d+)\s*[-:]\s*(\d+)p?)?$/i);
  if (!match) return false;
  const id = Number.parseInt(match[1], 10);
  if (id < 73 || id > 104) return false;
  actualKnockoutScores[id] = {
    home: Number.parseInt(match[2], 10),
    away: Number.parseInt(match[3], 10),
  };
  if (match[4] !== undefined && match[5] !== undefined) {
    actualKnockoutScores[id].pensHome = Number.parseInt(match[4], 10);
    actualKnockoutScores[id].pensAway = Number.parseInt(match[5], 10);
  }
  return true;
}

function importScorerLine(line) {
  const match = line.match(/^(.+?)\s+(\d+)\s*(?:goal|goals|doelpunt|doelpunten)$/i);
  if (!match) return false;
  const player = normalizePlayerName(match[1]);
  actualScorers[player] = Number.parseInt(match[2], 10);
  return true;
}

function importMatchLine(line) {
  const match = line.match(/^(.+?)\s+(\d+)\s*[-:]\s*(\d+)\s+(.+)$/);
  if (!match) return false;
  const home = normalizeTeamName(match[1]);
  const away = normalizeTeamName(match[4]);
  const fixture = fixtures.find((item) =>
    (item.home === home && item.away === away) || (item.home === away && item.away === home)
  );
  if (!fixture) return false;
  const firstGoals = Number.parseInt(match[2], 10);
  const secondGoals = Number.parseInt(match[3], 10);
  actualScores[fixture.id] = fixture.home === home
    ? { home: firstGoals, away: secondGoals }
    : { home: secondGoals, away: firstGoals };
  return true;
}

function normalizeTeamName(value) {
  const clean = value.trim().toLowerCase();
  const aliases = {
    usa: "United States",
    us: "United States",
    "u.s.": "United States",
    "south korea": "Korea Republic",
    "ivory coast": "Cote d'Ivoire",
    "côte d'ivoire": "Cote d'Ivoire",
    iran: "IR Iran",
    capeverde: "Cabo Verde",
    "cape verde": "Cabo Verde",
    "dr congo": "Congo DR",
    "czech republic": "Czechia",
    turkey: "Turkiye",
    türkiye: "Turkiye",
  };
  if (aliases[clean]) return aliases[clean];
  return Object.keys(teamData).find((team) => team.toLowerCase() === clean) ?? value.trim();
}

function normalizePlayerName(value) {
  const clean = value.trim().toLowerCase();
  return topScorerContenders.find((contender) => contender.player.toLowerCase() === clean)?.player ?? value.trim();
}

function formatDate(value) {
  return new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "short" }).format(new Date(`${value}T12:00:00`));
}

function formatLongDate(value) {
  return new Intl.DateTimeFormat("nl-NL", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function formatKnockoutDate(value) {
  return new Intl.DateTimeFormat("nl-NL", { weekday: "short", day: "numeric", month: "short" }).format(new Date(`${value}T12:00:00`));
}

function summarySchedule(id) {
  const schedule = knockoutSchedule[id];
  if (!schedule) return "datum n.t.b.";
  return `${formatKnockoutDate(schedule.date)} ${schedule.time}, ${schedule.venue}`;
}
