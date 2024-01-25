/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CartModification,
  CartModificationList,
  CartValidationStatusCode,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { OCC_CART_ID_CURRENT } from '@spartacus/core';
import { ReorderOrderFacade } from '@spartacus/order/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cx-reorder-dialog',
  templateUrl: './reorder-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReorderDialogComponent {
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  cartModifications: CartModification[] | undefined;

  loading$ = new BehaviorSubject(false);
  showDecisionPrompt$ = new BehaviorSubject(true);
  data$ = this.launchDialogService.data$;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected reorderOrderFacade: ReorderOrderFacade,
    protected multiCartFacade: MultiCartFacade
  ) {}

  createCartFromOrder(orderCode: string): void {
    this.showDecisionPrompt$.next(false);
    this.loading$.next(true);
    this.reorderOrderFacade
      .reorder(orderCode)
      .subscribe((cartModificationList: CartModificationList) => {
        this.multiCartFacade.reloadCart(OCC_CART_ID_CURRENT);
        this.cartModifications = cartModificationList.cartModifications;
        this.loading$.next(false);
      });
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
  public get cartValidationStatusCode(): typeof CartValidationStatusCode {
    return CartValidationStatusCode;
  }
}
