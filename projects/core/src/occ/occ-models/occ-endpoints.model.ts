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
   * Get a product reference
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
   * Get component data
   *
   * @member {string} [component]
   */
  component?: string;
  /**
   * Find component data by id(s)
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
}
