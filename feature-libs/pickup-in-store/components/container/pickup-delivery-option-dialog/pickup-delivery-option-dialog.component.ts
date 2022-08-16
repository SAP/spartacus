/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import {
  IntendedPickupLocationFacade,
  LocationSearchParams,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';

import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-delivery-pickup-options-dialog',
  templateUrl: './pickup-delivery-option-dialog.component.html',
})
export class PickupDeliveryOptionDialogComponent implements OnInit {
  productCode: string;
  getHideOutOfStockState$: Observable<boolean>;
  loading: boolean;

  readonly iconTypes = ICON_TYPE;
  readonly CLOSE_WITHOUT_SELECTION = 'CLOSE_WITHOUT_SELECTION';
  readonly LOCATION_SELECTED = 'LOCATION_SELECTED';

  constructor(
    protected readonly launchDialogService: LaunchDialogService,
    protected readonly pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected readonly intendedPickupLocationService: IntendedPickupLocationFacade
  ) {
    // Intentional empty constructor
  }

  ngOnInit() {
    this.launchDialogService.data$.subscribe(({ productCode }) => {
      this.productCode = productCode;
    });
    this.getHideOutOfStockState$ =
      this.pickupLocationsSearchService.getHideOutOfStock();
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
    }
  }

  showSpinner(showSpinner: boolean): void {
    this.loading = showSpinner;
  }
}
