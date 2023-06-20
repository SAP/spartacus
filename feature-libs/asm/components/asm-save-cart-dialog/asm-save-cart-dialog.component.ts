/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { GlobalMessageType } from '@spartacus/core';
import { FocusConfig, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

export enum SAVE_CART_DIALOG_ACTION {
  CANCEL = 'CANCEL',
  SAVE = 'SAVE',
}

@Component({
  selector: 'cx-asm-save-cart-dialog',
  templateUrl: './asm-save-cart-dialog.component.html',
})
export class AsmSaveCartDialogComponent implements OnInit {
  BIND_CART_ACTION = SAVE_CART_DIALOG_ACTION;
  showDialogAlert$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  globalMessageType = GlobalMessageType;
  cart: Cart;
  cartQty: number;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected savedCartFacade: SavedCartFacade
  ) {}

  ngOnInit(): void {
    this.launchDialogService.data$.pipe(take(1)).subscribe((data: Cart) => {
      this.cart = data;
      this.setCartTotalQty();
    });
  }

  setCartTotalQty(): void {
    let count = 0;
    if (this.cart.entries) {
      for (const entry of this.cart.entries) {
        count += entry.quantity ? entry.quantity : 0;
      }
    }
    this.cartQty = count;
  }

  closeDialogAlert(): void {
    this.showDialogAlert$.next(false);
  }

  closeModal(reason: SAVE_CART_DIALOG_ACTION): void {
    if (reason === SAVE_CART_DIALOG_ACTION.SAVE) {
      this.saveCart();
    }
    this.launchDialogService.closeDialog(reason);
  }

  protected saveCart(): void {
    this.savedCartFacade.saveCart({
      cartId: this.cart.code as string,
      saveCartName: this.cart.code as string,
      saveCartDescription: '-',
    });
  }
}
