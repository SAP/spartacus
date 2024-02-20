/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';

export class QuoteDetailsReloadQueryEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'QuoteDetailsReloadQueryEvent';
}
