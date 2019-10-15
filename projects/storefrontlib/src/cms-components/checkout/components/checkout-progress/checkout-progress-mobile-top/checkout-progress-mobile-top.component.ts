import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  RoutingService,
  CartService,
  Cart,
  RoutingConfigService,
} from '@spartacus/core';
//import { CheckoutConfig } from '../../../config/checkout-config';
import { CheckoutStep } from '../../../model/checkout-step.model';
import { CheckoutConfigService } from '../../../services/checkout-config.service';

@Component({
  selector: 'cx-checkout-progress-mobile-top',
  templateUrl: './checkout-progress-mobile-top.component.html',
})
export class CheckoutProgressMobileTopComponent implements OnInit, OnDestroy {
  constructor(
    //protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected cartService: CartService,
    protected routingConfigService: RoutingConfigService,
    protected checkoutConfigService: CheckoutConfigService,
    protected cdr: ChangeDetectorRef
  ) {}

  steps: Array<CheckoutStep>;
  routerState$: Observable<any>;
  cart$: Observable<Cart>;
  activeStepIndex: number;
  activeStepUrl: string;

  subscription: Subscription;

  ngOnInit(): void {
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

    this.subscription = this.checkoutConfigService.steps$.subscribe(steps => {
      this.steps = steps;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
