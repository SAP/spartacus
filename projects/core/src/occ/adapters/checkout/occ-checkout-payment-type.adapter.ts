import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CART_NORMALIZER } from '../../../cart/connectors/cart/converters';
import { PAYMENT_TYPE_NORMALIZER } from '../../../checkout/connectors/payment-type/converters';
import { PaymentTypeAdapter } from '../../../checkout/connectors/payment-type/payment-type.adapter';
import { Cart, PaymentType } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

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
        map((paymentTypeList) => paymentTypeList.paymentTypes),
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
        this.getCartPaymentTypeEndpoint(
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
    return this.occEndpoints.getUrl('paymentTypes');
  }

  protected getCartPaymentTypeEndpoint(
    userId: string,
    cartId: string,
    paymentType: string,
    purchaseOrderNumber?: string
  ): string {
    return this.occEndpoints.getUrl(
      'cartPaymentType',
      { userId, cartId },
      purchaseOrderNumber
        ? { paymentType, purchaseOrderNumber }
        : { paymentType }
    );
  }
}
