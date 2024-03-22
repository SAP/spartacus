/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FeaturesConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/index';
import { StarRatingComponent } from './star-rating.component';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule, FeaturesConfigModule],
  declarations: [StarRatingComponent],
  exports: [StarRatingComponent],
  providers: [
    // TODO: (CXSPA-5707) Remove feature flag config next major
    provideDefaultConfig(<FeaturesConfig>{
      features: {
        a11yStarRating: true,
      },
    }),
  ],
})
export class StarRatingModule {}
