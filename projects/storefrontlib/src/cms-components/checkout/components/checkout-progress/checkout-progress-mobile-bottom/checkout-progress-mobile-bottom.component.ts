import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RoutingService, RoutingConfigService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { CheckoutConfig } from '../../../config/checkout-config';
import { CheckoutStep } from '../../../model/checkout-step.model';
import { CheckoutConfigService } from '../../../services/checkout-config.service';

@Component({
  selector: 'cx-checkout-progress-mobile-bottom',
  templateUrl: './checkout-progress-mobile-bottom.component.html',
})
export class CheckoutProgressMobileBottomComponent
  implements OnInit, OnDestroy {
  constructor(
    //protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected routingConfigService: RoutingConfigService,
    protected checkoutConfigService: CheckoutConfigService,
    protected cdr: ChangeDetectorRef
  ) {}

  steps: Array<CheckoutStep>;
  routerState$: Observable<any>;
  activeStepIndex: number;
  activeStepUrl: string;

  subscription: Subscription;

  ngOnInit() {
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
