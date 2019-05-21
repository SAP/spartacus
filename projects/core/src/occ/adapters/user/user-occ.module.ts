import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OrderAdapter } from '../../../user/connectors/order/order.adapter';
import { OccOrderAdapter } from './occ-order.adapter';
import { ORDER_NORMALIZER } from '../../../user/connectors/order/converters';
import { OccOrderNormalizer } from './converters/occ-order-normalizer';
import { UserDetailsAdapter } from '../../../user/connectors/details/user-details.adapter';
import { OccUserDetailsAdapter } from './occ-user-details.adapter';
import { UserAddressAdapter } from '../../../user/connectors/address/user-address.adapter';
import { OccUserAddressAdapter } from './occ-user-address.adapter';
import { UserAccountAdapter } from '../../../user/connectors/account/user-account.adapter';
import { OccUserAccountAdapter } from './occ-user-account.adapter';
import { UserPaymentAdapter } from '../../../user/connectors/payment/user-payment.adapter';
import { OccUserPaymentAdapter } from './occ-user-payment.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: UserDetailsAdapter, useClass: OccUserDetailsAdapter },
    { provide: UserAddressAdapter, useClass: OccUserAddressAdapter },
    { provide: UserAccountAdapter, useClass: OccUserAccountAdapter },
    {
      provide: UserPaymentAdapter,
      useClass: OccUserPaymentAdapter,
    },
    { provide: OrderAdapter, useClass: OccOrderAdapter },
    { provide: ORDER_NORMALIZER, useClass: OccOrderNormalizer, multi: true },
  ],
})
export class UserOccModule {}
