/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  LocationSearchParams,
  PickupLocationsSearchFacade,
  PickupOptionFacade,
} from '@spartacus/pickup-in-store/root';
import {
  CurrentProductService,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';

import { Observable, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-delivery-pickup-options-dialog',
  templateUrl: './pickup-delivery-option-dialog.component.html',
})
export class PickupDeliveryOptionDialogComponent implements OnInit, OnDestroy {
  productCode: string;
  entryNumber: number;
  quantity: number;
  getHideOutOfStockState$: Observable<boolean>;
  loading: boolean;
  subscription = new Subscription();
  isPDP: boolean;
  cartId: string;
  userId: string;

  readonly iconTypes = ICON_TYPE;
  readonly CLOSE_WITHOUT_SELECTION = 'CLOSE_WITHOUT_SELECTION';
  readonly LOCATION_SELECTED = 'LOCATION_SELECTED';

  constructor(
    protected readonly launchDialogService: LaunchDialogService,
    protected readonly pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected readonly intendedPickupLocationService: IntendedPickupLocationFacade,
    protected readonly currentProductService: CurrentProductService,
    protected readonly preferredStoreService: PreferredStoreService,
    protected readonly activeCartFacade: ActiveCartFacade,
    protected readonly pickupOptionFacade: PickupOptionFacade
  ) {
    // Intentional empty constructor
  }

  ngOnInit() {
    this.launchDialogService.data$.subscribe(
      ({ productCode, entryNumber, quantity }) => {
        this.productCode = productCode;
        this.entryNumber = entryNumber;
        this.quantity = quantity;
      }
    );
    this.getHideOutOfStockState$ =
      this.pickupLocationsSearchService.getHideOutOfStock();

    this.subscription.add(
      this.pickupOptionFacade
        .getPageContext()
        .subscribe((_data) => (this.isPDP = _data === 'PDP'))
    );

    this.subscription.add(
      this.activeCartFacade
        .getActive()
        .pipe(
          tap((cart) => {
            this.cartId = cart.guid ?? '';
            this.userId = cart.user?.uid ?? '';
          })
        )
        .subscribe()
    );
  }

  onFindStores(locationSearchParams: LocationSearchParams): void {
    this.pickupLocationsSearchService.startSearch({
      productCode: this.productCode,
      ...locationSearchParams,
    });
  }

  onHideOutOfStock(): void {
    this.pickupLocationsSearchService.toggleHideOutOfStock();
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
    if (reason === 'CLOSE_WITHOUT_SELECTION') {
      this.intendedPickupLocationService
        .getIntendedLocation(this.productCode)
        .pipe(
          filter((store) => !store?.name),
          take(1),
          tap(() =>
            this.intendedPickupLocationService.setPickupOption(
              this.productCode,
              'delivery'
            )
          )
        )
        .subscribe();
      this.pickupOptionFacade.setPickupOption(this.entryNumber, 'delivery');
    } else {
      const preferredStore = this.preferredStoreService.getPreferredStore();
      if (!this.isPDP && preferredStore) {
        this.pickupLocationsSearchService.setPickupOptionToPickupInStore(
          this.cartId,
          this.entryNumber,
          this.userId,
          preferredStore.name,
          this.quantity
        );
      }
    }
  }

  showSpinner(showSpinner: boolean): void {
    this.loading = showSpinner;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
