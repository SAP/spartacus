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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultOccUserConfig),
  ],
  providers: [
    {
      provide: UserAdapter,
      useExisting: OccUserAdapter,
    },
    {
      provide: UserAddressAdapter,
      useExisting: OccUserAddressAdapter,
    },
    {
      provide: UserConsentAdapter,
      useExisting: OccUserConsentAdapter,
    },
    {
      provide: AnonymousConsentTemplatesAdapter,
      useExisting: OccAnonymousConsentTemplatesAdapter,
    },
    {
      provide: UserPaymentAdapter,
      useExisting: OccUserPaymentAdapter,
    },
    {
      provide: UserOrderAdapter,
      useExisting: OccUserOrderAdapter,
    },
  ],
})
export class UserOccModule {}
