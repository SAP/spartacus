/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  ClientAuthState,
  CLIENT_AUTH_FEATURE,
  StateWithClientAuth,
} from '../client-auth-state';

export const getClientAuthState: MemoizedSelector<
  StateWithClientAuth,
  ClientAuthState
> = createFeatureSelector<ClientAuthState>(CLIENT_AUTH_FEATURE);
