import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginModule } from './login/login.module';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {
  UserModule,
  UrlTranslationModule,
  ConfigModule,
  CmsConfig
} from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    RouterModule,
    UserModule,
    UrlTranslationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ForgotPasswordComponent: { selector: 'cx-reset-password' }
      }
    })
  ],
  declarations: [RegisterComponent, ResetPasswordComponent],
  exports: [RegisterComponent, ResetPasswordComponent],
  entryComponents: [ResetPasswordComponent]
})
export class UserComponentModule {}
