/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithUser, UserState, USER_FEATURE } from '../user-state';

export const getUserState: MemoizedSelector<StateWithUser, UserState> =
  createFeatureSelector<UserState>(USER_FEATURE);
