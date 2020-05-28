import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const defaultStorefrontRoutesConfig: RoutesConfig = {
  home: { paths: [''] },
  notFound: { paths: ['not-found'] },
  cart: { paths: ['cart'] },

  // semantic links for login related pages
  login: { paths: ['login'], protected: false },
  register: { paths: ['login/register'], protected: false },
  forgotPassword: { paths: ['login/forgot-password'], protected: false },
  resetPassword: { paths: ['login/pw/change'], protected: false },
  logout: { paths: ['logout'] },
  checkoutLogin: { paths: ['checkout-login'] },

  checkout: { paths: ['checkout'] },
  checkoutShippingAddress: { paths: ['checkout/shipping-address'] },
  checkoutDeliveryMode: { paths: ['checkout/delivery-mode'] },
  checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
  checkoutReviewOrder: { paths: ['checkout/review-order'] },
  orderConfirmation: { paths: ['order-confirmation'] },

  // plp routes
  search: { paths: ['search/:query'] },
  category: {
    paths: ['category/:categoryCode'],
    paramsMapping: { categoryCode: 'code' },
  },
  brand: { paths: ['Brands/:brandName/c/:brandCode'] },

  // pdp routes
  product: {
    paths: ['product/:productCode/:name'],
    paramsMapping: { productCode: 'code' },
  },

  termsAndConditions: { paths: ['terms-and-conditions'] },
  orders: {
    paths: ['my-account/orders'],
  },
  orderDetails: {
    paths: ['my-account/order/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderGuest: {
    paths: ['guest/order/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderReturn: {
    paths: ['my-account/order/return/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderReturnConfirmation: {
    paths: ['my-account/order/return/confirmation/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderCancel: {
    paths: ['my-account/order/cancel/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderCancelConfirmation: {
    paths: ['my-account/order/cancel/confirmation/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  returnRequestDetails: {
    paths: ['my-account/return-request/:returnCode'],
    paramsMapping: { returnCode: 'rma' },
  },
  coupons: { paths: ['my-account/coupons'] },
  couponClaim: {
    paths: ['my-account/coupon/claim/:couponCode'],
    paramsMapping: { couponCode: 'code' },
  },
  organization: {
    paths: ['organization'],
  },
  budgets: {
    paths: ['organization/budgets'],
  },
  budgetCreate: {
    paths: ['organization/budgets/create'],
  },
  budgetDetails: {
    paths: ['organization/budget/:code'],
  },
  budgetCostCenters: {
    paths: ['organization/budget/cost-centers/:code'],
  },
  budgetEdit: {
    paths: ['organization/budget/edit/:code'],
  },
  orgUnits: {
    paths: ['organization/units'],
  },
  orgUnitCreate: {
    paths: ['organization/units/create'],
  },
  orgUnitDetails: {
    paths: ['organization/unit/:code'],
    paramsMapping: { code: 'uid' },
  },
  orgUnitEdit: {
    paths: ['organization/unit/edit/:code'],
    paramsMapping: { code: 'uid' },
  },
  orgUnitUsers: {
    paths: ['organization/unit/users/:code'],
  },
  orgUnitAssignRoles: {
    paths: ['organization/unit/assign-roles/:code/:roleId'],
  },
  orgUnitApprovers: {
    paths: ['organization/unit/approvers/:code'],
  },
  orgUnitAssignApprovers: {
    paths: ['organization/unit/assign-approvers/:code'],
  },
  orgUnitManageAddresses: {
    paths: ['organization/unit/addresses/:code'],
  },
  orgUnitChildren: {
    paths: ['organization/unit/children/:code'],
  },
  orgUnitCostCenters: {
    paths: ['organization/unit/cost-centers/:code'],
  },
  orgUnitAddressEdit: {
    paths: ['organization/unit/address/edit/:code/:id'],
  },
  orgUnitAddressDetails: {
    paths: ['organization/unit/address/:code/:id'],
  },
  orgUnitAddressCreate: {
    paths: ['organization/unit/addresses/create/:code'],
  },
  costCenters: {
    paths: ['organization/cost-centers'],
  },
  costCenterCreate: {
    paths: ['organization/cost-centers/create'],
  },
  costCenterDetails: {
    paths: ['organization/cost-center/:code'],
  },
  costCenterBudgets: {
    paths: ['organization/cost-center/budgets/:code'],
  },
  costCenterAssignBudgets: {
    paths: ['organization/cost-center/assign-budgets/:code'],
  },
  costCenterEdit: {
    paths: ['organization/cost-center/edit/:code'],
  },
  permissions: {
    paths: ['organization/purchase-limits'],
  },
  permissionCreate: {
    paths: ['organization/purchase-limits/create'],
  },
  permissionDetails: {
    paths: ['organization/purchase-limit/:code'],
  },
  permissionEdit: {
    paths: ['organization/purchase-limit/edit/:code'],
  },
  users: {
    paths: ['organization/users'],
  },
  userCreate: {
    paths: ['organization/user/create'],
  },
  userDetails: {
    paths: ['organization/user/:code'],
    paramsMapping: { code: 'email' },
  },
  userEdit: {
    paths: ['organization/user/edit/:code'],
    paramsMapping: { code: 'email' },
  },
  userApprovers: {
    paths: ['organization/user/approvers/:code'],
  },
  userAssignApprovers: {
    paths: ['organization/user/assign-approvers/:code'],
  },
  userPermissions: {
    paths: ['organization/user/purchase-limits/:code'],
  },
  userAssignPermissions: {
    paths: ['organization/user/assign-purchase-limits/:code'],
  },
  userUserGroups: {
    paths: ['organization/user/user-groups/:code'],
  },
  userAssignUserGroups: {
    paths: ['organization/user/assign-user-groups/:code'],
  },
  userGroups: {
    paths: ['organization/user-groups'],
  },
  userGroupCreate: {
    paths: ['organization/user-groups/create'],
  },
  userGroupDetails: {
    paths: ['organization/user-group/:code'],
  },
  userGroupEdit: {
    paths: ['organization/user-group/edit/:code'],
  },
  userGroupPermissions: {
    paths: ['organization/user-group/purchase-limits/:code'],
  },
  userGroupAssignPermissions: {
    paths: ['organization/user-group/assign-purchase-limits/:code'],
  },
  userGroupUsers: {
    paths: ['organization/user-group/users/:code'],
  },
  userGroupAssignUsers: {
    paths: ['organization/user-group/assign-users/:code'],
  },
};

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontRoutesConfig,
  },
};
