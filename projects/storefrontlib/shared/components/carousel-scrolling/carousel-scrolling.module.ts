/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { HorizontalScrollingPositionDirectiveModule } from '@spartacus/storefront';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { MediaModule } from '../media/media.module';
import { CarouselScrollingComponent } from './carousel-scrolling.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    MediaModule,
    UrlModule,
    I18nModule,
    HorizontalScrollingPositionDirectiveModule,
  ],
  declarations: [CarouselScrollingComponent],
  exports: [CarouselScrollingComponent],
})
export class CarouselScrollingModule {}
