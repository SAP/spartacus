/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { DeliveryPointsService } from '../../services/delivery-points.service';
@Component({
  selector: 'cx-checkout-pick-up-in-store-details',
  templateUrl: 'checkout-pickup-in-store-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPickUpInStoreDetailsComponent {
  @Input() displayLocation: string;
  readonly CartOutlets = CartOutlets;
  readonly ICON_TYPE = ICON_TYPE;
  deliveryPointsOfService$ =
    this.deliveryPointsService.getDeliveryPointsOfService();

  constructor(protected deliveryPointsService: DeliveryPointsService) {}
}
