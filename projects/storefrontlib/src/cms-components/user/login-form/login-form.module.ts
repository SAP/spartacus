import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  NotAuthGuard,
  UrlModule,
  UserModule,
} from '@spartacus/core';
import { CmsModule } from '../../../cms-structure/cms.module';
import { LoginFormComponent } from './login-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CmsModule,
    UserModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          selector: 'cx-login-form',
          guards: [NotAuthGuard],
        },
      },
    }),
    I18nModule,
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  entryComponents: [LoginFormComponent],
})
export class LoginFormModule {}
