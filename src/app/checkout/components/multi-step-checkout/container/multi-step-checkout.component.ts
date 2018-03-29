import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { take, filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../../../store';
import { CheckoutService } from '../../../services/checkout.service';

import { Address } from '../../../models/address-model';

@Component({
  selector: 'y-multi-step-checkout',
  templateUrl: './multi-step-checkout.component.html',
  styleUrls: ['./multi-step-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiStepCheckoutComponent implements OnInit {
  step = 1;
  deliveryAddress: Address;

  constructor(
    protected checkoutService: CheckoutService,
    private store: Store<fromCheckoutStore.CheckoutState>,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  setStep(backStep) {
    if (this.step > backStep) {
      for (let i = backStep; i <= this.step; i++) {
        this.store.dispatch(new fromCheckoutStore.ClearCheckoutStep(i));
      }

      this.step = backStep;
    }
  }

  addAddress(address: Address) {
    this.checkoutService.createAndSetAddress(address);

    this.store
      .select(fromCheckoutStore.getDeliveryAddress)
      .pipe(
        filter(deliveryAddress => Object.keys(deliveryAddress).length !== 0),
        take(1)
      )
      .subscribe(deliveryAddress => {
        this.step = 2;
        this.deliveryAddress = deliveryAddress;
        this.cd.detectChanges();
      });
  }

  setDeliveryMode(deliveryMode: any) {
    this.checkoutService.setDeliveryMode(deliveryMode.deliveryModeId);

    this.store
      .select(fromCheckoutStore.getSelectedDeliveryMode)
      .pipe(filter(selected => selected !== undefined), take(1))
      .subscribe(selected => {
        this.step = 3;
        this.cd.detectChanges();
      });
  }

  addPaymentInfo(paymentDetails: any) {
    console.log(paymentDetails);
    this.store.dispatch(
      new fromCheckoutStore.CreatePaymentDetails(paymentDetails)
    );
  }
}
