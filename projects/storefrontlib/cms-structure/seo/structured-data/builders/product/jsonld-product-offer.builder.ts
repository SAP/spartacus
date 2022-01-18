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
    const schema: any = { '@type': 'Offer' };

    if (product.price?.value) {
      schema.price = product.price.value;
      if (product.price.currencyIso) {
        schema.priceCurrency = product.price.currencyIso;
      }
    }

    if (product.stock && product.stock.stockLevelStatus) {
      schema.availability =
        product.stock.stockLevelStatus === 'inStock' ? 'InStock' : 'OutOfStock';
    }

    return of({ offers: schema });
  }
}
