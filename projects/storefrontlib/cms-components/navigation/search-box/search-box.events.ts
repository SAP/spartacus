/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent, Suggestion } from '@spartacus/core';

/**
 * Indicates that the user chose a suggestion
 */
export class SearchBoxSuggestionSelectedEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'SearchBoxSuggestionSelectedEvent';
  freeText: string;
  selectedSuggestion: string;
  searchSuggestions: (Suggestion | string)[];
}

/**
 * Indicates that the user chose a product suggestion
 */
export class SearchBoxProductSelectedEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'SearchBoxProductSelectedEvent';
  freeText: string;
  productCode: string;
}
