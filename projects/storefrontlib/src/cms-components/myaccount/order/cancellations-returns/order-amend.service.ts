import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Order, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details';
import { OrderAmendType } from './order-amend.model';

@Injectable({
  providedIn: 'root',
})
export abstract class OrderAmendService {
  protected amendType: OrderAmendType;
  protected form: FormGroup;

  constructor(protected orderDetailsService: OrderDetailsService) {}

  /**
   * Returns entries for the given order.
   */
  abstract getEntries(): Observable<OrderEntry[]>;

  protected getOrder(): Observable<Order> {
    return this.orderDetailsService
      .getOrderDetails()
      .pipe(filter(order => Boolean(order.entries)));
  }

  /**
   * Builds the form for the given order entries
   */
  buildForm(_entries: OrderEntry[]) {}
}
