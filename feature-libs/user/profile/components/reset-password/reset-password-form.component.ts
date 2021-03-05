import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
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
    private userPassword: UserPasswordFacade
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .subscribe((state) => (this.token = state.state.queryParams['token']))
    );
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      // tslint:disable-next-line:no-non-null-assertion
      const password = this.resetPasswordForm.get('password')!.value;
      this.userPassword.reset(this.token, password).subscribe({
        next: () => this.routingService.go({ cxRoute: 'login' }),
      });
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
