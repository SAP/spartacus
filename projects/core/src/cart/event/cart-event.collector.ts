import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { TmsCollector, TmsEvent } from '../../event/tms.event';
import { createFrom } from '../../util/create-from';
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
export class CartEventCollector implements TmsCollector {
  protected cartAddEntryEvent$ = this.eventsService.get(CartAddEntryEvent).pipe(
    map((event) =>
      createFrom(TmsEvent, {
        event: CartAddEntryEvent.type,
        payload: { ...event },
      })
    )
  );

  protected cartAddEntrySuccessEvent$ = this.eventsService
    .get(CartAddEntrySuccessEvent)
    .pipe(
      map((event) =>
        createFrom(TmsEvent, {
          event: CartAddEntrySuccessEvent.type,
          payload: { ...event },
        })
      )
    );

  protected cartAddEntryFailEvent$ = this.eventsService
    .get(CartAddEntryFailEvent)
    .pipe(
      map((event) =>
        createFrom(TmsEvent, {
          event: CartAddEntryFailEvent.type,
          payload: { ...event },
        })
      )
    );

  protected cartRemoveEntrySuccessEvent$ = this.eventsService
    .get(CartRemoveEntrySuccessEvent)
    .pipe(
      map((event) =>
        createFrom(TmsEvent, {
          event: CartRemoveEntrySuccessEvent.type,
          payload: { ...event },
        })
      )
    );

  protected cartUpdateEntrySuccessEvent$ = this.eventsService
    .get(CartUpdateEntrySuccessEvent)
    .pipe(
      map((event) =>
        createFrom(TmsEvent, {
          event: CartUpdateEntrySuccessEvent.type,
          payload: { ...event },
        })
      )
    );

  protected events: Observable<any>[] = [
    this.cartAddEntryEvent$,
    this.cartAddEntrySuccessEvent$,
    this.cartAddEntryFailEvent$,
    this.cartRemoveEntrySuccessEvent$,
    this.cartUpdateEntrySuccessEvent$,
  ];

  constructor(protected eventsService: EventService) {
    this.events.forEach((event) =>
      this.eventsService.register(TmsEvent, event)
    );
  }

  get(): Observable<any>[] {
    return this.events;
  }
}
