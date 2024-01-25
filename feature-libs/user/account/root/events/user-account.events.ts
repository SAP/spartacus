/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';
import { User } from '../model/user.model';

export abstract class UserAccountEvent extends CxEvent {
  user: User;
}

export class UserAccountChangedEvent extends UserAccountEvent {
  static readonly type = 'UserAccountChangedEvent';
}
