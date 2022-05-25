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
  name: number;
  description: number;
  img_path: string;
  price: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Cart extends BaseItem {}
