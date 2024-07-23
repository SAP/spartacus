/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  RoutingModule as CoreRoutingModule,
  ProtectedRoutesGuard,
  provideDefaultConfig,
} from '@spartacus/core';
import { BEFORE_CMS_PAGE_GUARD } from '../guards/before-cms-page-guard.token';
import { CmsRouteModule } from './cms-route/cms-route.module';
import { defaultRoutingConfig } from './default-routing-config';

@NgModule({
  imports: [CoreRoutingModule.forRoot(), CmsRouteModule],
})
export class RoutingModule {
  static forRoot(): ModuleWithProviders<RoutingModule> {
    return {
      ngModule: RoutingModule,
      providers: [
        provideDefaultConfig(defaultRoutingConfig),
        {
          provide: BEFORE_CMS_PAGE_GUARD,
          useExisting: ProtectedRoutesGuard,
          multi: true,
        },
      ],
    };
  }
}
