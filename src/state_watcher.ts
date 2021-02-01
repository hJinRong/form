import type { BillRt } from "./entity";
import GlobalVal from "./global_val";

export const updateBills = (bill: BillRt) => {
  GlobalVal.bills.push(bill);
  GlobalVal.sortedBill = GlobalVal.bills;
};

export const updateSortedBills = () => {
  GlobalVal.sortedBill = GlobalVal.bills;
  if (GlobalVal.selectedMonths.size !== 0) {
    GlobalVal.sortedBill = GlobalVal.sortedBill.filter((bill) =>
      GlobalVal.selectedMonths.has(new Date(bill.time).getMonth() + 1)
    );
  }
  if (GlobalVal.selectedCategories.size !== 0) {
    GlobalVal.sortedBill = GlobalVal.sortedBill.filter((bill) =>
      GlobalVal.selectedCategories.has(bill.category)
    );
  }
};
