import type { BillRt, Category, CategoryMap } from "./entity";
import { dev } from "./env.js";
import { fakeBill, fakeCaMap, fakeCategories } from "./fake_data";

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
  static selectedMonths = new Set<number>();
  static sortedBill: BillRt[] = [];
}
