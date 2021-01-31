import type { Bill, BillRt, CategoryMap } from "./entity";
import GlobalVal from "./global_val";
import { fillOptions } from "./ui";

export const parseMS = (msFrom19700101: number) => {
  return new Date(msFrom19700101);
};

export const sortByRangeOfMonths = (
  bills: Bill[],
  start: number,
  end: number
) => {
  let tmp: Bill[] = [];
  bills.forEach((bill) => {
    const month = new Date(bill.time).getMonth() + 1;
    if (month >= start && month <= end) {
      tmp.push(bill);
    }
  });
  return tmp;
};

export const sortBySelectedMonths = (
  bills: BillRt[],
  selected: Set<number>
) => {
  let tmp: BillRt[] = [];
  bills.forEach((bill) => {
    const month = new Date(bill.time).getMonth() + 1;
    if (selected.has(month)) {
      tmp.push(bill);
    }
  });
  return tmp;
};

export const constructGlobalCategoryMap = () => {
  let obj: CategoryMap = {};
  GlobalVal.categories.forEach((ca) => {
    obj[ca["name"]] = {
      id: ca.id,
      type: ca.type,
    };
  });
  GlobalVal.caMap = obj;
  fillOptions();
  return obj;
};
