import { Injectable } from '@angular/core';
import { OrderPlacedEvent } from '@spartacus/checkout/base/root';
import { EventService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GetOrderDetailsContext } from './context/get-order-details';

/**
 * Get order details in Order Confirmation Page
 */
@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationOrderDetailsContext
  implements GetOrderDetailsContext
{
  constructor(protected eventService: EventService) {
    this.eventService
      .get(OrderPlacedEvent)
      .pipe(
        map((orderDetails) => orderDetails.order),
        tap((base) => console.log('const details', base))
      )
      .subscribe((test) => console.log('context test', test));
  }

  getOrder(): Observable<Order> {
    console.log('context called atleast ?');
    return this.eventService.get(OrderPlacedEvent).pipe(
      map((orderDetails) => orderDetails.order),
      tap((base) => console.log('details', base))
    );
  }
}
