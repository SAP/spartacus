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
  FeaturesConfigModule,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  SpinnerModule,
  NgSelectA11yModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
//import { UpdateProfileComponent } from 'integration-libs/cdp/src/lib/update-profile/cdp-update-profile.component';
//import { UserOutlets } from 'integration-libs/cdp/src/lib/update-profile/user-outlets.model';
import { UpdateProfileComponentService } from './update-profile-component.service';
import { UpdateProfileComponent } from './update-profile.component';
import { TempUpdateProfileComponent } from './temp-update-profile/temp-update-profile.component';
//import { TempUpdateProfileModule } from './update-profile/temp-update-profile.module';

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
    FeaturesConfigModule,
   // TempUpdateProfileModule
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileComponent: {
          component: UpdateProfileComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: UpdateProfileComponentService,
              useClass: UpdateProfileComponentService,
              deps: [UserProfileFacade, GlobalMessageService],
            },
          ],
        },
      },
    }),
    provideOutlet({
      id: 'header',
      position: OutletPosition.AFTER,
      component: TempUpdateProfileComponent,
    }),
  ],
  declarations: [UpdateProfileComponent],
})
export class UpdateProfileModule {}
