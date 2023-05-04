export interface Cart {
  items: Array<CartItem>;
}

export interface CartItem {
  product: string;
  name: string;
  sale: number;
  quantityRemain: number;
  price: number;
  quantity: number;
  id: number;
}
