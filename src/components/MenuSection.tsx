import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, Minus, Pencil, Plus, UtensilsCrossed } from 'lucide-react';
import {
  BRAND_IMAGES,
  formatMoney,
  PRODUCT_CATEGORIES,
  SEED_CATALOG_MAP,
} from '../data/catalog';
import {
  getLocalizedProduct,
  type Translations,
} from '../i18n/translations';
import type { Locale, Product, ProductCategory } from '../types';

interface MenuSectionProps {
  catalog: Product[];
  locale: Locale;
  t: Translations['menu'];
  onAddToCart: (productId: string, qty: number) => void;
  onOpenAdmin: (productId?: string) => void;
}

type CategoryFilter = 'Todos' | ProductCategory;

interface ProductCardProps {
  product: Product;
  locale: Locale;
  t: Translations['menu'];
  onAddToCart: (productId: string, qty: number) => void;
  onEdit: (productId: string) => void;
}

function ProductCard({
  product,
  locale,
  t,
  onAddToCart,
  onEdit,
}: ProductCardProps) {
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const localized = getLocalizedProduct(product, locale, SEED_CATALOG_MAP);
  const categoryLabel = t.categories[product.category] ?? product.category;

  const hasPrice = typeof product.price === 'number' && product.price > 0;
  const isLogoImage =
    !product.image ||
    product.image === BRAND_IMAGES.logo ||
    /logo\.jpg$/i.test(product.image);

  const handleAdd = () => {
    if (!hasPrice) return;
    onAddToCart(product.id, qty);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 950);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-[3px] bg-[#f7f3eb] text-[#211d1a] shadow-[0_8px_22px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:-translate-y-1">
      {/* Uniform 225px Media Container */}
      <div className="relative h-[225px] w-full overflow-hidden bg-[#28231f]">
        {!imgFailed ? (
          <img
            src={product.image || BRAND_IMAGES.logo}
            alt={localized.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${
              isLogoImage ? 'object-contain p-5' : 'object-cover'
            }`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#28231f] to-[#171514] p-4 text-center text-[#c1b9ae]">
            <UtensilsCrossed className="h-7 w-7 text-[#f5a623]" aria-hidden="true" />
            <span className="font-display text-lg uppercase tracking-wide text-[#f8f4ec]">
              {localized.name}
            </span>
          </div>
        )}

        {/* Single crisp corner tag */}
        {(localized.badge || categoryLabel) && (
          <span className="font-display absolute left-3 top-3 -rotate-2 bg-[#f5a623] px-2.5 py-1 text-[15px] uppercase leading-none tracking-wide text-[#21180e] shadow-sm">
            {localized.badge || categoryLabel}
          </span>
        )}

        {/* Quick Edit button for Owner */}
        <button
          type="button"
          onClick={() => onEdit(product.id)}
          aria-label={`${t.editProduct}: ${localized.name}`}
          title={t.editProduct}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#171514]/85 text-white opacity-90 transition-opacity duration-150 hover:bg-[#171514] hover:text-[#f5a623] sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#7c7368]">
          {categoryLabel}
        </div>

        <h3 className="font-display mt-1 text-[1.85rem] uppercase leading-[0.98] text-[#211d1a]">
          {localized.name}
        </h3>

        <p className="mt-2 min-h-[46px] flex-1 text-[13px] leading-[1.55] text-[#5e564e]">
          {localized.description || t.defaultDesc}
        </p>

        {/* Price + Quantity + Add Row */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#e4ddd2] pt-3.5">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#7c7368]">
              {hasPrice ? t.priceLabel : t.valueLabel}
            </span>
            <span className="font-display tabular-nums text-[1.65rem] leading-none text-[#a23e1e]">
              {hasPrice ? formatMoney(product.price) : t.onRequest}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {hasPrice && (
              <div className="flex h-9 items-center rounded-[2px] border border-[#d7d0c5] bg-white/60">
                <button
                  type="button"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  aria-label={`${t.decreaseQty} ${localized.name}`}
                  className="flex h-full w-8 items-center justify-center text-[#342d27] transition-colors hover:bg-[#ebe4d9]"
                >
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <output
                  aria-label={t.quantity}
                  className="tabular-nums min-w-[24px] text-center text-xs font-extrabold text-[#211d1a]"
                >
                  {qty}
                </output>
                <button
                  type="button"
                  onClick={() => setQty((prev) => prev + 1)}
                  aria-label={`${t.increaseQty} ${localized.name}`}
                  className="flex h-full w-8 items-center justify-center text-[#342d27] transition-colors hover:bg-[#ebe4d9]"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            )}

            <button
              type="button"
              disabled={!hasPrice}
              onClick={handleAdd}
              className={`inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[2px] px-3.5 text-[11px] font-extrabold uppercase tracking-[0.06em] transition-colors duration-150 ${
                !hasPrice
                  ? 'cursor-not-allowed bg-[#8f887f] text-white'
                  : justAdded
                    ? 'bg-[#211d1a] text-[#f5a623]'
                    : 'bg-[#638b25] text-white hover:bg-[#6f9c2a]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.added}</span>
                </>
              ) : hasPrice ? (
                t.add
              ) : (
                t.askTeam
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function MenuSection({
  catalog,
  locale,
  t,
  onAddToCart,
  onOpenAdmin,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Todos');

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: catalog.length };
    for (const cat of PRODUCT_CATEGORIES) {
      counts[cat] = catalog.filter((item) => item.category === cat).length;
    }
    return counts;
  }, [catalog]);

  const filteredCatalog = useMemo(() => {
    if (activeCategory === 'Todos') return catalog;
    return catalog.filter((item) => item.category === activeCategory);
  }, [catalog, activeCategory]);

  const filterOptions: CategoryFilter[] = ['Todos', ...PRODUCT_CATEGORIES];

  return (
    <section id="cardapio" className="bg-[#211d1a] py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px] px-6">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.17em] text-[#f5a623]">
              <span className="h-[2px] w-6 bg-[#f5a623]" aria-hidden="true" />
              <span>{t.eyebrow}</span>
            </div>
            <h2 className="font-display text-balance mt-3 text-[clamp(2.6rem,5vw,4.3rem)] uppercase leading-[0.95] text-[#f8f4ec]">
              {t.titlePrefix}
              <span className="text-[#f5a623]">{t.titleAccent}</span>
            </h2>
          </div>

          <p className="max-w-[320px] text-[13px] leading-[1.6] text-[#dacbbb]">
            {t.subtitle}
          </p>
        </div>

        {/* Owner Management Bar */}
        <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-[3px] border border-[#4a4036] bg-[#171514] px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-xs leading-relaxed text-[#c4b8a9]">
            {t.ownerPrompt}
          </p>
          <button
            type="button"
            onClick={() => onOpenAdmin()}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[3px] border border-white/40 bg-[#211d1a] px-4 text-[11px] font-extrabold uppercase tracking-[0.07em] text-white transition-colors duration-150 hover:border-[#f5a623] hover:text-[#f5a623]"
          >
            <span>{t.ownerButton}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label={t.filterAria}
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          {filterOptions.map((cat) => {
            const count = categoryCounts[cat] ?? 0;
            const isActive = activeCategory === cat;
            const displayLabel =
              cat === 'Todos' ? t.allCategory : t.categories[cat];
            return (
              <button
                key={cat}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-[3px] px-4 text-xs font-bold tracking-wide transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#f5a623] text-[#23190e]'
                    : 'border border-white/15 bg-[#171514]/70 text-[#e6ddd2] hover:border-[#f5a623]/60 hover:text-[#f5a623]'
                }`}
              >
                <span>{displayLabel}</span>
                <span
                  className={`tabular-nums text-[11px] ${
                    isActive ? 'text-[#23190e]/80' : 'text-[#c1b9ae]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredCatalog.length > 0 ? (
          <div
            aria-live="polite"
            className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCatalog.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                locale={locale}
                t={t}
                onAddToCart={onAddToCart}
                onEdit={(id) => onOpenAdmin(id)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-[3px] border border-white/10 bg-[#171514] p-10 text-center">
            <p className="font-display text-2xl uppercase text-[#f8f4ec]">
              {t.emptyTitle}
            </p>
            <p className="mt-2 text-sm text-[#c1b9ae]">{t.emptyBody}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveCategory('Todos')}
                className="h-10 rounded-[3px] bg-[#f5a623] px-5 text-xs font-extrabold uppercase tracking-[0.07em] text-[#23190e] hover:bg-[#ffc34f]"
              >
                {t.viewAll}
              </button>
              <button
                type="button"
                onClick={() => onOpenAdmin()}
                className="h-10 rounded-[3px] border border-white/30 px-5 text-xs font-extrabold uppercase tracking-[0.07em] text-white hover:border-[#f5a623] hover:text-[#f5a623]"
              >
                {t.createProduct}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
