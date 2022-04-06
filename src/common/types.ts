interface BaseItem {
  id: number;
  updated_at: string;
  created_at: string;
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
}

export interface Cart extends BaseItem {}
