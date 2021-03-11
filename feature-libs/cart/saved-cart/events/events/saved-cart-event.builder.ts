import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import {
  ActionToEventMapping,
  CartActions,
  createFrom,
  EventService,
  MultiCartService,
  StateEventService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SavedCartService } from '../../core/services';
import { SavedCartActions } from '../../core/store';
import { SaveCartFail } from '../../core/store/actions/saved-cart.action';
import {
  DeleteSavedCartEvent,
  DeleteSavedCartSuccessEvent,
  RestoreSavedCartEvent,
  RestoreSavedCartFailEvent,
  RestoreSavedCartSuccessEvent,
  SaveCartEvent,
  SaveCartSuccessEvent,
} from './saved-cart.events';

@Injectable({ providedIn: 'root' })
export class SavedCartEventBuilder {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService,
    protected stateEventService: StateEventService,
    protected savedCartService: SavedCartService,
    protected multiCartService: MultiCartService
  ) {
    this.register();
  }

  /**
   * Registers events for the saved cart
   */
  protected register(): void {
    this.registerRestoreEvents();
    this.registerDeleteEvents();
    this.registerSaveEvents();
  }

  protected registerRestoreEvents(): void {
    // this.stateEventService.register({
    //   action: SavedCartActions.RESTORE_SAVED_CART,
    //   event: RestoreSavedCartEvent,
    // });

    // this.stateEventService.register({
    //   action: SavedCartActions.RESTORE_SAVED_CART_SUCCESS,
    //   event: RestoreSavedCartSuccessEvent,
    // });

    // this.stateEventService.register({
    //   action: SavedCartActions.RESTORE_SAVED_CART_FAIL,
    //   event: RestoreSavedCartFailEvent,
    // });

    this.buildRestoreSavedCartEvents({
      action: SavedCartActions.RESTORE_SAVED_CART,
      event: RestoreSavedCartEvent,
    });

    this.buildRestoreSavedCartEvents({
      action: SavedCartActions.RESTORE_SAVED_CART_SUCCESS,
      event: RestoreSavedCartSuccessEvent,
    });

    this.buildRestoreSavedCartEvents({
      action: SavedCartActions.RESTORE_SAVED_CART_FAIL,
      event: RestoreSavedCartFailEvent,
    });
  }

  protected registerDeleteEvents(): void {
    // this.stateEventService.register({
    //   action: CartActions.DELETE_CART,
    //   event: DeleteSavedCartEvent,
    // });

    // this.stateEventService.register({
    //   action: CartActions.DELETE_CART_SUCCESS,
    //   event: DeleteSavedCartSuccessEvent,
    // });

    // this.stateEventService.register({
    //   action: CartActions.DELETE_CART_FAIL,
    //   event: DeleteSavedCartEvent,
    // });

    this.buildDeleteSavedCartEvents({
      action: CartActions.DELETE_CART,
      event: DeleteSavedCartEvent,
    });

    this.buildDeleteSavedCartEvents({
      action: CartActions.DELETE_CART_SUCCESS,
      event: DeleteSavedCartSuccessEvent,
    });

    this.buildDeleteSavedCartEvents({
      action: CartActions.DELETE_CART_SUCCESS,
      event: DeleteSavedCartSuccessEvent,
    });
  }

  protected registerSaveEvents(): void {
    // this.stateEventService.register({
    //   action: SavedCartActions.SAVE_CART,
    //   event: SaveCartEvent,
    // });

    // this.stateEventService.register({
    //   action: SavedCartActions.SAVE_CART_SUCCESS,
    //   event: SaveCartSuccessEvent,
    // });

    this.buildSaveCartSuccessEvent({
      action: SavedCartActions.SAVE_CART,
      event: SaveCartEvent,
    });

    this.buildSaveCartSuccessEvent({
      action: SavedCartActions.SAVE_CART_SUCCESS,
      event: SaveCartSuccessEvent,
    });

    this.buildSaveCartSuccessEvent({
      action: SavedCartActions.SAVE_CART_FAIL,
      event: SaveCartFail,
    });
  }

  protected buildDeleteSavedCartEvents<T>(
    mapping: ActionToEventMapping<T>
  ): () => void {
    const eventStream$ = this.getAction(mapping.action).pipe(
      map((action) =>
        createFrom(mapping.event, {
          ...action.payload,
          cartCode: action.payload.carId,
        })
      )
    );
    return this.eventService.register(mapping.event, eventStream$);
  }

  protected buildRestoreSavedCartEvents<T>(
    mapping: ActionToEventMapping<T>
  ): () => void {
    const eventStream$ = this.getAction(mapping.action).pipe(
      switchMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.multiCartService.getCart(action.payload.cartId))
        );
      }),
      filter(([, cart]) => Boolean(cart)),
      map(([action, cart]) =>
        createFrom(mapping.event, {
          ...action.payload,
          cartCode: cart.code,
          saveCartName: cart.name,
          saveCartDescription: cart.description,
        })
      )
    );
    return this.eventService.register(mapping.event, eventStream$);
  }

  protected buildSaveCartSuccessEvent<T>(
    mapping: ActionToEventMapping<T>
  ): () => void {
    const eventStream$ = this.getAction(mapping.action).pipe(
      switchMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.multiCartService.getCart(action.payload.cartId))
        );
      }),
      filter(([, cart]) => Boolean(cart)),
      map(([action, cart]) =>
        createFrom(mapping.event, {
          ...action.payload,
          cartCode: cart.code,
          saveTime: cart.saveTime,
        })
      )
    );
    return this.eventService.register(mapping.event, eventStream$);
  }

  /**
   * Returns a stream of actions only of a given type(s)
   *
   * @param actionType type(s) of actions
   */
  protected getAction(
    actionType: string | string[]
  ): Observable<{ type: string; payload?: any }> {
    return this.actionsSubject.pipe(ofType(...[].concat(actionType)));
  }
}
