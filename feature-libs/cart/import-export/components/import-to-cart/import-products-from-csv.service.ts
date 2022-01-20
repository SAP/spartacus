import { Injectable } from '@angular/core';
import { ProductData } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class ImportProductsFromCsvService {
  constructor() {}

  csvDataToProduct(csvData: string[][]): ProductData[] {
    return csvData.map((row: string[]) => ({
      productCode: row[0],
      quantity: Number(row[1]),
    }));
  }

  isDataParsableToProducts(data: string[][]): boolean {
    const patternRegex = new RegExp(/(?:\s|^)\d+(?=\s|$)/);
    return data.length > 0 && data.every((row) => patternRegex.test(row[1]));
  }
}
