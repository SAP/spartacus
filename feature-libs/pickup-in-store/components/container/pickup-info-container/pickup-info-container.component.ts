/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import { combineLatest } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { PickupInfoComponent } from '../../presentational';

@Component({
  selector: 'cx-pickup-info-container',
  templateUrl: './pickup-info-container.component.html',
  imports: [PickupInfoComponent],
})
export class PickupInfoContainerComponent implements OnInit {
  protected activeCartService = inject(ActiveCartFacade);
  protected storeDetails = inject(PickupLocationsSearchFacade);

  storesDetailsData: Partial<PointOfService>[];

  protected cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.activeCartService
      .getActive()
      .pipe(
        map((cart) => cart.entries),
        filter((entries): entries is OrderEntry[] => !!entries),
        map((entries) =>
          entries
            .map((entry) => entry.deliveryPointOfService?.name)
            .filter((name): name is string => !!name)
        ),
        tap((storeNames) =>
          storeNames.forEach((storeName) =>
            this.storeDetails.loadStoreDetails(storeName)
          )
        ),
        mergeMap((storeNames) =>
          combineLatest(
            storeNames.map((storeName) =>
              this.storeDetails
                .getStoreDetails(storeName)
                .pipe(filter((details) => !!details))
            )
          )
        ),
        map((pointOfService) =>
          pointOfService.map(({ address, displayName, openingHours }) => ({
            address,
            displayName,
            openingHours,
          }))
        ),
        tap((storesDetailsData) => {
          this.storesDetailsData = storesDetailsData;
          // OnPush (v22 default): assigned from an async subscribe and read by
          // the template (*ngFor), so mark for check.
          this.cd.markForCheck();
        }),
        take(1)
      )
      .subscribe();
  }
}
