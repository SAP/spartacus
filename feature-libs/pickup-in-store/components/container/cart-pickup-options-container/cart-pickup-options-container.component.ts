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
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
  PickupOption,
} from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  OutletContextData,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-pickup-options-container',
  templateUrl: 'cart-pickup-options-container.component.html',
})
export class CartPickupOptionsContainerComponent implements OnInit {
  @ViewChild('open') element: ElementRef;
  subscription = new Subscription();
  pickupOption$: Observable<PickupOption>;
  displayName$: Observable<string>;
  cartId: string;
  name: string;
  entryNumber: number;
  productCode: string;
  quantity: number;
  userId: string;
  displayPickupLocation$: Observable<string | undefined>;
  availableForPickup = false;
  private displayNameIsSet = false;

  constructor(
    @Optional() protected outlet: OutletContextData<OrderEntry>,
    protected activeCartFacade: ActiveCartFacade,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    protected launchDialogService: LaunchDialogService,
    protected preferredStoreService: PreferredStoreService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected vcr: ViewContainerRef
  ) {
    // Intentional empty constructor
  }

  ngOnInit() {
    this.pickupOption$ = this.outlet?.context$.pipe(
      filter((outletContextData) => !!outletContextData),
      tap((outletContextData) => {
        this.entryNumber = outletContextData.entryNumber ?? -1;
        this.quantity = outletContextData.quantity ?? -1;
        this.productCode = outletContextData.product?.code || '';
        this.name = outletContextData.deliveryPointOfService?.name ?? '';
      }),
      map(
        (item): PickupOption =>
          item.deliveryPointOfService ? 'pickup' : 'delivery'
      )
    );

    this.displayName$ = this.outlet?.context$.pipe(
      filter((entry) => !!entry),
      map((entry) => entry.deliveryPointOfService?.name),
      filter((name): name is string => !!name),
      tap((storeName) =>
        this.pickupLocationsSearchService.loadStoreDetails(storeName)
      ),
      switchMap((storeName) =>
        this.pickupLocationsSearchService.getStoreDetails(storeName)
      ),
      map((store) => store?.displayName ?? ''),
      tap((_displayName) => _displayName && (this.displayNameIsSet = true))
    );

    this.activeCartFacade
      .getActive()
      .pipe(
        tap((cart) => (this.cartId = cart.guid ?? '')),
        tap((cart) => (this.userId = cart.user?.uid ?? ''))
      )
      .subscribe();
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
      { productCode: this.productCode }
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
}
