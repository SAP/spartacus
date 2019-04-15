import { RoutingService } from '@spartacus/core';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CheckoutConfig } from '../../../config/checkout-config';
import { CheckoutStep } from '../../../config/model/checkout-step.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-checkout-progress',
  templateUrl: './checkout-progress.component.html',
  styleUrls: ['./checkout-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutProgressComponent implements OnInit {
  constructor(
    protected config: CheckoutConfig,
    protected routingService: RoutingService
  ) {}

  steps: Array<CheckoutStep>;
  routerState$: Observable<any>;
  activeStepIndex: number;
  activeStepUrl: string;

  ngOnInit() {
    this.steps = this.config.checkout.steps;
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
