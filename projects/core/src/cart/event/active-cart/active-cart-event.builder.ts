import { Injectable, Type } from '@angular/core';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../../event';
import { createFrom } from '../../../util/create-from';
import { ActiveCartService } from '../../facade';
import { MultiCartEvent } from '../multi-cart/multi-cart.event';
import {
  MultiCartAddEntryEvent,
  MultiCartAddEntryFailEvent,
  MultiCartAddEntrySuccessEvent,
} from '../multi-cart/multi-cart.events';
import {
  ActiveCartAddEntryEvent,
  ActiveCartAddEntryFailEvent,
  ActiveCartAddEntrySuccessEvent,
} from './active-cart.events';

/**
 * Registers active cart events, when being injected
 */
@Injectable({ providedIn: 'root' })
export class ActiveCartEventBuilder {
  constructor(
    protected event: EventService,
    protected activeCartService: ActiveCartService
  ) {
    this.register();
  }

  /**
   * Registers active cart events
   */
  protected register() {
    this.registerMapped(MultiCartAddEntryEvent, ActiveCartAddEntryEvent);
    this.registerMapped(
      MultiCartAddEntrySuccessEvent,
      ActiveCartAddEntrySuccessEvent
    );
    this.registerMapped(
      MultiCartAddEntryFailEvent,
      ActiveCartAddEntryFailEvent
    );
  }

  /**
   * Registers a stream of target events mapped from the source events that contain the active cart id.
   *
   * @param sourceType type of the source event
   * @param targetType type of the target event
   */
  private registerMapped<S extends MultiCartEvent, T extends S>(
    sourceType: Type<S>,
    targetType: Type<T>
  ): () => void {
    return this.event.register(
      targetType,
      this.event.get(sourceType).pipe(
        withLatestFrom(this.activeCartService.getActiveCartId()),
        filter(
          ([sourceEvent, activeCartId]) => sourceEvent.cartId === activeCartId
        ),
        map(([source]) => createFrom(targetType, source))
      )
    );
  }
}
