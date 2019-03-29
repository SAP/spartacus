import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form.component';
import {
  UserModule,
  UrlTranslationModule,
  ConfigModule,
  CmsConfig,
  I18nModule,
} from '@spartacus/core';
import { CmsModule } from '../../cms/cms.module';
import { BootstrapModule } from '../../bootstrap.module';

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
