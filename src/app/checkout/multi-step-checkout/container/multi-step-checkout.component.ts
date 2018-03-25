import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromCartStore from '../../../cart/store';
import { CartService } from '../../../cart/services';

import { Address } from './../../models/address-model';

@Component({
  selector: 'y-multi-step-checkout',
  templateUrl: './multi-step-checkout.component.html',
  styleUrls: ['./multi-step-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiStepCheckoutComponent implements OnInit {
  step = 1;

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
        isocode: 'qc'
      }),
      country: this.fb.group({
        isocode: 'ca'
      }),
      postalCode: ['', Validators.required],
      phone: ''
    }),
    shippingMethod: this.fb.group({}),
    paymentMethod: this.fb.group({})
  });

  constructor(
    private fb: FormBuilder,
    protected cartService: CartService,
    protected store: Store<fromCartStore.CartState>
  ) {}

  ngOnInit() {}

  setStep(step) {
    this.step = step;
  }

  addAddress(address: Address) {
    console.log(address);
    this.cartService.createAndSetAddress(address);
    this.step = 2;
  }
}
