/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageEvent } from '../page/page.events';

/**
 * Indicates that a user visited a home page.
 */
export class HomePageEvent extends PageEvent {
  /** event's type */
  static readonly type = 'HomePageEvent';
}
