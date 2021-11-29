import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckoutAdapter,
  CHECKOUT_NORMALIZER,
} from '@spartacus/checkout/base/core';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  backOff,
  ConverterService,
  InterceptorUtil,
  isJaloError,
  normalizeHttpError,
  Occ,
  OccEndpointsService,
  OCC_USER_ID_ANONYMOUS,
  Order,
  ORDER_NORMALIZER,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCheckoutAdapter implements CheckoutAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

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
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        }),
        this.converter.pipeable(ORDER_NORMALIZER)
      );
  }

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

  getCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutState> {
    return this.http
      .get<CheckoutState>(this.getGetCheckoutDetailsEndpoint(userId, cartId))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        }),
        this.converter.pipeable(CHECKOUT_NORMALIZER)
      );
  }

  protected getGetCheckoutDetailsEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('getCheckoutDetails', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }
}
