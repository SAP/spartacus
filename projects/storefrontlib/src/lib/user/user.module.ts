import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginModule } from './login/login.module';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserModule, UrlTranslationModule } from '@spartacus/core';
import { LoginFormModule } from './login-form/login-form.module';
import { GuestLoginModule } from './guest-login/guest-login.module';

@NgModule({
  imports: [
    CommonModule,
    GuestLoginModule,
    LoginModule,
    LoginFormModule,
    ReactiveFormsModule,
    RouterModule,
    UserModule,
    UrlTranslationModule
  ],
  declarations: [RegisterComponent, ResetPasswordComponent],
  exports: [RegisterComponent, ResetPasswordComponent]
})
export class UserComponentModule {}
