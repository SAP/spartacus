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
    tenant: 'argotest',
    baseUrl: 'https://api.stage.context.cloud.sap',
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    merchandising: {
      defaultCarouselViewportThreshold: 80,
    },
    profileTag: {
      javascriptUrl:
        'https://tag.static.stage.context.cloud.sap/js/profile-tag.js',
      configUrl:
        'https://tag.static.stage.context.cloud.sap/config/mytenant-main-default',
      allowInsecureCookies: true,
    },
  },
};

const cds2 = {
  cds: {
    ...cds1,
    site: 'apparel-uk',
  },
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
