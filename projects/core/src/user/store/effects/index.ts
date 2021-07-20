import { BillingCountriesEffect } from './billing-countries.effect';
import { ClearMiscsDataEffect } from './clear-miscs-data.effect';
import { ConsignmentTrackingEffects } from './consignment-tracking.effect';
import { CustomerCouponEffects } from './customer-coupon.effect';
import { DeliveryCountriesEffects } from './delivery-countries.effect';
import { NotificationPreferenceEffects } from './notification-preference.effect';
import { OrderDetailsEffect } from './order-details.effect';
import { OrderReturnRequestEffect } from './order-return-request.effect';
import { UserPaymentMethodsEffects } from './payment-methods.effect';
import { ProductInterestsEffect } from './product-interests.effect';
import { RegionsEffects } from './regions.effect';
import { ReplenishmentOrderDetailsEffect } from './replenishment-order-details.effect';
import { UserAddressesEffects } from './user-addresses.effect';
import { UserConsentsEffect } from './user-consents.effect';
import { UserCostCenterEffects } from './user-cost-center.effect';
import { UserOrdersEffect } from './user-orders.effect';
import { UserReplenishmentOrdersEffect } from './user-replenishment-orders.effect';

export const effects: any[] = [
  ClearMiscsDataEffect,
  DeliveryCountriesEffects,
  RegionsEffects,
  UserAddressesEffects,
  UserPaymentMethodsEffects,
  UserOrdersEffect,
  OrderDetailsEffect,
  BillingCountriesEffect,
  UserConsentsEffect,
  ConsignmentTrackingEffects,
  CustomerCouponEffects,
  NotificationPreferenceEffects,
  ProductInterestsEffect,
  OrderReturnRequestEffect,
  UserCostCenterEffects,
  ReplenishmentOrderDetailsEffect,
  UserReplenishmentOrdersEffect,
];

export * from './billing-countries.effect';
export * from './clear-miscs-data.effect';
export * from './consignment-tracking.effect';
export * from './customer-coupon.effect';
export * from './delivery-countries.effect';
export * from './notification-preference.effect';
export * from './order-details.effect';
export * from './order-return-request.effect';
export * from './payment-methods.effect';
export * from './product-interests.effect';
export * from './regions.effect';
export * from './replenishment-order-details.effect';
export * from './user-addresses.effect';
export * from './user-consents.effect';
export * from './user-orders.effect';
export * from './user-replenishment-orders.effect';
