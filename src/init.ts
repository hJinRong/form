import type { BillRt } from "./entity";
import GlobalVal from "./global_val";
import { readCSV } from "./parser";
import {
  addField,
  fillCategories,
  fillOptions,
  fillTable,
  updateIncomingAndOutgoing,
} from "./ui";
import { sortBySelectedCategories, sortBySelectedMonths } from "./util";

export const init = () => {
  fillOptions();
  fillCategories();
  fillTable();

  document.querySelector<HTMLInputElement>("#uploadfile")?.addEventListener(
    "change",
    (e) => {
      readCSV(e.target as HTMLInputElement);
    },
    false
  );

  document.querySelector("#update-table")?.addEventListener("click", () => {
    fillTable(GlobalVal.bills);
  });

  document.querySelector("#new-bill")?.addEventListener("click", (e) => {
    e.preventDefault();
    const typeEl = document.querySelector<HTMLSelectElement>(
      "#type"
    ) as HTMLSelectElement;
    const amountEl = document.querySelector<HTMLInputElement>(
      "#amount"
    ) as HTMLInputElement;
    if (
      typeof typeEl.value === "undefined" ||
      typeof amountEl.value === "undefined"
    ) {
      alert("请检查是否没有上传 category.csv 文件 和 输入金额");
    } else {
      const bill: BillRt = {
        type: GlobalVal.caMap[typeEl.value].type,
        time: new Date(Date.now()),
        category: GlobalVal.caMap[typeEl.value].id,
        amount: Number.parseInt(amountEl.value, 10),
      };
      GlobalVal.bills.push(bill);
      GlobalVal.sortedBill = sortBySelectedMonths(
        GlobalVal.bills,
        GlobalVal.selectedMonths
      );
      if (
        // 显示全部
        GlobalVal.selectedMonths.size === 0 ||
        // 显示部分，并且所在月份被选中
        (GlobalVal.selectedMonths.size !== 0 &&
          GlobalVal.selectedMonths.has(new Date(bill.time).getMonth() + 1))
      ) {
        addField(bill);
      }
      updateIncomingAndOutgoing();
    }
  });

  document.querySelectorAll("#months>div").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const ele = e.target as HTMLDivElement;
      const month = Number.parseInt(ele.innerText);
      ele.classList.toggle("selected");
      ele.className.split(" ").indexOf("selected") !== -1
        ? GlobalVal.selectedMonths.add(month)
        : GlobalVal.selectedMonths.delete(month);
      GlobalVal.sortedBill = sortBySelectedMonths(
        GlobalVal.bills,
        GlobalVal.selectedMonths
      );
      fillTable(GlobalVal.sortedBill);
    })
  );

  document.querySelectorAll("#categories>div").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const ele = e.target as HTMLDivElement;
      ele.classList.toggle("selected");
      const id = GlobalVal.caMap[ele.innerText].id;
      ele.className.split(" ").indexOf("selected") !== -1
        ? GlobalVal.selectedCategories.add(id)
        : GlobalVal.selectedCategories.delete(id);
      GlobalVal.sortedBill = sortBySelectedCategories(
        GlobalVal.sortedBill,
        GlobalVal.selectedCategories
      );
      fillTable(GlobalVal.sortedBill);
    })
  );
};
