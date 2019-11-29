import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter } from '../../events';
import { CartEventBuilder } from './cart-event.builder';
import { CartAddEvent } from './cart-event.model';

@Injectable({
  providedIn: 'root',
})
export class CartEventService {
  constructor(
    protected eventRegister: EventEmitter,
    protected builder: CartEventBuilder
  ) {
    // this.attach(CartBusyEvent, builder.buildBusyEvent());
    // this.attach(CartErrorEvent, builder.buildErrorEvent());
    // this.attach(CartLoadEvent, builder.buildLoadEvent());
    // this.attach(CartChangeEvent, builder.buildChangeEvent());
    // this.attach(CartMergeEvent, builder.buildMergeEvent());
    this.attach(CartAddEvent, builder.buildAddEvent());
    // this.attach(CartAddEntryEvent, builder.buildEntryCreateEvent());
    // this.attach(CartUpdateEntryEvent, builder.buildEntryUpdateEvent());
    // this.attach(CartRemoveEntryEvent, builder.buildEntryRemoveEvent());
  }

  private attach<T>(eventType: Type<T>, value$: Observable<any>): void {
    this.eventRegister.attach(
      eventType,
      value$.pipe(map(state => <any>{ state }))
    );
  }
}
