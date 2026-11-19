import { ArrowUpRight, Clock, MapPin, MessageCircle } from 'lucide-react';
import { BRAND_IMAGES, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../data/catalog';
import type { Translations } from '../i18n/translations';

interface LocationAndFooterProps {
  t: Translations['location'];
  onOpenAdmin: () => void;
}

export function LocationAndFooter({ t, onOpenAdmin }: LocationAndFooterProps) {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Location Section */}
      <section id="localizacao" className="bg-[#171514] py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-stretch gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.17em] text-[#f5a623]">
                <span className="h-[2px] w-6 bg-[#f5a623]" aria-hidden="true" />
                <span>{t.eyebrow}</span>
              </div>

              <h2 className="font-display text-balance mt-3 text-[clamp(2.6rem,5vw,4.3rem)] uppercase leading-[0.95] text-[#f8f4ec]">
                {t.titleLine1}
                <br />
                {t.titleLine2Prefix}
                <span className="text-[#f5a623]">{t.titleLine2Accent}</span>
              </h2>

              <p className="mt-4 max-w-[440px] text-[15px] leading-[1.7] text-[#c1b9ae]">
                {t.lede}
              </p>

              <div className="mt-6 grid gap-3">
                <div className="flex items-center gap-3.5 rounded-[3px] border border-white/10 bg-[#211d1a] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5a623]/15 text-[#f5a623]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#a99f92]">
                      {t.regionLabel}
                    </span>
                    <strong className="text-sm font-bold text-[#f8f4ec]">
                      Maceió — AL
                    </strong>
                  </div>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-[3px] border border-white/10 bg-[#211d1a] p-4 transition-colors duration-150 hover:border-[#f5a623]/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5a623]/15 text-[#f5a623]">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#a99f92]">
                      {t.whatsappLabel}
                    </span>
                    <strong className="tabular-nums text-sm font-bold text-[#f8f4ec]">
                      {WHATSAPP_DISPLAY}
                    </strong>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 rounded-[3px] border border-white/10 bg-[#211d1a] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5a623]/15 text-[#f5a623]">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#a99f92]">
                      {t.hoursLabel}
                    </span>
                    <strong className="text-sm font-bold text-[#f8f4ec]">
                      {t.hoursValue}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-[3px] bg-[#f5a623] px-6 text-xs font-extrabold uppercase tracking-[0.07em] text-[#23190e] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#ffc34f]"
              >
                <span>{t.cta}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Embedded Map of Maceió */}
          <div className="min-h-[380px] overflow-hidden rounded-[3px] border border-white/15 bg-[#25201d]">
            <iframe
              title={t.mapTitle}
              src="https://maps.google.com/maps?q=Macei%C3%B3%2C%20AL&t=&z=12&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[380px] w-full border-0 grayscale-[0.55] contrast-[0.95]"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-[#f5a623] py-14 text-[#21180f]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-[clamp(2.4rem,5vw,3.9rem)] uppercase leading-[0.92] text-[#21180f]">
              {t.finalCtaTitle}
            </h2>
            <p className="mt-2 text-sm font-medium text-[#493820]">
              {t.finalCtaBody}
            </p>
          </div>
          <a
            href="#cardapio"
            className="inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-[3px] bg-[#211d1a] px-6 text-xs font-extrabold uppercase tracking-[0.07em] text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#322c27]"
          >
            <span>{t.finalCtaButton}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#100f0e] pb-8 pt-12 text-[#cfc5b9]">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center">
            <div>
              <img
                src={BRAND_IMAGES.logo}
                alt="Menk’s Burger"
                referrerPolicy="no-referrer"
                className="h-[74px] w-[160px] object-contain object-left"
              />
              <p className="mt-2 text-xs italic text-[#cfc5b9]">
                Il gusto di strada, il calore di casa.
              </p>
            </div>

            <nav
              aria-label={t.footerNavAria}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-[#cfc5b9]"
            >
              <a href="#inicio" className="transition-colors hover:text-[#f5a623]">
                {t.footerHome}
              </a>
              <a href="#cardapio" className="transition-colors hover:text-[#f5a623]">
                {t.footerMenu}
              </a>
              <a href="#como-pedir" className="transition-colors hover:text-[#f5a623]">
                {t.footerHowToOrder}
              </a>
              <a href="#localizacao" className="transition-colors hover:text-[#f5a623]">
                {t.footerLocation}
              </a>
              <button
                type="button"
                onClick={onOpenAdmin}
                className="cursor-pointer transition-colors hover:text-[#f5a623]"
              >
                {t.footerAdmin}
              </button>
            </nav>
          </div>

          <div className="flex flex-col justify-between gap-3 pt-5 text-[11.5px] text-[#8b8178] sm:flex-row">
            <span>
              © {currentYear} {t.copyrightSuffix}
            </span>
            <span>{t.footerClosing}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
