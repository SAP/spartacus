/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  DeleteCartFailEvent,
  DeleteCartSuccessEvent,
  DeliveryMode,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  CheckoutBillingAddressFacade,
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  EventService,
  QueryState,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';
import { OpfGlobalMessageService } from '@spartacus/opf/base/root';
import { Observable, merge } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { OpfCartHandlerInterface } from './opf-cart-handler-interface';

@Injectable({
  providedIn: 'root',
})
export class OpfMultiCartHandlerService implements OpfCartHandlerInterface {
  protected activeCartFacade = inject(ActiveCartFacade);
  protected checkoutDeliveryModesFacade = inject(CheckoutDeliveryModesFacade);
  protected checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressFacade
  );
  protected userAddressService = inject(UserAddressService);
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);
  protected eventService = inject(EventService);
  protected checkoutBillingAddressFacade = inject(CheckoutBillingAddressFacade);
  protected opfGlobalMessageService = inject(OpfGlobalMessageService);
  protected currentCartId: string;

  // addProductToCart(
  //   productCode: string,
  //   quantity: number,
  //   pickupStore?: string | undefined
  // ): Observable<string> {
  //   console.log('createCart');
  //   let _userId = '';
  //   return this.userIdService.takeUserId().pipe(
  //     switchMap((userId: string) => {
  //       console.log('userId', userId);
  //       _userId = userId;
  //       return this.multiCartFacade
  //         .createCart({
  //           userId,
  //           extraData: { active: false },
  //         })
  //         .pipe(
  //           map((cart: Cart) => {
  //             console.log('cart created', cart);
  //             return _userId === 'current'
  //               ? (cart.code as string)
  //               : (cart.guid as string);
  //           }),
  //           tap((cartId: string) => {
  //             console.log('addEntry on ', cartId);
  //             this.currentCartId = cartId;
  //             this.multiCartFacade.addEntry(
  //               userId,
  //               cartId,
  //               productCode,
  //               quantity,
  //               pickupStore
  //             );
  //           }),
  //           map(() => this.checkStableCart())
  //         );
  //     })
  //   );
  // }

  addProductToCart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    this.activeCartFacade.addEntry(productCode, quantity, pickupStore);
    return this.checkStableCart();
  }

  checkStableCart(): Observable<boolean> {
    return this.multiCartFacade.isStable(this.currentCartId).pipe(
      filter((isStable) => !!isStable),
      take(1)
    );
  }

  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.checkoutDeliveryModesFacade.getSupportedDeliveryModes();
  }

  setDeliveryAddress(address: Address): Observable<string> {
    this.opfGlobalMessageService.disableGlobalMessage([
      'addressForm.userAddressAddSuccess',
    ]);
    return this.checkoutDeliveryAddressFacade.createAndSetAddress(address).pipe(
      switchMap(() => this.checkStableCart()),
      switchMap(() =>
        this.getDeliveryAddress().pipe(
          map((addr: Address | undefined) => addr?.id ?? '')
        )
      )
    );
  }

  setBillingAddress(address: Address): Observable<boolean> {
    return this.checkoutBillingAddressFacade
      .setBillingAddress(address, this.currentCartId)
      .pipe(switchMap(() => this.checkStableCart()));
  }

  getDeliveryAddress(): Observable<Address | undefined> {
    return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state: QueryState<Address | undefined>) => !state.loading),
      take(1),
      map((state: QueryState<Address | undefined>) => {
        return state.data;
      })
    );
  }

  getCurrentCart(): Observable<Cart> {
    return this.activeCartFacade.takeActive();
  }

  getCurrentCartId(): Observable<string> {
    return this.activeCartFacade.takeActiveCartId();
  }

  getCurrentCartTotalPrice(): Observable<number | undefined> {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart: Cart) => cart.totalPrice?.value));
  }

  setDeliveryMode(mode: string): Observable<DeliveryMode | undefined> {
    return this.checkoutDeliveryModesFacade.setDeliveryMode(mode).pipe(
      switchMap(() =>
        this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState()
      ),
      filter(
        (state: QueryState<DeliveryMode | undefined>) =>
          !state.error && !state.loading
      ),
      take(1),
      map((state: QueryState<DeliveryMode | undefined>) => state.data)
    );
  }

  getSelectedDeliveryMode(): Observable<DeliveryMode | undefined> {
    return this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(
      filter(
        (state: QueryState<DeliveryMode | undefined>) =>
          !state.error && !state.loading
      ),
      take(1),
      map((state: QueryState<DeliveryMode | undefined>) => state.data)
    );
  }

  deleteUserAddresses(addrIds: string[]): void {
    this.opfGlobalMessageService.disableGlobalMessage([
      'addressForm.userAddressDeleteSuccess',
    ]);
    addrIds.forEach((addrId) => {
      this.userAddressService.deleteUserAddress(addrId);
    });
  }

  deleteCurrentCart(): Observable<boolean> {
    return this.activeCartFacade.getActiveCartId().pipe(
      withLatestFrom(this.userIdService.getUserId()),
      take(1),
      tap(([cartId, userId]: [string, string]) => {
        this.multiCartFacade.deleteCart(cartId, userId);
      }),
      switchMap(() =>
        merge(
          this.eventService.get(DeleteCartSuccessEvent).pipe(map(() => true)),
          this.eventService.get(DeleteCartFailEvent).pipe(map(() => false))
        ).pipe(take(1))
      )
    );
  }
}
