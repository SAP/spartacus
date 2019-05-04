import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlTranslationModule,
  UserModule,
} from '@spartacus/core';
import { BootstrapModule } from '../../../lib/bootstrap.module';
import { CmsModule } from '../../../lib/cms/cms.module';
import { LoginFormComponent } from './login-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CmsModule,
    BootstrapModule,
    UserModule,
    UrlTranslationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          selector: 'cx-login-form',
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
