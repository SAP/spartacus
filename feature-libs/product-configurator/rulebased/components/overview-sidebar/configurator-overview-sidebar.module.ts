/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';


import { ConfiguratorOverviewSidebarComponent } from './configurator-overview-sidebar.component';

@NgModule({
    imports: [
    CommonModule,
    I18nModule,
    ConfiguratorOverviewSidebarComponent,
],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                ConfiguratorOverviewSidebar: {
                    component: ConfiguratorOverviewSidebarComponent,
                },
            },
        }),
    ],
    exports: [ConfiguratorOverviewSidebarComponent],
})
export class ConfiguratorOverviewSidebarModule {}
