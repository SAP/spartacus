import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginModule } from '../login/login.module';
import { RegisterComponent } from './register.component';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  NotAuthGuard,
  UrlModule,
  UserModule,
  BackAfterAuthGuard,
} from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    RouterModule,
    UserModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        RegisterCustomerComponent: {
          selector: 'cx-register',
          guards: [NotAuthGuard, BackAfterAuthGuard],
        },
      },
    }),
    I18nModule,
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  entryComponents: [RegisterComponent],
})
export class RegisterComponentModule {}
