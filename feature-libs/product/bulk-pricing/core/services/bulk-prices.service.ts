import { Injectable } from '@angular/core';
import { Price, Product, ProductScope, ProductService } from '@spartacus/core';
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
      switchMap((productPriceScope) => {
        return of(this.convert(productPriceScope));
      })
    );
  }

  private convert(productPriceScope: Product): BulkPrice[] {
    const bulkPrices = [];
    if (productPriceScope != null) {
      const basePrice = productPriceScope.price.value;
      const volumePrices = productPriceScope.volumePrices;

      for (let i = 0; i < volumePrices.length; i++) {
        const tierPrice = this.parsePrice(volumePrices[i], basePrice);
        bulkPrices.push(tierPrice);
      }
    }

    return bulkPrices;
  }

  private parsePrice(priceTier: Price, basePrice: number): BulkPrice {
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

  private calculateDiscount(bulkPrice: BulkPrice, basePrice: number): void {
    const tierPrice = bulkPrice.value;
    const discount = Math.round(100.0 - (tierPrice / basePrice) * 100);
    const formatted = '-' + discount + '%';
    bulkPrice.formattedDiscount = formatted;
    bulkPrice.discount = discount;
  }
}
