import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { AbstractTmsEventCollector } from '../../event/tms.event';
import {
  CartAddEntryEvent,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
} from './cart.events';

/**
 * Registers cart event collectors
 */
@Injectable({ providedIn: 'root' })
export class CartEventCollector extends AbstractTmsEventCollector {
  protected cartAddEntryEvent$ = this.eventsService
    .get(CartAddEntryEvent)
    .pipe(map((event) => this.mapEvent(CartAddEntryEvent.type, event)));

  protected cartAddEntrySuccessEvent$ = this.eventsService
    .get(CartAddEntrySuccessEvent)
    .pipe(map((event) => this.mapEvent(CartAddEntrySuccessEvent.type, event)));

  protected cartAddEntryFailEvent$ = this.eventsService
    .get(CartAddEntryFailEvent)
    .pipe(map((event) => this.mapEvent(CartAddEntryFailEvent.type, event)));

  protected cartRemoveEntrySuccessEvent$ = this.eventsService
    .get(CartRemoveEntrySuccessEvent)
    .pipe(
      map((event) => this.mapEvent(CartRemoveEntrySuccessEvent.type, event))
    );

  protected cartUpdateEntrySuccessEvent$ = this.eventsService
    .get(CartUpdateEntrySuccessEvent)
    .pipe(
      map((event) => this.mapEvent(CartUpdateEntrySuccessEvent.type, event))
    );

  protected sources = [
    this.cartAddEntryEvent$,
    this.cartAddEntrySuccessEvent$,
    this.cartAddEntryFailEvent$,
    this.cartRemoveEntrySuccessEvent$,
    this.cartUpdateEntrySuccessEvent$,
  ];

  constructor(protected eventsService: EventService) {
    super(eventsService);
    this.registerEvent(...this.sources);
  }
}
