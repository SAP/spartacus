/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@commerce-storefront-toolset/core';
import { KeyboardFocusModule } from '@commerce-storefront-toolset/storefront';
import { ConfiguratorPreviousNextButtonsComponent } from './configurator-previous-next-buttons.component';

@NgModule({
  imports: [CommonModule, I18nModule, KeyboardFocusModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorPrevNext: {
          component: ConfiguratorPreviousNextButtonsComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorPreviousNextButtonsComponent],
  exports: [ConfiguratorPreviousNextButtonsComponent],
})
export class ConfiguratorPreviousNextButtonsModule {}
