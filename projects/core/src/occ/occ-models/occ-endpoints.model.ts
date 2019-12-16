export interface OccEndpoints {
  /**
   * Client login (get authorization token)
   *
   * @member {string}
   */
  login?: string;

  /**
   * Client logout (revoke authorization token)
   *
   * @member {string}
   */
  revoke?: string;
  /**
   * Get product details
   *
   * @member string
   */
  product?: string;

  /**
   * Get product details for scope
   *
   * @member Object
   */
  product_scopes?: {
    list?: string;
    details?: string;
    [scope: string]: string;
  };

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
   * Deletes a cart with a given cart id
   *
   * @member {string} [deleteCart]
   */
  deleteCart?: string;
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
   * Assign email to cart
   *
   * @member {string} [addEmail]
   */
  addEmail?: string;
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
  /**
   * Endpoint for anonymous consent templates
   *
   * @member {string}
   */
  anonymousConsentTemplates?: string;
  /**
   * Endpoint for consent templates
   *
   * @member {string}
   */
  consentTemplates?: string;
  /**
   * Endpoint for a user's consents
   *
   * @member {string}
   */
  consents?: string;
  /**
   * Endpoint for a user's specific previously given consent.
   *
   * @member {string}
   */
  consentDetail?: string;
  /**
   * Endpoint for a user's addresses
   *
   * @member {string}
   */
  addresses?: string;
  /**
   * Endpoint for a user's specific address
   *
   * @member {string}
   */
  addressDetail?: string;
  /**
   * Endpoint for address verification
   *
   * @member {string}
   */
  addressVerification?: string;
  /**
   * Endpoint for consignment tracking
   *
   * @member {string}
   */
  consignmentTracking?: string;
  /**
   * Endpoint for asm customer search
   *
   * @member {string}
   */
  asmCustomerSearch?: string;
  /**
   * Endpoint for cart voucher
   *
   * @member {string}
   */
  cartVoucher?: string;
  /**
   * Explicitly saves a cart
   *
   * @member {string}
   */
  saveCart?: string;
  /**
   * Endpoint for notification preference
   *
   * @member {string}
   */
  notificationPreference?: string;
  /**
   * Endpoint for product interests
   *
   * @member {string}
   */
  productInterests?: string;
  /**
   * Endpoint for getting product interests
   *
   * @member {string}
   */
  getProductInterests?: string;
}
