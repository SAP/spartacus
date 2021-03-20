import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthConfigService,
  OAuthFlow,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(
    protected userService: UserService,
    protected routingService: RoutingService,
    protected authConfigService: AuthConfigService
  ) {}

  form: FormGroup = new FormGroup({
    userEmail: new FormControl('', [
      Validators.required,
      CustomFormValidators.emailValidator,
    ]),
  });

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.userService.requestForgotPasswordEmail(this.form.value.userEmail);
    if (
      this.authConfigService.getOAuthFlow() ===
      OAuthFlow.ResourceOwnerPasswordFlow
    ) {
      this.routingService.go({ cxRoute: 'login' });
    }
  }

  reset() {
    this.form.reset();
  }
}
