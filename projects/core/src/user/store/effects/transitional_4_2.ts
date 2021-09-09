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

export const effectsTransitional_4_2: any[] = [
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
