import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { CartActions, EventService, StateEventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SavedCartService } from '../../core/services';
import { SavedCartActions } from '../../core/store';
import {
  DeleteSaveCartEvent,
  DeleteSaveCartSuccessEvent,
  RestoreSavedCartEvent,
  RestoreSavedCartFailEvent,
  RestoreSavedCartSuccessEvent,
  SaveCartEvent,
} from './save-cart.events';

@Injectable({ providedIn: 'root' })
export class SaveCartEventBuilder {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService,
    protected stateEventService: StateEventService,
    protected savedCartService: SavedCartService
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
    this.stateEventService.register({
      action: SavedCartActions.RESTORE_SAVED_CART,
      event: RestoreSavedCartEvent,
    });

    this.stateEventService.register({
      action: SavedCartActions.RESTORE_SAVED_CART_SUCCESS,
      event: RestoreSavedCartSuccessEvent,
    });

    this.stateEventService.register({
      action: SavedCartActions.RESTORE_SAVED_CART_FAIL,
      event: RestoreSavedCartFailEvent,
    });
  }

  protected registerDeleteEvents(): void {
    this.stateEventService.register({
      action: CartActions.DELETE_CART,
      event: DeleteSaveCartEvent,
    });

    this.stateEventService.register({
      action: CartActions.DELETE_CART_SUCCESS,
      event: DeleteSaveCartSuccessEvent,
    });

    this.stateEventService.register({
      action: CartActions.DELETE_CART_FAIL,
      event: DeleteSaveCartEvent,
    });
  }

  protected registerSaveEvents(): void {
    this.stateEventService.register({
      action: SavedCartActions.SAVE_CART,
      event: SaveCartEvent,
    });
  }

  // protected buildSaveCartSuccessEvent<T>(mapping: ActionToEventMapping<T>): () => void {
  //   const eventStream$ = this.getAction(mapping.action).pipe(
  //     switchMap((action) => {
  //       // SwitchMap was used instead of withLatestFrom, because we only want to subscribe to cart stream when action is dispatched.
  //       // Using withLatestFrom would trigger subscription to cart observables on event subscription and that causes side effects,
  //       // such as loading cart when we don't yet need it.
  //       return of(action).pipe(
  //         withLatestFrom(
  //           this.savedCartService.get(action.payload.),
  //           this.activeCartService.getActiveCartId()
  //         )
  //       );
  //     }),
  //     filter(
  //       ([action, _activeCart, activeCartId]) =>
  //         action.payload['cartId'] === activeCartId
  //     ),
  //     map(([action, activeCart]) =>
  //       createFrom(mapping.event, {
  //         ...action.payload,
  //         cartCode: activeCart.code,
  //         entry: action.payload.entry
  //           ? action.payload.entry
  //           : activeCart.entries[Number(action.payload.entryNumber)],
  //       })
  //     )
  //   );
  //   return this.eventService.register(mapping.event, eventStream$);
  // }

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
