export type Locale = 'pt' | 'it';

export type ProductCategory =
  | 'Burgers'
  | 'Pinsas'
  | 'Street Food'
  | 'Acompanhamentos'
  | 'Bebidas';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  badge: string;
  description: string;
  image: string;
  price: number | null;
}

export interface CartItem {
  id: string;
  qty: number;
}

export type OrderMode = 'retirada' | 'delivery' | 'mesa';

export interface CustomerInfo {
  mode: OrderMode;
  tableNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  orderNotes: string;
}

export type OrderPaymentStatus = 'pago' | 'pendente';

export interface OrderRecordItem {
  productId: string;
  name: string;
  category: ProductCategory;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderRecord {
  id: string;
  protocol: string;
  createdAt: string;
  dateKey: string;
  mode: OrderMode;
  tableNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  notes: string;
  items: OrderRecordItem[];
  total: number;
  paymentMethod: 'pix' | 'mesa';
  paymentStatus: OrderPaymentStatus;
  paidAt: string | null;
}

export interface ToastMessage {
  id: number;
  text: string;
  tone: 'success' | 'info' | 'error';
}
