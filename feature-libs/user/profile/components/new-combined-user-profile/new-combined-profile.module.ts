/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  SpinnerModule,
  NgSelectA11yModule,
  MessageComponentModule,
  PageSlotModule,
} from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { NewCombinedProfileComponent } from './new-combined-profile.component';
import {
  MyAccountV2ProfileComponentService,
  MyAccountV2ProfileModule,
} from '../my-account-v2/user-profile';
import { MyAccountV2EmailComponentService, MyAccountV2EmailModule } from '../my-account-v2/new-email';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    FormErrorsModule,
    RouterModule,
    UrlModule,
    NgSelectModule,
    NgSelectA11yModule,
    MessageComponentModule,
    MyAccountV2ProfileModule,
    MyAccountV2EmailModule,
    PageSlotModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NewCombinedProfileComponent: {
          component: NewCombinedProfileComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: NewCombinedProfileComponent,
              useClass: NewCombinedProfileComponent,
              deps: [UserProfileFacade, GlobalMessageService],
            },
            MyAccountV2EmailComponentService,
            MyAccountV2ProfileComponentService,
          ],
        },
      },
    }),
  ],
  declarations: [NewCombinedProfileComponent],
  exports: [NewCombinedProfileComponent],
})
export class NewCombinedProfileModule {}
