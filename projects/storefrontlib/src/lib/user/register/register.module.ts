import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginModule } from '../login/login.module';
import { RegisterComponent } from './register.component';
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
        RegisterCustomerComponent: {
          selector: 'cx-register'
        }
      }
    })
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  entryComponents: [RegisterComponent]
})
export class RegisterComponentModule {}
