/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-customer-delivery-info',
  templateUrl: './customer-delivery-info.component.html',
})
export class CustomerDeliveryInfoComponent {
  // TODO Type this properly
  @Input() customerDetails: Object;
}
