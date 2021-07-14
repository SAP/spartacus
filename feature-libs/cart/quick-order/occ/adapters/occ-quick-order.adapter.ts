import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  Occ,
  OccEndpointsService,
  Product,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { QuickOrderAdapter } from '@spartacus/cart/quick-order/core';

@Injectable()
export class OccQuickOrderAdapter implements QuickOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  search(productCode: string): Observable<Product> {
    return this.http
      .get<Occ.Product>(this.getQuickOrderSearchEndpoint(productCode))
      .pipe(this.converter.pipeable(PRODUCT_NORMALIZER));
  }

  protected getQuickOrderSearchEndpoint(productCode: string): string {
    return this.occEndpoints.buildUrl('product', {
      urlParams: {
        productCode,
      },
    });
  }
}
