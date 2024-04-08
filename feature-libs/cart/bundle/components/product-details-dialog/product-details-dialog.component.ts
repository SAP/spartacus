/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService, FocusConfig } from '@spartacus/storefront';
import { take } from 'rxjs/operators';

export interface SwitchProductDetailsDialogData {
  product: Product;
  function: Function;
}

export enum PRODUCT_DETAILS_DIALOG_ACTION {
  CANCEL = 'CANCEL',
  SELECT = 'SELECT',
}

@Component({
  selector: 'cx-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
})
export class ProductDetailsDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;
  PRODUCT_DETAILS_ACTION = PRODUCT_DETAILS_DIALOG_ACTION;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  constructor(protected launchDialogService: LaunchDialogService) {}

  product: Product;
  select: Function;

  ngOnInit(): void {
    this.launchDialogService.data$.pipe(take(1)).subscribe((data: SwitchProductDetailsDialogData) => {
      this.product = data.product;
      this.select = data.function;
    });
  }

  dismissModal(reason: PRODUCT_DETAILS_DIALOG_ACTION): void {
    console.log(reason);
    this.launchDialogService.closeDialog(reason);
  }

  selectProduct(): void {
    this.select();
    this.dismissModal(this.PRODUCT_DETAILS_ACTION.SELECT);
  }

}
