import { HttpClient, HttpParams } from '@angular/common/http';
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

const ENDPOINT_PAYMENT_TYPES = 'paymenttypes';

@Injectable()
export class OccCheckoutPaymentTypeAdapter implements PaymentTypeAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadPaymentTypes(): Observable<PaymentType[]> {
    return this.http
      .get<Occ.PaymentTypeList>(
        this.occEndpoints.getEndpoint(ENDPOINT_PAYMENT_TYPES)
      )
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
    let httpParams = new HttpParams().set('paymentType', paymentType);
    if (purchaseOrderNumber !== undefined) {
      httpParams = httpParams.set('purchaseOrderNumber', purchaseOrderNumber);
    }
    /* tslint:disable:max-line-length */
    httpParams = httpParams.set(
      'fields',
      'DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user'
    );
    // TODO(#8877): Should we improve configurable endpoints for this use case?

    return this.http
      .put(
        this.getCartEndpoint(userId) + cartId + '/paymenttype',
        {},
        {
          params: httpParams,
        }
      )
      .pipe(this.converter.pipeable(CART_NORMALIZER));
  }

  protected getCartEndpoint(userId: string): string {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return this.occEndpoints.getEndpoint(cartEndpoint);
  }
}
