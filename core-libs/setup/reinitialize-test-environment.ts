/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

export function reinitializeTestEnvironment({
  platformProviders,
}: {
  platformProviders?: StaticProvider[];
} = {}): void {
  // If we didn't destroy the old platform,
  // the call `platformBrowserDynamicTesting(<new platform providers>)`
  // would return just the old platform, without the new providers.
  platformBrowserDynamicTesting().destroy();

  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting([...(platformProviders ?? [])])
  );
}
