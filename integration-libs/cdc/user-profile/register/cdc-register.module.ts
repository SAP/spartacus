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
import { Store } from '@ngrx/store';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthService,
  CmsConfig,
  CommandService,
  EventService,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  NgSelectA11yModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { CDCRegisterComponentService } from './cdc-register-component.service';

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
              deps: [
                UserRegisterFacade,
                CommandService,
                Store,
                CdcJsService,
                GlobalMessageService,
                AuthService,
                EventService,
              ],
            },
          ],
        },
      },
    }),
  ],
})
export class CDCRegisterModule {}
