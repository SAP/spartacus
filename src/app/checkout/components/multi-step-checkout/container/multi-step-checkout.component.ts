import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { take, filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../../../store';
import * as fromUserStore from '../../../../user/store';

import { CheckoutService } from '../../../services/checkout.service';
import * as fromRouting from '../../../../routing/store';

import { Address } from '../../../models/address-model';
import { Observable } from 'rxjs/Observable';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'y-multi-step-checkout',
  templateUrl: './multi-step-checkout.component.html',
  styleUrls: ['./multi-step-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiStepCheckoutComponent implements OnInit, OnDestroy {
  step = 1;

  deliveryAddress: Address;
  paymentDetails: any;

  step1Sub: Subscription;
  step2Sub: Subscription;
  step3Sub: Subscription;
  step4Sub: Subscription;

  @ViewChild(AddressFormComponent) addressForm: AddressFormComponent;
  addressVerifySub: Subscription;

  cardTypes$: Observable<any>;
  existingAddresses$: Observable<any>;
  existingPaymentMethods$: Observable<any>;

  constructor(
    protected checkoutService: CheckoutService,
    private store: Store<fromCheckoutStore.CheckoutState>,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cardTypes$ = this.store.select(fromCheckoutStore.getAllCardTypes).pipe(
      tap(cardTypes => {
        if (Object.keys(cardTypes).length === 0) {
          this.checkoutService.loadSupportedCardTypes();
        }
      })
    );

    this.existingAddresses$ = this.store
      .select(fromUserStore.getAddresses)
      .pipe(
        tap(addresses => {
          if (addresses.length === 0) {
            this.checkoutService.loadUserAddresses();
          }
        })
      );

    this.existingPaymentMethods$ = this.store
      .select(fromUserStore.getPaymentMethods)
      .pipe(
        tap(payments => {
          if (!payments || !payments.length) {
            this.checkoutService.loadUserPaymentMethods();
          }
        })
      );
  }

  ngOnDestroy() {
    if (this.step1Sub) {
      this.step1Sub.unsubscribe();
    }
    if (this.step2Sub) {
      this.step2Sub.unsubscribe();
    }
    if (this.step3Sub) {
      this.step3Sub.unsubscribe();
    }
    if (this.step4Sub) {
      this.step4Sub.unsubscribe();
    }
    if (this.addressVerifySub) {
      this.addressVerifySub.unsubscribe();
    }
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

  verifyAddress(address) {
    this.checkoutService.verifyAddress(address);

    this.addressVerifySub = this.store
      .select(fromCheckoutStore.getAddressVerificationResults)
      .pipe(filter(results => Object.keys(results).length !== 0), take(1))
      .subscribe(results => {
        if (results.decision === 'ACCEPT') {
          this.addAddress({
            address: address,
            newAddress: true
          });
        } else if (results.decision === 'REJECT') {
          // will be shown in global message
          console.log('Invalid Address');
          this.store.dispatch(
            new fromCheckoutStore.ClearAddressVerificationResults()
          );
        } else if (results.decision === 'REVIEW') {
          this.addressForm.openSuggestedAddress(results);
        }
      });
  }

  addAddress(addressObject) {
    if (addressObject.newAddress) {
      this.checkoutService.createAndSetAddress(addressObject.address);
    } else {
      this.checkoutService.setDeliveryAddress(addressObject.address);
    }

    this.step1Sub = this.store
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

    this.step2Sub = this.store
      .select(fromCheckoutStore.getSelectedCode)
      .pipe(filter(selected => selected !== ''), take(1))
      .subscribe(selected => {
        this.step = 3;
        this.cd.detectChanges();
      });
  }

  addPaymentInfo(paymentDetailsObject) {
    if (paymentDetailsObject.newPayment) {
      paymentDetailsObject.payment.billingAddress = this.deliveryAddress;
      this.checkoutService.getPaymentDetails(paymentDetailsObject.payment);
    } else {
      this.checkoutService.setPaymentDetails(paymentDetailsObject.payment);
    }

    this.step3Sub = this.store
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
          this.store.dispatch(new fromCheckoutStore.ClearCheckoutStep(3));
        }
      });
  }

  placeOrder() {
    this.checkoutService.placeOrder();

    this.step4Sub = this.store
      .select(fromCheckoutStore.getOrderDetails)
      .pipe(filter(order => Object.keys(order).length !== 0), take(1))
      .subscribe(order => {
        this.checkoutService.orderDetails = order;
        this.store.dispatch(
          new fromRouting.Go({
            path: ['orderConfirmation']
          })
        );
      });
  }
}
