/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableInfoComponent } from './disable-info.component';
import { IconModule } from '@commerce-storefront-toolset/storefront';
import { I18nModule } from '@commerce-storefront-toolset/core';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  declarations: [DisableInfoComponent],
  exports: [DisableInfoComponent],
})
export class DisableInfoModule {}
