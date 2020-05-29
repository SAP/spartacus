import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../../model/cart.model';
import { CheckoutCostCenterAdapter } from '../../../checkout/connectors/cost-center/checkout-cost-center.adapter';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { CART_NORMALIZER } from '../../../cart/connectors/cart/converters';

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
      .put(
        this.getCartEndpoint(userId) + cartId + '/costcenter',
        {},
        {
          params: { costCenterId },
        }
      )
      .pipe(this.converter.pipeable(CART_NORMALIZER));
  }

  protected getCartEndpoint(userId: string): string {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return this.occEndpoints.getEndpoint(cartEndpoint);
  }
}
