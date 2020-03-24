import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActiveCartService, AuthRedirectService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-checkout-login',
  templateUrl: './checkout-login.component.html',
})
export class CheckoutLoginComponent implements OnInit, OnDestroy {
  checkoutLoginForm: FormGroup;
  sub: Subscription;

  constructor(
    protected formBuilder: FormBuilder,
    protected authRedirectService: AuthRedirectService,
    protected activeCartService: ActiveCartService
  ) {}

  ngOnInit() {
    this.checkoutLoginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, CustomFormValidators.emailValidator]],
        emailConfirmation: ['', [Validators.required]],
      },
      {
        validators: CustomFormValidators.emailsMustMatch(
          'email',
          'emailConfirmation'
        ),
      }
    );
  }

  onSubmit() {
    if (this.checkoutLoginForm.valid) {
      const email = this.checkoutLoginForm.get('email').value;
      this.activeCartService.addEmail(email);

      if (!this.sub) {
        this.sub = this.activeCartService.getAssignedUser().subscribe(() => {
          if (this.activeCartService.isGuestCart()) {
            this.authRedirectService.redirect();
          }
        });
      }
    } else {
      this.checkoutLoginForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
