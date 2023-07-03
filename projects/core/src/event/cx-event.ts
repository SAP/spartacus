/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Intended to be inherited by all other Spartacus' events.
 *
 * "One event to rule them all".
 */
export abstract class CxEvent {
  /**
   * Event's type
   */
  static readonly type: string = 'CxEvent';
}
