/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { DeliveryPointsService } from '../../services/delivery-points.service';
@Component({
  selector: 'cx-pick-up-in-store-details',
  templateUrl: 'pickup-in-store-details.component.html',
  styleUrls: ['pickup-in-store-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickUpInStoreDetailsComponent {
  // TODO Remove the pickup-in-store-details.component.scss and move to its proper place
  readonly CartOutlets = CartOutlets;
  readonly ICON_TYPE = ICON_TYPE;
  deliveryPointsOfService$ =
    this.deliveryPointsService.getDeliveryPointsOfService();
  compact = false;

  constructor(protected deliveryPointsService: DeliveryPointsService) {}
}
