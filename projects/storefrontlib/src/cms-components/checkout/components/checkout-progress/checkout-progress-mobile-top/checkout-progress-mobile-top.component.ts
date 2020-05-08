import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActiveCartService, Cart } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutStepService } from '../../../services/checkout-step.service';
import { CheckoutStep } from '../../../model/checkout-step.model';

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
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
