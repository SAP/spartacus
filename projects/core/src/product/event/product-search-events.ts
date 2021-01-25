import { Suggestion } from '../../model';

/**
 * Indicates that search suggestions were returned
 */
export class ProductSearchSuggestionResultsEvent {
  searchQuery: string;
  searchSuggestions: Suggestion[];
}
