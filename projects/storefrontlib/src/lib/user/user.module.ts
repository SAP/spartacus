import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginModule } from './login/login.module';
import { RegisterComponent } from './register/register.component';
import { UserModule, UrlTranslationModule } from '@spartacus/core';
import { LoginFormModule } from './login-form/login-form.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    LoginFormModule,
    ReactiveFormsModule,
    RouterModule,
    UserModule,
    UrlTranslationModule,
    ResetPasswordModule,
    ForgotPasswordModule
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent]
})
export class UserComponentModule {}
