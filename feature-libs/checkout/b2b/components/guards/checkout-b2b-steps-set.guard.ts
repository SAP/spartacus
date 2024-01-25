/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, isDevMode } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
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
import { LoggerService, RoutingConfigService } from '@spartacus/core';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutB2BStepsSetGuard
  extends CheckoutStepsSetGuard
  implements CanActivate
{
  protected logger = inject(LoggerService);

  constructor(
    protected checkoutStepService: CheckoutStepService,
    protected routingConfigService: RoutingConfigService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected router: Router,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected activeCartFacade: ActiveCartFacade
  ) {
    super(
      checkoutStepService,
      routingConfigService,
      checkoutDeliveryAddressFacade,
      checkoutPaymentFacade,
      checkoutDeliveryModesFacade,
      router,
      activeCartFacade
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
            this.logger.warn(
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
