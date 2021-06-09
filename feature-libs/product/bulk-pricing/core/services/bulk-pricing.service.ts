import { Injectable } from '@angular/core';
import { Price, Product, ProductService, ProductScope } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BulkPrice } from '../model/bulk-price.model';

@Injectable({
  providedIn: 'root',
})
export class BulkPricingService {
  protected readonly PRODUCT_SCOPE = ProductScope.BULK_PRICES;

  constructor(protected productService: ProductService) {}

  getBulkPrices(productCode: string): Observable<BulkPrice[] | undefined> {
    return this.productService.get(productCode, this.PRODUCT_SCOPE).pipe(
      switchMap((productPriceScope) => {
        return of(this.convert(productPriceScope));
      })
    );
  }

  protected convert(productPriceScope: Product): BulkPrice[] | undefined {
    let bulkPrices: BulkPrice[] | undefined = [];

    if (productPriceScope) {
      const basePrice: number | undefined = productPriceScope.price?.value;
      const volumePrices: Price[] | undefined = productPriceScope.volumePrices;

      bulkPrices = volumePrices?.map((volumePrice) =>
        this.parsePrice(volumePrice, basePrice)
      );
    }

    return bulkPrices;
  }

  protected parsePrice(
    priceTier: Price,
    basePrice: number | undefined
  ): BulkPrice {
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

  protected calculateDiscount(
    bulkPriceTemplate: BulkPrice,
    basePrice: number | undefined
  ): BulkPrice {
    const bulkPrice = Object.assign({}, bulkPriceTemplate);

    const tierPrice: number | undefined = bulkPriceTemplate.value;

    if (tierPrice && basePrice) {
      const discount = Math.round(100.0 - (tierPrice / basePrice) * 100);
      const formatted = discount === 0 ? `${discount}%` : `-${discount}%`;
      bulkPrice.formattedDiscount = formatted;
      bulkPrice.discount = discount;
    }

    return bulkPrice;
  }
}
