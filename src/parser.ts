import type { BillRt, Category } from "./entity.js";
import GlobalVal from "./global_val.js";
import { listenToCategoryButtons } from "./init.js";
import { fillCategories, fillOptions } from "./ui.js";
import { constructGlobalCategoryMap } from "./util.js";

export const readCSV = (input: HTMLInputElement) => {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = e.target?.result as string;
      parseData(data);
    };
    reader.readAsText(input.files[0]);
  }
};

const parseData = (data: string) => {
  let csvData: string[][] = [];
  const items = data.split("\n");
  items.shift();
  items.forEach((line) => {
    csvData.push(line.split(","));
  });
  console.table(csvData);

  if (csvData[0].length === 3) {
    let categories: Category[] = [];
    csvData.forEach((v) => {
      categories.push({
        id: v[0].trim(),
        type: Number.parseInt(v[1]) === 1 ? 1 : 0,
        name: v[2].trim(),
      });
    });
    GlobalVal.categories.push(...categories);
    constructGlobalCategoryMap();
    fillOptions();
    fillCategories();
    listenToCategoryButtons();
    return categories;
  } else if (csvData[0].length === 4) {
    let bills: BillRt[] = [];
    csvData.forEach((v) => {
      bills.push({
        type: Number.parseInt(v[0]) === 1 ? 1 : 0,
        time: new Date(Number.parseInt(v[1])),
        category: v[2].trim(),
        amount: Number.parseInt(v[3]),
      });
    });
    GlobalVal.bills.push(...bills);
    return bills;
  }
};
