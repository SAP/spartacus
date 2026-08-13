/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Optional,
} from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartItemValidationService } from '../../../core/services';
import { CartItemContext } from '../../../root/models';
import { CartModificationQuantityInfo } from '../../../root/utils';

/**
 * Renders the per-item `Min qty` / `Max qty` hint under the quantity stepper for
 * cart items that break a min/max order quantity rule.
 *
 * Reads the current item from the injected `CartItemContext` and derives the hint
 * Rendered into the `CartOutlets.ITEM_VALIDATION_QUANTITY_HINT` outlet.
 */
@Component({
  selector: 'cx-cart-item-validation-quantity-hint',
  templateUrl: './cart-item-validation-quantity-hint.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe],
})
export class CartItemValidationQuantityHintComponent {
  protected cartItemValidationService = inject(CartItemValidationService);

  constructor(@Optional() protected cartItemContext: CartItemContext) {}

  readonly quantityInfo$: Observable<CartModificationQuantityInfo> =
    this.cartItemContext?.item$.pipe(
      switchMap((item) =>
        this.cartItemValidationService.getQuantityInfo$(item.product?.code)
      )
    ) ?? EMPTY;
}
