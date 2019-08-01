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
   * Get all carts
   *
   * @member {string} [carts]
   */
  carts?: string;
  /**
   * Get a cart with a given identifier
   *
   * @member {string} [cart]
   */
  cart?: string;
  /**
   * Creates or restore a cart for a user
   *
   * @member {string} [createCart]
   */
  createCart?: string;
  /**
   * Adds a product to the cart
   *
   * @member {string} [addEntries]
   */
  addEntries?: string;
  /**
   * Update quantity and store the details of a cart entry
   *
   * @member {string} [updateEntries]
   */
  updateEntries?: string;
  /**
   * Deletes cart entry
   *
   * @member {string} [removeEntries]
   */
  removeEntries?: string;
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
  /**
   * Get a list of available languages
   *
   * @member {string} [languages]
   */
  languages?: string;
  /**
   * Get a list of available currencies
   *
   * @member {string} [currencies]
   */
  currencies?: string;
  /**
   * Get a list of countries
   *
   * @member {string} [countries]
   */
  countries?: string;
  /**
   * Fetch the list of regions for the provided country
   *
   * @member {string} [regions]
   */
  regions?: string;
}
