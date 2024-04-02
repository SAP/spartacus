/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import { Address } from '../../../model/address.model';
import { ConsentTemplate } from '../../../model/consent.model';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { CostCenter } from '../../../model/org-unit.model';
import { PaymentDetails } from '../../../model/payment.model';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import {
  CUSTOMER_COUPONS,
  NOTIFICATION_PREFERENCES,
  PRODUCT_INTERESTS,
  REGIONS,
  RegionsState,
  UserState,
  USER_ADDRESSES,
  USER_CONSENTS,
  USER_COST_CENTERS,
  USER_PAYMENT_METHODS,
} from '../user-state';
import * as fromBillingCountriesReducer from './billing-countries.reducer';
import * as fromCustomerCouponReducer from './customer-coupon.reducer';
import * as fromDeliveryCountries from './delivery-countries.reducer';
import * as fromNotificationPreferenceReducer from './notification-preference.reducer';
import * as fromPaymentReducer from './payment-methods.reducer';
import * as fromInterestsReducer from './product-interests.reducer';
import * as fromRegionsReducer from './regions.reducer';
import * as fromAddressesReducer from './user-addresses.reducer';
import * as fromUserConsentsReducer from './user-consents.reducer';
import * as fromCostCenterReducer from './user-cost-center.reducer';

export function getReducers(): ActionReducerMap<UserState, any> {
  return {
    addresses: loaderReducer<Address[], any>(
      USER_ADDRESSES,
      fromAddressesReducer.reducer
    ),
    billingCountries: fromBillingCountriesReducer.reducer,
    consents: loaderReducer<ConsentTemplate[], any>(
      USER_CONSENTS,
      fromUserConsentsReducer.reducer
    ),
    payments: loaderReducer<PaymentDetails[], any>(
      USER_PAYMENT_METHODS,
      fromPaymentReducer.reducer
    ),
    countries: fromDeliveryCountries.reducer,
    regions: loaderReducer<RegionsState, any>(
      REGIONS,
      fromRegionsReducer.reducer
    ),
    customerCoupons: loaderReducer<CustomerCouponSearchResult, any>(
      CUSTOMER_COUPONS,
      fromCustomerCouponReducer.reducer
    ),
    notificationPreferences: loaderReducer<NotificationPreference[], any>(
      NOTIFICATION_PREFERENCES,
      fromNotificationPreferenceReducer.reducer
    ),
    productInterests: loaderReducer<ProductInterestSearchResult, any>(
      PRODUCT_INTERESTS,
      fromInterestsReducer.reducer
    ),
    costCenters: loaderReducer<CostCenter[], any>(
      USER_COST_CENTERS,
      fromCostCenterReducer.reducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<UserState>> =
  new InjectionToken<ActionReducerMap<UserState>>('UserReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearUserState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearUserState];
