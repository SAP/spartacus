/**
 * Contains specific route parameters for the product listing page.
 */
export interface ProductListRouteParams {
  /**
   * The query parameter which used to query the backend API.
   */
  query?: string;

  /**
   * The category code which is used to query the backend API.
   */
  categoryCode?: string;

  /**
   * The brand code is actually a category code,  which is used to
   * query the backend API.
   */
  brandCode?: string;
}

/**
 * Contains search related data for querying the backend API.
 */
export interface SearchCriteria {
  /**
   * Contains the search text that is used to query the backend API.
   */
  query?: string;

  /**
   * The current page of the search result.
   */
  currentPage?: number;

  /**
   * The number of items in the search results.
   */
  pageSize?: number;

  /**
   * The sort code that is used to sort the items in the search result.
   */
  // TODO: Should we change it it `sort`?
  sortCode?: string;
}
