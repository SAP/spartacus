/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, isDevMode } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutStepService,
  CheckoutStepsSetGuard,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import { RoutingConfigService } from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutB2BStepsSetGuard
  extends CheckoutStepsSetGuard
  implements CanActivate
{
  constructor(
    protected checkoutStepService: CheckoutStepService,
    protected routingConfigService: RoutingConfigService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected router: Router,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade
  ) {
    super(
      checkoutStepService,
      routingConfigService,
      checkoutDeliveryAddressFacade,
      checkoutPaymentFacade,
      checkoutDeliveryModesFacade,
      router
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    let currentIndex = -1;
    const currentRouteUrl = '/' + route.url.join('/');

    // check whether the previous step is set
    return combineLatest([
      this.checkoutStepService.steps$,
      this.checkoutPaymentTypeFacade.isAccountPayment(),
    ]).pipe(
      tap(([, isAccount]) => {
        this.checkoutStepService.disableEnableStep(
          CheckoutStepType.PAYMENT_DETAILS,
          isAccount
        );
      }),
      take(1),
      switchMap(([steps, isAccount]) => {
        currentIndex = steps.findIndex((step) => {
          const stepRouteUrl = `/${
            this.routingConfigService.getRouteConfig(step.routeName)?.paths?.[0]
          }`;
          return stepRouteUrl === currentRouteUrl;
        });
        // get current step
        let currentStep;
        if (currentIndex >= 0) {
          currentStep = steps[currentIndex];
        }
        if (Boolean(currentStep)) {
          return this.isB2BStepSet(steps[currentIndex - 1], isAccount);
        } else {
          if (isDevMode()) {
            console.warn(
              `Missing step with route '${currentRouteUrl}' in checkout configuration or this step is disabled.`
            );
          }
          return of(this.getUrl('checkout'));
        }
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

  protected isPaymentTypeSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutPaymentTypeFacade.getSelectedPaymentTypeState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      map((paymentType) => {
        if (paymentType) {
          return true;
        } else {
          return this.getUrl(step.routeName);
        }
      })
    );
  }

  protected isDeliveryAddressAndCostCenterSet(
    step: CheckoutStep,
    isAccountPayment: boolean
  ): Observable<boolean | UrlTree> {
    return combineLatest([
      this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
        filter((state) => !state.loading),
        map((state) => state.data)
      ),
      this.checkoutCostCenterFacade.getCostCenterState().pipe(
        filter((state) => !state.loading),
        map((state) => state.data)
      ),
    ]).pipe(
      map(([deliveryAddress, costCenter]) => {
        if (isAccountPayment) {
          if (
            deliveryAddress &&
            Object.keys(deliveryAddress).length &&
            !!costCenter
          ) {
            return true;
          } else {
            return this.getUrl(step.routeName);
          }
        } else {
          if (
            deliveryAddress &&
            Object.keys(deliveryAddress).length &&
            costCenter === undefined
          ) {
            return true;
          } else {
            return this.getUrl(step.routeName);
          }
        }
      })
    );
  }
}
