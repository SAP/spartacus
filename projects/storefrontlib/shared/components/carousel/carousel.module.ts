/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
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
    FeaturesConfigModule,
  ],
  declarations: [CarouselComponent, FocusableCarouselItemDirective],
  exports: [CarouselComponent, FocusableCarouselItemDirective],
})
export class CarouselModule {}
