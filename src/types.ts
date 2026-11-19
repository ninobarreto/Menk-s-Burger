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

export type OrderMode = 'retirada' | 'delivery';

export interface CustomerInfo {
  mode: OrderMode;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  orderNotes: string;
}

export interface ToastMessage {
  id: number;
  text: string;
  tone: 'success' | 'info' | 'error';
}
