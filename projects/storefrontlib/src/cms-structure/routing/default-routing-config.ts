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
  orgUnitAssignRoles: {
    paths: ['organization/unit/assign-roles/:code/:roleId'],
  },
  costCenters: {
    paths: ['organization/costcenters'],
  },
  costCenterCreate: {
    paths: ['organization/costcenters/create'],
  },
  costCenterDetails: {
    paths: ['organization/costcenter/:code'],
  },
  costCenterAssignBudgets: {
    paths: ['organization/costcenter/assign-budgets/:code'],
  },
  costCenterEdit: {
    paths: ['organization/costcenter/edit/:code'],
  },
  permissions: {
    paths: ['organization/permissions'],
  },
  permissionCreate: {
    paths: ['organization/permissions/create'],
  },
  permissionDetails: {
    paths: ['organization/permission/:code'],
  },
  permissionEdit: {
    paths: ['organization/permission/edit/:code'],
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
  userGroups: {
    paths: ['organization/usergroups'],
  },
  userGroupCreate: {
    paths: ['organization/usergroups/create'],
  },
  userGroupDetails: {
    paths: ['organization/usergroup/:code'],
  },
  userGroupEdit: {
    paths: ['organization/usergroup/edit/:code'],
  },
  userGroupAssignPermissions: {
    paths: ['organization/usergroup/assign-permissions/:code'],
  },
  userGroupAssignUsers: {
    paths: ['organization/usergroup/assign-users/:code'],
  },
};

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontRoutesConfig,
  },
};
