/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address, Country, Region } from '../../model/address.model';
import { ConsentTemplate } from '../../model/consent.model';
import { CustomerCouponSearchResult } from '../../model/customer-coupon.model';
import { NotificationPreference } from '../../model/notification-preference.model';
import { CostCenter } from '../../model/org-unit.model';
import { PaymentDetails } from '../../model/payment.model';
import { ProductInterestSearchResult } from '../../model/product-interest.model';
import { StateUtils } from '../../state/utils/index';

export const USER_FEATURE = 'user';
export const REGISTER_USER_PROCESS_ID = 'registerUser';
export const GIVE_CONSENT_PROCESS_ID = 'giveConsent';
export const WITHDRAW_CONSENT_PROCESS_ID = 'withdrawConsent';
export const UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID =
  'updateNotificationPreferences';
export const ADD_PRODUCT_INTEREST_PROCESS_ID = 'addProductInterests';
export const REMOVE_PRODUCT_INTERESTS_PROCESS_ID = 'removeProductInterests';

export const USER_CONSENTS = '[User] User Consents';
export const USER_PAYMENT_METHODS = '[User] User Payment Methods';
export const USER_ADDRESSES = '[User] User Addresses';
export const USER_COST_CENTERS = '[User] User Cost Centers';
export const REGIONS = '[User] Regions';

export const CUSTOMER_COUPONS = '[User] Customer Coupons';
export const SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID = 'subscribeCustomerCoupon';
export const UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID =
  'unsubscribeCustomerCoupon';
export const CLAIM_CUSTOMER_COUPON_PROCESS_ID = 'claimCustomerCoupon';
export const DISCLAIM_CUSTOMER_COUPON_PROCESS_ID = 'disclaimCustomerCoupon';
export const NOTIFICATION_PREFERENCES = '[User] Notification Preferences';
export const PRODUCT_INTERESTS = '[User] Product Interests';

export interface StateWithUser {
  [USER_FEATURE]: UserState;
}

export interface UserState {
  addresses: StateUtils.LoaderState<Address[]>;
  consents: StateUtils.LoaderState<ConsentTemplate[]>;
  billingCountries: BillingCountriesState;
  countries: DeliveryCountriesState;
  payments: StateUtils.LoaderState<PaymentDetails[]>;
  regions: StateUtils.LoaderState<RegionsState>;
  customerCoupons: StateUtils.LoaderState<CustomerCouponSearchResult>;
  notificationPreferences: StateUtils.LoaderState<NotificationPreference[]>;
  productInterests: StateUtils.LoaderState<ProductInterestSearchResult>;
  costCenters: StateUtils.LoaderState<CostCenter[]>;
}

export interface RegionsState {
  entities: Region[];
  country: string | null;
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
