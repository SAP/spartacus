/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, Router } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutFlowOrchestratorService,
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
import { OPF_CHECKOUT_FLOW_NAME } from '@spartacus/opf/checkout/root';
import {
  combineLatest,
  filter,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpfB2bCheckoutStepsSetGuard extends CheckoutStepsSetGuard {
  protected logger = inject(LoggerService);
  protected checkoutFlowOrchestratorService = inject(
    CheckoutFlowOrchestratorService
  );

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

  canActivate(route: ActivatedRouteSnapshot): Observable<GuardResult> {
    let currentIndex = -1;
    const currentRouteUrl = '/' + route.url.join('/');

    return combineLatest([
      this.checkoutStepService.steps$,
      this.checkoutPaymentTypeFacade.isAccountPayment(),
      this.isOpfCheckoutFlow(),
    ]).pipe(
      tap(([, isAccount, isOpf]) => {
        this.checkoutStepService.disableEnableStep(
          CheckoutStepType.PAYMENT_DETAILS,
          isAccount
        );
        if (isOpf) {
          this.checkoutStepService.disableEnableStep(
            CheckoutStepType.REVIEW_ORDER,
            !isAccount
          );
        }
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
        if (currentStep) {
          return this.isB2BStepSet(steps[currentIndex - 1], isAccount);
        } else {
          return of(this.getUrl('checkout'));
        }
      })
    );
  }

  protected isOpfCheckoutFlow(): Observable<boolean> {
    return this.checkoutFlowOrchestratorService
      .getPaymentProvider()
      .pipe(map((provider) => provider === OPF_CHECKOUT_FLOW_NAME));
  }

  protected isB2BStepSet(
    step: CheckoutStep,
    isAccountPayment: boolean
  ): Observable<GuardResult> {
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

  protected isPaymentTypeSet(step: CheckoutStep): Observable<GuardResult> {
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

  // CXSPA-11111: Methods should not contain selector parameters
  protected isDeliveryAddressAndCostCenterSet(
    step: CheckoutStep,
    isAccountPayment: boolean
  ): Observable<GuardResult> {
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
        } else if (deliveryAddress && Object.keys(deliveryAddress).length) {
          return true;
        } else {
          return this.getUrl(step.routeName);
        }
      })
    );
  }
}
