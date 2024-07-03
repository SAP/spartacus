/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { UrlTree } from '@angular/router';
import { CheckoutB2BStepsSetGuard } from '@spartacus/checkout/b2b/components';
import { CheckoutStep, CheckoutStepType } from '@spartacus/checkout/base/root';
import { Observable, filter, map, of, switchMap } from 'rxjs';
import { CheckoutServiceDetailsFacade } from '../../root/facade/checkout-service-details.facade';

@Injectable({
  providedIn: 'root',
})
export class CheckoutServiceOrderStepsSetGuard extends CheckoutB2BStepsSetGuard {
  protected checkoutServiceDetailsFacade = inject(CheckoutServiceDetailsFacade);
  protected isServiceDetailsSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutServiceDetailsFacade
      .getSelectedServiceDetailsState()
      .pipe(
        filter((state) => !state.loading),
        map((state) => state.data),
        switchMap((servicedAt) => {
          return this.checkoutServiceDetailsFacade.getServiceProducts().pipe(
            map((products) => {
              return (products.length > 0 && servicedAt) ||
                products.length === 0
                ? true
                : this.getUrl(step.routeName);
            })
          );
        })
      );
  }
  protected isB2BStepSet(
    step: CheckoutStep,
    isAccountPayment: boolean
  ): Observable<boolean | UrlTree> {
    if (step && !step.disabled) {
      switch (step.type[0]) {
        case CheckoutStepType.PAYMENT_TYPE: {
          return this.isPaymentTypeSet(step);
        }
        case CheckoutStepType.DELIVERY_ADDRESS: {
          return this.isDeliveryAddressAndCostCenterSet(step, isAccountPayment);
        }
        case CheckoutStepType.DELIVERY_MODE: {
          return this.isDeliveryModeSet(step);
        }
        case CheckoutStepType.SERVICE_DETAILS: {
          return this.isServiceDetailsSet(step);
        }
        case CheckoutStepType.PAYMENT_DETAILS: {
          return this.isPaymentDetailsSet(step);
        }
        case CheckoutStepType.REVIEW_ORDER: {
          break;
        }
      }
    }
    return of(true);
  }
}
