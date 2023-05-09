/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { GlobalMessageType } from '@spartacus/core';
import { FocusConfig, LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

export enum SAVE_CART_DIALOG_ACTION {
  CANCEL = 'CANCEL',
  SAVE = 'SAVE',
}

@Component({
  selector: 'cx-asm-save-cart-dialog',
  templateUrl: './asm-save-cart-dialog.component.html',
})
export class AsmSaveCartDialogComponent implements OnInit, OnDestroy {
  BIND_CART_ACTION = SAVE_CART_DIALOG_ACTION;
  showDialogAlert = true;
  globalMessageType = GlobalMessageType;
  private subscription = new Subscription();
  cart: Cart;
  cartQty: int;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  constructor(protected launchDialogService: LaunchDialogService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data: any) => {
        this.cart = data;
        this.calEntitiesQty();
      })
    );
  }

  calEntitiesQty(): void {
    let count = 0;
    if (this.cart.entries) {
      for (let entry of this.cart.entries) {
        count += entry.quantity ? entry.quantity : 0;
      }
    }
    this.cartQty = count;
  }

  closeDialogAlert(): void {
    this.showDialogAlert = false;
  }

  closeModal(reason: SAVE_CART_DIALOG_ACTION): void {
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
