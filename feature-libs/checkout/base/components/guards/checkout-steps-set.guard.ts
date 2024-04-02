/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, isDevMode, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import { LoggerService, RoutingConfigService } from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
} from 'rxjs/operators';
import { CheckoutStepService } from '../services/checkout-step.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutStepsSetGuard implements OnDestroy {
  protected subscription: Subscription;
  protected logger = inject(LoggerService);

  constructor(
    protected checkoutStepService: CheckoutStepService,
    protected routingConfigService: RoutingConfigService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected router: Router,
    protected activeCartFacade: ActiveCartFacade
  ) {
    this.subscription = this.activeCartFacade
      .hasDeliveryItems()
      .pipe(distinctUntilChanged())
      .subscribe((hasDeliveryItems) => {
        this.checkoutStepService.disableEnableStep(
          CheckoutStepType.DELIVERY_ADDRESS,
          !hasDeliveryItems
        );
        this.checkoutStepService.disableEnableStep(
          CheckoutStepType.DELIVERY_MODE,
          !hasDeliveryItems
        );

        this.setStepNameMultiLine(
          CheckoutStepType.PAYMENT_DETAILS,
          hasDeliveryItems
        );
        this.setStepNameMultiLine(
          CheckoutStepType.REVIEW_ORDER,
          hasDeliveryItems
        );
      });
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    let currentIndex = -1;
    const currentRouteUrl = '/' + route.url.join('/');

    // check whether the previous step is set
    return this.checkoutStepService.steps$.pipe(
      take(1),
      switchMap((steps) => {
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
          return this.isStepSet(steps[currentIndex - 1]);
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

  protected isStepSet(step: CheckoutStep): Observable<boolean | UrlTree> {
    if (step && !step.disabled) {
      switch (step.type[0]) {
        case CheckoutStepType.DELIVERY_ADDRESS: {
          return this.isDeliveryAddress(step);
        }
        case CheckoutStepType.DELIVERY_MODE: {
          return this.isDeliveryModeSet(step);
        }
        case CheckoutStepType.PAYMENT_DETAILS: {
          if (
            this.checkoutStepService.getCheckoutStep(
              CheckoutStepType.DELIVERY_MODE
            )?.disabled
          ) {
            this.checkoutDeliveryModesFacade.setDeliveryMode('pickup');
          }

          return this.isPaymentDetailsSet(step);
        }
        case CheckoutStepType.REVIEW_ORDER: {
          break;
        }
      }
    }
    return of(true);
  }

  protected isDeliveryAddress(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      map((deliveryAddress) => {
        if (deliveryAddress && Object.keys(deliveryAddress).length) {
          return true;
        } else {
          return this.getUrl(step.routeName);
        }
      })
    );
  }

  protected isDeliveryModeSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      map((mode) => (mode ? true : this.getUrl(step.routeName)))
    );
  }

  protected isPaymentDetailsSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutPaymentFacade.getPaymentDetailsState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      map((paymentDetails) =>
        paymentDetails && Object.keys(paymentDetails).length !== 0
          ? true
          : this.getUrl(step.routeName)
      )
    );
  }

  protected getUrl(routeName: string): UrlTree {
    return this.router.parseUrl(
      this.routingConfigService.getRouteConfig(routeName)?.paths?.[0] as string
    );
  }

  protected setStepNameMultiLine(
    stepType: CheckoutStepType,
    value: boolean
  ): void {
    const step = this.checkoutStepService.getCheckoutStep(stepType);
    if (step) {
      step.nameMultiLine = value;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
