"use client";

import { TypoWord } from "./TypoWord";

type CuratorialTextProps = {
  paragraphs: readonly string[];
  locale: string;
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
  // 0: "Worlds do not arrive all at once."
  ["Worlds do not ", typo("arirve", "arrive", 15000), " all at once."],
  // 1: "They are assembled through stories..."
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
  // 2: "Some worlds seek stability..."
  [
    "Some worlds seek ",
    typo("stabiltiy", "stability", 30000),
    ". Others remain ",
    typo("unfinsihed", "unfinished", 50000),
    ".",
  ],
  // 3: "Patch Notes That Refuse..."
  [
    "Patch Notes That Refuse a Settled World stays with the latter. Rather than treating the future as a singular horizon, the exhibition turns toward a ",
    typo("pluraility", "plurality", 45000),
    " of worlds shaped by different histories, ",
    typo("cosmologeis", "cosmologies", 65000),
    ", and forms of life.",
  ],
  // 4: 'Borrowed from software...'
  [
    'Borrowed from software and gaming culture, "patch notes" record the changes made as a system continues to ',
    typo("evovle", "evolve", 20000),
    ". They become a ",
    typo("metahpor", "metaphor", 48000),
    " for worlds sustained through repair, coexistence, and ",
    typo("continaul", "continual", 75000),
    " change rather than moving toward a single future.",
  ],
  // 5: "A settled world..."
  [
    "A ",
    typo("settlde", "settled", 18000),
    " world leaves little room for other stories. Its meanings appear fixed, its future already decided. To refuse a settled world is to remain attentive to worlds that exceed dominant ",
    typo("narratvies", "narratives", 60000),
    "—to ways of living, relating, and ",
    typo("imagning", "imagining", 85000),
    " otherwise.",
  ],
  // 6: "Across exhibitions..."
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

const thSegments: Segment[][] = [
  // 0
  [
    "โลกไม่ได้",
    typo("มาถงึ", "มาถึง", 15000),
    "พร้อมกันทั้งหมด",
  ],
  // 1
  [
    "โลกถูก",
    typo("ประกอบขนึ้", "ประกอบขึ้น", 25000),
    "จากเรื่องเล่า โครงสร้างพื้นฐาน การย้ายถิ่น พิธีกรรม ",
    typo("เทคโนโลยี", "เทคโนโลยี", 40000),
    " อุบัติเหตุ และการซ่อมแซม โลกเหล่านี้ทับซ้อน แยกทาง และอยู่ร่วมกัน ถูกหล่อหลอมทั้งจากการดูแลและการออกแบบ ทั้งจากมรดกและการคิดค้น",
  ],
  // 2
  [
    "บางโลกแสวงหาความ",
    typo("มั่นคง", "มั่นคง", 30000),
    " บางโลกยังไม่",
    typo("เสร็จสมบรูณ์", "เสร็จสมบูรณ์", 50000),
  ],
  // 3
  [
    "Patch Notes That Refuse a Settled World อยู่กับโลกหลัง แทนที่จะมองอนาคตเป็นขอบฟ้าเดียว นิทรรศการหันไปสู่ความ",
    typo("หลากหลาย", "หลากหลาย", 45000),
    "ของโลกที่ถูกหล่อหลอมจากประวัติศาสตร์ จักรวาลวิทยา และรูปแบบชีวิตที่ต่างกัน",
  ],
  // 4
  [
    'ยืมมาจากวัฒนธรรมซอฟต์แวร์และเกม "patch notes" บันทึกการเปลี่ยนแปลงขณะที่ระบบยังคง',
    typo("พฒันา", "พัฒนา", 20000),
    " มันกลายเป็น",
    typo("อุปมา", "อุปมา", 48000),
    "ของโลกที่คงอยู่ผ่านการซ่อมแซม การอยู่ร่วม และการเปลี่ยนแปลงอย่างต่อเนื่อง มากกว่าก้าวไปสู่อนาคตเดียว",
  ],
  // 5
  [
    "โลกที่",
    typo("มั่นคง", "มั่นคง", 18000),
    "ไม่เหลือที่ว่างให้เรื่องเล่าอื่น ความหมายดูตายตัว อนาคตถูกตัดสินไว้แล้ว การปฏิเสธโลกที่มั่นคงคือการยังคงตั้งใจฟังโลกที่เกินกว่าเรื่องเล่าเด่น—วิธีการอยู่ สัมพันธ์ และ",
    typo("จินตนากร", "จินตนาการ", 85000),
    "อย่างอื่น",
  ],
  // 6
  [
    "ผ่านนิทรรศการ การฉายภาพ ",
    typo("การแสดง", "การแสดง", 35000),
    " และการบรรยาย โปรแกรมรวมศิลปินจากไทย เอเชียตะวันออกเฉียงใต้ และที่อื่นๆ ที่ทำงานกับภาพเคลื่อนไหว ศิลปะสื่อ เกม วัฒนธรรมดิจิทัล ",
    typo("นิเวศวทิยา", "นิเวศวิทยา", 58000),
    " และเทคโนโลยีใหม่ ดึงจากประวัติศาสตร์ท้องถิ่น จักรวาลวิทยา ตำนาน ความรู้พื้นบ้าน และประสบการณ์ชีวิต ผลงานของพวกเขาไล่รอยโลกที่ดำรงอยู่คู่กับเรื่องเล่าเด่นเรื่องความ",
    typo("ก้าวหนา้", "ก้าวหน้า", 90000),
    " การพัฒนา และอนาคตเทคโนโลยี",
  ],
];

const TYPO_DELAY_SCALE = 0.15;

export function CuratorialText({ paragraphs, locale }: CuratorialTextProps) {
  const segments = locale === "th" ? thSegments : enSegments;

  return (
    <div className="space-y-5 text-[1.05rem] leading-[1.65] text-pntrsw-navy/85">
      {paragraphs.map((paragraph, index) => {
        const segs = segments[index];

        if (!segs) {
          return (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          );
        }

        return (
          <p
            key={paragraph.slice(0, 32)}
            className={
              index === 0
                ? "font-sporting text-[1.5rem] font-bold leading-[1.15] tracking-[-0.02em] text-pntrsw-navy uppercase md:text-[2rem]"
                : undefined
            }
          >
            {index === 0 && (
              <span className="font-ascii mr-2 text-sm text-pntrsw-moss">+</span>
            )}
            {segs.map((seg, i) =>
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
            )}
          </p>
        );
      })}
    </div>
  );
}
