import { Suggestion } from '../../model';

/**
 * Indicates that the user performed a product search
 */
export class ProductSearchTypeEvent {
  searchQuery: string;
}

/**
 * Indicates that search suggestions were returned
 */
export class ProductSearchSuggestionResultsEvent {
  searchQuery: string;
  searchSuggestions: Suggestion[];
}
