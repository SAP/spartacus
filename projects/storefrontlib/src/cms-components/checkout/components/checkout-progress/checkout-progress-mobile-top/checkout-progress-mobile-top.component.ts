import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActiveCartService, Cart } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutStep } from '../../../model/checkout-step.model';
import { CheckoutStepService } from '../../../services/checkout-step.service';

@Component({
  selector: 'cx-checkout-progress-mobile-top',
  templateUrl: './checkout-progress-mobile-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutProgressMobileTopComponent implements OnInit, OnDestroy {
  constructor(
    protected checkoutStepService: CheckoutStepService,
    protected activeCartService: ActiveCartService,
    protected cdr: ChangeDetectorRef
  ) {}

  cart$: Observable<Cart>;

  steps: CheckoutStep[];

  activeStepIndex: number;
  activeStepIndex$: Observable<
    number
  > = this.checkoutStepService.activeStepIndex$.pipe(
    tap((index) => (this.activeStepIndex = index))
  );

  subscription: Subscription;

  ngOnInit(): void {
    this.cart$ = this.activeCartService.getActive();

    this.subscription = this.checkoutStepService.steps$.subscribe((steps) => {
      this.steps = steps;
      // TODO(#8879): Couldn't we use observables here instead?
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
