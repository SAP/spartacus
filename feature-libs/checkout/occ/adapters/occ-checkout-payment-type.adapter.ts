import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PaymentTypeAdapter,
  PAYMENT_TYPE_NORMALIZER,
} from '@spartacus/checkout/core';
import {
  Cart,
  CART_NORMALIZER,
  ConverterService,
  Occ,
  OccEndpointsService,
  PaymentType,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OccCheckoutPaymentTypeAdapter implements PaymentTypeAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadPaymentTypes(): Observable<PaymentType[]> {
    return this.http
      .get<Occ.PaymentTypeList>(this.getPaymentTypesEndpoint())
      .pipe(
        map((paymentTypeList) => paymentTypeList.paymentTypes ?? []),
        this.converter.pipeableMany(PAYMENT_TYPE_NORMALIZER)
      );
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
      .pipe(this.converter.pipeable(CART_NORMALIZER));
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
