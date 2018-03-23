import { Component, ChangeDetectionStrategy } from '@angular/core';
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
export class MultiStepCheckoutComponent {
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

  constructor(private fb: FormBuilder) {}
}
