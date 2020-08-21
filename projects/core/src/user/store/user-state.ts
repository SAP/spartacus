import { Address, Country, Region } from '../../model/address.model';
import { PaymentDetails } from '../../model/cart.model';
import { ConsentTemplate } from '../../model/consent.model';
import { ConsignmentTracking } from '../../model/consignment-tracking.model';
import { CustomerCouponSearchResult } from '../../model/customer-coupon.model';
import { Title, User } from '../../model/misc.model';
import { NotificationPreference } from '../../model/notification-preference.model';
import {
  Order,
  OrderHistoryList,
  ReturnRequest,
  ReturnRequestList,
} from '../../model/order.model';
import { CostCenter } from '../../model/org-unit.model';
import { ProductInterestSearchResult } from '../../model/product-interest.model';
import { StateUtils } from '../../state/utils/index';

export const USER_FEATURE = 'user';
export const UPDATE_EMAIL_PROCESS_ID = 'updateEmail';
export const UPDATE_PASSWORD_PROCESS_ID = 'updatePassword';
export const UPDATE_USER_DETAILS_PROCESS_ID = 'updateUserDetails';
export const REGISTER_USER_PROCESS_ID = 'registerUser';
export const REMOVE_USER_PROCESS_ID = 'removeUser';
export const GIVE_CONSENT_PROCESS_ID = 'giveConsent';
export const WITHDRAW_CONSENT_PROCESS_ID = 'withdrawConsent';
export const UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID =
  'updateNotificationPreferences';
export const ADD_PRODUCT_INTEREST_PROCESS_ID = 'addProductInterests';
export const REMOVE_PRODUCT_INTERESTS_PROCESS_ID = 'removeProductInterests';
export const CANCEL_ORDER_PROCESS_ID = 'cancelOrder';
export const CANCEL_RETURN_PROCESS_ID = 'cancelReturn';

export const USER_CONSENTS = '[User] User Consents';
export const USER_PAYMENT_METHODS = '[User] User Payment Methods';
export const USER_ORDERS = '[User] User Orders';
export const USER_ADDRESSES = '[User] User Addresses';
export const USER_RETURN_REQUESTS = '[User] Order Return Requests';
export const USER_RETURN_REQUEST_DETAILS = '[User] Return Request Details';
export const USER_ORDER_DETAILS = '[User] User Order Details';
export const USER_COST_CENTERS = '[User] User Cost Centers';
export const USER_REPLENISHMENT_ORDERS = '[User] User Replenishment Orders';
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

export interface UserState {
  account: UserDetailsState;
  addresses: StateUtils.LoaderState<Address[]>;
  consents: StateUtils.LoaderState<ConsentTemplate[]>;
  billingCountries: BillingCountriesState;
  countries: DeliveryCountriesState;
  payments: StateUtils.LoaderState<PaymentDetails[]>;
  orders: StateUtils.LoaderState<OrderHistoryList>;
  order: StateUtils.LoaderState<Order>;
  orderReturn: StateUtils.LoaderState<ReturnRequest>;
  orderReturnList: StateUtils.LoaderState<ReturnRequestList>;
  titles: TitlesState;
  regions: StateUtils.LoaderState<RegionsState>;
  resetPassword: boolean;
  consignmentTracking: ConsignmentTrackingState;
  customerCoupons: StateUtils.LoaderState<CustomerCouponSearchResult>;
  notificationPreferences: StateUtils.LoaderState<NotificationPreference[]>;
  productInterests: StateUtils.LoaderState<ProductInterestSearchResult>;
  costCenters: StateUtils.LoaderState<CostCenter[]>;
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

export interface TitleEntities {
  [key: string]: Title;
}

export interface TitlesState {
  entities: TitleEntities;
}

export interface UserDetailsState {
  details: User;
}

export interface ConsignmentTrackingState {
  tracking?: ConsignmentTracking;
}
