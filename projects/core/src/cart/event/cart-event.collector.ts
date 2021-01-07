import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { TmsCollector, TmsEvent } from '../../event/tms.event';
import { createFrom } from '../../util/create-from';
import { CartAddEntrySuccessEvent } from './cart.events';

/**
 * Registers cart event collectors
 */
@Injectable({ providedIn: 'root' })
export class CartEventCollector implements TmsCollector {
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

  protected events: Observable<any>[] = [this.cartAddEntrySuccessEvent$];

  constructor(protected eventsService: EventService) {
    this.events.forEach((event) =>
      this.eventsService.register(TmsEvent, event)
    );
  }

  get(): Observable<any>[] {
    return this.events;
  }
}
