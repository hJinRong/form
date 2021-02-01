import type { BillRt, Category, CategoryMap, CategoryMap2 } from "./entity";
import { dev } from "./env.js";
import { fakeBill, fakeCaMap, fakeCaMap2, fakeCategories } from "./fake_data";

const convert = () => {
  const tmpBills: BillRt[] = [];
  fakeBill.forEach((bill) => {
    tmpBills.push({ ...bill, time: new Date(bill.time) });
  });
  return tmpBills;
};

export default class GlobalVal {
  static bills: BillRt[] = dev ? convert() : [];
  static categories: Category[] = dev ? fakeCategories : [];
  static caMap: CategoryMap = dev ? fakeCaMap : {};
  static caMap2: CategoryMap2 = dev ? fakeCaMap2 : {};
  static selectedMonths = new Set<number>();
  static selectedCategories = new Set<string>();
  static sortedBill: BillRt[] = [];
}
