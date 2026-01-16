/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { HorizontalScrollingPositionDirectiveModule } from '../../directives/horizontal-scrolling-position/horizontal-scrolling-position-directive.module';
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
    CarouselScrollingComponent,
  ],
  exports: [CarouselScrollingComponent],
})
export class CarouselScrollingModule {}
