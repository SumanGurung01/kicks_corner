export interface Sneaker {
  name: string;
  image: string;
  color: string;
  sizes: number[];
  silhouette: string;
  description: string;
  price: number;
  gender: string[];
  id: number;
}

export interface Order extends Sneaker {
  order_id: string;
  size: number;
}

export interface OrderDatabase {
  item: Order[];
  time: Date;
}
