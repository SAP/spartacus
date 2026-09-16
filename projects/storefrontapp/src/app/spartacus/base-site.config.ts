/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { environment } from '../../environments/environment';

const baseSites = [
  'electronics-spa',
  'electronics-spa-standalone',
  'electronics',
  'electronics-standalone',
  'apparel-de',
  'apparel-uk',
  'apparel-uk-spa',
  'apparel-uk-standalone',
];

/**
 * Configured base sites, in priority order. Consumed by Angular via
 * `provideConfig({ context: { baseSite } })` and by the pure-Node SSR resolver
 * in `server.ts`, so both read the same source of truth.
 */
export const baseSite = environment.epdVisualization
  ? ['electronics-epdvisualization-spa'].concat(baseSites)
  : baseSites;

/** Default baseSite used when a request URL carries no site information. */
export const defaultBaseSiteId = baseSite[0];
