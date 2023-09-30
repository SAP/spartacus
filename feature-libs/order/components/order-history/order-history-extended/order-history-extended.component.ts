/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { OrderHistoryComponent } from '../order-history.component';

@Component({
  selector: 'cx-order-history-extended',
  templateUrl: './order-history-extended.component.html',
})
export class OrderHistoryExtendedComponent extends OrderHistoryComponent {}
