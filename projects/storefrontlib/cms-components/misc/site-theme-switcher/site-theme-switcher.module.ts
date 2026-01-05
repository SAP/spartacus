/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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

import { SiteThemeSwitcherComponent } from './site-theme-switcher.component';
import { IconModule } from '../icon/index';
import { SiteThemeSwitcherComponentService } from './site-theme-switcher.component.service';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, SiteThemeModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SiteThemeSwitcherComponent: {
          component: SiteThemeSwitcherComponent,
        },
      },
    }),
    SiteThemeSwitcherComponentService,
  ],
  declarations: [SiteThemeSwitcherComponent],
  exports: [SiteThemeSwitcherComponent],
})
export class SiteThemeSwitcherModule {}
