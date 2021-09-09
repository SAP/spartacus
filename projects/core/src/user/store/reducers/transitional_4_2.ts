import { Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { Address } from '../../../model/address.model';
import { PaymentDetails } from '../../../model/cart.model';
import { ConsentTemplate } from '../../../model/consent.model';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { CostCenter } from '../../../model/org-unit.model';
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
import { reducerToken } from './index';
import * as fromNotificationPreferenceReducer from './notification-preference.reducer';
import * as fromPaymentReducer from './payment-methods.reducer';
import * as fromInterestsReducer from './product-interests.reducer';
import * as fromRegionsReducer from './regions.reducer';
import * as fromAddressesReducer from './user-addresses.reducer';
import * as fromUserConsentsReducer from './user-consents.reducer';
import * as fromCostCenterReducer from './user-cost-center.reducer';

export function getReducersTransitional_4_2(): ActionReducerMap<
  Partial<UserState>
> {
  return {
    addresses: loaderReducer<Address[]>(
      USER_ADDRESSES,
      fromAddressesReducer.reducer
    ),
    billingCountries: fromBillingCountriesReducer.reducer,
    consents: loaderReducer<ConsentTemplate[]>(
      USER_CONSENTS,
      fromUserConsentsReducer.reducer
    ),
    payments: loaderReducer<PaymentDetails[]>(
      USER_PAYMENT_METHODS,
      fromPaymentReducer.reducer
    ),
    countries: fromDeliveryCountries.reducer,
    regions: loaderReducer<RegionsState>(REGIONS, fromRegionsReducer.reducer),
    customerCoupons: loaderReducer<CustomerCouponSearchResult>(
      CUSTOMER_COUPONS,
      fromCustomerCouponReducer.reducer
    ),
    notificationPreferences: loaderReducer<NotificationPreference[]>(
      NOTIFICATION_PREFERENCES,
      fromNotificationPreferenceReducer.reducer
    ),
    productInterests: loaderReducer<ProductInterestSearchResult>(
      PRODUCT_INTERESTS,
      fromInterestsReducer.reducer
    ),
    costCenters: loaderReducer<CostCenter[]>(
      USER_COST_CENTERS,
      fromCostCenterReducer.reducer
    ),
  };
}

export const reducerTransitional_4_2_Provider: Provider = {
  provide: reducerToken,
  useFactory: getReducersTransitional_4_2,
};
