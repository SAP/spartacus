import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutReplenishmentOrderAdapter } from '../../../checkout/connectors/replenishment-order/checkout-replenishment-order.adapter';
import {
  REPLENISHMENT_ORDER_FORM_SERIALIZER,
  REPLENISHMENT_ORDER_NORMALIZER,
} from '../../../checkout/connectors/replenishment-order/converters';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../../model/replenishment-order.model';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccCheckoutReplenishmentOrderAdapter
  implements CheckoutReplenishmentOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getScheduleReplenishmentOrderEndpoint(
    userId: string,
    cartId: string,
    termsChecked: string
  ) {
    return this.occEndpoints.getUrl(
      'scheduleReplenishmentOrder',
      {
        userId,
      },
      { cartId, termsChecked }
    );
  }

  scheduleReplenishmentOrder(
    cartId: string,
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean,
    userId: string
  ): Observable<ReplenishmentOrder> {
    scheduleReplenishmentForm = this.converter.convert(
      scheduleReplenishmentForm,
      REPLENISHMENT_ORDER_FORM_SERIALIZER
    );

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post(
        this.getScheduleReplenishmentOrderEndpoint(
          userId,
          cartId,
          termsChecked.toString()
        ),
        scheduleReplenishmentForm,
        { headers }
      )
      .pipe(this.converter.pipeable(REPLENISHMENT_ORDER_NORMALIZER));
  }
}
