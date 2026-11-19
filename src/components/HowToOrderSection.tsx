import type { Translations } from '../i18n/translations';

interface HowToOrderSectionProps {
  t: Translations['steps'];
}

export function HowToOrderSection({ t }: HowToOrderSectionProps) {
  return (
    <section
      id="como-pedir"
      className="relative overflow-hidden bg-[#a83b2f] py-20 text-[#f8f4ec] lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <div className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.17em] text-[#ffd08a]">
          <span className="h-[2px] w-6 bg-[#ffd08a]" aria-hidden="true" />
          <span>{t.eyebrow}</span>
        </div>

        <h2 className="font-display text-balance mt-3 text-[clamp(2.6rem,5vw,4.3rem)] uppercase leading-[0.95] text-white">
          {t.titleLine1}
          <br />
          {t.titleLine2}
        </h2>

        <p className="mt-4 max-w-[540px] text-[15px] leading-[1.7] text-[#f6ded7]">
          {t.lede}
        </p>

        <div className="mt-11 grid grid-cols-1 divide-y divide-white/30 border-t border-white/40 md:grid-cols-3 md:divide-x md:divide-y-0">
          {t.items.map((step, idx) => (
            <article
              key={step.num}
              className={`py-7 md:py-6 ${
                idx === 0
                  ? 'md:pr-7'
                  : idx === 1
                    ? 'md:px-7'
                    : 'md:pl-7'
              }`}
            >
              <span className="font-display tabular-nums block text-[3.1rem] leading-none text-[#ffd08a]">
                {step.num}
              </span>
              <h3 className="font-display mt-3 max-w-[250px] text-[1.75rem] uppercase leading-[1.04] text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[310px] text-[13.5px] leading-[1.6] text-[#f7ddd5]">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
