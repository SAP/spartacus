import { Product, Suggestion } from '@spartacus/core';

export interface SearchBoxConfig {
  displaySuggestions?: boolean;
  displayProducts?: boolean;
  displayProductImages?: boolean;
  maxProducts?: number;
  maxSuggestions?: number;
  minCharactersBeforeRequest?: number;
}

export interface SearchResults {
  message?: string;
  products?: any[];
  suggestions?: string[];
}

export interface SearchBoxEventData {
  freeText: string;
  isProduct: boolean;
  selected: string;
  values?: Suggestion[] | Product[];
}
