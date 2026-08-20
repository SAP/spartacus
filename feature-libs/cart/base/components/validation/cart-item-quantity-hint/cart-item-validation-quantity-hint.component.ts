/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartItemValidationService } from '@spartacus/cart/base/core';
import {
  CartItemContext,
  CartModificationQuantityInfo,
} from '@spartacus/cart/base/root';
import { TranslatePipe } from '@spartacus/core';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

/**
 * The per-item quantity hint together with the product name and code, so the
 * hint can name which product is affected and be associated (via a stable id
 * derived from the code) with the quantity stepper for screen readers.
 */
interface CartItemQuantityHint extends CartModificationQuantityInfo {
  name?: string;
  code?: string;
}

/**
 * Renders the per-item `Min qty` / `Max qty` hint under the quantity stepper for
 * cart items that break a min/max order quantity rule.
 *
 * Reads the current item from the injected `CartItemContext` and derives the hint
 * Rendered into the `CartOutlets.ITEM_VALIDATION_QUANTITY_HINT` outlet.
 *
 * Suppressed in the compact context (e.g. the added-to-cart dialog), which reuses
 * the shared validation results without re-validating and so would otherwise show
 * a stale hint from the last cart visit.
 */
@Component({
  selector: 'cx-cart-item-validation-quantity-hint',
  templateUrl: './cart-item-validation-quantity-hint.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe],
})
export class CartItemValidationQuantityHintComponent {
  protected cartItemValidationService = inject(CartItemValidationService);
  protected cartItemContext = inject(CartItemContext, { optional: true });

  readonly quantityInfo$: Observable<CartItemQuantityHint> = this
    .cartItemContext
    ? combineLatest([
        this.cartItemContext.item$,
        this.cartItemContext.compact$.pipe(startWith(false)),
      ]).pipe(
        switchMap(([item, compact]) =>
          compact
            ? of<CartItemQuantityHint>({})
            : this.cartItemValidationService
                .getQuantityInfo$(item.product?.code)
                .pipe(
                  map((info) => ({
                    ...info,
                    name: item.product?.name,
                    code: item.product?.code,
                  }))
                )
        )
      )
    : EMPTY;
}
