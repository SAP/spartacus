/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/index';
import { StarRatingComponent } from './star-rating.component';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule, StarRatingComponent],
  exports: [StarRatingComponent],
})
export class StarRatingModule {}
