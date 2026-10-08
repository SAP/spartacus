/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { environment } from '../../environments/environment';

const B2C_BASE_SITES = [
  'electronics-spa',
  'electronics-spa-standalone',
  'electronics',
  'electronics-standalone',
  'apparel-de',
  'apparel-uk',
  'apparel-uk-spa',
  'apparel-uk-standalone',
];

const B2B_BASE_SITES = ['powertools-spa', 'powertools-standalone'];

export function getBaseSites(
  b2b: boolean,
  epdVisualization: boolean
): string[] {
  const channelBaseSites = b2b ? B2B_BASE_SITES : B2C_BASE_SITES;
  const epdBaseSite = b2b
    ? 'powertools-epdvisualization-spa'
    : 'electronics-epdvisualization-spa';

  return epdVisualization
    ? [epdBaseSite, ...channelBaseSites]
    : [...channelBaseSites];
}

export const baseSite = getBaseSites(
  environment.b2b,
  environment.epdVisualization
);

export const defaultBaseSiteId = baseSite[0];
