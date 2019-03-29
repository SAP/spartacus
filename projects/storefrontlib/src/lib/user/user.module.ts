import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginModule } from './login/login.module';
import { UserModule, UrlTranslationModule } from '@spartacus/core';
import { RegisterComponentModule } from './register/register.module';
import { LoginFormModule } from './login-form/login-form.module';
import { CheckoutLoginModule } from './checkout-login/checkout-login.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@NgModule({
  imports: [
    CommonModule,
    CheckoutLoginModule,
    LoginModule,
    LoginFormModule,
    ReactiveFormsModule,
    RouterModule,
    UserModule,
    UrlTranslationModule,
    RegisterComponentModule,
    ResetPasswordModule,
    ForgotPasswordModule,
  ],
})
export class UserComponentModule {}
