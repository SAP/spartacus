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
      const basePrice = content.price.value;
      content = content.volumePrices;
      for (let i = 0; i < content.length; i++) {
        const tierPrice = this.parsePrice(content[i], basePrice);
        bulkPrices.push(tierPrice);
      }
    }
    return bulkPrices;
  }

  parsePrice(priceTier: any, basePrice): BulkPrice {
    const bulkPrice: BulkPrice = {
      currencyIso: priceTier.currencyIso,
      formattedValue: priceTier.formattedValue,
      maxQuantity: priceTier.maxQuantity,
      minQuantity: priceTier.minQuantity,
      priceType: priceTier.priceType,
      value: priceTier.value,
      formattedDiscount: '',
      discount: 0,
    };

    this.calculateDiscount(bulkPrice, basePrice);
    return bulkPrice;
  }

  calculateDiscount(bulkPrice: BulkPrice, basePrice: number): void {
    const tierPrice = bulkPrice.value;
    const discount = Math.round(100.0 - (tierPrice / basePrice) * 100);
    const formatted = '-' + discount + '%';
    bulkPrice.formattedDiscount = formatted;
    bulkPrice.discount = discount;
  }
}
