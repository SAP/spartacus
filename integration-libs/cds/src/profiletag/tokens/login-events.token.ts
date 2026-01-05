/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { AuthActions } from '@spartacus/core';
import { Observable } from 'rxjs';

export interface LoginEventEnvelope {
  action: AuthActions.Login;
  timestamp: number;
}

/**
 * Injection token for login events observable.
 * Provides access to login events that are captured from app initialization.
 */
export const LOGIN_EVENTS = new InjectionToken<Observable<LoginEventEnvelope>>(
  'LOGIN_EVENTS'
);
