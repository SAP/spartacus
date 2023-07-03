/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageEvent } from '@spartacus/storefront';

/**
 * Indicates that a user visited a cart page.
 */
export class CartPageEvent extends PageEvent {
  /** event's type */
  static readonly type = 'CartPageEvent';
}
