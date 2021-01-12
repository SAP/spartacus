import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { TmsEventCollector } from '../../event/tms.event';
import { OrderPlacedEvent } from './checkout.events';

/**
 * Registers checkout event collectors
 */
@Injectable({ providedIn: 'root' })
export class CheckoutEventCollector extends TmsEventCollector {
  protected orderPlacedEvent$ = this.eventsService
    .get(OrderPlacedEvent)
    .pipe(map((event) => this.mapEvent(OrderPlacedEvent.type, event)));

  protected sources = [this.orderPlacedEvent$];

  constructor(protected eventsService: EventService) {
    super(eventsService);
    this.register();
  }
}
