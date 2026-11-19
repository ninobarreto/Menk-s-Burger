import { useEffect, useState } from 'react';
import { Globe, Menu, ShoppingBag, X } from 'lucide-react';
import { BRAND_IMAGES } from '../data/catalog';
import type { Translations } from '../i18n/translations';
import type { Locale } from '../types';

interface HeaderProps {
  cartCount: number;
  locale: Locale;
  t: Translations['nav'];
  onChangeLocale: (locale: Locale) => void;
  onOpenCart: () => void;
}

export function Header({
  cartCount,
  locale,
  t,
  onChangeLocale,
  onOpenCart,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#cardapio', label: t.menu },
    { href: '#como-pedir', label: t.howToOrder },
    { href: '#sobre', label: t.about },
    { href: '#diferenciais', label: t.experience },
    { href: '#localizacao', label: t.location },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b border-white/10 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#171514]/95 backdrop-blur-md'
          : 'bg-[#171514]/80 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1180px] items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:gap-8">
        {/* Zone 1: Single Brand Wordmark / Logo */}
        <a
          href="#inicio"
          aria-label={t.homeAria}
          className="flex shrink-0 items-center whitespace-nowrap"
        >
          <img
            src={BRAND_IMAGES.logo}
            alt="Logo Menk’s Burger"
            referrerPolicy="no-referrer"
            className="h-[44px] w-[108px] object-contain object-left sm:h-[54px] sm:w-[148px]"
          />
        </a>

        {/* Zone 2: 5 Concise Single-Line Nav Links + Language Switch */}
        <nav
          aria-label={t.mainNavAria}
          className="hidden items-center gap-6 lg:flex"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 text-[13px] font-semibold tracking-wide text-[#eee7dd] transition-colors duration-150 hover:text-[#f5a623] hover:underline hover:underline-offset-4"
            >
              {item.label}
            </a>
          ))}

          <span
            aria-hidden="true"
            className="h-4 w-px shrink-0 bg-white/15"
          />

          <div
            role="group"
            aria-label={t.languageLabel}
            className="inline-flex shrink-0 items-center gap-1 rounded-[3px] border border-white/15 bg-[#211d1a] p-0.5"
          >
            <Globe
              className="ml-1.5 mr-0.5 h-3.5 w-3.5 text-[#c1b9ae]"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => onChangeLocale('it')}
              aria-pressed={locale === 'it'}
              title="Italiano"
              className={`whitespace-nowrap rounded-[2px] px-2 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] transition-colors duration-150 ${
                locale === 'it'
                  ? 'bg-[#f5a623] text-[#23190e]'
                  : 'text-[#eee7dd] hover:text-[#f5a623]'
              }`}
            >
              IT
            </button>
            <button
              type="button"
              onClick={() => onChangeLocale('pt')}
              aria-pressed={locale === 'pt'}
              title="Português (Brasil)"
              className={`whitespace-nowrap rounded-[2px] px-2 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] transition-colors duration-150 ${
                locale === 'pt'
                  ? 'bg-[#f5a623] text-[#23190e]'
                  : 'text-[#eee7dd] hover:text-[#f5a623]'
              }`}
            >
              PT-BR
            </button>
          </div>
        </nav>

        {/* Zone 3: Mobile Language Switch + Primary Action + Mobile Menu Toggle */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Visible Language Switcher on Mobile / Tablet */}
          <div
            role="group"
            aria-label={t.languageLabel}
            className="inline-flex shrink-0 items-center gap-0.5 rounded-[3px] border border-white/15 bg-[#211d1a] p-0.5 lg:hidden"
          >
            <button
              type="button"
              onClick={() => onChangeLocale('it')}
              aria-pressed={locale === 'it'}
              title="Italiano"
              className={`whitespace-nowrap rounded-[2px] px-2 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.05em] transition-colors duration-150 ${
                locale === 'it'
                  ? 'bg-[#f5a623] text-[#23190e]'
                  : 'text-[#eee7dd] hover:text-[#f5a623]'
              }`}
            >
              IT
            </button>
            <button
              type="button"
              onClick={() => onChangeLocale('pt')}
              aria-pressed={locale === 'pt'}
              title="Português (Brasil)"
              className={`whitespace-nowrap rounded-[2px] px-2 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.05em] transition-colors duration-150 ${
                locale === 'pt'
                  ? 'bg-[#f5a623] text-[#23190e]'
                  : 'text-[#eee7dd] hover:text-[#f5a623]'
              }`}
            >
              PT
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`${t.myOrder} (${cartCount})`}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[3px] bg-[#f5a623] px-2.5 text-xs font-extrabold uppercase tracking-[0.07em] text-[#23190e] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#ffc34f] sm:gap-2 sm:px-4"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{t.myOrder}</span>
            <span className="tabular-nums inline-flex min-w-[20px] items-center justify-center rounded-[2px] bg-[#23190e] px-1.5 py-0.5 text-[11px] font-extrabold text-[#f5a623]">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] border border-white/20 text-[#f8f4ec] transition-colors hover:border-[#f5a623] hover:text-[#f5a623] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label={t.mobileNavAria}
          className="border-t border-white/10 bg-[#171514]/98 px-6 py-4 lg:hidden"
        >
          <div className="flex flex-col divide-y divide-white/10">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-semibold text-[#eee7dd] transition-colors hover:text-[#f5a623]"
              >
                {item.label}
              </a>
            ))}

            <div className="flex items-center justify-between pt-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#c1b9ae]">
                <Globe className="h-4 w-4 text-[#f5a623]" aria-hidden="true" />
                <span>{t.languageLabel}</span>
              </span>
              <div
                role="group"
                aria-label={t.languageLabel}
                className="inline-flex items-center gap-1 rounded-[3px] border border-white/15 bg-[#211d1a] p-1"
              >
                <button
                  type="button"
                  onClick={() => onChangeLocale('it')}
                  aria-pressed={locale === 'it'}
                  className={`whitespace-nowrap rounded-[2px] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] transition-colors ${
                    locale === 'it'
                      ? 'bg-[#f5a623] text-[#23190e]'
                      : 'text-[#eee7dd] hover:text-[#f5a623]'
                  }`}
                >
                  Italiano
                </button>
                <button
                  type="button"
                  onClick={() => onChangeLocale('pt')}
                  aria-pressed={locale === 'pt'}
                  className={`whitespace-nowrap rounded-[2px] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] transition-colors ${
                    locale === 'pt'
                      ? 'bg-[#f5a623] text-[#23190e]'
                      : 'text-[#eee7dd] hover:text-[#f5a623]'
                  }`}
                >
                  Português (BR)
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
