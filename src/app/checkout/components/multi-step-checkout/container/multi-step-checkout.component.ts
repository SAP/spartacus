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
import * as fromStore from './../../../store';
import { tap } from 'rxjs/operators';

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
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      phone: ''
    })
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.CheckoutState>
  ) {}

  ngOnInit() {
    this.countries$ = this.store.select(fromStore.getAllDeliveryCountries).pipe(
      tap(countries => {
        if (Object.keys(countries).length === 0) {
          this.store.dispatch(new fromStore.LoadDeliveryCountries());
        }
      })
    );
  }
}
