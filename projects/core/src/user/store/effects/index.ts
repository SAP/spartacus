import { BillingCountriesEffect } from './billing-countries.effect';
import { ClearMiscsDataEffect } from './clear-miscs-data.effect';
import { CustomerCouponEffects } from './customer-coupon.effect';
import { DeliveryCountriesEffects } from './delivery-countries.effect';
import { NotificationPreferenceEffects } from './notification-preference.effect';
import { UserPaymentMethodsEffects } from './payment-methods.effect';
import { ProductInterestsEffect } from './product-interests.effect';
import { RegionsEffects } from './regions.effect';
import { UserAddressesEffects } from './user-addresses.effect';
import { UserConsentsEffect } from './user-consents.effect';
import { UserCostCenterEffects } from './user-cost-center.effect';

export const effects: any[] = [
  ClearMiscsDataEffect,
  DeliveryCountriesEffects,
  RegionsEffects,
  UserAddressesEffects,
  UserPaymentMethodsEffects,
  BillingCountriesEffect,
  UserConsentsEffect,
  CustomerCouponEffects,
  NotificationPreferenceEffects,
  ProductInterestsEffect,
  UserCostCenterEffects,
];

export * from './billing-countries.effect';
export * from './clear-miscs-data.effect';
export * from './customer-coupon.effect';
export * from './delivery-countries.effect';
export * from './notification-preference.effect';
export * from './payment-methods.effect';
export * from './product-interests.effect';
export * from './regions.effect';
export * from './user-addresses.effect';
export * from './user-consents.effect';
