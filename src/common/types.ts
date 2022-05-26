export interface BaseItem {
  id: number;
  updated_at: number;
  created_at: number;
}

export interface User extends BaseItem {
  username: string;
  name: string;
  last_name: string;
  mail: string;
}

export interface Item extends BaseItem {
  quantity: number;
  name: string;
  description: number;
  img_path: string;
  price: number;
  category_id: number;
  category: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface OrderItem extends Omit<Item, 'description'> {}

export interface Order extends BaseItem {
  user_id: number;
}

export interface Cart extends BaseItem {}
