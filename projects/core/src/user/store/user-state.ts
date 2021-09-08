import { Address, Country, Region } from '../../model/address.model';
import { PaymentDetails } from '../../model/cart.model';
import { ConsentTemplate } from '../../model/consent.model';
import { ConsignmentTracking } from '../../model/consignment-tracking.model';
import { CustomerCouponSearchResult } from '../../model/customer-coupon.model';
import { NotificationPreference } from '../../model/notification-preference.model';
import {
  Order,
  OrderHistoryList,
  ReturnRequest,
  ReturnRequestList,
} from '../../model/order.model';
import { CostCenter } from '../../model/org-unit.model';
import { ProductInterestSearchResult } from '../../model/product-interest.model';
import {
  ReplenishmentOrder,
  ReplenishmentOrderList,
} from '../../model/replenishment-order.model';
import { StateUtils } from '../../state/utils/index';

export const USER_FEATURE = 'user';
export const REGISTER_USER_PROCESS_ID = 'registerUser';
export const GIVE_CONSENT_PROCESS_ID = 'giveConsent';
export const WITHDRAW_CONSENT_PROCESS_ID = 'withdrawConsent';
export const UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID =
  'updateNotificationPreferences';
export const ADD_PRODUCT_INTEREST_PROCESS_ID = 'addProductInterests';
export const REMOVE_PRODUCT_INTERESTS_PROCESS_ID = 'removeProductInterests';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_ORDER_PROCESS_ID = 'cancelOrder';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_RETURN_PROCESS_ID = 'cancelReturn';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_REPLENISHMENT_ORDER_PROCESS_ID = 'cancelReplenishmentOrder';

export const USER_CONSENTS = '[User] User Consents';
export const USER_PAYMENT_METHODS = '[User] User Payment Methods';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const USER_ORDERS = '[User] User Orders';
export const USER_ADDRESSES = '[User] User Addresses';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const USER_RETURN_REQUESTS = '[User] Order Return Requests';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const USER_RETURN_REQUEST_DETAILS = '[User] Return Request Details';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const USER_ORDER_DETAILS = '[User] User Order Details';
export const USER_COST_CENTERS = '[User] User Cost Centers';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const USER_REPLENISHMENT_ORDERS = '[User] User Replenishment Orders';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const USER_REPLENISHMENT_ORDER_DETAILS =
  '[User] User Replenishment Order Details';
export const REGIONS = '[User] Regions';

export const CUSTOMER_COUPONS = '[User] Customer Coupons';
export const SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID = 'subscribeCustomerCoupon';
export const UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID =
  'unsubscribeCustomerCoupon';
export const CLAIM_CUSTOMER_COUPON_PROCESS_ID = 'claimCustomerCoupon';
export const NOTIFICATION_PREFERENCES = '[User] Notification Preferences';
export const PRODUCT_INTERESTS = '[User] Product Interests';

export interface StateWithUser {
  [USER_FEATURE]: UserState;
}

/**
 * @deprecated since 3.2, moved to the `@spartacus/user` package.
 */
export interface UserState {
  addresses: StateUtils.LoaderState<Address[]>;
  consents: StateUtils.LoaderState<ConsentTemplate[]>;
  billingCountries: BillingCountriesState;
  countries: DeliveryCountriesState;
  payments: StateUtils.LoaderState<PaymentDetails[]>;
  /**
   * @deprecated since 4.2 - use order lib instead
   */
  orders: StateUtils.LoaderState<OrderHistoryList>;
  /**
   * @deprecated since 4.2 - use order lib instead
   */
  order: StateUtils.LoaderState<Order>;
  /**
   * @deprecated since 4.2 - use order lib instead
   */
  replenishmentOrders: StateUtils.LoaderState<ReplenishmentOrderList>;
  /**
   * @deprecated since 4.2 - use order lib instead
   */
  orderReturn: StateUtils.LoaderState<ReturnRequest>;
  /**
   * @deprecated since 4.2 - use order lib instead
   */
  orderReturnList: StateUtils.LoaderState<ReturnRequestList>;
  regions: StateUtils.LoaderState<RegionsState>;
  /**
   * @deprecated since 4.2 - use order lib instead
   */
  consignmentTracking: ConsignmentTrackingState;
  customerCoupons: StateUtils.LoaderState<CustomerCouponSearchResult>;
  notificationPreferences: StateUtils.LoaderState<NotificationPreference[]>;
  productInterests: StateUtils.LoaderState<ProductInterestSearchResult>;
  costCenters: StateUtils.LoaderState<CostCenter[]>;
  /**
   * @deprecated since 4.2 - use order lib instead
   */
  replenishmentOrder: StateUtils.LoaderState<ReplenishmentOrder>;
}

export interface RegionsState {
  entities: Region[];
  country: string;
}

export interface BillingCountryEntities {
  [key: string]: Country;
}

export interface BillingCountriesState {
  entities: BillingCountryEntities;
}

export interface DeliveryCountryEntities {
  [key: string]: Country;
}

export interface DeliveryCountriesState {
  entities: DeliveryCountryEntities;
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export interface ConsignmentTrackingState {
  tracking?: ConsignmentTracking;
}
