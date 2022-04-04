export interface User {
  id: number;
  created_at: string;
  last_modified: string;
  username: string;
  name: string;
  last_name: string;
  mail: string;
}

export interface Item {
  id: number;
  last_modified: string;
  quantity: number;
  name: number;
  description: number;
  created_at: string;
}

export interface Cart {
  id: number;
  created_at: string;
  last_modified: string;
}
