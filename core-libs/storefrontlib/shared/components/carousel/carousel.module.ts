/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon';
import { MediaModule } from '../media/media.module';
import { CarouselComponent } from './carousel.component';
import { FocusableCarouselItemDirective } from './focusable-carousel-item/focusable-carousel-item.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    MediaModule,
    UrlModule,
    I18nModule,
    CarouselComponent,
    FocusableCarouselItemDirective,
  ],
  exports: [CarouselComponent, FocusableCarouselItemDirective],
})
export class CarouselModule {}
