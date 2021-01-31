interface CategoryType {
  type: 0 | 1;
}
interface BasicBill extends CategoryType {
  category: string;
  amount: number;
}

export interface Bill extends BasicBill {
  time: string;
}

export interface BillRt extends BasicBill {
  time: Date;
}

export interface Category extends CategoryType {
  id: string;
  name: string;
}

export interface CategoryMap {
  [key: string]: { id: string; type: 0 | 1 };
}
