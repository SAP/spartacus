import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../../store';
import { CheckoutService } from '../../../../services/checkout.service';

@Component({
  selector: 'y-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentFormComponent implements OnInit {
  labels = {
    title: 'Payment',
    btnContinue: 'Continue',
    btnBack: 'Change Payment'
  };

  months = [
    { id: '1', name: '01' },
    { id: '2', name: '02' },
    { id: '3', name: '03' },
    { id: '4', name: '04' },
    { id: '5', name: '05' },
    { id: '6', name: '06' },
    { id: '7', name: '07' },
    { id: '8', name: '08' },
    { id: '9', name: '09' },
    { id: '10', name: '10' },
    { id: '11', name: '11' },
    { id: '12', name: '12' }
  ];
  years = [
    { id: '1', name: '2010' },
    { id: '2', name: '2011' },
    { id: '3', name: '2012' },
    { id: '4', name: '2013' },
    { id: '5', name: '2014' },
    { id: '6', name: '2015' },
    { id: '7', name: '2016' },
    { id: '8', name: '2017' },
    { id: '9', name: '2018' },
    { id: '10', name: '2019' },
    { id: '11', name: '2020' }
  ];

  cardTypes$: Observable<any>;
  shippingAddress$: Observable<any>;
  sameAsShippingAddress: boolean = true;

  @Output() backToPayment = new EventEmitter<any>();
  @Output() addPaymentInfo = new EventEmitter<any>();

  payment: FormGroup = this.fb.group({
    defaultPayment: [false],
    accountHolderName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    cardType: this.fb.group({
      code: ['', Validators.required]
    }),
    expiryMonth: ['', Validators.required],
    expiryYear: ['', Validators.required],
    cvn: ['', Validators.required]
  });

  constructor(
    protected store: Store<fromCheckoutStore.CheckoutState>,
    protected checkoutService: CheckoutService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cardTypes$ = this.store.select(fromCheckoutStore.getAllCardTypes).pipe(
      tap(cardTypes => {
        if (Object.keys(cardTypes).length === 0) {
          this.checkoutService.loadSupportedCardTypes();
        }
      })
    );
    this.shippingAddress$ = this.store.select(
      fromCheckoutStore.getDeliveryAddress
    );
  }

  toggleDefaultPaymentMethod() {
    this.payment.value.defaultPayment = !this.payment.value.defaultPayment;
  }

  paymentSelected(card) {
    this.payment['controls'].cardType['controls'].code.setValue(card.code);
  }

  monthSelected(month) {
    this.payment['controls'].expiryMonth.setValue(month.id);
  }

  yearSelected(year) {
    this.payment['controls'].expiryYear.setValue(year.name);
  }

  setSameAsShippingAddress() {
    this.sameAsShippingAddress = !this.sameAsShippingAddress;
  }

  getAddressCardContent(address) {
    return {
      textBold: address.firstName + ' ' + address.lastName,
      text: [
        address.line1,
        address.line2,
        address.town +
          ', ' +
          address.region.isocode +
          ', ' +
          address.country.isocode,
        address.postalCode,
        address.phone
      ]
    };
  }

  back() {
    this.backToPayment.emit();
  }

  next() {
    this.addPaymentInfo.emit(this.payment.value);
  }

  required(name: string) {
    return (
      this.payment.get(`${name}`).hasError('required') &&
      this.payment.get(`${name}`).touched
    );
  }

  notSelected(name: string) {
    return (
      this.payment.get(`${name}`).dirty && !this.payment.get(`${name}`).value
    );
  }
}
