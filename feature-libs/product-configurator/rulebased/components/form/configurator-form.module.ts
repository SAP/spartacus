/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorFormComponent } from './configurator-form.component';
import { ConfiguratorGroupModule } from '../group/configurator-group.module';

@NgModule({
  imports: [CommonModule, I18nModule, NgSelectModule, ConfiguratorGroupModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorForm: {
          component: ConfiguratorFormComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorFormComponent],
  exports: [ConfiguratorFormComponent],
})
export class ConfiguratorFormModule {}
