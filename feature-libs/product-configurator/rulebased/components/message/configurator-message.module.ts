/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorMessageComponent } from './configurator-message.component';

@NgModule({
  imports: [CommonModule, IconModule, ConfiguratorMessageComponent],
  exports: [ConfiguratorMessageComponent],
})
export class ConfiguratorMessageModule {}
