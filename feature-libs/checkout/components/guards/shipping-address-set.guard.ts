import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Address, RoutingConfigService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutDetailsService } from '../services/checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class ShippingAddressSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private routingConfigService: RoutingConfigService,
    private router: Router,
    private checkoutStepService: CheckoutStepService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const checkoutStep: CheckoutStep = this.checkoutStepService.getCheckoutStep(
      CheckoutStepType.SHIPPING_ADDRESS
    );

    if (!checkoutStep && isDevMode()) {
      console.warn(
        `Missing step with type ${CheckoutStepType.SHIPPING_ADDRESS} in checkout configuration.`
      );
    }

    if (checkoutStep && checkoutStep.disabled) {
      return of(true);
    }

    return this.checkoutDetailsService
      .getDeliveryAddress()
      .pipe(
        map((deliveryAddress: Address) =>
          deliveryAddress && Object.keys(deliveryAddress).length
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
