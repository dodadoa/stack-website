// Prefixes drawn from thematic and conceptual vocabulary of the exhibition
const NAME_PREFIXES = [
  "Repair",
  "Plural",
  "Coexist",
  "Drift",
  "Refuse",
  "Ritual",
  "Inherit",
  "Migrant",
  "Excess",
  "Vernac",
  "Cosmol",
  "Unsettle",
  "Overlap",
  "Persist",
  "Margin",
  "Relic",
  "Myth",
  "Trace",
  "Rewire",
  "Diverge",
  "Residue",
  "Hollow",
  "Kinship",
  "Threshold",
  "Remnant",
];

const NAME_SUFFIXES = [
  ".agent",
  "_node",
  ".daemon",
  "_relay",
  ".patch",
  "_probe",
  "_fork",
  ".log",
  "_loop",
  "_v2",
  "_seed",
  ".sys",
  "_drift",
  "_echo",
  "_process",
];

export function generateAgentName(usedNames: Set<string>): string {
  for (let attempt = 0; attempt < 40; attempt++) {
    const prefix = NAME_PREFIXES[Math.floor(Math.random() * NAME_PREFIXES.length)];
    const suffix = NAME_SUFFIXES[Math.floor(Math.random() * NAME_SUFFIXES.length)];
    const name = `${prefix}${suffix}`;
    if (!usedNames.has(name)) {
      return name;
    }
  }

  return `agent_${Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0")}`;
}

const SYNTHETIC_PATCH_LINES = [
  // Curatorial / thematic
  "PATCH APPLIED",
  "WORLD.refuse(settled)",
  "REBUILDING NARRATIVE …",
  "COEXISTENCE > CONSENSUS",
  "NO SINGLE HORIZON",
  "REPAIR IN PROGRESS …",
  "PLURALITY.exe RUNNING",
  "ANOTHER WORLD IS PATCHING",
  "ROLLBACK REFUSED",
  "MERGE CONFLICT: WORLDS",
  "COMPILING OTHERWISE …",
  "worlds overlap, diverge, coexist",
  "some worlds remain unfinished",
  "repair is not regression",
  "inheritance ≠ constraint",
  "care as much as design",
  "dominant narrative: OVERRIDDEN",
  "cosmology.load() — local",
  // Artist / work references
  "DZATA: consciousness online",
  "wasan.compute() ≠ western_calc",
  "Jitr refuses standard tuning",
  "quantum revival in progress",
  "gong tradition: decoding …",
  "Symbiosyn: Thailand 2025",
  "Hydra.decapitate(capital)",
  "Wa'anak Witu Watu streaming",
  "flesh_nest.render() …",
  "Emulator: SG 2024 — running",
  "WorldID.categorise() — denied",
  "data → autonomous life form",
  "XR feedback loop active",
  "where_system_sees: NOTHING",
  "alternative computation loaded",
  "southeast_asia: suppressed histories decoding",
  "vernacular knowledge: compiling",
  "myth_engine.patch() — live",
];

export function buildPhrasePool(paragraphs: readonly string[]): string[] {
  const sentences = paragraphs
    .join(" ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 8);

  return [...sentences, ...SYNTHETIC_PATCH_LINES];
}

export function pickPatchPhrase(pool: string[], avoid: string): string {
  if (pool.length === 0) {
    return "PATCH APPLIED";
  }

  for (let attempt = 0; attempt < 10; attempt++) {
    const candidate = pool[Math.floor(Math.random() * pool.length)];
    if (candidate !== avoid) {
      return candidate;
    }
  }

  return pool[0];
}
