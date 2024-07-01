/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';

import { ThemeSwitcherComponent } from './theme-switcher.component';
import { defaultThemeSwitcherConfig } from './config';
import { IconModule } from '../icon/index';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ThemeSwitcherComponent: {
          component: ThemeSwitcherComponent,
        },
      },
    }),
    provideDefaultConfig(defaultThemeSwitcherConfig),
  ],
  declarations: [ThemeSwitcherComponent],
  exports: [ThemeSwitcherComponent],
})
export class ThemeSwitcherModule {}
