/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { DeliveryPointsService } from '../../services/delivery-points.service';
@Component({
  selector: 'cx-pick-up-in-store-details',
  templateUrl: 'pickup-in-store-details.component.html',
  styleUrls: ['pickup-in-store-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickUpInStoreDetailsComponent implements OnInit {
  // TODO Remove the pickup-in-store-details.component.scss and move to its proper place
  readonly ICON_TYPE = ICON_TYPE;
  deliveryPointsOfService$ =
    this.deliveryPointsService.getDeliveryPointsOfService();
  compact = false;
  openHoursOpen: Record<number, boolean> = {};

  constructor(
    protected deliveryPointsService: DeliveryPointsService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade
  ) {}
  ngOnInit(): void {
    this.deliveryPointsOfService$.subscribe((d) => {
      console.clear();
      console.log(d);
    });
  }

  toggleOpenHours(index: number): boolean {
    this.openHoursOpen[index] = !(
      this.openHoursOpen && this.openHoursOpen[index]
    );
    return false;
  }
}
