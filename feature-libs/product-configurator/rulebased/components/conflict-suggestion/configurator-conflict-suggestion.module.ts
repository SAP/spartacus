/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorConflictSuggestionComponent } from './configurator-conflict-suggestion.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [ConfiguratorConflictSuggestionComponent],
  exports: [ConfiguratorConflictSuggestionComponent],
})
export class ConfiguratorConflictSuggestionModule {}
