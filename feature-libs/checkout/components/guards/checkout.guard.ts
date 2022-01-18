import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CheckoutStepType } from '@spartacus/checkout/root';
import { ActiveCartService, RoutingConfigService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepService } from '../services/checkout-step.service';
import { ExpressCheckoutService } from '../services/express-checkout.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  private readonly firstStep$: Observable<UrlTree>;

  constructor(
    protected router: Router,
    protected routingConfigService: RoutingConfigService,
    protected checkoutConfigService: CheckoutConfigService,
    protected expressCheckoutService: ExpressCheckoutService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService
  ) {
    this.firstStep$ = of(
      this.router.parseUrl(
        this.routingConfigService.getRouteConfig(
          this.checkoutStepService.getFirstCheckoutStepRoute()
        ).paths?.[0] as string
      )
    );
  }

  canActivate(): Observable<boolean | UrlTree> {
    if (
      this.checkoutConfigService.isExpressCheckout() &&
      !this.activeCartService.isGuestCart()
    ) {
      return this.expressCheckoutService.trySetDefaultCheckoutDetails().pipe(
        switchMap((expressCheckoutPossible: boolean) => {
          const reviewOrderRoute =
            this.checkoutStepService.getCheckoutStepRoute(
              CheckoutStepType.REVIEW_ORDER
            );
          return expressCheckoutPossible && reviewOrderRoute
            ? of(
                this.router.parseUrl(
                  this.routingConfigService.getRouteConfig(reviewOrderRoute)
                    .paths?.[0] as string
                )
              )
            : this.firstStep$;
        })
      );
    }
    return this.firstStep$;
  }
}
