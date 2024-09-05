/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';


import { ConfiguratorOverviewFormComponent } from './configurator-overview-form.component';

@NgModule({
    imports: [
    CommonModule,
    I18nModule,
    ConfiguratorOverviewFormComponent,
],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                ConfiguratorOverviewForm: {
                    component: ConfiguratorOverviewFormComponent,
                },
            },
        }),
    ],
    exports: [ConfiguratorOverviewFormComponent],
})
export class ConfiguratorOverviewFormModule {}
