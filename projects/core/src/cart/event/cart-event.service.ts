import { Injectable } from '@angular/core';
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
    eventRegister.register(CartBusyEvent, builder.buildBusyEvent());
    eventRegister.register(CartErrorEvent, builder.buildErrorEvent());
    eventRegister.register(CartLoadEvent, builder.buildLoadEvent());
    eventRegister.register(CartChangeEvent, builder.buildChangeEvent());
    eventRegister.register(CartMergeEvent, builder.buildMergeEvent());
    eventRegister.register(CartAddEvent, builder.buildAddEvent());
    eventRegister.register(CartAddEntryEvent, builder.buildEntryCreateEvent());
    eventRegister.register(
      CartUpdateEntryEvent,
      builder.buildEntryUpdateEvent()
    );
    eventRegister.register(
      CartRemoveEntryEvent,
      builder.buildEntryRemoveEvent()
    );
  }
}
