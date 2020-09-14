export const DEFAULT_SCOPE = 'default';

export interface OccEndpoint {
  default?: string;
  [scope: string]: string;
}

export interface ProductOccEndpoint extends OccEndpoint {
  list?: string;
  details?: string;
  attributes?: string;
  variants?: string;
}

export interface OccEndpoints {
  /**
   * Client login (get authorization token)
   *
   * @member {string}
   */
  login?: string | OccEndpoint;

  /**
   * Client logout (revoke authorization token)
   *
   * @member {string}
   */
  revoke?: string | OccEndpoint;

  /**
   * Get product details for scope
   *
   * @member Object
   */
  product?: string | ProductOccEndpoint;
  /**
   * Get reviews for a product
   *
   * @member {string}
   */
  productReviews?: string | OccEndpoint;
  /**
   * Get a list of product references
   *
   * @member {string}
   */
  productReferences?: string | OccEndpoint;
  /**
   * Get a list of products and additional data
   *
   * @member {string}
   */
  productSearch?: string | OccEndpoint;
  /**
   * Get a list of available suggestions
   *
   * @member {string}
   */
  productSuggestions?: string | OccEndpoint;
  /**
   * Get CMS component details
   *
   * @member {string}
   */
  component?: string | OccEndpoint;
  /**
   * Get a list of CMS component details
   *
   * @member {string}
   */
  components?: string | OccEndpoint;
  /**
   * Get page data with list of cms content slots
   *
   * @member {string}
   */
  pages?: string | OccEndpoint;
  /**
   * Get page data with list of cms content slots
   *
   * @member {string}
   */
  page?: string | OccEndpoint;
  /**
   * Get all carts
   *
   * @member {string} [carts]
   */
  carts?: string | OccEndpoint;
  /**
   * Get a cart with a given identifier
   *
   * @member {string} [cart]
   */
  cart?: string | OccEndpoint;
  /**
   * Creates or restore a cart for a user
   *
   * @member {string} [createCart]
   */
  createCart?: string | OccEndpoint;
  /**
   * Deletes a cart with a given cart id
   *
   * @member {string} [deleteCart]
   */
  deleteCart?: string | OccEndpoint;
  /**
   * Adds a product to the cart
   *
   * @member {string} [addEntries]
   */
  addEntries?: string | OccEndpoint;
  /**
   * Update quantity and store the details of a cart entry
   *
   * @member {string} [updateEntries]
   */
  updateEntries?: string | OccEndpoint;
  /**
   * Deletes cart entry
   *
   * @member {string} [removeEntries]
   */
  removeEntries?: string | OccEndpoint;
  /**
   * Assign email to cart
   *
   * @member {string} [addEmail]
   */
  addEmail?: string | OccEndpoint;
  /**
   * Get a store location
   *
   * @member {string} [page]
   */
  store?: string | OccEndpoint;
  /**
   * Get a list of store locations
   *
   * @member {string} [page]
   */
  stores?: string | OccEndpoint;
  /**
   * Gets a store location count per country and regions
   *
   * @member {string} [page]
   */
  storescounts?: string | OccEndpoint;
  /**
   * Get a list of available languages
   *
   * @member {string}
   */
  languages?: string | OccEndpoint;
  /**
   * Get a list of available currencies
   *
   * @member {string}
   */
  currencies?: string | OccEndpoint;
  /**
   * Get a list of countries
   *
   * @member {string}
   */
  countries?: string | OccEndpoint;
  /**
   * Fetch the list of regions for the provided country
   *
   * @member {string}
   */
  regions?: string | OccEndpoint;
  /**
   * Titles used for user's personal info.
   *
   * @member {string}
   */
  titles?: string | OccEndpoint;
  /**
   * Get user details
   *
   * @member {string}
   */
  user?: string | OccEndpoint;
  /**
   * Register a new user.
   *
   * @member {string}
   */
  userRegister?: string | OccEndpoint;
  /**
   * Request an email to reset the password
   *
   * @member {string}
   */
  userForgotPassword?: string | OccEndpoint;
  /**
   * Reset the password once the email is recieved.
   *
   * @member {string}
   */
  userResetPassword?: string | OccEndpoint;
  /**
   * Update the user id with which the user authenticates.
   *
   * @member {string}
   */
  userUpdateLoginId?: string | OccEndpoint;
  /**
   * Update the user's password
   *
   * @member {string}
   */
  userUpdatePassword?: string | OccEndpoint;
  /**
   * Payment details root endpoint.
   *
   * @member {string}
   */
  paymentDetailsAll?: string | OccEndpoint;
  /**
   * Endpoint for a specific payment method.
   *
   * @member {string}
   */
  paymentDetail?: string | OccEndpoint;
  /**
   * Endpoint for the list of one user's orders
   *
   * @member {string}
   */
  orderHistory?: string | OccEndpoint;
  /**
   * Endpoint for the details of one user's order
   *
   * @member {string}
   */
  orderDetail?: string | OccEndpoint;
  /**
   * Endpoint for anonymous consent templates
   *
   * @member {string}
   */
  anonymousConsentTemplates?: string | OccEndpoint;
  /**
   * Endpoint for consent templates
   *
   * @member {string}
   */
  consentTemplates?: string | OccEndpoint;
  /**
   * Endpoint for a user's consents
   *
   * @member {string}
   */
  consents?: string | OccEndpoint;
  /**
   * Endpoint for a user's specific previously given consent.
   *
   * @member {string}
   */
  consentDetail?: string | OccEndpoint;
  /**
   * Endpoint for a user's addresses
   *
   * @member {string}
   */
  addresses?: string | OccEndpoint;
  /**
   * Endpoint for a user's specific address
   *
   * @member {string}
   */
  addressDetail?: string | OccEndpoint;
  /**
   * Endpoint for address verification
   *
   * @member {string}
   */
  addressVerification?: string | OccEndpoint;
  /**
   * Endpoint for consignment tracking
   *
   * @member {string}
   */
  consignmentTracking?: string | OccEndpoint;
  /**
   * Endpoint for asm customer search
   *
   * @member {string}
   */
  asmCustomerSearch?: string | OccEndpoint;
  /**
   * Endpoint for cart voucher
   *
   * @member {string}
   */
  cartVoucher?: string | OccEndpoint;
  /**
   * Endpoint for coupons
   *
   * @member {string}
   */
  customerCoupons?: string | OccEndpoint;
  /**
   * Endpoint for claiming coupon
   *
   * @member {string}
   */
  claimCoupon?: string | OccEndpoint;
  /**
   * Endpoint for coupons
   *
   * @member {string}
   */
  couponNotification?: string | OccEndpoint;
  /**
   * Explicitly saves a cart
   *
   * @member {string}
   */
  saveCart?: string | OccEndpoint;
  /**
   * Endpoint for notification preference
   *
   * @member {string}
   */
  notificationPreference?: string | OccEndpoint;
  /**
   * Endpoint for product interests
   *
   * @member {string}
   */
  productInterests?: string | OccEndpoint;
  /**
   * Endpoint for getting product interests
   *
   * @member {string}
   */
  getProductInterests?: string | OccEndpoint;
  /**
   * Endpoint for cancel an order
   */
  cancelOrder?: string | OccEndpoint;
  /**
   * Endpoint for creating order return request
   */
  returnOrder?: string | OccEndpoint;
  /**
   * Endpoint for user's order return requests
   */
  orderReturns?: string | OccEndpoint;
  /**
   * Endpoint for order return request details
   */
  orderReturnDetail?: string | OccEndpoint;
  /**
   * Endpoint for cancelling return request
   */
  cancelReturn?: string | OccEndpoint;
  /**
   * Endpoint for set delivery address to cart
   */
  setDeliveryAddress?: string | OccEndpoint;
  /**
   * Endpoint for place order
   */
  placeOrder?: string | OccEndpoint;
  /**
   * Endpoint for userGroupOrderApprovalPermission
   *
   * @member {string}
   */
  costCenters?: string | OccEndpoint;
  /**
   * Endpoint to schedule a replenishment order
   *
   * * @member {string}
   */
  scheduleReplenishmentOrder?: string | OccEndpoint;
  /**
   * Endpoint to get a replenishment order details
   *
   * * @member {string}
   */
  replenishmentOrderDetails?: string | OccEndpoint;
  /**
   * Endpoint to get a replenishment order history for a replenishment
   *
   * * @member {string}
   */
  replenishmentOrderDetailsHistory?: string | OccEndpoint;
  /**
   * Endpoint to get a replenishment order history for a replenishment
   *
   * * @member {string}
   */
  cancelReplenishmentOrder?: string | OccEndpoint;
}
