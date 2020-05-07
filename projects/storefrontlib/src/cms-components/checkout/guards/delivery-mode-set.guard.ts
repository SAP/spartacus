import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { RoutingConfigService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutDetailsService } from '../services/checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class DeliveryModeSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private checkoutConfigService: CheckoutConfigService,
    private routingConfigService: RoutingConfigService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const checkoutStep: CheckoutStep = this.checkoutConfigService.getCheckoutStep(
      CheckoutStepType.DELIVERY_MODE
    );

    if (!checkoutStep && isDevMode()) {
      console.warn(
        `Missing step with type ${CheckoutStepType.DELIVERY_MODE} in checkout configuration.`
      );
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
