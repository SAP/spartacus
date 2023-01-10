/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { DeliveryPointsService } from '../../services/delivery-points.service';

@Component({
  selector: 'cx-pickup-in-store-details-review',
  templateUrl: './review-pickup-in-store-details.component.html',
})
export class PickupInStoreDetailsReviewComponent {
  deliveryPointsOfService$ =
    this.deliveryPointsService.getDeliveryPointsOfServiceFromCart();
  constructor(protected deliveryPointsService: DeliveryPointsService) {}
}
