/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  PickupLocationsSearchFacade,
  PickupOption,
  PickupOptionFacade,
  RequiredDeepPath,
} from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { EMPTY, iif, Observable, of } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

type OrderEntryWithRequiredFields = RequiredDeepPath<
  OrderEntry,
  'entryNumber' | 'quantity' | 'product.code' | 'product.availableForPickup'
>;
export function orderEntryWithRequiredFields(
  orderEntry: OrderEntry | undefined
): orderEntry is OrderEntryWithRequiredFields {
  return (
    !!orderEntry &&
    orderEntry.entryNumber !== undefined &&
    orderEntry.quantity !== undefined &&
    orderEntry.product !== undefined &&
    orderEntry.product.code !== undefined &&
    orderEntry.product.availableForPickup !== undefined
  );
}

type CartWithIdAndUserId = RequiredDeepPath<Cart, 'guid' | 'user.uid' | 'code'>;
export function cartWithIdAndUserId(
  cart: Cart | undefined
): cart is CartWithIdAndUserId {
  return (
    !!cart &&
    cart.guid !== undefined &&
    cart.user !== undefined &&
    cart.user.uid !== undefined &&
    cart.code !== undefined
  );
}

@Component({
  selector: 'cx-cart-pickup-options-container',
  templateUrl: 'cart-pickup-options-container.component.html',
})
export class CartPickupOptionsContainerComponent implements OnInit {
  @ViewChild('open') element: ElementRef;

  pickupOption$: Observable<PickupOption | undefined>;
  displayName$: Observable<string>;
  availableForPickup$: Observable<boolean>;

  cartId: string;
  entryNumber: number;
  productCode: string;
  quantity: number;
  userId: string;
  private displayNameIsSet = false;

  constructor(
    @Optional() protected outlet: OutletContextData<OrderEntry>,
    protected activeCartFacade: ActiveCartFacade,
    protected launchDialogService: LaunchDialogService,
    protected preferredStoreService: PreferredStoreService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected pickupOptionFacade: PickupOptionFacade,
    protected vcr: ViewContainerRef
  ) {
    // Intentional empty constructor
  }

  ngOnInit() {
    this.pickupOptionFacade.setPageContext('CART');
    const outletContext =
      this.outlet?.context$?.pipe(filter(orderEntryWithRequiredFields)) ??
      EMPTY;

    this.availableForPickup$ = outletContext.pipe(
      map((orderEntry) => !!orderEntry.product.availableForPickup),
      startWith(false)
    );

    this.pickupOption$ = outletContext.pipe(
      withLatestFrom(
        this.activeCartFacade.getActive().pipe(filter(cartWithIdAndUserId))
      ),
      tap(([orderEntry, cart]) => {
        this.entryNumber = orderEntry.entryNumber;
        this.quantity = orderEntry.quantity;
        this.productCode = orderEntry.product.code;
        this.cartId = cart.user.uid === 'anonymous' ? cart.guid : cart.code;
        this.userId = cart.user.uid;
      }),
      switchMap(([orderEntry]) => {
        const pickupOption: PickupOption = orderEntry.deliveryPointOfService
          ? 'pickup'
          : 'delivery';
        this.pickupOptionFacade.setPickupOption(this.entryNumber, pickupOption);
        return this.pickupOptionFacade.getPickupOption(this.entryNumber);
      })
    );

    this.displayName$ = outletContext.pipe(
      map((orderEntry) => ({
        storeName: orderEntry.deliveryPointOfService?.name,
        productCode: orderEntry.product.code,
      })),
      switchMap(({ storeName, productCode }) =>
        iif(
          () => !!storeName,
          of(storeName as string).pipe(
            tap((storeName) => {
              return this.pickupLocationsSearchService.loadStoreDetails(
                storeName
              );
            }),
            concatMap((storeName) =>
              this.pickupLocationsSearchService.getStoreDetails(storeName)
            ),
            filter((storeDetails) => !!storeDetails)
          ),
          this.preferredStoreService.getPreferredStoreWithProductInStock(
            productCode
          )
        )
      ),
      map(({ displayName }) => displayName),
      filter((displayName): displayName is string => !!displayName),
      tap((_) => (this.displayNameIsSet = true))
    );
  }

  onPickupOptionChange(pickupOption: PickupOption): void {
    this.pickupOptionFacade.setPickupOption(this.entryNumber, pickupOption);
    if (pickupOption === 'delivery') {
      this.pickupLocationsSearchService.setPickupOptionToDelivery(
        this.cartId,
        this.entryNumber,
        this.userId,
        this.productCode,
        this.quantity
      );
      return;
    }

    if (!this.displayNameIsSet) {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      this.element,
      this.vcr,
      {
        productCode: this.productCode,
        entryNumber: this.entryNumber,
        quantity: this.quantity,
      }
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
}
