import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginModule } from './login/login.module';
import { RegisterComponent } from './register/register.component';
import { UserModule, UrlTranslationModule } from '@spartacus/core';
import { ResetNewPasswordModule } from './reset-new-password/reset-new-password.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    RouterModule,
    UserModule,
    UrlTranslationModule,
    ResetNewPasswordModule,
    ForgotPasswordModule
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent]
})
export class UserComponentModule {}
