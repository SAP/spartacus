/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@commerce-storefront-toolset/core';
import { SpinnerModule } from '@commerce-storefront-toolset/storefront';
import { VisualViewerAnimationSliderModule } from './toolbar/visual-viewer-animation-slider/visual-viewer-animation-slider.module';
import { VisualViewerToolbarButtonModule } from './toolbar/visual-viewer-toolbar-button/visual-viewer-toolbar-button.module';
import { VisualViewerComponent } from './visual-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    VisualViewerToolbarButtonModule,
    VisualViewerAnimationSliderModule,
    SpinnerModule,
  ],
  declarations: [VisualViewerComponent],
  exports: [VisualViewerComponent],
})
export class VisualViewerModule {}
