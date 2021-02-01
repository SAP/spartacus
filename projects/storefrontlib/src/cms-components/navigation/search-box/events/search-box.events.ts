import { Suggestion } from '@spartacus/core';

/**
 * Indicates that the user chose a suggestion
 */
export class SearchBoxSuggestionSelectedEvent {
  freeText: string;
  selectedSuggestion: string;
  searchSuggestions: Suggestion[];
}

/**
 * Indicates that the user chose a product suggestion
 */
export class SearchBoxProductSelectedEvent {
  freeText: string;
  productCode: string;
}
