import { Injectable, Type } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import {
  CloneSavedCartEvent,
  CloneSavedCartFailEvent,
  CloneSavedCartSuccessEvent,
  DeleteSavedCartEvent,
  DeleteSavedCartFailEvent,
  DeleteSavedCartSuccessEvent,
  EditSavedCartEvent,
  EditSavedCartFailEvent,
  EditSavedCartSuccessEvent,
  RestoreSavedCartEvent,
  RestoreSavedCartFailEvent,
  RestoreSavedCartSuccessEvent,
  SaveCartEvent,
  SaveCartFailEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
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
import { SavedCartActions } from '../store/actions/index';

@Injectable({ providedIn: 'root' })
export class SavedCartEventBuilder {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService,
    protected stateEventService: StateEventService,
    protected multiCartService: MultiCartService
  ) {
    this.register();
  }

  /**
   * Registers events for the saved cart
   */
  protected register(): void {
    this.registerRestoreSavedCartEvents();
    this.registerDeleteSavedCartEvents();
    this.registerSaveCartEvents();
    this.registerEditSavedCartEvents();
    this.registerCloneSavedCartEvents();
  }

  /**
   * Registers restore saved cart events
   */
  protected registerRestoreSavedCartEvents(): void {
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

  /**
   * Registers delete saved cart events
   */
  protected registerDeleteSavedCartEvents(): void {
    this.stateEventService.register({
      action: CartActions.DELETE_CART,
      event: DeleteSavedCartEvent,
      factory: (action: CartActions.DeleteCart) =>
        createFrom(DeleteSavedCartEvent, {
          ...action.payload,
          cartCode: action.payload.cartId,
        }),
    });

    this.stateEventService.register({
      action: CartActions.DELETE_CART_SUCCESS,
      event: DeleteSavedCartSuccessEvent,
      factory: (action: CartActions.DeleteCartSuccess) =>
        createFrom(DeleteSavedCartSuccessEvent, {
          ...action.payload,
          cartCode: action.payload.cartId,
        }),
    });

    this.stateEventService.register({
      action: CartActions.DELETE_CART_FAIL,
      event: DeleteSavedCartFailEvent,
      factory: (action: CartActions.DeleteCartFail) =>
        createFrom(DeleteSavedCartFailEvent, {
          ...action.payload,
          cartCode: action.payload.cartId,
        }),
    });
  }

  /**
   * Registers save cart events
   */
  protected registerSaveCartEvents(): void {
    this.buildSaveCartSuccessEvent({
      action: SavedCartActions.SAVE_CART_SUCCESS,
      event: SaveCartSuccessEvent,
    });

    this.stateEventService.register({
      action: SavedCartActions.SAVE_CART_FAIL,
      event: SaveCartFailEvent,
      factory: (action: SavedCartActions.SaveCartFail) =>
        createFrom(SaveCartFailEvent, {
          ...action.payload,
          cartCode: action.payload.cartId,
        }),
    });

    this.stateEventService.register({
      action: SavedCartActions.SAVE_CART,
      event: SaveCartEvent,
      factory: (action: SavedCartActions.SaveCart) => {
        return createFrom(SaveCartEvent, {
          ...action.payload,
          cartCode: action.payload.cartId,
        });
      },
    });
  }

  /**
   * Registers edit saved cart events
   */
  protected registerEditSavedCartEvents(): void {
    this.buildSaveCartSuccessEvent({
      action: SavedCartActions.EDIT_SAVED_CART_SUCCESS,
      event: EditSavedCartSuccessEvent,
    });

    this.stateEventService.register({
      action: SavedCartActions.EDIT_SAVED_CART_FAIL,
      event: EditSavedCartFailEvent,
      factory: (action: SavedCartActions.EditSavedCartFail) =>
        createFrom(EditSavedCartFailEvent, {
          ...action.payload,
          cartCode: action.payload.cartId,
        }),
    });

    this.stateEventService.register({
      action: SavedCartActions.EDIT_SAVED_CART,
      event: EditSavedCartEvent,
      factory: (action: SavedCartActions.EditSavedCart) => {
        return createFrom(EditSavedCartEvent, {
          ...action.payload,
          cartCode: action.payload.cartId,
        });
      },
    });
  }

  /**
   * Registers clone saved cart events
   */
  protected registerCloneSavedCartEvents(): void {
    this.buildRestoreSavedCartEvents({
      action: SavedCartActions.CLONE_SAVED_CART,
      event: CloneSavedCartEvent,
    });

    this.buildRestoreSavedCartEvents({
      action: SavedCartActions.CLONE_SAVED_CART_SUCCESS,
      event: CloneSavedCartSuccessEvent,
    });

    this.buildRestoreSavedCartEvents({
      action: SavedCartActions.CLONE_SAVED_CART_FAIL,
      event: CloneSavedCartFailEvent,
    });
  }

  /**
   * Builds the restore save cart events from the action and cart
   *
   * @param mapping mapping declaration from `action` string type to `event` class type
   * @param saveTime should the saveTime attribute be added to the event
   * @returns
   */
  protected buildRestoreSavedCartEvents<T>(
    mapping: ActionToEventMapping<T>
  ): () => void {
    const eventStream$ = this.getAction(mapping.action).pipe(
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(this.multiCartService.getCart(action.payload.cartId))
        )
      ),
      map(([action, cart]) =>
        createFrom(mapping.event as Type<T>, {
          ...action.payload,
          cartCode: cart.code,
          saveCartName: cart.name,
          saveCartDescription: cart.description,
          ...(cart.saveTime && { saveTime: cart.saveTime }),
        })
      )
    );
    return this.eventService.register(mapping.event as Type<T>, eventStream$);
  }

  /**
   * Builds save cart event by adding the saveTime from the cart
   *
   * @param mapping mapping declaration from `action` string type to `event` class type
   * @returns events register function
   */
  protected buildSaveCartSuccessEvent<T>(
    mapping: ActionToEventMapping<T>
  ): () => void {
    const eventStream$ = this.getAction(mapping.action).pipe(
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(this.multiCartService.getCart(action.payload.cartId))
        )
      ),
      filter(([, cart]) => Boolean(cart)),
      map(([action, cart]) =>
        createFrom(mapping.event as Type<T>, {
          ...action.payload,
          cartCode: cart.code,
          saveTime: cart.saveTime,
        })
      )
    );
    return this.eventService.register(mapping.event as Type<T>, eventStream$);
  }

  /**
   * Returns a stream of actions only of a given type(s)
   *
   * @param actionType type(s) of actions
   */
  protected getAction(
    actionType: string | string[]
  ): Observable<{ type: string; payload?: any }> {
    return this.actionsSubject.pipe(
      ofType(...([] as string[]).concat(actionType))
    );
  }
}
