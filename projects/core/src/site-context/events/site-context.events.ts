/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '../../event/cx-event';

/**
 * Indicates that the language has changed.
 */
export class LanguageSetEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'LanguageSetEvent';
  activeLanguage: string;
}

/**
 * Indicates that the Currency has changed.
 */
export class CurrencySetEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CurrencySetEvent';
  activeCurrency: string;
}
