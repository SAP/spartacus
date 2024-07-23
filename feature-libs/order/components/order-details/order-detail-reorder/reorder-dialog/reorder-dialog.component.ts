/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Optional,
  inject,
} from '@angular/core';
import {
  CartModification,
  CartModificationList,
  CartValidationStatusCode,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { FeatureConfigService, OCC_CART_ID_CURRENT } from '@spartacus/core';
import { ReorderOrderFacade } from '@spartacus/order/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
  SelectFocusUtility,
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

  // TODO: (CXSPA-6585) - Remove FeatureConfigService and make depenencies required
  @Optional() selectFocusUtility = inject(SelectFocusUtility, {
    optional: true,
  });

  @Optional() elementRef = inject(ElementRef, { optional: true });
  @Optional() featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

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
        this.recaptureFocus();
      });
  }

  recaptureFocus(): void {
    // TODO: (CXSPA-6585) - Remove feature flag next major release
    if (!this.featureConfigService?.isEnabled('a11yReorderDialog')) {
      return;
    }
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
