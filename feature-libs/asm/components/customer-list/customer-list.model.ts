/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomerListColumnActionType } from '@spartacus/asm/root';
import { User } from '@spartacus/core';

export interface CustomerListAction {
  selectedUser: User;
  actionType: CustomerListColumnActionType;
}
