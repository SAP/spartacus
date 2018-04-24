import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';


import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'y-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentFormComponent implements OnInit {
  newPayment = false;

  @Input() existingPaymentMethods;
  @Input() cardTypes;
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  paymentMethodSelected(paymentDetails) {
    this.addPaymentInfo.emit({ payment: paymentDetails, newPayment: false });
  }

  toggleDefaultPaymentMethod() {
    this.payment.value.defaultPayment = !this.payment.value.defaultPayment;
  }

  addNewPaymentMethod() {
    this.newPayment = true;
  }

  back() {
    if (this.newPayment) {
      this.newPayment = false;
    } else {
      this.backStep.emit();
    }
  }

  next() {
    this.addPaymentInfo.emit({ payment: this.payment.value, newPayment: true });
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
