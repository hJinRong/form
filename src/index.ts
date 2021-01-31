import type { BillRt } from "./entity";
import { dev } from "./env.js";
import GlobalVal from "./global_val";
import { listen } from "./parser";
import { addField, fillOptions, fillTable } from "./ui";
import { sortBySelectedMonths } from "./util";

listen();
dev && fillOptions();
dev && fillTable();

document.querySelector("#update-table")?.addEventListener("click", (e) => {
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
    if (
      // 显示全部
      GlobalVal.selectedMonths.size === 0 ||
      // 显示部分，并且所在月份被选中
      (GlobalVal.selectedMonths.size !== 0 &&
        GlobalVal.selectedMonths.has(new Date(bill.time).getMonth() + 1))
    ) {
      addField(bill);
    }
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
