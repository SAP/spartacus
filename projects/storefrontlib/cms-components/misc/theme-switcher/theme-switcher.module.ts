/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  SiteThemeModule,
} from '@spartacus/core';

import { ThemeSwitcherComponent } from './theme-switcher.component';
import { IconModule } from '../icon/index';
import { ThemeSwitcherComponentService } from './theme-switcher.component.service';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, SiteThemeModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ThemeSwitcherComponent: {
          component: ThemeSwitcherComponent,
        },
      },
    }),
    ThemeSwitcherComponentService,
  ],
  declarations: [ThemeSwitcherComponent],
  exports: [ThemeSwitcherComponent],
})
export class ThemeSwitcherModule {}
