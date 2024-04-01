/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
})
export class ProductDetailsDialogComponent {
  iconTypes = ICON_TYPE;

  product: Product;
  select: Function;

  constructor(protected launchDialogService: LaunchDialogService) {}

  selectProduct() {
    this.select();
    this.dismissModal();
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }
}
