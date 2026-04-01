/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { makeEnvironmentProviders } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { environment } from '../../environments/environment';

const defaultBaseSite = [
  'electronics-spa',
  'electronics-spa-standalone',
  'electronics',
  'electronics-standalone',
  'apparel-de',
  'apparel-uk',
  'apparel-uk-spa',
  'apparel-uk-standalone',
];
export const baseSite = environment.epdVisualization
  ? ['electronics-epdvisualization-spa'].concat(defaultBaseSite)
  : defaultBaseSite;

export const spartacusB2cConfigurationProviders = makeEnvironmentProviders([
  provideConfig({
    context: {
      urlParameters: ['baseSite', 'language', 'currency'],
      // baseSite: baseSite,
    },
  }),
  provideConfig({
    authentication: { client_id: 'mobile_android_login' },
  }),
  provideConfig({
    cart: {
      selectiveCart: {
        enabled: true,
      },
    },
  }),
]);
