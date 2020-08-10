import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AnonymousConsentTemplatesAdapter } from '../../../../../../../../projects/core/src/anonymous-consents/connectors/anonymous-consent-templates.adapter';
import { ANONYMOUS_CONSENT_NORMALIZER } from '../../../../../../../../projects/core/src/anonymous-consents/connectors/converters';
import { provideDefaultConfig } from '../../../../../../../../projects/core/src/config/config.module';
import { UserAddressAdapter } from '../../../../../../../../projects/core/src/user/connectors/address/user-address.adapter';
import { UserConsentAdapter } from '../../../../../../../../projects/core/src/user/connectors/consent/user-consent.adapter';
import { CustomerCouponAdapter } from '../../../../../../../../projects/core/src/user/connectors/customer-coupon/customer-coupon.adapter';
import { PRODUCT_INTERESTS_NORMALIZER } from '../../../../../../../../projects/core/src/user/connectors/interests/converters';
import { UserInterestsAdapter } from '../../../../../../../../projects/core/src/user/connectors/interests/user-interests.adapter';
import { UserNotificationPreferenceAdapter } from '../../../../../../../../projects/core/src/user/connectors/notification-preference/user-notification-preference.adapter';
import { ORDER_RETURN_REQUEST_NORMALIZER } from '../../../../../../../../projects/core/src/user/connectors/order/converters';
import { UserOrderAdapter } from '../../../../../../../../projects/core/src/user/connectors/order/user-order.adapter';
import { UserPaymentAdapter } from '../../../../../../../../projects/core/src/user/connectors/payment/user-payment.adapter';
import { UserAdapter } from '../../../../../../../../projects/core/src/user/connectors/user/user.adapter';
import { OccCustomerCouponAdapter } from '../user/occ-customer-coupon.adapter';
import { AnonymousConsentNormalizer } from './converters/anonymous-consents-normalizer';
import { OccReturnRequestNormalizer } from './converters/occ-return-request-normalizer';
import { OccUserInterestsNormalizer } from './converters/occ-user-interests-normalizer';
import { defaultOccUserConfig } from './default-occ-user-config';
import { OccAnonymousConsentTemplatesAdapter } from './occ-anonymous-consent-templates.adapter';
import { OccUserAddressAdapter } from './occ-user-address.adapter';
import { OccUserConsentAdapter } from './occ-user-consent.adapter';
import { OccUserInterestsAdapter } from './occ-user-interests.adapter';
import { OccUserNotificationPreferenceAdapter } from './occ-user-notification-preference.adapter';
import { OccUserOrderAdapter } from './occ-user-order.adapter';
import { OccUserPaymentAdapter } from './occ-user-payment.adapter';
import { OccUserAdapter } from './occ-user.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    provideDefaultConfig(defaultOccUserConfig),
    { provide: UserAdapter, useClass: OccUserAdapter },
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
  ],
})
export class UserOccModule {}
