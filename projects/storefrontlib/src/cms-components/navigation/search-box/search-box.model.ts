export interface SearchBoxConfig {
  maxProducts: number;
  displaySuggestions: boolean;
  maxSuggestions: number;
  minCharactersBeforeRequest: number;
  displayProducts: boolean;
}

export interface SearchResults {
  message?: string;
  products?: any[];
  suggestions?: string[];
}
