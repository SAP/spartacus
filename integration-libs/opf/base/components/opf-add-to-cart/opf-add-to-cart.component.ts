/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddToCartComponent } from '@spartacus/cart/base/components/add-to-cart';

@Component({
  selector: 'cx-opf-add-to-cart',
  templateUrl: './opf-add-to-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfAddToCartComponent extends AddToCartComponent {}
