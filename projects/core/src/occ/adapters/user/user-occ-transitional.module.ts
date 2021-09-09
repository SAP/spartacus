import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnonymousConsentTemplatesAdapter } from '../../../anonymous-consents/connectors/anonymous-consent-templates.adapter';
import { ANONYMOUS_CONSENT_NORMALIZER } from '../../../anonymous-consents/connectors/converters';
import { provideDefaultConfig } from '../../../config/config-providers';
import { ADDRESS_LIST_NORMALIZER } from '../../../user/connectors/address/converters';
import { UserAddressAdapter } from '../../../user/connectors/address/user-address.adapter';
import { UserConsentAdapter } from '../../../user/connectors/consent/user-consent.adapter';
import { UserCostCenterAdapter } from '../../../user/connectors/cost-center/user-cost-center.adapter';
import { CustomerCouponAdapter } from '../../../user/connectors/customer-coupon/customer-coupon.adapter';
import { PRODUCT_INTERESTS_NORMALIZER } from '../../../user/connectors/interests/converters';
import { UserInterestsAdapter } from '../../../user/connectors/interests/user-interests.adapter';
import { UserNotificationPreferenceAdapter } from '../../../user/connectors/notification-preference/user-notification-preference.adapter';
import { ORDER_RETURN_REQUEST_NORMALIZER } from '../../../user/connectors/order/converters';
import { UserOrderAdapter } from '../../../user/connectors/order/user-order.adapter';
import { UserPaymentAdapter } from '../../../user/connectors/payment/user-payment.adapter';
import { UserReplenishmentOrderAdapter } from '../../../user/connectors/replenishment-order';
import { OccCustomerCouponAdapter } from '../user/occ-customer-coupon.adapter';
import { AnonymousConsentNormalizer } from './converters/anonymous-consents-normalizer';
import { OccAddressListNormalizer } from './converters/occ-address-list-normalizer';
import { OccReturnRequestNormalizer } from './converters/occ-return-request-normalizer';
import { OccUserInterestsNormalizer } from './converters/occ-user-interests-normalizer';
import { defaultOccUserConfig } from './default-occ-user-config';
import { OccAnonymousConsentTemplatesAdapter } from './occ-anonymous-consent-templates.adapter';
import { OccUserAddressAdapter } from './occ-user-address.adapter';
import { OccUserConsentAdapter } from './occ-user-consent.adapter';
import { OccUserCostCenterAdapter } from './occ-user-cost-centers.adapter';
import { OccUserInterestsAdapter } from './occ-user-interests.adapter';
import { OccUserNotificationPreferenceAdapter } from './occ-user-notification-preference.adapter';
import { OccUserOrderAdapter } from './occ-user-order.adapter';
import { OccUserPaymentAdapter } from './occ-user-payment.adapter';
import { OccUserReplenishmentOrderAdapter } from './occ-user-replenishment-order.adapter';

/**
 * @deprecated since 4.2 - use UserOccTransitional_4_2_Module wiith order lib instead
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccUserConfig),
    { provide: UserAddressAdapter, useClass: OccUserAddressAdapter },
    { provide: UserConsentAdapter, useClass: OccUserConsentAdapter },
    {
      provide: AnonymousConsentTemplatesAdapter,
      useClass: OccAnonymousConsentTemplatesAdapter,
    },
    {
      provide: UserPaymentAdapter,
      useClass: OccUserPaymentAdapter,
    },
    { provide: UserOrderAdapter, useClass: OccUserOrderAdapter },
    { provide: CustomerCouponAdapter, useClass: OccCustomerCouponAdapter },
    {
      provide: UserNotificationPreferenceAdapter,
      useClass: OccUserNotificationPreferenceAdapter,
    },
    { provide: UserInterestsAdapter, useClass: OccUserInterestsAdapter },
    { provide: UserCostCenterAdapter, useClass: OccUserCostCenterAdapter },
    {
      provide: PRODUCT_INTERESTS_NORMALIZER,
      useExisting: OccUserInterestsNormalizer,
      multi: true,
    },
    {
      provide: ORDER_RETURN_REQUEST_NORMALIZER,
      useExisting: OccReturnRequestNormalizer,
      multi: true,
    },
    {
      provide: ANONYMOUS_CONSENT_NORMALIZER,
      useExisting: AnonymousConsentNormalizer,
      multi: true,
    },
    {
      provide: ADDRESS_LIST_NORMALIZER,
      useExisting: OccAddressListNormalizer,
      multi: true,
    },
    {
      provide: UserReplenishmentOrderAdapter,
      useClass: OccUserReplenishmentOrderAdapter,
    },
  ],
})
export class UserOccTransitionalModule {}
