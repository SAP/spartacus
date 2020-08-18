export interface SearchBoxConfig {
  displaySuggestions: boolean;
  displayProducts: boolean;
  displayProductImages?: boolean;
  maxProducts?: number;
  maxSuggestions?: number;
  minCharactersBeforeRequest?: number;
  exactMatchEnabled?: boolean;
}

export interface SearchResults {
  message?: string;
  products?: any[];
  suggestions?: string[];
}
