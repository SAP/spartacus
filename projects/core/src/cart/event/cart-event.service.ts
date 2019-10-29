import { Injectable } from '@angular/core';
import { EventEmitter } from '../../events';
import { CartEventBuilder } from './cart-event.builder';
import { CartEventType } from './cart-event.model';

@Injectable({
  providedIn: 'root',
})
export class CartEventService {
  constructor(
    protected eventEmitter: EventEmitter,
    protected builder: CartEventBuilder
  ) {
    builder
      .buildBusyEvent()
      .subscribe(event => eventEmitter.emit(CartEventType.BUSY, event));

    // eventEmitter.register(CartEventType.BUSY, builder.buildBusyEvent());
    eventEmitter.register(CartEventType.ERROR, builder.buildErrorEvent());
    eventEmitter.register(CartEventType.LOAD, builder.buildLoadEvent());
    eventEmitter.register(CartEventType.CHANGE, builder.buildChangeEvent());
    eventEmitter.register(CartEventType.MERGE, builder.buildMergeEvent());
    eventEmitter.register(CartEventType.ADD, builder.buildAddEvent());

    eventEmitter.register(
      CartEventType.ENTRY_CREATED,
      builder.buildEntryCreateEvent()
    );
    eventEmitter.register(
      CartEventType.ENTRY_UPDATED,
      builder.buildEntryUpdateEvent()
    );
    eventEmitter.register(
      CartEventType.ENTRY_REMOVED,
      builder.buildEntryRemoveEvent()
    );
  }
}
