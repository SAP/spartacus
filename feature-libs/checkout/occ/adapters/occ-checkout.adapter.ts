import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckoutAdapter, CheckoutDetails } from '@spartacus/checkout/core';
import {
  ConverterService,
  InterceptorUtil,
  Occ,
  OccEndpointsService,
  OCC_USER_ID_ANONYMOUS,
  Order,
  ORDER_NORMALIZER,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccCheckoutAdapter implements CheckoutAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getPlaceOrderEndpoint(
    userId: string,
    cartId: string,
    termsChecked: string
  ): string {
    return this.occEndpoints.buildUrl('placeOrder', {
      urlParams: { userId },
      queryParams: { cartId, termsChecked },
    });
  }

  protected getRemoveDeliveryAddressEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('removeDeliveryAddress', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getClearDeliveryModeEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('clearDeliveryMode', {
      urlParams: { userId, cartId },
    });
  }

  protected getLoadCheckoutDetailsEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('loadCheckoutDetails', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  public placeOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }

    return this.http
      .post<Occ.Order>(
        this.getPlaceOrderEndpoint(userId, cartId, termsChecked.toString()),
        {},
        { headers }
      )
      .pipe(this.converter.pipeable(ORDER_NORMALIZER));
  }

  loadCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutDetails> {
    return this.http.get<CheckoutDetails>(
      this.getLoadCheckoutDetailsEndpoint(userId, cartId)
    );
  }

  clearCheckoutDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getRemoveDeliveryAddressEndpoint(userId, cartId)
    );
  }

  clearCheckoutDeliveryMode(userId: string, cartId: string): Observable<any> {
    return this.http.delete<any>(
      this.getClearDeliveryModeEndpoint(userId, cartId)
    );
  }
}
