import { RoutingService } from '@spartacus/core';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CheckoutConfig } from '../../../config/checkout-config';
import { CheckoutStep } from '../../../config/model/checkout-step.model';
import { Observable } from 'rxjs';

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

  ngOnInit() {
    this.steps = this.config.checkout.steps;
    this.routerState$ = this.routingService.getRouterState();
  }
}
