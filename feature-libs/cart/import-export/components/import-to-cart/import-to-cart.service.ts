import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import {
  ProductImportInfo,
  ProductsData,
  AbstractImportExportService,
} from '@spartacus/cart/import-export/core';

@Injectable()
export class ImportToCartService {
  constructor() {}

  loadProductsToCart(
    service: AbstractImportExportService,
    products: ProductsData,
    savedCartInfo?: { name: string; description: string }
  ): Observable<ProductImportInfo> {
    return service.addEntries(products, savedCartInfo).pipe(
      switchMap((cartId: string) => service.getResults(cartId)),
      take(products.length)
    );
  }

  csvDataToProduct(csvData: string[][]): ProductsData {
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
