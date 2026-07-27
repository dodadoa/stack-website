import type { Metadata } from "next";
import Link from "next/link";
import { ARTISTS, SCREENING_ORDER } from "./data";
import "./vml.css";

export const metadata: Metadata = {
  title: "Stack V_Circuits — Vietnam Media Show: Transitional Images",
  description:
    "Vietnam Media Show: Transitional Images — newly emerged and emerging expanded cinema works from Việt Nam, curated by Vietnam Media Lab. Friday 7 August 2026, 6:30–9:30 PM, Goethe Saal.",
  openGraph: {
    title: "Stack V_Circuits — Vietnam Media Show: Transitional Images",
    description:
      "Expanded cinema works from Việt Nam, curated by Vietnam Media Lab. Friday 7 August 2026, 6:30–9:30 PM, Goethe Saal.",
    images: ["/vmlAssets/Visual/full_logo.png"],
  },
};

const V = "/vmlAssets/Visual";
const L = "/vmlAssets/Logo";
const VML_INSTAGRAM = "https://www.instagram.com/vietnam__media__lab/";
const GIANG_INSTAGRAM = "https://www.instagram.com/giang.it/";

function FramedArtwork({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="vml-artframe">
      <img className="vml-artframe-img" src={src} alt={alt} loading="lazy" />
      <img
        className="vml-artframe-border"
        src={`${V}/artwork_frame.png`}
        alt=""
        aria-hidden
      />
    </div>
  );
}

function NamePlate({ href, children }: { href?: string; children: React.ReactNode }) {
  const inner = (
    <>
      <img src={`${V}/Frame_for_ArtistName.png`} alt="" aria-hidden />
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="vml-nameplate">
        {inner}
      </Link>
    );
  }
  return <div className="vml-nameplate">{inner}</div>;
}

export default function Vml2026Page() {
  return (
    <main className="vml-page">
      {/* Hero */}
      <section className="vml-hero">
        <img
          className="vml-rock vml-rock-left"
          src={`${V}/rock_visual.png`}
          alt=""
          aria-hidden
        />
        <img
          className="vml-rock vml-rock-right"
          src={`${V}/rock_visual.png`}
          alt=""
          aria-hidden
        />
        <div className="vml-hero-inner">
          <img
            className="vml-badge"
            src={`${V}/Stack V_Circuits_.png`}
            alt="Stack V_Circuits"
          />
          <img
            className="vml-hero-logo"
            src={`${V}/full_logo.png`}
            alt="Transitional Images — Hình ảnh quá độ — 6–9 PM, 7/8"
          />
          <h1 className="vml-visually-hidden">
            Stack V_Circuits — Vietnam Media Show: Transitional Images
          </h1>
          <div className="vml-meta">
            <p className="vml-meta-line">Vietnam Media Show</p>
            <p className="vml-meta-strong">
              Friday 7 August 2026 · 6:30 – 9:30 PM
            </p>
            <p className="vml-meta-line">Goethe Saal, Goethe-Institut Thailand</p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="vml-section">
        <img
          className="vml-quado"
          src={`${V}/Hinh_anh_qua_do.png`}
          alt="Hình ảnh quá độ"
        />
        <p className="vml-body">
          As part of Stack V_Circuits, Stack has invited Vietnam Media Lab to
          curate <em>Transitional Images</em>, a special programme bringing
          together newly emerged and emerging expanded cinema works from
          Vietnam. The programme offers a rare opportunity to encounter
          contemporary practices across expanded cinema, moving image, and
          digital art, tracing the country&rsquo;s shifting cultural and
          technological landscapes. The screening programme will be followed by
          a conversation with curator Nguyễn Hoàng Giang of Vietnam Media Lab.
        </p>
      </section>

      {/* Programme */}
      <section className="vml-section">
        <h2 className="vml-heading">
          <img src={`${V}/circle_visual.png`} alt="" aria-hidden />
          Programme — Screening
        </h2>
        <div className="vml-grid">
          {SCREENING_ORDER.map((s) => (
            <article key={s.label + s.works[0]} className="vml-card">
              <Link
                href={`/vml2026/${s.artistSlugs[0]}`}
                className="vml-card-link"
                aria-label={s.label}
              >
                <FramedArtwork src={s.artwork} alt={`${s.label} — ${s.works[0]}`} />
              </Link>
              {s.artistSlugs.map((slug) => {
                const artist = ARTISTS.find((a) => a.slug === slug);
                return (
                  <NamePlate key={slug} href={`/vml2026/${slug}`}>
                    {artist?.name ?? s.label}
                  </NamePlate>
                );
              })}
              <ul className="vml-works">
                {s.works.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Talk */}
      <section className="vml-section">
        <h2 className="vml-heading">
          <img src={`${V}/circle_visual.png`} alt="" aria-hidden />
          Talk
        </h2>
        <div className="vml-talk">
          <p className="vml-talk-title">The Transitional Images from Vietnam</p>
          <p className="vml-body">
            Talk by Nguyễn Hoàng Giang (aka{" "}
            <a
              href={GIANG_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="vml-text-link"
            >
              giang.it
            </a>
            ) of Vietnam Media Lab, followed by Q&amp;A.
          </p>
        </div>
      </section>

      {/* Curator's statement */}
      <section className="vml-section vml-statement">
        <h2 className="vml-heading">
          <img src={`${V}/circle_visual.png`} alt="" aria-hidden />
          Curator&rsquo;s Statement
        </h2>
        <div className="vml-body vml-statement-body">
          <p>
            Vietnam Media Lab, invited by Stack V_Circuits, proudly presents a
            selection of newly emerged and emerging expanded cinema works from
            Việt Nam. The artists and screenings are curated and structured as a
            spectrum of the &ldquo;transitional period&rdquo; (&ldquo;thời kỳ
            quá độ&rdquo;<sup>1</sup>) spanning from the post-war to the
            post-digital.
          </p>
          <p>
            On one side of the spectrum are artists such as Ngọc Nâu and Arlette
            Quynh Anh Tran, whose practices emerged from the country&rsquo;s
            perestroika-era reforms (&ldquo;Đổi Mới&rdquo;) of the 1980s. Their
            works are deeply shaped by the legacies of both physical and
            ideological wars that preceded their births. These influences appear
            in the ways their moving images engage with themes long present in
            Vietnamese contemporary art: collective historical memory,
            architecture, recurring wartime motifs, and national imaginaries
            shaped by conflict.
          </p>
          <p>
            On the other side are artists like Trần Uy Đức and Nguyễn Duy Anh,
            who are pushing beyond these familiar framings of Vietnamese art.
            Their works reveal a growing interest in the post-digital condition:
            a reality in which digital technologies and the screen — the very
            apparatus that once defined cinema — are now invisibly embedded
            within everyday life. These new and emerging media artists are
            actively shaping new narratives and images of Việt Nam: no longer
            solely a land defined by sorrow and war, but one looking toward
            multiple individual futures while remaining connected to its
            cultural roots and legacies.
          </p>
          <p>
            Together, this spectrum of artists is united by the medium of the
            computer and the aesthetic possibilities it has brought to their
            practices and artistic visions. Is Vietnamese moving image culture
            truly post-digital? Perhaps not yet, as we are still living within
            the &ldquo;thời kỳ quá độ.&rdquo;
          </p>
          <p className="vml-footnote">
            <sup>1</sup> &ldquo;Quá độ lên chủ nghĩa xã hội ở nước ta là quá
            trình lâu dài, trải qua nhiều chặng đường&rdquo; [The transition to
            socialism in our country is a long-term process, passing through
            many stages]. Communist Party of Vietnam (1991), <em>Cương lĩnh xây
            dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội</em>,
            adopted at the 7th National Congress. Quoted in: Hội đồng Lý luận
            Trung ương (2021), &lsquo;Nhận thức của Đảng ta về thời kỳ quá độ
            lên chủ nghĩa xã hội ở Việt Nam&rsquo;, Lý Luận Chính Trị Journal.
          </p>
        </div>
        <div className="vml-credits">
          <p>
            <span>Curator</span>{" "}
            <a
              href={GIANG_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="vml-text-link"
            >
              giang.it
            </a>{" "}
            (Vietnam Media Lab)
          </p>
          <p>
            <span>Graphic Design</span> Trần Phương Bách (Vietnam Media Lab)
          </p>
        </div>
      </section>

      {/* Thai */}
      <section className="vml-section vml-thai">
        <h2 className="vml-heading">
          <img src={`${V}/circle_visual.png`} alt="" aria-hidden />
          ภาษาไทย
        </h2>
        <div className="vml-body vml-statement-body">
          <p className="vml-talk-title">
            Stack V_Circuits — Vietnam Media Show: Transitional Images
          </p>
          <p>
            วันศุกร์ที่ 7 สิงหาคม 2026 เวลา 18:30–21:30 น. — หอประชุมเกอเธ่
          </p>
          <p>
            Transitional Images เป็นโปรแกรมพิเศษภายใต้ Stack V_Circuits ซึ่ง
            Stack ได้เชิญ Vietnam Media Lab มาคัดสรรโปรแกรม
            รวบรวมผลงานภาพเคลื่อนไหวและ Expanded Cinema
            จากศิลปินรุ่นใหม่และศิลปินร่วมสมัยของเวียดนาม
            โปรแกรมนี้เปิดโอกาสให้ผู้ชมได้สำรวจผลงานด้านภาพเคลื่อนไหว Expanded
            Cinema และดิจิทัลอาร์ตร่วมสมัย
            ที่สะท้อนภูมิทัศน์ทางวัฒนธรรมและเทคโนโลยีของเวียดนามที่กำลังเปลี่ยนแปลงอย่างต่อเนื่อง
            หลังการฉายภาพยนตร์จะมีวงสนทนากับ Nguyễn Hoàng Giang ภัณฑารักษ์จาก
            Vietnam Media Lab
          </p>
          <p>
            เสวนา: <em>The Transitional Images from Vietnam</em> วงสนทนาโดย
            Nguyễn Hoàng Giang (
            <a
              href={GIANG_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="vml-text-link"
            >
              giang.it
            </a>
            ) ตามด้วยช่วงถาม–ตอบ (Q&amp;A)
          </p>
          <p>
            Stack V_Circuits จัดโดย Stack ร่วมกับ Goethe-Institut Thailand
            และได้รับการสนับสนุนจาก หอภาพยนตร์ (องค์การมหาชน)
          </p>
        </div>
      </section>

      {/* About VML */}
      <section className="vml-section">
        <h2 className="vml-heading">
          <img src={`${V}/circle_visual.png`} alt="" aria-hidden />
          About Vietnam Media Lab
        </h2>
        <p className="vml-body">
          <a
            href={VML_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="vml-text-link"
          >
            Vietnam Media Lab
          </a>{" "}
          (VML) continues to explore the intersection of media art, design, and
          technology, acting as a bridge between artists, technologists, and
          creative minds both locally and internationally. The lab is dedicated
          to three core pillars: <strong>Exchange</strong>, providing platforms
          for performance and exhibitions; <strong>Educate</strong>, fostering a
          media art movement through technical workshops and artist&rsquo;s talks;
          and <strong>Experiment</strong>, pushing the boundaries of technologies
          like AI and XR with artistic practice.{" "}
          <a
            href={VML_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="vml-text-link"
          >
            @vietnam__media__lab
          </a>
        </p>
      </section>

      {/* Footer */}
      <footer className="vml-footer">
        <img
          className="vml-footer-visual"
          src={`${V}/left_footer_visual.png`}
          alt=""
          aria-hidden
        />
        <p className="vml-footer-note">
          Stack V_Circuits is organised by Stack, in collaboration with
          Goethe-Institut Thailand, with support from the Thai Film Archive.
        </p>
        <div className="vml-logos">
          <img
            className="vml-logo-featured"
            src={`${L}/goethe.png`}
            alt="Goethe-Institut Thailand"
          />
          <img src={`${L}/stack.png`} alt="Stack" />
          <a href={VML_INSTAGRAM} target="_blank" rel="noopener noreferrer">
            <img src={`${L}/VML.png`} alt="Vietnam Media Lab — @vietnam__media__lab on Instagram" />
          </a>
          <img src={`${L}/VMS.png`} alt="Vietnam Media Show" />
          <img
            className="vml-logo-featured"
            src={`${L}/cinema enlightens.png`}
            alt="Thai Film Archive — Cinema Enlightens"
          />
        </div>
      </footer>
    </main>
  );
}
