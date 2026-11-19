import { ArrowUpRight } from 'lucide-react';
import { BRAND_IMAGES } from '../data/catalog';
import type { Translations } from '../i18n/translations';

const TICKER_ITEMS = [
  'BURGER',
  'PINSA',
  'STREET FOOD',
  'IL GUSTO DI STRADA',
  'BURGER',
  'PINSA',
];

interface HeroSectionProps {
  t: Translations['hero'];
}

export function HeroSection({ t }: HeroSectionProps) {
  return (
    <>
      <section
        id="inicio"
        className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-[#171514] pb-16 pt-[124px] lg:min-h-[720px] lg:pt-[132px]"
      >
        {/* Background photography with measured high-contrast scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url('${BRAND_IMAGES.cut}')` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#0f0c0b]/96 via-[#1e1612]/90 to-[#17110e]/50"
        />

        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12">
          {/* Left copy column */}
          <div className="max-w-[610px]">
            <p className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#f8f4ec]/90">
              <span className="text-[#f5a623]">Menk’s Burger</span>
              <span aria-hidden="true" className="text-white/40">
                ·
              </span>
              <span>{t.country}</span>
            </p>

            <h1 className="font-display text-balance mt-5 text-[clamp(3.6rem,7.2vw,6.4rem)] font-normal uppercase leading-[0.94] tracking-[0.015em] text-[#f8f4ec]">
              {t.headlineLine1}
              <br />
              {t.headlineLine2Prefix}
              <em className="not-italic text-[#f5a623]">{t.headlineLine2Accent}</em>
            </h1>

            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.75] text-[#e6ddd2] sm:text-base">
              {t.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <a
                href="#cardapio"
                className="inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-[3px] bg-[#f5a623] px-6 text-xs font-extrabold uppercase tracking-[0.07em] text-[#23190e] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#ffc34f]"
              >
                <span>{t.ctaPrimary}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#cardapio"
                className="inline-flex h-12 shrink-0 items-center whitespace-nowrap rounded-[3px] border border-white/45 bg-[#191615]/55 px-6 text-xs font-extrabold uppercase tracking-[0.07em] text-white transition-colors duration-150 hover:border-[#f5a623] hover:text-[#f5a623]"
              >
                {t.ctaSecondary}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-semibold tracking-wide text-[#f5eadb]/85">
              <span>{t.trust1}</span>
              <span aria-hidden="true" className="text-[#f5a623]">
                ·
              </span>
              <span>{t.trust2}</span>
              <span aria-hidden="true" className="text-[#f5a623]">
                ·
              </span>
              <span>{t.trust3}</span>
            </div>
          </div>

          {/* Right visual showcase column */}
          <div className="relative mx-auto flex w-full max-w-[440px] items-center justify-center py-4">
            <img
              src="/assets/aistudio/img_capa_banner_9985bece.jpg"
              alt={t.posterAlt}
              referrerPolicy="no-referrer"
              className="aspect-[4/5] w-full max-w-[410px] -rotate-2 rounded-[3px] border-[8px] border-[#f5eee2] bg-[#171514] object-cover object-center shadow-[0_22px_65px_rgba(8,6,5,0.65)]"
            />

            <div className="font-display absolute bottom-0 left-0 z-10 -rotate-3 bg-[#a83b2f] px-5 py-3 text-[1.45rem] uppercase leading-none tracking-[0.03em] text-white shadow-[0_12px_28px_rgba(0,0,0,0.45)] sm:-left-3 sm:text-[1.7rem]">
              Burger • Pinsa • Street food
            </div>
          </div>
        </div>

        <span className="pointer-events-none absolute bottom-4 right-6 hidden text-[11px] italic tracking-[0.14em] text-white/60 md:block">
          IL GUSTO DI STRADA, IL CALORE DI CASA.
        </span>
      </section>

      {/* Brand Strip Ticker */}
      <div
        aria-hidden="true"
        className="w-full overflow-hidden bg-[#f5a623] py-3 text-[#21180e]"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-around gap-8 whitespace-nowrap px-6 font-display text-[1.35rem] leading-none tracking-[0.08em]">
          {TICKER_ITEMS.map((label, idx) => (
            <span key={`${label}-${idx}`} className="inline-flex items-center gap-7">
              <span>{label}</span>
              <span className="text-sm text-[#8e2f22]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
