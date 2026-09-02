/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import 'zone.js';
import 'zone.js/testing';
import '@angular/compiler';
import { TestBed, getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);

// Angular caches `providedIn: 'root'` instances on the token class via ɵprov.value.
// TestBed.resetTestingModule() does not clear this cache, so stale instances leak
// across spec files when tests run in shuffled order.
// We intercept resetTestingModule and clear ɵprov.value on all resolved tokens
// before the reset happens, while the injector records are still accessible.
const originalReset = TestBed.resetTestingModule.bind(TestBed);
(TestBed as any).resetTestingModule = function () {
  const tb = getTestBed() as any;
  const records: Map<any, any> | undefined =
    tb._testModuleRef?.injector?.records;
  if (records) {
    for (const token of records.keys()) {
      if (token?.ɵprov) {
        token.ɵprov.value = undefined;
      }
    }
  }
  return originalReset();
};
