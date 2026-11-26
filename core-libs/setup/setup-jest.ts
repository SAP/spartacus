/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import './setup-zone';
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
