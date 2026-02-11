/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorGroupModule } from '../group/configurator-group.module';
import { ConfiguratorFormComponent } from './configurator-form.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    NgSelectModule,
    ConfiguratorGroupModule,
    ConfiguratorFormComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorForm: {
          component: ConfiguratorFormComponent,
        },
      },
    }),
  ],
  exports: [ConfiguratorFormComponent],
})
export class ConfiguratorFormModule {}
