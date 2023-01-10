/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeliveryPointsService } from '../../services/delivery-points.service';
@Component({
  selector: 'cx-checkout-pick-up-in-store-details',
  templateUrl: 'checkout-pickup-in-store-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPickUpInStoreDetailsComponent {
  deliveryPointsOfService$ =
    this.deliveryPointsService.getDeliveryPointsOfServiceFromCart();
  constructor(protected deliveryPointsService: DeliveryPointsService) {}
}
