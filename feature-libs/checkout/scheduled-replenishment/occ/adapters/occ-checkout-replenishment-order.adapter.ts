import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckoutReplenishmentOrderAdapter,
  REPLENISHMENT_ORDER_FORM_SERIALIZER,
} from '@spartacus/checkout/scheduled-replenishment/core';
import { ScheduleReplenishmentForm } from '@spartacus/checkout/scheduled-replenishment/root';
import {
  backOff,
  ConverterService,
  isJaloError,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import {
  ReplenishmentOrder,
  REPLENISHMENT_ORDER_NORMALIZER,
} from '@spartacus/order/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCheckoutReplenishmentOrderAdapter
  implements CheckoutReplenishmentOrderAdapter
{
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

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
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({ shouldRetry: isJaloError }),
        this.converter.pipeable(REPLENISHMENT_ORDER_NORMALIZER)
      );
  }

  protected getScheduleReplenishmentOrderEndpoint(
    userId: string,
    cartId: string,
    termsChecked: string
  ): string {
    return this.occEndpoints.buildUrl('scheduleReplenishmentOrder', {
      urlParams: {
        userId,
      },
      queryParams: { cartId, termsChecked },
    });
  }
}
