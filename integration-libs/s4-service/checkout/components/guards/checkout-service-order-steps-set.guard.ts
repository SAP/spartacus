/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutB2BStepsSetGuard } from '@spartacus/checkout/b2b/components';
import { CheckoutStep, CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  CheckoutServiceDetailsFacade,
  S4ServiceDeliveryModeConfig,
} from '@spartacus/s4-service/root';
import { Observable, combineLatest, filter, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutServiceOrderStepsSetGuard extends CheckoutB2BStepsSetGuard {
  protected checkoutServiceDetailsFacade = inject(CheckoutServiceDetailsFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected config = inject(S4ServiceDeliveryModeConfig);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return combineLatest(
      this.checkoutServiceDetailsFacade.hasServiceItems(),
      this.checkoutServiceDetailsFacade.hasNonServiceItems()
    ).pipe(
      switchMap(([hasServiceItems, hasNonServiceItems]) => {
        this.checkoutStepService.disableEnableStep(
          CheckoutStepType.SERVICE_DETAILS,
          !hasServiceItems
        );
        this.checkoutStepService.disableEnableStep(
          CheckoutStepType.DELIVERY_MODE,
          !hasNonServiceItems
        );
        return super.canActivate(route);
      })
    );
  }

  protected isServiceDetailsSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutServiceDetailsFacade
      .getSelectedServiceDetailsState()
      .pipe(
        filter((state) => !state.loading && !state.error),
        switchMap((selectedServiceDetails) => {
          return this.setServiceDeliveryMode().pipe(
            map(() => {
              return selectedServiceDetails.data
                ? true
                : this.getUrl(step.routeName);
            })
          );
        })
      );
  }

  setServiceDeliveryMode(): Observable<unknown> {
    return combineLatest([
      this.checkoutServiceDetailsFacade.hasServiceItems(),
      this.checkoutServiceDetailsFacade.hasNonServiceItems(),
    ]).pipe(
      switchMap(([hasServiceItems, hasNonServiceItems]) => {
        if (!hasNonServiceItems && hasServiceItems) {
          return this.checkoutDeliveryModesFacade.setDeliveryMode(
            this.config.s4ServiceDeliveryMode?.code ?? ''
          );
        }
        return of(undefined);
      })
    );
  }

  protected override isB2BStepSet(
    step: CheckoutStep,
    isAccountPayment: boolean
  ): Observable<boolean | UrlTree> {
    if (step && !step.disabled) {
      switch (step.type[0]) {
        case CheckoutStepType.PAYMENT_TYPE:
          return this.isPaymentTypeSet(step);
        case CheckoutStepType.DELIVERY_ADDRESS:
          return this.isDeliveryAddressAndCostCenterSet(step, isAccountPayment);
        case CheckoutStepType.DELIVERY_MODE:
          return this.isDeliveryModeSet(step);
        case CheckoutStepType.SERVICE_DETAILS:
          return this.isServiceDetailsSet(step);
        case CheckoutStepType.PAYMENT_DETAILS:
          return this.isPaymentDetailsSet(step);
        case CheckoutStepType.REVIEW_ORDER:
          break;
      }
    }
    return of(true);
  }
}
