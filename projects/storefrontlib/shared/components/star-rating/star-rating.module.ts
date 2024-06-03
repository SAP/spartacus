/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/index';
import { StarRatingComponent } from './star-rating.component';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule, FeaturesConfigModule],
  declarations: [StarRatingComponent],
  exports: [StarRatingComponent],
})
export class StarRatingModule {}
