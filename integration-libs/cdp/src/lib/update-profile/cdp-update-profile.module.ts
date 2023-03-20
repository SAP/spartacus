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
import { I18nModule, UrlModule, FeaturesConfigModule, CmsConfig, ConfigModule} from '@spartacus/core';
import {
  SpinnerModule,
  FormErrorsModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { CdpUpdateProfileComponent } from './cdp-update-profile.component';
import { CdpUpdateProfileService } from './cdp-update-profile.service';

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
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileComponent: {
          component: CdpUpdateProfileComponent,
        },
      },
    }),
  ],
  providers:[CdpUpdateProfileService],
  declarations: [CdpUpdateProfileComponent],
  exports: [CdpUpdateProfileComponent],
})
export class CdpUpdateProfileModule {}
