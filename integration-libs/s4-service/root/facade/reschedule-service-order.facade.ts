import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceDateTime } from '../model/checkout-service-details.model';
import { Order } from '@spartacus/order/root';

@Injectable({
  providedIn: 'root'
})
export abstract class RescheduleServiceOrderFacade {
  /**
   * Set service schedule DateTime for the order
   *
   * @param scheduledAt a service date time
   */
  abstract rescheduleService(
    orderCode: string,
    scheduledAt: ServiceDateTime
  ): Observable<unknown>;

  /**
   * Retrieves order's details
   */
  abstract loadOrderDetails(): Observable<Order>;
}
