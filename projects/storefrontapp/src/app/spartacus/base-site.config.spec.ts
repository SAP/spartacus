/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getBaseSites } from './base-site.config';

describe('getBaseSites', () => {
  it('returns the existing B2C base-site order', () => {
    expect(getBaseSites(false, false)).toEqual([
      'electronics-spa',
      'electronics-spa-standalone',
      'electronics',
      'electronics-standalone',
      'apparel-de',
      'apparel-uk',
      'apparel-uk-spa',
      'apparel-uk-standalone',
    ]);
  });

  it('prepends the EPD site to the B2C base-site order', () => {
    expect(getBaseSites(false, true)).toEqual([
      'electronics-epdvisualization-spa',
      'electronics-spa',
      'electronics-spa-standalone',
      'electronics',
      'electronics-standalone',
      'apparel-de',
      'apparel-uk',
      'apparel-uk-spa',
      'apparel-uk-standalone',
    ]);
  });

  it('returns the existing B2B base-site order', () => {
    expect(getBaseSites(true, false)).toEqual([
      'powertools-spa',
      'powertools-standalone',
    ]);
  });

  it('prepends the EPD site to the B2B base-site order', () => {
    expect(getBaseSites(true, true)).toEqual([
      'powertools-epdvisualization-spa',
      'powertools-spa',
      'powertools-standalone',
    ]);
  });
});
