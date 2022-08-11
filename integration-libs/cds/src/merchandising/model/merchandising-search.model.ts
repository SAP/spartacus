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
