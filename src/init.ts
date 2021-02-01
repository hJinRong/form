import type { BillRt } from "./entity";
import { dev } from "./env";
import GlobalVal from "./global_val";
import { readCSV } from "./parser";
import { updateBills, updateSortedBills } from "./state_watcher";
import { fillCategories, fillOptions, fillTable } from "./ui";

export const init = () => {
  fillOptions();
  fillCategories();
  updateSortedBills();
  fillTable();

  document.querySelector<HTMLInputElement>("#uploadfile")?.addEventListener(
    "change",
    (e) => {
      readCSV(e.target as HTMLInputElement);
    },
    false
  );

  document.querySelector("#update-table")?.addEventListener("click", () => {
    fillTable();
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
      alert("请上传 category.csv 文件并输入金额");
    } else {
      const bill: BillRt = {
        type: GlobalVal.caMap[typeEl.value].type,
        time: new Date(Date.now()),
        category: GlobalVal.caMap[typeEl.value].id,
        amount: Number.parseInt(amountEl.value, 10),
      };
      updateBills(bill);
      updateSortedBills();
      fillTable();
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
      updateSortedBills();
      fillTable();
    })
  );

  dev && listenToCategoryButtons();
};

export const listenToCategoryButtons = () => {
  document.querySelectorAll("#categories>div").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const ele = e.target as HTMLDivElement;
      ele.classList.toggle("selected");
      const id = GlobalVal.caMap[ele.innerText].id;
      ele.className.split(" ").indexOf("selected") !== -1
        ? GlobalVal.selectedCategories.add(id)
        : GlobalVal.selectedCategories.delete(id);
      updateSortedBills();
      fillTable();
    })
  );
}