export interface OccEndpoints {
  /**
   * Get product details
   *
   * @member {string}
   */
  product?: string;
  /**
   * Get reviews for a product
   *
   * @member {string}
   */
  productReviews?: string;
  /**
   * Get a list of product references
   *
   * @member {string}
   */
  productReferences?: string;
  /**
   * Get a list of products and additional data
   *
   * @member {string}
   */
  productSearch?: string;
  /**
   * Get a list of available suggestions
   *
   * @member {string}
   */
  productSuggestions?: string;
  /**
   * Get CMS component details
   *
   * @member {string}
   */
  component?: string;
  /**
   * Get a list of CMS component details
   *
   * @member {string}
   */
  components?: string;
  /**
   * Get page data with list of cms content slots
   *
   * @member {string}
   */
  pages?: string;
  /**
   * Get page data with list of cms content slots
   *
   * @member {string}
   */
  page?: string;
  /**
   * Get a list of available languages
   *
   * @member {string}
   */
  languages?: string;
  /**
   * Get a list of available currencies
   *
   * @member {string}
   */
  currencies?: string;
  /**
   * Get a list of countries
   *
   * @member {string}
   */
  countries?: string;
  /**
   * Fetch the list of regions for the provided country
   *
   * @member {string}
   */
  regions?: string;
  /**
   * Titles used for user's personal info.
   *
   * @member {string}
   */
  titles?: string;
  /**
   * Get user details
   *
   * @member {string}
   */
  user?: string;
  /**
   * Register a new user.
   *
   * @member {string}
   */
  userRegister?: string;
  /**
   * Request an email to reset the password
   *
   * @member {string}
   */
  userForgotPassword?: string;
  /**
   * Reset the password once the email is recieved.
   *
   * @member {string}
   */
  userResetPassword?: string;
  /**
   * Update the user id with which the user authenticates.
   *
   * @member {string}
   */
  userUpdateLoginId?: string;
  /**
   * Update the user's password
   *
   * @member {string}
   */
  userUpdatePassword?: string;
  /**
   * Payment details root endpoint.
   *
   * @member {string}
   */
  paymentDetailsAll?: string;
  /**
   * Endpoint for a specific payment method.
   *
   * @member {string}
   */
  paymentDetail?: string;
  /**
   * Endpoint for the list of one user's orders
   *
   * @member {string}
   */
  orderHistory?: string;
  /**
   * Endpoint for the details of one user's order
   *
   * @member {string}
   */
  orderDetail?: string;
}
