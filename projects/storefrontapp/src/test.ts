/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { NgModule, provideZoneChangeDetection } from '@angular/core';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {
  // Intentional empty function
};

// Angular 21 introduced a change that causes NG0100 errors in Karma tests.
// See: https://github.com/angular/angular-cli/issues/32047
// Angular fixed this for built-in test.ts: https://github.com/angular/angular-cli/pull/32049
// Since we use a custom test.ts, we must manually provide zone change detection.
@NgModule({
  providers: [provideZoneChangeDetection()],
})
class ZoneChangeDetectionModule {}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserTestingModule, ZoneChangeDetectionModule],
  platformBrowserTesting(),
  {
    teardown: { destroyAfterEach: false },
  }
);
// Finally, start Karma to run the tests.
__karma__.start();
