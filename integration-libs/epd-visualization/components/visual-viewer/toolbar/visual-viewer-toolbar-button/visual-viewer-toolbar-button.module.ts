/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spartacus/storefront';
import { VisualViewerToolbarButtonComponent } from './visual-viewer-toolbar-button.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [VisualViewerToolbarButtonComponent],
  exports: [VisualViewerToolbarButtonComponent],
})
export class VisualViewerToolbarButtonModule {}
