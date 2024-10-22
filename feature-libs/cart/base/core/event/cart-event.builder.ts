/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Type } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import {
  ActiveCartFacade,
  AddCartVoucherEvent,
  AddCartVoucherFailEvent,
  AddCartVoucherSuccessEvent,
  CartAddEntryEvent,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartRemoveEntryFailEvent,
  CartRemoveEntrySuccessEvent,
  CartRemoveEntryGroupFailEvent,
  CartRemoveEntryGroupSuccessEvent,
  CartUpdateEntryFailEvent,
  CartUpdateEntrySuccessEvent,
  CreateCartEvent,
  CreateCartFailEvent,
  CreateCartSuccessEvent,
  DeleteCartEvent,
  DeleteCartFailEvent,
  DeleteCartSuccessEvent,
  RemoveCartVoucherEvent,
  RemoveCartVoucherFailEvent,
  RemoveCartVoucherSuccessEvent,
  MergeCartSuccessEvent,
} from '@spartacus/cart/base/root';
import {
  ActionToEventMapping,
  createFrom,
  EventService,
  StateEventService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CartActions } from '../store/index';

/**
 * Registers events for the active cart
 */
@Injectable({ providedIn: 'root' })
export class CartEventBuilder {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected event: EventService,
    protected activeCartService: ActiveCartFacade,
    protected stateEventService: StateEventService
  ) {
    this.register();
  }

  /**
   * Registers events for the active cart
   */
  protected register() {
    this.registerCreateCart();
    this.registerAddEntry();
    this.registerRemoveEntry();
    this.registerUpdateEntry();
    this.registerRemoveEntryGroup();
    this.registerDeleteCart();
    this.registerAddCartVoucher();
    this.registerRemoveCartVoucher();
    this.registerMergeCartSuccess();
  }

  /**
   * Register events for adding entry to the active cart
   */
  protected registerAddEntry(): void {
    this.registerMapped({
      action: CartActions.CART_ADD_ENTRY,
      event: CartAddEntryEvent,
    });
    this.registerMapped({
      action: CartActions.CART_ADD_ENTRY_SUCCESS,
      event: CartAddEntrySuccessEvent,
    });
    this.registerMapped({
      action: CartActions.CART_ADD_ENTRY_FAIL,
      event: CartAddEntryFailEvent,
    });
  }

  protected registerRemoveEntry(): void {
    this.registerMapped({
      action: CartActions.CART_REMOVE_ENTRY_SUCCESS,
      event: CartRemoveEntrySuccessEvent,
    });
    this.registerMapped({
      action: CartActions.CART_REMOVE_ENTRY_FAIL,
      event: CartRemoveEntryFailEvent,
    });
  }

  protected registerRemoveEntryGroup(): void {
    this.registerMapped({
      action: CartActions.CART_REMOVE_ENTRYGROUP_SUCCESS,
      event: CartRemoveEntryGroupSuccessEvent,
    });
    this.registerMapped({
      action: CartActions.CART_REMOVE_ENTRYGROUP_FAIL,
      event: CartRemoveEntryGroupFailEvent,
    });
  }

  protected registerUpdateEntry(): void {
    this.registerMapped({
      action: CartActions.CART_UPDATE_ENTRY_SUCCESS,
      event: CartUpdateEntrySuccessEvent,
    });
    this.registerMapped({
      action: CartActions.CART_UPDATE_ENTRY_FAIL,
      event: CartUpdateEntryFailEvent,
    });
  }

  protected registerMergeCartSuccess(): void {
    this.registerMapped({
      action: CartActions.MERGE_CART_SUCCESS,
      event: MergeCartSuccessEvent,
    });
  }

  protected registerCreateCart(): void {
    this.stateEventService.register({
      action: CartActions.CREATE_CART,
      event: CreateCartEvent,
    });
    this.stateEventService.register({
      action: CartActions.CREATE_CART_SUCCESS,
      event: CreateCartSuccessEvent,
    });
    this.stateEventService.register({
      action: CartActions.CREATE_CART_FAIL,
      event: CreateCartFailEvent,
    });
  }

  /**
   * Registers delete cart events
   */
  protected registerDeleteCart(): void {
    this.stateEventService.register({
      action: CartActions.DELETE_CART,
      event: DeleteCartEvent,
      factory: (action: CartActions.DeleteCart) =>
        createFrom(DeleteCartEvent, {
          ...action.payload,
          cartCode: action.payload.cartId,
        }),
    });

    this.stateEventService.register({
      action: CartActions.DELETE_CART_SUCCESS,
      event: DeleteCartSuccessEvent,
      factory: (action: CartActions.DeleteCartSuccess) =>
        createFrom(DeleteCartSuccessEvent, {
          ...action.payload,
          cartCode: action.payload.cartId,
        }),
    });

    this.stateEventService.register({
      action: CartActions.DELETE_CART_FAIL,
      event: DeleteCartFailEvent,
      factory: (action: CartActions.DeleteCartFail) =>
        createFrom(DeleteCartFailEvent, {
          ...action.payload,
          cartCode: action.payload.cartId,
        }),
    });
  }

  protected registerAddCartVoucher(): void {
    this.stateEventService.register({
      action: CartActions.CART_ADD_VOUCHER,
      event: AddCartVoucherEvent,
    });

    this.stateEventService.register({
      action: CartActions.CART_ADD_VOUCHER_SUCCESS,
      event: AddCartVoucherSuccessEvent,
    });

    this.stateEventService.register({
      action: CartActions.CART_ADD_VOUCHER_FAIL,
      event: AddCartVoucherFailEvent,
    });
  }

  protected registerRemoveCartVoucher(): void {
    this.stateEventService.register({
      action: CartActions.CART_REMOVE_VOUCHER,
      event: RemoveCartVoucherEvent,
    });

    this.stateEventService.register({
      action: CartActions.CART_REMOVE_VOUCHER_SUCCESS,
      event: RemoveCartVoucherSuccessEvent,
    });

    this.stateEventService.register({
      action: CartActions.CART_REMOVE_VOUCHER_FAIL,
      event: RemoveCartVoucherFailEvent,
    });
  }

  /**
   * Registers a stream of target events mapped from the source actions that contain the cart id equal to the active cart id.
   *
   * @param mapping mapping declaration - from `action` string type to `event` class type
   *   (an with optional `factory` function - by default `action.payload` will be assigned to the properties of the event instance).
   */
  protected registerMapped<T>(mapping: ActionToEventMapping<T>): () => void {
    const eventStream$ = this.getAction(mapping.action).pipe(
      switchMap((action) => {
        // SwitchMap was used instead of withLatestFrom, because we only want to subscribe to cart stream when action is dispatched.
        // Using withLatestFrom would trigger subscription to cart observables on event subscription and that causes side effects,
        // such as loading cart when we don't yet need it.
        return of(action).pipe(
          withLatestFrom(
            this.activeCartService.getActive(),
            this.activeCartService.getActiveCartId()
          )
        );
      }),
      filter(
        ([action, _activeCart, activeCartId]) =>
          action.payload['cartId'] === activeCartId
      ),
      map(([action, activeCart]) =>
        createFrom(mapping.event as Type<T>, {
          ...action.payload,
          cartCode: activeCart.code,
          entry: action.payload.entry
            ? action.payload.entry
            : activeCart.entries?.[Number(action.payload.entryNumber)],
        })
      )
    );
    return this.event.register(mapping.event as Type<T>, eventStream$);
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
