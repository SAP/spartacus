/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { TrapFocusService } from '../trap/trap-focus.service';

@Injectable({
  providedIn: 'root',
})
export class LockFocusService extends TrapFocusService {}
