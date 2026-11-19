import type {
  CartItem,
  CustomerInfo,
  OrderRecord,
  OrderRecordItem,
  Product,
  ProductCategory,
} from '../types';

export const WHATSAPP_NUMBER = '5571992129125';
export const WHATSAPP_DISPLAY = '(71) 99212-9125';

export const BRAND_IMAGES = {
  logo: '/assets/menks/logo.jpg',
  wall: '/assets/menks/wall.jpg',
  cut: '/assets/menks/cut.jpg',
  full: '/assets/menks/full.jpg',
  hand: '/assets/menks/hand.jpg',
} as const;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Burgers',
  'Pinsas',
  'Street Food',
  'Acompanhamentos',
  'Bebidas',
];

export const RESTAURANT_TABLES = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
] as const;

export function normalizeTableNumber(raw: string): string {
  const cleaned = raw
    .trim()
    .replace(/^(mesa|tavolo)\s*/i, '')
    .trim();
  if (!cleaned) return '';
  if (/^\d+$/.test(cleaned)) {
    const num = Number(cleaned);
    if (num >= 1 && num <= 9) return `0${num}`;
    return String(num);
  }
  return cleaned.toUpperCase();
}

export const SEED_CATALOG: Product[] = [
  {
    id: 'mb-1',
    name: 'Menk’s Classic',
    category: 'Burgers',
    badge: 'Burger',
    description:
      'Pão macio com gergelim, blend artesanal suculento, queijo derretido e vegetais frescos da casa.',
    image: BRAND_IMAGES.full,
    price: 34.9,
  },
  {
    id: 'mb-2',
    name: 'Double Trouble',
    category: 'Burgers',
    badge: 'Duplo',
    description:
      'Dois blends selados na chapa, queijo duplo bem derretido e molho especial Menk’s.',
    image: BRAND_IMAGES.cut,
    price: 44.9,
  },
  {
    id: 'mb-3',
    name: 'Cheese Burger',
    category: 'Burgers',
    badge: 'Clássico',
    description:
      'A receita direta ao ponto: carne grelhada, queijo generoso e pão tostado na manteiga.',
    image: BRAND_IMAGES.hand,
    price: 28.9,
  },
  {
    id: 'mb-4',
    name: 'Pinsa da Casa',
    category: 'Pinsas',
    badge: 'Pinsa',
    description:
      'Massa leve e crocante estilo romana com cobertura artesanal da casa. Consulte sabores do dia.',
    image: BRAND_IMAGES.logo,
    price: 42.0,
  },
  {
    id: 'mb-5',
    name: 'Pinsa Especial',
    category: 'Pinsas',
    badge: 'Especial',
    description:
      'Nossa pinsa de longa fermentação com seleção especial de ingredientes frescos e toque italiano.',
    image: BRAND_IMAGES.wall,
    price: 48.0,
  },
  {
    id: 'mb-6',
    name: 'Batata Crocante',
    category: 'Acompanhamentos',
    badge: 'Acompanhamento',
    description:
      'Porção dourada e sequinha, temperada na hora para dividir à mesa.',
    image: BRAND_IMAGES.full,
    price: 18.9,
  },
  {
    id: 'mb-7',
    name: 'Street Dog',
    category: 'Street Food',
    badge: 'Street food',
    description:
      'Cachorro-quente artesanal com pegada de rua, pão macio e molho da casa.',
    image: BRAND_IMAGES.hand,
    price: 24.9,
  },
  {
    id: 'mb-8',
    name: 'Refrigerante',
    category: 'Bebidas',
    badge: 'Gelado',
    description:
      'Lata bem gelada. Consulte os sabores disponíveis com a equipe no WhatsApp.',
    image: BRAND_IMAGES.wall,
    price: 7.5,
  },
  {
    id: 'mb-9',
    name: 'Cerveja',
    category: 'Bebidas',
    badge: 'Bebidas',
    description:
      'Long neck gelada para acompanhar o burger ou a pinsa. Consulte rótulos disponíveis.',
    image: BRAND_IMAGES.logo,
    price: 12.0,
  },
];

export const DEFAULT_CUSTOMER: CustomerInfo = {
  mode: 'mesa',
  tableNumber: '',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  street: '',
  number: '',
  neighborhood: '',
  complement: '',
  orderNotes: '',
};

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatMoney(value: number | null | undefined): string {
  return brlFormatter.format(Number(value) || 0);
}

export function formatPhoneMask(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length > 10) {
    return digits.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, (_, a, b, c) =>
      `(${a}) ${b}${c ? `-${c}` : ''}`
    );
  }
  if (digits.length > 6) {
    return digits.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, (_, a, b, c) =>
      `(${a}) ${b}${c ? `-${c}` : ''}`
    );
  }
  if (digits.length > 2) {
    return digits.replace(/^(\d{2})(\d{0,5})/, (_, a, b) => `(${a}) ${b}`);
  }
  return digits ? `(${digits}` : '';
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const SEED_CATALOG_MAP: Record<string, Product> = Object.fromEntries(
  SEED_CATALOG.map((item) => [item.id, item])
);

export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function buildWhatsAppMessage(
  cart: CartItem[],
  catalog: Product[],
  customer: CustomerInfo,
  locale: 'pt' | 'it' = 'it',
  getItemName?: (product: Product) => string,
  existingProtocol?: string
): { protocol: string; message: string; url: string; record: OrderRecord } {
  const now = new Date();
  const protocol =
    existingProtocol || `MNK-${now.toISOString().replace(/\D/g, '').slice(2, 14)}`;

  let total = 0;
  const recordItems: OrderRecordItem[] = [];
  const itemLines = cart
    .map((entry, idx) => {
      const prod = catalog.find((p) => p.id === entry.id);
      if (!prod || !prod.price) return null;
      const lineTotal = prod.price * entry.qty;
      total += lineTotal;
      const displayName = getItemName ? getItemName(prod) : prod.name;
      recordItems.push({
        productId: prod.id,
        name: displayName,
        category: prod.category,
        qty: entry.qty,
        unitPrice: prod.price,
        lineTotal,
      });
      return `${idx + 1}. ${displayName} — ${entry.qty} x ${formatMoney(prod.price)} = ${formatMoney(lineTotal)}`;
    })
    .filter(Boolean)
    .join('\n');

  const isIt = locale === 'it';
  const isTable = customer.mode === 'mesa';
  const isDelivery = customer.mode === 'delivery';
  const cleanTable = normalizeTableNumber(customer.tableNumber);
  const formattedAddress = isDelivery
    ? `${customer.street.trim()}, ${customer.number.trim()} — ${customer.neighborhood.trim()}${
        customer.complement.trim() ? ` · ${customer.complement.trim()}` : ''
      }`
    : '';

  const addressLabel = isIt ? 'Indirizzo' : 'Endereço';
  const addressBlock = formattedAddress ? `\n${addressLabel}: ${formattedAddress}` : '';

  const modeLineIt = isTable
    ? `SERVIZIO AL TAVOLO (Tavolo ${cleanTable})`
    : isDelivery
      ? 'CONSEGNA A DOMICILIO (DELIVERY)'
      : 'RITIRO IN SEDE';

  const modeLinePt = isTable
    ? `CONSUMO NA MESA (Mesa ${cleanTable})`
    : isDelivery
      ? 'ENTREGA POR DELIVERY'
      : 'RETIRADA NO ESTABELECIMENTO';

  const paymentLineIt = isTable
    ? 'Pagamento al tavolo al termine del servizio.'
    : 'Pagamento tramite PIX. Sono consapevole che l’ordine verrà rilasciato solo dopo l’invio e la conferma della ricevuta sul WhatsApp del locale.';

  const paymentLinePt = isTable
    ? 'Pagamento na mesa ao final do atendimento.'
    : 'Pagamento via PIX. Estou ciente de que a liberação ocorre mediante envio e confirmação do comprovante no WhatsApp da casa.';

  const phoneLine = customer.customerPhone.trim()
    ? `WhatsApp: ${customer.customerPhone.trim()}`
    : null;
  const emailLine = customer.customerEmail.trim()
    ? `E-mail: ${customer.customerEmail.trim()}`
    : null;

  const message = isIt
    ? [
        '*ORDINE MENK’S BURGER*',
        `Protocollo: ${protocol}`,
        `Data/ora: ${now.toLocaleString('it-IT')}`,
        `Modalità: ${modeLineIt}`,
        '',
        '*PRODOTTI*',
        itemLines,
        '',
        `*TOTALE ORDINE: ${formatMoney(total)}*`,
        '',
        '*CLIENTE*',
        `Nome: ${customer.customerName.trim()}`,
        ...(isTable ? [`Tavolo: ${cleanTable}`] : []),
        ...(phoneLine ? [phoneLine] : []),
        ...(emailLine ? [emailLine] : []),
        ...(addressBlock ? [addressBlock.trim()] : []),
        `Note: ${customer.orderNotes.trim() || '—'}`,
        '',
        paymentLineIt,
      ].join('\n')
    : [
        '*PEDIDO MENK’S BURGER*',
        `Protocolo: ${protocol}`,
        `Data/hora: ${now.toLocaleString('pt-BR')}`,
        `Modalidade: ${modeLinePt}`,
        '',
        '*ITENS*',
        itemLines,
        '',
        `*VALOR TOTAL: ${formatMoney(total)}*`,
        '',
        '*CLIENTE*',
        `Nome: ${customer.customerName.trim()}`,
        ...(isTable ? [`Mesa: ${cleanTable}`] : []),
        ...(phoneLine ? [phoneLine] : []),
        ...(emailLine ? [emailLine] : []),
        ...(addressBlock ? [addressBlock.trim()] : []),
        `Observações: ${customer.orderNotes.trim() || '—'}`,
        '',
        paymentLinePt,
      ].join('\n');

  const record: OrderRecord = {
    id: protocol,
    protocol,
    createdAt: now.toISOString(),
    dateKey: getLocalDateKey(now),
    mode: customer.mode,
    tableNumber: isTable ? cleanTable : '',
    customerName: customer.customerName.trim(),
    customerPhone: customer.customerPhone.trim(),
    customerEmail: customer.customerEmail.trim(),
    address: formattedAddress,
    notes: customer.orderNotes.trim(),
    items: recordItems,
    total,
    paymentMethod: isTable ? 'mesa' : 'pix',
    paymentStatus: 'pendente',
    paidAt: null,
  };

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return { protocol, message, url, record };
}
