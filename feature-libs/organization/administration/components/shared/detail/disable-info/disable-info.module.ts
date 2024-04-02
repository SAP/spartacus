/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableInfoComponent } from './disable-info.component';
import { IconModule } from '@spartacus/storefront';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  declarations: [DisableInfoComponent],
  exports: [DisableInfoComponent],
})
export class DisableInfoModule {}
