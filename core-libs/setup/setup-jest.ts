/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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

getTestBed().initTestEnvironment(
  ServerTestingModule,
  platformServerTesting(),
  {}
);
