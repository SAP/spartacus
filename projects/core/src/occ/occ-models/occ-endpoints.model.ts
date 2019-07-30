export interface OccEndpoints {
  /**
   * Get product details
   *
   * @member {string} [product]
   */
  product?: string;
  /**
   * Get reviews for a product
   *
   * @member {string} [productReviews]
   */
  productReviews?: string;
  /**
   * Get a list of product references
   *
   * @member {string} [productReferences]
   */
  productReferences?: string;
  /**
   * Get a list of products and additional data
   *
   * @member {string} [productSearch]
   */
  productSearch?: string;
  /**
   * Get a list of available suggestions
   *
   * @member {string} [productSuggestings]
   */
  productSuggestions?: string;
  /**
   * Get CMS component details
   *
   * @member {string} [component]
   */
  component?: string;
  /**
   * Get a list of CMS component details
   *
   * @member {string} [components]
   */
  components?: string;
  /**
   * Get page data with list of cms content slots
   *
   * @member {string} [pages]
   */
  pages?: string;
  /**
   * Get page data with list of cms content slots
   *
   * @member {string} [page]
   */
  page?: string;
  /**
   * Get a store location
   *
   * @member {string} [page]
   */
  store?: string;
  /**
   * Get a list of store locations
   *
   * @member {string} [page]
   */
  stores?: string;
  /**
   * Gets a store location count per country and regions
   *
   * @member {string} [page]
   */
  storescounts?: string;
}
