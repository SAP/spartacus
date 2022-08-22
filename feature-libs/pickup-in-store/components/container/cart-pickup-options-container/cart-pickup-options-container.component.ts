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
} from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { PickRequiredDeep } from 'feature-libs/pickup-in-store/core/utils/type-utils';
import { EMPTY, Observable } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  startWith,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

type OrderEntryWithRequiredFields = PickRequiredDeep<
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

type CartWithIdAndUserId = PickRequiredDeep<Cart, 'guid' | 'user.uid'>;
export function cartWithIdAndUserId(
  cart: Cart | undefined
): cart is CartWithIdAndUserId {
  return (
    !!cart &&
    cart.guid !== undefined &&
    cart.user !== undefined &&
    cart.user.uid !== undefined
  );
}

@Component({
  selector: 'cx-cart-pickup-options-container',
  templateUrl: 'cart-pickup-options-container.component.html',
})
export class CartPickupOptionsContainerComponent implements OnInit {
  @ViewChild('open') element: ElementRef;

  pickupOption$: Observable<PickupOption>;
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
    protected vcr: ViewContainerRef
  ) {
    // Intentional empty constructor
  }

  ngOnInit() {
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
        this.cartId = cart.guid;
        this.userId = cart.user.uid;
      }),
      map(
        ([orderEntry]): PickupOption =>
          orderEntry.deliveryPointOfService ? 'pickup' : 'delivery'
      )
    );

    this.displayName$ = outletContext.pipe(
      map((orderEntry) => orderEntry.deliveryPointOfService?.name),
      filter((name): name is string => !!name),
      tap((storeName) =>
        this.pickupLocationsSearchService.loadStoreDetails(storeName)
      ),
      concatMap((storeName) =>
        this.pickupLocationsSearchService.getStoreDetails(storeName)
      ),
      map((store) => store?.displayName ?? ''),
      tap((_displayName) => _displayName && (this.displayNameIsSet = true))
    );
  }

  onPickupOptionChange(pickupOption: PickupOption): void {
    pickupOption === 'delivery' &&
      this.pickupLocationsSearchService.setPickupOptionDelivery(
        this.cartId,
        this.entryNumber,
        this.userId,
        '',
        this.productCode,
        this.quantity
      );

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
