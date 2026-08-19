/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { FeatureToggles } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import {
  CartValidationFacade,
  cartModificationMatchesCode,
  CartModificationQuantityInfo,
  isQuantityLimitViolation,
  parseCartModificationQuantityInfo,
} from '@spartacus/cart/base/root';
import { CartConfigService } from './cart-config.service';

@Injectable({ providedIn: 'root' })
export class CartItemValidationService {
  protected cartValidationFacade = inject(CartValidationFacade);
  protected cartConfigService = inject(CartConfigService);
  private featureToggles = inject(FeatureToggles);

  protected quantityInfoByCode = new Map<
    string,
    Observable<CartModificationQuantityInfo>
  >();
  protected hasIssueByCode = new Map<string, Observable<boolean>>();

  /**
   * Whether the backend-driven min/max validation UI is active (both the
   * `cart.validation.enabled` config and the `cartValidationDisplayBackendMessages`
   * feature toggle are on).
   */
  isEnabled(): boolean {
    return (
      this.cartConfigService.isCartValidationEnabled() &&
      !!this.featureToggles.cartValidationDisplayBackendMessages
    );
  }

  /**
   * Emits the parsed min/max order quantity for the item with the given product
   * code, used to render the per-item quantity hint. Emits `{}` when disabled or
   * when no matching validation result is present.
   */
  getQuantityInfo$(
    code: string | undefined
  ): Observable<CartModificationQuantityInfo> {
    if (!this.isEnabled() || !code) {
      return of({});
    }
    let cached = this.quantityInfoByCode.get(code);
    if (!cached) {
      cached = this.cartValidationFacade.getValidationResults().pipe(
        map((modifications) => {
          const modification = modifications.find((mod) =>
            cartModificationMatchesCode(mod, code, true)
          );
          return modification
            ? parseCartModificationQuantityInfo(modification.statusMessage)
            : {};
        }),
        distinctUntilChanged((a, b) => a.min === b.min && a.max === b.max),
        shareReplay({ bufferSize: 1, refCount: true })
      );
      this.quantityInfoByCode.set(code, cached);
    }
    return cached;
  }

  /**
   * Emits whether the item with the given product code currently breaks a min/max
   * order quantity rule, used to highlight the violating row. Emits `false` when
   * disabled.
   */
  hasValidationIssue$(code: string | undefined): Observable<boolean> {
    if (!this.isEnabled() || !code) {
      return of(false);
    }
    let cached = this.hasIssueByCode.get(code);
    if (!cached) {
      cached = this.cartValidationFacade.getValidationResults().pipe(
        map((modifications) =>
          modifications.some(
            (mod) =>
              cartModificationMatchesCode(mod, code, true) &&
              isQuantityLimitViolation(mod)
          )
        ),
        distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true })
      );
      this.hasIssueByCode.set(code, cached);
    }
    return cached;
  }
}
