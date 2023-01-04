/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { LockFocusService } from '../lock/lock-focus.service';

@Injectable({
  providedIn: 'root',
})
export class KeyboardFocusService extends LockFocusService {}
