import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginModule } from './login/login.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
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
        ForgotPasswordComponent: { selector: 'cx-forgot-password' }
      }
    })
  ],
  declarations: [RegisterComponent, ForgotPasswordComponent],
  exports: [RegisterComponent, ForgotPasswordComponent],
  entryComponents: [ForgotPasswordComponent]
})
export class UserComponentModule {}
