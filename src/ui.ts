import type { BillRt } from "./entity.js";
import GlobalVal from "./global_val.js";

const tbEl = document.querySelector<HTMLTableSectionElement>(
  "#tb"
) as HTMLTableSectionElement;
const typeEl = document.querySelector<HTMLSelectElement>(
  "#type"
) as HTMLSelectElement;

export function fillTable(bills?: BillRt[]) {
  if (bills && bills.length === 0) {
    if (GlobalVal.selectedMonths.size === 0) {
      fillTable();
    } else {
      tbEl.innerHTML = "";
    }
  } else if (bills && bills.length !== 0) {
    tbEl.innerHTML = "";
    bills.forEach((bi) => addField(bi));
  } else {
    GlobalVal.bills.forEach((bill) => addField(bill));
  }
}

export function addField(bill: BillRt) {
  const tr = document.createElement("tr");
  const type = document.createElement("td");
  type.innerText = bill.type.toString();
  const time = document.createElement("td");
  time.innerText = bill.time.toLocaleString();
  const category = document.createElement("td");
  category.innerText = bill.category;
  const amount = document.createElement("td");
  amount.innerText = bill.amount.toString();
  tr.appendChild(type);
  tr.appendChild(time);
  tr.appendChild(category);
  tr.appendChild(amount);
  tbEl.appendChild(tr);
}

export function fillOptions() {
  const types = Object.keys(GlobalVal.caMap);
  types.forEach((type) => {
    const option = document.createElement("option");
    option.innerText = type;
    typeEl.appendChild(option);
  });
}
