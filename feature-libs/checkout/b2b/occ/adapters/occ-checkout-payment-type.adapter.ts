import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckoutPaymentTypeAdapter,
  CHECKOUT_PAYMENT_TYPE_NORMALIZER,
} from '@spartacus/checkout/b2b/core';
import {
  backOff,
  Cart,
  CART_NORMALIZER,
  ConverterService,
  isJaloError,
  normalizeHttpError,
  Occ,
  OccEndpointsService,
  PaymentType,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OccCheckoutPaymentTypeAdapter
  implements CheckoutPaymentTypeAdapter
{
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.http
      .get<Occ.PaymentTypeList>(this.getPaymentTypesEndpoint())
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({ shouldRetry: isJaloError }),
        map((paymentTypeList) => paymentTypeList.paymentTypes ?? []),
        this.converter.pipeableMany(CHECKOUT_PAYMENT_TYPE_NORMALIZER)
      );
  }

  protected getPaymentTypesEndpoint(): string {
    return this.occEndpoints.buildUrl('paymentTypes');
  }

  setPaymentType(
    userId: string,
    cartId: string,
    paymentType: string,
    purchaseOrderNumber?: string
  ): Observable<Cart> {
    return this.http
      .put(
        this.getSetCartPaymentTypeEndpoint(
          userId,
          cartId,
          paymentType,
          purchaseOrderNumber
        ),
        {}
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({ shouldRetry: isJaloError }),
        this.converter.pipeable(CART_NORMALIZER)
      );
  }

  protected getSetCartPaymentTypeEndpoint(
    userId: string,
    cartId: string,
    paymentType: string,
    purchaseOrderNumber?: string
  ): string {
    const queryParams = purchaseOrderNumber
      ? { paymentType, purchaseOrderNumber }
      : { paymentType };
    return this.occEndpoints.buildUrl('setCartPaymentType', {
      urlParams: { userId, cartId },
      queryParams,
    });
  }
}
