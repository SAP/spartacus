import {
  Breadcrumb,
  Facet,
  PaginationModel,
  SearchState,
  SortModel,
  SpellingSuggestion,
} from '../../occ/occ-models/occ.models';
import { UIProduct } from './product';

/**
 *
 * An interface representing ProductSearchPage.
 */
export interface UIProductSearchPage {
  /**
   * @member {Breadcrumb[]} [breadcrumbs]
   */
  breadcrumbs?: Breadcrumb[];
  /**
   * @member {string} [categoryCode]
   */
  categoryCode?: string;
  /**
   * @member {SearchState} [currentQuery]
   */
  currentQuery?: SearchState;
  /**
   * @member {Facet[]} [facets]
   */
  facets?: Facet[];
  /**
   * @member {string} [freeTextSearch]
   */
  freeTextSearch?: string;
  /**
   * @member {string} [keywordRedirectUrl]
   */
  keywordRedirectUrl?: string;
  /**
   * @member {PaginationModel} [pagination]
   */
  pagination?: PaginationModel;
  /**
   * @member {Product[]} [products]
   */
  products?: UIProduct[];
  /**
   * @member {SortModel[]} [sorts]
   */
  sorts?: SortModel[];
  /**
   * @member {SpellingSuggestion} [spellingSuggestion]
   */
  spellingSuggestion?: SpellingSuggestion;
}
