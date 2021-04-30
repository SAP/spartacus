import { Observable } from 'rxjs';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../../model/replenishment-order.model';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export abstract class CheckoutReplenishmentOrderAdapter {
  /**
   * Abstract method used to schedule a replenishment order.
   *
   * @param cartId The `cartId` for cart used for scheduling a replenishment order
   * @param scheduleReplenishmentForm The `object` that contains the form data for replenishment
   * @param termsChecked The `boolean value` whether the terms were accepted or not
   * @param userId The `userId` for given user
   */
  abstract scheduleReplenishmentOrder(
    cartId: string,
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean,
    userId: string
  ): Observable<ReplenishmentOrder>;
}
