import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';

// TODO: remove this token in 5.0
export abstract class OrderDetailsServiceTransitionalToken {
  abstract getOrderDetails(): Observable<Order>;
}
