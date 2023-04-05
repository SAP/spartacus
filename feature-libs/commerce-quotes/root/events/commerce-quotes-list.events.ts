/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';

export class CommerceQuotesListReloadQueryEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CommerceQuotesListReloadQueryEvent';
}

export class QuoteDetailsReloadQueryEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'QuoteDetailsReloadQueryEvent';
}
