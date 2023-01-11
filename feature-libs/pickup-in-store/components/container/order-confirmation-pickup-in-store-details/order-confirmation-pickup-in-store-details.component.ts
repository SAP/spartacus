/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';

import { DeliveryPointsService } from '../../services/delivery-points.service';

@Component({
  selector: 'cx-order-confirmation-pickup-in-store-details',
  templateUrl: './order-confirmation-pickup-in-store-details.component.html',
})
export class OrderConfirmationPickupInStoreComponent {
  getDeliveryPointsOfServiceOrderConfirmation$ =
    this.deliveryPointsService.getDeliveryPointsOfServiceFromOrder();

  constructor(protected deliveryPointsService: DeliveryPointsService) {}
}
