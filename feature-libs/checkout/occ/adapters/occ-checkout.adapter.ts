import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckoutAdapter,
  CheckoutDetails,
  CHECKOUT_NORMALIZER,
} from '@spartacus/checkout/core';
import { CheckoutState } from '@spartacus/checkout/root';
import {
  ConverterService,
  HttpErrorModel,
  InterceptorUtil,
  normalizeHttpError,
  Occ,
  OccEndpointsService,
  OCC_USER_ID_ANONYMOUS,
  Order,
  ORDER_NORMALIZER,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import { Observable, of, pipe, range, throwError, timer, zip } from 'rxjs';
import { catchError, map, mergeMap, retryWhen } from 'rxjs/operators';

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
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(ORDER_NORMALIZER)
      );
  }

  // TODO: Remove along with ngrx checkout cleanup
  loadCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutDetails> {
    return this.http.get<CheckoutDetails>(
      this.getLoadCheckoutDetailsEndpoint(userId, cartId)
    );
  }

  getCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutState> {
    return this.http
      .get<any>(
        this.occEndpoints.buildUrl('getCheckoutDetails', {
          urlParams: {
            userId,
            cartId,
          },
        })
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backoffJalo(3, 500),
        this.converter.pipeable(CHECKOUT_NORMALIZER)
      );
  }
}

function backoffJalo<T>(maxTries: number, delay: number) {
  return pipe(
    retryWhen<T>((attempts) =>
      zip(range(1, maxTries + 1), attempts).pipe(
        mergeMap(([i, err]) =>
          i > maxTries || !isJaloError(err) ? throwError(err) : of(i)
        ),
        map((i) => i * i),
        mergeMap((v) => timer(v * delay))
      )
    )
  );
}

function isJaloError(err: HttpErrorModel) {
  return err.details?.[0]?.type === 'JaloObjectNoLongerValidError';
}
