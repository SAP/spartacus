/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@angular/compiler';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import 'zone.js';
import 'zone.js/testing';

const testBed = getTestBed();

beforeEach(() => {
  testBed.resetTestingModule();
});

if (!testBed.platform) {
  testBed.initTestEnvironment(
    BrowserTestingModule,
    platformBrowserTesting()
  );
}
