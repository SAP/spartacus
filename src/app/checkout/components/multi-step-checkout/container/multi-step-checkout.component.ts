import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
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
export class MultiStepCheckoutComponent implements OnInit, OnDestroy {
  step = 1;

  deliveryAddress: Address;
  deliveryModeCode: string;
  paymentDetails: any;

  constructor(
    protected checkoutService: CheckoutService,
    private store: Store<fromCheckoutStore.CheckoutState>,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.store.dispatch(new fromCheckoutStore.ClearCheckoutData());
  }

  setStep(backStep) {
    if (this.step > backStep) {
      for (let i = backStep; i <= this.step; i++) {
        this.store.dispatch(new fromCheckoutStore.ClearCheckoutStep(i));
      }

      this.step = backStep;
    }
  }

  addAddress(address: Address) {
    address.region.isocode =
      address.country.isocode + '-' + address.region.isocode;
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
      .select(fromCheckoutStore.getSelectedCode)
      .pipe(filter(selected => selected !== ''), take(1))
      .subscribe(selected => {
        this.step = 3;
        this.deliveryModeCode = selected;
        this.cd.detectChanges();
      });
  }

  addPaymentInfo(paymentDetails: any) {
    paymentDetails.billingAddress = this.deliveryAddress;
    this.checkoutService.getPaymentDetails(paymentDetails);

    this.store
      .select(fromCheckoutStore.getPaymentDetails)
      .pipe(
        filter(paymentInfo => Object.keys(paymentInfo).length !== 0),
        take(1)
      )
      .subscribe(paymentInfo => {
        if (!paymentInfo['hasError']) {
          this.step = 4;
          this.paymentDetails = paymentInfo;
          this.cd.detectChanges();
        } else {
          // show some message
          console.log(paymentInfo);
        }
      });
  }
}
