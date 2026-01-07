/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { DisableInfoComponent } from './disable-info.component';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule, DisableInfoComponent],
  exports: [DisableInfoComponent],
})
export class DisableInfoModule {}
