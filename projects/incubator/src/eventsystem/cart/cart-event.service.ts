import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter } from '../events/event.emitter';
import { CartEventBuilder } from './cart-event.builder';
import {
  CartAddEntryEvent,
  CartAddEvent,
  CartBusyEvent,
  CartChangeEvent,
  CartErrorEvent,
  CartLoadEvent,
  CartMergeEvent,
  CartRemoveEntryEvent,
  CartUpdateEntryEvent,
} from './cart-event.model';

@Injectable({
  providedIn: 'root',
})
export class CartEventService {
  constructor(
    protected eventEmitter: EventEmitter,
    protected builder: CartEventBuilder
  ) {
    // helper function to attach event sources to the event type
    const attach = <T>(eventType: Type<T>, value$: Observable<any>) =>
      this.eventEmitter.attach(
        eventType,
        value$.pipe(map(state => <any>{ state }))
      );

    attach(CartAddEvent, builder.buildAddEvent());
    attach(CartBusyEvent, builder.buildBusyEvent());
    attach(CartLoadEvent, builder.buildLoadEvent());

    attach(CartAddEntryEvent, builder.buildEntryCreateEvent());
    attach(CartUpdateEntryEvent, builder.buildEntryUpdateEvent());
    attach(CartRemoveEntryEvent, builder.buildEntryRemoveEvent());

    attach(CartErrorEvent, builder.buildErrorEvent());
    attach(CartChangeEvent, builder.buildChangeEvent());
    attach(CartMergeEvent, builder.buildMergeEvent());
  }
}
