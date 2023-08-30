/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { B2BUser } from '@spartacus/core';
import { LoadStatus } from './organization-item-status';

export interface UserCreationNotifierData {
  status: LoadStatus;
  item: B2BUser | undefined;
}
