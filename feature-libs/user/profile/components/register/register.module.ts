/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CaptchaModule,
  FormErrorsModule,
  NgSelectA11yModule,
  PasswordVisibilityToggleModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { RegisterComponentService } from './register-component.service';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    CaptchaModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
    FormErrorsModule,
    NgSelectModule,
    NgSelectA11yModule,
    PasswordVisibilityToggleModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        RegisterCustomerComponent: {
          component: RegisterComponent,
          guards: [NotAuthGuard],
          providers: [
            {
              provide: RegisterComponentService,
              useClass: RegisterComponentService,
              deps: [UserRegisterFacade, GlobalMessageService],
            },
          ],
        },
      },
    }),
  ],
  declarations: [RegisterComponent],
})
export class RegisterComponentModule {}
