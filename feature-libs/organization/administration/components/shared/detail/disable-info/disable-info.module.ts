/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { DisableInfoComponent } from './disable-info.component';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  declarations: [DisableInfoComponent],
  exports: [DisableInfoComponent],
})
export class DisableInfoModule {}
