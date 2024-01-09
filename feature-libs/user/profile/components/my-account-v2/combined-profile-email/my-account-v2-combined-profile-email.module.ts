/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { MyAccountV2CombinedProfileEmailComponent } from './my-account-v2-combined-profile-email.component';
import { MyAccountV2ProfileComponentService } from '../user-profile';
import { MyAccountV2EmailComponentService } from '../email';
import { UpdateProfileModule } from '../../update-profile';
import { UpdateEmailModule } from '../../update-email';

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
    PageSlotModule,
    UpdateProfileModule,
    UpdateEmailModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountV2CombinedProfileEmailComponent: {
          component: MyAccountV2CombinedProfileEmailComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: MyAccountV2CombinedProfileEmailComponent,
              useClass: MyAccountV2CombinedProfileEmailComponent,
              deps: [UserProfileFacade, GlobalMessageService],
            },
            MyAccountV2EmailComponentService,
            MyAccountV2ProfileComponentService,
          ],
        },
      },
    }),
  ],
  declarations: [MyAccountV2CombinedProfileEmailComponent],
  exports: [MyAccountV2CombinedProfileEmailComponent],
})
export class NewCombinedProfileModule {}
