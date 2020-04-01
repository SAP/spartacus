import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { CheckoutService, RoutingService } from '@spartacus/core';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cx-place-order',
  templateUrl: './place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  placeOrderSubscription: Subscription;

  checkoutSubmitForm = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue],
  });

  constructor(
    protected checkoutService: CheckoutService,
    protected routingService: RoutingService,
    protected fb: FormBuilder
  ) {}

  submitForm(): void {
    if (this.checkoutSubmitForm.valid) {
      this.checkoutService.placeOrder();
    } else {
      this.checkoutSubmitForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.placeOrderSubscription = this.checkoutService
      .getOrderDetails()
      .pipe(filter(order => Object.keys(order).length !== 0))
      .subscribe(() => {
        this.routingService.go({ cxRoute: 'orderConfirmation' });
      });
  }

  ngOnDestroy(): void {
    if (this.placeOrderSubscription) {
      this.placeOrderSubscription.unsubscribe();
    }
  }
}
