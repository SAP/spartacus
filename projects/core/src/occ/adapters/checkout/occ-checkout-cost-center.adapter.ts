import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CART_NORMALIZER } from '../../../cart/connectors/cart/converters';
import { CheckoutCostCenterAdapter } from '../../../checkout/connectors/cost-center/checkout-cost-center.adapter';
import { Cart } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccCheckoutCostCenterAdapter implements CheckoutCostCenterAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  setCostCenter(
    userId: string,
    cartId: string,
    costCenterId: string
  ): Observable<Cart> {
    return this.http
      .put(this.getCartEndpoint(userId, cartId, costCenterId), {})
      .pipe(this.converter.pipeable(CART_NORMALIZER));
  }

  protected getCartEndpoint(
    userId: string,
    cartId: string,
    costCenterId: string
  ): string {
    return this.occEndpoints.getUrl(
      'cartCostCenter',
      { userId, cartId },
      { costCenterId }
    );
  }
}
