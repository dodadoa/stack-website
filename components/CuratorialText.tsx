"use client";

import { TypoWord } from "./TypoWord";

type CuratorialTextProps = {
  paragraphs: readonly string[];
  paragraphsTh?: readonly string[];
};

type Segment = string | { wrong: string; correct: string; delay: number };

function typo(
  wrong: string,
  correct: string,
  delay: number,
): { wrong: string; correct: string; delay: number } {
  return { wrong, correct, delay };
}

const enSegments: Segment[][] = [
  ["Worlds do not ", typo("arirve", "arrive", 15000), " all at once."],
  [
    "They are ",
    typo("asssembled", "assembled", 25000),
    " through ",
    typo("storise", "stories", 40000),
    ", infrastructures, migrations, rituals, technologies, accidents, and ",
    typo("reparis", "repairs", 55000),
    ". They ",
    typo("overalp", "overlap", 70000),
    ", diverge, and coexist. They are shaped as much by care as by design, as much by inheritance as by invention.",
  ],
  [
    "Some worlds seek ",
    typo("stabiltiy", "stability", 30000),
    ". Others remain ",
    typo("unfinsihed", "unfinished", 50000),
    ".",
  ],
  [
    "Patch Notes That Refuse a Settled World stays with the latter. Rather than treating the future as a singular horizon, the exhibition turns toward a ",
    typo("pluraility", "plurality", 45000),
    " of worlds shaped by different histories, ",
    typo("cosmologeis", "cosmologies", 65000),
    ", and forms of life.",
  ],
  [
    'Borrowed from software and gaming culture, "patch notes" record the changes made as a system continues to ',
    typo("evovle", "evolve", 20000),
    ". They become a ",
    typo("metahpor", "metaphor", 48000),
    " for worlds sustained through repair, coexistence, and ",
    typo("continaul", "continual", 75000),
    " change rather than moving toward a single future.",
  ],
  [
    "A ",
    typo("settlde", "settled", 18000),
    " world leaves little room for other stories. Its meanings appear fixed, its future already decided. To refuse a settled world is to remain attentive to worlds that exceed dominant ",
    typo("narratvies", "narratives", 60000),
    "—to ways of living, relating, and ",
    typo("imagning", "imagining", 85000),
    " otherwise.",
  ],
  [
    "Across exhibitions, screenings, ",
    typo("perfromances", "performances", 35000),
    ", and talks, the programme brings together artists from Thailand, Southeast Asia, and beyond, working across moving image, media art, games, digital culture, ",
    typo("ecolgoy", "ecology", 58000),
    ", and emerging ",
    typo("technologeis", "technologies", 78000),
    ". Drawing from local histories, cosmologies, myths, vernacular knowledge, and lived experiences, their works trace worlds that persist alongside dominant narratives of ",
    typo("progerss", "progress", 90000),
    ", development, and technological futures.",
  ],
];

const TYPO_DELAY_SCALE = 0.15;

function renderSegments(segs: Segment[]) {
  return segs.map((seg, i) =>
    typeof seg === "string" ? (
      <span key={i}>{seg}</span>
    ) : (
      <TypoWord
        key={i}
        wrong={seg.wrong}
        correct={seg.correct}
        delay={Math.round(seg.delay * TYPO_DELAY_SCALE)}
      />
    ),
  );
}

export function CuratorialText({ paragraphs, paragraphsTh }: CuratorialTextProps) {
  const [lead, ...body] = paragraphs;
  const [leadTh, ...bodyTh] = paragraphsTh ?? [];
  const leadClass = "type-headline text-[clamp(1.5rem,3.5vw,2rem)] leading-[1.15] text-pntrsw-body";
  const bodyClass = "type-body text-[1.05rem] leading-[1.7] text-pntrsw-body/90";
  const thLeadClass = "type-headline thai-text text-[clamp(1.5rem,3.5vw,2rem)] leading-[1.35] text-pntrsw-body";
  const thBodyClass = "type-body thai-text text-[1.05rem] leading-[1.85] text-pntrsw-body/90";

  return (
    <section className="max-w-5xl">
      <p className="type-subheadline label-caps mb-10 text-pntrsw-body/60">
        Curatorial Statement
      </p>

      {/* Lead paragraph — full width */}
      <p className={`mb-10 ${leadClass}`}>
        {enSegments[0] ? renderSegments(enSegments[0]) : lead}
      </p>

      {/* Body — two columns */}
      <div className="columns-1 gap-10 space-y-6 md:columns-2">
        {body.map((paragraph, i) => {
          const segs = enSegments[i + 1];
          return (
            <p key={paragraph.slice(0, 32)} className={`break-inside-avoid ${bodyClass}`}>
              {segs ? renderSegments(segs) : paragraph}
            </p>
          );
        })}
      </div>

      {paragraphsTh?.length ? (
        <div className="mt-14 border-t border-pntrsw-deep/20 pt-14">
          {leadTh ? <p className={`mb-10 ${thLeadClass}`}>{leadTh}</p> : null}

          <div className="columns-1 gap-10 space-y-6 md:columns-2">
            {bodyTh.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className={`break-inside-avoid ${thBodyClass}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
