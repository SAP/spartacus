/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';

export class GetSubscriptionByCodeReloadEvent extends CxEvent {
  static readonly type = 'GetSubscriptionByCodeReloadEvent';
}

export class GetSubscriptionListReloadEvent extends CxEvent {
  static readonly type = 'GetSubscriptionListReloadEvent';
}
