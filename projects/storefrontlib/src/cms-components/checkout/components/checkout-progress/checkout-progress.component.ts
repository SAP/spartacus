import { RoutingService, RoutingConfigService } from '@spartacus/core';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CheckoutConfig } from '../../config/checkout-config';
import { CheckoutStep } from '../../model/checkout-step.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-checkout-progress',
  templateUrl: './checkout-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutProgressComponent implements OnInit {
  constructor(
    protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected routingConfigService: RoutingConfigService
  ) {}

  steps: Array<CheckoutStep>;
  routerState$: Observable<any>;
  activeStepIndex: number;
  activeStepUrl: string;

  ngOnInit(): void {
    this.steps = this.config.checkout.steps;
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

  getTabIndex(stepIndex: number): number {
    return !this.isActive(stepIndex) && !this.isDisabled(stepIndex) ? 0 : -1;
  }

  isActive(index: number): boolean {
    return index === this.activeStepIndex;
  }

  isDisabled(index: number): boolean {
    return index > this.activeStepIndex;
  }
}
