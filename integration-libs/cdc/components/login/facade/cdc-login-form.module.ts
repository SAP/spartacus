import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthService,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
  WindowRef,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { UserAccountModule } from '@spartacus/user';
import {
  LoginFormComponent,
  LoginFormComponentService,
} from '@spartacus/user/account/components';
import { CdcLoginFormComponentService } from './cdc-login-form-component.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
    UserAccountModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          component: LoginFormComponent,
          providers: [
            {
              provide: LoginFormComponentService,
              useClass: CdcLoginFormComponentService,
              deps: [
                AuthService,
                GlobalMessageService,
                WindowRef,
                CdcJsService,
              ],
            },
          ],
        },
      },
    }),
  ],
})
export class CDCLoginFormModule {}
