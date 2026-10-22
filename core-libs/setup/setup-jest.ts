/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  platformServerTesting,
  ServerTestingModule,
} from '@angular/platform-server/testing';
import { TextDecoder } from 'node:util';

Object.assign(globalThis, { TextDecoder });

getTestBed().initTestEnvironment(
  ServerTestingModule,
  platformServerTesting(),
  {}
);
