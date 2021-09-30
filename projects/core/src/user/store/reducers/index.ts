import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import { Address } from '../../../model/address.model';
import { PaymentDetails } from '../../../model/cart.model';
import { ConsentTemplate } from '../../../model/consent.model';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
import { NotificationPreference } from '../../../model/notification-preference.model';
import {
  Order,
  OrderHistoryList,
  ReturnRequest,
  ReturnRequestList,
} from '../../../model/order.model';
import { CostCenter } from '../../../model/org-unit.model';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';
import {
  ReplenishmentOrder,
  ReplenishmentOrderList,
} from '../../../model/replenishment-order.model';
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
  USER_ORDERS,
  USER_ORDER_DETAILS,
  USER_PAYMENT_METHODS,
  USER_REPLENISHMENT_ORDERS,
  USER_REPLENISHMENT_ORDER_DETAILS,
  USER_RETURN_REQUESTS,
  USER_RETURN_REQUEST_DETAILS,
} from '../user-state';
import * as fromBillingCountriesReducer from './billing-countries.reducer';
import * as fromConsignmentTrackingReducer from './consignment-tracking.reducer';
import * as fromCustomerCouponReducer from './customer-coupon.reducer';
import * as fromDeliveryCountries from './delivery-countries.reducer';
import * as fromNotificationPreferenceReducer from './notification-preference.reducer';
import * as fromOrderDetailsReducer from './order-details.reducer';
import * as fromOrderReturnRequestReducer from './order-return-request.reducer';
import * as fromPaymentReducer from './payment-methods.reducer';
import * as fromInterestsReducer from './product-interests.reducer';
import * as fromRegionsReducer from './regions.reducer';
import * as fromReplenishmentOrderDetailsReducer from './replenishment-order-details.reducer';
import * as fromAddressesReducer from './user-addresses.reducer';
import * as fromUserConsentsReducer from './user-consents.reducer';
import * as fromCostCenterReducer from './user-cost-center.reducer';
import * as fromUserOrdersReducer from './user-orders.reducer';
import * as fromUserReplenishmentOrdersReducer from './user-replenishment-orders.reducer';

export function getReducers(): ActionReducerMap<UserState> {
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
    orders: loaderReducer<OrderHistoryList>(
      USER_ORDERS,
      fromUserOrdersReducer.reducer
    ),
    order: loaderReducer<Order>(
      USER_ORDER_DETAILS,
      fromOrderDetailsReducer.reducer
    ),
    replenishmentOrders: loaderReducer<ReplenishmentOrderList>(
      USER_REPLENISHMENT_ORDERS,
      fromUserReplenishmentOrdersReducer.reducer
    ),
    orderReturn: loaderReducer<ReturnRequest>(USER_RETURN_REQUEST_DETAILS),
    orderReturnList: loaderReducer<ReturnRequestList>(
      USER_RETURN_REQUESTS,
      fromOrderReturnRequestReducer.reducer
    ),
    countries: fromDeliveryCountries.reducer,
    regions: loaderReducer<RegionsState>(REGIONS, fromRegionsReducer.reducer),
    consignmentTracking: fromConsignmentTrackingReducer.reducer,
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
    replenishmentOrder: loaderReducer<ReplenishmentOrder>(
      USER_REPLENISHMENT_ORDER_DETAILS,
      fromReplenishmentOrderDetailsReducer.reducer
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
