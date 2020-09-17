import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { RoutingConfigService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutDetailsService } from '../services/checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class DeliveryModeSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private checkoutStepService: CheckoutStepService,
    private routingConfigService: RoutingConfigService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const checkoutStep: CheckoutStep = this.checkoutStepService.getCheckoutStep(
      CheckoutStepType.DELIVERY_MODE
    );

    if (!checkoutStep && isDevMode()) {
      console.warn(
        `Missing step with type ${CheckoutStepType.DELIVERY_MODE} in checkout configuration.`
      );
    }

    if (checkoutStep && checkoutStep.disabled) {
      return of(true);
    }

    return this.checkoutDetailsService
      .getSelectedDeliveryModeCode()
      .pipe(
        map((mode: string) =>
          mode && mode.length
            ? true
            : this.router.parseUrl(
                checkoutStep &&
                  this.routingConfigService.getRouteConfig(
                    checkoutStep.routeName
                  ).paths[0]
              )
        )
      );
  }
}
