/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeCheckBoxComponent } from './configurator-attribute-checkbox.component';

import { ConfiguratorAttributeCompositionConfig } from '../../composition';


@NgModule({
    imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    ConfiguratorAttributeCheckBoxComponent,
],
    providers: [
        provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
            productConfigurator: {
                assignment: {
                    AttributeType_checkBox: ConfiguratorAttributeCheckBoxComponent,
                },
            },
        }),
    ],
    exports: [ConfiguratorAttributeCheckBoxComponent],
})
export class ConfiguratorAttributeCheckboxModule {}
