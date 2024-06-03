/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { MergeCartSuccessEvent } from '@spartacus/cart/base/root';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CheckoutDeliveryAddressClearedEvent,
  CheckoutDeliveryAddressSetEvent,
  CheckoutDeliveryModeClearedEvent,
  CheckoutDeliveryModeSetEvent,
  CheckoutPaymentDetailsCreatedEvent,
  CheckoutPaymentDetailsSetEvent,
} from '@spartacus/checkout/base/root';
import { EventService, LoginEvent, LogoutEvent } from '@spartacus/core';
import {
  DaysOfWeek,
  ORDER_TYPE,
  recurrencePeriod,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import { BehaviorSubject, merge, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutReplenishmentFormService implements OnDestroy {
  protected subscriptions = new Subscription();

  /**
   * Default form data
   */
  readonly defaultFormData: ScheduleReplenishmentForm = {
    daysOfWeek: [DaysOfWeek.MONDAY],
    nthDayOfMonth: '1',
    numberOfDays: '14',
    numberOfWeeks: '1',
    recurrencePeriod: recurrencePeriod.DAILY,
    replenishmentStartDate: new Date().toISOString().split('T')[0],
  };

  private scheduleReplenishmentFormData$: Observable<ScheduleReplenishmentForm> =
    new BehaviorSubject<ScheduleReplenishmentForm>(this.defaultFormData);

  protected orderType$: Observable<ORDER_TYPE> =
    new BehaviorSubject<ORDER_TYPE>(ORDER_TYPE.PLACE_ORDER);

  constructor(protected eventService: EventService) {
    this.registerOrderTypeEventListers();
  }

  protected registerOrderTypeEventListers(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(CheckoutDeliveryAddressSetEvent),
        this.eventService.get(CheckoutDeliveryAddressClearedEvent),
        this.eventService.get(CheckoutDeliveryModeSetEvent),
        this.eventService.get(CheckoutDeliveryModeClearedEvent),
        this.eventService.get(CheckoutPaymentDetailsCreatedEvent),
        this.eventService.get(CheckoutPaymentDetailsSetEvent),
        this.eventService.get(LogoutEvent),
        this.eventService.get(LoginEvent),
        this.eventService.get(SaveCartSuccessEvent),
        this.eventService.get(RestoreSavedCartSuccessEvent),
        this.eventService.get(MergeCartSuccessEvent)
      ).subscribe(() => {
        (this.orderType$ as BehaviorSubject<ORDER_TYPE>).next(
          ORDER_TYPE.PLACE_ORDER
        );
      })
    );
  }

  /**
   * Get replenishment form data
   */
  getScheduleReplenishmentFormData(): Observable<ScheduleReplenishmentForm> {
    return this.scheduleReplenishmentFormData$;
  }

  /**
   * Set replenishment form data
   * @param formData : an object containing the data for scheduling a replenishment order
   */
  setScheduleReplenishmentFormData(formData: ScheduleReplenishmentForm): void {
    (
      this
        .scheduleReplenishmentFormData$ as BehaviorSubject<ScheduleReplenishmentForm>
    ).next(formData);
  }

  /**
   * Clears the existing replenishment form data to include the default replenishment form data
   */
  resetScheduleReplenishmentFormData(): void {
    (
      this
        .scheduleReplenishmentFormData$ as BehaviorSubject<ScheduleReplenishmentForm>
    ).next(this.defaultFormData);
  }

  /**
   * Get current checkout order type
   */
  getOrderType(): Observable<ORDER_TYPE> {
    return this.orderType$;
  }

  /**
   * Set checkout order type
   * @param orderType : an enum of types of order we are placing
   */
  setOrderType(orderType: ORDER_TYPE): void {
    (this.orderType$ as BehaviorSubject<ORDER_TYPE>).next(orderType);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
