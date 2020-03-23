import { Injectable, Type } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { EventService } from '../../event';
import { ActiveCartService } from '../facade';
import { ActiveCartEvents } from './active-cart.events';
import { MultiCartEvents } from './multi-cart.events';

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
    return this.registerMapped(
      MultiCartEvents.MultiCartAddEntry,
      ActiveCartEvents.ActiveCartAddEntry
    );
  }

  /**
   * Registers a stream of target events mapped from the source events that contain the active cart id.
   *
   * @param sourceType type of the source event
   * @param targetType type of the target event
   */
  private registerMapped<
    S extends { cartId: string },
    T extends { cartId: string }
  >(sourceType: Type<S>, targetType: Type<T>): () => void {
    return this.event.register(
      targetType,
      this.event.get(sourceType).pipe(
        filter(({ cartId }) => this.isActive(cartId)),
        map(source => new targetType(source))
      )
    );
  }

  /**
   * Returns whether the given cartId is the id of the active cart
   */
  private isActive(cartId: string): boolean {
    let activeCartId;
    this.activeCartService
      .getActiveCartId()
      .subscribe(id => (activeCartId = id))
      .unsubscribe();
    return cartId === activeCartId;
  }
}
