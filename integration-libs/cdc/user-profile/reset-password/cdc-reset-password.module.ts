/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ResetPasswordComponentService } from '@spartacus/user/profile/components';
import { CdcResetPasswordComponentService } from './cdc-reset-password-component.service';
import {
  CmsConfig,
  GlobalMessageService,
  RoutingService,
  provideDefaultConfig,
} from '@spartacus/core';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { OccCdcUserProfileAdapter } from './occ-cdc-user-profile.adapter';
import { UserProfileAdapter } from '@spartacus/user/profile/core';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ResetPasswordComponent: {
          providers: [
            {
              provide: ResetPasswordComponentService,
              useClass: CdcResetPasswordComponentService,
              deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
            },
          ],
        },
      },
    }),
    { provide: UserProfileAdapter, useClass: OccCdcUserProfileAdapter },
  ],
})
export class CdcResetPasswordModule {}
