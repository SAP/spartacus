import { Component, OnInit } from '@angular/core';
import { RoutingService, RoutingConfigService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutConfig } from '../../../config/checkout-config';
import { CheckoutStep } from '../../../model/checkout-step.model';

@Component({
  selector: 'cx-checkout-progress-mobile-bottom',
  templateUrl: './checkout-progress-mobile-bottom.component.html',
})
export class CheckoutProgressMobileBottomComponent implements OnInit {
  constructor(
    protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected routingConfigService: RoutingConfigService
  ) {}

  steps: Array<CheckoutStep>;
  routerState$: Observable<any>;
  activeStepIndex: number;
  activeStepUrl: string;

  ngOnInit() {
    this.steps = this.config.checkout.steps;
    this.routerState$ = this.routingService.getRouterState().pipe(
      tap((router) => {
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
