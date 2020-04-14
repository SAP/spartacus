import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutingService, UserService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

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
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .subscribe((state) => (this.token = state.state.queryParams['token']))
    );

    this.subscription.add(
      this.userService.isPasswordReset().subscribe((reset) => {
        if (reset) {
          this.routingService.go({ cxRoute: 'login' });
        }
      })
    );
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const password = this.resetPasswordForm.get('password').value;
      this.userService.resetPassword(this.token, password);
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
