import { Injectable, OnDestroy } from '@angular/core';
import { MergeCartSuccessEvent } from '@spartacus/cart/main/root';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
  OrderPlacedEvent,
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
} from '@spartacus/checkout/base/root';
import {
  DaysOfWeek,
  ORDER_TYPE,
  recurrencePeriod,
  ReplenishmentOrderScheduledEvent,
  ScheduleReplenishmentForm,
} from '@spartacus/checkout/scheduled-replenishment/root';
import { EventService, LoginEvent, LogoutEvent } from '@spartacus/core';
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

  private scheduleReplenishmentFormData$: BehaviorSubject<ScheduleReplenishmentForm> =
    new BehaviorSubject<ScheduleReplenishmentForm>(this.defaultFormData);

  protected orderType$ = new BehaviorSubject<ORDER_TYPE>(
    ORDER_TYPE.PLACE_ORDER
  );

  constructor(protected eventService: EventService) {
    this.registerOrderTypeEventListers();
  }

  protected registerOrderTypeEventListers(): void {
    this.subscriptions.add(
      merge([
        this.eventService.get(DeliveryAddressSetEvent),
        this.eventService.get(LogoutEvent),
        this.eventService.get(LoginEvent),
        this.eventService.get(DeliveryAddressClearedEvent),
        this.eventService.get(DeliveryModeSetEvent),
        this.eventService.get(DeliveryModeClearedEvent),
        this.eventService.get(SaveCartSuccessEvent),
        this.eventService.get(RestoreSavedCartSuccessEvent),
        this.eventService.get(PaymentDetailsCreatedEvent),
        this.eventService.get(PaymentDetailsSetEvent),
        this.eventService.get(OrderPlacedEvent),
        this.eventService.get(ReplenishmentOrderScheduledEvent),
        this.eventService.get(MergeCartSuccessEvent),
      ]).subscribe(() => {
        this.orderType$.next(ORDER_TYPE.PLACE_ORDER);
      })
    );
  }

  /**
   * Get replenishment form data
   */
  getScheduleReplenishmentFormData(): Observable<ScheduleReplenishmentForm> {
    return this.scheduleReplenishmentFormData$.asObservable();
  }

  /**
   * Set replenishment form data
   * @param formData : an object containing the data for scheduling a replenishment order
   */
  setScheduleReplenishmentFormData(formData: ScheduleReplenishmentForm): void {
    this.scheduleReplenishmentFormData$.next(formData);
  }

  /**
   * Clears the existing replenishment form data to include the default replenishment form data
   */
  resetScheduleReplenishmentFormData(): void {
    this.scheduleReplenishmentFormData$.next(this.defaultFormData);
  }

  /**
   * Get current checkout order type
   */
  getOrderType(): Observable<ORDER_TYPE> {
    return this.orderType$.asObservable();
  }

  /**
   * Set checkout order type
   * @param orderType : an enum of types of order we are placing
   */
  setOrderType(orderType: ORDER_TYPE): void {
    this.orderType$.next(orderType);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
