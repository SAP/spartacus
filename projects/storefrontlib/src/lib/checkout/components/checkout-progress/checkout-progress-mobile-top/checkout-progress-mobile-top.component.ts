import { CheckoutStep } from '../../../config/model/checkout-step.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RoutingService, CartService, UICart } from '@spartacus/core';
import { CheckoutConfig } from '../../../config/checkout-config';

@Component({
  selector: 'cx-checkout-progress-mobile-top',
  templateUrl: './checkout-progress-mobile-top.component.html',
  styleUrls: ['./checkout-progress-mobile-top.component.scss'],
})
export class CheckoutProgressMobileTopComponent implements OnInit {
  constructor(
    protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected cartService: CartService
  ) {}

  steps: Array<CheckoutStep>;
  routerState$: Observable<any>;
  cart$: Observable<UICart>;
  activeStepIndex: number;
  activeStepUrl: string;

  ngOnInit() {
    this.steps = this.config.checkout.steps;
    this.cart$ = this.cartService.getActive();
    this.routerState$ = this.routingService.getRouterState().pipe(
      tap(router => {
        this.activeStepUrl = router.state.context.id;

        this.steps.forEach((step, index) => {
          if (step.url === this.activeStepUrl) {
            this.activeStepIndex = index;
          }
        });
      })
    );
  }
}
