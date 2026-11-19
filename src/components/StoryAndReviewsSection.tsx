import { ArrowUpRight } from 'lucide-react';
import { BRAND_IMAGES, WHATSAPP_NUMBER } from '../data/catalog';
import type { Translations } from '../i18n/translations';

interface StoryAndReviewsSectionProps {
  story: Translations['story'];
  reviews: Translations['reviews'];
}

export function StoryAndReviewsSection({
  story,
  reviews,
}: StoryAndReviewsSectionProps) {
  const feedbackUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    reviews.whatsappText
  )}`;

  return (
    <>
      {/* Story / About Section */}
      <section id="sobre" className="bg-[#171514] py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.17em] text-[#f5a623]">
              <span className="h-[2px] w-6 bg-[#f5a623]" aria-hidden="true" />
              <span>{story.eyebrow}</span>
            </div>

            <h2 className="font-display text-balance mt-3 text-[clamp(2.6rem,5vw,4.3rem)] uppercase leading-[0.95] text-[#f8f4ec]">
              {story.titleLine1}
              <br />
              {story.titleLine2Prefix}
              <span className="text-[#f5a623]">{story.titleLine2Accent}</span>
            </h2>

            <p className="mt-4 max-w-[540px] text-[15px] leading-[1.75] text-[#c1b9ae]">
              {story.lede}
            </p>

            <ul className="mt-7 grid gap-3">
              {story.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-sm font-bold text-[#ded4c7]"
                >
                  <span aria-hidden="true" className="text-[#f5a623]">
                    ✦
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Layered Authentic Photography */}
          <div className="relative h-[420px] w-full sm:h-[510px]">
            <img
              src={BRAND_IMAGES.wall}
              alt={story.wallAlt}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute right-0 top-0 h-[88%] w-[75%] rounded-[3px] object-cover saturate-[0.85]"
            />

            <div className="absolute bottom-0 left-0 aspect-[4/3] w-[54%] max-w-[280px] overflow-hidden rounded-[3px] border-[8px] border-[#171514] bg-[#171514] shadow-[0_22px_65px_rgba(8,6,5,0.65)]">
              <img
                src={BRAND_IMAGES.hand}
                alt={story.handAlt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute left-1/2 top-1/2 h-[133.34%] w-[75%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover"
              />
            </div>

            <div className="font-display absolute bottom-[7%] right-[2%] grid h-[114px] w-[114px] rotate-6 place-items-center rounded-full border-4 border-[#211d1a] bg-[#f5a623] text-center text-[1.4rem] uppercase leading-[0.92] text-[#23190e] shadow-lg">
              <span>
                Il gusto
                <br />
                di strada
                <br />✦
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews / Community Invite Section */}
      <section
        id="avaliacoes"
        className="bg-[#f4efe6] py-20 text-[#241f1b] lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.17em] text-[#a23e1e]">
              <span className="h-[2px] w-6 bg-[#a23e1e]" aria-hidden="true" />
              <span>{reviews.eyebrow}</span>
            </div>

            <h2 className="font-display text-balance mt-3 text-[clamp(2.6rem,5vw,4.1rem)] uppercase leading-[0.95] text-[#211d1a]">
              {reviews.titleLine1}
              <br />
              {reviews.titleLine2Prefix}
              <span className="text-[#b66d09]">{reviews.titleLine2Accent}</span>
            </h2>

            <p className="mt-4 text-[14.5px] leading-[1.7] text-[#5e564e]">
              {reviews.body}
            </p>

            <a
              href={feedbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-[3px] bg-[#211d1a] px-6 text-xs font-extrabold uppercase tracking-[0.07em] text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#322c27]"
            >
              <span>{reviews.cta}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="relative rounded-[3px] bg-[#231e1a] p-8 text-white sm:p-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-6 top-2 font-serif text-7xl leading-none text-[#f5a623]/80"
            >
              “
            </span>

            <h3 className="font-display max-w-[420px] text-[2.2rem] uppercase leading-[0.96] text-[#f8f4ec] sm:text-[2.5rem]">
              {reviews.panelTitleLine1}
              <br />
              {reviews.panelTitleLine2}
            </h3>

            <p className="mt-4 max-w-[470px] text-[14px] leading-[1.7] text-[#cfc6ba]">
              {reviews.panelBody}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-white/10 pt-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#f0e8dc]/85">
              {reviews.keywords.map((word, idx) => (
                <span key={word} className="inline-flex items-center gap-3">
                  <span>{word}</span>
                  {idx < reviews.keywords.length - 1 && (
                    <span aria-hidden="true" className="text-[#f5a623]">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
