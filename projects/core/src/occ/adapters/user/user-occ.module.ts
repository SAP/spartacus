import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AnonymousConsentTemplatesAdapter } from '../../../anonymous-consents/connectors/anonymous-consent-templates.adapter';
import { ConfigModule } from '../../../config/config.module';
import { UserAddressAdapter } from '../../../user/connectors/address/user-address.adapter';
import { UserConsentAdapter } from '../../../user/connectors/consent/user-consent.adapter';
import { UserOrderAdapter } from '../../../user/connectors/order/user-order.adapter';
import { UserPaymentAdapter } from '../../../user/connectors/payment/user-payment.adapter';
import { UserAdapter } from '../../../user/connectors/user/user.adapter';
import { defaultOccUserConfig } from './default-occ-user-config';
import { OccAnonymousConsentTemplatesAdapter } from './occ-anonymous-consent-templates.adapter';
import { OccUserAddressAdapter } from './occ-user-address.adapter';
import { OccUserConsentAdapter } from './occ-user-consent.adapter';
import { OccUserOrderAdapter } from './occ-user-order.adapter';
import { OccUserPaymentAdapter } from './occ-user-payment.adapter';
import { OccUserAdapter } from './occ-user.adapter';
import { UserNotificationPreferenceAdapter } from '../../../user/connectors/notification-preference/user-notification-preference.adapter';
import { OccUserNotificationPreferenceAdapter } from './occ-user-notification-preference.adapter';
import { OccUserInterestsAdapter } from './occ-user-interests.adapter';
import { UserInterestsAdapter } from '../../../user/connectors/interests/user-interests.adapter';
import { OccUserInterestsNormalizer } from './converters/occ-user-interests-normalizer';
import { PRODUCT_INTERESTS_NORMALIZER } from '../../../user/connectors/interests/converters';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultOccUserConfig),
  ],
  providers: [
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
  ],
})
export class UserOccModule {}
