import { Injectable } from '@angular/core';
import { Price, Product, ProductScope, ProductService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BulkPrice } from '../../core/model/bulk-price.model';

@Injectable({
  providedIn: 'root',
})
export class BulkPricesService {
  protected readonly PRODUCT_SCOPE = ProductScope.BULK_PRICES;

  constructor(private productService: ProductService) {}

  getBulkPrices(productCode: string): Observable<BulkPrice[]> {
    return this.productService.get(productCode, this.PRODUCT_SCOPE).pipe(
      switchMap((productPriceScope) => {
        return of(this.convert(productPriceScope));
      })
    );
  }

  private convert(productPriceScope: Product): BulkPrice[] {
    let bulkPrices = [];

    if (productPriceScope && productPriceScope !== {}) {
      const basePrice = productPriceScope.price?.value;
      const volumePrices = productPriceScope.volumePrices;

      bulkPrices = volumePrices.map((volumePrice) =>
        this.parsePrice(volumePrice, basePrice)
      );
    }

    return bulkPrices;
  }

  private parsePrice(priceTier: Price, basePrice: number): BulkPrice {
    const bulkPriceTemplate: BulkPrice = {
      currencyIso: priceTier.currencyIso,
      formattedValue: priceTier.formattedValue,
      maxQuantity: priceTier.maxQuantity,
      minQuantity: priceTier.minQuantity,
      priceType: priceTier.priceType,
      value: priceTier.value,
      formattedDiscount: '',
      discount: 0,
    };

    return this.calculateDiscount(bulkPriceTemplate, basePrice);
  }

  private calculateDiscount(
    bulkPriceTemplate: BulkPrice,
    basePrice: number
  ): BulkPrice {
    const bulkPrice = Object.assign({}, bulkPriceTemplate);

    const tierPrice = bulkPriceTemplate.value;
    const discount = Math.round(100.0 - (tierPrice / basePrice) * 100);
    const formatted = `-${discount}%`;
    bulkPrice.formattedDiscount = formatted;
    bulkPrice.discount = discount;

    return bulkPrice;
  }
}
