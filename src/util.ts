import type { Bill, BillRt, CategoryMap, CategoryMap2 } from "./entity";
import GlobalVal from "./global_val";

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

export const sortBySelectedCategories = (
  bills: BillRt[],
  selected: Set<string>
) => {
  let tmp: BillRt[] = [];
  bills.forEach((bill) => {
    if (selected.has(bill.category)) {
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
  constructGlobalCategoryMap2();
  return obj;
};

const constructGlobalCategoryMap2 = () => {
  let obj: CategoryMap2 = {};
  for (const key of Object.keys(GlobalVal.caMap)) {
    obj[GlobalVal.caMap[key].id] = {
      type: GlobalVal.caMap[key].type,
      name: key,
    };
  }
  GlobalVal.caMap2 = obj;
};

export const calcIncomingAndOutgoing = () => {
  let incoming = 0,
    outgoing = 0;
  GlobalVal.sortedBill.forEach((bill) => {
    bill.type === 1 ? (incoming += bill.amount) : (outgoing += bill.amount);
  });
  return {
    incoming,
    outgoing,
  };
};
