/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  CartType,
  DeleteCartFailEvent,
  DeleteCartSuccessEvent,
  DeliveryMode,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  Address,
  EventService,
  QueryState,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';
import {
  OpfCheckoutBillingAddressService,
  OpfCheckoutDeliveryAddressService,
  OpfCheckoutDeliveryModesService,
  OpfCheckoutQueryService,
  OpfGlobalMessageService,
} from '@spartacus/opf/base/root';
import { Observable, merge, of } from 'rxjs';
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
  protected checkoutQueryFacade = inject(OpfCheckoutQueryService);
  protected checkoutDeliveryModesFacade = inject(
    OpfCheckoutDeliveryModesService
  );
  protected checkoutDeliveryAddressFacade = inject(
    OpfCheckoutDeliveryAddressService
  );
  protected checkoutBillingAddressFacade = inject(
    OpfCheckoutBillingAddressService
  );
  protected userAddressService = inject(UserAddressService);
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);
  protected eventService = inject(EventService);

  protected opfGlobalMessageService = inject(OpfGlobalMessageService);
  protected currentCartId: string;
  protected isMulticart = false;

  setMultipleCart(value: boolean) {
    console.log('setMultipleCart');
    this.isMulticart = value;
    this.checkoutDeliveryAddressFacade.setMultipleCart(value);
    this.checkoutBillingAddressFacade.setMultipleCart(value);
    this.checkoutDeliveryModesFacade.setMultipleCart(value);
    this.checkoutQueryFacade.setMultipleCart(value);
  }

  protected addProductToActiveCart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    console.log('addProductToActiveCart');
    this.activeCartFacade.addEntry(productCode, quantity, pickupStore);
    return this.checkStableCart();
  }

  addProductToCart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    return this.isMulticart
      ? this.addMultipleProductToMultipleCart(
          productCode,
          quantity,
          pickupStore
        )
      : this.addProductToActiveCart(productCode, quantity, pickupStore);
  }

  protected addMultipleProductToMultipleCart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    console.log('addMultipleProductToMultipleCart');
    let _userId = '';
    return this.userIdService.takeUserId().pipe(
      switchMap((userId: string) => {
        console.log('userId', userId);
        _userId = userId;
        return of(userId);
      }),
      take(1),
      switchMap((userId) => {
        return this.multiCartFacade.createCart({
          userId,
          extraData: { active: true },
        });
      }),
      take(1),
      map((cart: Cart) => {
        console.log('cart created', cart);
        console.log('_userId', _userId);
        return _userId === 'current'
          ? (cart.code as string)
          : (cart.guid as string);
      }),
      switchMap((cartId: string) => {
        console.log('addEntry on ', cartId);
        this.currentCartId = cartId;
        this.multiCartFacade.addEntry(
          _userId,
          cartId,
          productCode,
          quantity,
          pickupStore
        );
        return this.checkStableCart();
      })
      // tap(() => {
      //   this.setMultipleCart(true);
      //   this.setDeliveryAddress({
      //     firstName: 'Jane',
      //     lastName: 'Smith',
      //     line1: '45 - 3rd floor',
      //     line2: '456 Elm St',
      //     town: 'Townsville',
      //     postalCode: '67890',
      //     phone: '555-5678',
      //     region: { isocode: 'JP-27' },
      //     country: {
      //       isocode: 'JP',
      //       name: 'Japan',
      //     },
      //   }).subscribe((address) => {
      //     console.log('address', address);
      //   });

      //   this.setBillingAddress({
      //     firstName: 'Jane',
      //     lastName: 'Smith',
      //     line1: '45 - 3rd floor',
      //     line2: '456 Elm St',
      //     town: 'Townsville',
      //     postalCode: '67890',
      //     phone: '555-5678',
      //     region: { isocode: 'JP-27' },
      //     country: {
      //       isocode: 'JP',
      //       name: 'Japan',
      //     },
      //   }).subscribe((address) => {
      //     console.log('address', address);
      //     this.getSupportedDeliveryModes().subscribe((list) => {
      //       console.log('getSupportedDeliveryModes', list);
      //       this.setDeliveryMode(list[0].code as any).subscribe({
      //         next: (value) => {
      //           console.log('setDeliveryMode', value);
      //         },
      //         error: (error) => {
      //           console.log('setDeliveryMode error', error);
      //         },
      //       });
      //     });
      //   });

      // })
    );
  }

  // addProductToCart(
  //   productCode: string,
  //   quantity: number,
  //   pickupStore?: string | undefined
  // ): Observable<boolean> {
  //   this.activeCartFacade.addEntry(productCode, quantity, pickupStore);
  //   return this.checkStableCart();
  // }

  checkStableCart(): Observable<boolean> {
    return this.isMulticart
      ? this.multiCartFacade.isStable(this.currentCartId).pipe(
          filter((isStable) => !!isStable),
          take(1)
        )
      : this.activeCartFacade.isStable().pipe(
          filter((isStable) => !!isStable),
          take(1)
        );
  }

  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.checkoutDeliveryModesFacade.getSupportedDeliveryModes();
  }

  setDeliveryAddress(address: Address): Observable<string> {
    console.log('setDeliveryAddress', address);
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
    console.log('setBillingAddress');
    return this.checkoutBillingAddressFacade
      .setBillingAddress(address)
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
    return this.isMulticart
      ? this.multiCartFacade.getCartIdByType(CartType.NEW_CREATED).pipe(
          switchMap((cartId) => this.multiCartFacade.getCart(cartId)),
          take(1)
        )
      : this.activeCartFacade.takeActive();
  }

  getCurrentCartId(): Observable<string> {
    return this.isMulticart
      ? this.multiCartFacade.getCartIdByType(CartType.NEW_CREATED)
      : this.activeCartFacade.takeActiveCartId();
  }

  getCurrentCartTotalPrice(): Observable<number | undefined> {
    return this.getCurrentCart().pipe(
      map((cart: Cart) => cart.totalPrice?.value)
    );
  }

  setDeliveryMode(mode: string): Observable<DeliveryMode | undefined> {
    console.log('setDeliveryMode');
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
