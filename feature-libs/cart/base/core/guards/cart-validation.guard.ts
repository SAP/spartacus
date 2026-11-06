/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { GuardResult, Router } from '@angular/router';
import {
  ActiveCartFacade,
  CartValidationFacade,
  CartValidationStatusCode,
  isQuantityLimitViolation,
} from '@spartacus/cart/base/root';
import {
  FeatureToggles,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { CartConfigService } from '../services/cart-config.service';
import { CartValidationStateService } from '../services/cart-validation-state.service';

@Injectable({
  providedIn: 'root',
})
export class CartValidationGuard {
  constructor(
    protected cartValidationService: CartValidationFacade,
    protected semanticPathService: SemanticPathService,
    protected router: Router,
    protected globalMessageService: GlobalMessageService,
    protected activeCartService: ActiveCartFacade,
    protected cartValidationStateService: CartValidationStateService,
    protected cartConfigService: CartConfigService
  ) {}

  private featureToggles = inject(FeatureToggles);

  protected GLOBAL_MESSAGE_TIMEOUT = 10000;

  canActivate(): Observable<GuardResult> {
    return !this.cartConfigService.isCartValidationEnabled()
      ? of(true)
      : this.cartValidationService.validateCart().pipe(
          withLatestFrom(this.activeCartService.getEntries()),
          map(([cartModificationList, cartEntries]) => {
            this.cartValidationStateService.updateValidationResultAndRoutingId(
              cartModificationList.cartModifications ?? []
            );

            if (
              cartModificationList.cartModifications !== undefined &&
              cartModificationList.cartModifications.length !== 0
            ) {
              let validationResultMessage;
              const modification = cartModificationList.cartModifications[0];
              const hasQuantityLimitViolation =
                !!this.featureToggles.cartValidationDisplayBackendMessages &&
                cartModificationList.cartModifications.some((mod) =>
                  isQuantityLimitViolation(mod)
                );

              if (
                cartEntries.length === 1 &&
                cartEntries[0].product?.code ===
                  modification.entry?.product?.code &&
                modification.statusCode === CartValidationStatusCode.NO_STOCK
              ) {
                validationResultMessage = {
                  key: 'validation.cartEntryRemoved',
                  params: {
                    name: modification.entry?.product?.name,
                  },
                };
              } else if (hasQuantityLimitViolation) {
                validationResultMessage = {
                  key: 'validation.cartQuantityLimitsViolated',
                };
              } else {
                validationResultMessage = {
                  key: 'validation.cartEntriesChangeDuringCheckout',
                };
              }

              this.globalMessageService.add(
                validationResultMessage,
                GlobalMessageType.MSG_TYPE_ERROR,
                this.GLOBAL_MESSAGE_TIMEOUT
              );
              this.activeCartService.reloadActiveCart();
              return this.router.parseUrl(
                this.semanticPathService.get('cart') ?? ''
              );
            }

            return true;
          })
        );
  }
}
