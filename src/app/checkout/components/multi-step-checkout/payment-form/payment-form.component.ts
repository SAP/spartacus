import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../store';
import { CheckoutService } from '../../../services';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'y-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentFormComponent implements OnInit {
  cardTypes$: Observable<any>;
  addANewPaymentMethod = false;

  @Input() existingPaymentMethods;
  @Output() backStep = new EventEmitter<any>();
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
    protected service: CheckoutService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cardTypes$ = this.store.select(fromCheckoutStore.getAllCardTypes).pipe(
      tap(cardTypes => {
        if (Object.keys(cardTypes).length === 0) {
          this.service.loadSupportedCardTypes();
        }
      })
    );
  }

  paymentMethodSelected(paymentDetails) {
    this.service.setPaymentDetails(paymentDetails);
    this.addPaymentInfo.emit('Payment Details Selected');
  }

  toggleDefaultPaymentMethod() {
    this.payment.value.defaultPayment = !this.payment.value.defaultPayment;
  }

  addNewPaymentMethod() {
    this.addANewPaymentMethod = true;
  }

  back() {
    if (this.addANewPaymentMethod) {
      this.addANewPaymentMethod = false;
    } else {
      this.backStep.emit();
    }
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
