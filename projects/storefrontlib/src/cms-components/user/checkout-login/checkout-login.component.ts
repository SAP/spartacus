import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthRedirectService, CartService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';
import { FormUtils } from '../../../shared/utils/forms/form-utils';

@Component({
  selector: 'cx-checkout-login',
  templateUrl: './checkout-login.component.html',
})
export class CheckoutLoginComponent implements OnDestroy {
  form: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      emailConfirmation: [
        '',
        [Validators.required, CustomFormValidators.emailValidator],
      ],
    },
    { validator: this.emailsMatch }
  );

  sub: Subscription;

  private submitClicked = false;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private authRedirectService: AuthRedirectService
  ) {}

  isNotValid(formControlName: string): boolean {
    return FormUtils.isNotValidField(
      this.form,
      formControlName,
      this.submitClicked
    );
  }

  isEmailConfirmInvalid(): boolean {
    return (
      this.isNotValid('emailConfirmation') || this.form.hasError('NotEqual')
    );
  }

  onSubmit() {
    this.submitClicked = true;

    if (this.form.invalid) {
      return;
    }

    const email = this.form.value.email;
    this.cartService.addEmail(email);

    if (!this.sub) {
      this.sub = this.cartService.getAssignedUser().subscribe(user => {
        if (user.name === 'guest') {
          this.authRedirectService.redirect();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private emailsMatch(abstractControl: AbstractControl): { NotEqual: boolean } {
    return abstractControl.get('email').value !==
      abstractControl.get('emailConfirmation').value
      ? { NotEqual: true }
      : null;
  }
}
