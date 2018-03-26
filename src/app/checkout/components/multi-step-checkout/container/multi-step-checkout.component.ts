import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromCartStore from '../../../../cart/store';
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

  countries$: Observable<any>;
  titles$: Observable<any>;

  form = this.fb.group({
    address: this.fb.group({
      titleCode: ['mr', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      town: '',
      region: this.fb.group({
        isocode: 'JP-27'
      }),
      country: this.fb.group({
        isocode: 'JP'
      }),
      title: this.fb.group({
        code: 'mr'
      }),
      postalCode: ['', Validators.required],
      phone: ''
    }),
    shippingMethod: this.fb.group({}),
    paymentMethod: this.fb.group({})
  });

  constructor(
    private fb: FormBuilder,
    protected checkoutService: CheckoutService,
    private store: Store<fromCheckoutStore.CheckoutState>
  ) {}

  ngOnInit() {
    this.countries$ = this.store
      .select(fromCheckoutStore.getAllDeliveryCountries)
      .pipe(
        tap(countries => {
          if (Object.keys(countries).length === 0) {
            this.store.dispatch(new fromCheckoutStore.LoadDeliveryCountries());
          }
        })
      );

    this.titles$ = this.store.select(fromCheckoutStore.getAllTitles).pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.store.dispatch(new fromCheckoutStore.LoadTitles());
        }
      })
    );
  }

  setStep(completeStep) {
    if (this.step > completeStep) {
      this.step = completeStep;
    }
  }

  addAddress(address: Address) {
    this.checkoutService.createAndSetAddress(address);
    this.step = 2;
  }
}
