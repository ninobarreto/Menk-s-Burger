import { ArrowUpRight, Flame, Home, MessageCircle, SlidersHorizontal } from 'lucide-react';
import type { Translations } from '../i18n/translations';

const CARD_ICONS = [Flame, Home, SlidersHorizontal, MessageCircle];

interface ExperienceSectionProps {
  t: Translations['experience'];
}

export function ExperienceSection({ t }: ExperienceSectionProps) {
  return (
    <section id="diferenciais" className="bg-[#171514] py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-start gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left Sticky Intro */}
        <div className="lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.17em] text-[#f5a623]">
            <span className="h-[2px] w-6 bg-[#f5a623]" aria-hidden="true" />
            <span>{t.eyebrow}</span>
          </div>

          <h2 className="font-display text-balance mt-3 text-[clamp(2.6rem,5vw,4.3rem)] uppercase leading-[0.95] text-[#f8f4ec]">
            {t.titleLine1}
            <br />
            <span className="text-[#f5a623]">{t.titleLine2Accent}</span>
          </h2>

          <p className="mt-4 max-w-[440px] text-[15px] leading-[1.7] text-[#c1b9ae]">
            {t.lede}
          </p>

          <a
            href="#sobre"
            className="mt-7 inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[3px] border border-white/40 bg-[#191615]/60 px-5 text-xs font-extrabold uppercase tracking-[0.07em] text-white transition-colors duration-150 hover:border-[#f5a623] hover:text-[#f5a623]"
          >
            <span>{t.cta}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {/* Right 2x2 Asymmetric Grid (hidden on mobile per user request) */}
        <div className="hidden gap-4 md:grid md:grid-cols-2">
          {t.cards.map(({ num, title, body }, idx) => {
            const Icon = CARD_ICONS[idx] ?? Flame;
            return (
              <article
                key={num}
                className={`relative overflow-hidden rounded-[3px] border border-white/10 bg-[#28231f] p-6 transition-colors duration-150 hover:border-[#f5a623]/40 ${
                  idx === 1 ? 'sm:mt-7' : idx === 2 ? 'sm:-mt-7' : ''
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5a623]/15 text-[#f5a623]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-display tabular-nums text-2xl tracking-wider text-white/25">
                    {num}
                  </span>
                </div>

                <h3 className="font-display text-[1.6rem] uppercase leading-[1.08] text-[#f8f4ec]">
                  {title}
                </h3>

                <p className="mt-2.5 max-w-[270px] text-[13.5px] leading-[1.6] text-[#c1b9ae]">
                  {body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
