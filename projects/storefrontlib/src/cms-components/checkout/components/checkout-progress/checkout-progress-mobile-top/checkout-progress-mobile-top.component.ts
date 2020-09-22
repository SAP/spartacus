import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveCartService, Cart } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutStep } from '../../../model/checkout-step.model';
import { CheckoutStepService } from '../../../services/checkout-step.service';

@Component({
  selector: 'cx-checkout-progress-mobile-top',
  templateUrl: './checkout-progress-mobile-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutProgressMobileTopComponent implements OnInit {
  constructor(
    protected checkoutStepService: CheckoutStepService,
    protected activeCartService: ActiveCartService
  ) {}

  cart$: Observable<Cart>;

  steps$: Observable<
    CheckoutStep[]
  > = this.checkoutStepService.steps$.asObservable();

  activeStepIndex: number;
  activeStepIndex$: Observable<
    number
  > = this.checkoutStepService.activeStepIndex$.pipe(
    tap((index) => (this.activeStepIndex = index))
  );

  ngOnInit(): void {
    this.cart$ = this.activeCartService.getActive();
  }
}
