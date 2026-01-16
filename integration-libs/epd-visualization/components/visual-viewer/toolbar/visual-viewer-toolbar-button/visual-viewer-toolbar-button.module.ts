/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spartacus/storefront';
import { VisualViewerToolbarButtonComponent } from './visual-viewer-toolbar-button.component';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
@NgModule({
  imports: [CommonModule, IconModule, VisualViewerToolbarButtonComponent],
  exports: [VisualViewerToolbarButtonComponent],
})
export class VisualViewerToolbarButtonModule {}
