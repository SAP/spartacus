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
