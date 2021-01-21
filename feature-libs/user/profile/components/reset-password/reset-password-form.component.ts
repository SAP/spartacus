import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordService } from '@spartacus/user/profile/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-reset-password-form',
  templateUrl: './reset-password-form.component.html',
})
export class ResetPasswordFormComponent implements OnInit, OnDestroy {
  token: string;
  subscription = new Subscription();

  resetPasswordForm: FormGroup = this.fb.group(
    {
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator],
      ],
      repassword: ['', [Validators.required]],
    },
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'password',
        'repassword'
      ),
    }
  );

  constructor(
    private fb: FormBuilder,
    private routingService: RoutingService,
    private userPasswordService: UserPasswordService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .subscribe((state) => (this.token = state.state.queryParams['token']))
    );

    this.subscription.add(
      this.userPasswordService.isPasswordReset().subscribe((reset) => {
        if (reset) {
          this.routingService.go({ cxRoute: 'login' });
        }
      })
    );
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const password = this.resetPasswordForm.get('password').value;
      this.userPasswordService.reset(this.token, password);
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
