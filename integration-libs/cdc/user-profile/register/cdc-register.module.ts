/*
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
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  NgSelectA11yModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { RegisterComponentService, RegisterFormService } from '@spartacus/user/profile/components';
import { CDCRegisterComponentService } from './cdc-register-component.service';
import { CdcRegisterFormService } from './cdc-register-form.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
    FormErrorsModule,
    NgSelectModule,
    NgSelectA11yModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        RegisterCustomerComponent: {
          providers: [
            {
              provide: RegisterComponentService,
              useClass: CDCRegisterComponentService,
            },
            {
              provide: RegisterFormService,
              useClass: CdcRegisterFormService,
            },
          ],
        },
      },
    }),
  ],
})
export class CDCRegisterModule {}
