import { Injectable } from '@angular/core';
import { EventService, TmsEventCollector } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { CartPageEvent } from './cart-page.events';

/**
 * Cart page event collectors
 */
@Injectable({ providedIn: 'root' })
export class CartPageEventCollector extends TmsEventCollector {
  protected cartPageEvent$ = this.eventsService
    .get(CartPageEvent)
    .pipe(map((event) => this.mapEvent(CartPageEvent.type, event)));

  protected sources = [this.cartPageEvent$];

  constructor(protected eventsService: EventService) {
    super(eventsService);
    this.register();
  }
}
