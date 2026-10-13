/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StaticBaseSite } from '@spartacus/setup/ssr/base-site';
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

/**
 * Node-side authoritative base-site map: each entry carries a `uid` and its
 * `urlPatterns` (Java-regex strings, same shape as the OCC basesites response).
 *
 * When this list is non-empty it is passed to `createStorefrontBaseSiteResolver`
 * in `server.ts` and becomes authoritative — OCC is never called. When empty,
 * `createStorefrontBaseSiteResolver` falls back to the OCC-backed path.
 *
 * TODO: populate this list with the real OCC `urlPatterns` for each demo base
 * site. The values must come from the SAP Commerce Cloud demo environment
 * (e.g. via the `/occ/v2/basesites?fields=FULL` endpoint) — do not invent
 * patterns, as an incorrect list silently breaks base-site detection for every
 * request.
 */
export const staticBaseSites: StaticBaseSite[] = [];
