export const DEFAULT_SCOPE = 'default';

export interface OccEndpoint {
  default?: string;
  [scope: string]: string | undefined;
}

export interface ProductOccEndpoint extends OccEndpoint {
  list?: string;
  details?: string;
  attributes?: string;
  variants?: string;
}

export interface OccEndpoints {
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
   * @deprecated since 4.2 - use order lib instead
   *
   * @member {string}
   */
  orderHistory?: string | OccEndpoint;
  /**
   * Endpoint for the details of one user's order
   * @deprecated since 4.2 - use order lib instead
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
   * Endpoint for create configuration
   *
   * @member {string}
   */
  createVariantConfiguration?: string;
  /**
   * Endpoint for create configuration for the textfield configurator
   *
   * @member {string}
   */
  createTextfieldConfiguration?: string;
  /**
   * Endpoint for add textfield configuration to cart
   *
   * @member {string}
   */
  addTextfieldConfigurationToCart?: string;
  /**
   * Endpoint for reading textfield configuration attached to the cart entry
   */
  readTextfieldConfigurationForCartEntry?: string;
  /**
   * Endpoint for updating textfield configuration attached to the cart entry
   */
  updateTextfieldConfigurationForCartEntry?: string;
  /**
   * Endpoint to read configuration
   *
   * @member {string}
   */
  readVariantConfiguration?: string;
  /**
   * Endpoint to update configuration
   *
   * @member {string}
   */
  updateVariantConfiguration?: string;
  /**
   * Endpoint to add configuration to cart
   *
   * @member {string}
   */
  addVariantConfigurationToCart?: string;
  /**
   * Endpoint for reading configuration attached to the cart entry
   */
  readVariantConfigurationForCartEntry?: string;
  /**
   * Endpoint for updating configuration attached to the cart entry
   */
  updateVariantConfigurationForCartEntry?: string;
  /**
   * Endpoint for reading configuration overview attached to the order entry
   */
  readVariantConfigurationOverviewForOrderEntry?: string;
  /**
   * Endpoint to read configuration price
   *
   * @member {string}
   */
  readVariantConfigurationPriceSummary?: string;
  /**
   * Endpoint to get configuration Overview
   *
   * @member {string}
   */
  getVariantConfigurationOverview?: string;
  /**
   * Endpoint for consignment tracking
   * @deprecated since 4.2 - use order lib instead
   *
   * @member {string}
   */
  consignmentTracking?: string | OccEndpoint;
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
   * @deprecated since 4.2 - use order lib instead
   */
  cancelOrder?: string | OccEndpoint;
  /**
   * Endpoint for creating order return request
   * @deprecated since 4.2 - use order lib instead
   */
  returnOrder?: string | OccEndpoint;
  /**
   * Endpoint for user's order return requests
   * @deprecated since 4.2 - use order lib instead
   */
  orderReturns?: string | OccEndpoint;
  /**
   * Endpoint for order return request details
   * @deprecated since 4.2 - use order lib instead
   */
  orderReturnDetail?: string | OccEndpoint;
  /**
   * Endpoint for cancelling return request
   * @deprecated since 4.2 - use order lib instead
   */
  cancelReturn?: string | OccEndpoint;
  /**
   * Endpoint to schedule a replenishment order
   * @deprecated since 4.2 - use order lib instead
   *
   * @member {string}
   */
  scheduleReplenishmentOrder?: string | OccEndpoint;
  /**
   * Endpoint for the list of one user's replenishment orders
   * @deprecated since 4.2 - use order lib instead
   *
   * @member {string}
   */
  replenishmentOrderHistory?: string | OccEndpoint;
  /**
   * Endpoint to get a replenishment order details
   * @deprecated since 4.2 - use order lib instead
   *
   * @member {string}
   */
  replenishmentOrderDetails?: string | OccEndpoint;
  /**
   * Endpoint to get a replenishment order history for a replenishment
   * @deprecated since 4.2 - use order lib instead
   *
   * @member {string}
   */
  replenishmentOrderDetailsHistory?: string | OccEndpoint;
  /**
   * Endpoint to get a replenishment order history for a replenishment
   * @deprecated since 4.2 - use order lib instead
   *
   * @member {string}
   */
  cancelReplenishmentOrder?: string | OccEndpoint;
  /**
   * Endpoint for getting all base sites
   *
   * @member {string}
   */
  baseSites?: string | OccEndpoint;
  /** Endpoint to returns active cost centers
   *
   * @member {string}
   */
  getActiveCostCenters?: string | OccEndpoint;
  /**
   * Get cart validation results
   */
  validate?: string | OccEndpoint;

  // TODO @deprecation for 3.2 DEPRECATION START - The endpoint bellow were moved to separate feature libraries
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
   * Endpoint for userGroupOrderApprovalPermission
   *
   * @member {string}
   */
  budget?: string | OccEndpoint;
  /**
   * Endpoint for budgets list
   *
   * @member {string}
   */
  budgets?: string | OccEndpoint;
  /**
   * Endpoint for organizations
   *
   * @member {string}
   */
  orgUnits?: string | OccEndpoint;
  /**
   * Endpoint for organizations list
   *
   * @member {string}
   */
  orgUnitsAvailable?: string | OccEndpoint;
  /**
   * Endpoint for organization units tree
   *
   * @member {string}
   */
  orgUnitsTree?: string | OccEndpoint;
  /**
   * Endpoint for approval processes for organization units
   *
   * @member {string}
   */
  orgUnitsApprovalProcesses?: string | OccEndpoint;
  /**
   * Endpoint for organization
   *
   * @member {string}
   */
  orgUnit?: string | OccEndpoint;
  /**
   * Endpoint for orgUnitUsers:
   *
   * @member {string}
   */
  orgUnitUsers?: string | OccEndpoint;
  /**
   * Endpoint for add orgUnitUserRoles (except approver):
   *
   * @member {string}
   */
  orgUnitUserRoles?: string | OccEndpoint;
  /**
   * Endpoint for remove orgUnitUserRole (except approver):
   *
   * @member {string}
   */
  orgUnitUserRole?: string | OccEndpoint;
  /**
   * Endpoint for add orgUnitApprovers:
   *
   * @member {string}
   */
  orgUnitApprovers?: string | OccEndpoint;
  /**
   * Endpoint for delete orgUnitApprover:
   *
   * @member {string}
   */
  orgUnitApprover?: string | OccEndpoint;
  /**
   * Endpoint for organizational unit addresses
   *
   * @member {string}
   */
  orgUnitsAddresses?: string | OccEndpoint;
  /**
   * Endpoint for organizational unit address
   *
   * @member {string}
   */
  orgUnitsAddress?: string | OccEndpoint;
  /**
   * Endpoint for organizational unit user groups list
   *
   * @member {string}
   */
  userGroups?: string | OccEndpoint;
  /**
   * Endpoint for organizational unit user group
   *
   * @member {string}
   */
  userGroup?: string | OccEndpoint;
  /**
   * Endpoint for costCenter list
   *
   * @member {string}
   */
  userGroupAvailableOrderApprovalPermissions?: string | OccEndpoint;
  /**
   * Endpoint for userGroupAvailableOrderApprovalPermissions list
   *
   * @member {string}
   */
  userGroupAvailableOrgCustomers?: string | OccEndpoint;
  /**
   * Endpoint for userGroupAvailableOrgCustomers list
   *
   * @member {string}
   */
  userGroupMembers?: string | OccEndpoint;
  /**
   * Endpoint for userGroupMembers list
   *
   * @member {string}
   */
  userGroupMember?: string | OccEndpoint;
  /**
   * Endpoint for userGroupMember
   *
   * @member {string}
   */
  userGroupOrderApprovalPermissions?: string | OccEndpoint;
  /**
   * Endpoint for userGroupOrderApprovalPermissions list
   *
   * @member {string}
   */
  userGroupOrderApprovalPermission?: string | OccEndpoint;
  /**
   * Endpoint for userGroupOrderApprovalPermission
   *
   * @member {string}
   */
  costCenters?: string | OccEndpoint;
  /**
   * Endpoint for all costCenters
   *
   * @member {string}
   */
  costCentersAll?: string | OccEndpoint;
  /**
   * Endpoint for costCenter
   *
   * @member {string}
   */
  costCenter?: string | OccEndpoint;
  /**
   * Endpoint for budgets assigned to costCenter
   *
   * @member {string}
   */
  costCenterBudgets?: string | OccEndpoint;
  /**
   * Endpoint for budget assigned to costCenter
   *
   * @member {string}
   */
  costCenterBudget?: string | OccEndpoint;
  /**
   * Endpoint for permission list
   *
   * @member {string}
   */
  permissions?: string | OccEndpoint;
  /**
   * Endpoint for permission
   *
   * @member {string}
   */
  permission?: string | OccEndpoint;
  /**
   * Endpoint for order approval permission types
   *
   * @member {string}
   */
  orderApprovalPermissionTypes?: string | OccEndpoint;
  /**
   * Endpoint for organization customers
   *
   * @member {string}
   */
  b2bUsers?: string | OccEndpoint;
  /**
   * Endpoint for organization customer
   *
   * @member {string}
   */
  b2bUser?: string | OccEndpoint;
  /**
   * Endpoint for organization customer approvers
   *
   * @member {string}
   */
  b2bUserApprovers?: string | OccEndpoint;
  /**
   * Endpoint for organization customer approver
   *
   * @member {string}
   */
  b2bUserApprover?: string | OccEndpoint;
  /**
   * Endpoint for organization customer user groups
   *
   * @member {string}
   */
  b2bUserUserGroups?: string | OccEndpoint;
  /**
   * Endpoint for organization customer user group
   *
   * @member {string}
   */
  b2bUserUserGroup?: string | OccEndpoint;
  /**
   * Endpoint for organization customer permissions
   *
   * @member {string}
   */
  b2bUserPermissions?: string | OccEndpoint;
  /**
   * Endpoint for organization customer permission
   *
   * @member {string}
   */
  b2bUserPermission?: string | OccEndpoint;
  /**
   * Endpoint for order approvals
   *
   * @member {string}
   */
  orderApprovals?: string | OccEndpoint;
  /**
   * Endpoint for order approval
   *
   * @member {string}
   */
  orderApproval?: string | OccEndpoint;
  /**
   * Endpoint for order approval decision
   *
   * @member {string}
   */
  orderApprovalDecision?: string | OccEndpoint;
  /**
   * Explicitly saves a cart
   *
   * @member {string}
   */
  saveCart?: string | OccEndpoint;
  // DEPRECATION END
}
