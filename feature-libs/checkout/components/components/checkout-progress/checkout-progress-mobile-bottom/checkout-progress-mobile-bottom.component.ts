import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckoutStep } from '@spartacus/checkout/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutStepService } from '../../../services/checkout-step.service';

@Component({
  selector: 'cx-checkout-progress-mobile-bottom',
  templateUrl: './checkout-progress-mobile-bottom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutProgressMobileBottomComponent {
  private _steps$: BehaviorSubject<CheckoutStep[]> =
    this.checkoutStepService.steps$;

  constructor(protected checkoutStepService: CheckoutStepService) {}

  activeStepIndex: number;
  activeStepIndex$: Observable<number> =
    this.checkoutStepService.activeStepIndex$.pipe(
      tap((index) => (this.activeStepIndex = index))
    );

  get steps$(): Observable<CheckoutStep[]> {
    return this._steps$.asObservable();
  }
}
