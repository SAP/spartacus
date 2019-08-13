import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '@spartacus/core';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-checkout-login',
  templateUrl: './checkout-login.component.html',
})
export class CheckoutLoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: ['', [Validators.required, CustomFormValidators.emailValidator]],
      userIdConf: [
        '',
        [Validators.required, CustomFormValidators.emailValidator],
      ],
      termsandconditions: [Validators.requiredTrue],
    });
  }

  submit(): void {
    const email = this.form.value.userId;
    this.cartService.addEmail(email);
  }
}
