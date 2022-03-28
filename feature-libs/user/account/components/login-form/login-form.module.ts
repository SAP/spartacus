import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthService,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
  WindowRef,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { LoginFormComponentService } from './login-form-component.service';
import { LoginFormComponent } from './login-form.component';
import { PasswordInputModule } from '../../../../../projects/storefrontlib/shared';
import { IconModule } from '../../../../../projects/storefrontlib/cms-components/misc/icon/index';

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
    PasswordInputModule,
    IconModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          component: LoginFormComponent,
          guards: [NotAuthGuard],
          providers: [
            {
              provide: LoginFormComponentService,
              useClass: LoginFormComponentService,
              deps: [AuthService, GlobalMessageService, WindowRef],
            },
          ],
        },
      },
    }),
  ],
  declarations: [LoginFormComponent],
})
export class LoginFormModule {}
