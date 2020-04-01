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
    paths: ['my-company/organization-management'],
  },
  budgets: {
    paths: ['my-company/organization-management/manage-budgets'],
  },
  budgetCreate: {
    paths: ['my-company/organization-management/manage-budgets/create'],
  },
  budgetDetails: {
    paths: ['my-company/organization-management/manage-budget/:code'],
  },
  budgetEdit: {
    paths: ['my-company/organization-management/manage-budget/edit/:code'],
  },
  orgUnits: {
    paths: ['my-company/organization-management/manage-units'],
  },
  orgUnitCreate: {
    paths: ['my-company/organization-management/manage-units/create'],
  },
  orgUnitDetails: {
    paths: ['my-company/organization-management/manage-unit/:code'],
    paramsMapping: { code: 'uid' },
  },
  orgUnitEdit: {
    paths: ['my-company/organization-management/manage-unit/edit/:code'],
    paramsMapping: { code: 'uid' },
  },
  orgUnitAssignRoles: {
    paths: [
      'my-company/organization-management/manage-unit/assign-roles/:code/:roleId',
    ],
  },
  costCenters: {
    paths: ['my-company/organization-management/manage-costcenters'],
  },
  costCenterCreate: {
    paths: ['my-company/organization-management/manage-costcenters/create'],
  },
  costCenterDetails: {
    paths: ['my-company/organization-management/manage-costcenter/:code'],
  },
  costCenterAssignBudgets: {
    paths: [
      'my-company/organization-management/manage-costcenter/assign-budgets/:code',
    ],
  },
  costCenterEdit: {
    paths: ['my-company/organization-management/manage-costcenter/edit/:code'],
  },
  permissions: {
    paths: ['my-company/organization-management/manage-permissions'],
  },
  permissionCreate: {
    paths: ['my-company/organization-management/manage-permissions/create'],
  },
  permissionDetails: {
    paths: ['my-company/organization-management/manage-permission/:code'],
  },
  permissionEdit: {
    paths: ['my-company/organization-management/manage-permission/edit/:code'],
  },
  users: {
    paths: ['my-company/organization-management/manage-users'],
  },
  userCreate: {
    paths: ['my-company/organization-management/manage-user/create'],
  },
  userDetails: {
    paths: ['my-company/organization-management/manage-user/:code'],
    paramsMapping: { code: 'email' },
  },
  userEdit: {
    paths: ['my-company/organization-management/manage-user/edit/:code'],
    paramsMapping: { code: 'email' },
  },
  userGroups: {
    paths: ['my-company/organization-management/manage-usergroups'],
  },
  userGroupCreate: {
    paths: ['my-company/organization-management/manage-usergroups/create'],
  },
  userGroupDetails: {
    paths: ['my-company/organization-management/manage-usergroup/:code'],
  },
  userGroupEdit: {
    paths: ['my-company/organization-management/manage-usergroup/edit/:code'],
  },
};

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontRoutesConfig,
  },
};
