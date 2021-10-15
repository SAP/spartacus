import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckoutPaymentTypeAdapter,
  CHECKOUT_PAYMENT_TYPE_NORMALIZER,
} from '@spartacus/checkout/b2b/core';
import {
  Cart,
  CART_NORMALIZER,
  ConverterService,
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

  loadPaymentTypes(): Observable<PaymentType[]> {
    return this.http
      .get<Occ.PaymentTypeList>(this.getPaymentTypesEndpoint())
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        map((paymentTypeList) => paymentTypeList.paymentTypes ?? []),
        this.converter.pipeableMany(CHECKOUT_PAYMENT_TYPE_NORMALIZER)
      );
  }

  // TODO: Should it return cart?
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
        this.converter.pipeable(CART_NORMALIZER)
      );
  }

  protected getPaymentTypesEndpoint(): string {
    return this.occEndpoints.buildUrl('paymentTypes');
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
