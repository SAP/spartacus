import { Injectable } from '@angular/core';
import { EventRegister } from '../../events';
import { CartEventBuilder } from './cart-event.builder';
import { CartEventType } from './cart-event.model';

@Injectable({
  providedIn: 'root',
})
export class CartEventService {
  constructor(
    protected eventRegister: EventRegister,
    protected builder: CartEventBuilder
  ) {
    eventRegister.register(CartEventType.BUSY, builder.buildBusyEvent());
    eventRegister.register(CartEventType.ERROR, builder.buildErrorEvent());
    eventRegister.register(CartEventType.LOAD, builder.buildLoadEvent());
    eventRegister.register(CartEventType.CHANGE, builder.buildChangeEvent());
    eventRegister.register(CartEventType.MERGE, builder.buildMergeEvent());
    eventRegister.register(CartEventType.ADD, builder.buildAddEvent());

    eventRegister.register(
      CartEventType.ENTRY_CREATED,
      builder.buildEntryCreateEvent()
    );
    eventRegister.register(
      CartEventType.ENTRY_UPDATED,
      builder.buildEntryUpdateEvent()
    );
    eventRegister.register(
      CartEventType.ENTRY_REMOVED,
      builder.buildEntryRemoveEvent()
    );
  }
}
