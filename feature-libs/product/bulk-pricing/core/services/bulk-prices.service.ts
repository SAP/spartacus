import { Injectable } from '@angular/core';
import { ProductScope, ProductService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BulkPrice } from '../../core/model/bulk-price.model';

@Injectable({
  providedIn: 'root',
})
export class BulkPricesService {
  protected readonly PRODUCT_SCOPE = ProductScope.PRICES;

  constructor(private productService: ProductService) {}

  getBulkPrices(productCode: string): Observable<BulkPrice[]> {
    return this.productService.get(productCode, this.PRODUCT_SCOPE).pipe(
      switchMap((p) => {
        return of(this.convert(p));
      })
    );
  }

  convert(content: any): BulkPrice[] {
    const bulkPrices = [];
    if (content != null) {
      content = content.volumePrices;
      for (let i = 0; i < content.length; i++) {
        const tierPrice: BulkPrice = content[i];
        bulkPrices.push(tierPrice);
      }
    }
    return bulkPrices;
  }
}
