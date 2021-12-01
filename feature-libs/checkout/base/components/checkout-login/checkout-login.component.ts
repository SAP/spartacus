import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { AuthRedirectService } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'cx-checkout-login',
  templateUrl: './checkout-login.component.html',
})
export class CheckoutLoginComponent implements OnDestroy {
  checkoutLoginForm: FormGroup = this.formBuilder.group(
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
  sub: Subscription;

  constructor(
    protected formBuilder: FormBuilder,
    protected authRedirectService: AuthRedirectService,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  onSubmit() {
    if (this.checkoutLoginForm.valid) {
      const email = this.checkoutLoginForm.get('email')?.value;
      this.activeCartFacade.addEmail(email);

      if (!this.sub) {
        this.sub = this.activeCartFacade
          .getAssignedUser()
          .pipe(withLatestFrom(this.activeCartFacade.isGuestCart()))
          .subscribe(([_user, isGuestCart]) => {
            if (isGuestCart) {
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
