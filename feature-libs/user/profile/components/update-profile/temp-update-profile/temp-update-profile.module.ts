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
import { I18nModule, UrlModule, FeaturesConfigModule} from '@spartacus/core';
import {
  SpinnerModule,
  FormErrorsModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { TempUpdateProfileComponent } from './temp-update-profile.component';

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
  ],
  declarations: [TempUpdateProfileComponent],
  exports: [TempUpdateProfileComponent],
})
export class TempUpdateProfileModule {}
