/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { OrderHistoryComponent } from '@spartacus/order/components';

@Component({
  selector: 'cx-order-history-enhanced-ui',
  templateUrl: './order-history-enhanced-ui.component.html',
})
export class OrderHistoryEnhancedUIComponent extends OrderHistoryComponent {}
