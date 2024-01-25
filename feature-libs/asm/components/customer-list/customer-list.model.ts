/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomerListColumnActionType } from '@spartacus/asm/root';
import { User } from '@spartacus/core';

export interface CustomerListAction {
  selectedUser: User;
  actionType: CustomerListColumnActionType;
}
