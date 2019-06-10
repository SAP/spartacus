import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  RoutingService,
  CartService,
  Cart,
  RoutingConfigService,
} from '@spartacus/core';
import { CheckoutConfig } from '../../../config/checkout-config';
import { CheckoutStep } from '../../../model/checkout-step.model';

@Component({
  selector: 'cx-checkout-progress-mobile-top',
  templateUrl: './checkout-progress-mobile-top.component.html',
})
export class CheckoutProgressMobileTopComponent implements OnInit {
  constructor(
    protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected cartService: CartService,
    protected routingConfigService: RoutingConfigService
  ) {}

  steps: Array<CheckoutStep>;
  routerState$: Observable<any>;
  cart$: Observable<Cart>;
  activeStepIndex: number;
  activeStepUrl: string;

  ngOnInit(): void {
    this.steps = this.config.checkout.steps;
    this.cart$ = this.cartService.getActive();
    this.routerState$ = this.routingService.getRouterState().pipe(
      tap(router => {
        this.activeStepUrl = router.state.context.id;

        this.steps.forEach((step, index) => {
          const routeUrl = `/${
            this.routingConfigService.getRouteConfig(step.routeName).paths[0]
          }`;
          if (routeUrl === this.activeStepUrl) {
            this.activeStepIndex = index;
          }
        });
      })
    );
  }
}
