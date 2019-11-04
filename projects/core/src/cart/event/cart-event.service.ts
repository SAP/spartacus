import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventRegister } from '../../events';
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
    protected eventRegister: EventRegister,
    protected builder: CartEventBuilder
  ) {
    this.registerEvent(CartBusyEvent, builder.buildBusyEvent());
    this.registerEvent(CartErrorEvent, builder.buildErrorEvent());
    this.registerEvent(CartLoadEvent, builder.buildLoadEvent());
    this.registerEvent(CartChangeEvent, builder.buildChangeEvent());
    this.registerEvent(CartMergeEvent, builder.buildMergeEvent());
    this.registerEvent(CartAddEvent, builder.buildAddEvent());
    this.registerEvent(CartAddEntryEvent, builder.buildEntryCreateEvent());
    this.registerEvent(CartUpdateEntryEvent, builder.buildEntryUpdateEvent());
    this.registerEvent(CartRemoveEntryEvent, builder.buildEntryRemoveEvent());
  }

  private registerEvent<T>(eventType: Type<T>, value$: Observable<any>) {
    this.eventRegister.registerEmitter(
      eventType,
      value$.pipe(map(value => ({ value })))
    );
  }
}
