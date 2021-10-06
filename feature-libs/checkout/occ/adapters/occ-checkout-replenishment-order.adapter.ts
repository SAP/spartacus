import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckoutReplenishmentOrderAdapter,
  REPLENISHMENT_ORDER_FORM_SERIALIZER,
} from '@spartacus/checkout/core';
import {
  ConverterService,
  OccEndpointsService,
  ReplenishmentOrder,
  REPLENISHMENT_ORDER_NORMALIZER,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccCheckoutReplenishmentOrderAdapter
  implements CheckoutReplenishmentOrderAdapter
{
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
    return this.occEndpoints.buildUrl('scheduleReplenishmentOrder', {
      urlParams: {
        userId,
      },
      queryParams: { cartId, termsChecked },
    });
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
