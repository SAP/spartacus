/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  RoutingModule as CoreRoutingModule,
  FederatedLoginGuard,
  ProtectedRoutesGuard,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { BEFORE_CMS_PAGE_GUARD } from '../guards/before-cms-page-guard.token';
import { CmsRouteModule } from './cms-route/cms-route.module';
import { defaultRoutesConfigFactory } from './default-routing-config';

@NgModule({
  imports: [CoreRoutingModule.forRoot(), CmsRouteModule],
})
export class RoutingModule {
  static forRoot(): ModuleWithProviders<RoutingModule> {
    return {
      ngModule: RoutingModule,
      providers: [
        provideDefaultConfigFactory(defaultRoutesConfigFactory),
        {
          provide: BEFORE_CMS_PAGE_GUARD,
          useExisting: ProtectedRoutesGuard,
          multi: true,
        },
        {
          provide: BEFORE_CMS_PAGE_GUARD,
          useExisting: FederatedLoginGuard,
          multi: true,
        },
      ],
    };
  }
}
