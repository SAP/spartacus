/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdsConfig, CdsModule } from '@spartacus/cds';
import {
  provideConfig,
  provideConfigFactory,
  WindowRef,
} from '@spartacus/core';

const cds1: CdsConfig = {
  cds: {
    site: 'electronics-spa',
    tenant: 'E_SPA_TENANT',
    baseUrl:'E_SPA_BASE_URL',
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    merchandising: {
      defaultCarouselViewportThreshold: 80,
    },
    profileTag: {
      javascriptUrl:
        'E_SPA_JS_URL',
      configUrl:
        'E_SPA_CONFIG_URL',
      allowInsecureCookies: true,
    },
  },
};

const cds2 = {
  cds: {
    site: 'apparel-uk',
    tenant: 'A_SPA_TENANT',
    baseUrl: 'A_SPA_BASE_URL',
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    merchandising: {
      defaultCarouselViewportThreshold: 80,
    },
    profileTag: {
      javascriptUrl:
        'A_SPA_JS_URL',
      configUrl:
        'A_SPA_CONFIG_URL',
      allowInsecureCookies: true,
    }
  }
};
const cdsArray = [cds1, cds2];

const cdsConfig = (windowRef: WindowRef): CdsConfig => {
  if (!windowRef.isBrowser()) {
    return;
  }
  const cds = cdsArray.filter((_cds: CdsConfig) =>
    windowRef.location.href.includes(_cds.cds.site)
  )[0];
  return cds ?? cdsArray[0];
};

@NgModule({
  imports: [CdsModule.forRoot()],
  providers: [
    provideConfigFactory(cdsConfig, [WindowRef]),
    provideConfig(<CdsConfig>{
      cds: cds1,
    }),
  ],
})
export class CdsFeatureModule {}
