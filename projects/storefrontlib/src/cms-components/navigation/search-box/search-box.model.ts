export interface SearchBoxConfig {
  maxProducts: number;
  displaySuggestions: boolean;
  maxSuggestions: number;
  minCharactersBeforeRequest: number;
  displayProducts: boolean;
}

export interface SearchResults {
  messages: string[];
  products: any[];
  suggestions: string[];
}
