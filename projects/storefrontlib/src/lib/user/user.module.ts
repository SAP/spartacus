import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginModule } from './login/login.module';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserModule, UrlTranslationModule } from '@spartacus/core';
import { ResetNewPasswordModule } from './reset-new-password/reset-new-password.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    RouterModule,
    UserModule,
    UrlTranslationModule,
    ResetNewPasswordModule
  ],
  declarations: [RegisterComponent, ResetPasswordComponent],
  exports: [RegisterComponent, ResetPasswordComponent]
})
export class UserComponentModule {}
