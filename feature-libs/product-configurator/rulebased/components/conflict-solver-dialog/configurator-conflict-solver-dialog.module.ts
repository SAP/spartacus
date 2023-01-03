/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorConflictSolverDialogComponent } from './configurator-conflict-solver-dialog.component';
import { ConfiguratorConflictSolverDialogLauncherService } from './configurator-conflict-solver-dialog-launcher.service';
import { ConfiguratorDefaultFormModule } from '../default-form/configurator-default-form.module';
import { defaultConfiguratorConflictSolverLayoutConfig } from './default-configurator-conflict-solver-layout.config';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    I18nModule,
    ConfiguratorDefaultFormModule,
  ],
  providers: [
    provideDefaultConfig(defaultConfiguratorConflictSolverLayoutConfig),
  ],
  declarations: [ConfiguratorConflictSolverDialogComponent],
  exports: [ConfiguratorConflictSolverDialogComponent],
})
export class ConfiguratorConflictSolverDialogModule {
  constructor(
    _configuratorConflictSolverDialogEventListener: ConfiguratorConflictSolverDialogLauncherService
  ) {
    // Intentional empty constructor
  }
}
