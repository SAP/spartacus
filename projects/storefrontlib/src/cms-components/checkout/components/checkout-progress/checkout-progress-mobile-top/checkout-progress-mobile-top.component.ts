import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveCartService, Cart } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutStep } from '../../../model/checkout-step.model';
import { CheckoutStepService } from '../../../services/checkout-step.service';

@Component({
  selector: 'cx-checkout-progress-mobile-top',
  templateUrl: './checkout-progress-mobile-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutProgressMobileTopComponent implements OnInit {
  private _steps$: BehaviorSubject<CheckoutStep[]> = this.checkoutStepService
    .steps$;

  constructor(
    protected checkoutStepService: CheckoutStepService,
    protected activeCartService: ActiveCartService
  ) {}

  cart$: Observable<Cart>;

  activeStepIndex: number;
  activeStepIndex$: Observable<
    number
  > = this.checkoutStepService.activeStepIndex$.pipe(
    tap((index) => (this.activeStepIndex = index))
  );

  get steps$(): Observable<CheckoutStep[]> {
    return this._steps$.asObservable();
  }

  ngOnInit(): void {
    this.cart$ = this.activeCartService.getActive();
  }
}
