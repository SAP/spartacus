/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { VisualViewerAnimationSliderComponent } from './visual-viewer-animation-slider.component';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
@NgModule({
  imports: [CommonModule, I18nModule, VisualViewerAnimationSliderComponent],
  exports: [VisualViewerAnimationSliderComponent],
})
export class VisualViewerAnimationSliderModule {}
