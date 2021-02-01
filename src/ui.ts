import type { BillRt } from "./entity.js";
import GlobalVal from "./global_val.js";
import { calcIncomingAndOutgoing } from "./util.js";

const tbEl = document.querySelector<HTMLTableSectionElement>(
  "#tb"
) as HTMLTableSectionElement;
const typeEl = document.querySelector<HTMLSelectElement>(
  "#type"
) as HTMLSelectElement;
const caEl = document.querySelector<HTMLDivElement>(
  "#categories"
) as HTMLDivElement;
const inEl = document.querySelector<HTMLInputElement>(
  "#incoming"
) as HTMLInputElement;
const outEl = document.querySelector<HTMLInputElement>(
  "#outgoing"
) as HTMLInputElement;

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
  updateIncomingAndOutgoing();
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

export const fillCategories = () => {
  const types = Object.keys(GlobalVal.caMap);
  types.forEach((type) => {
    const category = document.createElement("div");
    category.innerText = type;
    caEl.appendChild(category);
  })
}

export function updateIncomingAndOutgoing() {
  const { incoming, outgoing } = calcIncomingAndOutgoing();
  inEl.value = incoming.toString();
  outEl.value = outgoing.toString();
}
