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
    eventRegister.register(CartEventType.BUSY, builder.busyEvent);
    eventRegister.register(CartEventType.ERROR, builder.errorEvent);
    eventRegister.register(CartEventType.LOAD, builder.loadEvent);
    eventRegister.register(CartEventType.CHANGE, builder.changeEvent);
    eventRegister.register(CartEventType.MERGE, builder.mergeEvent);
    eventRegister.register(CartEventType.ADD, builder.addEvent);

    eventRegister.register(
      CartEventType.ENTRY_CREATED,
      builder.entryCreateEvent
    );
    eventRegister.register(
      CartEventType.ENTRY_UPDATED,
      builder.entryUpdateEvent
    );
    eventRegister.register(
      CartEventType.ENTRY_REMOVED,
      builder.entryRemoveEvent
    );
  }
}
