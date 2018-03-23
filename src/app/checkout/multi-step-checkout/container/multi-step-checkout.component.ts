import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'y-multi-step-checkout',
  templateUrl: './multi-step-checkout.component.html',
  styleUrls: ['./multi-step-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiStepCheckoutComponent implements OnInit {
  countries$: Observable<any>;

  form = this.fb.group({
    address: this.fb.group({
      titleCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      line1: ['', Validators.required],
      line2: '',
      town: '',
      region: this.fb.group({
        isocode: ''
      }),
      country: this.fb.group({
        isocode: ''
      }),
      postalCode: ['', Validators.required],
      phone: ''
    }),
    shippingMethod: this.fb.group({}),
    paymentMethod: this.fb.group({})
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  addAddress(address) {
    console.log(address);
  }
}
