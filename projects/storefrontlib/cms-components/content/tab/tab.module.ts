/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { TabComponent } from './tab.component';
import { TabPanelModule } from './panel/tab-panel.module';

@NgModule({
  imports: [CommonModule, I18nModule, TabPanelModule],
  declarations: [TabComponent],
  exports: [TabComponent],
})
export class TabModule {}
