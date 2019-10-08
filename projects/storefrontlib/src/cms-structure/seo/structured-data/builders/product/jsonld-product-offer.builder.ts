import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { JsonLdBuilder } from '../schema.interface';

/**
 * Builds the structured data for the product offer, see https://schema.org/offers.
 * The data includes the price, currency and availability level.
 */
@Injectable({
  providedIn: 'root',
})
export class JsonLdProductOfferBuilder implements JsonLdBuilder<Product> {
  build(product: Product): Observable<any> {
    return of({
      offers: {
        '@type': 'Offer',
        price: product.price.value,
        priceCurrency: product.price.currencyIso,
        availability:
          product.stock.stockLevelStatus === 'inStock'
            ? 'InStock'
            : 'OutOfStock',
      },
    });
  }
}
