import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRedirectService, CartService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-checkout-login',
  templateUrl: './checkout-login.component.html',
})
export class CheckoutLoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authRedirectService: AuthRedirectService
  ) {}

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
}
