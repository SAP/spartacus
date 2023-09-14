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
} from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { NewProfileComponent } from './new-profile.component';
import { NewProfileComponentService } from './new-profile-component.service';

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
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NewProfileComponent: {
          component: NewProfileComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: NewProfileComponentService,
              useClass: NewProfileComponentService,
              deps: [UserProfileFacade, GlobalMessageService],
            },
          ],
        },
      },
    }),
  ],
  declarations: [NewProfileComponent],
})
export class NewProfileModule {}
