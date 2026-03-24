/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import {
  CartModification,
  CartModificationList,
  CartValidationStatusCode,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { OCC_CART_ID_CURRENT, TranslatePipe } from '@spartacus/core';
import { ReorderOrderFacade } from '@spartacus/order/root';
import {
  FocusConfig,
  FocusDirective,
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
  SelectFocusUtility,
  SpinnerComponent,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cx-reorder-dialog',
  templateUrl: './reorder-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FocusDirective,
    IconComponent,
    NgIf,
    NgFor,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
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

  selectFocusUtility = inject(SelectFocusUtility);
  elementRef = inject(ElementRef, { optional: true });

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
        this.multiCartFacade.reloadCart(OCC_CART_ID_CURRENT, { active: true });
        this.cartModifications = cartModificationList.cartModifications;
        this.loading$.next(false);
        this.recaptureFocus();
      });
  }

  recaptureFocus(): void {
    this.selectFocusUtility
      ?.findFirstFocusable(this.elementRef?.nativeElement)
      ?.focus();
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
  public get cartValidationStatusCode(): typeof CartValidationStatusCode {
    return CartValidationStatusCode;
  }
}
